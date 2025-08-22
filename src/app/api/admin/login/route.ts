import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { username, password } = body as { username: string; password: string };

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const response = NextResponse.json({ message: 'Login successful' });
    response.cookies.set('admin_logged_in', 'true', {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 2,
    });
    return response;
  } else {
    return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
  }
}
