import Logo from "./Logo.jsx";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-black">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-10 px-6 py-14 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div className="flex flex-col gap-5">
          <Logo className="h-10 w-auto" />
          <p className="max-w-md text-sm text-white/60">
            ArtX™ — Creative energy, made visible. A multidisciplinary studio working with
            ambitious brands across Europe and beyond.
          </p>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <span className="text-xs uppercase tracking-[0.3em] text-white/55">Reach out</span>
          <a
            href="mailto:hello@artx.agency"
            className="font-display text-2xl text-white transition-colors hover:text-artx-cyan"
          >
            hello@artx.agency
          </a>
          <a
            href="https://artx.agency"
            target="_blank"
            rel="noreferrer"
            className="text-white/50 transition-colors hover:text-white"
          >
            artx.agency →
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.05]">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-6 py-6 text-[11px] uppercase tracking-[0.25em] text-white/55 sm:flex-row sm:items-center lg:px-10">
          <span>© {new Date().getFullYear()} ArtX Creative Agency. All rights reserved.</span>
          <span className="text-white/55">
            Designed in-house · Built with love
          </span>
        </div>
      </div>
    </footer>
  );
}
