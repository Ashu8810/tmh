"use client";

import React from "react";
import { Mail, Link as LinkIcon } from "lucide-react";

const LinkedinIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
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

const leaders = [
  {
    id: 1,
    name: "Aditya S.",
    role: "Team Lead",
    badge: "TEAM LEAD",
    image: "/images/aditya-s.jpg",
    links: { linkedin: "#", email: "#", website: "#" }
  },
  {
    id: 2,
    name: "Rohan M.",
    role: "Deputy Team Lead",
    badge: "DEPUTY LEAD",
    image: "/images/rohan-m.jpg",
    links: { linkedin: "#", email: "#", website: "#" }
  },
  {
    id: 3,
    name: "Sneha K.",
    role: "Operations Lead",
    badge: "OPERATIONS LEAD",
    image: "/images/sneha-k.jpg",
    links: { linkedin: "#", email: "#", website: "#" }
  },
  {
    id: 4,
    name: "Vikram J.",
    role: "Technical Lead",
    badge: "TECHNICAL LEAD",
    image: "/images/vikram-j.jpg",
    links: { linkedin: "#", email: "#", website: "#" }
  }
];

export default function ClubLeadershipSection() {
  return (
    <section className="flex flex-col lg:flex-row gap-12 lg:gap-24 w-full">
      {/* Section Header */}
      <div className="lg:w-1/3 flex flex-col pt-4">
        <span className="text-primary font-heading text-2xl font-bold mb-2">02</span>
        <h2 className="text-3xl font-heading font-bold uppercase tracking-wider mb-6">
          Club Leadership
        </h2>
        <div className="w-12 h-1 bg-white/10 mb-6" />
        <p className="text-muted-foreground">
          Leading the vision. Driving the mission forward.
        </p>
      </div>

      {/* Cards */}
      <div className="lg:w-2/3 grid grid-cols-2 lg:grid-cols-4 gap-4">
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
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(leader.name)}&background=202020&color=fff&size=400`;
                }}
              />
              {/* Badge */}
              <div className="absolute top-3 left-3 px-2 py-0.5 border border-primary text-primary text-[10px] font-bold uppercase rounded-sm bg-background/80 backdrop-blur-sm">
                {leader.badge}
              </div>
            </div>
            
            {/* Content */}
            <div className="p-5 flex flex-col items-center text-center">
              <h3 className="font-heading font-bold text-lg mb-1">{leader.name}</h3>
              <p className="text-primary text-xs font-semibold mb-4 uppercase tracking-wider">{leader.role}</p>
              
              <div className="flex gap-3 text-muted-foreground">
                <a href={leader.links.linkedin} className="hover:text-white transition-colors">
                  <LinkedinIcon size={16} />
                </a>
                <a href={leader.links.website} className="hover:text-white transition-colors">
                  <LinkIcon size={16} />
                </a>
                <a href={leader.links.email} className="hover:text-white transition-colors">
                  <Mail size={16} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
