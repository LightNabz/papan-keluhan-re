import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
      <nav className="mb-10 flex justify-between items-center px-6 py-4 shadow-md bg-white/80 dark:bg-gray-900/80 backdrop-blur sticky top-0 z-50">      <div className="logo font-extrabold text-2xl text-blue-600 dark:text-blue-400">
        📋 Papan Keluhan
      </div>
      <ul className="flex gap-6 font-medium">
        <li>
          <Link
            href="/keluhan"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Keluhan
          </Link>
        </li>
        <li>
          <Link
            href="/admin/login"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Admin
          </Link>
        </li>
      </ul>
    </nav>
  );
}