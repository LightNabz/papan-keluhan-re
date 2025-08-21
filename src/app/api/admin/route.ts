import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  const cookies = req.cookies;
  if (!cookies.get('admin_logged_in')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const response = await axios.get(
      `${process.env.SUPABASE_URL}/rest/v1/notes?select=*&order=created_at.desc`,
      {
        headers: {
          apikey: process.env.SUPABASE_KEY!,
          Authorization: `Bearer ${process.env.SUPABASE_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    const notes = response.data;
    const jenis_keluhan_counts: Record<string, number> = { Perundungan: 0, 'Sarana/prasarana': 0, Saran: 0 };
    const status_counts: Record<string, number> = {
      'Sedang diproses': 0,
      'Menunggu Respon': 0,
      'Telah ditindaklanjuti': 0,
      Ditolak: 0,
    };
    notes.forEach((note: any) => {
      if (jenis_keluhan_counts[note.jenis_keluhan] !== undefined)
        jenis_keluhan_counts[note.jenis_keluhan]++;
      if (status_counts[note.status] !== undefined)
        status_counts[note.status]++;
    });
    return NextResponse.json({
      notes,
      total_notes: notes.length,
      jenis_keluhan_counts,
      status_counts,
    });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
  }
}