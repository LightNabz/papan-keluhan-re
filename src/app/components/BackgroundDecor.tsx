// components/BackgroundDecor.tsx
"use client";
import React from "react";

export default function BackgroundDecor() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Top left blob - positioned to be visible in the main content area */}
      <div className="absolute top-20 left-10 w-[250px] h-[250px] bg-pink-300 dark:bg-pink-600 rounded-full filter blur-3xl opacity-60 dark:opacity-40 animate-pulse"></div>

      {/* Bottom right blob - positioned to be visible in the main content area */}
      <div className="absolute bottom-20 right-10 w-[280px] h-[280px] bg-blue-300 dark:bg-blue-600 rounded-full filter blur-3xl opacity-50 dark:opacity-30 animate-pulse"></div>

      {/* Center blob - subtle background element */}
      <div className="absolute top-1/3 left-1/4 w-[180px] h-[180px] bg-purple-300 dark:bg-purple-600 rounded-full filter blur-3xl opacity-30 dark:opacity-20 animate-pulse"></div>

      {/* Subtle gradient overlay to blend with the main gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-pink-50/20 dark:from-gray-900/20 dark:to-purple-900/20"></div>

      {/* Very subtle grid pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22><rect width=%2260%22 height=%2260%22 fill=%22none%22 stroke=%22%23000000%22 stroke-width=%220.3%22 opacity=%220.08%22/></svg>')] dark:bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22><rect width=%2260%22 height=%2260%22 fill=%22none%22 stroke=%22%23ffffff%22 stroke-width=%220.3%22 opacity=%220.08%22/></svg>')]"></div>
    </div>
  );
}
