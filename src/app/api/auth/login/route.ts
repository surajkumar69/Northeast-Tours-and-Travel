import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { SignJWT } from 'jose';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    // 1. STRICT ENVIRONMENT VALIDATION FOR PRODUCTION
    if (process.env.NODE_ENV === 'production') {
      if (!process.env.NEXTAUTH_SECRET) {
        console.error("CRITICAL ERROR: NEXTAUTH_SECRET is missing in production.");
        return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
      }
      if (!process.env.DATABASE_URL) {
        console.error("CRITICAL ERROR: DATABASE_URL is missing in production.");
        return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
      }
    }

    const secretString = process.env.NEXTAUTH_SECRET || 'super_secret_key_123_456_789_012_345_678_901_234_567_890';
    const SECRET_KEY = new TextEncoder().encode(secretString);

    let { email, password } = await request.json();
    email = email?.trim().toLowerCase();

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
    }

    // 2. ENVIRONMENT-CONTROLLED SAFE BOOTSTRAP
    const adminCount = await prisma.adminUser.count();
    
    if (adminCount === 0) {
      const initialEmail = process.env.INITIAL_ADMIN_EMAIL?.trim().toLowerCase();
      const initialPassword = process.env.INITIAL_ADMIN_PASSWORD;

      if (initialEmail && initialPassword) {
        const defaultPasswordHash = await bcrypt.hash(initialPassword, 10);
        await prisma.adminUser.create({
          data: {
            email: initialEmail,
            passwordHash: defaultPasswordHash,
            name: 'Super Admin',
            role: 'SUPER_ADMIN'
          }
        });
        console.log(`Bootstrapped admin user using environment variables: ${initialEmail}`);
      } else {
        console.log('No admin users exist and INITIAL_ADMIN_EMAIL/PASSWORD env vars are not set.');
      }
    }

    // 3. AUTHENTICATION LOGIC
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

    // 4. JWT GENERATION
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
