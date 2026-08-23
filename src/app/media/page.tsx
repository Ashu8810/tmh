"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { mediaItems, Category } from "@/data/mediaData";

const categories: Category[] = ["ALL", "TRACK DAYS", "THE GARAGE", "EVENTS"];

export default function MediaPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("ALL");

  const filteredItems = mediaItems.filter(
    (item) => activeCategory === "ALL" || item.category === activeCategory,
  );

  return (
    <main className="flex-1 w-full bg-[#050505] text-white min-h-screen font-sans overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative w-full h-[40vh] md:h-[50vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden">
        {/* Background Gradient & Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/20 via-[#050505]/60 to-[#050505] z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent z-10" />
          <img
            src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1920"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
          />
        </div>

        <div className="relative z-20 mt-16 md:mt-20">
          <p className="text-[#D71920] font-heading font-bold text-xs md:text-sm tracking-[0.2em] uppercase mb-4">
            The Gallery
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black uppercase tracking-tighter text-white drop-shadow-lg">
            Raw Speed.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D71920] to-red-600">
              Captured.
            </span>
          </h1>
        </div>
      </section>

      {/* Mechanical Filter Tabs */}
      <section className="sticky top-[64px] md:top-[80px] z-40 bg-[#050505]/90 backdrop-blur-xl border-y border-white/5 w-full py-4 px-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto flex gap-2 md:gap-4 overflow-x-auto no-scrollbar justify-start md:justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`relative px-5 py-2.5 md:px-8 md:py-3 rounded text-xs md:text-sm font-bold tracking-widest uppercase whitespace-nowrap transition-all duration-300 ${
                activeCategory === category
                  ? "text-white bg-[#121212] border border-[#D71920] shadow-[0_0_15px_rgba(215,25,32,0.3)]"
                  : "text-zinc-400 bg-transparent border border-white/10 hover:text-white hover:bg-white/5 hover:border-white/30"
              }`}
            >
              {category}
              {/* Active Indicator Line */}
              {activeCategory === category && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-[#D71920] shadow-[0_2px_10px_rgba(215,25,32,0.8)]" />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Bento-Box Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        {filteredItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest">
              No media found for this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 auto-rows-[250px] gap-4 md:gap-6">
            {filteredItems.map((item) => (
              <Link
                key={item.id}
                href={`/media/${item.id}`}
                className={`block group relative rounded-xl overflow-hidden bg-[#121212] border border-white/5 hover:border-[#D71920]/50 transition-all duration-500 cursor-pointer ${
                  activeCategory === "ALL"
                    ? item.className
                    : "col-span-1 md:col-span-1 row-span-1"
                }`}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale-[50%] group-hover:grayscale-0 brightness-75 group-hover:brightness-100"
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 p-5 w-full flex flex-col justify-end translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-[#D71920] text-[10px] font-bold tracking-widest uppercase mb-1 drop-shadow-md">
                    {item.category}
                  </span>
                  <h3 className="text-white font-heading text-lg md:text-xl font-bold uppercase tracking-wide drop-shadow-lg">
                    {item.title}
                  </h3>
                </div>

                {/* Viewfinder Corners (Top Left & Bottom Right) */}
                <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#D71920] opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out" />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#D71920] opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out" />
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
