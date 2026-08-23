import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the Motor Head team at BMSIT&M. Reach out for sponsorships, collaborations, or membership inquiries.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Us | Motor Head",
    description:
      "Get in touch with the Motor Head team at BMSIT&M. Reach out for sponsorships, collaborations, or membership inquiries.",
    url: "https://motorhead.bmsit.ac.in/contact",
  },
};

import {
  ContactHero,
  ContactFormSection,
  OfficialEmailSection,
  CampusLocationSection,
  SocialMediaSection,
  FAQSection,
} from "@/features/contact";

export default function ContactPage() {
  return (
    <main className="flex-1 w-full bg-background text-foreground pb-20">
      <ContactHero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <ContactFormSection />
        <OfficialEmailSection />
        <CampusLocationSection />
        <SocialMediaSection />
        <FAQSection />
      </div>
    </main>
  );
}
