"use client";

import React from "react";

export default function Background({ children }: { children: React.ReactNode }) {
  // SVG patterns encoded properly
  const lightPattern = "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E";
  
  const darkPattern = "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E";

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* WhatsApp-style background pattern */}
      <div className="absolute inset-0 z-0 opacity-20">
        {/* Light mode pattern */}
        <div 
          className="hidden dark:block absolute inset-0" 
          style={{ backgroundImage: `url("${darkPattern}")` }}
        />
        
        {/* Dark mode pattern */}
        <div 
          className="dark:hidden absolute inset-0" 
          style={{ backgroundImage: `url("${lightPattern}")` }}
        />
      </div>

      {/* Main content container */}
      <div className="relative z-10 min-h-screen bg-gray-50/80 dark:bg-gray-900/90 backdrop-blur-sm">
        {children}
      </div>

      {/* Additional decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-blue-200/20 dark:bg-blue-800/20 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-green-200/20 dark:bg-green-800/20 blur-3xl" />
      <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-purple-200/20 dark:bg-purple-800/20 blur-3xl" />
    </div>
  );
}
