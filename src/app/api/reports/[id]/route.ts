import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

// Helper to check session
async function verifySession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('sessionId')?.value || cookieStore.get('vault_session')?.value;
  if (!sessionId) return null;

  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: true },
  });

  if (!session || session.expiresAt < new Date()) {
    return null;
  }
  return session.user;
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // 1. Verify User is Admin or Club Head
    const user = await verifySession();
    if (!user || (user.role !== 'ADMIN' && user.role !== 'CLUB_HEAD')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // 2. Find Report
    const report = await prisma.report.findUnique({
      where: { id },
    });

    if (!report) {
      return NextResponse.json({ error: 'Report not found' }, { status: 404 });
    }

    // 3. Soft Delete in Prisma (DO NOT delete from Supabase yet)
    await prisma.report.update({
      where: { id },
      data: { isDeleted: true },
    });

    // 4. Audit Logging
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';
    await prisma.auditLog.create({
      data: {
        action: 'DELETE',
        userId: user.id,
        reportId: report.id,
        reportName: report.title,
        ipAddress: ip,
        userAgent,
      }
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: unknown) {
    console.error('DELETE /api/reports/[id] error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
