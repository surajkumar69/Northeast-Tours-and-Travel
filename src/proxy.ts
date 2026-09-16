import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || 'super_secret_key_123_456_789_012_345_678_901_234_567_890'
);

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Clean path (remove trailing slash for reliable comparison)
  const cleanPath = path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path;
  
  // Protect /admin routes, but allow /admin/login
  if (cleanPath.startsWith('/admin') && cleanPath !== '/admin/login') {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      await jwtVerify(token, SECRET_KEY);
      return NextResponse.next();
    } catch (err) {
      // Invalid token, clear cookie and redirect
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete('admin_token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
