"use client";
import React from "react";

export default function GridBackgroundPattern() {
  return (
    <>
      {/* Light mode grid */}
      <div
        className="pointer-events-none fixed inset-0 z-0 dark:hidden"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          WebkitMaskImage: `
            radial-gradient(circle at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)
          `,
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          WebkitMaskSize: "cover",
          maskImage: `
            radial-gradient(circle at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)
          `,
          maskRepeat: "no-repeat",
          maskPosition: "center",
          maskSize: "cover",
        }}
      />

      {/* Dark mode grid */}
      <div
        className="pointer-events-none fixed inset-0 z-0 hidden dark:block"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          WebkitMaskImage: `
            radial-gradient(circle at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)
          `,
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          WebkitMaskSize: "cover",
          maskImage: `
            radial-gradient(circle at center, rgba(0,0,0,1) 5%, rgba(0,0,0,0) 100%)
          `,
          maskRepeat: "no-repeat",
          maskPosition: "center",
          maskSize: "cover",
        }}
      />
    </>
  );
}
