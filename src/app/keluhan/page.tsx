"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Navbar from "../components/Navbar";
import Image from "next/image";

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
  const [status] = useState("Menunggu Respon");
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [activeNote, setActiveNote] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/notes")
      .then((res) => res.json())
      .then(setNotes);
  }, []);

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
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <form
            className="relative border rounded-xl p-8 shadow-2xl bg-white dark:bg-gray-800 transition-all duration-300 w-full max-w-lg"
            style={{
              boxShadow: "0 8px 24px 0 rgba(0,0,0,0.1)",
              border: "1.5px solid",
              minWidth: "320px",
            }}
            onSubmit={handleSubmit}
          >
            {/* Close */}
            <button
              type="button"
              className="absolute top-3 right-3 text-2xl text-gray-500 hover:text-red-500"
              onClick={() => setModalOpen(false)}
            >
              ×
            </button>

            {/* Header */}
            <div className="mb-3 flex justify-between items-center">
              <p className="text-sm text-gray-500 dark:text-gray-200">
                Oleh:{" "}
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Anon"
                  className="bg-transparent border-b border-gray-400 w-[150px] focus:border-blue-400 focus:outline-none text-sm px-1 dark:bg-gray-800"
                  maxLength={15}
                />
              </p>
              <select
                name="jenis_keluhan"
                value={form.jenis_keluhan}
                onChange={handleChange}
                className="px-3 py-1 text-xs rounded-full bg-blue-600 text-white shadow focus:outline-none"
                required
              >
                <option value="Perundungan">Perundungan</option>
                <option value="Sarana/prasarana">Sarana/prasarana</option>
                <option value="Saran">Saran</option>
              </select>
            </div>

            {/* Judul */}
            <input
              type="text"
              name="title"
              placeholder="Judul catatan..."
              value={form.title}
              onChange={handleChange}
              className="text-lg font-bold mb-6 w-full bg-transparent border-b border-gray-400 focus:border-blue-400 focus:outline-none dark:bg-gray-800"
              required
              maxLength={40}
            />

            {/* Isi Note */}
            <textarea
              name="content"
              placeholder="Tulis isi keluhan/saran/laporanmu di sini..."
              value={form.content}
              onChange={handleChange}
              className="w-full text-gray-600 dark:text-gray-300 mb-4 bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:border-blue-400 focus:outline-none transition-all"
              required
              rows={4}
              maxLength={300}
            />


            {/* Drag & Drop Upload */}
            <div className="w-full mb-4">
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
                  {/* Tombol remove */}
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
            <p className="text-sm mb-4 font-semibold">
              <strong>⚠️ </strong>{" "}
              <span className="text-yellow-600 dark:text-yellow-400">
                Keluhan dengan jenis "Perundungan" tidak akan ditampilkan secara publik.
              </span>
            </p>

            {/* Submit */}
            <button
              type="submit"
              className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-md transition-all duration-300 disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Mengirim..." : "🚀 Simpan Catatan"}
            </button>
          </form>
        </div>
      )}

        {/* Notes */}
        <div className="flex flex-wrap gap-12 items-start justify-center">
          {notes
            .filter((note) => note.jenis_keluhan !== "Perundungan")
            .map((note, idx) => (
              <div
                key={note.id}
                onClick={() =>
                  setActiveNote(activeNote === note.id ? null : note.id)
                }
                className={`relative border rounded-xl p-5 shadow-lg bg-white dark:bg-gray-800 transition-all duration-300 flex flex-col justify-between cursor-pointer w-full md:w-[calc(33.333%-3rem)]
                  ${activeNote === note.id ? "scale-[1.03] shadow-2xl" : idx % 2 === 0 ? "rotate-[-2deg]" : "rotate-[2deg]"}
                  hover:rotate-0 hover:scale-[1.03] hover:shadow-2xl
                  before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-24 before:h-3 before:bg-pink-300 before:rounded-b-lg before:content-['']`}
                style={{
                  boxShadow: "0 8px 24px 0 rgba(0,0,0,0.08)",
                  border: "1.5px solid",
                  minWidth: "280px",
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
                  <p className="text-gray-600 dark:text-gray-500 mb-3">
                    {note.content}
                  </p>
                  {note.image_url && (
                    <div className="overflow-hidden">
                      <Image
                        src={note.image_url}
                        alt="Lampiran"
                        width={600}
                        height={600}
                        className={`mb-3 max-h-40 rounded-lg object-cover shadow transition-all duration-500 ease-in-out
                          ${activeNote === note.id ? "max-h-[500px]" : ""}`}
                      />
                    </div>
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
