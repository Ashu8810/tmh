import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { createSession } from '@/lib/session';
import { rateLimit } from '@/lib/rate-limit';

const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

    // Rate limit: 5 login attempts per minute per IP
    if (!rateLimit(`login:${ip}`, 5, 60000)) {
      return NextResponse.json({ error: 'Too many login attempts. Please try again later.' }, { status: 429 });
    }

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Prevent timing attacks by hashing anyway
      await bcrypt.hash(password, 10);
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Check rate limit
    const recentAttempts = await prisma.loginAttempt.findMany({
      where: {
        userId: user.id,
        createdAt: {
          gte: new Date(Date.now() - LOCKOUT_MINUTES * 60 * 1000),
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const failedAttempts = recentAttempts.filter((a: { success: boolean }) => !a.success);
    if (failedAttempts.length >= MAX_LOGIN_ATTEMPTS) {
      return NextResponse.json(
        { error: `Too many failed attempts. Try again in ${LOCKOUT_MINUTES} minutes.` },
        { status: 429 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    // Log attempt
    await prisma.loginAttempt.create({
      data: {
        userId: user.id,
        ipAddress: ip,
        success: isPasswordValid,
      },
    });

    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    if (!user.isActive) {
      return NextResponse.json({ error: 'Account is deactivated' }, { status: 403 });
    }

    // Handle MFA
    if (user.mfaEnabled) {
      // Create a session, but flag it as NOT mfaVerified
      await createSession(user.id, false);
      return NextResponse.json({ mfaRequired: true, mustChangePassword: user.mustChangePassword });
    }

    // Full Login (No MFA required)
    await createSession(user.id, true);

    return NextResponse.json({
      success: true,
      mustChangePassword: user.mustChangePassword,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
