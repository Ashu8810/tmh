import { NextResponse } from 'next/server';
import { verify } from 'otplib';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/session';

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ error: 'MFA token is required' }, { status: 400 });
    }

    const session = await getSession();

    if (!session || session.mfaVerified || !session.user.isActive) {
      return NextResponse.json({ error: 'No pending MFA session found' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
    });

    if (!user || !user.mfaSecret) {
      return NextResponse.json({ error: 'MFA not configured for this user' }, { status: 400 });
    }

    // Verify TOTP token
    const isValid = verify({
      token,
      secret: user.mfaSecret,
    });

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid MFA token' }, { status: 401 });
    }

    // Update session to fully verified
    await prisma.session.update({
      where: { id: session.id },
      data: { mfaVerified: true },
    });

    return NextResponse.json({
      success: true,
      mustChangePassword: user.mustChangePassword,
    });
  } catch (error) {
    console.error('MFA verify error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
