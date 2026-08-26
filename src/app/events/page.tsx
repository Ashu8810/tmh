import { Metadata } from "next";
import StructuredData from "@/components/seo/StructuredData";
import EventCountdown from "@/features/events/EventCountdown";
import JourneySection from "@/features/events/JourneySection";

export const metadata: Metadata = {
  title: "Events & Motorsport Competitions | Motor Head",
  description:
    "Stay updated with Motor Head's upcoming and past events, motorsport competitions, vehicle rollouts, and technical workshops.",
  alternates: { canonical: "/events" },
  openGraph: {
    title: "Events & Motorsport Competitions | Motor Head",
    description:
      "Stay updated with Motor Head's upcoming and past events, motorsport competitions, vehicle rollouts, and technical workshops.",
    url: "https://motorhead.bmsit.ac.in/events",
  },
  twitter: {
    card: "summary_large_image",
    title: "Events & Motorsport Competitions | Motor Head",
    description:
      "Stay updated with Motor Head's upcoming and past events and motorsport competitions.",
  },
};

export default function EventsPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://motorhead.bmsit.ac.in/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Events",
        item: "https://motorhead.bmsit.ac.in/events",
      },
    ],
  };

  return (
    <main className="flex-1 w-full bg-[#050505] text-white min-h-screen font-sans overflow-x-hidden pt-24 pb-20 relative selection:bg-[#D71920] selection:text-white">
      <StructuredData data={breadcrumbSchema} />
      <div className="max-w-7xl mx-auto px-4 space-y-24 relative z-10">
        {/* Vault Door Terminal Header */}
        <header className="border-b-4 border-[#121212] pb-8 flex flex-col items-start bg-[#0a0a0a] p-8 border-l-4 border-l-[#D71920] relative overflow-hidden">
          {/* Hazard Stripes Pattern */}
          <div
            className="absolute top-0 right-0 w-32 h-full opacity-20 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(-45deg, #D71920, #D71920 10px, transparent 10px, transparent 20px)",
            }}
          />

          <h1 className="text-4xl md:text-6xl font-heading font-black uppercase tracking-tighter text-white drop-shadow-lg flex items-center italic mb-2 relative z-10">
            EVENTS & MISSIONS
          </h1>

          <p className="mt-2 text-zinc-400 font-mono text-sm max-w-2xl relative z-10 border-t border-white/5 pt-4">
            Authorized access only. Monitor live deployment countdowns, competition schedules, and declassified past mission logs.
          </p>
        </header>

        <EventCountdown />

        {/* Visual Divider */}
        <div className="w-full h-px bg-white/10 my-16 max-w-7xl mx-auto relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#050505] px-4 text-[#D71920] text-xs font-mono font-bold tracking-[0.2em] uppercase">
            DECLASSIFIED RECORDS
          </div>
        </div>

        <JourneySection />
      </div>
    </main>
  );
}
