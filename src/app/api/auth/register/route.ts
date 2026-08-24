import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';
import { createSession } from '@/lib/session';

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json({ error: 'Token and password are required' }, { status: 400 });
    }

    if (password.length < 12) {
      return NextResponse.json({ error: 'Password must be at least 12 characters' }, { status: 400 });
    }

    const inviteToken = await prisma.inviteToken.findUnique({
      where: { token },
    });

    if (!inviteToken || inviteToken.expiresAt < new Date()) {
      return NextResponse.json({ error: 'Invalid or expired invite token' }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: inviteToken.email,
        passwordHash,
        role: 'MEMBER', // Users created via invite are members by default
        isActive: true,
        mustChangePassword: false, // They just set it
      },
    });

    // Delete the token
    await prisma.inviteToken.delete({
      where: { id: inviteToken.id },
    });

    // Log them in (MFA is not enabled yet)
    await createSession(user.id, true);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
