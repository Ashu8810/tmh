"use client";

import React from "react";
import {
  Wrench,
  Cog,
  Car,
  Disc,
  Users,
  Camera,
  CircleDot,
} from "lucide-react";

const departments = [
  {
    id: 1,
    name: "Chassis",
    lead: "Mohith",
    image: "/images/members/mohith.jpg",
    icon: Wrench,
    members: ["Mohith", "Aatif", "Santosh"],
  },
  {
    id: 2,
    name: "Powertrain",
    lead: "Pranjal",
    image: "/images/members/pranjal.jpg",
    icon: Cog,
    members: ["Pranjal", "Athikesh", "Pranay"],
  },
  {
    id: 3,
    name: "Body Works",
    lead: "Karthik",
    image: "/images/members/karthik.jpg",
    icon: Car,
    members: ["Karthik", "Sonu"],
  },
  {
    id: 4,
    name: "Steering",
    lead: "Hariharan",
    image: "/images/members/hariharan.jpg",
    icon: CircleDot,
    members: ["Hariharan", "Srujan"],
  },
  {
    id: 5,
    name: "Brakes",
    lead: "Aaron",
    image: "/images/members/aaron.jpg",
    icon: Disc,
    members: ["Aaron", "Srikant", "Kusal"],
  },
  {
    id: 6,
    name: "Management",
    lead: "Vivek",
    image: "/images/members/vivek.jpg",
    icon: Users,
    members: ["Vivek", "Hamsashree", "Sharanya"],
  },
  {
    id: 7,
    name: "Media",
    lead: "Arjun",
    image: "/images/members/arjun.jpg",
    icon: Camera,
    members: ["Arjun", "Saksham"],
  },
];

export default function DepartmentLeadsSection() {
  return (
    <section className="flex flex-col lg:flex-row gap-12 lg:gap-24 w-full">
      {/* Section Header */}
      <div className="lg:w-1/3 flex flex-col pt-4">
        <span className="text-primary font-heading text-2xl font-bold mb-2">
          03
        </span>
        <h2 className="text-3xl font-heading font-bold uppercase tracking-wider mb-6">
          Department Leads
        </h2>
        <div className="w-12 h-1 bg-white/10 mb-6" />
        <p className="text-muted-foreground">
          Heading core departments with dedication and responsibility.
        </p>
      </div>

      {/* Cards */}
      <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {departments.map((dept) => {
          const IconComponent = dept.icon;
          return (
            <div
              key={dept.id}
              className="flex flex-col bg-[#121212] border border-white/5 rounded-xl overflow-hidden hover:border-white/10 transition-colors"
            >
              {/* Image Wrapper */}
              <div className="relative aspect-[4/5] bg-neutral-900 w-full">
                <img
                  src={dept.image}
                  alt={dept.lead}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      dept.lead
                    )}&background=202020&color=fff&size=400`;
                  }}
                />
                <div className="absolute top-3 left-3 p-1.5 bg-background/80 backdrop-blur-sm rounded-md border border-white/10 text-primary">
                  <IconComponent size={18} />
                </div>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col">
                <h3 className="font-heading font-bold text-base uppercase tracking-wider mb-0.5">
                  {dept.name}
                </h3>
                <p className="text-primary text-xs font-semibold uppercase tracking-wider mb-3">
                  Lead: {dept.lead}
                </p>

                {/* Team Members List */}
                <div className="border-t border-white/5 pt-2 mt-auto">
                  <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider block mb-1.5">
                    Team
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {dept.members.map((member) => (
                      <span
                        key={member}
                        className="text-[11px] bg-white/5 text-neutral-300 px-2 py-0.5 rounded border border-white/5"
                      >
                        {member}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
