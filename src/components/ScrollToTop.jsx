import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * Floating "Back to top" button.
 *
 * • Appears once the user has scrolled past 480 px.
 * • Smooth scroll on click (or instant if prefers-reduced-motion is on).
 * • Positioned bottom-right with safe-area padding for iOS.
 * • Uses a passive scroll listener with rAF throttling for jank-free updates.
 */
export default function ScrollToTop({ threshold = 480 }) {
  const [visible, setVisible] = useState(false);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setVisible(window.scrollY > threshold);
        ticking = false;
      });
    };
    onScroll(); // sync initial state on mount (refresh mid-page)
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  const goTop = () => {
    if (shouldReduce) {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={goTop}
          aria-label="Back to top"
          data-cursor="view"
          data-cursor-label="Top"
          initial={{ opacity: 0, scale: shouldReduce ? 1 : 0.6, y: shouldReduce ? 0 : 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: shouldReduce ? 1 : 0.6, y: shouldReduce ? 0 : 12 }}
          transition={{ duration: shouldReduce ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
          whileHover={shouldReduce ? undefined : { scale: 1.08 }}
          whileTap={shouldReduce ? undefined : { scale: 0.95 }}
          className="fixed bottom-5 right-5 z-[55] flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white text-black shadow-[0_8px_28px_-8px_rgba(132,55,245,0.5)] backdrop-blur-md transition-colors hover:border-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-artx-cyan sm:bottom-8 sm:right-8 sm:h-14 sm:w-14"
          style={{
            paddingBottom: "env(safe-area-inset-bottom)",
            paddingRight: "env(safe-area-inset-right)",
          }}
        >
          {/* Animated brand gradient ring under the white face */}
          <span
            aria-hidden="true"
            className="absolute inset-[-2px] -z-10 rounded-full opacity-90 blur-[6px]"
            style={{
              background:
                "conic-gradient(from 0deg, #FFD0FE, #8437F5, #00A8FF, #FFD0FE)",
            }}
          />
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
