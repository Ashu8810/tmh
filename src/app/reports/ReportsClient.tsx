"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface ReportFolder {
  id: string;
  name: string;
  parentId: string | null;
}

interface Report {
  id: string;
  title: string;
  fileType: string;
  fileSize: number;
  description: string | null;
  createdAt: string;
  folderId: string | null;
  uploader: {
    email: string;
  };
}

// Simple Animated Counter Component
const AnimatedStat = ({
  label,
  value,
  suffix = "",
  duration = 1000,
}: {
  label: string;
  value: number;
  suffix?: string;
  duration?: number;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
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
        {count}
        <span className="text-[#D71920] text-lg md:text-2xl ml-1">
          {suffix}
        </span>
      </span>
    </div>
  );
};

export default function ReportsClient({ userRole }: { userRole: "ADMIN" | "MEMBER" | null }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isGlitching, setIsGlitching] = useState(false);

  // Data State
  const [reports, setReports] = useState<Report[]>([]);
  const [folders, setFolders] = useState<ReportFolder[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Upload State
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadDesc, setUploadDesc] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/reports");
      const data = await res.json();
      if (res.ok) {
        setReports(data.reports || []);
        setFolders(data.folders || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (id: string) => {
    if (!userRole) {
      router.push('/login');
      return;
    }
    if (downloadingId) return;
    setDownloadingId(id);
    // Redirect to the download API route which gives a signed URL
    window.location.href = `/api/reports/${id}/download`;
    setTimeout(() => {
      setDownloadingId(null);
    }, 2000);
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile || !uploadTitle) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", uploadFile);
    formData.append("title", uploadTitle);
    formData.append("description", uploadDesc);

    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setShowUploadModal(false);
        setUploadFile(null);
        setUploadTitle("");
        setUploadDesc("");
        fetchData();
      } else {
        const err = await res.json();
        alert(err.error || "Upload failed");
      }
    } catch (e) {
      console.error(e);
      alert("An error occurred during upload.");
    } finally {
      setUploading(false);
    }
  };

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (report.description && report.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  return (
    <div className="max-w-7xl mx-auto px-4 relative z-10">
      {/* Dynamic Sporty Hero Section */}
      <header className="mb-12 border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4 text-[#D71920] font-heading font-bold text-xs md:text-sm tracking-[0.2em] uppercase italic">
            <span className="w-8 h-[2px] bg-[#D71920]" />
            <p>Telemetry & Diagnostics</p>
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-black uppercase tracking-tighter text-white drop-shadow-lg flex items-center italic transform -skew-x-6">
            SECURE VAULT
            <span className="inline-block w-[15px] md:w-[25px] h-[35px] md:h-[55px] bg-[#D71920] ml-3 animate-[pulse_1s_steps(2,start)_infinite]" />
          </h1>
          <p className="mt-4 text-zinc-400 font-sans text-sm md:text-base max-w-xl">
            Access confidential engineering dossiers, technical specifications,
            and research analysis from the Motor Head telemetry database. Built
            for speed, precision, and performance.
          </p>
        </div>

        {/* Live Telemetry Stats Dashboard */}
        <div className="flex gap-4">
          <AnimatedStat
            label="DOCUMENTS"
            value={reports.length}
            suffix=""
            duration={1500}
          />
          {userRole === "ADMIN" && (
            <button
              onClick={() => setShowUploadModal(true)}
              className="bg-[#D71920] text-white font-heading text-sm font-bold tracking-widest py-4 px-6 uppercase transition-all duration-300 transform -skew-x-12 hover:bg-red-600 shadow-[0_0_20px_rgba(215,25,32,0.4)] ml-4 self-center"
            >
              <div className="transform skew-x-12">+ UPLOAD</div>
            </button>
          )}
        </div>
      </header>

      {/* Filters and Search Bar */}
      <section className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex flex-wrap gap-2 md:gap-4">
           {/* Folders UI could go here in the future. For now it's a flat list. */}
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
          <svg
            className="absolute left-3 top-3 w-4 h-4 text-zinc-500 transform skew-x-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </section>

      {/* Dossier Grid */}
      <section
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300 ${
          isGlitching || loading
            ? "opacity-50 blur-sm translate-y-4"
            : "opacity-100 blur-0 translate-y-0"
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
                  {report.fileType.split("/")[1]?.toUpperCase() || "FILE"}
                </span>
                <span className="text-zinc-600 font-mono text-[10px] border border-zinc-800 px-2 py-0.5 rounded-sm bg-[#121212]">
                  {formatSize(report.fileSize)}
                </span>
              </div>
              <h3 className="text-xl font-heading font-bold uppercase tracking-wide text-zinc-100 group-hover:text-white transition-colors line-clamp-2 italic flex items-center gap-2">
                {!userRole && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-500">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                )}
                {report.title}
              </h3>
            </div>

            <div className="mt-auto pl-2 transition-transform duration-300 group-hover:translate-x-2">
              <div className="flex justify-between items-center text-xs font-mono text-zinc-500 mt-4 border-t border-white/5 pt-4">
                <span>DATE: {new Date(report.createdAt).toLocaleDateString()}</span>
                <span className="text-[#D71920] group-hover:underline">
                  {userRole ? "VIEW DOSSIER &rarr;" : "LOCKED"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </section>

      {!loading && filteredReports.length === 0 && (
        <div className="text-center py-20 border border-white/5 bg-[#0a0a0a] mt-8 transform -skew-x-6">
          <p className="text-zinc-500 font-heading font-bold text-sm uppercase tracking-widest animate-pulse italic transform skew-x-6">
            No telemetry data found.
          </p>
        </div>
      )}

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
                SYSTEM LOG // {selectedReport.id.slice(0,8)}
              </span>
              <button
                onClick={() => setSelectedReport(null)}
                className="text-zinc-500 hover:text-white transform skew-x-2 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8 transform skew-x-2">
              <div className="mb-6 flex gap-3">
                <span className="text-zinc-400 font-mono text-[10px] border border-white/20 px-2 py-1 rounded-sm bg-[#121212]">
                  {formatSize(selectedReport.fileSize)}
                </span>
                <span className="text-zinc-400 font-mono text-[10px] border border-white/20 px-2 py-1 rounded-sm bg-[#121212]">
                  {new Date(selectedReport.createdAt).toLocaleDateString()}
                </span>
                <span className="text-zinc-400 font-mono text-[10px] border border-white/20 px-2 py-1 rounded-sm bg-[#121212]">
                  BY: {selectedReport.uploader.email}
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-heading font-black uppercase tracking-wide text-white mb-4 italic">
                {selectedReport.title}
              </h2>

              <p className="text-zinc-400 font-sans text-sm leading-relaxed mb-8">
                {selectedReport.description || "No description provided."}
              </p>

              {/* Faux Wireframe Graphic */}
              <div className="w-full h-32 bg-[#0a0a0a] border border-white/5 rounded-sm mb-8 relative overflow-hidden flex items-center justify-center">
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 10px, #D71920 10px, #D71920 11px), repeating-linear-gradient(90deg, transparent, transparent 10px, #D71920 10px, #D71920 11px)`,
                    backgroundSize: "11px 11px",
                  }}
                />
                {!userRole ? (
                  <span className="text-[#D71920] font-mono text-xs font-bold tracking-widest relative z-10 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    ACCESS RESTRICTED - LOGIN REQUIRED
                  </span>
                ) : (
                  <span className="text-[#D71920] font-mono text-xs font-bold tracking-widest relative z-10 animate-pulse">
                    ANALYZING SCHEMATICS...
                  </span>
                )}
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
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>ESTABLISHING SECURE CONNECTION...</span>
                    </>
                  ) : (
                    <>
                      {userRole ? (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" x2="12" y1="15" y2="3" />
                          </svg>
                          <span>DOWNLOAD FULL DOSSIER</span>
                        </>
                      ) : (
                        <>
                          <span>LOGIN TO UNLOCK</span>
                        </>
                      )}
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

      {/* Upload Modal (Admin Only) */}
      {showUploadModal && userRole === "ADMIN" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div
            className="bg-[#050505] border border-white/10 w-full max-w-lg shadow-[0_0_50px_rgba(215,25,32,0.15)] relative transform -skew-x-2 animate-[slideIn_0.3s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b border-white/10 bg-[#0a0a0a]">
              <span className="text-[#D71920] font-mono text-xs font-bold tracking-widest uppercase transform skew-x-2">
                UPLOAD NEW DOSSIER
              </span>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-zinc-500 hover:text-white transform skew-x-2 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="p-6 md:p-8 transform skew-x-2">
              <div className="mb-4">
                <label className="block text-zinc-400 font-mono text-[10px] mb-2 uppercase">File</label>
                <input
                  type="file"
                  required
                  onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                  className="w-full bg-[#121212] border border-white/10 p-2 text-white text-sm focus:border-[#D71920] outline-none transition-colors"
                />
              </div>

              <div className="mb-4">
                <label className="block text-zinc-400 font-mono text-[10px] mb-2 uppercase">Title</label>
                <input
                  type="text"
                  required
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  className="w-full bg-[#121212] border border-white/10 p-2 text-white text-sm focus:border-[#D71920] outline-none transition-colors"
                  placeholder="e.g. TMH-24 Technical Specification"
                />
              </div>

              <div className="mb-6">
                <label className="block text-zinc-400 font-mono text-[10px] mb-2 uppercase">Description</label>
                <textarea
                  value={uploadDesc}
                  onChange={(e) => setUploadDesc(e.target.value)}
                  rows={3}
                  className="w-full bg-[#121212] border border-white/10 p-2 text-white text-sm focus:border-[#D71920] outline-none transition-colors"
                  placeholder="Summary of the report..."
                />
              </div>

              <button
                type="submit"
                disabled={uploading}
                className="w-full bg-[#D71920] text-white font-heading text-sm font-bold tracking-widest py-3 uppercase transition-all duration-300 transform -skew-x-6 hover:bg-red-600 shadow-[0_0_15px_rgba(215,25,32,0.4)] disabled:opacity-50"
              >
                <div className="transform skew-x-6">
                  {uploading ? "UPLOADING..." : "SUBMIT REPORT"}
                </div>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
