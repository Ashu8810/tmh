import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { supabaseServerClient } from '@/lib/supabase';
import { cookies } from 'next/headers';

// Helper to check admin access
async function verifyAdmin() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('sessionId')?.value;
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

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const folderId = searchParams.get('folderId');

    // Fetch folders
    const folders = await prisma.reportFolder.findMany({
      where: folderId ? { parentId: folderId } : { parentId: null },
      orderBy: { name: 'asc' },
    });

    // Fetch reports
    const reports = await prisma.report.findMany({
      where: folderId ? { folderId } : { folderId: null },
      orderBy: { createdAt: 'desc' },
      include: {
        uploader: {
          select: { id: true, email: true }
        }
      }
    });

    return NextResponse.json({ folders, reports });
  } catch (error: any) {
    console.error('GET /api/reports error:', error);
    return NextResponse.json({ error: 'Failed to fetch reports' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const adminUser = await verifyAdmin();
    if (!adminUser) {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 403 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string | null;
    const folderId = formData.get('folderId') as string | null;

    if (!file || !title) {
      return NextResponse.json({ error: 'File and title are required' }, { status: 400 });
    }

    // Security Hardening: File Size Limit (50MB)
    const MAX_FILE_SIZE = 50 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File exceeds the 50MB maximum size limit' }, { status: 400 });
    }

    // Security Hardening: MIME Type Whitelist
    const allowedMimeTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/zip',
      'application/x-zip-compressed',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];
    if (!allowedMimeTypes.includes(file.type)) {
      return NextResponse.json({ error: `Invalid file type: ${file.type}. Only PDF, DOCX, XLSX, and ZIP are allowed.` }, { status: 400 });
    }

    // 1. Upload to Supabase Storage
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const storagePath = folderId ? `${folderId}/${fileName}` : `root/${fileName}`;

    const { data: storageData, error: storageError } = await supabaseServerClient
      .storage
      .from('reports')
      .upload(storagePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (storageError) {
      console.error('Supabase upload error:', storageError);
      return NextResponse.json({ error: 'Failed to upload file to storage' }, { status: 500 });
    }

    // 2. Save metadata in Prisma
    const report = await prisma.report.create({
      data: {
        title,
        description,
        storagePath: storageData.path,
        fileType: file.type || 'application/octet-stream',
        fileSize: file.size,
        folderId: folderId || null,
        uploaderId: adminUser.id,
      }
    });

    // 3. Audit Logging
    const ipAddress = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'Unknown IP';
    await prisma.auditLog.create({
      data: {
        action: 'UPLOAD',
        userId: adminUser.id,
        reportId: report.id,
        reportName: report.title,
        ipAddress: ipAddress,
      }
    });

    return NextResponse.json(report, { status: 201 });
  } catch (error: any) {
    console.error('POST /api/reports error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
