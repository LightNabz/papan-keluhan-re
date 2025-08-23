"use client";
import React, { ChangeEvent, FormEvent } from "react";
import Image from "next/image";

interface FormData {
  title: string;
  content: string;
  name: string;
  jenis_keluhan: string;
  image: File | null;
}

interface KeluhanModalProps {
  open: boolean;
  onClose: () => void;
  form: FormData;
  status: string;
  imagePreview: string | null;
  loading: boolean;
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  onImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent) => void;
  onRemoveImage: () => void;
}

export default function KeluhanModal({
  open,
  onClose,
  form,
  status,
  imagePreview,
  loading,
  onChange,
  onImageChange,
  onSubmit,
  onRemoveImage,
}: KeluhanModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <form
        className="relative border rounded-xl p-9 shadow-2xl bg-white dark:bg-gray-800 transition-all duration-300 w-full max-w-lg"
        style={{
          boxShadow: "0 8px 24px 0 rgba(0,0,0,0.1)",
          border: "1.5px solid",
          minWidth: "320px",
        }}
        onSubmit={onSubmit}
      >
        {/* Close */}
        <button
          type="button"
          className="absolute top-3 right-3 text-2xl text-gray-500 hover:text-red-500"
          onClick={onClose}
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
              onChange={onChange}
              placeholder="Anon"
              className="bg-transparent border-b border-gray-400 w-[150px] focus:border-blue-400 focus:outline-none text-sm px-1 dark:bg-gray-800"
              maxLength={15}
            />
          </p>
          <select
            name="jenis_keluhan"
            value={form.jenis_keluhan}
            onChange={onChange}
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
          onChange={onChange}
          className="text-lg font-bold mb-6 w-full bg-transparent border-b border-gray-400 focus:border-blue-400 focus:outline-none dark:bg-gray-800"
          required
          maxLength={40}
        />

        {/* Isi Note */}
        <textarea
          name="content"
          placeholder="Tulis isi keluhan/saran/laporanmu di sini..."
          value={form.content}
          onChange={onChange}
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
                onChange={onImageChange}
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
                onClick={onRemoveImage}
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
            {`Keluhan dengan jenis "Perundungan" tidak akan ditampilkan secara publik.`}
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
  );
}
