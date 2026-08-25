import Image from "next/image";
import { partners } from "@/data/sponsorsData";

export default function PartnersSection() {
  return (
    <section className="py-24 bg-[#050505] border-b border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="mb-12">
          <span className="font-mono text-[#D71920] text-xl block mb-2 font-bold tracking-widest">
            OUR PARTNERS
          </span>
          <h2 className="font-heading text-3xl font-bold text-white uppercase tracking-tight">
            Backed by Industry Leaders
          </h2>
        </div>

        {/* Partner Logo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="p-6 bg-[#0a0a0a] rounded border border-white/10 relative group flex flex-col items-center text-center gap-4"
            >
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#D71920] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="w-full aspect-square flex items-center justify-center bg-[#121212] rounded border border-white/10 p-4">
                {partner.logoSrc ? (
                  <Image
                    src={partner.logoSrc}
                    alt={`${partner.name} logo`}
                    width={120}
                    height={120}
                    className="object-contain w-full h-full grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                ) : (
                  <span className="font-heading text-xs font-bold uppercase text-white/70 tracking-wide">
                    {partner.name}
                  </span>
                )}
              </div>

              <div>
                <p className="font-heading text-xs font-bold uppercase text-white tracking-widest">
                  {partner.name}
                </p>
                <p className="text-xs text-muted-foreground font-medium mt-1">
                  {partner.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
