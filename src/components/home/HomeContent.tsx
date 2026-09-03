"use client";

import React, { useState, useEffect } from "react";
import ScrollAnimation from "@/components/home/ScrollAnimation";
import HomeAchievements from "@/components/home/HomeAchievements";
import HomeEventCountdown from "@/components/home/HomeEventCountdown";

export default function HomeContent() {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    // If it's loaded, wait a tiny bit then unmount preloader for animation
    if (isLoaded) {
      const timer = setTimeout(() => {
        setShowPreloader(false);
      }, 800); // Wait for fade out animation
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  return (
    <>
      {/* Preloader Overlay */}
      {showPreloader && (
        <div 
          className={`fixed inset-0 z-50 bg-[#050505] flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${
            isLoaded ? "opacity-0 -translate-y-full" : "opacity-100 translate-y-0"
          }`}
        >
          {/* Scanlines on Preloader */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 2px, #fff 4px)' }} />

          <div className="relative z-10 w-full max-w-md px-8 flex flex-col items-center">
            {/* Logo / Text */}
            <h1 className="text-4xl md:text-5xl font-heading font-black text-white italic tracking-tighter mb-2">
              MOTOR HEADS
            </h1>
            
            <div className="flex items-center gap-3 mb-12">
              <span className="w-2 h-2 rounded-full bg-[#D71920] animate-pulse" />
              <p className="text-zinc-500 font-mono text-xs tracking-[0.4em]">SYS.INIT // BOOT SEQUENCE</p>
            </div>

            {/* Progress Bar Container */}
            <div className="w-full relative">
              {/* HUD Brackets */}
              <div className="absolute -top-4 -left-4 w-4 h-4 border-t-2 border-l-2 border-[#D71920]/40" />
              <div className="absolute -top-4 -right-4 w-4 h-4 border-t-2 border-r-2 border-[#D71920]/40" />
              <div className="absolute -bottom-4 -left-4 w-4 h-4 border-b-2 border-l-2 border-[#D71920]/40" />
              <div className="absolute -bottom-4 -right-4 w-4 h-4 border-b-2 border-r-2 border-[#D71920]/40" />

              {/* Progress Text */}
              <div className="flex justify-between items-end mb-2">
                <span className="text-zinc-400 font-mono text-[10px] tracking-widest uppercase">Telemetry Data</span>
                <span className="font-mono text-xl font-bold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                  [ {progress.toString().padStart(3, "0")}% ]
                </span>
              </div>

              {/* Progress Track */}
              <div className="h-1 w-full bg-white/10 relative overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-[#D71920] shadow-[0_0_15px_#D71920] transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main 
        className={`flex-1 w-full bg-[#050505] text-white min-h-screen font-sans pt-0 pb-20 relative selection:bg-[#D71920] selection:text-white transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0 h-screen overflow-hidden"
        }`}
      >
        <h1 className="sr-only">Motor Head | Automotive Engineering Club at BMSIT&M</h1>

        {/* Animation Section (Mobile & Desktop) */}
        <section className="max-w-7xl mx-auto px-4 relative z-10 flex justify-center">
          <ScrollAnimation 
            onProgress={setProgress}
            onLoadComplete={() => setIsLoaded(true)}
          />
        </section>

        {/* Achievements Section */}
        <HomeAchievements />

        {/* Upcoming Event Countdown Section (NEXT MISSION) */}
        <section className="max-w-7xl mx-auto px-4 relative z-10 mt-20 md:mt-24 flex justify-center">
          <HomeEventCountdown />
        </section>
      </main>
    </>
  );
}
