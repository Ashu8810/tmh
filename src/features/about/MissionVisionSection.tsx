import { Target, Eye } from "lucide-react";

export default function MissionVisionSection() {
  return (
    <section className="py-24 bg-[#050505] border-b border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="mb-12">
          <span className="font-mono text-[#D71920] text-xl block mb-2 font-bold tracking-widest">
            02
          </span>
          <h2 className="font-heading text-3xl font-bold text-white uppercase tracking-tight">
            MISSION & VISION
          </h2>
        </div>

        {/* 3-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Mission Card (1/4 width on desktop) */}
          <div className="lg:col-span-3 p-8 bg-[#0a0a0a] rounded border border-white/10 relative group h-full flex flex-col">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#D71920] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

            <div className="flex items-center gap-4 mb-6">
              <div className="p-2 border border-white/10 rounded bg-[#121212]">
                <Target className="w-6 h-6 text-[#D71920]" strokeWidth={1.5} />
              </div>
              <h3 className="font-heading text-sm font-bold uppercase text-white tracking-widest">
                Mission
              </h3>
            </div>

            <p className="text-xs md:text-sm text-muted-foreground font-medium leading-relaxed flex-1">
              To foster innovation and practical learning in the field of
              automotive engineering through teamwork, discipline and a
              relentless drive to compete and win.
            </p>
          </div>

          {/* Vision Card (1/4 width on desktop) */}
          <div className="lg:col-span-3 p-8 bg-[#0a0a0a] rounded border border-white/10 relative group h-full flex flex-col">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

            <div className="flex items-center gap-4 mb-6">
              <div className="p-2 border border-white/10 rounded bg-[#121212]">
                <Eye className="w-6 h-6 text-[#D71920]" strokeWidth={1.5} />
              </div>
              <h3 className="font-heading text-sm font-bold uppercase text-white tracking-widest">
                Vision
              </h3>
            </div>

            <p className="text-xs md:text-sm text-muted-foreground font-medium leading-relaxed flex-1">
              To be a globally recognized student engineering team that inspires
              future generations and contributes to the advancement of mobility.
            </p>
          </div>

          {/* Video Container Box (1/2 width on desktop) */}
          <div className="lg:col-span-6 w-full aspect-video bg-[#0a0a0a] rounded border border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-red-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-20"></div>

            <video
              src="/videos/mission-car.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
            >
              Your browser does not support the video tag.
            </video>

            {/* Optional subtle overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent z-10 pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
