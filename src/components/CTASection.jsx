import { motion, useReducedMotion } from "framer-motion";

export default function CTASection() {
  const shouldReduce = useReducedMotion();

  const enter = (yOffset = 20, delay = 0, duration = 0.7) =>
    shouldReduce
      ? { initial: false, animate: { opacity: 1, y: 0 }, transition: { duration: 0 } }
      : {
          initial: { opacity: 0, y: yOffset },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration, delay },
        };

  return (
    <section id="contact" className="relative overflow-hidden bg-black py-32 lg:py-44">
      {/* Background gradient orb */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[60rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[160px]"
        style={{
          background:
            "radial-gradient(circle at center, #8437F5 0%, #00A8FF 40%, transparent 70%)",
        }}
      />

      {/* Top divider line */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.3) 50%, transparent)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center lg:px-10">
        <motion.span {...enter(16, 0, 0.6)} className="text-xs uppercase tracking-[0.3em] text-white/50">
          Let's make something unforgettable
        </motion.span>

        <motion.h2
          {...enter(24, 0.1, 0.8)}
          className="mt-8 font-display text-5xl font-black leading-[0.95] tracking-tight text-white sm:text-7xl md:text-8xl"
        >
          Got a project?
          <br />
          <span className="text-artx-gradient italic">Let's talk.</span>
        </motion.h2>

        <motion.p {...enter(20, 0.2, 0.7)} className="mx-auto mt-8 max-w-xl text-base text-white/60">
          Tell us about your brand, the audience you want to reach, and the impact you want
          to leave. We reply within 24 hours.
        </motion.p>

        <motion.div
          {...enter(20, 0.3, 0.7)}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="mailto:hello@artx.agency?subject=New%20project%20enquiry"
            data-cursor="view"
            data-cursor-label="Send"
            className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-5 text-base font-semibold text-black transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-artx-cyan"
          >
            hello@artx.agency
            <svg
              className="transition-transform group-hover:translate-x-1"
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
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
          <a
            href="#services"
            className="rounded-sm text-sm text-white/60 underline-offset-4 hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-artx-cyan"
          >
            or browse what we do →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
