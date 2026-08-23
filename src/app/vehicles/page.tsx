import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Formula & Prototype Vehicles",
  description:
    "Explore the fleet of high-performance Student Formula racing cars and prototype vehicles designed and manufactured by Motor Head.",
  alternates: { canonical: "/vehicles" },
  openGraph: {
    title: "Student Formula & Prototype Vehicles | Motor Head",
    description:
      "Explore the fleet of high-performance Student Formula racing cars and prototype vehicles designed and manufactured by Motor Head.",
    url: "https://motorhead.bmsit.ac.in/vehicles",
  },
};

export default function VehiclesPage() {
  return (
    <main className="flex-1 w-full bg-background text-foreground pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-heading font-bold uppercase mb-8">
          Our Vehicles
        </h1>
        {/* TODO: Add vehicle components */}
      </div>
    </main>
  );
}
