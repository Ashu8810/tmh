"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

export default function JoinMotorHeadSection() {
  return (
    <section className="flex flex-col lg:flex-row gap-12 lg:gap-24 w-full pb-16">
      {/* Section Header */}
      <div className="lg:w-1/3 flex flex-col pt-4">
        <span className="text-primary font-heading text-2xl font-bold mb-2">
          06
        </span>
        <h2 className="text-3xl font-heading font-bold uppercase tracking-wider mb-6">
          Join Motor Head
        </h2>
        <div className="w-12 h-1 bg-white/10 mb-6" />
        <p className="text-muted-foreground">
          Think. Build. Compete.
          <br />
          Be a part of something bigger.
        </p>
      </div>

      {/* Content */}
      <div className="lg:w-2/3 relative rounded-xl overflow-hidden bg-[#121212] border border-white/10 flex flex-col justify-center p-8 md:p-12 min-h-[300px]">
        {/* Background outline image placeholder */}
        <div className="absolute inset-0 right-0 left-1/3 opacity-20 pointer-events-none">
          <img
            src="/images/f1-blueprint.png"
            alt="F1 Blueprint"
            className="w-full h-full object-cover object-right"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>

        <div className="relative z-10 max-w-lg">
          <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4 leading-tight">
            Ready to push boundaries and build the future?
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8">
            We are always looking for passionate and curious minds to join our
            team.
          </p>
          <a
            href="/join"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-semibold w-fit"
          >
            APPLY NOW <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
