"use client";

import React, { useState, useEffect } from "react";

type Category = "ALL" | "TECHNICAL" | "FINANCIAL" | "RESEARCH";

interface Report {
  id: string;
  title: string;
  category: Category;
  date: string;
  size: string;
  clearance: string;
  summary: string;
}

const reportsData: Report[] = [
  {
    id: "tech-spec-2023",
    title: "TMH-23 Technical Specification",
    category: "TECHNICAL",
    date: "2023-10-14",
    size: "4.2 MB",
    clearance: "LEVEL 1",
    summary: "Complete breakdown of the TMH-23 spaceframe chassis, suspension geometry, and powertrain integration. Includes CAD drawings and load test results."
  },
  {
    id: "aero-cfd-analysis",
    title: "Aerodynamics CFD Analysis Report",
    category: "RESEARCH",
    date: "2023-08-22",
    size: "12.8 MB",
    clearance: "LEVEL 2",
    summary: "Computational Fluid Dynamics results for the new front wing and undertray. Shows a 14% increase in downforce at 80km/h."
  },
  {
    id: "annual-budget-22",
    title: "Annual Financial Review 2022-2023",
    category: "FINANCIAL",
    date: "2023-05-10",
    size: "1.5 MB",
    clearance: "LEVEL 3",
    summary: "Detailed breakdown of team expenditures, sponsor contributions, and manufacturing costs for the previous season."
  },
  {
    id: "chassis-torsional-stiffness",
    title: "Chassis Torsional Stiffness Validation",
    category: "TECHNICAL",
    date: "2023-04-05",
    size: "8.1 MB",
    clearance: "LEVEL 1",
    summary: "Physical testing results comparing the simulated torsional rigidity of the chassis against real-world rig testing."
  },
  {
    id: "battery-thermal-management",
    title: "EV Powertrain: Thermal Management Study",
    category: "RESEARCH",
    date: "2023-09-18",
    size: "9.4 MB",
    clearance: "LEVEL 2",
    summary: "Research into optimizing the cooling channels for the accumulator package during endurance events to prevent thermal throttling."
  },
  {
    id: "fmea-report-2023",
    title: "FMEA & Reliability Assessment",
    category: "TECHNICAL",
    date: "2023-11-02",
    size: "5.6 MB",
    clearance: "LEVEL 1",
    summary: "Failure Mode and Effects Analysis for all critical unsprung mass components. Identifies high-risk failure points and mitigation strategies."
  },
];

