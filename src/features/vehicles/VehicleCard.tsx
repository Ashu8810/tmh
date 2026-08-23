"use client";

import { Vehicle } from "@/data/vehiclesData";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface VehicleCardProps {
  vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <Link href={`/vehicles/${vehicle.id}`}>
      <div className="group h-full cursor-pointer">
        <div className="relative overflow-hidden rounded-lg bg-[#0a0a0a] border border-white/5 hover:border-primary/30 transition-all duration-300 h-full flex flex-col">
          {/* Image Section */}
          <div className="relative h-48 md:h-56 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] overflow-hidden flex items-center justify-center">
            {vehicle.image ? (
              <img
                src={vehicle.image}
                alt={vehicle.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <div className="text-center text-muted-foreground text-sm">
                Vehicle Image Coming Soon
              </div>
            )}
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          {/* Content Section */}
          <div className="flex flex-col flex-1 p-6 space-y-4">
            {/* Category Badge */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest text-primary">
                {vehicle.category === "campus-vehicle"
                  ? "Campus Vehicle"
                  : vehicle.category === "electric-go-kart"
                    ? "Electric Go-Kart"
                    : "Combustion Go-Kart"}
              </span>
            </div>

            {/* Title and Year */}
            <div>
              <h3 className="font-heading text-lg md:text-xl font-bold text-white group-hover:text-primary transition-colors duration-300">
                {vehicle.name}
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">
                Year Built: {vehicle.yearBuilt}
              </p>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground line-clamp-2 group-hover:line-clamp-none transition-all">
              {vehicle.description}
            </p>

            {/* Key Specs */}
            <div className="space-y-2 text-xs text-muted-foreground">
              <div>
                <span className="font-semibold text-white">Top Speed:</span>{" "}
                {vehicle.technicalSpecs.topSpeed}
              </div>
              <div>
                <span className="font-semibold text-white">Powertrain:</span>{" "}
                <span className="line-clamp-1">
                  {vehicle.technicalSpecs.powertrain}
                </span>
              </div>
            </div>

            {/* Events and Awards */}
            <div className="space-y-2 text-xs text-muted-foreground flex-1">
              {vehicle.eventsAttended.length > 0 && (
                <div>
                  <span className="font-semibold text-white">Events:</span>{" "}
                  {vehicle.eventsAttended.join(", ")}
                </div>
              )}
              {vehicle.awardsWon.length > 0 && (
                <div>
                  <span className="font-semibold text-white">Awards:</span>{" "}
                  {vehicle.awardsWon.join(", ")}
                </div>
              )}
            </div>

            {/* Learn More Link */}
            <div className="flex items-center gap-2 text-primary font-medium text-sm pt-4 border-t border-white/5 group-hover:text-primary/80 transition-colors">
              <span>Learn More</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
