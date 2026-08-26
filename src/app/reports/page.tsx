import { Metadata } from "next";
import StructuredData from "@/components/seo/StructuredData";
import ReportsClient from "./ReportsClient";

export const metadata: Metadata = {
  title: "Technical Reports & Performance Audits | Motor Head",
  description:
    "Explore annual reports, technical vehicle specifications, CFD aerodynamics studies, and performance telemetry dossiers from Motor Head.",
  alternates: { canonical: "/reports" },
  openGraph: {
    title: "Technical Reports & Performance Audits | Motor Head",
    description:
      "Explore annual reports, technical vehicle specifications, CFD aerodynamics studies, and performance telemetry dossiers from Motor Head.",
    url: "https://motorhead.bmsit.ac.in/reports",
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
        item: "https://motorhead.bmsit.ac.in/reports",
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
      <ReportsClient userRole={userRole} />
    </main>
  );
}
