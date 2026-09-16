import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { SignJWT } from 'jose';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SECRET_KEY = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || 'super_secret_key_123_456_789_012_345_678_901_234_567_890'
);

export async function POST(request: Request) {
  try {
    let { email, password } = await request.json();

    email = email?.trim().toLowerCase();

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
    }

    
    // --- AUTO-BOOTSTRAP ADMIN ---
    // If no admins exist in the database, create a default one to prevent lockout.
    const adminCount = await prisma.adminUser.count();
    if (adminCount === 0) {
      const defaultPasswordHash = await bcrypt.hash('Admin@123', 10);
      await prisma.adminUser.create({
        data: {
          email: 'admin@northeasttours.com',
          passwordHash: defaultPasswordHash,
          name: 'Super Admin',
          role: 'SUPER_ADMIN'
        }
      });
      console.log('Bootstrapped default admin user: admin@northeasttours.com / Admin@123');
    }
    // ----------------------------

    const user = await prisma.adminUser.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Create JWT
    const token = await new SignJWT({ sub: user.id, email: user.email, role: user.role })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(SECRET_KEY);

    const response = NextResponse.json({ success: true }, { status: 200 });
    
    response.cookies.set({
      name: 'admin_token',
      value: token,
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
