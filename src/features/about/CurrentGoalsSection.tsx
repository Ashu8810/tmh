import { Settings, Users, Trophy, Wrench } from "lucide-react";

export default function CurrentGoalsSection() {
  const goals = [
    {
      title: "Improve vehicle performance",
      icon: <Settings className="w-4 h-4" />,
    },
    {
      title: "Strengthen team & departments",
      icon: <Users className="w-4 h-4" />,
    },
    {
      title: "Achieve better competition results",
      icon: <Trophy className="w-4 h-4" />,
    },
    {
      title: "Enhance infrastructure & resources",
      icon: <Wrench className="w-4 h-4" />,
    },
  ];

  return (
    <div className="w-full">
      <div className="mb-6">
        <span className="font-mono text-[#D71920] text-xl block mb-2 font-bold tracking-widest">
          07
        </span>
        <h2 className="font-heading text-xl lg:text-2xl font-bold text-white uppercase tracking-tight">
          CURRENT GOALS
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {goals.map((goal, index) => (
          <div
            key={index}
            className="p-4 bg-[#0a0a0a] rounded border border-white/5 relative group hover:border-[#D71920]/40 transition-colors"
          >
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#D71920]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#121212] rounded border border-white/10 text-[#D71920] shrink-0 group-hover:scale-110 transition-transform">
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
