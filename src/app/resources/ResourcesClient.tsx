"use client";

import React, { useState } from "react";
import Link from "next/link";

interface ResourceFile {
  name: string;
  type: string;
  size: string;
  url: string;
}

interface ResourceCrate {
  id: string;
  title: string;
  clearance: string;
  files: ResourceFile[];
}

const resourcesData: ResourceCrate[] = [
  {
    id: "crate-branding",
    title: "BRANDING ASSETS & LOGOS",
    clearance: "PUBLIC",
    files: [
      {
        name: "TMH_Primary_Logo_Pack.zip",
        type: "ZIP",
        size: "12.4 MB",
        url: "#",
      },
      {
        name: "Brand_Guidelines_2024.pdf",
        type: "PDF",
        size: "4.1 MB",
        url: "#",
      },
      {
        name: "Team_Colors_Swatches.ase",
        type: "ASE",
        size: "1.2 MB",
        url: "#",
      },
    ],
  },
  {
    id: "crate-cad",
    title: "3D CAD SCHEMATICS",
    clearance: "LEVEL 2",
    files: [
      {
        name: "Chassis_Spaceframe_v3.step",
        type: "STEP",
        size: "45.8 MB",
        url: "#",
      },
      {
        name: "Suspension_A_Arms.sldprt",
        type: "SLDPRT",
        size: "22.1 MB",
        url: "#",
      },
      {
        name: "Aero_Package_Full.stl",
        type: "STL",
        size: "105.3 MB",
        url: "#",
      },
    ],
  },
  {
    id: "crate-rules",
    title: "TECHNICAL RULEBOOKS",
    clearance: "LEVEL 1",
    files: [
      { name: "FSAE_Rules_2024.pdf", type: "PDF", size: "8.5 MB", url: "#" },
      {
        name: "Internal_Design_Constraints.docx",
        type: "DOCX",
        size: "2.3 MB",
        url: "#",
      },
      {
        name: "Safety_Protocol_Manual.pdf",
        type: "PDF",
        size: "5.1 MB",
        url: "#",
      },
    ],
  },
  {
    id: "crate-marketing",
    title: "MARKETING & MEDIA KIT",
    clearance: "PUBLIC",
    files: [
      {
        name: "Sponsorship_Deck_2024.pdf",
        type: "PDF",
        size: "15.6 MB",
        url: "#",
      },
      {
        name: "High_Res_Team_Photos.zip",
        type: "ZIP",
        size: "250 MB",
        url: "#",
      },
      {
        name: "Press_Release_Templates.docx",
        type: "DOCX",
        size: "1.1 MB",
        url: "#",
      },
    ],
  },
];

