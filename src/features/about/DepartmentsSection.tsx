"use client";

import { ChevronLeft, ChevronRight, Settings, Combine, Zap, Wind, Hammer, Cpu } from "lucide-react";
import { useRef, useState } from "react";

export default function DepartmentsSection() {
  const departments = [
    { name: "Powertrain", icon: <Settings className="w-6 h-6 text-[#D71920]" strokeWidth={1.5} /> },
    { name: "Chassis", icon: <Combine className="w-6 h-6 text-[#D71920]" strokeWidth={1.5} /> },
    { name: "Suspension", icon: <Zap className="w-6 h-6 text-[#D71920]" strokeWidth={1.5} /> },
    { name: "Electrical", icon: <Cpu className="w-6 h-6 text-[#D71920]" strokeWidth={1.5} /> },
    { name: "Aerodynamics", icon: <Wind className="w-6 h-6 text-[#D71920]" strokeWidth={1.5} /> },
    { name: "Manufacturing", icon: <Hammer className="w-6 h-6 text-[#D71920]" strokeWidth={1.5} /> },
  ];

  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollPosition = scrollRef.current.scrollLeft;
      const itemWidth = 136; // approx 120px + 16px gap
      const newIndex = Math.round(scrollPosition / itemWidth);
      setActiveIndex(Math.min(newIndex, departments.length - 1));
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="mb-10">
        <span className="font-mono text-[#D71920] text-xl block mb-2 font-bold tracking-widest">04</span>
        <h2 className="font-heading text-2xl lg:text-3xl font-bold text-white uppercase tracking-tight">
          CLUB DEPARTMENTS
        </h2>
      </div>

      <div className="flex items-center gap-4 relative group">
        {/* Left Arrow */}
        <button 
          onClick={scrollLeft}
          className="absolute -left-4 md:-left-6 z-10 w-11 h-11 rounded-full border border-white/20 bg-[#0a0a0a]/80 backdrop-blur flex items-center justify-center text-white/50 hover:text-white hover:border-[#D71920] hover:bg-[#121212] transition-all shrink-0 opacity-0 group-hover:opacity-100 focus:opacity-100 disabled:opacity-0"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Carousel Container */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory w-full pb-4 px-2"
        >
          {departments.map((dept, idx) => (
            <div key={idx} className="w-[120px] md:w-[140px] shrink-0 snap-start flex flex-col items-center gap-4 group/card cursor-pointer">
              <div className="w-full aspect-square rounded border border-white/10 bg-[#0a0a0a] flex items-center justify-center group-hover/card:border-[#D71920] group-hover/card:bg-[#121212] transition-all relative shadow-lg group-hover/card:shadow-[#D71920]/20">
                {dept.icon}
              </div>
              <span className="text-[10px] md:text-xs font-medium text-white/80 group-hover/card:text-white uppercase tracking-wider text-center">
                {dept.name}
              </span>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button 
          onClick={scrollRight}
          className="absolute -right-4 md:-right-6 z-10 w-11 h-11 rounded-full border border-white/20 bg-[#0a0a0a]/80 backdrop-blur flex items-center justify-center text-white/50 hover:text-white hover:border-[#D71920] hover:bg-[#121212] transition-all shrink-0 opacity-0 group-hover:opacity-100 focus:opacity-100 disabled:opacity-0"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {departments.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (scrollRef.current) {
                const itemWidth = 136;
                scrollRef.current.scrollTo({ left: index * itemWidth, behavior: "smooth" });
              }
            }}
            aria-label={`Go to item ${index + 1}`}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === activeIndex ? "bg-[#D71920] scale-110" : "bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
