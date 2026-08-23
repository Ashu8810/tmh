import { Metadata } from "next";
import StructuredData from "@/components/seo/StructuredData";
import MediaGalleryClient from "./MediaGalleryClient";

export const metadata: Metadata = {
  title: "Media Gallery & Track Day Photo Highlights",
  description:
    "Explore photo and video highlights of Motor Head's vehicle testing, track days, garage fabrication, and Formula Student competition events.",
  alternates: { canonical: "/media" },
  openGraph: {
    title: "Media Gallery & Track Day Photo Highlights | Motor Head",
    description:
      "Explore photo and video highlights of Motor Head's vehicle testing, track days, garage fabrication, and Formula Student competition events.",
    url: "https://motorhead.bmsit.ac.in/media",
  },
};

export default function MediaPage() {
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
        name: "Media Gallery",
        item: "https://motorhead.bmsit.ac.in/media",
      },
    ],
  };

  return (
    <main className="flex-1 w-full bg-[#050505] text-white min-h-screen font-sans overflow-x-hidden">
      <StructuredData data={breadcrumbSchema} />

      {/* Hero Section */}
      <section className="relative w-full h-[40vh] md:h-[50vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden">
        {/* Background Gradient & Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/20 via-[#050505]/60 to-[#050505] z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent z-10" />
          <img
            src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1920"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
          />
        </div>

        <div className="relative z-20 mt-16 md:mt-20">
          <p className="text-[#D71920] font-heading font-bold text-xs md:text-sm tracking-[0.2em] uppercase mb-4">
            The Gallery
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black uppercase tracking-tighter text-white drop-shadow-lg">
            Raw Speed.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D71920] to-red-600">
              Captured.
            </span>
          </h1>
        </div>
      </section>

      <MediaGalleryClient />
    </main>
  );
}
