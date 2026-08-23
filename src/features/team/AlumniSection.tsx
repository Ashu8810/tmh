"use client";

import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

// Alumni grouped by pass-out (graduation) year.
// image: matches the exact filename as it appears in your Drive folder — upload with the same name to public/images/alumni/.
// linkedin: replace "#" with their actual LinkedIn URL whenever you have it.

const alumniByYear: Record<string, {
  name: string;
  status: string;
  image: string;
  linkedin: string;
}[]> = {
  "2025": [
    { name: "Adithya Hiremath", status: "Alumni", image: "/images/alumni/Adithya Hiremath.jpg", linkedin: "#" },
    { name: "Bharath V R", status: "Alumni", image: "/images/alumni/Bharath V R.jpg", linkedin: "#" },
    { name: "Ganesh", status: "Alumni", image: "/images/alumni/Ganesh.jpg", linkedin: "#" },
    { name: "Karthik Yadav", status: "Alumni", image: "/images/alumni/Karthik Yadav.jpg", linkedin: "#" },
    { name: "Syeeda Aiemen", status: "Alumni", image: "/images/alumni/Syeeda Aiemen.jpg", linkedin: "#" },
  ],
  "2026": [
    { name: "Aditya Narayan", status: "Alumni", image: "/images/alumni/Aditya narayan.jpg", linkedin: "#" },
    { name: "Dhanush", status: "Alumni", image: "/images/alumni/Dhanush.jpg", linkedin: "#" },
    { name: "Fardeen", status: "Alumni", image: "/images/alumni/Fardeen.jpg", linkedin: "#" },
    { name: "Gajendra", status: "Alumni", image: "/images/alumni/gajendra.jpg", linkedin: "#" },
    { name: "Karthik", status: "Alumni", image: "/images/alumni/karthik.jpg", linkedin: "#" },
    { name: "Mokshith", status: "Alumni", image: "/images/alumni/Mokshith.jpg", linkedin: "#" },
    { name: "Nishitha", status: "Alumni", image: "/images/alumni/Nishitha.jpg", linkedin: "#" },
    { name: "Pavan", status: "Alumni", image: "/images/alumni/Pavan.jpg", linkedin: "#" },
    { name: "Raj Surya", status: "Alumni", image: "/images/alumni/Raj Surya.jpg", linkedin: "#" },
    { name: "Sahil", status: "Alumni", image: "/images/alumni/sahil.jpg", linkedin: "#" },
    { name: "Sharath", status: "Alumni", image: "/images/alumni/sharath.jpg", linkedin: "#" },
    { name: "Tanish", status: "Alumni", image: "/images/alumni/tanish.jpg", linkedin: "#" },
    { name: "Tharun", status: "Alumni", image: "/images/alumni/tharun.jpg", linkedin: "#" },
    { name: "Vikas", status: "Alumni", image: "/images/alumni/vikas.jpg", linkedin: "#" },
    { name: "Vinay", status: "Alumni", image: "/images/alumni/Vinay.jpg", linkedin: "#" },
  ],
  "2027": [
    { name: "Abhijeeth", status: "Alumni", image: "/images/alumni/Abhijeeth.jpg", linkedin: "#" },
    { name: "Aditya Singh", status: "Alumni", image: "/images/alumni/Aditya Singh.jpg", linkedin: "#" },
    { name: "DJ", status: "Alumni", image: "/images/alumni/DJ.jpg", linkedin: "#" },
    { name: "Gautam P", status: "Alumni", image: "/images/alumni/GAUTAM P.jpg", linkedin: "#" },
    { name: "Shankar", status: "Alumni", image: "/images/alumni/Shankar.jpg", linkedin: "#" },
    { name: "Venkat", status: "Alumni", image: "/images/alumni/Venkat.jpg", linkedin: "#" },
  ],
  "2028": [
    { name: "Aaron Joel Jonathan", status: "Alumni", image: "/images/alumni/Aaron Joel Jonathan.jpg", linkedin: "#" },
    { name: "Aashish S Badiger", status: "Alumni", image: "/images/alumni/Aashish S Badiger.jpg", linkedin: "#" },
    { name: "Aatif Mohideen", status: "Alumni", image: "/images/alumni/Aatif Mohideen.jpg", linkedin: "#" },
    { name: "Arjun Livik J P", status: "Alumni", image: "/images/alumni/Arjun Livik J P.jpg", linkedin: "#" },
    { name: "Asim", status: "Alumni", image: "/images/alumni/Asim.jpg", linkedin: "#" },
    { name: "Bhagyesh S", status: "Alumni", image: "/images/alumni/Bhagyesh S.jpg", linkedin: "#" },
    { name: "Hariharan N", status: "Alumni", image: "/images/alumni/Hariharan N.jpg", linkedin: "#" },
    { name: "Karthik Gopal Halliyal", status: "Alumni", image: "/images/alumni/Karthik Gopal Halliyal.jpg", linkedin: "#" },
    { name: "Maruthi H R", status: "Alumni", image: "/images/alumni/Maruthi H R.jpg", linkedin: "#" },
    { name: "Mohammed Abdul", status: "Alumni", image: "/images/alumni/Mohammed Abdul.jpg", linkedin: "#" },
    { name: "Mohith M", status: "Alumni", image: "/images/alumni/Mohith M.jpg", linkedin: "#" },
    { name: "Nethanya G H", status: "Alumni", image: "/images/alumni/Nethanya G H.jpg", linkedin: "#" },
    { name: "Poojit", status: "Alumni", image: "/images/alumni/Poojit.jpg", linkedin: "#" },
    { name: "Pranjal Raj", status: "Alumni", image: "/images/alumni/Pranjal Raj.jpg", linkedin: "#" },
    { name: "Pratham", status: "Alumni", image: "/images/alumni/Pratham.jpg", linkedin: "#" },
    { name: "Samarth M Hulamani", status: "Alumni", image: "/images/alumni/Samarth M Hulamani.jpg", linkedin: "#" },
    { name: "Srujan A P", status: "Alumni", image: "/images/alumni/Srujan A P.jpg", linkedin: "#" },
    { name: "Suteerth", status: "Alumni", image: "/images/alumni/Suteerth.jpg", linkedin: "#" },
    { name: "Vivek DB", status: "Alumni", image: "/images/alumni/Vivek db.jpg", linkedin: "#" },
    { name: "Yashraj Desai", status: "Alumni", image: "/images/alumni/Yashraj Desai.jpg", linkedin: "#" },
  ],
};

