"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Image from "next/image";
import Link from "next/link";

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
  const [activeNote, setActiveNote] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/notes")
      .then((res) => res.json())
      .then(setNotes);
  }, []);

  return (
    <div className="font-sans min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 text-gray-800 dark:text-gray-100">
      {/* Navbar */}
      <Navbar />
      <div className="container mx-auto px-6">
        {/* Button Tambah */}
        <div className="flex justify-center mb-8">
          <Link
            href="/keluhan/tambah"
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition-transform transform hover:scale-105"
          >
            ➕ Tambah Keluhan
          </Link>
        </div>

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
                  ${
                    activeNote === note.id
                      ? "scale-[1.03] shadow-2xl"
                      : idx % 2 === 0
                      ? "rotate-[-2deg]"
                      : "rotate-[2deg]"
                  }
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
