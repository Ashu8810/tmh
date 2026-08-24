import { Metadata } from "next";
import StructuredData from "@/components/seo/StructuredData";
import {
  AboutHero,
  OurStorySection,
  MissionVisionSection,
  WhatWeDoSection,
  DepartmentsSection,
  AchievementsSection,
  EventTimelineSection,
  CurrentGoalsSection,
  FutureGoalsSection,
} from "@/features/about";

export const metadata: Metadata = {
  title: "About Motor Head | BMSIT&M Automotive Engineering Club",
  description:
    "Learn about Motor Head, the student automotive engineering club at BMSIT. Discover our story, mission, departments, and achievements in vehicle design.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Motor Head | BMSIT&M Automotive Engineering Club",
    description:
      "Learn about Motor Head, the student automotive engineering club at BMSIT. Discover our story, mission, departments, and achievements in vehicle design.",
    url: "https://motorhead.bmsit.ac.in/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Motor Head | BMSIT&M Automotive Engineering Club",
    description:
      "Learn about Motor Head, the student automotive engineering club at BMSIT.",
  },
};

export default function AboutPage() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Motor Head Automotive Engineering Club",
    description:
      "Student engineering club dedicated to automotive design, vehicle dynamics, powertrain engineering, and Formula competitions.",
    url: "https://motorhead.bmsit.ac.in/about",
    parentOrganization: {
      "@type": "CollegeOrUniversity",
      name: "BMS Institute of Technology and Management",
      url: "https://bmsit.ac.in/",
    },
  };

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
        name: "About Us",
        item: "https://motorhead.bmsit.ac.in/about",
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-hidden">
      <StructuredData data={aboutSchema} />
      <StructuredData data={breadcrumbSchema} />
      <AboutHero />
      <OurStorySection />
      <MissionVisionSection />
      <WhatWeDoSection />

      {/* 04 Departments and 05 Achievements side-by-side */}
      <section className="py-24 bg-[#050505] border-b border-white/5 relative">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            <div className="w-full lg:w-1/2">
              <DepartmentsSection />
            </div>
            <div className="w-full lg:w-1/2">
              <AchievementsSection />
            </div>
          </div>
        </div>
      </section>

      {/* 06 Timeline and 07/08 Goals side-by-side */}
      <section className="py-24 bg-[#050505] border-b border-white/5 relative">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            <div className="w-full lg:w-5/12">
              <EventTimelineSection />
            </div>
            <div className="w-full lg:w-7/12 flex flex-col gap-12 pt-2">
              <CurrentGoalsSection />
              <FutureGoalsSection />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
