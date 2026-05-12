import Logo from "./Logo.jsx";

/**
 * Dispatch a global event to open one of the legal modals.
 * The modals themselves live in <LegalModals/> mounted in App.jsx.
 */
const openModal = (which) =>
  window.dispatchEvent(new CustomEvent("artx:open-modal", { detail: which }));

const openCookiePrefs = () =>
  window.dispatchEvent(new CustomEvent("artx:open-cookie-preferences"));

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[0.06] bg-black">
      {/* Top — brand + contact */}
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
            className="font-display text-2xl text-white transition-colors hover:text-artx-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-artx-cyan"
          >
            hello@artx.agency
          </a>
          <a
            href="https://artx.agency"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-artx-cyan"
          >
            artx.agency →
          </a>
        </div>
      </div>

      {/* Middle — legal links row (mobile-first) */}
      <nav
        aria-label="Legal"
        className="border-t border-white/[0.05]"
      >
        <ul className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-3 px-6 py-5 text-xs uppercase tracking-[0.18em] text-white/60 lg:px-10">
          <li>
            <button
              type="button"
              onClick={() => openModal("privacy")}
              className="rounded-sm transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-artx-cyan"
            >
              Privacy Policy
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => openModal("cookie")}
              className="rounded-sm transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-artx-cyan"
            >
              Cookie Policy
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => openModal("legal")}
              className="rounded-sm transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-artx-cyan"
            >
              Legal Notice
            </button>
          </li>
          <li className="text-white/30" aria-hidden="true">/</li>
          <li>
            <button
              type="button"
              onClick={openCookiePrefs}
              className="rounded-sm text-artx-cyan/90 transition-colors hover:text-artx-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-artx-cyan"
            >
              Cookie preferences
            </button>
          </li>
        </ul>
      </nav>

      {/* Bottom bar — copyright + build info */}
      <div className="border-t border-white/[0.05]">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-6 py-6 text-[11px] uppercase tracking-[0.25em] text-white/55 sm:flex-row sm:items-center lg:px-10">
          <span>© {year} ArtX Creative Agency. All rights reserved.</span>
          <span className="text-white/55">Designed in-house · Made in Belgium</span>
        </div>
      </div>
    </footer>
  );
}
