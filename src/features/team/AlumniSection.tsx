"use client";

import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

interface AlumniMember {
  id: number | string;
  name: string;
  status: string;
  role: string;
  image: string;
  linkedin?: string;
}

// Group alumni by graduation batch year. Add new years/people here as needed.
const alumniByYear: Record<string, AlumniMember[]> = {
  "2024": [
    {
      id: "adithya-hiremath",
      name: "Adithya Hiremath",
      status: "Alumni",
      role: "Operations Lead",
      image: "/images/alumni/Adithya Hiremath.jpg",
      linkedin: "#",
    },
    {
      id: "aditya-narayan",
      name: "Aditya Narayan",
      status: "Alumni",
      role: "Powertrain",
      image: "/images/alumni/Aditya Narayan.jpg",
      linkedin: "#",
    },
    {
      id: "bharath-vr",
      name: "Bharath V R",
      status: "Alumni",
      role: "Chassis",
      image: "/images/alumni/Bharath V R.jpg",
      linkedin: "#",
    },
    {
      id: "dhanush",
      name: "Dhanush",
      status: "Alumni",
      role: "Electrical",
      image: "/images/alumni/Dhanush.jpg",
      linkedin: "#",
    },
    {
      id: "fardeen",
      name: "Fardeen",
      status: "Alumni",
      role: "Suspension",
      image: "/images/alumni/Fardeen.jpg",
      linkedin: "#",
    },
    {
      id: "gajendra",
      name: "Gajendra",
      status: "Alumni",
      role: "Aerodynamics",
      image: "/images/alumni/Gajendra.jpg",
      linkedin: "#",
    },
    {
      id: "ganesh",
      name: "Ganesh",
      status: "Alumni",
      role: "Manufacturing",
      image: "/images/alumni/Ganesh.jpg",
      linkedin: "#",
    },
    {
      id: "karthik-yadav",
      name: "Karthik Yadav",
      status: "Alumni",
      role: "Vehicle Dynamics",
      image: "/images/alumni/Karthik Yadav.jpg",
      linkedin: "#",
    },
    {
      id: "karthik",
      name: "Karthik",
      status: "Alumni",
      role: "Telemetry",
      image: "/images/alumni/Karthik.jpg",
      linkedin: "#",
    },
    {
      id: "manish",
      name: "Manish",
      status: "Alumni",
      role: "Electronics",
      image: "/images/alumni/Manish.jpg",
      linkedin: "#",
    },
    {
      id: "mokshith",
      name: "Mokshith",
      status: "Alumni",
      role: "Drivetrain",
      image: "/images/alumni/Mokshith.jpg",
      linkedin: "#",
    },
    {
      id: "nishitha",
      name: "Nishitha",
      status: "Alumni",
      role: "Design",
      image: "/images/alumni/Nishitha.jpg",
      linkedin: "#",
    },
    {
      id: "pavan",
      name: "Pavan",
      status: "Alumni",
      role: "Suspension",
      image: "/images/alumni/Pavan.jpg",
      linkedin: "#",
    },
    {
      id: "raj-surya",
      name: "Raj Surya",
      status: "Alumni",
      role: "Chassis Lead",
      image: "/images/alumni/Raj Surya.jpg",
      linkedin: "#",
    },
    {
      id: "sahil",
      name: "Sahil",
      status: "Alumni",
      role: "Powertrain",
      image: "/images/alumni/Sahil.jpg",
      linkedin: "#",
    },
    {
      id: "sharath",
      name: "Sharath",
      status: "Alumni",
      role: "Brakes & Hydraulics",
      image: "/images/alumni/Sharath.jpg",
      linkedin: "#",
    },
    {
      id: "syeeda-aiemen",
      name: "Syeeda Aiemen",
      status: "Alumni",
      role: "Electronics Lead",
      image: "/images/alumni/Syeeda Aiemen Dania Saleem.jpeg",
      linkedin: "#",
    },
    {
      id: "tanish",
      name: "Tanish",
      status: "Alumni",
      role: "Aerodynamics",
      image: "/images/alumni/Tanish.jpg",
      linkedin: "#",
    },
    {
      id: "tharun",
      name: "Tharun",
      status: "Alumni",
      role: "Manufacturing",
      image: "/images/alumni/Tharun.jpg",
      linkedin: "#",
    },
    {
      id: "vikas",
      name: "Vikas",
      status: "Alumni",
      role: "Operations",
      image: "/images/alumni/Vikas.jpg",
      linkedin: "#",
    },
    {
      id: "vinay",
      name: "Vinay",
      status: "Alumni",
      role: "Vehicle Dynamics Lead",
      image: "/images/alumni/Vinay.jpg",
      linkedin: "#",
    },
  ],
};

