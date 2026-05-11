import { useEffect, useState } from "react";
import Logo from "./Logo.jsx";

// IA simplified: the previous "Work" and "About" links pointed to anchors that
// did not exist (or duplicated #services). They will return when the matching
// sections (Portfolio + About) are added in Phase 2.
const nav = [
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/60 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a
          href="#top"
          aria-label="ArtX home"
          className="block rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-artx-cyan"
        >
          <Logo className="h-9 w-auto md:h-11" />
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="group relative rounded-sm px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-artx-cyan"
            >
              {item.label}
              <span
                aria-hidden="true"
                className="absolute inset-x-3 -bottom-px h-px origin-left scale-x-0 bg-artx-gradient transition-transform duration-300 group-hover:scale-x-100"
              />
            </a>
          ))}
          <a
            href="#contact"
            data-cursor="view"
            data-cursor-label="Let's talk"
            className="ml-3 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-artx-cyan"
          >
            Start a project
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="relative h-10 w-10 rounded-full border border-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-artx-cyan md:hidden"
        >
          <span
            aria-hidden="true"
            className={`absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 bg-white transition-transform ${
              open ? "rotate-45" : "-translate-y-1.5"
            }`}
          />
          <span
            aria-hidden="true"
            className={`absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 bg-white transition-transform ${
              open ? "-rotate-45" : "translate-y-1.5"
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`grid overflow-hidden border-t border-white/10 bg-black/90 backdrop-blur-xl transition-[grid-template-rows] duration-500 md:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-1 px-6 py-6">
            {nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-white/80 hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-artx-cyan"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-artx-cyan"
            >
              Start a project →
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
