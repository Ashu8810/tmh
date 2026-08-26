import { Metadata } from "next";
import StructuredData from "@/components/seo/StructuredData";
import ReportsClient from "./ReportsClient";
import StaticResourcesSection from "./StaticResourcesSection";

export const metadata: Metadata = {
  title: "Technical Reports & Performance Audits | Motor Head",
  description:
    "Explore annual reports, technical vehicle specifications, CFD aerodynamics studies, and performance telemetry dossiers from Motor Head.",
  alternates: { canonical: "/resources" },
  openGraph: {
    title: "Technical Reports & Performance Audits | Motor Head",
    description:
      "Explore annual reports, technical vehicle specifications, CFD aerodynamics studies, and performance telemetry dossiers from Motor Head.",
    url: "https://motorhead.bmsit.ac.in/resources",
  },
  twitter: {
    card: "summary_large_image",
    title: "Technical Reports | Motor Head",
    description:
      "Explore annual reports, technical vehicle specifications, and CFD aerodynamics studies.",
  },
};

import { getVerifiedSession } from "@/lib/session";

export default async function ReportsPage() {
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
        name: "Technical Reports",
        item: "https://motorhead.bmsit.ac.in/resources",
      },
    ],
  };

  let userRole: "ADMIN" | "CLUB_HEAD" | "MEMBER" | null = null;

  const session = await getVerifiedSession();
  if (session) {
    userRole = session.user.role as "ADMIN" | "CLUB_HEAD" | "MEMBER";
  }

  return (
    <main className="flex-1 w-full bg-[#050505] text-white min-h-screen font-sans overflow-x-hidden pt-24 pb-20 relative selection:bg-[#D71920] selection:text-white">
      <StructuredData data={breadcrumbSchema} />
      
      {/* Learning Materials & Branding Assets */}
      <StaticResourcesSection />

      {/* Visual Divider */}
      <div className="w-full h-px bg-white/10 my-24 max-w-7xl mx-auto relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#050505] px-4 text-[#D71920] text-xs font-mono font-bold tracking-[0.2em] uppercase">
          RESTRICTED AREA AHEAD
        </div>
      </div>

      {/* Telemetry & Reports */}
      <ReportsClient userRole={userRole} />
    </main>
  );
}
