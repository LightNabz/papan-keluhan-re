import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const adminId = req.cookies.get('admin_id')?.value;
  const response = NextResponse.json({ message: 'Logged out' });
  
  // Clear both cookies
  response.cookies.set('admin_logged_in', '', {
    httpOnly: true,
    path: '/',
    expires: new Date(0),
  });
  
  response.cookies.set('admin_id', '', {
    httpOnly: true,
    path: '/',
    expires: new Date(0),
  });
  
  // Remove admin from online list
  if (adminId) {
    try {
      await fetch(`${req.nextUrl.origin}/api/admin/online`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Failed to remove admin from online list:', error);
    }
  }
  
  return response;
}
