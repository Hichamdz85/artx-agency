import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  readConsent,
  writeConsent,
  acceptAll,
  rejectAll,
  hasDecided,
} from "../lib/consent.js";
import { cookieInventory } from "../lib/company.js";
import Modal from "./Modal.jsx";

/**
 * GDPR + ePrivacy cookie consent UI for ArtX.
 *
 * Two surfaces:
 *   1. A small banner at the bottom-right shown until the user has decided.
 *      The banner exposes three equal-prominence actions:
 *         • Accept all          (recommended visually, but no dark-pattern lift)
 *         • Reject all
 *         • Customize          (opens the preferences modal)
 *   2. A preferences <Modal> with one toggle per non-essential category.
 *
 * The component is controllable from outside: it listens for a custom event
 *   `artx:open-cookie-preferences`
 * so the footer link can re-open the preferences modal at any time.
 */
export default function CookieConsent() {
  const shouldReduce = useReducedMotion();
  const [decided, setDecided] = useState(true); // assume decided to avoid SSR flash
  const [showPrefs, setShowPrefs] = useState(false);
  const [draft, setDraft] = useState({ analytics: false, marketing: false });

  // Hydrate after mount.
  useEffect(() => {
    setDecided(hasDecided());
    const c = readConsent();
    setDraft({
      analytics: c.categories.analytics,
      marketing: c.categories.marketing,
    });

    const handleReopen = () => setShowPrefs(true);
    window.addEventListener("artx:open-cookie-preferences", handleReopen);
    return () => window.removeEventListener("artx:open-cookie-preferences", handleReopen);
  }, []);

  const finish = () => setDecided(true);

  const handleAcceptAll = () => {
    acceptAll();
    finish();
    setShowPrefs(false);
  };
  const handleRejectAll = () => {
    rejectAll();
    finish();
    setShowPrefs(false);
  };
  const handleSave = () => {
    writeConsent({ categories: draft });
    finish();
    setShowPrefs(false);
  };

  return (
    <>
      {/* ── Banner ───────────────────────────────────────────────────── */}
      <AnimatePresence>
        {!decided && (
          <motion.div
            role="region"
            aria-label="Cookie consent"
            initial={{ y: shouldReduce ? 0 : 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: shouldReduce ? 0 : 80, opacity: 0 }}
            transition={{ duration: shouldReduce ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 bottom-4 z-[70] sm:left-auto sm:right-6 sm:bottom-6 sm:w-[26rem]"
          >
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]/95 p-5 shadow-2xl backdrop-blur-xl">
              <p className="font-display text-base font-extrabold tracking-tight text-white">
                Cookies, briefly.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                We use only the essentials to make this site work. With your permission we
                also enable optional analytics so we can improve it. You're in charge — you
                can change this anytime.
              </p>

              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:gap-2">
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-black transition-transform hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-artx-cyan"
                >
                  Accept all
                </button>
                <button
                  type="button"
                  onClick={handleRejectAll}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.03] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-artx-cyan"
                >
                  Reject all
                </button>
              </div>

              <button
                type="button"
                onClick={() => setShowPrefs(true)}
                className="mt-3 text-xs font-medium text-white/60 underline underline-offset-4 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-artx-cyan"
              >
                Customize preferences →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Preferences modal ────────────────────────────────────────── */}
      <Modal
        open={showPrefs}
        onClose={() => setShowPrefs(false)}
        title="Cookie preferences"
        maxWidth="max-w-2xl"
      >
        <p className="mb-6 text-sm leading-relaxed text-white/65">
          Pick what you're comfortable with. Essential cookies stay on because the site
          needs them to work. The other categories only run when you turn them on.
        </p>

        {Object.entries(cookieInventory).map(([key, cat]) => (
          <div
            key={key}
            className="mb-3 flex items-start justify-between gap-4 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4"
          >
            <div className="min-w-0">
              <p className="font-display text-base font-extrabold text-white">{cat.name}</p>
              <p className="mt-1 text-sm text-white/65">{cat.description}</p>
            </div>
            <Toggle
              ariaLabel={`${cat.name} cookies`}
              checked={cat.required ? true : draft[key] ?? false}
              disabled={cat.required}
              onChange={(v) => setDraft((d) => ({ ...d, [key]: v }))}
            />
          </div>
        ))}

        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-artx-cyan"
          >
            Save my preferences
          </button>
          <button
            type="button"
            onClick={handleAcceptAll}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-artx-cyan"
          >
            Accept all
          </button>
          <button
            type="button"
            onClick={handleRejectAll}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-artx-cyan"
          >
            Reject all
          </button>
        </div>

        <p className="mt-6 text-xs text-white/45">
          You can reopen this panel any time via the "Cookie preferences" link in the
          footer. See our full{" "}
          <button
            type="button"
            onClick={() =>
              window.dispatchEvent(new CustomEvent("artx:open-modal", { detail: "cookie" }))
            }
            className="text-artx-cyan underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-artx-cyan"
          >
            Cookie Policy
          </button>{" "}
          and{" "}
          <button
            type="button"
            onClick={() =>
              window.dispatchEvent(new CustomEvent("artx:open-modal", { detail: "privacy" }))
            }
            className="text-artx-cyan underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-artx-cyan"
          >
            Privacy Policy
          </button>{" "}
          for details.
        </p>
      </Modal>
    </>
  );
}

function Toggle({ checked, disabled, onChange, ariaLabel }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-artx-cyan ${
        checked
          ? "border-artx-cyan bg-artx-cyan/30"
          : "border-white/20 bg-white/[0.05]"
      } ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
    >
      <span
        aria-hidden="true"
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}
