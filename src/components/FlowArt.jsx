import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Card Stack Reveal — scroll-driven stage transitions for storytelling.
 *
 * MECHANICS (adapted from the original FlowArt pattern):
 *   1. Each <FlowSection> is laid out at min-h-screen.
 *   2. Every section after the first starts rotated +30° around its bottom-left
 *      corner. As the user scrolls it into the bottom of the viewport, the
 *      rotation eases to 0° (mounted to scroll position with `scrub`).
 *   3. Every section except the last is pinned at its end position while the
 *      next section's reveal completes — so the eye dwells on each "stage".
 *
 * INTEGRATION NOTES FOR ArtX:
 *   - DISABLED on viewport < 768px → natural stacking scroll on mobile.
 *   - DISABLED when prefers-reduced-motion is enabled.
 *   - `scrub: 0.5` (not `true`) softens the rotation so fast scrolls don't
 *     resolve the entire flip in 1 frame.
 *   - The wrapper's transform-origin is bottom-left to mimic a page being
 *     lifted from its bottom corner — feels tactile, not gimmicky.
 *
 * USAGE:
 *   <FlowArt aria-label="Manifesto">
 *     <FlowSection>…stage 1…</FlowSection>
 *     <FlowSection>…stage 2…</FlowSection>
 *     <FlowSection>…stage 3…</FlowSection>
 *   </FlowArt>
 */

function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

export function FlowSection({ className, style = {}, children, "aria-label": ariaLabel }) {
  return (
    <section
      data-flow-section
      aria-label={ariaLabel}
      className={cx(
        "relative isolate min-h-screen w-full overflow-hidden bg-black",
        className,
      )}
    >
      <div
        data-flow-inner
        className="flow-art-container relative flex min-h-screen w-full flex-col justify-center gap-6 px-[6vw] py-[clamp(2rem,8vw,4vw)] will-change-transform"
        style={{ transformOrigin: "bottom left", ...style }}
      >
        {children}
      </div>
    </section>
  );
}

export default function FlowArt({ children, className, "aria-label": ariaLabel = "Story" }) {
  const containerRef = useRef(null);
  const [enabled, setEnabled] = useState(true);

  // Determine whether to enable the pin+rotation effect.
  // Disabled on touch/narrow viewports OR if the user prefers reduced motion.
  useEffect(() => {
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqWide = window.matchMedia("(min-width: 768px)");
    const update = () => setEnabled(mqWide.matches && !mqMotion.matches);
    update();
    mqMotion.addEventListener("change", update);
    mqWide.addEventListener("change", update);
    return () => {
      mqMotion.removeEventListener("change", update);
      mqWide.removeEventListener("change", update);
    };
  }, []);

  useGSAP(
    () => {
      if (!containerRef.current || !enabled) return;

      const sections = Array.from(
        containerRef.current.querySelectorAll("[data-flow-section]"),
      );
      if (sections.length === 0) return;

      sections.forEach((section, i) => {
        // Layer order — later sections stack on top.
        gsap.set(section, { zIndex: i + 1 });
        const inner = section.querySelector(".flow-art-container");
        if (!inner) return;

        // Every section after the first starts tilted up from its bottom-left.
        if (i > 0) {
          gsap.set(inner, { rotation: 30, transformOrigin: "bottom left" });
          gsap.to(inner, {
            rotation: 0,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "top 20%",
              scrub: 0.5, // smooth instead of frame-locked
            },
          });
        }

        // Every section except the last pins at its bottom so the next stage
        // overlays it during reveal.
        if (i < sections.length - 1) {
          ScrollTrigger.create({
            trigger: section,
            start: "bottom bottom",
            end: "bottom top",
            pin: true,
            pinSpacing: false,
          });
        }
      });

      // Make sure measurements are correct after fonts and images have loaded.
      ScrollTrigger.refresh();
    },
    { scope: containerRef, dependencies: [enabled] },
  );

  return (
    <div
      ref={containerRef}
      aria-label={ariaLabel}
      className={cx("relative w-full overflow-x-hidden bg-black", className)}
    >
      {children}
    </div>
  );
}
