import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * Magnetic button — the button (and the arrow inside it) is pulled toward
 * the pointer as it nears, then snaps back when the pointer leaves.
 *
 * Built with Framer Motion springs so the motion feels weight-aware.
 */
export default function MagneticButton({
  href,
  children,
  className = "",
  arrow = true,
  cursorLabel,
  variant = "primary",
  strength = 0.35,
}) {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.6 });

  // Arrow follows even more loosely
  const ax = useTransform(sx, (v) => v * 1.4);
  const ay = useTransform(sy, (v) => v * 1.4);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    variant === "primary"
      ? "bg-white text-black hover:[box-shadow:0_10px_40px_-10px_rgba(255,255,255,0.4)]"
      : "border border-white/15 bg-white/[0.02] text-white/90 backdrop-blur hover:border-white/40 hover:bg-white/5";

  return (
    <motion.a
      ref={ref}
      href={href}
      data-cursor="view"
      data-cursor-label={cursorLabel}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={`relative inline-flex items-center gap-3 rounded-full px-7 py-4 text-sm font-semibold transition-colors ${base} ${className}`}
    >
      <span>{children}</span>
      {arrow && (
        <motion.svg
          style={{ x: ax, y: ay }}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M13 5l7 7-7 7" />
        </motion.svg>
      )}
    </motion.a>
  );
}
