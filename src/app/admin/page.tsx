"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Download, LogOut, BarChart3, List } from "lucide-react";
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from "recharts";

interface Note {
  id: string;
  title: string;
  content: string;
  name: string;
  jenis_keluhan: string;
  status: string;
  image_url?: string;
}

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

export default function AdminDashboard() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/admin")
      .then((res) => {
        if (res.status === 401) {
          router.push("/admin/login");
          return [];
        }
        return res.json();
      })
      .then((data) => {
        setNotes(data.notes || []);
        setStats({
          total_notes: data.total_notes,
          jenis_keluhan_counts: data.jenis_keluhan_counts,
          status_counts: data.status_counts,
        });
        setLoading(false);
      });
  }, [router]);

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus keluhan ini?")) return;
    await fetch(`/api/admin/delete/${id}`, { method: "DELETE" });
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleStatusChange = async (id: string, status: string) => {
    await fetch(`/api/admin/update_status/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, status } : note
      )
    );
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout");
    router.push("/admin/login");
  };

  const handleDownload = async () => {
    window.location.href = "/api/admin/download";
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  // Data buat chart
  const jenisData = stats
    ? Object.entries(stats.jenis_keluhan_counts).map(([jenis, count]) => ({
        name: jenis,
        value: count as number,
      }))
    : [];

  const statusData = stats
    ? Object.entries(stats.status_counts).map(([status, count]) => ({
        name: status,
        value: count as number,
      }))
    : [];

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-white dark:bg-gray-800 shadow-lg flex flex-col">
        <div className="p-6 font-extrabold text-xl text-blue-600 dark:text-blue-400">
          🛠 Admin Panel
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-700">
            <BarChart3 size={18} /> Statistik
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-700">
            <List size={18} /> Keluhan
          </a>
        </nav>
        <div className="p-4 flex flex-col gap-4">
            <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 shadow-md"
            onClick={handleDownload}
          >
            <Download size={18} /> Download Excel
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto ml-64">
        <h1 className="text-3xl font-bold mb-6">Dashboard Admin</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md">
            <h3 className="font-semibold mb-2">Total Keluhan</h3>
            <p className="text-3xl font-bold text-blue-600">{stats?.total_notes || 0}</p>
          </div>

          {/* Pie Chart Jenis Keluhan */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md">
            <h3 className="font-semibold mb-4">Jenis Keluhan</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={jenisData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  label
                >
                  {jenisData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart Status */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md">
            <h3 className="font-semibold mb-4">Status Keluhan</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Notes List */}
        <div className="grid gap-6">
          {notes.map((note) => (
            <div key={note.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-sm text-gray-500">Oleh: {note.name || "Anon"}</p>
                  <h3 className="text-lg font-bold">{note.title}</h3>
                </div>
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                  onClick={() => handleDelete(note.id)}
                >
                  Hapus
                </button>
              </div>
              <p className="mb-3 text-gray-700 dark:text-gray-300">{note.content}</p>
              {note.image_url && (
                <img src={note.image_url} alt="lampiran" className="max-h-40 rounded-md mb-3" />
              )}
              <div className="flex justify-between items-center">
                <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                  {note.jenis_keluhan}
                </span>
                <div className="flex items-center gap-2">
                  <strong>Status:</strong>
                  <select
                    value={note.status}
                    onChange={(e) => handleStatusChange(note.id, e.target.value)}
                    className="border rounded px-2 py-1 text-sm dark:bg-gray-700"
                  >
                    <option value="Menunggu Respon">Menunggu Respon</option>
                    <option value="Sedang diproses">Sedang diproses</option>
                    <option value="Telah ditindaklanjuti">Telah ditindaklanjuti</option>
                    <option value="Ditolak">Ditolak</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
