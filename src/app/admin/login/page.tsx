"use client";
import GridBackground from "../../components/GridBackground";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      router.push("/admin");
    } else {
      setError("⚠️ Username atau password salah.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-white dark:from-gray-900 dark:to-gray-950 text-gray-800 dark:text-gray-100 px-4">
      <GridBackground />
      <form
        className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 transition-transform hover:scale-[1.01] z-100"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
          Admin Login
        </h2>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 outline-none transition"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 outline-none transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && (
          <div className="mb-4 p-2 rounded-lg bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 text-sm text-center">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Login
        </button>

        <div className="mt-6 text-center">
          <a
            href="/keluhan"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Kembali ke halaman utama
          </a>
        </div>
      </form>
    </div>
  );
}
