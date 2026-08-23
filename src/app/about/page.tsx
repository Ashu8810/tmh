import { Metadata } from "next";
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
  DownloadClubProfileCTA,
} from "@/features/about";

export const metadata: Metadata = {
  title: "About Motor Head",
  description:
    "Learn about Motor Head, the student automotive engineering club at BMSIT. Discover our story, mission, and achievements in vehicle design.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Motor Head | BMSIT&M Automotive Engineering Club",
    description:
      "Learn about Motor Head, the student automotive engineering club at BMSIT. Discover our story, mission, and achievements in vehicle design.",
    url: "https://motorhead.bmsit.ac.in/about",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-hidden">
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

      <DownloadClubProfileCTA />
    </main>
  );
}
