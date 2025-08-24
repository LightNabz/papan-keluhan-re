"use client";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Download, LogOut, BarChart3, List, X, Home } from "lucide-react";
import GridBackground from "../components/GridBackground";
import LandingPage from "./components/LandingPage";
import ComplaintsList from "./components/ComplaintsList";
import ComplaintMatchingGame from "./components/ComplaintMatchingGame";

interface Note {
  id: string;
  title: string;
  content: string;
  name: string;
  jenis_keluhan: string;
  status: string;
  image_url?: string;
}

interface Stats {
  total_notes: number;
  jenis_keluhan_counts: Record<string, number>;
  status_counts: Record<string, number>;
}

export default function AdminDashboard() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [onlineAdmins, setOnlineAdmins] = useState(0);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState<"landing" | "complaints" | "minigame">("landing");
  const router = useRouter();
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    fetch("/api/admin")
      .then((res) => {
        if (res.status === 401) {
          router.push("/admin/login");
          return null; // Prevent further processing
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          setNotes(data.notes || []);
          setStats({
            total_notes: data.total_notes,
            jenis_keluhan_counts: data.jenis_keluhan_counts,
            status_counts: data.status_counts,
          });
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching admin data:", error);
        setLoading(false);
      });
  }, [router]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => firstLinkRef.current?.focus(), 0);
    } else {
      document.body.style.overflow = "";
    }
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Fetch online admin count periodically
  useEffect(() => {
    const fetchOnlineAdmins = async () => {
      try {
        const response = await fetch('/api/admin/online');
        if (response.ok) {
          const data = await response.json();
          setOnlineAdmins(data.online_count);
        }
      } catch (error) {
        console.error('Failed to fetch online admins:', error);
      }
    };

    fetchOnlineAdmins();
    const interval = setInterval(fetchOnlineAdmins, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

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

  const renderContent = () => {
    switch (currentView) {
      case "landing":
        return <LandingPage stats={stats} onlineAdmins={onlineAdmins} />;
      case "complaints":
        return (
          <ComplaintsList
            notes={notes}
            stats={stats}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
          />
        );
      case "minigame":
        return <ComplaintMatchingGame />;
      default:
        return <LandingPage stats={stats} />;
    }
  };

  return (
      <div className="font-sans min-h-screen flex bg-gray-100 dark:bg-gray-900 dark:text-gray-100">
        <GridBackground />
        {/* Sidebar Desktop */}
        <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 bg-white dark:bg-gray-800 shadow-lg flex-col">
          <div className="p-6 font-extrabold text-xl text-blue-600 dark:text-blue-400">
            🛠 Admin Panel
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <button
            onClick={() => setCurrentView("landing")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-700 ${
              currentView === "landing" ? "bg-blue-100 dark:bg-gray-700" : ""
            }`}
          >
            <Home size={18} /> Beranda
          </button>
          <button
            onClick={() => setCurrentView("complaints")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-700 ${
              currentView === "complaints" ? "bg-blue-100 dark:bg-gray-700" : ""
            }`}
          >
            <List size={18} /> Keluhan
          </button>
          <button
            onClick={() => setCurrentView("minigame")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-700 ${
              currentView === "minigame" ? "bg-blue-100 dark:bg-gray-700" : ""
            }`}
          >
            <BarChart3 size={18} /> Minigame
          </button>
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

      {/* Navbar Mobile */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-white dark:bg-gray-800 shadow z-500 flex items-center justify-between px-4 py-3">
        <div className="font-bold text-blue-600 dark:text-blue-400">🛠 Admin Panel</div>
        {/* Tombol hamburger */}
        <button
          type="button"
          aria-label="Open menu"
          aria-controls="mobile-drawer"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(true)}
          className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <List size={22} />
        </button>
      </div>

      {/* Mobile Drawer + Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[60]" role="dialog" aria-modal="true">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer panel */}
          <aside
            id="mobile-drawer"
            className="absolute right-0 top-0 h-full w-72 max-w-[85%] 
                      bg-white dark:bg-gray-800 
                      shadow-2xl border-l border-black/10 dark:border-white/10"
          >
            <div className="flex items-center justify-between p-4 border-b border-black/10 dark:border-white/10">
              <span className="font-semibold text-lg">Menu Admin</span>
              <button
                aria-label="Close menu"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="p-4 space-y-2">
              <button
                onClick={() => {
                  setCurrentView("landing");
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  currentView === "landing" ? "bg-blue-100 dark:bg-gray-700" : ""
                }`}
              >
                <Home size={18} /> Beranda
              </button>
              <button
                onClick={() => {
                  setCurrentView("complaints");
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  currentView === "complaints" ? "bg-blue-100 dark:bg-gray-700" : ""
                }`}
              >
                <List size={18} /> Keluhan
              </button>
              <button
                onClick={() => {
                  setCurrentView("minigame");
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  currentView === "minigame" ? "bg-blue-100 dark:bg-gray-700" : ""
                }`}
              >
                <BarChart3 size={18} /> Minigame
              </button>
            </nav>

            <div className="p-4 flex flex-col gap-4 mt-auto">
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
                onClick={() => {
                  handleDownload();
                  setMobileMenuOpen(false);
                }}
              >
                <Download size={18} /> Download Excel
              </button>
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto md:ml-64 mt-20 md:mt-0 relative z-100">
        {renderContent()}
      </main>
    </div>
  );
}
