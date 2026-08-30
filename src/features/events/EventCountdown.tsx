"use client";

import React, { useState, useEffect } from "react";
import { MapPin, ImageOff } from "lucide-react";

interface EventInfo {
  name: string;
  fullName: string;
  startDate: string;
  location: string;
  description: string;
  image: string;
}

const events: EventInfo[] = [
  {
    name: "GKDC",
    fullName: "GKDC 2027",
    startDate: "2027-02-17T00:00:00",
    location: "Coimbatore, Tamil Nadu",
    description:
      "Go Kart Design Challenge — a design and fabrication competition for Combustion (CV) and Electric (EV) go-karts, organized by ISNEE Motorsports.",
    image: "/images/gkdc-2027.webp", // Replace with your image path or external URL
  },
];

function getTimeRemaining(targetDate: string) {
  const total = new Date(targetDate).getTime() - new Date().getTime();

  if (total <= 0) {
    return { total, days: 0, hours: 0, minutes: 0, seconds: 0, isLive: true };
  }

  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const seconds = Math.floor((total / 1000) % 60);

  return { total, days, hours, minutes, seconds, isLive: false };
}

function CountdownCard({ event }: { event: EventInfo }) {
  const [mounted, setMounted] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [timeLeft, setTimeLeft] = useState(() => getTimeRemaining(event.startDate));

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining(event.startDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [event.startDate]);

  return (
    <div className="group flex flex-col bg-[#0a0a0a] border-2 border-[#1f1f1f] hover:border-[#D71920] shadow-[0_0_0_rgba(215,25,32,0)] hover:shadow-[0_0_30px_rgba(215,25,32,0.15)] rounded-none overflow-hidden transition-all duration-300 relative">
      {/* Laser Scanner Line (Hover Effect) */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-[#D71920] shadow-[0_0_15px_rgba(215,25,32,0.8)] opacity-0 group-hover:opacity-100 group-hover:animate-[scan_2s_linear_infinite] z-20 pointer-events-none" />
      
      {/* Event Image Container with Error Handling */}
      <div className="relative w-full h-56 md:h-64 bg-[#121212] overflow-hidden flex items-center justify-center border-b-2 border-white/5 shrink-0">
        {!imageError && event.image ? (
          <img
            src={event.image}
            alt={event.fullName}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <ImageOff size={24} />
            <span className="text-xs">Image unavailable</span>
          </div>
        )}

        {mounted && timeLeft.isLive && (
          <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1 border border-[#D71920]/50 rounded-sm">
            <span className="flex items-center gap-2 text-[#D71920] font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
              <span className="w-2 h-2 rounded-none bg-[#D71920] animate-pulse" />
              LIVE DEPLOYMENT
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col p-6 flex-1 justify-between bg-[#0a0a0a]">
        <div>
          <h3 className="text-2xl font-heading font-black uppercase tracking-widest text-zinc-200 mb-2">
            {event.fullName}
          </h3>

          <p className="text-zinc-400 font-mono text-xs uppercase mb-4 leading-relaxed">{event.description}</p>

          <div className="flex items-center gap-2 text-zinc-500 font-mono text-[10px] uppercase tracking-widest mb-6">
            <MapPin size={14} />
            <span>{event.location}</span>
          </div>
        </div>

        {!mounted ? (
          <div className="grid grid-cols-4 gap-3 animate-pulse">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-16 bg-white/5 rounded-lg" />
            ))}
          </div>
        ) : timeLeft.isLive ? (
          <p className="text-[#D71920] font-mono text-sm font-bold uppercase tracking-widest">
            &gt; MISSION IS ACTIVE
          </p>
        ) : (
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Mins", value: timeLeft.minutes },
              { label: "Secs", value: timeLeft.seconds },
            ].map((unit) => (
              <div
                key={unit.label}
                className="flex flex-col items-center bg-[#121212] border border-white/5 py-4 group-hover:border-[#D71920]/30 transition-colors duration-500 rounded-sm"
              >
                <span className="font-mono font-bold text-2xl md:text-3xl tabular-nums text-zinc-300 group-hover:text-[#D71920] transition-colors duration-500">
                  {String(unit.value).padStart(2, "0")}
                </span>
                <span className="text-zinc-600 font-mono text-[10px] uppercase tracking-[0.2em] mt-2">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function EventCountdown() {
  return (
    <section className="flex flex-col lg:flex-row gap-12 lg:gap-24 w-full relative z-10">
      <div className="lg:w-1/3 flex flex-col pt-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 flex items-center justify-center border-2 border-[#D71920] text-[#D71920] font-mono font-bold text-xl rounded-sm">
            01
          </div>
          <h2 className="text-2xl md:text-3xl font-heading font-black uppercase tracking-tighter text-zinc-200">
            UPCOMING DEPLOYMENT
          </h2>
        </div>
        <div className="w-full h-px bg-white/10 mb-6 relative">
          <div className="absolute top-0 left-0 w-1/3 h-full bg-[#D71920]" />
        </div>
        <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest leading-relaxed">
          Countdown to our next competition. Live telemetry sync active.
        </p>
      </div>

      <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => (
          <CountdownCard key={event.name} event={event} />
        ))}
      </div>
    </section>
  );
}
