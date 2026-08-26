"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Member {
  name: string;
  image: string;
  linkedin: string;
}

const membersByYear: Record<string, Member[]> = {
  "2028": [
    {
      name: "Aaron Joel Jonathan",
      image: "/images/members/Aaron Joel Jonathan.jpg",
      linkedin: "https://www.linkedin.com/in/aaron-jonathan-193a17332",
    },
    {
      name: "Hariharan N",
      image: "/images/members/Hariharan N.jpg",
      linkedin: "https://www.linkedin.com/in/hariharan-n-54051728a",
    },
    {
      name: "Mohith M",
      image: "/images/members/Mohith M.jpg",
      linkedin: "https://www.linkedin.com/in/mohith-m-05aa36251",
    },
    {
      name: "Arjun Livik J P",
      image: "/images/members/Arjun Livik J P.jpg",
      linkedin: "https://www.linkedin.com/in/arjun-livik-jp-b84018334",
    },
    {
      name: "Vivek D B",
      image: "/images/members/Vivek db.jpg",
      linkedin: "https://www.linkedin.com/in/vivek-db-509348327",
    },
    {
      name: "Hamsashree M",
      image: "/images/members/Hamsashree M.jpg",
      linkedin: "https://www.linkedin.com/in/hamsashree-m-3aa71b409",
    },
    {
      name: "Bhargav Narasimha H",
      image: "/images/members/Bhargav Narasimha H.jpg",
      linkedin: "#",
    },
    {
      name: "Aatif Mohideen",
      image: "/images/members/Aatif Mohideen.jpg",
      linkedin: "https://www.linkedin.com/in/aatif-mohideen-012555331",
    },
    {
      name: "Karthik Gopal Halliyur",
      image: "/images/members/Karthik Gopal Halliyur.jpg",
      linkedin: "https://www.linkedin.com/in/karthik-halliyur-919a63331",
    },
    {
      name: "Pranjal Raj",
      image: "/images/members/Pranjal Raj.jpg",
      linkedin: "https://www.linkedin.com/in/pranjal-raj-186bb234b",
    },
    {
      name: "Srujan A P",
      image: "/images/members/Srujan A P.jpg",
      linkedin: "https://www.linkedin.com/in/srujan-ap-04a277330",
    },
  ],
  "2027": [
    {
      name: "Abhijeeth",
      image: "/images/members/Abhijeeth.jpg",
      linkedin: "#",
    },
    {
      name: "Aditya Singh",
      image: "/images/members/Aditya Singh.jpg",
      linkedin: "#",
    },
    {
      name: "DJ",
      image: "/images/members/DJ.jpg",
      linkedin: "#",
    },
    {
      name: "Gautam P",
      image: "/images/members/Gautam P.jpg",
      linkedin: "#",
    },
    {
      name: "Shankar",
      image: "/images/members/Shankar.jpg",
      linkedin: "https://www.linkedin.com/in/shankar-p-6038a4270",
    },
    {
      name: "Venkat",
      image: "/images/members/Venkat.jpg",
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
        <div className="flex flex-col gap-6">
          {/* Group Photo */}
          <div className="w-full rounded-xl overflow-hidden bg-neutral-900 border border-white/5 relative aspect-video">
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
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        person.name
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
