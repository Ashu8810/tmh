import { Metadata } from "next";

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
    <main className="flex-1 w-full">
      <h1 className="sr-only">
        Motor Head | Automotive Engineering Club at BMSIT&M
      </h1>
      {/* Intentionally blank space as requested */}
    </main>
  );
}
