import React from "react";
import ContactSectionLayout from "./ContactSectionLayout";
import { Mail } from "lucide-react";

const OFFICIAL_EMAIL = "teammotorheads@bmsit.in";
const GMAIL_COMPOSE_LINK = `https://mail.google.com/mail/?view=cm&fs=1&to=${OFFICIAL_EMAIL}`;

export default function OfficialEmailSection() {
  return (
    <ContactSectionLayout
      number="02"
      title="Official Email"
      description="For official communication and inquiries."
    >
      <div className="relative group w-full max-w-xl">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-transparent rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
        <div className="relative bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-8 flex items-start gap-6 hover:border-white/10 transition-colors w-full">
          <div className="p-4 bg-primary/10 rounded-full text-primary shrink-0 group-hover:scale-110 transition-transform duration-300">
            <Mail className="w-8 h-8" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-2">
              Official Email
            </span>
            <a
              href={GMAIL_COMPOSE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl md:text-2xl font-bold font-heading hover:text-primary transition-colors mb-2 break-all"
            >
              {OFFICIAL_EMAIL}
            </a>
            <p className="text-sm text-muted-foreground">
              We typically respond within 24-48 hours.
            </p>
          </div>
        </div>
      </div>
    </ContactSectionLayout>
  );
}
