import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import ExcelJS from 'exceljs';

interface Note {
  id: string;
  created_at: string;
  jenis_keluhan: string;
  title: string;
  content: string;
  name: string;
  image_url: string | null;
  status: string;
}

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

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Laporan Keluhan');

    worksheet.columns = [
      { header: 'No.', key: 'id', width: 10 },
      { header: 'Tanggal', key: 'created_at', width: 15 },
      { header: 'Jenis Keluhan', key: 'jenis_keluhan', width: 20 },
      { header: 'Judul', key: 'title', width: 15 },
      { header: 'Isi Keluhan', key: 'content', width: 50 },
      { header: 'Oleh', key: 'name', width: 20 },
      { header: 'Gambar', key: 'image_url', width: 15 },
      { header: 'Status', key: 'status', width: 25 },
    ];

    notes.forEach((note: Note) => {
      worksheet.addRow({
        id: note.id.slice(-8),
        created_at: new Date(note.created_at).toLocaleDateString('id-ID'),
        jenis_keluhan: note.jenis_keluhan,
        title: note.title,
        content: note.content,
        name: note.name,
        image_url: note.image_url ? note.image_url.split('/').pop() : '',
        status: note.status,
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename=laporan_keluhan.xlsx`,
      },
    });
  } catch {
    return NextResponse.json({ error: 'Failed to generate Excel' }, { status: 500 });
  }
}