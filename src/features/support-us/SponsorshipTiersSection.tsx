import { ChevronRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/PrimaryButton";
import { cn } from "@/utils/cn";
import { sponsorshipTiers } from "@/data/sponsorsData";

const ENQUIRE_EMAIL = "teammotorheads@bmsit.in";

function mailtoFor(tierTitle: string) {
  const subject = encodeURIComponent(`Sponsorship Enquiry — ${tierTitle}`);
  const body = encodeURIComponent(
    `Hi Motor Head team,\n\nWe're interested in the "${tierTitle}" sponsorship tier. Could you share more details?\n\nThanks,`,
  );
  return `mailto:${ENQUIRE_EMAIL}?subject=${subject}&body=${body}`;
}

export default function SponsorshipTiersSection() {
  return (
    <section className="py-24 bg-background border-b border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="mb-12">
          <span className="font-mono text-[#D71920] text-xl block mb-2 font-bold tracking-widest">
            SPONSORSHIP TIERS
          </span>
          <h2 className="font-heading text-3xl font-bold text-white uppercase tracking-tight">
            Pick Your Grid Position
          </h2>
        </div>

        {/* Tier Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {sponsorshipTiers.map((tier) => (
            <div
              key={tier.title}
              className="p-8 bg-[#0a0a0a] rounded border border-white/10 relative group flex flex-col"
            >
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#D71920] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <span className="inline-block w-fit px-2 py-1 mb-4 border border-[#D71920]/40 text-[#D71920] text-[10px] font-heading font-bold uppercase tracking-widest rounded-sm">
                {tier.badge}
              </span>

              <h3 className="font-heading text-lg font-bold uppercase text-white mb-4">
                {tier.title}
              </h3>

              <div className="w-full h-px bg-white/10 mb-4" />

              <ul className="space-y-3 mb-8 flex-1">
                {tier.perks.map((perk) => (
                  <li
                    key={perk}
                    className="flex items-start gap-2 text-xs md:text-sm text-muted-foreground font-medium leading-relaxed"
                  >
                    <ChevronRight
                      className="w-4 h-4 text-[#D71920] shrink-0 mt-0.5"
                      strokeWidth={2}
                    />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>

              <a
                href={mailtoFor(tier.title)}
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-fit")}
              >
                Enquire
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
