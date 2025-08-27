# Papan Keluhan Siswa - Student Complaint Board

> 🇮🇩 [Baca versi Bahasa Indonesia](./README_ID.md)

A modern, responsive web application built with Next.js for managing student complaints and feedback. This platform allows students to submit complaints anonymously while providing administrators with tools to manage and analyze submissions.

## 🌟 Features

### For Students
- **Anonymous Complaint Submission**: Submit complaints, suggestions, or reports securely
- **Multiple Complaint Types**: Support for various complaint categories
- **Image Upload**: Attach images to complaints for better context
- **Real-time Status Tracking**: View the status of submitted complaints
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### For Administrators
- **Secure Admin Panel**: Protected login system for authorized personnel
- **Complaint Management**: View, update status, and delete complaints
- **Statistics Dashboard**: Visual analytics of complaint data
- **Excel Export**: Download complaint data in spreadsheet format
- **Real-time Monitoring**: Track online admin activity
- **Mini-game Integration**: Interactive matching game for engagement

## 🛠️ Tech Stack

- **Frontend**: Next.js 15.5.0, React 19.1.0, TypeScript
- **Styling**: Tailwind CSS 4
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **File Storage**: Supabase Storage
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd papan-keluhan-re
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Variables**
   Create a `.env.local` file with the following variables:
   ```env
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_KEY=your_supabase_anon_key
   SUPABASE_BUCKET=your_supabase_bucket_name
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Usage

### Student Access
1. Visit the homepage to view existing complaints
2. Click "Tulis Keluhan" to submit a new complaint
3. Fill out the complaint form with details and optional image
4. Submit anonymously or with your name

### Admin Access
1. Navigate to `/admin/login`
2. Enter admin credentials
3. Access the dashboard with:
   - Statistics overview
   - Complaint management
   - Data export functionality
   - Admin activity monitoring

## 📁 Project Structure

```
src/
├── app/
│   ├── admin/                 # Admin panel pages
│   │   ├── components/        # Admin-specific components
│   │   └── login/            # Admin login page
│   ├── api/                  # API routes
│   │   ├── admin/            # Admin API endpoints
│   │   └── notes/            # Public notes API
│   ├── components/           # Shared components
│   ├── keluhan/              # Complaint pages
│   │   └── tambah/           # Add complaint page
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Homepage
└── public/                   # Static assets
```

## 🔧 API Endpoints

### Public Endpoints
- `GET /api/notes` - Fetch all public complaints
- `POST /api/submit` - Submit a new complaint

### Admin Endpoints
- `GET /api/admin` - Get admin dashboard data
- `POST /api/admin/login` - Admin authentication
- `POST /api/admin/logout` - Admin logout
- `GET /api/admin/online` - Get online admin count
- `GET /api/admin/download` - Download complaints as Excel
- `DELETE /api/admin/delete/[id]` - Delete a complaint
- `PATCH /api/admin/update_status/[id]` - Update complaint status

## 🎨 Features in Detail

### Complaint Types
- **Academic Issues** - Problems with courses, teachers, or curriculum
- **Facility Problems** - Issues with campus facilities
- **Administrative Concerns** - Bureaucratic or administrative issues
- **Bullying Reports** - Special handling for sensitive reports

### Admin Dashboard
- **Real-time Statistics**: Live counts and charts
- **Complaint Management**: Full CRUD operations
- **Status Tracking**: Update complaint resolution status
- **Data Export**: Excel download functionality
- **Responsive Design**: Mobile-friendly admin interface

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on git push

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- Self-hosted servers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Database powered by [Supabase](https://supabase.com/)
- Icons by [Lucide](https://lucide.dev/)

## 📞 Support

For support or questions, please contact the development team or create an issue in the repository.

---

**Note**: This application is designed for educational institutions to facilitate transparent communication between students and administration while maintaining privacy and security standards.
