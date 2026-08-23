import { Download, FileText } from "lucide-react";

export default function DownloadProfileCTA() {
  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24 justify-center">
          {/* Left Graphic */}
          <div className="relative shrink-0">
            <div className="w-24 h-32 rounded bg-[#0a0a0a] border border-white/10 relative flex items-center justify-center group z-10">
              <FileText className="w-10 h-10 text-[#D71920]" strokeWidth={1} />
              <div className="absolute inset-0 rounded shadow-[0_0_30px_rgba(215,25,32,0.15)]"></div>
            </div>
            {/* Fake abstract circuit lines around it */}
            <div className="absolute -inset-10 opacity-30 pointer-events-none border border-white/5 rounded-lg -z-0">
              <div className="absolute top-1/2 -left-10 w-10 h-[1px] bg-white/20"></div>
              <div className="absolute top-1/2 -right-10 w-10 h-[1px] bg-[#D71920]/50"></div>
            </div>
          </div>

          {/* Center Text */}
          <div className="text-center md:text-left flex-1 max-w-xl">
            <span className="font-mono text-[#D71920] text-xl block mb-2 font-bold tracking-widest">
              09
            </span>
            <h2 className="font-heading text-2xl lg:text-3xl font-bold text-white uppercase tracking-tight mb-4">
              DOWNLOAD CLUB PROFILE
            </h2>
            <p className="text-sm md:text-base text-muted-foreground font-medium leading-relaxed">
              Get a detailed overview of our journey, achievements, team,
              vehicles and more in our official club profile.
            </p>
          </div>

          {/* Right CTA Button */}
          <div className="shrink-0">
            <button className="flex items-center gap-3 px-8 py-4 bg-[#D71920] hover:bg-[#b01319] text-white font-medium text-sm rounded shadow-[0_0_20px_rgba(215,25,32,0.3)] transition-all duration-300">
              Download Club Profile
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
