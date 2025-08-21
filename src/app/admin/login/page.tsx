"use client";
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
      setError("Username atau password salah.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 text-gray-800 dark:text-gray-100">
      <form className="border rounded-xl p-5 shadow-md bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow p-8 rounded shadow-lg w-full max-w-sm" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
        <input
          type="text"
          placeholder="Username"
          className="w-full mb-3 p-2 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <div className="text-red-600 mb-2 text-sm">{error}</div>}
        <button
          type="submit"
          className="btn-transparent w-full px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Login
        </button>
        <div className="mt-4 text-center">
          <a href="/keluhan" className="text-blue-600 hover:underline">
            Kembali ke halaman utama
          </a>
        </div>
      </form>
    </div>
  );
}