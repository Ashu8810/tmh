import { Globe, Cpu, Zap, GraduationCap } from "lucide-react";

export default function FutureGoalsSection() {
  const goals = [
    {
      title: "Compete internationally every year",
      icon: <Globe className="w-4 h-4" />,
    },
    {
      title: "Develop advanced technologies",
      icon: <Cpu className="w-4 h-4" />,
    },
    {
      title: "Build sustainable & electric vehicles",
      icon: <Zap className="w-4 h-4" />,
    },
    {
      title: "Inspire and mentor future engineers",
      icon: <GraduationCap className="w-4 h-4" />,
    },
  ];

  return (
    <div className="w-full relative">
      {/* Background Image for Section 8 */}
      <div className="absolute -inset-10 md:-inset-20 z-0 pointer-events-none opacity-30 mix-blend-screen overflow-hidden">
        <img
          src="/images/future-goals-bg.webp"
          alt="Red Light Trails"
          className="w-full h-full object-cover"
        />
        {/* Fading gradients so the edges blend seamlessly into the black background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,#050505_70%)]"></div>
      </div>

      <div className="mb-6 relative z-10">
        <span className="font-mono text-[#D71920] text-xl block mb-2 font-bold tracking-widest">
          08
        </span>
        <h2 className="font-heading text-xl lg:text-2xl font-bold text-white uppercase tracking-tight">
          FUTURE GOALS
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
        {goals.map((goal, index) => (
          <div
            key={index}
            className="p-4 bg-[#0a0a0a] rounded border border-white/5 relative group hover:border-white/20 transition-colors"
          >
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#121212] rounded border border-white/10 text-[#D71920] shrink-0 group-hover:rotate-12 transition-transform">
                {goal.icon}
              </div>
              <span className="text-xs md:text-sm text-white/80 group-hover:text-white font-medium transition-colors">
                {goal.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
