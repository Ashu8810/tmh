"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

// Generate years from 2007 to 2026 for academic years
const startYear = 2007;
const endYear = 2026;
const academicYears = Array.from(
  { length: endYear - startYear + 1 },
  (_, i) => `${startYear + i}-${startYear + i + 1}`,
).reverse(); // Most recent first

// Helper to generate dynamic dummy data based on the year string
const getMembersForYear = (year: string) => {
  // Use the year to create a pseudo-random seed
  const seed = parseInt(year.split("-")[0]) || 2020;

  const roles = [
    "Team Lead",
    "Technical Lead",
    "Chassis Lead",
    "Powertrain Lead",
    "Electronics Lead",
    "Suspension Lead",
    "Aerodynamics Lead",
    "Operations Lead",
    "Manufacturing Lead",
  ];
  const firstNames = [
    "Arun",
    "Prajwal",
    "Meghana",
    "Varun",
    "Shruti",
    "Aditya",
    "Nikhil",
    "Sneha",
    "Rahul",
    "Kavya",
    "Rohit",
    "Ananya",
    "Vikram",
    "Neha",
    "Karan",
  ];
  const lastInitials = [
    "M.",
    "R.",
    "S.",
    "H.",
    "K.",
    "P.",
    "V.",
    "N.",
    "D.",
    "A.",
  ];

  // Generate 4 to 8 members based on the year
  const numMembers = 4 + (seed % 5);

  const alumniImages = [
    "/images/alumni/Adithya Hiremath.webp",
    "/images/alumni/Aditya Narayan.webp",
    "/images/alumni/Bharath V R.webp",
    "/images/alumni/Dhanush.webp",
    "/images/alumni/Fardeen.webp",
    "/images/alumni/Gajendra.webp",
    "/images/alumni/Ganesh.webp",
    "/images/alumni/Karthik Yadav.webp",
    "/images/alumni/Karthik.webp",
    "/images/alumni/Manish.webp",
    "/images/alumni/Mokshith.webp",
    "/images/alumni/Nishitha.webp",
    "/images/alumni/Pavan.webp",
    "/images/alumni/Raj Surya.webp",
    "/images/alumni/Sahil.webp",
    "/images/alumni/Sharath.webp",
    "/images/alumni/Syeeda Aiemen Dania Saleem.webp",
    "/images/alumni/Tanish.webp",
    "/images/alumni/Tharun.webp",
    "/images/alumni/Vikas.webp",
    "/images/alumni/Vinay.webp",
  ];

  return Array.from({ length: numMembers }).map((_, index) => {
    // Generate pseudo-random indices based on year + index
    const firstIndex = (seed + index * 7) % firstNames.length;
    const lastIndex = (seed + index * 3) % lastInitials.length;
    const roleIndex = index % roles.length; // Ensure unique roles if possible, or cycle

    const name = `${firstNames[firstIndex]} ${lastInitials[lastIndex]}`;
    return {
      id: index + 1,
      name,
      role: index === 0 ? "Team Lead" : roles[roleIndex],
      image: alumniImages[(seed + index) % alumniImages.length],
    };
  });
};

export default function HistoricalMembersSection() {
  const [selectedYear, setSelectedYear] = useState(academicYears[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const members = getMembersForYear(selectedYear);

  return (
    <section className="flex flex-col lg:flex-row gap-12 lg:gap-24 w-full">
      {/* Section Header */}
      <div className="lg:w-1/3 flex flex-col pt-4">
        <span className="text-primary font-heading text-2xl font-bold mb-2">
          06
        </span>
        <h2 className="text-3xl font-heading font-bold uppercase tracking-wider mb-6">
          Historical Members
        </h2>
        <div className="w-12 h-1 bg-white/10 mb-6" />
        <p className="text-muted-foreground mb-8">
          The foundation of our success. Explore the brilliant minds that built
          our legacy over the years.
        </p>

        {/* Custom Select Dropdown */}
        <div className="relative w-full max-w-[240px]">
          <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-2 block">
            Select Academic Year
          </label>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center justify-between bg-[#121212] border border-white/10 rounded-lg px-4 py-3 text-left hover:border-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <span className="font-heading font-bold">{selectedYear}</span>
            <ChevronDown
              size={18}
              className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-full max-h-64 overflow-y-auto bg-[#1a1a1a] border border-white/10 rounded-lg shadow-xl z-50 no-scrollbar">
              {academicYears.map((year) => (
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

      {/* Members Grid */}
      <div className="lg:w-2/3">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {members.map((person) => (
            <div
              key={person.id}
              className="flex flex-col bg-[#121212] border border-white/5 rounded-xl overflow-hidden hover:border-white/10 transition-colors"
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
                <h3 className="font-heading font-bold text-sm md:text-base mb-1">
                  {person.name}
                </h3>
                <p className="text-muted-foreground text-xs">{person.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
