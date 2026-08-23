import { Metadata } from "next";
import TeamHero from "@/features/team/TeamHero";
import FacultyCoordinatorsSection from "@/features/team/FacultyCoordinatorsSection";
import ClubLeadershipSection from "@/features/team/ClubLeadershipSection";
import DepartmentLeadsSection from "@/features/team/DepartmentLeadsSection";
import CurrentMembersSection from "@/features/team/CurrentMembersSection";
import AlumniSection from "@/features/team/AlumniSection";
import JoinMotorHeadCTA from "@/features/team/JoinMotorHeadCTA";
import StructuredData from "@/components/seo/StructuredData";

export const metadata: Metadata = {
  title: "Meet the Team | Student Engineers & Leadership",
  description:
    "Meet the dedicated student engineers, department leads, faculty coordinators, and alumni behind Motor Head's high-performance racing vehicles.",
  alternates: { canonical: "/team" },
  openGraph: {
    title: "Meet the Team | Student Engineers & Leadership | Motor Head",
    description:
      "Meet the dedicated student engineers, department leads, faculty coordinators, and alumni behind Motor Head's high-performance racing vehicles.",
    url: "https://motorhead.bmsit.ac.in/team",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meet the Team | Motor Head",
    description:
      "Meet the dedicated student engineers, department leads, faculty coordinators, and alumni behind Motor Head.",
  },
};

export default function TeamPage() {
  const teamSchema = {
    "@context": "https://schema.org",
    "@type": "SportsTeam",
    name: "Motor Head Racing Team",
    sport: "Automotive Motorsport & Engineering",
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
        name: "Team Roster",
        item: "https://motorhead.bmsit.ac.in/team",
      },
    ],
  };

  return (
    <main className="flex-1 w-full bg-background text-foreground pb-20">
      <StructuredData data={teamSchema} />
      <StructuredData data={breadcrumbSchema} />
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
