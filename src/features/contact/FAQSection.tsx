"use client";

import React, { useState } from "react";
import ContactSectionLayout from "./ContactSectionLayout";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/utils/cn";

const faqs = [
  {
    question: "What is Motor Head?",
    answer:
      "Motor Head is the official automotive engineering club of BMS Institute of Technology & Management. We design, build, and race high-performance vehicles for various national and international competitions.",
  },
  {
    question: "How can I join Motor Head?",
    answer:
      "We typically conduct recruitment drives at the beginning of the odd semester. Watch out for our announcements on social media and campus notice boards to apply and join our team.",
  },
  {
    question: "Do I need prior experience to join?",
    answer:
      "No prior experience is required! We value passion, dedication, and a willingness to learn. Our senior members provide training and mentorship to all new recruits.",
  },
  {
    question: "What are the club activities?",
    answer:
      "Apart from building our flagship vehicles, we conduct technical workshops, guest lectures from industry experts, and participate in various motorsport events and automotive expos.",
  },
  {
    question: "How can companies collaborate with Motor Head?",
    answer:
      "Companies can collaborate with us through sponsorships, providing manufacturing support, sharing technical expertise, or offering software licenses. Contact us via our official email to discuss partnership opportunities.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <ContactSectionLayout
      number="05"
      title="Frequently Asked Questions"
      description="Quick answers to common questions."
    >
      <div className="flex flex-col gap-2">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={cn(
                "border border-white/5 bg-[#121212] rounded-lg overflow-hidden transition-all duration-300",
                isOpen
                  ? "border-primary/30 bg-white/5"
                  : "hover:border-white/20",
              )}
            >
              <button
                className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span className="font-heading font-bold text-sm md:text-base">
                  {faq.question}
                </span>
                {isOpen ? (
                  <Minus className="w-5 h-5 text-primary shrink-0 ml-4" />
                ) : (
                  <Plus className="w-5 h-5 text-muted-foreground shrink-0 ml-4" />
                )}
              </button>

              <div
                className={cn(
                  "px-6 text-sm text-muted-foreground leading-relaxed transition-all duration-300 overflow-hidden",
                  isOpen
                    ? "max-h-48 pb-4 opacity-100"
                    : "max-h-0 py-0 opacity-0",
                )}
              >
                {faq.answer}
              </div>
            </div>
          );
        })}
      </div>
    </ContactSectionLayout>
  );
}
