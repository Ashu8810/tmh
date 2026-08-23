import { Metadata } from "next";
import StructuredData from "@/components/seo/StructuredData";
import ResourcesClient from "./ResourcesClient";

export const metadata: Metadata = {
  title: "Technical Resources & Subsystem Documentation | Motor Head",
  description:
    "Access technical resources, 3D CAD schematics, rulebooks, subsystem documentation, and branding assets from Motor Head.",
  alternates: { canonical: "/resources" },
  openGraph: {
    title: "Technical Resources & Subsystem Documentation | Motor Head",
    description:
      "Access technical resources, 3D CAD schematics, rulebooks, subsystem documentation, and branding assets from Motor Head.",
    url: "https://motorhead.bmsit.ac.in/resources",
  },
  twitter: {
    card: "summary_large_image",
    title: "Technical Resources | Motor Head",
    description:
      "Access technical resources, 3D CAD schematics, and subsystem documentation.",
  },
};

export default function ResourcesPage() {
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
        name: "Technical Resources",
        item: "https://motorhead.bmsit.ac.in/resources",
      },
    ],
  };

  return (
    <main className="flex-1 w-full bg-[#030303] text-white min-h-screen font-sans overflow-x-hidden pt-24 pb-20 relative selection:bg-[#D71920] selection:text-white">
      <StructuredData data={breadcrumbSchema} />
      <ResourcesClient />
    </main>
  );
}
