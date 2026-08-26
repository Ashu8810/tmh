"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const leaders = [
  // Team Captains
  {
    id: 1,
    name: "Shankar",
    role: "Team Captain",
    badge: "CAPTAIN",
    image: "/images/members/Shankar.jpg",
  },
  {
    id: 2,
    name: "Vivek",
    role: "Team Vice Captain",
    badge: "VICE CAPTAIN",
    image: "/images/members/Vivek db.jpg",
  },
  // Event Captains
  {
    id: 3,
    name: "Aatif",
    role: "GKDC EV Captain",
    badge: "EV CAPTAIN",
    image: "/images/members/Aatif Mohideen.jpg",
  },
  {
    id: 4,
    name: "Hariharan",
    role: "GKDC CV Captain",
    badge: "CV CAPTAIN",
    image: "/images/members/Hariharan N.jpg",
  },
];

type Leader = (typeof leaders)[number];

export default function ClubLeadershipSection() {
  const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedLeader(null);
      }
    };

    if (selectedLeader) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedLeader]);

  return (
    <section className="flex flex-col lg:flex-row gap-12 lg:gap-24 w-full relative">
      {/* Section Header */}
      <div className="lg:w-1/3 flex flex-col pt-4">
        <span className="text-primary font-heading text-2xl font-bold mb-2">
          02
        </span>
        <h2 className="text-3xl font-heading font-bold uppercase tracking-wider mb-6">
          Club Leadership
        </h2>
        <div className="w-12 h-1 bg-white/10 mb-6" />
        <p className="text-muted-foreground">
          Leading the vision. Driving the mission forward.
        </p>
      </div>

      {/* Cards - 3 in a row */}
      <div className="lg:w-2/3 grid grid-cols-2 sm:grid-cols-3 gap-4">
        {leaders.map((leader) => (
          <button
            type="button"
            key={leader.id}
            onClick={() => setSelectedLeader(leader)}
            className="flex flex-col bg-[#121212] border border-white/5 rounded-xl overflow-hidden hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all text-left group cursor-pointer"
          >
            {/* Image Wrapper */}
            <div className="relative aspect-[4/5] bg-neutral-900 w-full overflow-hidden">
              <img
                src={leader.image}
                alt={leader.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    leader.name
                  )}&background=202020&color=fff&size=400`;
                }}
              />
              {/* Badge */}
              <div className="absolute top-2.5 left-2.5 px-2 py-0.5 border border-primary text-primary text-[10px] font-bold uppercase rounded-sm bg-background/80 backdrop-blur-sm">
                {leader.badge}
              </div>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col items-center text-center">
              <h3 className="font-heading font-bold text-base mb-1 group-hover:text-primary transition-colors">
                {leader.name}
              </h3>
              <p className="text-primary text-[11px] sm:text-xs font-semibold uppercase tracking-wider">
                {leader.role}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Enlarged Pop-up Modal with Image on Left Side */}
      {selectedLeader && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedLeader(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative bg-[#121212] border border-white/10 rounded-2xl overflow-hidden max-w-2xl w-full flex flex-col md:flex-row shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedLeader(null)}
              className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/60 hover:bg-black/90 border border-white/10 text-white/80 hover:text-primary transition-colors cursor-pointer"
              aria-label="Close preview"
            >
              <X size={18} />
            </button>

            {/* Large Image on Left Side */}
            <div className="relative md:w-1/2 aspect-[4/5] bg-neutral-900 w-full overflow-hidden">
              <img
                src={selectedLeader.image}
                alt={selectedLeader.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    selectedLeader.name
                  )}&background=202020&color=fff&size=600`;
                }}
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 border border-primary text-primary text-[11px] font-bold uppercase rounded-sm bg-background/90 backdrop-blur-sm">
                {selectedLeader.badge}
              </div>
            </div>

            {/* Details on Right Side */}
            <div className="p-6 md:p-8 md:w-1/2 flex flex-col justify-center">
              <span className="text-primary font-mono text-xs font-bold uppercase tracking-widest block mb-1">
                {selectedLeader.badge}
              </span>
              <h3 className="font-heading font-bold text-2xl md:text-3xl text-white mb-1">
                {selectedLeader.name}
              </h3>
              <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-5">
                {selectedLeader.role}
              </p>
              <div className="w-12 h-0.5 bg-white/10 mb-5" />
              <p className="text-muted-foreground text-sm leading-relaxed">
                Leading the vision, vehicle development, and team coordination at Motor Head.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

