import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { supabaseServerClient } from '@/lib/supabase';
import { cookies } from 'next/headers';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    // 1. Verify user is logged in
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('sessionId')?.value || cookieStore.get('vault_session')?.value;
    if (!sessionId) {
      return NextResponse.json({ error: 'Unauthorized. Please log in.' }, { status: 401 });
    }

    const session = await prisma.session.findUnique({
      where: { id: sessionId },
    });

    if (!session || session.expiresAt < new Date()) {
      return NextResponse.json({ error: 'Session expired or invalid.' }, { status: 401 });
    }

    // 2. Fetch report metadata
    const report = await prisma.report.findUnique({
      where: { id },
    });

    if (!report) {
      return NextResponse.json({ error: 'Report not found' }, { status: 404 });
    }

    // 3. Generate a short-lived signed URL for the locked file (e.g., 60 seconds)
    const { data, error } = await supabaseServerClient
      .storage
      .from('reports')
      .createSignedUrl(report.storagePath, 60, {
        download: report.title // Force browser to download with original title
      });

    if (error || !data) {
      console.error('Supabase signed URL error:', error);
      return NextResponse.json({ error: 'Failed to generate access link' }, { status: 500 });
    }

    // 4. Audit Logging
    const ipAddress = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'Unknown IP';
    await prisma.auditLog.create({
      data: {
        action: 'DOWNLOAD',
        userId: session.userId,
        reportId: report.id,
        reportName: report.title,
        ipAddress: ipAddress,
      }
    });

    // 5. Redirect the user securely to the signed URL
    return NextResponse.redirect(data.signedUrl);
  } catch (error: any) {
    console.error('Download API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
