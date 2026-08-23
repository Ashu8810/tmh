export default function AchievementsSection() {
  const achievements = [
    { value: "15+", label: "Competitions" },
    { value: "10+", label: "Podium Finishes" },
    { value: "5", label: "International\nEvents" },
    { value: "25+", label: "Awards Won" },
  ];

  return (
    <div className="w-full h-full flex flex-col">
      <div className="mb-10">
        <span className="font-mono text-[#D71920] text-xl block mb-2 font-bold tracking-widest">
          05
        </span>
        <h2 className="font-heading text-2xl lg:text-3xl font-bold text-white uppercase tracking-tight">
          ACHIEVEMENTS
        </h2>
      </div>

      <div className="grid grid-cols-2 md:flex md:flex-row md:items-center md:justify-between mt-8 relative gap-y-12 md:gap-y-0">
        {/* Subtle background red glow */}
        <div className="absolute inset-0 bg-[#D71920]/5 blur-3xl rounded-full hidden md:block"></div>

        {achievements.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center flex-1 relative z-10"
          >
            {/* Dividing Line */}
            {index !== 0 && index % 2 !== 0 && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-12 bg-white/10 md:hidden"></div>
            )}
            {index !== 0 && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-12 bg-white/10 hidden md:block"></div>
            )}

            <span className="font-heading text-4xl lg:text-5xl font-bold text-white mb-2">
              {item.value}
            </span>
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider text-center whitespace-pre-line">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
