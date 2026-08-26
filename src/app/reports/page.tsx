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

import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

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

  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value || cookieStore.get("vault_session")?.value;
  let userRole: "ADMIN" | "MEMBER" | null = null;

  if (sessionId) {
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: { user: true },
    });
    if (session && session.expiresAt > new Date()) {
      userRole = session.user.role as "ADMIN" | "MEMBER";
    }
  }

  return (
    <main className="flex-1 w-full bg-[#050505] text-white min-h-screen font-sans overflow-x-hidden pt-24 pb-20 relative selection:bg-[#D71920] selection:text-white">
      <StructuredData data={breadcrumbSchema} />
      <ReportsClient userRole={userRole} />
    </main>
  );
}
