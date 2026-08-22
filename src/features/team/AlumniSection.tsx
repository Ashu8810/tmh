"use client";

import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const alumni = [
  {
    id: 1,
    name: "Arun M.",
    status: "Alumni",
    role: "Powertrain Lead '20",
    image: "/images/arun-m.jpg",
  },
  {
    id: 2,
    name: "Prajwal R.",
    status: "Alumni",
    role: "Chassis Lead '19",
    image: "/images/prajwal-r.jpg",
  },
  {
    id: 3,
    name: "Meghana S.",
    status: "Alumni",
    role: "Team Lead '18",
    image: "/images/meghana-s.jpg",
  },
  {
    id: 4,
    name: "Varun H.",
    status: "Alumni",
    role: "Electrical Lead '21",
    image: "/images/varun-h.jpg",
  },
  {
    id: 5,
    name: "Shruti K.",
    status: "Alumni",
    role: "Aerodynamics Lead '20",
    image: "/images/shruti-k.jpg",
  },
  {
    id: 6,
    name: "Gaurav P.",
    status: "Alumni",
    role: "Suspension Lead '19",
    image: "/images/gaurav-p.jpg",
  },
  {
    id: 7,
    name: "Nidhi S.",
    status: "Alumni",
    role: "Operations Lead '21",
    image: "/images/nidhi-s.jpg",
  },
  {
    id: 8,
    name: "Karan V.",
    status: "Alumni",
    role: "Manufacturing Lead '18",
    image: "/images/karan-v.jpg",
  }
];

export default function AlumniSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollPosition = scrollRef.current.scrollLeft;
      const cardWidth = 200 + 16; // Approx min-w-[200px] + gap-4
      const newIndex = Math.round(scrollPosition / cardWidth);
      setActiveIndex(Math.min(newIndex, alumni.length - 1));
    }
  };

  return (
    <section className="flex flex-col lg:flex-row gap-12 lg:gap-24 w-full">
      {/* Section Header */}
      <div className="lg:w-1/3 flex flex-col pt-4">
        <span className="text-primary font-heading text-2xl font-bold mb-2">05</span>
        <h2 className="text-3xl font-heading font-bold uppercase tracking-wider mb-6">
          Alumni
        </h2>
        <div className="w-12 h-1 bg-white/10 mb-6" />
        <p className="text-muted-foreground">
          Their legacy. Our inspiration.<br />Always a part of the journey.
        </p>
      </div>

      {/* Carousel */}
      <div className="lg:w-2/3 flex flex-col items-center">
        <div className="flex items-center gap-4 w-full relative">
          
          <button 
            onClick={scrollLeft}
            className="w-11 h-11 min-h-[44px] min-w-[44px] rounded-full border border-white/20 flex items-center justify-center hover:bg-white/5 transition-colors absolute -left-5 z-10 bg-background md:static"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>
          
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex-1 overflow-x-auto no-scrollbar snap-x snap-mandatory flex gap-4 pb-4 scroll-smooth"
          >
            {alumni.map((person) => (
              <div 
                key={person.id} 
                className="snap-start w-[42vw] sm:w-[200px] md:w-[220px] lg:w-[240px] flex-none flex flex-col bg-[#121212] border border-white/5 rounded-xl overflow-hidden hover:border-white/10 transition-colors"
              >
                <div className="aspect-square bg-neutral-900 relative">
                  <img 
                    src={person.image} 
                    alt={person.name} 
                    className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-300"
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&background=202020&color=fff&size=300`;
                    }}
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-heading font-bold text-lg mb-1">{person.name}</h3>
                  <p className="text-primary text-xs font-semibold mb-1 uppercase tracking-wider">{person.status}</p>
                  <p className="text-muted-foreground text-xs">{person.role}</p>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={scrollRight}
            className="w-11 h-11 min-h-[44px] min-w-[44px] rounded-full border border-white/20 flex items-center justify-center hover:bg-white/5 transition-colors absolute -right-5 z-10 bg-background md:static"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex gap-2 mt-4">
          {alumni.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (scrollRef.current) {
                  const cardWidth = 200 + 16;
                  scrollRef.current.scrollTo({ left: index * cardWidth, behavior: "smooth" });
                }
              }}
              aria-label={`Go to slide ${index + 1}`}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === activeIndex ? "bg-primary" : "bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
