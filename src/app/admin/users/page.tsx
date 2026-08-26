import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import AdminUsersClient from './AdminUsersClient';

export default async function AdminUsersPage() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('sessionId')?.value || cookieStore.get('vault_session')?.value;

  if (!sessionId) {
    redirect('/login');
  }

  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: true },
  });

  if (!session || session.expiresAt < new Date() || session.user.role !== 'ADMIN') {
    redirect('/reports'); // Privilege escalation defense: non-admins redirect here
  }

  return <AdminUsersClient />;
}
