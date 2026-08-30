"use client";

import React from "react";
import { MapPin, Trophy } from "lucide-react";

// Add or edit past events here. One photo per event.
// image: upload the photo to public/images/journey/ with this exact filename.
interface PastEvent {
  name: string;
  year: string;
  location: string;
  image: string;
  achievement?: string;
}

const journey: PastEvent[] = [
  {
    name: "IKR",
    year: "2019",
    location: "Galgotias University",
    image: "/images/journey/ikr-2019.webp",
    achievement: "Best Acceleration",
  },
  {
    name: "IKR",
    year: "2020",
    location: "TBA",
    image: "/images/journey/ikr-2020.webp",
    achievement: "Future Award",
  },
  {
    name: "PI-EV",
    year: "2022",
    location: "TBA",
    image: "/images/journey/pi-ev-2022.webp",
  },
  {
    name: "IKR",
    year: "2023",
    location: "Buddh International Circuit",
    image: "/images/journey/ikr-2023.webp",
  },
  {
    name: "SEVC",
    year: "2025",
    location: "Hindustan College of Engineering / Kari Motor Speedway Racetrack",
    image: "/images/journey/sevc-2025.webp",
    achievement: "Best Design Award",
  },
  {
    name: "ANVESHANA",
    year: "2025",
    location: "TBA",
    image: "/images/journey/anveshana-2025.webp",
    achievement: "Winners",
  },
  {
    name: "GKDC",
    year: "2026",
    location: "Kari Motor Speedway Racetrack",
    image: "/images/journey/gkdc-2026.webp",
  },
  {
    name: "EKVC",
    year: "2026",
    location: "Hindustan College of Engineering / Kari Motor Speedway Racetrack",
    image: "/images/journey/ekvc-2026.webp",
    achievement: "Best Cost Award",
  },
];

export default function JourneySection() {
  return (
    <section className="flex flex-col lg:flex-row gap-12 lg:gap-24 w-full">
      <div className="lg:w-1/3 flex flex-col pt-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 flex items-center justify-center border-2 border-[#D71920] text-[#D71920] font-mono font-bold text-xl rounded-sm">
            02
          </div>
          <h2 className="text-2xl md:text-3xl font-heading font-black uppercase tracking-tighter text-zinc-200">
            MISSION LOGS
          </h2>
        </div>
        <div className="w-full h-px bg-white/10 mb-6 relative">
          <div className="absolute top-0 left-0 w-1/3 h-full bg-[#D71920]" />
        </div>
        <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest leading-relaxed">
          Declassified records of past engagements. Every competition we&apos;ve entered. Every lesson we&apos;ve carried forward.
        </p>
      </div>

      <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {journey.map((event) => (
          <div
            key={`${event.name}-${event.year}`}
            className="group flex flex-col bg-[#0a0a0a] border-2 border-[#1f1f1f] rounded-sm overflow-hidden hover:border-[#D71920] transition-colors shadow-[0_0_0_rgba(215,25,32,0)] hover:shadow-[0_0_30px_rgba(215,25,32,0.15)] relative"
          >
            {/* Laser Scanner Line */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-[#D71920] shadow-[0_0_15px_rgba(215,25,32,0.8)] opacity-0 group-hover:opacity-100 group-hover:animate-[scan_2s_linear_infinite] z-20 pointer-events-none" />

            <div className="h-48 sm:h-56 bg-[#121212] relative overflow-hidden border-b-2 border-white/5 shrink-0">
              <img
                src={event.image}
                alt={`${event.name} ${event.year}`}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    `${event.name} ${event.year}`
                  )}&background=202020&color=fff&size=300`;
                }}
              />
            </div>
            <div className="p-5 flex flex-col gap-4 bg-[#0a0a0a] flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-heading font-black text-xl uppercase tracking-widest text-zinc-200">
                  {event.name} <span className="text-[#D71920]">{event.year}</span>
                </h3>
                {event.achievement && (
                  <span className="text-[#D71920] font-mono text-[10px] font-bold tracking-widest uppercase border border-[#D71920]/30 px-2 py-0.5 rounded-sm bg-[#D71920]/10 flex items-center gap-1">
                    <Trophy size={10} />
                    {event.achievement}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-zinc-500 font-mono text-[10px] uppercase tracking-widest pt-2">
                <MapPin size={12} />
                <span>{event.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
