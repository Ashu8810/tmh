import { Metadata } from "next";
import StructuredData from "@/components/seo/StructuredData";

export const metadata: Metadata = {
  title: "Student Formula & Prototype Vehicles | Motor Head",
  description:
    "Explore the fleet of high-performance Student Formula racing cars and prototype vehicles designed and manufactured by Motor Head.",
  alternates: { canonical: "/vehicles" },
  openGraph: {
    title: "Student Formula & Prototype Vehicles | Motor Head",
    description:
      "Explore the fleet of high-performance Student Formula racing cars and prototype vehicles designed and manufactured by Motor Head.",
    url: "https://motorhead.bmsit.ac.in/vehicles",
  },
  twitter: {
    card: "summary_large_image",
    title: "Student Formula & Prototype Vehicles | Motor Head",
    description:
      "Explore the fleet of high-performance Student Formula racing cars and prototype vehicles.",
  },
};

export default function VehiclesPage() {
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
        name: "Vehicles",
        item: "https://motorhead.bmsit.ac.in/vehicles",
      },
    ],
  };

  return (
    <main className="flex-1 w-full bg-background text-foreground pt-24 pb-20 px-4">
      <StructuredData data={breadcrumbSchema} />
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-heading font-bold uppercase mb-8">
          Our Vehicles
        </h1>
        {/* TODO: Add vehicle components */}
      </div>
    </main>
  );
}
