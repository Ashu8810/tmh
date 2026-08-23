import { Metadata } from "next";
import StructuredData from "@/components/seo/StructuredData";

export const metadata: Metadata = {
  title: "Sponsor Motor Head | Industry Partnerships & Sponsorship",
  description:
    "Partner with Motor Head to support student automotive engineering. Explore sponsorship opportunities, technical collaborations, and brand visibility.",
  alternates: { canonical: "/support-us" },
  openGraph: {
    title: "Sponsor Motor Head | Industry Partnerships & Sponsorship",
    description:
      "Partner with Motor Head to support student automotive engineering. Explore sponsorship opportunities, technical collaborations, and brand visibility.",
    url: "https://motorhead.bmsit.ac.in/support-us",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sponsor Motor Head | Industry Partnerships",
    description:
      "Partner with Motor Head to support student automotive engineering.",
  },
};

export default function SupportUsPage() {
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
        name: "Support Us",
        item: "https://motorhead.bmsit.ac.in/support-us",
      },
    ],
  };

  return (
    <main className="flex-1 w-full bg-background text-foreground pt-24 pb-20 px-4">
      <StructuredData data={breadcrumbSchema} />
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-heading font-bold uppercase mb-8">
          Support Us
        </h1>
        {/* TODO: Add sponsor components */}
      </div>
    </main>
  );
}
