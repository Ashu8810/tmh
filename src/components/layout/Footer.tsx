import Link from "next/link";


const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#050505] border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand Section */}
          <div className="flex flex-col gap-6 lg:col-span-1">
            <Link href="/" className="flex items-center group w-fit">
              <img
                src="/images/logo.webp"
                alt="Motor Head Logo"
                className="h-12 w-auto pr-3 object-contain"
              />
              <div className="h-10 w-[1px] bg-white/10"></div>
              <div className="flex flex-col justify-center pl-3">
                <span className="font-heading text-xl leading-none font-bold uppercase tracking-[0.2em] text-white">
                  MOTOR HEADS
                </span>
                <span className="text-[8px] mt-1 font-medium text-muted-foreground tracking-[0.25em] uppercase">
                  BMSIT&M Racing Team
                </span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              We design, build, and race high-performance vehicles. Driven by passion, fueled by engineering excellence.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground hover:text-white hover:border-primary hover:bg-primary/10 transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-[18px] h-[18px]" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground hover:text-white hover:border-primary hover:bg-primary/10 transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-[18px] h-[18px]" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-6">
            <h4 className="font-heading font-bold uppercase tracking-widest text-white">
              Explore
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { name: "About Us", href: "/about" },
                { name: "Vehicles", href: "/vehicles" },
                { name: "The Team", href: "/team" },
                { name: "Events", href: "/events" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary/50 block" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="flex flex-col gap-6">
            <h4 className="font-heading font-bold uppercase tracking-widest text-white">
              Resources
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { name: "Resources Vault", href: "/resources" },
                { name: "Media Gallery", href: "/media" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary/50 block" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Section */}
          <div className="flex flex-col sm:flex-row gap-4 lg:justify-end lg:items-start mt-6 lg:mt-0">
            <Link
              href="/join"
              className="inline-flex items-center justify-center gap-3 px-6 py-3 border border-white/20 rounded-md bg-[#050505] text-white font-heading font-bold text-sm uppercase tracking-[0.1em] hover:bg-white hover:text-black transition-colors w-full sm:w-auto whitespace-nowrap"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              JOIN MOTOR HEAD
            </Link>
            <Link
              href="/support-us"
              className="inline-flex items-center justify-center gap-3 px-6 py-3 rounded-md bg-[#D71920] text-white font-heading font-bold text-sm uppercase tracking-[0.1em] hover:bg-[#b0141a] transition-colors w-full sm:w-auto whitespace-nowrap"
            >
              SUPPORT US
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </Link>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground/60 font-medium">
          <p>&copy; {currentYear} MOTOR HEADS BMSIT&M. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
