import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('vault_session');
  const { pathname } = request.nextUrl;

  // Protect /admin and /reports routes
  if (pathname.startsWith('/admin') || pathname.startsWith('/reports')) {
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Prevent logged-in users from accessing /login or /invite
  if (pathname === '/login' && sessionCookie) {
    return NextResponse.redirect(new URL('/reports', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/reports/:path*', '/login'],
};
