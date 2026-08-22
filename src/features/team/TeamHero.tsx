"use client";

import React from "react";

export default function TeamHeroSection() {
  return (
    <section className="relative w-full h-auto min-h-[45vh] md:min-h-[60vh] md:h-[600px] flex items-start md:items-center bg-[#0a0a0a] overflow-hidden border-b border-white/5 pt-32 pb-16 md:pt-0 md:pb-0">
      {/* Background Image / Placeholder */}
      <div className="absolute inset-0 z-0 flex items-end justify-end">
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a] z-10" />
        {/* Placeholder for the team with car photo */}
        <div className="absolute right-0 top-0 bottom-0 w-full md:w-3/4 opacity-60 flex items-end md:items-center">
          <img 
            src="/images/future-goals-bg.jpg" 
            alt="Motor Head Team" 
            className="w-full h-full object-cover object-right"
            onError={(e) => {
              // Fallback if image doesn't exist
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-red-900/10 mix-blend-overlay" />
        </div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row justify-between items-end">
        <div className="max-w-xl pb-10">
          <p className="text-primary font-bold tracking-widest text-sm uppercase mb-4">Our Strength</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-4 sm:mb-6 uppercase leading-tight">
            The Minds Behind<br />
            The <span className="text-primary">Machine.</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-md">
            A team of passionate engineers, innovators and dreamers working together to build, compete and inspire.
          </p>
        </div>
        
        <div className="hidden md:block pb-10 text-right">
          <p className="text-muted-foreground/40 text-xs font-bold tracking-widest uppercase leading-loose">
            Built by<br />Passion<br />Driven by<br />Engineering
          </p>
        </div>
      </div>
    </section>
  );
}
