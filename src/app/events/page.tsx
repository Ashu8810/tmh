import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events & Competitions",
  description:
    "Stay updated with Motor Head's upcoming and past events, motorsport competitions, and technical workshops.",
  alternates: { canonical: "/events" },
  openGraph: {
    title: "Events & Competitions | Motor Head",
    description:
      "Stay updated with Motor Head's upcoming and past events, motorsport competitions, and technical workshops.",
    url: "https://motorhead.bmsit.ac.in/events",
  },
};

export default function EventsPage() {
  return (
    <main className="flex-1 w-full bg-background text-foreground pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-heading font-bold uppercase mb-8">
          Events
        </h1>
        {/* TODO: Add events components */}
      </div>
    </main>
  );
}
