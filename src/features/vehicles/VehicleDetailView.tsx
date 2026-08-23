"use client";

import { Vehicle } from "@/data/vehiclesData";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface VehicleDetailViewProps {
  vehicle: Vehicle;
}

export default function VehicleDetailView({ vehicle }: VehicleDetailViewProps) {
  return (
    <div className="space-y-12">
      {/* Back Button */}
      <Link
        href="/vehicles"
        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
      >
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Back to Vehicles</span>
      </Link>

      {/* Hero Section with Image */}
      {vehicle.image && (
        <div className="relative h-64 md:h-96 rounded-lg overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]">
          <img
            src={vehicle.image}
            alt={vehicle.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </div>
      )}

      {/* Technical Dossier Section */}
      <div className="bg-[#0a0a0a] border border-white/5 rounded-lg overflow-hidden">
        {/* Header */}
        <div className="border-b border-white/5 px-6 md:px-8 py-6 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-mono font-bold uppercase tracking-widest text-muted-foreground mb-2">
                TECHNICAL DOSSIER
              </p>
              {vehicle.category === "combustion-go-kart" && (
                <p className="text-xs md:text-sm font-mono font-bold uppercase tracking-widest text-primary">
                  • COMBUSTION CLASS
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="divide-y divide-white/5">
          {/* Vehicle Type */}
          <div className="px-6 md:px-8 py-6 space-y-3">
            <p className="text-xs md:text-sm font-mono font-bold uppercase tracking-widest text-muted-foreground">
              VEHICLE TYPE
            </p>
            <p className="text-base md:text-lg text-white font-medium">
              {vehicle.description}
            </p>
          </div>

          {/* Powertrain */}
          <div className="px-6 md:px-8 py-6 space-y-3">
            <p className="text-xs md:text-sm font-mono font-bold uppercase tracking-widest text-muted-foreground">
              POWERTRAIN
            </p>
            <p className="text-base md:text-lg text-white font-medium">
              {vehicle.technicalSpecs.powertrain}
            </p>
          </div>

          {/* Top Speed */}
          <div className="px-6 md:px-8 py-6 space-y-3">
            <p className="text-xs md:text-sm font-mono font-bold uppercase tracking-widest text-muted-foreground">
              TOP SPEED
            </p>
            <p className="text-base md:text-lg text-white font-medium">
              {vehicle.technicalSpecs.topSpeed}
            </p>
          </div>

          {/* Year Built */}
          <div className="px-6 md:px-8 py-6 space-y-3">
            <p className="text-xs md:text-sm font-mono font-bold uppercase tracking-widest text-muted-foreground">
              YEAR BUILT
            </p>
            <p className="text-base md:text-lg text-white font-medium">
              {vehicle.yearBuilt}
            </p>
          </div>

          {/* Events Attended */}
          <div className="px-6 md:px-8 py-6 space-y-3">
            <p className="text-xs md:text-sm font-mono font-bold uppercase tracking-widest text-muted-foreground">
              EVENTS ATTENDED
            </p>
            <div className="flex flex-wrap gap-2">
              {vehicle.eventsAttended.map((event, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs md:text-sm font-medium border border-white/10 rounded text-white hover:border-white/20 transition-colors"
                >
                  {event}
                </span>
              ))}
            </div>
          </div>

          {/* Awards Won */}
          <div className="px-6 md:px-8 py-6 space-y-3">
            <p className="text-xs md:text-sm font-mono font-bold uppercase tracking-widest text-muted-foreground">
              AWARDS WON
            </p>
            <p className="text-base md:text-lg text-white font-medium">
              {vehicle.awardsWon.length > 0
                ? vehicle.awardsWon.join(", ")
                : "None specified — first competitive season"}
            </p>
          </div>

          {/* Future Plans */}
          {vehicle.futurePlans && (
            <div className="px-6 md:px-8 py-6 space-y-3">
              <p className="text-xs md:text-sm font-mono font-bold uppercase tracking-widest text-muted-foreground">
                WHAT'S NEXT:
              </p>
              <p className="text-base md:text-lg text-white font-medium">
                {vehicle.futurePlans}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
