import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory store for online admins with timestamps
// In production, this should be replaced with Redis or a database
const onlineAdmins = new Map<string, number>(); // adminId -> timestamp

// Clean up old entries (older than 5 minutes)
function cleanupOldAdmins() {
  const now = Date.now();
  const fiveMinutesAgo = now - 5 * 60 * 1000;
  
  for (const [adminId, timestamp] of onlineAdmins.entries()) {
    if (timestamp < fiveMinutesAgo) {
      onlineAdmins.delete(adminId);
    }
  }
}

export async function GET(req: NextRequest) {
  const adminId = req.cookies.get('admin_id')?.value;
  
  if (adminId) {
    // Update timestamp for this admin
    onlineAdmins.set(adminId, Date.now());
  }
  
  // Clean up old entries
  cleanupOldAdmins();
  
  // Return count of online admins
  return NextResponse.json({ 
    online_count: onlineAdmins.size,
    timestamp: Date.now()
  });
}

export async function POST(req: NextRequest) {
  const { adminId } = await req.json();
  
  if (adminId) {
    onlineAdmins.set(adminId, Date.now());
  }
  
  cleanupOldAdmins();
  
  return NextResponse.json({ 
    success: true,
    online_count: onlineAdmins.size 
  });
}

export async function DELETE(req: NextRequest) {
  const adminId = req.cookies.get('admin_id')?.value;
  
  if (adminId) {
    onlineAdmins.delete(adminId);
  }
  
  cleanupOldAdmins();
  
  return NextResponse.json({ 
    success: true,
    online_count: onlineAdmins.size 
  });
}
