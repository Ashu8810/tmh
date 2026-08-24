"use client";

import React, { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";

interface Member {
  name: string;
  image: string;
  linkedin: string;
}

const membersByYear: Record<string, Member[]> = {
  "2026": [
    {
      name: "Aditya Singh",
      image: "/images/members/Aditya Singh.jpg",
      linkedin: "#",
    },
    {
      name: "Aaron Joel Jonathan",
      image: "/images/members/Aaron Joel Jonathan.jpg",
      linkedin: "#",
    },
    {
      name: "Aashish S Badiger",
      image: "/images/members/Aashish S Badiger.jpg",
      linkedin: "#",
    },
    {
      name: "Aatif Mohideen",
      image: "/images/members/Aatif Mohideen.jpg",
      linkedin: "#",
    },
    {
      name: "Abhijeeth",
      image: "/images/members/Abhijeeth.jpg",
      linkedin: "#",
    },
    {
      name: "Arjun Livik J P",
      image: "/images/members/Arjun Livik J P.jpg",
      linkedin: "#",
    },
    {
      name: "Asim",
      image: "/images/members/Asim.jpg",
      linkedin: "#",
    },
    {
      name: "Bhagyesh S",
      image: "/images/members/Bhagyesh S.jpg",
      linkedin: "#",
    },
  ],
  "2025": [
    {
      name: "Gautam P",
      image: "/images/members/Gautam P.jpg",
      linkedin: "#",
    },
    {
      name: "Hariharan N",
      image: "/images/members/Hariharan N.jpg",
      linkedin: "#",
    },
    {
      name: "Karthik Gopal Halliyur",
      image: "/images/members/Karthik Gopal Halliyur.jpg",
      linkedin: "#",
    },
    {
      name: "Maruthi H R",
      image: "/images/members/Maruthi H R.jpg",
      linkedin: "#",
    },
    {
      name: "Mohammed Abdul Tazeem",
      image: "/images/members/Mohammed Abdul Tazeem.jpg",
      linkedin: "#",
    },
    {
      name: "Mohith M",
      image: "/images/members/Mohith M.jpg",
      linkedin: "#",
    },
    {
      name: "Nethanya G H",
      image: "/images/members/Nethanya G H.jpg",
      linkedin: "#",
    },
    {
      name: "Poojit",
      image: "/images/members/Poojit.jpg",
      linkedin: "#",
    },
  ],
  "2024": [
    {
      name: "DJ",
      image: "/images/members/DJ.jpg",
      linkedin: "#",
    },
    {
      name: "Pranjal Raj",
      image: "/images/members/Pranjal Raj.jpg",
      linkedin: "#",
    },
    {
      name: "Pratham",
      image: "/images/members/Pratham.jpg",
      linkedin: "#",
    },
    {
      name: "Samarth M Hulamani",
      image: "/images/members/Samarth M Hulamani.jpg",
      linkedin: "#",
    },
    {
      name: "Shankar",
      image: "/images/members/Shankar.jpg",
      linkedin: "#",
    },
    {
      name: "Srujan A P",
      image: "/images/members/Srujan A P.jpg",
      linkedin: "#",
    },
    {
      name: "Venkat",
      image: "/images/members/Venkat.jpg",
      linkedin: "#",
    },
    {
      name: "Vivek DB",
      image: "/images/members/Vivek db.jpg",
      linkedin: "#",
    },
    {
      name: "Yashraj Desai",
      image: "/images/members/Yashraj Desai.jpg",
      linkedin: "#",
    },
  ],
};

const batchYears = Object.keys(membersByYear).sort((a, b) => (a < b ? 1 : -1));

export default function CurrentMembersSection() {
  const [selectedYear, setSelectedYear] = useState(batchYears[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const members = membersByYear[selectedYear] || [];

  return (
    <section className="flex flex-col lg:flex-row gap-12 lg:gap-24 w-full">
      {/* Section Header */}
      <div className="lg:w-1/3 flex flex-col pt-4">
        <span className="text-primary font-heading text-2xl font-bold mb-2">
          04
        </span>
        <h2 className="text-3xl font-heading font-bold uppercase tracking-wider mb-6">
          Current Members
        </h2>
        <div className="w-12 h-1 bg-white/10 mb-6" />
        <p className="text-muted-foreground">
          The force behind the build.
          <br />
          The future of engineering.
        </p>
      </div>

      {/* Content */}
      <div className="lg:w-2/3 flex flex-col gap-12">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Group Photo */}
          <div className="w-full md:w-2/3 rounded-xl overflow-hidden bg-neutral-900 border border-white/5 relative aspect-video md:aspect-auto">
            <img
              src="/images/team-group.jpg"
              alt="Motor Head Team Members"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <div className="absolute inset-0 bg-white/5 flex items-center justify-center" />
          </div>

          {/* Stats & CTA */}
          <div className="w-full md:w-1/3 flex flex-col justify-center p-8 bg-[#121212] border border-white/5 rounded-xl hover:border-white/10 transition-colors">
            <h3 className="text-5xl font-heading font-bold text-primary mb-2">
              60+
            </h3>
            <h4 className="font-heading font-bold text-xl mb-4">
              Active Members
            </h4>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8">
              From diverse backgrounds and disciplines, united by one passion –
              automotive engineering.
            </p>
            <a
              href="/team"
              className="inline-flex items-center gap-2 px-5 py-3 border border-white/20 rounded-md hover:bg-white/5 transition-colors text-sm font-semibold w-fit"
            >
              MEET THE TEAM <ArrowRight size={16} />
            </a>
          </div>
        </div>

        {/* Batch Year Dropdown */}
        <div>
          <div className="relative w-full max-w-[240px] mb-6">
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

          {/* Members Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {members.map((person) => (
              <div
                key={person.name}
                className="flex flex-col bg-[#121212] border border-white/5 rounded-xl overflow-hidden hover:border-white/10 transition-colors"
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
                  <h3 className="font-heading font-bold text-sm md:text-base mb-1">
                    {person.name}
                  </h3>
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
        </div>
      </div>
    </section>
  );
}
