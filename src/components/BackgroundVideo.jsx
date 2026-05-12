import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Full-bleed background video for the Hero.
 *
 * Layers (back → front):
 *   1. The looped video (autoPlay, muted, playsInline, loop)
 *   2. A black overlay to keep text legible (configurable opacity)
 *   3. An optional gradient vignette for ArtX brand depth
 *
 * Behaviour:
 *   - Respects `prefers-reduced-motion` → falls back to a static poster
 *   - Pauses the video when the section scrolls offscreen (IntersectionObserver)
 *   - Pauses when the tab is hidden (visibilitychange)
 *   - Fades in only after the first frame has decoded — no flash of empty box
 *
 * Props
 *   src        — URL of the .mp4 (Higgsfield CDN, R2, Vercel Blob…)
 *   poster     — optional poster image shown until video is ready
 *   overlay    — overlay alpha 0..1 (default 0.55)
 *   srcWebm    — optional .webm alternative (smaller, better)
 */
export default function BackgroundVideo({
  src,
  poster,
  srcWebm,
  overlay = 0.55,
  className = "",
}) {
  const videoRef = useRef(null);
  const wrapperRef = useRef(null);
  const [ready, setReady] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const v = videoRef.current;
    const wrapper = wrapperRef.current;
    if (!v || !wrapper) return;

    // Pause when the section leaves the viewport (saves CPU/GPU)
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.05 },
    );
    io.observe(wrapper);

    // Pause when the tab is hidden
    const onVis = () => {
      if (document.hidden) v.pause();
      else v.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [reduceMotion]);

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden bg-black ${className}`}
    >
      {/* Poster fallback (and the only image shown under prefers-reduced-motion) */}
      {poster && (
        <img
          src={poster}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            ready ? "opacity-0" : "opacity-100"
          }`}
        />
      )}

      {/* The looped video — disabled entirely if reduced motion is requested */}
      {!reduceMotion && (
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onLoadedData={() => setReady(true)}
          poster={poster}
        >
          {srcWebm && <source src={srcWebm} type="video/webm" />}
          <source src={src} type="video/mp4" />
        </video>
      )}

      {/* Black overlay — keeps text legible over any frame */}
      <div
        className="absolute inset-0"
        style={{ background: `rgba(0,0,0,${overlay})` }}
      />

      {/* Brand vignette — gentle radial darkening at edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.85) 100%)",
        }}
      />
    </div>
  );
}