export default function ResourcesClient() {
  const [unlockedCrates, setUnlockedCrates] = useState<string[]>([]);

  const toggleCrate = (id: string) => {
    setUnlockedCrates((prev) =>
      prev.includes(id)
        ? prev.filter((crateId) => crateId !== id)
        : [...prev, id],
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 relative z-10">
      {/* Vault Door Terminal Header */}
      <header className="mb-16 border-b-4 border-[#121212] pb-8 flex flex-col items-start bg-[#0a0a0a] p-8 border-l-4 border-l-[#D71920] relative overflow-hidden">
        {/* Hazard Stripes Pattern */}
        <div
          className="absolute top-0 right-0 w-32 h-full opacity-20"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, #D71920, #D71920 10px, transparent 10px, transparent 20px)",
          }}
        />

        <h1 className="text-4xl md:text-6xl font-heading font-black uppercase tracking-tighter text-white drop-shadow-lg flex items-center italic mb-2 relative z-10">
          SECURE RESOURCES
        </h1>

        <p className="mt-2 text-zinc-400 font-mono text-sm max-w-2xl relative z-10 border-t border-white/5 pt-4">
          Authorized access only. Select a secure crate below to initiate
          decryption and access high-value internal assets, schematics, and team
          documentation.
        </p>
      </header>

      {/* Secure Crates Grid */}
      <section className="flex flex-col gap-6">
        {resourcesData.map((crate) => {
          const isUnlocked = unlockedCrates.includes(crate.id);

          return (
            <div
              key={crate.id}
              className={`group relative bg-[#0a0a0a] border-2 transition-all duration-300 overflow-hidden ${
                isUnlocked
                  ? "border-[#D71920] shadow-[0_0_30px_rgba(215,25,32,0.15)]"
                  : "border-[#1f1f1f] hover:border-white/20"
              }`}
            >
              {/* Laser Scanner Line (Hover Effect) */}
              {!isUnlocked && (
                <div className="absolute top-0 left-0 w-full h-[2px] bg-[#D71920] shadow-[0_0_15px_rgba(215,25,32,0.8)] opacity-0 group-hover:opacity-100 group-hover:animate-[scan_2s_linear_infinite] z-20 pointer-events-none" />
              )}

              {/* Crate Header (Clickable Area) */}
              <div
                onClick={() => toggleCrate(crate.id)}
                className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center cursor-pointer relative z-10 bg-[#0a0a0a] hover:bg-[#121212] transition-colors"
              >
                <div className="flex items-center gap-6">
                  {/* Lock/Unlock Icon */}
                  <div
                    className={`w-12 h-12 flex items-center justify-center border-2 rounded-sm transition-colors duration-300 ${isUnlocked ? "border-[#D71920] text-[#D71920]" : "border-zinc-800 text-zinc-600"}`}
                  >
                    {isUnlocked ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          x="3"
                          y="11"
                          width="18"
                          height="11"
                          rx="2"
                          ry="2"
                        ></rect>
                        <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          x="3"
                          y="11"
                          width="18"
                          height="11"
                          rx="2"
                          ry="2"
                        ></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                    )}
                  </div>

                  <div>
                    <h3 className="text-2xl font-heading font-black uppercase tracking-widest text-zinc-200">
                      {crate.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-[#D71920] font-mono text-[10px] font-bold tracking-widest uppercase border border-[#D71920]/30 px-2 py-0.5 rounded-sm bg-[#D71920]/10">
                        CLEARANCE: {crate.clearance}
                      </span>
                      <span className="text-zinc-500 font-mono text-[10px] uppercase">
                        FILES: {crate.files.length}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 md:mt-0">
                  <span
                    className={`font-mono text-xs font-bold tracking-widest uppercase transition-colors ${isUnlocked ? "text-[#D71920]" : "text-zinc-600"}`}
                  >
                    {isUnlocked ? "[ CRATE OPEN ]" : "[ CLICK TO DECRYPT ]"}
                  </span>
                </div>
              </div>

              {/* Crate Contents (Accordion) */}
              <div
                className={`transition-all duration-500 ease-in-out bg-[#050505] border-t-2 border-[#1f1f1f] ${
                  isUnlocked
                    ? "max-h-[800px] opacity-100"
                    : "max-h-0 opacity-0 overflow-hidden"
                }`}
              >
                <div className="p-6 md:p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {crate.files.map((file, index) => (
                      <Link
                        href={file.url}
                        key={index}
                        className="flex items-center justify-between p-4 border border-white/5 bg-[#0a0a0a] hover:border-[#D71920]/50 hover:bg-[#D71920]/5 transition-all group/file"
                      >
                        <div className="flex items-center gap-4">
                          {/* File Type Icon Placeholder */}
                          <div className="w-10 h-10 bg-[#121212] border border-zinc-800 flex items-center justify-center text-zinc-500 font-mono text-[10px] font-bold">
                            {file.type}
                          </div>
                          <div>
                            <p className="font-sans text-sm font-bold text-zinc-300 group-hover/file:text-white truncate max-w-[200px] md:max-w-xs">
                              {file.name}
                            </p>
                            <p className="font-mono text-[10px] text-zinc-600 mt-1">
                              SIZE: {file.size}
                            </p>
                          </div>
                        </div>

                        <div className="text-zinc-600 group-hover/file:text-[#D71920] transition-colors">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                          </svg>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
