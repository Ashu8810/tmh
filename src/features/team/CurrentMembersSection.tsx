"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

export default function CurrentMembersSection() {
  return (
    <section className="flex flex-col lg:flex-row gap-12 lg:gap-24 w-full">
      {/* Section Header */}
      <div className="lg:w-1/3 flex flex-col pt-4">
        <span className="text-primary font-heading text-2xl font-bold mb-2">04</span>
        <h2 className="text-3xl font-heading font-bold uppercase tracking-wider mb-6">
          Current Members
        </h2>
        <div className="w-12 h-1 bg-white/10 mb-6" />
        <p className="text-muted-foreground">
          The force behind the build.<br />The future of engineering.
        </p>
      </div>

      {/* Content */}
      <div className="lg:w-2/3 flex flex-col md:flex-row gap-6">
        {/* Group Photo */}
        <div className="w-full md:w-2/3 rounded-xl overflow-hidden bg-neutral-900 border border-white/5 relative aspect-video md:aspect-auto">
          <img 
            src="/images/team-group.jpg" 
            alt="Motor Head Team Members" 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          {/* Placeholder overlay */}
          <div className="absolute inset-0 bg-white/5 flex items-center justify-center">
             {/* Text shown if image fails */}
          </div>
        </div>

        {/* Stats & CTA */}
        <div className="w-full md:w-1/3 flex flex-col justify-center p-8 bg-[#121212] border border-white/5 rounded-xl hover:border-white/10 transition-colors">
          <h3 className="text-5xl font-heading font-bold text-primary mb-2">60+</h3>
          <h4 className="font-heading font-bold text-xl mb-4">Active Members</h4>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8">
            From diverse backgrounds and disciplines, united by one passion – automotive engineering.
          </p>
          <a 
            href="/team/members" 
            className="inline-flex items-center gap-2 px-5 py-3 border border-white/20 rounded-md hover:bg-white/5 transition-colors text-sm font-semibold w-fit"
          >
            MEET THE TEAM <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
