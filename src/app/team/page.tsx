import { Metadata } from "next";
import TeamHero from "@/features/team/TeamHero";
import FacultyCoordinatorsSection from "@/features/team/FacultyCoordinatorsSection";
import ClubLeadershipSection from "@/features/team/ClubLeadershipSection";
import DepartmentLeadsSection from "@/features/team/DepartmentLeadsSection";
import CurrentMembersSection from "@/features/team/CurrentMembersSection";
import AlumniSection from "@/features/team/AlumniSection";
import JoinMotorHeadCTA from "@/features/team/JoinMotorHeadCTA";

export const metadata: Metadata = {
  title: "Meet the Team",
  description:
    "Meet the dedicated student engineers, designers, and innovators behind Motor Head's high-performance vehicles.",
  alternates: { canonical: "/team" },
  openGraph: {
    title: "Meet the Team | Motor Head",
    description:
      "Meet the dedicated student engineers, designers, and innovators behind Motor Head's high-performance vehicles.",
    url: "https://motorhead.bmsit.ac.in/team",
  },
};

export default function TeamPage() {
  return (
    <main className="flex-1 w-full bg-background text-foreground pb-20">
      <TeamHero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32 py-16">
        <FacultyCoordinatorsSection />
        <ClubLeadershipSection />
        <DepartmentLeadsSection />
        <CurrentMembersSection />
        <AlumniSection />
        <JoinMotorHeadCTA />
      </div>
    </main>
  );
}