const batchYears = Object.keys(alumniByYear).sort((a, b) => (a < b ? 1 : -1));

export default function AlumniSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedYear, setSelectedYear] = useState(batchYears[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const alumni = alumniByYear[selectedYear] || [];

  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };
  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };
  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollPosition = scrollRef.current.scrollLeft;
      const cardWidth = 200 + 16;
      const newIndex = Math.round(scrollPosition / cardWidth);
      setActiveIndex(Math.min(newIndex, alumni.length - 1));
    }
  };

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTo({ left: 0, behavior: "auto" });
    setActiveIndex(0);
  }, [selectedYear]);

  return (
    <section className="flex flex-col lg:flex-row gap-12 lg:gap-24 w-full">
      <div className="lg:w-1/3 flex flex-col pt-4">
        <span className="text-primary font-heading text-2xl font-bold mb-2">05</span>
        <h2 className="text-3xl font-heading font-bold uppercase tracking-wider mb-6">Alumni</h2>
        <div className="w-12 h-1 bg-white/10 mb-6" />
        <p className="text-muted-foreground mb-8">
          Their legacy. Our inspiration.<br />Always a part of the journey.
        </p>

        <div className="relative w-full max-w-[240px]">
          <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-2 block">
            Select Batch
          </label>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center justify-between bg-[#121212] border border-white/10 rounded-lg px-4 py-3 text-left hover:border-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <span className="font-heading font-bold">{selectedYear}</span>
            <ChevronDown size={18} className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-full max-h-64 overflow-y-auto bg-[#1a1a1a] border border-white/10 rounded-lg shadow-xl z-50 no-scrollbar">
              {batchYears.map((year) => (
                <button
                  key={year}
                  onClick={() => { setSelectedYear(year); setIsDropdownOpen(false); }}
                  className={`w-full text-left px-4 py-3 hover:bg-white/5 transition-colors font-heading text-sm ${
                    selectedYear === year ? 'text-primary bg-primary/10' : 'text-white'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="lg:w-2/3 flex flex-col items-center">
        {alumni.length === 0 ? (
          <p className="text-muted-foreground py-12">No alumni records for this batch yet.</p>
        ) : (
          <>
            <div className="flex items-center gap-4 w-full relative">
              <button
                onClick={scrollLeft}
                className="w-11 h-11 min-h-[44px] min-w-[44px] rounded-full border border-white/20 flex items-center justify-center hover:bg-white/5 transition-colors absolute -left-5 z-10 bg-background md:static"
                aria-label="Scroll left"
              >
                <ChevronLeft size={20} />
              </button>

              <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex-1 overflow-x-auto no-scrollbar snap-x snap-mandatory flex gap-4 pb-4 scroll-smooth"
              >
                {alumni.map((person) => (
                  <div
                    key={person.name}
                    className="snap-start w-[42vw] sm:w-[200px] md:w-[220px] lg:w-[240px] flex-none flex flex-col bg-[#121212] border border-white/5 rounded-xl overflow-hidden hover:border-white/10 transition-colors"
                  >
                    <div className="aspect-square bg-neutral-900 relative">
                      <img
                        src={person.image}
                        alt={person.name}
                        className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-300"
                        onError={(e) => {
                          e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&background=202020&color=fff&size=300`;
                        }}
                      />
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="font-heading font-bold text-lg mb-1">{person.name}</h3>
                      <p className="text-primary text-xs font-semibold mb-1 uppercase tracking-wider">{person.status}</p>
                      {person.linkedin && person.linkedin !== "#" && (
                        
                          href={person.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-white transition-colors inline-block mt-1"
                          aria-label={`${person.name} LinkedIn`}
                        >
                          LinkedIn
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={scrollRight}
                className="w-11 h-11 min-h-[44px] min-w-[44px] rounded-full border border-white/20 flex items-center justify-center hover:bg-white/5 transition-colors absolute -right-5 z-10 bg-background md:static"
                aria-label="Scroll right"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="flex gap-2 mt-4">
              {alumni.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (scrollRef.current) {
                      const cardWidth = 200 + 16;
                      scrollRef.current.scrollTo({ left: index * cardWidth, behavior: "smooth" });
                    }
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === activeIndex ? "bg-primary" : "bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
