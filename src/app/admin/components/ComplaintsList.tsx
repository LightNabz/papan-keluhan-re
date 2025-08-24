"use client";
import React, { useState } from "react";
import { Filter, Trash2 } from "lucide-react";
import Image from "next/image";
import Statistics from "./Statistics";
import { Download, LogOut, BarChart3, List, X, Home } from "lucide-react";

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

interface ComplaintsListProps {
  notes: Note[];
  stats: Stats | null;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: string) => void;
}

export default function ComplaintsList({ notes, stats, onDelete, onStatusChange }: ComplaintsListProps) {
  const [filterJenisKeluhan, setFilterJenisKeluhan] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <div>
        <h1 className="flex items-center gap-2 text-2xl md:text-3xl font-bold mb-6 mt-8">
        <BarChart3 className="w-8 h-8" />
            Statistik
        </h1>
    <Statistics stats={stats} />
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 mt-10">
        <h1 className="flex items-center gap-2 text-2xl md:text-3xl font-bold">
        <List className="w-8 h-8" />
            Keluhan-keluhan
        </h1>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        {/* Search Input */}
        <div>
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Cari keluhan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 pl-10 border rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        {/* Filter Dropdowns */}
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-4">
          {/* Jenis Keluhan Filter */}
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-600 dark:text-gray-300" />
            <select
              value={filterJenisKeluhan}
              onChange={(e) => setFilterJenisKeluhan(e.target.value)}
              className="border rounded-md px-3 py-2 text-sm dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Semua Jenis</option>
              {Object.keys(stats?.jenis_keluhan_counts || {}).map((jenis) => (
                <option key={jenis} value={jenis}>
                  {jenis} ({stats?.jenis_keluhan_counts?.[jenis] || 0})
                </option>
              ))}
            </select>
          </div>
          
          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-600 dark:text-gray-300" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border rounded-md px-3 py-2 text-sm dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Semua Status</option>
              {Object.keys(stats?.status_counts || {}).map((status) => (
                <option key={status} value={status}>
                  {status} ({stats?.status_counts[status]})
                </option>
              ))}
            </select>
          </div>
        </div>
        </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes
          .filter(note => {
            // Search filter - search across multiple fields
            const matchesSearch = searchQuery === "" || 
              note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
              note.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              note.jenis_keluhan.toLowerCase().includes(searchQuery.toLowerCase()) ||
              note.status.toLowerCase().includes(searchQuery.toLowerCase());
            
            // Existing filters
            const matchesJenisKeluhan = filterJenisKeluhan === "" || note.jenis_keluhan === filterJenisKeluhan;
            const matchesStatus = filterStatus === "" || note.status === filterStatus;
            
            return matchesSearch && matchesJenisKeluhan && matchesStatus;
          })
          .map((note) => (
            <div
              key={note.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 md:p-6 flex flex-col max-w-lg w-full mx-auto h-full"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-3">
                <p className="text-sm text-gray-500">Oleh: {note.name || "Anon"}</p>
                <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                  {note.jenis_keluhan}
                </span>
              </div>

              {/* Title & Content */}
              <div>
                <h3 className="text-lg font-bold">{note.title}</h3>
                <p className="mb-3 text-gray-700 dark:text-gray-300">{note.content}</p>
                {note.image_url && (
                  <Image
                    src={note.image_url}
                    alt="lampiran"
                    width={500}
                    height={500}
                    className="max-h-40 rounded-md mb-3 w-full object-cover"
                  />
                )}
              </div>

              {/* Status + Hapus, selalu di bawah */}
              <div className="mt-auto flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <strong>Status:</strong>
                    <select
                      value={note.status}
                      onChange={(e) => onStatusChange(note.id, e.target.value)}
                      className="border rounded px-2 py-1 text-xs dark:bg-gray-700 max-w-[160px]"
                    >
                      <option value="Menunggu Respon">Menunggu Respon</option>
                      <option value="Sedang diproses">Sedang diproses</option>
                      <option value="Telah ditindaklanjuti">Telah ditindaklanjuti</option>
                      <option value="Ditolak">Ditolak</option>
                    </select>
                  </div>
                  <button
                    className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    onClick={() => onDelete(note.id)}
                    title="Hapus keluhan"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
