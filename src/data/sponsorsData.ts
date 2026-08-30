export type Partner = {
  name: string;
  category: string;
  /**
   * Path to the logo image, e.g. "/partners/vivitron.png".
   * Drop the file into /public/partners/ and set this field —
   * until then the card falls back to showing the name as text.
   */
  logoSrc?: string;
};

export const partners: Partner[] = [
  { name: "Vivitron Energy", category: "Battery Partner", logoSrc: "/images/partners/vivitron.webp" },
  { name: "Simple Energy", category: "Motor, Controller & Brakes", logoSrc: "/images/partners/simple-energy.webp" },
  { name: "Delhivery", category: "Logistics Partner", logoSrc: "/images/partners/delhivery.webp" },
  { name: "Destinytion", category: "Hospitality Partner", logoSrc: "/images/partners/destinytion.webp" },
  { name: "Caar Seva", category: "Monetary (Tyres)", logoSrc: "/images/partners/caar-seva.webp" },
  { name: "Namaah", category: "Monetary (Kart Floor)", logoSrc: "/images/partners/namaah.webp" },
];

export type SponsorshipTier = {
  badge: string;
  title: string;
  perks: string[];
};

export const sponsorshipTiers: SponsorshipTier[] = [
  {
    badge: "Title",
    title: "Pole Position Partner",
    perks: [
      "Title branding: largest logo on kart nose, sidepods and team kit",
      "Co-branded launch and race-day content across all channels",
      "First access to recruit from the team",
      "Named mention in every press and event release",
    ],
  },
  {
    badge: "Premium",
    title: "Factory Team Affiliate",
    perks: [
      "Prominent logo placement on chassis and team apparel",
      "Featured posts on Instagram and LinkedIn",
      "Team visit / technical session at your facility",
      "Logo on all competition presentation decks",
    ],
  },
  {
    badge: "In-Kind",
    title: "Technical Tier",
    perks: [
      "Components, materials, software or machining support",
      "Technical partner credit on kart and website",
      "Case-study coverage of your product on our vehicle",
    ],
  },
  {
    badge: "Support",
    title: "Pit Crew Contributor",
    perks: [
      "Logo on kart rear panel and team T-shirts",
      "Social media shout-outs through the season",
      "Certificate of partnership and season report",
    ],
  },
  {
    badge: "Entry",
    title: "Performance Partner",
    perks: [
      "Logo on team website and paddock backdrop",
      "Mention in season wrap-up post",
      "Digital certificate of appreciation",
    ],
  },
];
