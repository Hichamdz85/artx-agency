import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * Accessible modal dialog.
 *
 * Features:
 *   • Closes on Escape and on backdrop click.
 *   • Locks body scroll while open.
 *   • Returns focus to the previously-focused element when closed.
 *   • Traps focus inside the dialog.
 *   • Respects prefers-reduced-motion.
 *
 * Props
 *   open       — boolean
 *   onClose    — callback
 *   title      — string (used in aria-labelledby + visible heading)
 *   children   — body content
 *   maxWidth   — Tailwind max-w-* class (default "max-w-3xl")
 */
export default function Modal({ open, onClose, title, children, maxWidth = "max-w-3xl" }) {
  const dialogRef = useRef(null);
  const previouslyFocused = useRef(null);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement;
    document.body.style.overflow = "hidden";

    const focusables = () =>
      dialogRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      ) ?? [];

    // Move focus into the dialog after mount.
    setTimeout(() => {
      const list = focusables();
      (list[0] || dialogRef.current)?.focus();
    }, 50);

    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "Tab") {
        const list = Array.from(focusables());
        if (list.length === 0) return;
        const first = list[0];
        const last = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previouslyFocused.current?.focus?.();
    };
  }, [open, onClose]);

  const dur = shouldReduce ? 0 : 0.25;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: dur }}
          className="fixed inset-0 z-[80] flex items-end justify-center bg-black/70 p-0 backdrop-blur-md sm:items-center sm:p-6"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            tabIndex={-1}
            initial={{ y: shouldReduce ? 0 : 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: shouldReduce ? 0 : 12, opacity: 0 }}
            transition={{ duration: dur, ease: [0.22, 1, 0.36, 1] }}
            className={`relative w-full ${maxWidth} max-h-[92dvh] overflow-hidden rounded-t-2xl border border-white/10 bg-[#0a0a0a] shadow-2xl sm:rounded-2xl`}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-white/[0.08] bg-[#0a0a0a]/95 px-6 py-4 backdrop-blur-md">
              <h2
                id="modal-title"
                className="font-display text-xl font-extrabold tracking-tight text-white sm:text-2xl"
              >
                {title}
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-artx-cyan"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="max-h-[calc(92dvh-4rem)] overflow-y-auto px-6 py-6 text-sm leading-relaxed text-white/75 sm:px-8 sm:py-8 sm:text-base">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
