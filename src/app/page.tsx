import Link from "next/link";
import Image from "next/image";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div className="font-sans min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 text-gray-800 dark:text-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex flex-col gap-8 items-center justify-center flex-1 px-6 text-center">
        <Image
          src="/next.svg"
          alt="Papan Keluhan Logo"
          width={140}
          height={30}
          priority
          className="dark:invert mb-6"
        />
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          Selamat Datang di <br /> Papan Keluhan Siswa
        </h1>
        <p className="text-lg max-w-2xl text-gray-600 dark:text-gray-300">
          Sampaikan keluhan, saran, atau laporan perundungan secara{" "}
          <span className="font-semibold">anonim</span> dan{" "}
          <span className="font-semibold">aman</span>. Kami mendengarkan
          suaramu.
        </p>
        <Link href="/keluhan">
          <button className="px-8 py-3 rounded-2xl shadow-md bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all transform hover:scale-105">
            ✍️ Tulis Keluhan
          </button>
        </Link>
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-6 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
        &copy; {new Date().getFullYear()} Papan Keluhan Siswa · Dibuat dengan 💙
      </footer>
    </div>
  );
}