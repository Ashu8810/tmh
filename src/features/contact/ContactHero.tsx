import React from "react";

export default function ContactHero() {
  return (
    <div className="relative w-full overflow-hidden bg-background">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-[url('/images/contact_hero_bg.webp')] bg-cover bg-center bg-no-repeat opacity-60 mix-blend-luminosity"
        aria-hidden="true"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-background via-background/90 to-transparent" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="max-w-2xl">
          <span className="text-primary font-heading font-bold uppercase tracking-widest text-sm mb-4 block">
            GET IN TOUCH
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold uppercase tracking-tight leading-[1.1] mb-6 sm:mb-8">
            WE&apos;D LOVE TO <br className="hidden md:block" />
            <span className="text-primary">HEAR FROM YOU.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
            Have a question, suggestion, or partnership proposal? Reach out to
            us &mdash; we&apos;re always excited to connect.
          </p>
        </div>
      </div>
    </div>
  );
}
