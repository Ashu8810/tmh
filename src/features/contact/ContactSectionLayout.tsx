import React from "react";
import { cn } from "@/utils/cn";

interface ContactSectionLayoutProps {
  number: string;
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
  isFirst?: boolean;
}

export default function ContactSectionLayout({
  number,
  title,
  description,
  children,
  className,
  isFirst = false,
}: ContactSectionLayoutProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 py-16",
        !isFirst && "border-t border-white/10",
        className,
      )}
    >
      {/* Left Column */}
      <div className="lg:col-span-4 flex flex-col pt-2">
        <span className="text-primary font-heading text-xl font-bold mb-2">
          {number}
        </span>
        <h2 className="text-2xl font-heading font-bold uppercase tracking-wider mb-6">
          {title}
        </h2>
        <div className="w-12 h-1 bg-white/10 mb-6" />
        <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
          {description}
        </p>
      </div>

      {/* Right Column */}
      <div className="lg:col-span-8">{children}</div>
    </div>
  );
}
