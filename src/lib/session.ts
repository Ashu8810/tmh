import { cookies } from 'next/headers';
import prisma from './prisma';

const SESSION_COOKIE_NAME = 'vault_session';
const SESSION_EXPIRATION_DAYS = 1; // 24 hours

type SessionVerificationState = {
  mfaVerified: boolean;
  user: { isActive: boolean };
};

export function isSessionFullyVerified(session: SessionVerificationState | null): boolean {
  return Boolean(session?.mfaVerified && session.user.isActive);
}

export async function createSession(userId: string, mfaVerified: boolean = true, userAgent: string | null = null) {
  const expiresAt = new Date(Date.now() + SESSION_EXPIRATION_DAYS * 24 * 60 * 60 * 1000);
  
  const session = await prisma.session.create({
    data: {
      userId,
      expiresAt,
      mfaVerified,
      userAgent,
    },
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, session.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: expiresAt,
    path: '/',
  });

  return session;
}

export async function getSession() {
  const cookieStore = await cookies();
  // Keep accepting the legacy cookie name while all new sessions use vault_session.
  const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value || cookieStore.get('sessionId')?.value;

  if (!sessionId) {
    return null;
  }

  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: true },
  });

  if (!session || session.expiresAt < new Date()) {
    return null;
  }

  return session;
}

/** Return only sessions that completed MFA and still belong to an active user. */
export async function getVerifiedSession() {
  const session = await getSession();

  if (!isSessionFullyVerified(session)) {
    return null;
  }

  return session;
}

export async function clearSession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value || cookieStore.get('sessionId')?.value;

  if (sessionId) {
    await prisma.session.delete({ where: { id: sessionId } }).catch(() => {});
  }

  cookieStore.delete(SESSION_COOKIE_NAME);
  cookieStore.delete('sessionId');
}
