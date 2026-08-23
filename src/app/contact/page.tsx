import { Metadata } from "next";
import StructuredData from "@/components/seo/StructuredData";
import {
  ContactHero,
  ContactFormSection,
  OfficialEmailSection,
  CampusLocationSection,
  SocialMediaSection,
  FAQSection,
} from "@/features/contact";

export const metadata: Metadata = {
  title: "Contact Us | Motor Head BMSIT&M",
  description:
    "Get in touch with the Motor Head team at BMSIT&M. Reach out for sponsorships, industry collaborations, or membership inquiries.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Us | Motor Head BMSIT&M",
    description:
      "Get in touch with the Motor Head team at BMSIT&M. Reach out for sponsorships, industry collaborations, or membership inquiries.",
    url: "https://motorhead.bmsit.ac.in/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Motor Head BMSIT&M",
    description:
      "Get in touch with the Motor Head team at BMSIT&M. Reach out for sponsorships, industry collaborations, or membership inquiries.",
  },
};

export default function ContactPage() {
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Motor Head",
    description:
      "Contact page for Motor Head automotive engineering club at BMSIT&M.",
    url: "https://motorhead.bmsit.ac.in/contact",
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
        name: "Contact Us",
        item: "https://motorhead.bmsit.ac.in/contact",
      },
    ],
  };

  return (
    <main className="flex-1 w-full bg-background text-foreground pb-20">
      <StructuredData data={contactPageSchema} />
      <StructuredData data={breadcrumbSchema} />
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
