export interface Vehicle {
  id: string;
  name: string;
  yearBuilt: number;
  category: "campus-vehicle" | "electric-go-kart" | "combustion-go-kart";
  description: string;
  technicalSpecs: {
    powertrain: string;
    topSpeed: string;
    motor?: string;
    battery?: string;
    engine?: string;
  };
  eventsAttended: string[];
  awardsWon: string[];
  futurePlans?: string;
  image?: string;
}

export const vehicles: Vehicle[] = [
  {
    id: "perry",
    name: "Perry",
    yearBuilt: 2025,
    category: "campus-vehicle",
    description:
      "Electric 6-seater designed as a campus vehicle for college transportation",
    technicalSpecs: {
      powertrain:
        "2 batteries feeding a 6kW nominal motor, connected to a single-speed gearbox",
      topSpeed: "20 km/h",
      motor: "6kW nominal motor",
      battery: "2 batteries",
    },
    eventsAttended: ["SEVC 2025"],
    awardsWon: ["Best Design Award"],
    image: "/images/vehicles/WhatsApp Image 2026-08-27 at 13.14.14.webp",
  },
  {
    id: "unnamed-electric-go-kart",
    name: "EV Go-Kart",
    yearBuilt: 2026,
    category: "electric-go-kart",
    description:
      "Electric go-kart built specifically to compete in go-kart design competitions",
    technicalSpecs: {
      powertrain:
        "48V Vivtron-sponsored battery driving a 4.5kW nominal motor (sponsored by Simple Energy), run on Simple Energy's controller",
      topSpeed: "80 km/h",
      battery: "48V Vivtron battery",
      motor: "4.5kW nominal motor (Simple Energy)",
    },
    eventsAttended: ["EKVC 2026", "GKDC 2026"],
    awardsWon: ["Best Cost Report Award (built within budget)"],
    futurePlans: "Set to participate in further events in 2027",
    image: "/images/vehicles/WhatsApp Image 2026-08-27 at 12.46.47.webp",
  },
  {
    id: "cv-go-kart",
    name: "CV Go-Kart",
    yearBuilt: 2026,
    category: "combustion-go-kart",
    description:
      "Conventional (combustion) go-kart built specifically to compete in go-kart design competitions",
    technicalSpecs: {
      powertrain: "R15 V2 engine — 150cc; top speed of 80 km/h",
      topSpeed: "80 km/h",
      engine: "R15 V2 engine — 150cc",
    },
    eventsAttended: ["EKVC 2026", "GKDC 2026"],
    awardsWon: ["None specified — first competitive season"],
    futurePlans: "Set to participate in further events in 2027",
    image: "/images/vehicles/WhatsApp Image 2026-08-27 at 13.10.37.webp",
  },
];
