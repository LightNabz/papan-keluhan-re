"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import Navbar from "../../components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface FormState {
  title: string;
  content: string;
  name: string;
  jenis_keluhan: string;
  image: File | null;
}

export default function TambahKeluhanPage() {
  const [form, setForm] = useState<FormState>({
    title: "",
    content: "",
    name: "",
    jenis_keluhan: "Perundungan",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, image: file }));
    setImagePreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("content", form.content);
    formData.append("name", form.name);
    formData.append("jenis_keluhan", form.jenis_keluhan);
    formData.append("status", "Menunggu Respon");
    if (form.image) formData.append("image", form.image);

    const res = await fetch("/api/submit", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      // Redirect to keluhan page after successful submission
      router.push("/keluhan");
      router.refresh();
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="font-sans min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 text-gray-800 dark:text-gray-100">
      {/* Navbar */}
      <Navbar />
      
      <div className="container mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <li>
              <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">
                Beranda
              </Link>
            </li>
            <li className="before:content-['/'] before:mx-2">
              <Link href="/keluhan" className="hover:text-blue-600 dark:hover:text-blue-400">
                Keluhan
              </Link>
            </li>
            <li className="before:content-['/'] before:mx-2 font-semibold text-blue-600 dark:text-blue-400">
              Tambah Keluhan
            </li>
          </ol>
        </nav>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            📝 Tambah Keluhan Baru
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Sampaikan keluhan, saran, atau laporan perundungan secara anonim dan aman
          </p>
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto">
          <form
            className="border rounded-xl p-6 shadow-lg bg-white dark:bg-gray-800"
            onSubmit={handleSubmit}
          >
            {/* Nama Pengirim */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nama (opsional)
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Anon"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                maxLength={15}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Kosongkan jika ingin tetap anonim
              </p>
            </div>

            {/* Jenis Keluhan */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Jenis Keluhan *
              </label>
              <select
                name="jenis_keluhan"
                value={form.jenis_keluhan}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required
              >
                <option value="Perundungan">Perundungan</option>
                <option value="Sarana/prasarana">Sarana/prasarana</option>
                <option value="Saran">Saran</option>
              </select>
            </div>

            {/* Judul */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Judul Keluhan *
              </label>
              <input
                type="text"
                name="title"
                placeholder="Masukkan judul keluhan..."
                value={form.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required
                maxLength={40}
              />
            </div>

            {/* Isi Keluhan */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Isi Keluhan *
              </label>
              <textarea
                name="content"
                placeholder="Tulis isi keluhan/saran/laporanmu di sini..."
                value={form.content}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required
                rows={6}
                maxLength={300}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Maksimal 300 karakter
              </p>
            </div>

            {/* Upload Gambar */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Upload Gambar (opsional)
              </label>
              {!imagePreview ? (
                <label
                  htmlFor="fileUpload"
                  className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-gray-400 rounded-xl text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 transition-all"
                >
                  <p className="text-gray-500 dark:text-gray-300">
                    📂 Drag & Drop atau klik untuk unggah gambar
                  </p>
                  <input
                    id="fileUpload"
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="relative group">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    width={600}
                    height={600}
                    className="max-h-48 w-full object-cover rounded-lg shadow-md"
                  />
                  <button
                    type="button"
                    onClick={() => setImagePreview(null)}
                    className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>

            {/* Disclaimer */}
            {form.jenis_keluhan === "Perundungan" && (
              <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg">
                <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-400">
                  ⚠️ Perhatian
                </p>
                <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                  Keluhan dengan jenis "Perundungan" tidak akan ditampilkan secara publik.
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Link
                href="/keluhan"
                className="px-6 py-3 rounded-xl bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold transition-colors"
              >
                Batal
              </Link>
              <button
                type="submit"
                className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-md transition-all duration-300 disabled:opacity-60"
                disabled={loading}
              >
                {loading ? "Mengirim..." : "🚀 Kirim Keluhan"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
