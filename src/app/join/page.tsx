import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import StructuredData from "@/components/seo/StructuredData";

export const metadata: Metadata = {
  title: "Join Motor Head | Student Application & Recruitment",
  description:
    "Apply to join Motor Head, the student automotive engineering club at BMSIT&M. Build racing cars, gain hands-on engineering experience, and join our team.",
  alternates: { canonical: "/join" },
  openGraph: {
    title: "Join Motor Head | Student Application & Recruitment",
    description:
      "Apply to join Motor Head, the student automotive engineering club at BMSIT&M. Build racing cars and gain hands-on engineering experience.",
    url: "https://motorhead.bmsit.ac.in/join",
  },
};

export default function JoinPage() {
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
        name: "Join Us",
        item: "https://motorhead.bmsit.ac.in/join",
      },
    ],
  };

  return (
    <main className="flex-1 w-full bg-[#050505] text-white pt-24 pb-20 px-4 min-h-screen">
      <StructuredData data={breadcrumbSchema} />
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-[#D71920] font-heading font-bold text-sm tracking-[0.2em] uppercase mb-4 block">
          Recruitment & Membership
        </span>
        <h1 className="text-4xl md:text-6xl font-heading font-black uppercase tracking-tight mb-6">
          Join Motor Head
        </h1>
        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          We are looking for passionate students eager to design, fabricate, and
          test high-performance automotive systems.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#D71920] text-white rounded-md font-bold uppercase tracking-wider hover:bg-red-700 transition-colors"
          >
            Contact Team & Apply <ArrowRight size={18} />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white rounded-md font-bold uppercase tracking-wider hover:bg-white/5 transition-colors"
          >
            Learn About Our Subsystems <Users size={18} />
          </Link>
        </div>
      </div>
    </main>
  );
}
