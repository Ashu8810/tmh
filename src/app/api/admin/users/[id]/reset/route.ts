import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import crypto from 'crypto';
import { cookies } from 'next/headers';

// Helper to check admin access
async function verifyAdmin() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('sessionId')?.value || cookieStore.get('vault_session')?.value;
  if (!sessionId) return null;

  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: true },
  });

  if (!session || session.expiresAt < new Date() || session.user.role !== 'ADMIN') {
    return null;
  }
  return session.user;
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const adminUser = await verifyAdmin();
    if (!adminUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { id } = await params;
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Generate token
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Delete existing reset tokens for this user to prevent spam
    await prisma.passwordResetToken.deleteMany({
      where: { userId: user.id },
    });

    const resetToken = await prisma.passwordResetToken.create({
      data: {
        email: user.email,
        token,
        userId: user.id,
        expiresAt,
      },
    });

    // In a real email setup, we would send the email here.
    // Instead, we just return the link to the admin so they can copy it.
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/reset-password?token=${token}`;

    return NextResponse.json({ resetUrl });
  } catch (error) {
    console.error('Generate reset token error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
