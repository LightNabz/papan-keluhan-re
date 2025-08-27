# Papan Keluhan Siswa - Sistem Pengaduan Pelajar

> 🇺🇸 [Read English Version](./README.md)

Aplikasi web modern dan responsif yang dibangun dengan Next.js untuk mengelola keluhan dan masukan siswa. Platform ini memungkinkan siswa untuk mengirimkan keluhan secara anonim sementara memberikan administrator alat untuk mengelola dan menganalisis pengajuan.

## 🌟 Fitur

### Untuk Siswa
- **Pengajuan Keluhan Anonim**: Kirim keluhan, saran, atau laporan dengan aman
- **Multiple Jenis Keluhan**: Dukungan untuk berbagai kategori keluhan
- **Unggah Gambar**: Lampirkan gambar untuk konteks yang lebih baik
- **Pelacakan Status Real-time**: Lihat status keluhan yang diajukan
- **Desain Responsif**: Bekerja lancar di desktop dan perangkat mobile

### Untuk Administrator
- **Panel Admin yang Aman**: Sistem login terproteksi untuk personel berwenang
- **Manajemen Keluhan**: Lihat, perbarui status, dan hapus keluhan
- **Dashboard Statistik**: Analisis visual data keluhan
- **Ekspor Excel**: Unduh data keluhan dalam format spreadsheet
- **Monitoring Real-time**: Lacak aktivitas admin online
- **Integrasi Mini-game**: Game pencocokan interaktif untuk engagement

## 🛠️ Teknologi

- **Frontend**: Next.js 15.5.0, React 19.1.0, TypeScript
- **Styling**: Tailwind CSS 4
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Penyimpanan File**: Supabase Storage
- **Chart**: Recharts untuk visualisasi data
- **Ikon**: Lucide React

## 📦 Instalasi

1. **Clone repository**
   ```bash
   git clone <url-repository>
   cd papan-keluhan-re
   ```

2. **Install dependencies**
   ```bash
   npm install
   # atau
   yarn install
   # atau
   pnpm install
   ```

3. **Variabel Environment**
   Buat file `.env.local` dengan variabel berikut:
   ```env
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_KEY=your_supabase_anon_key
   SUPABASE_BUCKET=your_supabase_bucket_name
   ```

4. **Jalankan server development**
   ```bash
   npm run dev
   # atau
   yarn dev
   # atau
   pnpm dev
   ```

5. **Buka browser**
   Navigasi ke [http://localhost:3000](http://localhost:3000)

## 🚀 Penggunaan

### Akses Siswa
1. Kunjungi homepage untuk melihat keluhan yang ada
2. Klik "Tulis Keluhan" untuk mengajukan keluhan baru
3. Isi formulir keluhan dengan detail dan gambar opsional
4. Ajukan secara anonim atau dengan nama Anda

### Akses Admin
1. Navigasi ke `/admin/login`
2. Masukkan kredensial admin
3. Akses dashboard dengan:
   - Ringkasan statistik
   - Manajemen keluhan
   - Fungsi ekspor data
   - Monitoring aktivitas admin

## 📁 Struktur Proyek

```
src/
├── app/
│   ├── admin/                 # Halaman panel admin
│   │   ├── components/        # Komponen khusus admin
│   │   └── login/            # Halaman login admin
│   ├── api/                  # API routes
│   │   ├── admin/            # Endpoint API admin
│   │   └── notes/            # API catatan publik
│   ├── components/           # Komponen bersama
│   ├── keluhan/              # Halaman keluhan
│   │   └── tambah/           # Halaman tambah keluhan
│   ├── globals.css           # Gaya global
│   ├── layout.tsx            # Layout root
│   └── page.tsx              # Homepage
└── public/                   # Aset statis
```

## 🔧 Endpoint API

### Endpoint Publik
- `GET /api/notes` - Ambil semua keluhan publik
- `POST /api/submit` - Ajukan keluhan baru

### Endpoint Admin
- `GET /api/admin` - Dapatkan data dashboard admin
- `POST /api/admin/login` - Autentikasi admin
- `POST /api/admin/logout` - Logout admin
- `GET /api/admin/online` - Dapatkan jumlah admin online
- `GET /api/admin/download` - Unduh keluhan sebagai Excel
- `DELETE /api/admin/delete/[id]` - Hapus keluhan
- `PATCH /api/admin/update_status/[id]` - Perbarui status keluhan

## 🎨 Fitur Detail

### Jenis Keluhan
- **Masalah Akademik** - Masalah dengan mata pelajaran, guru, atau kurikulum
- **Masalah Fasilitas** - Masalah dengan fasilitas kampus
- **Kekhawatiran Administratif** - Masalah birokrasi atau administratif
- **Laporan Perundungan** - Penanganan khusus untuk laporan sensitif

### Dashboard Admin
- **Statistik Real-time**: Hitungan dan chart langsung
- **Manajemen Keluhan**: Operasi CRUD lengkap
- **Pelacakan Status**: Perbarui status resolusi keluhan
- **Ekspor Data**: Fungsi unduh Excel
- **Desain Responsif**: Antarmuka admin yang ramah mobile

## 🚀 Deployment

### Vercel (Direkomendasikan)
1. Hubungkan repository Anda ke Vercel
2. Konfigurasi variabel environment di dashboard Vercel
3. Deploy otomatis pada git push

### Platform Lain
Aplikasi dapat dideploy ke platform apa pun yang mendukung Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- Server self-hosted

## 🤝 Berkontribusi

1. Fork repository
2. Buat branch fitur (`git checkout -b feature/fitur-menakjubkan`)
3. Commit perubahan Anda (`git commit -m 'Tambah fitur menakjubkan'`)
4. Push ke branch (`git push origin feature/fitur-menakjubkan`)
5. Buka Pull Request

## 📝 Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT - lihat file LICENSE untuk detailnya.

## 🙏 Ucapan Terima Kasih

- Dibangun dengan [Next.js](https://nextjs.org/)
- Didesain dengan [Tailwind CSS](https://tailwindcss.com/)
- Database didukung oleh [Supabase](https://supabase.com/)
- Ikon oleh [Lucide](https://lucide.dev/)

## 📞 Dukungan

Untuk dukungan atau pertanyaan, silakan hubungi tim pengembangan atau buat issue di repository.

---

**Catatan**: Aplikasi ini dirancang untuk institusi pendidikan untuk memfasilitasi komunikasi transparan antara siswa dan administrasi sambil mempertahankan standar privasi dan keamanan.
