import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getVerifiedSession } from '@/lib/session';
import { accessibleReportsWhere } from '@/lib/report-access';

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getVerifiedSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const report = await prisma.report.findFirst({
      where: accessibleReportsWhere({
        id,
        role: session.user.role,
        isDeleted: false,
      }),
      select: { id: true, title: true },
    });

    if (!report) {
      return NextResponse.json({ error: 'Report not found' }, { status: 404 });
    }

    await prisma.auditLog.create({
      data: {
        action: 'VIEW',
        userId: session.userId,
        reportId: report.id,
        reportName: report.title,
        ipAddress: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown',
        userAgent: req.headers.get('user-agent') || 'unknown',
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('POST /api/reports/[id]/view error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
