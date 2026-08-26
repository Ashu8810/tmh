import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { supabaseServerClient } from '@/lib/supabase';
import { getVerifiedSession } from '@/lib/session';
import { accessibleFolderWhere, accessibleReportsWhere, folderRoleAccessWhere } from '@/lib/report-access';

export async function GET(req: Request) {
  try {
    const session = await getVerifiedSession();
    const user = session?.user ?? null;

    const { searchParams } = new URL(req.url);
    const folderId = searchParams.get('folderId');
    const showTrash = searchParams.get('showTrash') === 'true';

    // Only Admin can view trash
    if (showTrash && user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const folderAccess = folderId
      ? await prisma.reportFolder.findFirst({
          where: user
            ? accessibleFolderWhere(user.role, folderId)
            : { id: folderId },
          select: { id: true },
        })
      : true;

    if (!folderAccess) {
      return NextResponse.json({ folders: [], reports: [] });
    }

    // Fetch folders where allowedRoles is empty OR includes the user's role
    const folders = await prisma.reportFolder.findMany({
      where: {
        ...(folderId ? { parentId: folderId } : { parentId: null }),
        ...(user ? folderRoleAccessWhere(user.role) : {}),
      },
      orderBy: { name: 'asc' },
      select: { id: true, name: true, parentId: true },
    });

    // Fetch reports
    const reports = await prisma.report.findMany({
      where: user
        ? accessibleReportsWhere({
            role: user.role,
            folderId: folderId ?? undefined,
            isDeleted: showTrash,
          })
        : {
            ...(folderId !== null ? { folderId } : {}),
            isDeleted: false,
          },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        ...(user ? { description: true } : {}),
        fileType: true,
        fileSize: true,
        folderId: true,
        createdAt: true,
        ...(user ? { uploader: {
          select: { email: true },
        } } : {}),
      }
    });

    return NextResponse.json({ folders, reports });
  } catch (error: unknown) {
    console.error('GET /api/reports error:', error);
    return NextResponse.json({ error: 'Failed to fetch reports' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getVerifiedSession();
    const user = session?.user;
    if (!user || (user.role !== 'ADMIN' && user.role !== 'CLUB_HEAD')) {
      return NextResponse.json({ error: 'Unauthorized. Admin or Club Head access required.' }, { status: 403 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string | null;
    const folderId = formData.get('folderId') as string | null;

    if (!file || !title) {
      return NextResponse.json({ error: 'File and title are required' }, { status: 400 });
    }

    if (folderId) {
      const folder = await prisma.reportFolder.findFirst({
        where: accessibleFolderWhere(user.role, folderId),
        select: { id: true },
      });

      if (!folder) {
        return NextResponse.json({ error: 'Folder not found or unauthorized' }, { status: 403 });
      }
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
        uploaderId: user.id,
      }
    });

    // 3. Audit Logging
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';
    await prisma.auditLog.create({
      data: {
        action: 'UPLOAD',
        userId: user.id,
        reportId: report.id,
        reportName: report.title,
        ipAddress: ip,
        userAgent,
      }
    });

    return NextResponse.json(report, { status: 201 });
  } catch (error: unknown) {
    console.error('POST /api/reports error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
