import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ note_id: string }> }) {
  // For cookie parsing, use req.cookies in App Router
  const cookies = req.cookies;
  if (!cookies.get('admin_logged_in')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { note_id } = await params;

  const db_headers = {
    apikey: process.env.SUPABASE_KEY!,
    Authorization: `Bearer ${process.env.SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    Prefer: 'return=minimal',
  };
  const storage_headers = {
    apikey: process.env.SUPABASE_KEY!,
    Authorization: `Bearer ${process.env.SUPABASE_KEY}`,
  };

  try {
    // Get note details
    const getRes = await axios.get(
      `${process.env.SUPABASE_URL}/rest/v1/notes?id=eq.${note_id}&select=*`,
      { headers: db_headers }
    );
    const notes = getRes.data;
    if (!notes.length) return NextResponse.json({ error: 'Note not found' }, { status: 404 });

    const note = notes[0];
    // Delete image if exists
    if (note.image_url) {
      const filename = note.image_url.split('/').pop();
      await axios.delete(
        `${process.env.SUPABASE_URL}/storage/v1/object/${process.env.SUPABASE_BUCKET}/${filename}`,
        { headers: storage_headers }
      );
    }
    // Delete note from database
    await axios.delete(
      `${process.env.SUPABASE_URL}/rest/v1/notes?id=eq.${note_id}`,
      { headers: db_headers }
    );
    return NextResponse.json({ message: 'Note deleted successfully' });
  } catch {
    return NextResponse.json({ error: 'Failed to delete note' }, { status: 500 });
  }
}