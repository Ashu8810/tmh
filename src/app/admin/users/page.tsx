import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import AdminUsersClient from './AdminUsersClient';
import { getSession } from '@/lib/session';

export default async function AdminUsersPage() {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  if (!session.mfaVerified || !session.user.isActive || session.user.role !== 'ADMIN') {
    redirect('/reports'); // Privilege escalation defense: non-admins redirect here
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return <AdminUsersClient initialUsers={users} currentUserId={session.userId} />;
}
