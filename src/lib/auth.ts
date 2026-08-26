import { redirect } from 'next/navigation';
import { getSession } from './session';

export async function requireAuth() {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  if (!session.user.isActive) {
    redirect('/login');
  }

  if (!session.mfaVerified) {
    redirect('/login?mfa=true');
  }

  return session.user;
}

export async function requireAdmin() {
  const user = await requireAuth();

  if (user.role !== 'ADMIN') {
    redirect('/reports');
  }

  return user;
}
