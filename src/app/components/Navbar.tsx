"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setTimeout(() => firstLinkRef.current?.focus(), 0);
    } else {
      document.body.style.overflow = "";
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <nav className="mb-10 flex items-center justify-between px-6 py-4 shadow-md bg-white dark:bg-gray-900 sticky top-0 z-50">
      <div className="logo font-extrabold text-2xl text-blue-600 dark:text-blue-400 select-none">
        📋 Papan Keluhan
      </div>

      {/* Desktop links */}
      <ul className="hidden md:flex gap-6 font-medium">
        <li>
          <Link
            href="/"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Beranda
          </Link>
        </li>
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

      {/* Mobile hamburger button */}
      <button
        type="button"
        aria-label="Open menu"
        aria-controls="mobile-drawer"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="md:hidden inline-flex items-center justify-center rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {/* Burger icon */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
          <path d="M3.75 5.75h16.5a.75.75 0 0 0 0-1.5H3.75a.75.75 0 0 0 0 1.5Zm0 7h16.5a.75.75 0 0 0 0-1.5H3.75a.75.75 0 0 0 0 1.5Zm0 7h16.5a.75.75 0 0 0 0-1.5H3.75a.75.75 0 0 0 0 1.5Z" />
        </svg>
      </button>

      {/* Mobile drawer + overlay */}
      {open && (
        <div className="md:hidden fixed inset-0 z-[60]" role="dialog" aria-modal="true">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />

          {/* Drawer panel */}
            <aside
              id="mobile-drawer"
              className="absolute right-0 top-0 h-full w-72 max-w-[85%] 
                        bg-white dark:bg-gray-900 
                        shadow-2xl border-l border-black/10 dark:border-white/10"
            >
            <div className="flex items-center justify-between p-4 border-b border-black/10 dark:border-white/10 bg-white dark:bg-gray-900">              
              <span className="font-semibold text-lg">Menu</span>
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {/* X icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                  <path d="M6.225 4.811a1 1 0 0 1 1.414 0L12 9.172l4.361-4.361a1 1 0 1 1 1.414 1.414L13.414 10.586l4.361 4.361a1 1 0 0 1-1.414 1.414L12 12l-4.361 4.361a1 1 0 0 1-1.414-1.414l4.361-4.361-4.361-4.361a1 1 0 0 1 0-1.414Z" />
                </svg>
              </button>
            </div>

            <ul className="p-4 space-y-2">
              <li>
                <Link
                  href="/"
                  ref={firstLinkRef}
                  onClick={() => setOpen(true)}
                  className="block rounded-xl px-4 py-3 font-medium hover:bg-black/5 dark:hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Beranda
                </Link>
                <Link
                  href="/keluhan"
                  ref={firstLinkRef}
                  onClick={() => setOpen(true)}
                  className="block rounded-xl px-4 py-3 font-medium hover:bg-black/5 dark:hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Keluhan
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/login"
                  onClick={() => setOpen(true)}
                  className="block rounded-xl px-4 py-3 font-medium hover:bg-black/5 dark:hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Admin
                </Link>
              </li>
            </ul>
          </aside>
        </div>
      )}
    </nav>
  );
}