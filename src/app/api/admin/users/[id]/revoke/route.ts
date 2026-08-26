import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
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

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // 1. Verify Admin
    const adminUser = await verifyAdmin();
    if (!adminUser) {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 403 });
    }

    // You cannot revoke yourself
    if (adminUser.id === id) {
      return NextResponse.json({ error: 'You cannot revoke your own access.' }, { status: 400 });
    }

    // 2. Set isActive to false
    await prisma.user.update({
      where: { id },
      data: { isActive: false },
    });

    // 3. Destroy all active sessions for this user to kick them out instantly
    await prisma.session.deleteMany({
      where: { userId: id },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: unknown) {
    console.error('PATCH /api/admin/users/[id]/revoke error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
