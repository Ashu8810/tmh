import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sponsor Motor Head | Industry Partnerships",
  description:
    "Partner with Motor Head to support student automotive engineering. Explore sponsorship opportunities, technical collaborations, and brand visibility.",
  alternates: { canonical: "/support-us" },
  openGraph: {
    title: "Sponsor Motor Head | Industry Partnerships",
    description:
      "Partner with Motor Head to support student automotive engineering. Explore sponsorship opportunities, technical collaborations, and brand visibility.",
    url: "https://motorhead.bmsit.ac.in/support-us",
  },
};

export default function SupportUsPage() {
  return (
    <main className="flex-1 w-full bg-background text-foreground pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-heading font-bold uppercase mb-8">
          Support Us
        </h1>
        {/* TODO: Add sponsor components */}
      </div>
    </main>
  );
}
