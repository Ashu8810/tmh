"use client";

import React from "react";
import ContactSectionLayout from "./ContactSectionLayout";
import { Button as PrimaryButton } from "@/components/ui/PrimaryButton";
import { MapPin } from "lucide-react";

export default function CampusLocationSection() {
  return (
    <ContactSectionLayout
      number="03"
      title="Campus Location And Map"
      description="Find us at our home, BMS Institute of Technology & Management."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {/* Interactive Google Map */}
        <div className="relative group rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-auto h-full border border-white/5 hover:border-white/20 transition-all shadow-2xl bg-[#0a0a0a]">
          <div className="absolute inset-0 bg-white/5 animate-pulse" />
          <iframe 
            src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=BMS%20Institute%20of%20Technology%20and%20Management,%20Avalahalli,%20Yelahanka,%20Bengaluru+(BMSIT%20Campus)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed" 
            className="absolute inset-0 w-full h-full border-0 filter opacity-80 group-hover:opacity-100 transition-opacity duration-500"
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="BMSIT Campus Map"
          />
        </div>

        {/* Address Card */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-l from-primary/20 to-transparent rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
          <div className="relative bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-8 flex flex-col justify-center h-full shadow-2xl hover:border-white/10 transition-all">
            <h3 className="text-xl font-heading font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
              BMS Institute of Technology & Management
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8">
              Avalahalli, Doddaballapur Main Road, <br />
              Yelahanka, Bengaluru - 560064, <br />
              Karnataka, India
            </p>
            <PrimaryButton 
              className="w-max px-8 py-4 shadow-[0_0_20px_rgba(255,0,0,0.1)] hover:shadow-[0_0_30px_rgba(255,0,0,0.3)] transition-shadow"
              onClick={() => window.open("https://maps.app.goo.gl/3Q6U9M9Hk55JbM3s8", "_blank")}
            >
              GET DIRECTIONS
            </PrimaryButton>
          </div>
        </div>
      </div>
    </ContactSectionLayout>
  );
}
