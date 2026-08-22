import React from "react";
import ContactSectionLayout from "./ContactSectionLayout";
import { ArrowRight } from "lucide-react";

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
    <path d="m10 15 5-3-5-3z"/>
  </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

export default function SocialMediaSection() {
  const socials = [
    {
      name: "Instagram",
      handle: "@motorhead_bmsit",
      url: "https://instagram.com/motorhead_bmsit",
      icon: InstagramIcon,
    },
    {
      name: "LinkedIn",
      handle: "Motor Head BMSIT&M",
      url: "https://linkedin.com/company/motorhead-bmsit",
      icon: LinkedinIcon,
    },
    {
      name: "YouTube",
      handle: "Motor Head BMSIT&M",
      url: "https://youtube.com/@motorheadbmsit",
      icon: YoutubeIcon,
    },
    {
      name: "Facebook",
      handle: "/motorhead.bmsit",
      url: "https://facebook.com/motorhead.bmsit",
      icon: FacebookIcon,
    },
  ];

  return (
    <ContactSectionLayout
      number="04"
      title="Social Media Links"
      description="Stay connected with us across all platforms."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {socials.map((social) => (
          <div key={social.name} className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-transparent rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
            <a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 flex flex-col hover:border-white/20 transition-all block h-full shadow-2xl"
            >
              <div className="w-12 h-12 rounded-lg border border-white/10 flex items-center justify-center mb-6 group-hover:border-primary/50 group-hover:bg-primary/5 group-hover:text-primary group-hover:scale-110 transition-all duration-300">
                <social.icon className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold mb-1">{social.name}</h3>
              <div className="flex items-center justify-between mt-auto pt-2">
                <p className="text-sm text-muted-foreground">{social.handle}</p>
                <ArrowRight className="w-4 h-4 text-primary opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </div>
            </a>
          </div>
        ))}
      </div>
    </ContactSectionLayout>
  );
}
