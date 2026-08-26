import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getVerifiedSession } from '@/lib/session';

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // 1. Verify Admin
    const session = await getVerifiedSession();
    const adminUser = session?.user?.role === 'ADMIN' ? session.user : null;
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
