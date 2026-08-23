import { Metadata } from "next";
import StructuredData from "@/components/seo/StructuredData";
import EventCountdown from "@/features/events/EventCountdown";

export const metadata: Metadata = {
  title: "Events & Motorsport Competitions | Motor Head",
  description:
    "Stay updated with Motor Head's upcoming and past events, motorsport competitions, vehicle rollouts, and technical workshops.",
  alternates: { canonical: "/events" },
  openGraph: {
    title: "Events & Motorsport Competitions | Motor Head",
    description:
      "Stay updated with Motor Head's upcoming and past events, motorsport competitions, vehicle rollouts, and technical workshops.",
    url: "https://motorhead.bmsit.ac.in/events",
  },
  twitter: {
    card: "summary_large_image",
    title: "Events & Motorsport Competitions | Motor Head",
    description:
      "Stay updated with Motor Head's upcoming events and motorsport competitions.",
  },
};

export default function EventsPage() {
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
        name: "Events",
        item: "https://motorhead.bmsit.ac.in/events",
      },
    ],
  };

  return (
    <main className="flex-1 w-full bg-background text-foreground pt-24 pb-20 px-4">
      <StructuredData data={breadcrumbSchema} />
      <div className="max-w-7xl mx-auto space-y-32">
        <h1 className="text-4xl font-heading font-bold uppercase mb-8">
          Events
        </h1>
        <EventCountdown />
      </div>
    </main>
  );
}
