"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Navbar from "../components/Navbar";

interface Note {
  id: string;
  title: string;
  content: string;
  name: string;
  jenis_keluhan: string;
  status: string;
  image_url?: string;
}

export default function KeluhanPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    content: "",
    name: "",
    jenis_keluhan: "Perundungan",
    image: null as File | null,
  });
  const [status, setStatus] = useState("Menunggu Respon");
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/notes")
      .then((res) => res.json())
      .then(setNotes);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
    formData.append("status", status);
    if (form.image) formData.append("image", form.image);

    const res = await fetch("/api/submit", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      setModalOpen(false);
      setForm({
        title: "",
        content: "",
        name: "",
        jenis_keluhan: "Perundungan",
        image: null,
      });
      setImagePreview(null);
      fetch("/api/notes")
        .then((res) => res.json())
        .then(setNotes);
    }
    setLoading(false);
  };

  return (
    <div className="font-sans min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 text-gray-800 dark:text-gray-100">
      {/* Navbar */}
      <Navbar />

      <div className="container mx-auto px-6">
        {/* Button Tambah */}
        <div className="flex justify-center mb-8">
          <button
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition-transform transform hover:scale-105"
            onClick={() => setModalOpen(true)}
          >
            ➕ Tambah Keluhan
          </button>
        </div>
        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <form
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md relative animate-fadeIn"
              onSubmit={handleSubmit}
            >
              <button
                type="button"
                className="absolute top-2 right-3 text-2xl text-gray-600 hover:text-red-500"
                onClick={() => setModalOpen(false)}
              >
                ×
              </button>
              <h2 className="text-2xl font-bold mb-6 text-center text-blue-600 dark:text-blue-400">
                ✍️ Tulis Keluhan
              </h2>
              <input
                type="text"
                name="title"
                placeholder="Judul"
                value={form.title}
                onChange={handleChange}
                className="w-full mb-3 p-3 border rounded-xl focus:ring focus:ring-blue-300 dark:bg-gray-700"
                required
                maxLength={40}
              />
              <textarea
                name="content"
                placeholder="Isi keluhan/saran/laporan"
                value={form.content}
                onChange={handleChange}
                className="w-full mb-3 p-3 border rounded-xl focus:ring focus:ring-blue-300 dark:bg-gray-700"
                required
                maxLength={300}
              />
              <input
                type="text"
                name="name"
                placeholder="Nama (opsional)"
                value={form.name}
                onChange={handleChange}
                className="w-full mb-3 p-3 border rounded-xl focus:ring focus:ring-blue-300 dark:bg-gray-700"
                maxLength={15}
              />
              <select
                name="jenis_keluhan"
                value={form.jenis_keluhan}
                onChange={handleChange}
                className="w-full mb-3 p-3 border rounded-xl dark:bg-gray-700"
                required
              >
                <option value="Perundungan">Perundungan</option>
                <option value="Sarana/prasarana">Sarana/prasarana</option>
                <option value="Saran">Saran</option>
              </select>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full mb-3"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mb-3 max-h-40 rounded-lg shadow-md"
                />
              )}
              <button
                type="submit"
                className="w-full px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition-all"
                disabled={loading}
              >
                {loading ? "Mengirim..." : "Kirim Keluhan"}
              </button>
            </form>
          </div>
        )}

        {/* Notes */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
          {notes
            .filter((note) => note.jenis_keluhan !== "Perundungan")
            .map((note, idx) => (
              <div
                key={note.id}
                className={`relative border rounded-xl p-5 shadow-lg bg-white dark:bg-gray-800 transition-shadow flex flex-col justify-between h-full
        ${idx % 2 === 0 ? "rotate-[-2deg]" : "rotate-[2deg]"}
        before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-24 before:h-3 before:bg-pink-300 before:rounded-b-lg before:content-['']`}
                style={{
                  boxShadow: "0 8px 24px 0 rgba(0,0,0,0.08)",
                  border: "1.5px solid",
                }}
              >
                <div>
                  <div className="mb-2 flex justify-between items-center">
                    <p className="text-sm text-gray-500 dark:text-gray-200">
                      Oleh: {note.name || "Anon"}
                    </p>
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 shadow">
                      {note.jenis_keluhan}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-700 dark:text-gray-300">
                    {note.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-500 mb-3">{note.content}</p>
                  {note.image_url && (
                    <img
                      src={note.image_url}
                      alt="Lampiran"
                      className="mb-3 max-h-40 rounded-lg object-cover shadow"
                    />
                  )}
                </div>
                <p className="text-sm mt-4 font-semibold">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`${
                      note.status === "Selesai"
                        ? "text-green-600 dark:text-green-400"
                        : "text-yellow-600 dark:text-yellow-400"
                    }`}
                  >
                    {note.status || "Menunggu Respon"}
                  </span>
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
