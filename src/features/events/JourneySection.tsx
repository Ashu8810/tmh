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
    image: "/images/journey/ikr-2019.jpg",
    achievement: "Best Acceleration",
  },
  {
    name: "IKR",
    year: "2020",
    location: "TBA",
    image: "/images/journey/ikr-2020.jpg",
    achievement: "Future Award",
  },
  {
    name: "PI-EV",
    year: "2022",
    location: "TBA",
    image: "/images/journey/pi-ev-2022.jpg",
  },
  {
    name: "IKR",
    year: "2023",
    location: "TBA",
    image: "/images/journey/ikr-2023.jpg",
  },
  {
    name: "SEVC",
    year: "2025",
    location: "TBA",
    image: "/images/journey/sevc-2025.jpg",
  },
  {
    name: "GKDC",
    year: "2026",
    location: "TBA",
    image: "/images/journey/gkdc-2026.jpg",
  },
  {
    name: "EKVC",
    year: "2026",
    location: "TBA",
    image: "/images/journey/ekvc-2026.jpg",
  },
];

export default function JourneySection() {
  return (
    <section className="flex flex-col lg:flex-row gap-12 lg:gap-24 w-full">
      <div className="lg:w-1/3 flex flex-col pt-4">
        <span className="text-primary font-heading text-2xl font-bold mb-2">•</span>
        <h2 className="text-3xl font-heading font-bold uppercase tracking-wider mb-6">
          Our Journey
        </h2>
        <div className="w-12 h-1 bg-white/10 mb-6" />
        <p className="text-muted-foreground">
          Every competition we've entered. Every lesson we've carried forward.
        </p>
      </div>

      <div className="lg:w-2/3 flex flex-col gap-6">
        {journey.map((event) => (
          <div
            key={`${event.name}-${event.year}`}
            className="flex flex-col bg-[#121212] border border-white/5 rounded-xl overflow-hidden hover:border-white/10 transition-colors"
          >
            <div className="aspect-video bg-neutral-900 relative">
              <img
                src={event.image}
                alt={`${event.name} ${event.year}`}
                className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-300"
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    `${event.name} ${event.year}`
                  )}&background=202020&color=fff&size=300`;
                }}
              />
            </div>
            <div className="p-5 flex flex-col gap-2">
              <h3 className="font-heading font-bold text-lg uppercase tracking-wider">
                {event.name} {event.year}
              </h3>

              {event.achievement && (
                <div className="flex items-center gap-2 text-primary text-xs font-semibold">
                  <Trophy size={14} />
                  <span>{event.achievement}</span>
                </div>
              )}

              <div className="flex items-center gap-2 text-muted-foreground text-xs">
                <MapPin size={14} />
                <span>{event.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
