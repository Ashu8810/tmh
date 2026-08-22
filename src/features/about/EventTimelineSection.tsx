export default function TimelineSection() {
  const events = [
    { year: "2013", title: "Club Founded" },
    { year: "2014", title: "First Vehicle Concept" },
    { year: "2016", title: "First Competition" },
    { year: "2018", title: "All India Rank Achieved" },
    { year: "2020", title: "International Debut" },
    { year: "2022", title: "Multiple Podium Finishes" },
    { year: "2024", title: "Future, Unlimited." },
  ];

  return (
    <div className="w-full h-full relative">
      {/* Background Graphic */}
      <div className="absolute inset-0 right-0 lg:-right-32 bottom-0 h-[120%] pointer-events-none overflow-hidden opacity-50 z-0">
         {/* Placeholder for the red light trails background */}
         <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505] z-10"></div>
         <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-transparent z-10"></div>
         <div className="w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-[#D71920]/20 via-transparent to-transparent"></div>
         {/* Fake light trails */}
         <div className="absolute bottom-10 right-10 w-[150%] h-[200px] border-b-2 border-r-2 border-[#D71920]/30 rounded-[100px] transform -rotate-12 blur-[2px]"></div>
         <div className="absolute bottom-20 right-20 w-[120%] h-[150px] border-b border-r border-white/10 rounded-[80px] transform -rotate-12"></div>
      </div>

      <div className="relative z-10">
        <div className="mb-8">
          <span className="font-mono text-[#D71920] text-xl block mb-1 font-bold tracking-widest">06</span>
          <h2 className="font-heading text-2xl lg:text-3xl font-bold text-white uppercase tracking-tight">
            EVENT TIMELINE
          </h2>
        </div>

        <div className="relative pl-6">
          {/* Vertical Timeline Line */}
          <div className="absolute top-2 left-0 w-[1px] h-[95%] bg-gradient-to-b from-[#D71920] via-white/20 to-transparent"></div>
          
          <div className="flex flex-col gap-2">
            {events.map((event, index) => (
              <div key={index} className="flex items-center gap-4 group relative py-1 px-2 -ml-2 rounded-lg hover:bg-white/[0.02] transition-colors cursor-default">
                {/* Node */}
                <div className={`absolute left-[7px] w-2 h-2 rounded-full transition-all duration-300 ${
                  index === 0 || index === events.length - 1 
                  ? 'bg-[#D71920] shadow-[0_0_15px_rgba(215,25,32,1)] scale-110' 
                  : 'bg-[#121212] border border-white/20 group-hover:bg-[#D71920] group-hover:border-[#D71920] group-hover:scale-125 group-hover:shadow-[0_0_10px_rgba(215,25,32,0.8)]'
                }`}></div>
                
                <div className="flex-1 flex items-center gap-4 py-2 px-4 rounded-lg border border-transparent group-hover:border-white/5 bg-transparent group-hover:bg-[#0a0a0a] transition-all duration-300 transform group-hover:translate-x-2">
                  <span className="font-mono text-sm md:text-base text-[#D71920] font-bold w-12 shrink-0 transition-all">{event.year}</span>
                  <span className="text-xs md:text-sm text-white/70 group-hover:text-white font-semibold transition-colors">
                    {event.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
