import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Motor Head | Automotive Engineering Club | BMSIT&M",
  description:
    "Official website for Motor Head, the automotive engineering club of BMS Institute of Technology and Management. Built by Passion, Driven by Engineering.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Motor Head | Automotive Engineering Club | BMSIT&M",
    description:
      "Official website for Motor Head, the automotive engineering club of BMS Institute of Technology and Management.",
    url: "https://motorhead.bmsit.ac.in/",
  },
};

export default function Home() {
  return (
    <main className="flex-1 w-full bg-[#050505] text-white min-h-screen font-sans overflow-x-hidden pt-24 pb-20 relative selection:bg-[#D71920] selection:text-white">
      <h1 className="sr-only">Motor Head | Automotive Engineering Club at BMSIT&M</h1>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 relative z-10 mt-10 md:mt-2 lg:-mt-4">
        <div className="w-full relative h-[400px] md:h-[600px]">
          <Image
            src="/images/Tmh_home_section.webp"
            alt="Motor Head Home Section"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>
    </main>
  );
}
