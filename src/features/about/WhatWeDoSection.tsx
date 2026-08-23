import {
  PenTool,
  Wrench,
  Activity,
  Trophy,
  BookOpen,
  Lightbulb,
} from "lucide-react";

export default function WhatWeDoSection() {
  const activities = [
    {
      icon: <PenTool className="w-5 h-5 text-[#D71920]" strokeWidth={1.5} />,
      title: "DESIGN",
      description: "Conceptualizing and simulating high-performance vehicles.",
    },
    {
      icon: <Wrench className="w-5 h-5 text-[#D71920]" strokeWidth={1.5} />,
      title: "MANUFACTURE",
      description:
        "Turning ideas into reality with precision and craftsmanship.",
    },
    {
      icon: <Activity className="w-5 h-5 text-[#D71920]" strokeWidth={1.5} />,
      title: "TEST",
      description:
        "Rigorous testing to ensure reliability, safety and performance.",
    },
    {
      icon: <Trophy className="w-5 h-5 text-[#D71920]" strokeWidth={1.5} />,
      title: "COMPETE",
      description:
        "Representing our institute at national and international events.",
    },
    {
      icon: <BookOpen className="w-5 h-5 text-[#D71920]" strokeWidth={1.5} />,
      title: "LEARN",
      description:
        "Upskilling constantly through research, workshops and more.",
    },
    {
      icon: <Lightbulb className="w-5 h-5 text-[#D71920]" strokeWidth={1.5} />,
      title: "INNOVATE",
      description: "Exploring new technologies and pushing boundaries.",
    },
  ];

  return (
    <section className="py-24 bg-[#050505] border-b border-white/5 relative">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-16">
          <span className="font-mono text-[#D71920] text-xl block mb-2 font-bold tracking-widest">
            03
          </span>
          <h2 className="font-heading text-3xl font-bold text-white uppercase tracking-tight">
            WHAT WE DO
          </h2>
        </div>

        {/* 6 Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-y-12">
          {activities.map((activity, index) => (
            <div
              key={index}
              className={`flex flex-col relative px-4 xl:px-6 ${
                index !== 0 ? "xl:border-l xl:border-white/5" : ""
              }`}
            >
              <div className="mb-6 h-12 w-12 flex items-center justify-center border border-white/10 rounded bg-[#0a0a0a]">
                {activity.icon}
              </div>
              <h3 className="font-heading text-xs font-bold uppercase text-white tracking-widest mb-3">
                {activity.title}
              </h3>
              <p className="text-[10px] md:text-xs text-muted-foreground font-medium leading-relaxed pr-4">
                {activity.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
