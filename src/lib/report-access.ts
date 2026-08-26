import type { Prisma, Role } from '@prisma/client';

export function canDownloadReport(role: Role): boolean {
  return role === 'ADMIN' || role === 'CLUB_HEAD';
}

export function canSoftDeleteReport(role: Role): boolean {
  return role === 'ADMIN' || role === 'CLUB_HEAD';
}

export function canHardDeleteReport(role: Role): boolean {
  return role === 'ADMIN';
}

export function folderRoleAccessWhere(role: Role): Prisma.ReportFolderWhereInput {
  if (role === 'ADMIN') {
    return {};
  }

  return {
    OR: [
      { allowedRoles: { isEmpty: true } },
      { allowedRoles: { has: role } },
    ],
  };
}

export function accessibleFolderWhere(
  role: Role,
  id?: string,
): Prisma.ReportFolderWhereInput {
  return {
    ...(id ? { id } : {}),
    ...folderRoleAccessWhere(role),
  };
}

export function reportRoleAccessWhere(role: Role): Prisma.ReportWhereInput {
  if (role === 'ADMIN') {
    return {};
  }

  return {
    OR: [
      { folderId: null },
      { folder: { allowedRoles: { isEmpty: true } } },
      { folder: { allowedRoles: { has: role } } },
    ],
  };
}

export function accessibleReportsWhere({
  role,
  folderId,
  isDeleted,
  id,
}: {
  role: Role;
  folderId?: string | null;
  isDeleted: boolean;
  id?: string;
}): Prisma.ReportWhereInput {
  return {
    ...(id ? { id } : {}),
    ...(folderId !== undefined ? { folderId } : {}),
    isDeleted,
    ...reportRoleAccessWhere(role),
  };
}
