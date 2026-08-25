"use client";

import React, { useState } from "react";
import ContactSectionLayout from "./ContactSectionLayout";
import { Button as PrimaryButton } from "@/components/ui/PrimaryButton";
import { ShieldCheck, Loader2, Check } from "lucide-react";
import confetti from "canvas-confetti";

export default function AskQuestionSection() {
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== "idle") return;

    setStatus("submitting");

    // Simulate network delay
    setTimeout(() => {
      setStatus("sent");

      // Fire celebration confetti!
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = {
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 100,
      };
      const randomInRange = (min: number, max: number) =>
        Math.random() * (max - min) + min;

      const interval: ReturnType<typeof setInterval> = setInterval(function () {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
          return clearInterval(interval);
        }
        const particleCount = 50 * (timeLeft / duration);
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ["#e11d48", "#ffffff", "#000000"],
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ["#e11d48", "#ffffff", "#000000"],
        });
      }, 250);

      // Reset form after a few seconds
      setTimeout(() => setStatus("idle"), 5000);
    }, 1500);
  };

  return (
    <ContactSectionLayout
      number="06"
      title="Ask a Question"
      description="Have a specific question not covered in our FAQ? Ask us directly."
    >
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-transparent rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />

        <form
          className="relative flex flex-col gap-5 bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/5 p-8 rounded-2xl shadow-2xl"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="relative">
              <input
                type="text"
                placeholder="Your Name *"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all hover:bg-white/10"
              />
            </div>
            <div className="relative">
              <input
                type="email"
                placeholder="Your Email *"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all hover:bg-white/10"
              />
            </div>
          </div>
          <div className="relative">
            <textarea
              placeholder="Your Question *"
              required
              rows={4}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-y hover:bg-white/10"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-6 border-t border-white/5 pt-6">
            <PrimaryButton
              type="submit"
              disabled={status !== "idle"}
              className={`w-full sm:w-auto px-10 py-6 text-sm tracking-widest font-bold transition-all
                ${status === "idle" ? "shadow-[0_0_20px_rgba(255,0,0,0.2)] hover:shadow-[0_0_30px_rgba(255,0,0,0.4)]" : ""}
                ${status === "sent" ? "bg-green-600 hover:bg-green-700 shadow-[0_0_30px_rgba(22,163,74,0.4)] text-white" : ""}
              `}
            >
              {status === "idle" && "SUBMIT QUESTION"}
              {status === "submitting" && (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  SUBMITTING...
                </span>
              )}
              {status === "sent" && (
                <span className="flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  QUESTION SUBMITTED!
                </span>
              )}
            </PrimaryButton>
            <div className="flex items-center text-xs text-muted-foreground">
              <ShieldCheck className="w-4 h-4 mr-2 opacity-50 shrink-0 text-primary" />
              We respect your privacy.
            </div>
          </div>
        </form>
      </div>
    </ContactSectionLayout>
  );
}
