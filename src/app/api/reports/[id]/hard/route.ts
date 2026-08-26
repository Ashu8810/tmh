import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { supabaseServerClient } from '@/lib/supabase';
import { getVerifiedSession } from '@/lib/session';
import { accessibleReportsWhere, canHardDeleteReport } from '@/lib/report-access';

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // 1. Verify User is ADMIN strictly
    const session = await getVerifiedSession();
    const user = session?.user;
    if (!user || !canHardDeleteReport(user.role)) {
      return NextResponse.json({ error: 'Unauthorized. Only Admins can permanently destroy files.' }, { status: 403 });
    }

    // 2. Find Report
    const report = await prisma.report.findFirst({
      where: accessibleReportsWhere({
        id,
        role: user.role,
        isDeleted: true,
      }),
    });

    if (!report) {
      return NextResponse.json({ error: 'Report not found' }, { status: 404 });
    }

    // 3. Delete from Supabase Storage
    const { error: storageError } = await supabaseServerClient
      .storage
      .from('reports')
      .remove([report.storagePath]);

    if (storageError) {
      console.error('Supabase hard delete error:', storageError);
      return NextResponse.json({ error: 'Failed to delete file from storage' }, { status: 500 });
    }

    // 4. Hard Delete from Prisma
    await prisma.report.delete({
      where: { id },
    });

    // Audit Log
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';
    await prisma.auditLog.create({
      data: {
        action: 'PERMANENT_DELETE',
        userId: user.id,
        reportId: report.id,
        reportName: report.title,
        ipAddress: ip,
        userAgent,
      }
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: unknown) {
    console.error('DELETE /api/reports/[id]/hard error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
