"use client";
import React from "react";
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from "recharts";

interface Stats {
  total_notes: number;
  jenis_keluhan_counts: Record<string, number>;
  status_counts: Record<string, number>;
}

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

interface StatisticsProps {
  stats: Stats | null;
}

export default function Statistics({ stats }: StatisticsProps) {
  // Data buat chart
  const jenisData = stats && stats.jenis_keluhan_counts
    ? Object.entries(stats.jenis_keluhan_counts).map(([jenis, count]) => ({
        name: jenis,
        value: count as number,
      }))
    : [];

  const statusData = stats && stats.status_counts
    ? Object.entries(stats.status_counts).map(([status, count]) => ({
        name: status,
        value: count as number,
      }))
    : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="p-6 bg-white dark:bg-blue-900 rounded-2xl shadow-md">
        <h3 className="font-semibold mb-2">Total Keluhan</h3>
        <p className="text-6xl font-bold text-blue-600">{stats?.total_notes || 0}</p>
      </div>

      {/* Pie & Bar Chart auto-resize karena ResponsiveContainer */}
      <div className="p-6 bg-white dark:bg-blue-900 rounded-2xl shadow-md">
        <h3 className="font-semibold mb-4">Jenis Keluhan</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={jenisData} dataKey="value" nameKey="name" outerRadius={80} label>
              {jenisData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="p-6 bg-white dark:bg-blue-900 rounded-2xl shadow-md">
        <h3 className="font-semibold mb-4">Status Keluhan</h3>
        <ResponsiveContainer width="100%" height={250}>
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
  );
}
