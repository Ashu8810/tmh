"use client";

import React, { useState, useEffect } from "react";

interface EventInfo {
  name: string;
  fullName: string;
  startDate: string; // ISO format
}

const events: EventInfo[] = [
  {
    name: "GKDC",
    fullName: "GKDC 2027",
    startDate: "2027-02-17T00:00:00",
  },
  {
    name: "EKVC",
    fullName: "EKVC 2027",
    startDate: "2027-02-26T00:00:00",
  },
];

function getTimeRemaining(targetDate: string) {
  const total = new Date(targetDate).getTime() - new Date().getTime();

  if (total <= 0) {
    return { total, days: 0, hours: 0, minutes: 0, seconds: 0, isLive: true };
  }

  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const seconds = Math.floor((total / 1000) % 60);

  return { total, days, hours, minutes, seconds, isLive: false };
}

function CountdownCard({ event }: { event: EventInfo }) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeRemaining(event.startDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining(event.startDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [event.startDate]);

  return (
    <div className="flex flex-col bg-[#121212] border border-white/5 rounded-xl overflow-hidden hover:border-white/10 transition-colors p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading font-bold text-xl uppercase tracking-wider">
          {event.fullName}
        </h3>
        {timeLeft.isLive && (
          <span className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Live Now
          </span>
        )}
      </div>

      {timeLeft.isLive ? (
        <p className="text-muted-foreground text-sm">
          The event is happening now!
        </p>
      ) : (
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Mins", value: timeLeft.minutes },
            { label: "Secs", value: timeLeft.seconds },
          ].map((unit) => (
            <div
              key={unit.label}
              className="flex flex-col items-center bg-white/5 rounded-lg py-3"
            >
              <span className="font-heading font-bold text-2xl md:text-3xl tabular-nums">
                {String(unit.value).padStart(2, "0")}
              </span>
              <span className="text-muted-foreground text-[10px] uppercase tracking-widest mt-1">
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function EventCountdown() {
  return (
    <section className="flex flex-col lg:flex-row gap-12 lg:gap-24 w-full">
      <div className="lg:w-1/3 flex flex-col pt-4">
        <span className="text-primary font-heading text-2xl font-bold mb-2">•</span>
        <h2 className="text-3xl font-heading font-bold uppercase tracking-wider mb-6">
          Upcoming Events
        </h2>
        <div className="w-12 h-1 bg-white/10 mb-6" />
        <p className="text-muted-foreground">
          Countdown to our next competitions.
        </p>
      </div>

      <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => (
          <CountdownCard key={event.name} event={event} />
        ))}
      </div>
    </section>
  );
}
