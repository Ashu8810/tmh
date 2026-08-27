export type Category = "ALL" | "TRACK DAYS" | "THE GARAGE" | "EVENTS";

export interface GalleryItem {
  type: "image" | "video";
  url: string;
  alt: string;
}

export interface MediaEvent {
  id: string;
  title: string;
  category: Category;
  coverImage: string;
  className: string;
  description: string;
  gallery: GalleryItem[];
}

// ---------------------------------------------------------------------------
// Folder Image Exports
// ---------------------------------------------------------------------------

export const teamGalleryImages: string[] = [
  "/images/team_gallery/20250801_141306.webp",
  "/images/team_gallery/20250829_202626.webp",
  "/images/team_gallery/c9jptompl7cea4o1jz9d.webp",
  "/images/team_gallery/e9k0oa3rycvhxxmt4kq2.webp",
  "/images/team_gallery/IMG-20250318-WA0072.webp",
  "/images/team_gallery/IMG-20250318-WA0114.webp",
  "/images/team_gallery/IMG-20250320-WA0009.webp",
  "/images/team_gallery/IMG-20250320-WA0034.webp",
  "/images/team_gallery/IMG-20250824-WA0011.webp",
  "/images/team_gallery/IMG-20260224-WA0198.webp",
  "/images/team_gallery/skiztbfwgdplttv93zdm.webp",
];

export const event26Images: string[] = [
  "/images/event_26/0ffbc690-7532-4115-b7d6-425d60a92aa6.webp",
  "/images/event_26/6366abb3-ca8f-4d30-99a4-ae492b2fb45d.webp",
  "/images/event_26/68f65481-8fe6-432e-b796-6f6894e597ce.webp",
  "/images/event_26/IMG_1546.webp",
  "/images/event_26/IMG_1597 (1).webp",
  "/images/event_26/IMG_2641.webp",
  "/images/event_26/IMG_7853.webp",
  "/images/event_26/IMG_7899.webp",
  "/images/event_26/IMG_8007.webp",
];

export const sevc25Images: string[] = [
  "/images/sevc25/IMG-20250317-WA0012.webp",
  "/images/sevc25/IMG-20250317-WA0049.webp",
  "/images/sevc25/IMG-20250318-WA0002.webp",
  "/images/sevc25/IMG-20250318-WA0008.webp",
  "/images/sevc25/IMG-20250318-WA0036.webp",
  "/images/sevc25/IMG-20250320-WA0056.webp",
];

export const ikr23Images: string[] = [
  "/images/ikr23/IMG-20250703-WA0043.webp",
  "/images/ikr23/IMG-20250703-WA0047.webp",
  "/images/ikr23/IMG-20250703-WA0101.webp",
  "/images/ikr23/IMG-20250703-WA0106.webp",
  "/images/ikr23/Screenshot_20260826_191511_Instagram.webp",
  "/images/ikr23/Screenshot_20260826_191517_Instagram.webp",
  "/images/ikr23/Screenshot_20260826_191524_Instagram.webp",
];

// Map of folder names to their image paths
export const mediaFolders = {
  team_gallery: teamGalleryImages,
  event_26: event26Images,
  sevc25: sevc25Images,
  ikr23: ikr23Images,
};

// ---------------------------------------------------------------------------
// Gallery Items by Folder
// ---------------------------------------------------------------------------

const teamGalleryItems: GalleryItem[] = teamGalleryImages.map((url, i) => ({
  type: "image",
  url,
  alt: `Motor Head Team & Workshop photo ${i + 1}`,
}));

const event26GalleryItems: GalleryItem[] = event26Images.map((url, i) => ({
  type: "image",
  url,
  alt: `Season 2026 Event & Track highlight ${i + 1}`,
}));

const sevc25GalleryItems: GalleryItem[] = sevc25Images.map((url, i) => ({
  type: "image",
  url,
  alt: `SEVC 2025 Competition highlight ${i + 1}`,
}));

const ikr23GalleryItems: GalleryItem[] = ikr23Images.map((url, i) => ({
  type: "image",
  url,
  alt: `IKR 2023 Buddh International Circuit highlight ${i + 1}`,
}));

// ---------------------------------------------------------------------------
// Structured Media Events (Used in /media and /media/[id])
// ---------------------------------------------------------------------------

export const mediaItems: MediaEvent[] = [
  {
    id: "event-26",
    title: "EVENTS-2026",
    category: "EVENTS",
    coverImage: "/images/event_26/68f65481-8fe6-432e-b796-6f6894e597ce.webp",
    className: "md:col-span-2 md:row-span-2",
    description:
      "Action from the 2026 national competition season: rigorous technical inspection, paddock setup, high-speed dynamic trials, and pit lane collaboration.",
    gallery: event26GalleryItems,
  },
  {
    id: "sevc-2025",
    title: "SEVC 2025",
    category: "TRACK DAYS",
    coverImage: "/images/sevc25/IMG-20250317-WA0012.webp",
    className: "md:col-span-1 md:row-span-1",
    description:
      "Taking on the Student Electric Vehicle Challenge at Kari Motor Speedway, clinching the Best Design Award and demonstrating exceptional powertrain efficiency.",
    gallery: sevc25GalleryItems,
  },
  {
    id: "ikr-2023",
    title: "IKR 2023",
    category: "EVENTS",
    coverImage: "/images/ikr23/IMG-20250703-WA0101.webp",
    className: "md:col-span-1 md:row-span-1",
    description:
      "Pushing vehicle dynamics and driver limits at the world-class Buddh International Circuit during the Indian Karting Race 2023.",
    gallery: ikr23GalleryItems,
  },
  {
    id: "team-garage",
    title: "The Garage & Fabrication Crew",
    category: "THE GARAGE",
    coverImage: "/images/team_gallery/IMG-20250318-WA0072.webp",
    className: "md:col-span-2 md:row-span-1",
    description:
      "Late nights in the workshop: chassis welding, precision telemetry diagnostics, battery pack testing, and the relentless camaraderie that builds our racecars.",
    gallery: teamGalleryItems,
  },
  {
    id: "track-testing-26",
    title: "Track Trials & Dynamic Telemetry",
    category: "TRACK DAYS",
    coverImage: "/images/event_26/6366abb3-ca8f-4d30-99a4-ae492b2fb45d.webp",
    className: "md:col-span-1 md:row-span-1",
    description:
      "Putting our race vehicles through rigorous cornering, acceleration runs, and regenerative braking validation under track conditions.",
    gallery: event26GalleryItems.slice(0, 6),
  },
  {
    id: "crew-operations",
    title: "Pit Crew",
    category: "THE GARAGE",
    coverImage: "/images/event_26/IMG_1546.webp",
    className: "md:col-span-1 md:row-span-1",
    description:
      "The engineering mindsets behind Motor Head: assembly stages, driver fittings, and milestone celebrations throughout the build cycle.",
    gallery: event26GalleryItems.slice(0, 6),
  },
];
