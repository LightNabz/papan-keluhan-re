import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { username, password } = body as { username: string; password: string };

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const adminId = `${username}_${Date.now()}`;
    const response = NextResponse.json({ message: 'Login successful' });
    response.cookies.set('admin_logged_in', 'true', {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 2,
    });
    response.cookies.set('admin_id', adminId, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 2,
    });
    
    // Register admin as online
    await fetch(`${req.nextUrl.origin}/api/admin/online`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ adminId }),
    });
    
    return response;
  } else {
    return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
  }
}
