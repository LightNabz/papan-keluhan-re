"use client";
import React, { useState, useEffect } from "react";

export default function Clock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-transparent rounded-2xl p-6 text-left">
      <div className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
        {formatTime(currentTime)}
      </div>
      <div className="text-lg text-gray-600 dark:text-gray-300">
        {formatDate(currentTime)}
      </div>
    </div>
  );
}
