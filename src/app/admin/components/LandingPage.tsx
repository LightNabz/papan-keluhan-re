"use client";
import React from "react";
import Statistics from "./Statistics";
import Clock from "./Clock";
import { BarChart3 } from "lucide-react";

interface Stats {
  total_notes: number;
  jenis_keluhan_counts: Record<string, number>;
  status_counts: Record<string, number>;
}

interface LandingPageProps {
  stats: Stats | null;
  onlineAdmins?: number;
}

export default function LandingPage({ stats, onlineAdmins }: LandingPageProps) {
  // Get current time for greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Selamat pagi";
    if (hour >= 12 && hour < 15) return "Selamat siang";
    if (hour >= 15 && hour < 19) return "Selamat sore";
    return "Selamat malam";
  };

  // Check if there are urgent complaints (status "Menunggu Respon")
  const getUrgentMessage = () => {
    if (!stats?.status_counts) return null;
    
    const pendingCount = stats.status_counts["Menunggu Respon"] || 0;
    
    if (pendingCount === 0) {
      return (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6">
          <p className="font-semibold">✅ Semua keluhan telah ditangani!</p>
          <p>Tidak ada keluhan yang menunggu respon.</p>
        </div>
      );
    }
    
    return (
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-lg mb-6">
        <p className="font-semibold">⚠️ Perhatian!</p>
        <p>Ada {pendingCount} keluhan yang masih menunggu respon. Mohon untuk segera menindaklanjuti.</p>
      </div>
    );
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
            <div className="text-lg text-gray-600 dark:text-gray-300 mb-20 mt-8">
              <Clock />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-4">{getGreeting()}, Admin!</h1>
          {getUrgentMessage()}
          
          {/* Online Admin Status */}
          {onlineAdmins !== undefined && onlineAdmins > 0 && (
            <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded-lg mb-6">
              <p className="font-semibold">👥 Admin Online</p>
              <p>Ada {onlineAdmins} admin yang sedang aktif saat ini.</p>
            </div>
          )}
        </div>
      </div>

      <h1 className="flex items-center gap-2 text-2xl md:text-3xl font-bold mb-6">
        <BarChart3 className="w-8 h-8" />
        Statistik
      </h1>
      
      <Statistics stats={stats} />
      
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl shadow-md mt-6">
        <h3 className="font-semibold mb-3 text-lg">📋 Panduan Cepat</h3>
        <ul className="space-y-2 text-sm">
          <li>• Gunakan menu navigasi untuk beralih antara halaman</li>
          <li>• Periksa keluhan yang menunggu respon secara berkala</li>
          <li>• Update status keluhan setelah ditindaklanjuti</li>
          <li>• Gunakan filter untuk mencari keluhan tertentu</li>
          <li>• Download laporan Excel untuk analisis lebih lanjut</li>
        </ul>
      </div>
    </div>
  );
}
