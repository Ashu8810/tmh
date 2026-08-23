"use client";

import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function AboutHero() {
  return (
    <section className="relative w-full h-auto min-h-[70vh] lg:min-h-[90vh] flex items-start lg:items-center bg-[#050505] overflow-hidden pt-32 lg:pt-24 pb-48 lg:pb-16">
      {/* Background Graphic - The Car Image */}
      <div className="absolute inset-0 z-0 flex items-end justify-end">
        {/* Actual exported car image from the design */}
        <img
          src="/images/about-hero.jpg"
          alt="Motor Head Racing Car"
          className="absolute right-0 bottom-0 lg:top-0 w-full lg:w-[80%] h-[90%] lg:h-full object-cover opacity-70 mix-blend-screen"
        />

        {/* Gradients to blend the image seamlessly into the black background */}
        <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-[#050505] via-[#050505]/90 to-transparent z-10 lg:w-[70%]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-l from-[#050505]/30 to-transparent z-10"></div>
      </div>

      {/* Far Left Red Line Indicator */}
      <div className="absolute left-0 top-1/3 w-[2px] h-16 bg-[#D71920] z-20"></div>

      {/* Left side text indicator (01 / 02 style, rotated) */}
      <div className="absolute left-6 bottom-32 -rotate-90 origin-left flex items-center gap-4 text-xs font-mono text-white/30 z-20 hidden lg:flex">
        <span>01</span>
        <div className="w-12 h-[1px] bg-white/30"></div>
        <span>05</span>
      </div>

      <div className="container mx-auto px-6 lg:px-16 relative z-20 w-full mt-0">
        <div className="max-w-3xl">
          {/* Subtitle */}
          <h2 className="font-heading text-xs md:text-sm text-[#D71920] font-bold tracking-[0.2em] uppercase mb-6 flex items-center gap-3">
            ABOUT MOTOR HEAD
          </h2>

          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-white leading-[1.15] mb-6 sm:mb-8">
            Built by Passion. <br />
            Driven by <span className="text-[#D71920]">Engineering.</span>
          </h1>

          {/* Description */}
          <p className="max-w-xl text-base md:text-lg text-white/70 font-medium leading-relaxed mb-12">
            We are a team of dreamers, engineers and makers,{" "}
            <br className="hidden md:block" />
            building racing machines and a better future.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <Link
              href="#our-story"
              className="inline-flex items-center gap-4 px-8 py-3.5 bg-transparent border border-[#D71920] rounded hover:bg-[#D71920]/10 text-white font-bold text-xs tracking-wider transition-all duration-300 group"
            >
              OUR JOURNEY
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <button className="inline-flex items-center gap-4 text-white hover:text-[#D71920] transition-colors group">
              <div className="w-10 h-10 rounded-full border border-white/20 group-hover:border-[#D71920] flex items-center justify-center transition-colors bg-black/50 backdrop-blur-sm">
                <Play className="w-3.5 h-3.5 fill-[#D71920] text-[#D71920] ml-0.5" />
              </div>
              <span className="font-bold text-xs tracking-wider uppercase drop-shadow-md">
                Watch Video
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Side HUD Elements */}
      <div className="absolute right-8 md:right-16 top-0 bottom-0 pointer-events-none z-30 flex flex-col justify-between py-24 hidden md:flex">
        {/* Top Right Crosshair */}
        <div className="relative w-32 h-32 flex items-center justify-center mt-12 mix-blend-screen">
          <div className="absolute inset-0 rounded-full border border-white/20 border-t-white/60 border-r-white/60 rotate-45"></div>
          <div className="absolute inset-2 rounded-full border border-white/10 border-b-[#D71920]/80 -rotate-12"></div>
          <div className="absolute w-full h-[1px] bg-white/20"></div>
          <div className="absolute h-full w-[1px] bg-white/20"></div>
          <span className="font-heading text-white/50 italic font-bold text-xs">
            MH
          </span>
        </div>

        {/* Bottom Right Stacked Text */}
        <div className="flex flex-col items-end gap-3 font-mono text-[10px] text-white/70 tracking-widest uppercase mb-12 mix-blend-screen drop-shadow-md">
          <span>INNOVATE</span>
          <span>DESIGN</span>
          <span>BUILD</span>
          <span>COMPETE</span>
          <span className="font-heading text-[#D71920] italic font-bold text-xl mt-4 Normal normal-case tracking-normal">
            MH
          </span>
        </div>
      </div>
    </section>
  );
}
