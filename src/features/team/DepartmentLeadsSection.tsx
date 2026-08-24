import React from "react";
import { Zap, Wind, Settings, Cog, Wrench, CircleDot } from "lucide-react";

const departments = [
  {
    id: 1,
    name: "Powertrain",
    lead: "Hariharan N.",
    icon: Cog,
  },
  {
    id: 2,
    name: "Chassis",
    lead: "Mohammed Abdul Tazeem",
    icon: Wrench,
  },
  {
    id: 3,
    name: "Suspension",
    lead: "Pranjal Raj",
    icon: CircleDot, // approximating shock absorber
  },
  {
    id: 4,
    name: "Electrical",
    lead: "Mohith M.",
    icon: Zap,
  },
  {
    id: 5,
    name: "Aerodynamics",
    lead: "Nethanya G H",
    icon: Wind,
  },
  {
    id: 6,
    name: "Manufacturing",
    lead: "Samarth M Hulamani",
    icon: Settings,
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
      <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {departments.map((dept) => {
          const IconComponent = dept.icon;
          return (
            <div
              key={dept.id}
              className="flex flex-col items-center justify-center p-6 bg-[#121212] border border-white/5 rounded-xl hover:border-white/10 transition-colors text-center"
            >
              <div className="mb-4 text-primary">
                <IconComponent size={32} strokeWidth={1.5} />
              </div>
              <h3 className="font-heading font-bold text-base mb-1">
                {dept.name}
              </h3>
              <p className="text-muted-foreground text-xs">{dept.lead}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