// Simple Animated Counter Component
const AnimatedStat = ({ label, value, suffix = "", duration = 1000 }: { label: string, value: number, suffix?: string, duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing out function
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      setCount(Math.floor(easeOutQuart * value));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  return (
    <div className="flex flex-col bg-[#0a0a0a] border border-white/10 p-4 rounded-sm transform -skew-x-12 relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-[2px] h-full bg-[#D71920]" />
      <span className="text-zinc-500 font-heading font-bold text-[10px] tracking-widest uppercase transform skew-x-12 block mb-1">
        {label}
      </span>
      <span className="text-3xl md:text-4xl font-heading font-black text-white transform skew-x-12 italic tracking-tighter">
        {count}<span className="text-[#D71920] text-lg md:text-2xl ml-1">{suffix}</span>
      </span>
    </div>
  );
};

export default function ReportsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [isGlitching, setIsGlitching] = useState(false);
  
  // Modal State
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleCategoryChange = (category: Category) => {
    if (category === activeCategory) return;
    setIsGlitching(true);
    setActiveCategory(category);
    setTimeout(() => {
      setIsGlitching(false);
    }, 400);
  };

  const handleDownload = (id: string) => {
    if (downloadingId) return;
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
      alert("Mock PDF Download Initiated!"); 
    }, 2000);
  };

  const filteredReports = reportsData.filter((report) => {
    const matchesCategory = activeCategory === "ALL" || report.category === activeCategory;
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          report.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="flex-1 w-full bg-[#050505] text-white min-h-screen font-sans overflow-x-hidden pt-24 pb-20 relative selection:bg-[#D71920] selection:text-white">
      
      {/* Sporty Diagonal Background */}
      <div 
        className="fixed inset-0 z-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, #ffffff 10px, #ffffff 11px)`,
        }}
      />
      {/* Large Red Accent Blur */}
      <div className="fixed -top-[20%] -right-[10%] w-[50vw] h-[50vw] bg-[#D71920] rounded-full blur-[150px] opacity-[0.05] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Dynamic Sporty Hero Section */}
        <header className="mb-12 border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4 text-[#D71920] font-heading font-bold text-xs md:text-sm tracking-[0.2em] uppercase italic">
              <span className="w-8 h-[2px] bg-[#D71920]" />
              <p>Telemetry & Diagnostics</p>
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-black uppercase tracking-tighter text-white drop-shadow-lg flex items-center italic transform -skew-x-6">
              RACE DATA LOGS
              <span className="inline-block w-[15px] md:w-[25px] h-[35px] md:h-[55px] bg-[#D71920] ml-3 animate-[pulse_1s_steps(2,start)_infinite]" />
            </h1>
            <p className="mt-4 text-zinc-400 font-sans text-sm md:text-base max-w-xl">
              Access confidential engineering dossiers, technical specifications, and research analysis from the Motor Head telemetry database. Built for speed, precision, and performance.
            </p>
          </div>

          {/* Live Telemetry Stats Dashboard */}
          <div className="flex gap-4">
             <AnimatedStat label="TOP SPEED" value={118} suffix="KM/H" duration={1500} />
             <AnimatedStat label="0-100 TIME" value={3.8} suffix="s" duration={2000} />
             <AnimatedStat label="LATERAL G" value={1.4} suffix="G" duration={1800} />
          </div>
        </header>

        {/* Filters and Search Bar */}
        <section className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-wrap gap-2 md:gap-4">
            {(["ALL", "TECHNICAL", "RESEARCH", "FINANCIAL"] as Category[]).map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`transform -skew-x-12 px-6 py-2 font-heading text-xs md:text-sm font-bold tracking-widest uppercase transition-all duration-300 border ${
                  activeCategory === category
                    ? "bg-[#D71920] text-white border-[#D71920] shadow-[0_4px_15px_rgba(215,25,32,0.4)]"
                    : "bg-[#121212] text-zinc-400 border-white/10 hover:text-white hover:bg-white/5 hover:border-white/30"
                }`}
              >
                <div className="transform skew-x-12">{category}</div>
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-64 transform -skew-x-6">
            <input 
              type="text" 
              placeholder="SEARCH LOGS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-white/20 text-white font-mono text-xs p-3 pl-10 focus:outline-none focus:border-[#D71920] transition-colors"
            />
            <svg className="absolute left-3 top-3 w-4 h-4 text-zinc-500 transform skew-x-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </section>

        {/* Dossier Grid */}
        <section 
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300 ${
            isGlitching ? "opacity-0 blur-sm translate-y-4" : "opacity-100 blur-0 translate-y-0"
          }`}
        >
          {filteredReports.map((report) => (
            <div 
              key={report.id}
              onClick={() => setSelectedReport(report)}
              className="group relative bg-[#0a0a0a] border border-white/10 hover:border-white/20 rounded-sm p-6 flex flex-col justify-between transition-all duration-300 overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-[#D71920]/10 transform hover:-translate-y-1 cursor-pointer"
            >
              {/* Left Racing Stripe Accent */}
              <div className="absolute top-0 left-0 w-[4px] h-full bg-[#D71920] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
              
              <div className="mb-8 pl-2 transition-transform duration-300 group-hover:translate-x-2">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[#D71920] font-heading font-bold text-[10px] tracking-widest uppercase">
                    FILE: {report.id}
                  </span>
                  <span className="text-zinc-600 font-mono text-[10px] border border-zinc-800 px-2 py-0.5 rounded-sm bg-[#121212]">
                    {report.clearance}
                  </span>
                </div>
                <h3 className="text-xl font-heading font-bold uppercase tracking-wide text-zinc-100 group-hover:text-white transition-colors line-clamp-2 italic">
                  {report.title}
                </h3>
              </div>

              <div className="mt-auto pl-2 transition-transform duration-300 group-hover:translate-x-2">
                <div className="flex justify-between items-center text-xs font-mono text-zinc-500 mt-4 border-t border-white/5 pt-4">
                  <span>DATE: {report.date}</span>
                  <span className="text-[#D71920] group-hover:underline">VIEW DOSSIER &rarr;</span>
                </div>
              </div>
            </div>
          ))}
        </section>
        
        {filteredReports.length === 0 && (
          <div className="text-center py-20 border border-white/5 bg-[#0a0a0a] mt-8 transform -skew-x-6">
            <p className="text-zinc-500 font-heading font-bold text-sm uppercase tracking-widest animate-pulse italic transform skew-x-6">No telemetry data found.</p>
          </div>
        )}

      </div>

      {/* Quick View Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div 
            className="bg-[#050505] border border-white/10 w-full max-w-2xl shadow-[0_0_50px_rgba(215,25,32,0.15)] relative transform -skew-x-2 animate-[slideIn_0.3s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b border-white/10 bg-[#0a0a0a]">
              <span className="text-[#D71920] font-mono text-xs font-bold tracking-widest uppercase transform skew-x-2">
                SYSTEM DECRYPTED // CONFIDENTIAL
              </span>
              <button 
                onClick={() => setSelectedReport(null)}
                className="text-zinc-500 hover:text-white transform skew-x-2 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8 transform skew-x-2">
              <div className="mb-6 flex gap-3">
                <span className="text-zinc-400 font-mono text-[10px] border border-white/20 px-2 py-1 rounded-sm bg-[#121212]">
                  {selectedReport.clearance}
                </span>
                <span className="text-zinc-400 font-mono text-[10px] border border-white/20 px-2 py-1 rounded-sm bg-[#121212]">
                  {selectedReport.size}
                </span>
                <span className="text-zinc-400 font-mono text-[10px] border border-white/20 px-2 py-1 rounded-sm bg-[#121212]">
                  {selectedReport.date}
                </span>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-heading font-black uppercase tracking-wide text-white mb-4 italic">
                {selectedReport.title}
              </h2>
              
              <p className="text-zinc-400 font-sans text-sm leading-relaxed mb-8">
                {selectedReport.summary}
              </p>

              {/* Faux Wireframe Graphic */}
              <div className="w-full h-32 bg-[#0a0a0a] border border-white/5 rounded-sm mb-8 relative overflow-hidden flex items-center justify-center">
                 <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 10px, #D71920 10px, #D71920 11px), repeating-linear-gradient(90deg, transparent, transparent 10px, #D71920 10px, #D71920 11px)`, backgroundSize: '11px 11px' }} />
                 <span className="text-[#D71920] font-mono text-xs font-bold tracking-widest relative z-10 animate-pulse">ANALYZING SCHEMATICS...</span>
              </div>

              {/* Download Button inside Modal */}
              <button 
                onClick={() => handleDownload(selectedReport.id)}
                disabled={downloadingId === selectedReport.id}
                className="w-full relative overflow-hidden bg-[#D71920] text-white font-heading text-sm font-bold tracking-widest py-4 uppercase transition-all duration-300 disabled:cursor-wait transform -skew-x-12 hover:bg-red-600 shadow-[0_0_20px_rgba(215,25,32,0.4)]"
              >
                <div className="relative z-10 flex items-center justify-center gap-2 transform skew-x-12">
                  {downloadingId === selectedReport.id ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>ESTABLISHING SECURE CONNECTION...</span>
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="7 10 12 15 17 10"/>
                        <line x1="12" x2="12" y1="15" y2="3"/>
                      </svg>
                      <span>DOWNLOAD FULL DOSSIER</span>
                    </>
                  )}
                </div>
                {/* Download Progress Bar Overlay */}
                {downloadingId === selectedReport.id && (
                  <div className="absolute inset-0 bg-white/20 origin-left animate-[progress_2s_ease-in-out_forwards]" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes progress {
          0% { transform: scaleX(0); }
          50% { transform: scaleX(0.7); }
          100% { transform: scaleX(1); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px) skewX(-2deg); }
          to { opacity: 1; transform: translateY(0) skewX(-2deg); }
        }
      `}</style>
    </main>
  );
}
