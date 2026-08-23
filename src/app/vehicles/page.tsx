import { Metadata } from "next";
import StructuredData from "@/components/seo/StructuredData";
import VehiclesGrid from "@/features/vehicles/VehiclesGrid";

export const metadata: Metadata = {
  title: "Student Formula & Prototype Vehicles | Motor Head",
  description:
    "Explore the fleet of high-performance Student Formula racing cars, electric go-karts, and campus vehicles designed and manufactured by Motor Head.",
  alternates: { canonical: "/vehicles" },
  openGraph: {
    title: "Student Formula & Prototype Vehicles | Motor Head",
    description:
      "Explore the fleet of high-performance Student Formula racing cars, electric go-karts, and campus vehicles designed and manufactured by Motor Head.",
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
      <div className="max-w-7xl mx-auto space-y-12">
        <div>
          <span className="text-primary font-mono text-xs font-bold uppercase tracking-widest block mb-2">
            ENGINEERING EXCELLENCE
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-black uppercase tracking-tight">
            Our Vehicles
          </h1>
          <p className="mt-3 text-muted-foreground max-w-2xl text-sm md:text-base">
            From electric campus shuttles to high-performance competition
            go-karts, explore our engineering milestones.
          </p>
        </div>
        <VehiclesGrid />
      </div>
    </main>
  );
}
