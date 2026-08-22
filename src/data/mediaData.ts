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

export const mediaItems: MediaEvent[] = [
  {
    id: "endurance-test-01",
    title: "Endurance Test 01",
    category: "TRACK DAYS",
    coverImage: "https://images.unsplash.com/photo-1532980400857-e8d9d275d858?q=80&w=800",
    className: "md:col-span-2 md:row-span-2",
    description: "Pushing the chassis to its absolute limits during our mid-season endurance trials. The heat, the stress, the pure performance.",
    gallery: [
      { type: "image", url: "https://images.unsplash.com/photo-1532980400857-e8d9d275d858?q=80&w=1200", alt: "Endurance run" },
      { type: "image", url: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=1200", alt: "Aerodynamics during test" },
      { type: "image", url: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=1200", alt: "Pit crew in action" },
    ]
  },
  {
    id: "chassis-welding",
    title: "Chassis Welding",
    category: "THE GARAGE",
    coverImage: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=800",
    className: "md:col-span-1 md:row-span-1",
    description: "Sparks flying late into the night. Our fabrication team putting the final welds on the spaceframe chassis.",
    gallery: [
      { type: "image", url: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200", alt: "Welding spark" },
      { type: "image", url: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1200", alt: "Car at rest in garage" },
    ]
  },
  {
    id: "formula-student-uk",
    title: "Formula Student UK",
    category: "EVENTS",
    coverImage: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=800",
    className: "md:col-span-1 md:row-span-1",
    description: "Competing against the best in the world at Silverstone. An unforgettable week of tech inspections, sprints, and endurance.",
    gallery: [
      { type: "image", url: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1200", alt: "FSUK Event" },
      { type: "image", url: "https://images.unsplash.com/photo-1503376710349-8c88680199e4?q=80&w=1200", alt: "Team lineup" },
      { type: "image", url: "https://images.unsplash.com/photo-1532980400857-e8d9d275d858?q=80&w=1200", alt: "Car on track" },
      { type: "image", url: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200", alt: "Cornering hard" },
    ]
  },
  {
    id: "aerodynamics-sim",
    title: "Aerodynamics Sim",
    category: "THE GARAGE",
    coverImage: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=800",
    className: "md:col-span-1 md:row-span-2",
    description: "Validating our CFD models with real-world wind tunnel data. Downforce is everything.",
    gallery: [
      { type: "image", url: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=1200", alt: "Wind tunnel" },
      { type: "image", url: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200", alt: "Data analysis" },
    ]
  },
  {
    id: "pit-stop-drill",
    title: "Pit Stop Drill",
    category: "TRACK DAYS",
    coverImage: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=800",
    className: "md:col-span-2 md:row-span-1",
    description: "Milliseconds matter. Practicing tire changes and driver swaps until it becomes muscle memory.",
    gallery: [
      { type: "image", url: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=1200", alt: "Pit crew drill" },
      { type: "image", url: "https://images.unsplash.com/photo-1532980400857-e8d9d275d858?q=80&w=1200", alt: "Driver swap" },
    ]
  },
  {
    id: "team-reveal-2023",
    title: "Team Reveal 2023",
    category: "EVENTS",
    coverImage: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800",
    className: "md:col-span-1 md:row-span-1",
    description: "Unveiling the new beast to our sponsors, alumni, and the university. A proud moment for the entire crew.",
    gallery: [
      { type: "image", url: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200", alt: "The big reveal" },
      { type: "image", url: "https://images.unsplash.com/photo-1503376710349-8c88680199e4?q=80&w=1200", alt: "Crowd reaction" },
      { type: "image", url: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200", alt: "Close up of the car" },
    ]
  },
];
