import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function OurStorySection() {
  const milestones = [
    {
      year: "2013",
      title: "Inception",
      description: "The journey begins with a vision.",
    },
    {
      year: "2016",
      title: "First Build",
      description: "Our first vehicle hits the floor.",
    },
    {
      year: "2019",
      title: "National Recognition",
      description: "Podium finishes and national acclaim.",
    },
    {
      year: "2024",
      title: "Beyond Limits",
      description: "Pushing boundaries. Building the future.",
    },
  ];

  return (
    <section
      id="our-story"
      className="py-24 bg-[#050505] border-b border-white/5 relative"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Left Content */}
          <div className="w-full lg:w-1/3 shrink-0 pt-4">
            <div className="mb-4">
              <span className="font-mono text-[#D71920] text-xl block mb-2 font-bold tracking-widest">
                01
              </span>
              <h2 className="font-heading text-3xl font-bold text-white uppercase tracking-tight">
                OUR STORY
              </h2>
            </div>

            <p className="text-muted-foreground font-medium leading-relaxed mb-8 text-sm md:text-base">
              From a small group of passionate students to a full-fledged
              engineering team competing on national and international
              platforms—our journey is built on curiosity, dedication and
              relentless pursuit of excellence.
            </p>

            <Link
              href="/about/story"
              className="inline-flex items-center gap-2 text-[#D71920] hover:text-white font-medium text-sm transition-colors group"
            >
              Read More
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right Visual Element - Horizontal Timeline */}
          <div className="w-full lg:w-2/3 relative pt-4 flex flex-col justify-center">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 w-full relative z-10">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className="flex flex-col items-start group relative"
                >
                  {/* Image Placeholder with Red Dot & Line */}
                  <div className="w-full aspect-[4/3] md:aspect-video bg-[#0a0a0a] border border-white/5 rounded-md mb-6 overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-500 shadow-lg">
                    {/* Placeholder Text */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-20">
                      <span className="text-white/40 font-mono text-[10px] md:text-xs tracking-widest">
                        IMG_{milestone.year}
                      </span>
                    </div>

                    {/* Timeline Line connecting the dots (except first one stretches out) */}
                    <div className="absolute bottom-4 left-4 w-[200%] h-[1px] bg-gradient-to-r from-[#D71920]/40 to-white/5 z-0"></div>

                    {/* Red Dot Marker */}
                    <div className="absolute bottom-[14px] left-4 w-1.5 h-1.5 bg-[#D71920] rounded-full shadow-[0_0_8px_rgba(215,25,32,1)] z-10"></div>
                  </div>

                  {/* Text Content */}
                  <div className="text-left px-1">
                    <div className="text-white font-bold text-sm mb-1.5">
                      {milestone.year}
                    </div>
                    <h4 className="font-heading text-[11px] font-bold text-white uppercase tracking-wider mb-2">
                      {milestone.title}
                    </h4>
                    <p className="text-[11px] text-white/50 font-medium leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
