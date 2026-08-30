"use client";

import React from "react";

const LinkedinIcon = ({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const coordinators = [
  {
    id: 1,
    name: "Dr. Nagamadhu M.",
    role: "Faculty Coordinator",
    description:
      "Providing strategic guidance and technical support to drive the club forward.",
    image: "/images/faculty/NG.webp",
    linkedin: "#",
  },

];

export default function FacultyCoordinatorsSection() {
  return (
    <section className="flex flex-col lg:flex-row gap-12 lg:gap-24 w-full">
      {/* Section Header */}
      <div className="lg:w-1/3 flex flex-col pt-4">
        <span className="text-primary font-heading text-2xl font-bold mb-2">
          01
        </span>
        <h2 className="text-3xl font-heading font-bold uppercase tracking-wider mb-6">
          Faculty Coordinators
        </h2>
        <div className="w-12 h-1 bg-white/10 mb-6" />
        <p className="text-muted-foreground">
          Guiding us with their expertise, experience and constant support.
        </p>
      </div>

      {/* Cards */}
      <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
        {coordinators.map((coordinator) => (
          <div
            key={coordinator.id}
            className="flex bg-[#121212] border border-white/5 rounded-xl overflow-hidden hover:border-white/10 transition-colors"
          >
            {/* Image */}
            <div className="w-2/5 shrink-0 bg-neutral-900 relative">
              <img
                src={coordinator.image}
                alt={coordinator.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    coordinator.name,
                  )}&background=202020&color=fff&size=200`;
                }}
              />
            </div>

            {/* Content */}
            <div className="w-3/5 p-6 flex flex-col justify-center">
              <h3 className="font-heading font-bold text-xl mb-1">
                {coordinator.name}
              </h3>
              <p className="text-primary text-xs font-semibold mb-3 uppercase tracking-wider">
                {coordinator.role}
              </p>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3">
                {coordinator.description}
              </p>
              <a
                href={coordinator.linkedin}
                className="text-muted-foreground hover:text-white transition-colors"
                aria-label={`${coordinator.name} LinkedIn`}
              >
                <LinkedinIcon size={18} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
