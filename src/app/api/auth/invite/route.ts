import { NextResponse } from 'next/server';
import crypto from 'crypto';
import prisma from '@/lib/prisma';
import { sendInviteEmail } from '@/lib/email';
import { getVerifiedSession } from '@/lib/session';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    
    // Rate limit: 10 invite attempts per minute per IP
    if (!rateLimit(`invite:${ip}`, 10, 60000)) {
      return NextResponse.json({ error: 'Too many invite attempts. Please try again later.' }, { status: 429 });
    }

    const session = await getVerifiedSession();

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { email, role = 'MEMBER' } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    if (role !== 'MEMBER' && role !== 'CLUB_HEAD') {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Generate token
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Create or update InviteToken
    await prisma.inviteToken.upsert({
      where: { email },
      update: { token, expiresAt, userId: session.userId, role },
      create: { email, token, expiresAt, userId: session.userId, role },
    });

    // Send Email
    await sendInviteEmail(email, token);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Invite error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
