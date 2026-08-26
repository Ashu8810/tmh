import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getVerifiedSession } from '@/lib/session';
import { accessibleReportsWhere, canSoftDeleteReport } from '@/lib/report-access';

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // 1. Verify User is Admin or Club Head
    const session = await getVerifiedSession();
    const user = session?.user;
    if (!user || !canSoftDeleteReport(user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // 2. Find Report
    const report = await prisma.report.findFirst({
      where: accessibleReportsWhere({
        id,
        role: user.role,
        isDeleted: false,
      }),
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
