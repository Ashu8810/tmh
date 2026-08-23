"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Users, ChevronRight } from "lucide-react";

const navItems = [
  { name: "HOME", href: "/" },
  { name: "ABOUT", href: "/about" },
  { name: "VEHICLES", href: "/vehicles" },
  { name: "TEAM", href: "/team" },
  { name: "EVENTS", href: "/events" },
  { name: "RESOURCES", href: "/resources" },
  { name: "REPORTS", href: "/reports" },
  { name: "MEDIA", href: "/media" },
  { name: "CONTACT", href: "/contact" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Body scroll lock for mobile menu
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-[#0a0a0a]/95 backdrop-blur-md">
      <div className="relative z-50 mx-auto flex h-20 w-full items-center justify-between px-4 sm:px-6 lg:px-8 xl:px-4 2xl:px-12 bg-[#0a0a0a]/95 backdrop-blur-md">
        {/* Logo Section */}
        <div className="flex shrink-0 items-center">
          <Link
            href="/"
            className="flex items-center group focus:outline-none focus:ring-1 focus:ring-primary rounded-sm min-h-[44px]"
          >
            {/* Logo Image */}
            <img
              src="/images/logo.png"
              alt="Motor Head Logo"
              className="h-10 sm:h-12 w-auto pr-3 sm:pr-4 object-contain"
            />

            {/* Vertical Separator */}
            <div className="h-8 sm:h-10 w-[1px] bg-white/10"></div>

            {/* Wordmark & Subtitle */}
            <div className="flex flex-col justify-center pl-3 2xl:pl-4">
              <span className="font-heading text-[15px] sm:text-[18px] 2xl:text-[22px] leading-none font-bold uppercase tracking-[0.2em] text-foreground whitespace-nowrap">
                Motor Head
              </span>
              <span className="hidden sm:block text-[6px] sm:text-[7.5px] 2xl:text-[9px] mt-1 font-medium text-muted-foreground tracking-[0.25em] uppercase whitespace-nowrap">
                Engineering • Innovation • Performance
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden xl:flex xl:items-center h-full">
          <div className="flex h-full">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative flex items-center h-full px-2 2xl:px-4 text-[11px] 2xl:text-[13px] uppercase tracking-wider font-semibold transition-colors focus:outline-none min-h-[44px] ${
                    isActive
                      ? "text-primary"
                      : "text-zinc-300 hover:text-foreground"
                  }`}
                >
                  {item.name}

                  {/* Active bottom glow line */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary shadow-[0_-2px_10px_rgba(215,25,32,0.6)]" />
                  )}

                  {/* Hover bottom line */}
                  {!isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary scale-x-0 transition-transform origin-center group-hover:scale-x-100 opacity-0 hover:opacity-100 hover:scale-x-100" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right Side Group (Actions & Mobile Menu) */}
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          {/* Right Side Actions (Tablet & Desktop) */}
          <div className="hidden md:flex items-center gap-2 2xl:gap-4">
            <Link
              href="/join"
              className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded border border-white/20 bg-transparent px-4 2xl:px-5 whitespace-nowrap text-[11px] 2xl:text-[12px] uppercase tracking-widest font-semibold text-foreground transition-all hover:border-white/40 hover:bg-white/5 focus:outline-none focus:ring-1 focus:ring-white min-h-[44px]"
            >
              <Users className="h-4 w-4 shrink-0 text-zinc-400" />
              Join Motor Head
            </Link>

            <Link
              href="/support-us"
              className="group shrink-0 inline-flex h-10 items-center justify-center gap-1 rounded bg-primary px-4 2xl:px-5 whitespace-nowrap text-[11px] 2xl:text-[12px] uppercase tracking-widest font-bold text-white shadow-[0_0_15px_rgba(215,25,32,0.4)] transition-all hover:bg-accent hover:shadow-[0_0_20px_rgba(215,25,32,0.6)] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background min-h-[44px]"
            >
              Support Us
              <ChevronRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex xl:hidden">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center rounded-md p-2 text-zinc-400 hover:bg-white/5 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-[44px] min-w-[44px]"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-7 w-7" aria-hidden="true" />
              ) : (
                <Menu className="block h-7 w-7" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Floating Overlay */}
      <div
        className={`absolute top-[calc(100%+0.5rem)] left-4 right-4 sm:left-6 sm:right-6 z-40 bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] transition-all duration-300 ease-in-out xl:hidden flex flex-col p-4 overflow-y-auto max-h-[calc(100vh-6rem)] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${
          isMobileMenuOpen
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 -translate-y-4 scale-95 pointer-events-none"
        }`}
        id="mobile-menu"
      >
        <div className="flex flex-col space-y-1 flex-1">
          {navItems.map((item, i) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                style={{ transitionDelay: `${i * 30}ms` }}
                className={`block rounded-lg px-4 py-2.5 text-base sm:text-lg uppercase tracking-widest font-bold transition-all duration-300 focus:outline-none min-h-[44px] flex items-center ${
                  isActive
                    ? "text-primary bg-primary/10 pl-6"
                    : "text-zinc-300 hover:bg-white/5 hover:text-foreground hover:pl-6"
                } ${isMobileMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        <div
          className={`mt-4 pt-4 flex flex-col sm:flex-row gap-4 border-t border-white/10 transition-all duration-500 delay-300 ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          <Link
            href="/join"
            className="flex flex-1 h-12 sm:h-14 items-center justify-center gap-3 rounded-lg border border-white/20 bg-transparent px-4 text-sm sm:text-base uppercase tracking-widest font-bold text-foreground hover:bg-white/5 transition-colors focus:outline-none min-h-[44px]"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Users className="h-5 w-5" />
            Join Us
          </Link>
          <Link
            href="/support-us"
            className="flex flex-1 h-12 sm:h-14 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm sm:text-base uppercase tracking-widest font-black text-white shadow-[0_0_20px_rgba(215,25,32,0.4)] hover:bg-accent transition-colors focus:outline-none min-h-[44px]"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Support Us
            <ChevronRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
