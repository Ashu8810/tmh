"use client";

import React from "react";

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

export default function ClubLeadershipSection() {
  return (
    <section className="flex flex-col lg:flex-row gap-12 lg:gap-24 w-full">
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

      {/* Cards */}
      <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-4">
        {leaders.map((leader) => (
          <div
            key={leader.id}
            className="flex flex-col bg-[#121212] border border-white/5 rounded-xl overflow-hidden hover:border-white/10 transition-colors"
          >
            {/* Image Wrapper */}
            <div className="relative aspect-[4/5] bg-neutral-900 w-full">
              <img
                src={leader.image}
                alt={leader.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    leader.name
                  )}&background=202020&color=fff&size=400`;
                }}
              />
              {/* Badge */}
              <div className="absolute top-3 left-3 px-2 py-0.5 border border-primary text-primary text-[10px] font-bold uppercase rounded-sm bg-background/80 backdrop-blur-sm">
                {leader.badge}
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col items-center text-center">
              <h3 className="font-heading font-bold text-lg mb-1">
                {leader.name}
              </h3>
              <p className="text-primary text-xs font-semibold uppercase tracking-wider">
                {leader.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
