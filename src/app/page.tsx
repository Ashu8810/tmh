import { Metadata } from "next";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import Link from "next/link";


export const metadata: Metadata = {
  title: "Motor Head | Automotive Engineering Club | BMSIT&M",
  description:
    "Official website for Motor Head, the automotive engineering club of BMS Institute of Technology and Management. Built by Passion, Driven by Engineering.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Motor Head | Automotive Engineering Club | BMSIT&M",
    description:
      "Official website for Motor Head, the automotive engineering club of BMS Institute of Technology and Management.",
    url: "https://motorhead.bmsit.ac.in/",
  },
};

export default async function Home() {
  // Fetch latest 3 reports
  const latestReports = await prisma.report.findMany({
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  // Check user session
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value || cookieStore.get("vault_session")?.value;
  let isLoggedIn = false;

  if (sessionId) {
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
    });
    if (session && session.expiresAt > new Date()) {
      isLoggedIn = true;
    }
  }

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  return (
    <main className="flex-1 w-full bg-[#050505] text-white min-h-screen font-sans overflow-x-hidden pt-24 pb-20 relative selection:bg-[#D71920] selection:text-white">
      <h1 className="sr-only">Motor Head | Automotive Engineering Club at BMSIT&M</h1>

      {/* Hero Section placeholder (keep aesthetic clean) */}
      <section className="max-w-7xl mx-auto px-4 relative z-10 mb-20 border-b border-white/10 pb-20 mt-10">
        <div className="flex items-center gap-2 mb-4 text-[#D71920] font-heading font-bold text-xs md:text-sm tracking-[0.2em] uppercase italic">
          <span className="w-8 h-[2px] bg-[#D71920]" />
          <p>Welcome to the Garage</p>
        </div>
        <h2 className="text-5xl md:text-7xl font-heading font-black uppercase tracking-tighter text-white drop-shadow-lg flex items-center italic transform -skew-x-6 leading-none">
          MOTOR HEAD
          <span className="inline-block w-[15px] md:w-[25px] h-[45px] md:h-[65px] bg-[#D71920] ml-3 animate-[pulse_1s_steps(2,start)_infinite]" />
        </h2>
        <p className="mt-6 text-zinc-400 font-sans text-sm md:text-lg max-w-2xl leading-relaxed">
          The official automotive engineering club of BMS Institute of Technology and Management. 
          We design, simulate, and manufacture high-performance vehicles. Built by Passion. Driven by Engineering.
        </p>
      </section>

      {/* Latest Telemetry Section */}
      <section className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-2 text-[#D71920] font-heading font-bold text-xs tracking-[0.2em] uppercase italic">
              <span className="w-4 h-[2px] bg-[#D71920]" />
              <p>System Broadcast</p>
            </div>
            <h3 className="text-3xl font-heading font-black uppercase tracking-tight italic transform -skew-x-6">
              LATEST TELEMETRY
            </h3>
          </div>
          <Link
            href="/reports"
            className="text-[#D71920] hover:text-white font-mono text-xs uppercase underline transition-colors tracking-widest hidden md:block"
          >
            VIEW FULL ARCHIVE &rarr;
          </Link>
        </div>

        {latestReports.length === 0 ? (
          <div className="text-center py-20 border border-white/5 bg-[#0a0a0a] transform -skew-x-6">
            <p className="text-zinc-500 font-heading font-bold text-sm uppercase tracking-widest animate-pulse italic transform skew-x-6">
              No telemetry data broadcasted yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestReports.map((report: { id: string; fileSize: number; title: string; createdAt: Date }) => (
              <Link
                href={isLoggedIn ? `/api/reports/${report.id}/download` : `/reports`}
                key={report.id}
                className="group relative bg-[#0a0a0a] border border-white/10 hover:border-[#D71920]/50 rounded-sm p-6 flex flex-col justify-between transition-all duration-300 overflow-hidden transform hover:-translate-y-1 block"
              >
                <div className="absolute top-0 left-0 w-[4px] h-full bg-[#D71920] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                
                <div className="mb-6 relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">
                      {report.id.slice(0, 8)}
                    </span>
                    <span className="text-zinc-600 font-mono text-[10px] border border-zinc-800 px-2 py-0.5 rounded-sm bg-[#121212]">
                      {formatSize(report.fileSize)}
                    </span>
                  </div>
                  <h4 className="text-lg font-heading font-bold uppercase tracking-wide text-zinc-100 group-hover:text-white transition-colors line-clamp-2 italic flex items-center gap-2">
                    {!isLoggedIn && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-500 flex-shrink-0">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                    )}
                    {report.title}
                  </h4>
                </div>

                <div className="mt-auto border-t border-white/5 pt-4 relative z-10">
                  <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500">
                    <span>{new Date(report.createdAt).toLocaleDateString()}</span>
                    <span className="text-[#D71920] group-hover:underline">
                      {isLoggedIn ? "DOWNLOAD LOG" : "LOCKED"}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <Link
          href="/reports"
          className="text-[#D71920] font-mono text-xs uppercase underline transition-colors tracking-widest block md:hidden mt-8 text-center"
        >
          VIEW FULL ARCHIVE &rarr;
        </Link>
      </section>
    </main>
  );
}