const batchYears = Object.keys(alumniByYear).sort((a, b) => (a < b ? 1 : -1));

export default function AlumniSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedYear, setSelectedYear] = useState(batchYears[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const alumni = alumniByYear[selectedYear] || [];

  const scrollLeft = () => {
    if (scrollRef.current)
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };
  const scrollRight = () => {
    if (scrollRef.current)
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };
  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollPosition = scrollRef.current.scrollLeft;
      const cardWidth = 200 + 16;
      const newIndex = Math.round(scrollPosition / cardWidth);
      setActiveIndex(Math.min(newIndex, alumni.length - 1));
    }
  };

  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTo({ left: 0, behavior: "auto" });
  }, [selectedYear]);

  return (
    <section className="flex flex-col lg:flex-row gap-12 lg:gap-24 w-full">
      <div className="lg:w-1/3 flex flex-col pt-4">
        <span className="text-primary font-heading text-2xl font-bold mb-2">
          05
        </span>
        <h2 className="text-3xl font-heading font-bold uppercase tracking-wider mb-6">
          Alumni
        </h2>
        <div className="w-12 h-1 bg-white/10 mb-6" />
        <p className="text-muted-foreground mb-8">
          Their legacy. Our inspiration.
          <br />
          Always a part of the journey.
        </p>

        <div className="relative w-full max-w-[240px]">
          <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-2 block">
            Select Batch
          </label>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center justify-between bg-[#121212] border border-white/10 rounded-lg px-4 py-3 text-left hover:border-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <span className="font-heading font-bold">{selectedYear}</span>
            <ChevronDown
              size={18}
              className={`transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-full max-h-64 overflow-y-auto bg-[#1a1a1a] border border-white/10 rounded-lg shadow-xl z-50 no-scrollbar">
              {batchYears.map((year) => (
                <button
                  key={year}
                  onClick={() => {
                    setSelectedYear(year);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 hover:bg-white/5 transition-colors font-heading text-sm ${
                    selectedYear === year
                      ? "text-primary bg-primary/10"
                      : "text-white"
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="lg:w-2/3 flex flex-col items-center">
        {alumni.length === 0 ? (
          <p className="text-muted-foreground py-12">
            No alumni records for this batch yet.
          </p>
        ) : (
          <>
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
                          e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            person.name,
                          )}&background=202020&color=fff&size=300`;
                        }}
                      />
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="font-heading font-bold text-lg mb-1">
                        {person.name}
                      </h3>
                      <p className="text-primary text-xs font-semibold mb-1 uppercase tracking-wider">
                        {person.status}
                      </p>
                      <p className="text-muted-foreground text-xs mb-1">
                        {person.role}
                      </p>
                      {person.linkedin && person.linkedin !== "#" && (
                        <a
                          href={person.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-white transition-colors text-xs inline-block mt-1"
                          aria-label={`${person.name} LinkedIn`}
                        >
                          LinkedIn
                        </a>
                      )}
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

            <div className="flex gap-2 mt-4">
              {alumni.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (scrollRef.current) {
                      const cardWidth = 200 + 16;
                      scrollRef.current.scrollTo({
                        left: index * cardWidth,
                        behavior: "smooth",
                      });
                    }
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === activeIndex
                      ? "bg-primary"
                      : "bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
