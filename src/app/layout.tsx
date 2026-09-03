import type { Metadata } from "next";
import { Outfit, Rajdhani } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import ConditionalFooter from "@/components/layout/ConditionalFooter";
import StructuredData from "@/components/seo/StructuredData";
import CarCursor from "@/components/ui/CarCursor";
import AntiInspect from "@/components/security/AntiInspect";
import "@/styles/globals.css";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

const rajdhani = Rajdhani({
  variable: "--font-heading",
  weight: ["500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://motorhead.bmsit.ac.in"),
  title: {
    default: "Motor Head | Automotive Engineering Club | BMSIT&M",
    template: "%s | Motor Head",
  },
  description:
    "Official website for Motor Head, the automotive engineering club of BMS Institute of Technology and Management. Built by Passion, Driven by Engineering.",
  keywords: [
    "automotive",
    "engineering",
    "BMSIT",
    "Motor Head",
    "student club",
    "racing",
    "vehicle design",
    "Formula Student",
    "BMSIT&M",
    "Student Racing Team",
    "Automotive Innovation",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Motor Head | Automotive Engineering Club | BMSIT&M",
    description:
      "Official website for Motor Head, the automotive engineering club of BMS Institute of Technology and Management. Built by Passion, Driven by Engineering.",
    url: "https://motorhead.bmsit.ac.in",
    siteName: "Motor Head",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Motor Head Club Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Motor Head | Automotive Engineering",
    description:
      "Official website for Motor Head, automotive engineering club of BMS Institute of Technology and Management.",
    images: ["/og-image.jpg"], // Placeholder image path
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Motor Head",
    url: "https://motorhead.bmsit.ac.in",
    logo: "https://motorhead.bmsit.ac.in/og-image.jpg",
    description:
      "Automotive Engineering Club of BMS Institute of Technology and Management.",
    parentOrganization: {
      "@type": "CollegeOrUniversity",
      name: "BMS Institute of Technology and Management",
      url: "https://bmsit.ac.in/",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Motor Head",
    url: "https://motorhead.bmsit.ac.in",
  };

  return (
    <html lang="en" className="dark">
      <head>
        <StructuredData data={organizationSchema} />
        <StructuredData data={websiteSchema} />
      </head>
      <body
        className={`${outfit.variable} ${rajdhani.variable} antialiased min-h-screen flex flex-col font-sans`}
      >
        <AntiInspect />
        <CarCursor />
        <Navbar />
        {children}
        <ConditionalFooter />
      </body>
    </html>
  );
}
