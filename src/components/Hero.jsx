import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import AnimatedBackground from "./AnimatedBackground.jsx";
import BackgroundVideo from "./BackgroundVideo.jsx";
import { ArtXMark } from "./Logo.jsx";
import MagneticButton from "./MagneticButton.jsx";
import SplitText from "./SplitText.jsx";
import { heroVideo } from "../lib/heroVideo.js";

export default function Hero() {
  const ref = useRef(null);
  const shouldReduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax — content drifts up; background X drifts in opposite direction.
  // When the user prefers reduced motion, freeze all transforms.
  const yContent = useTransform(scrollYProgress, [0, 1], shouldReduce ? [0, 0] : [0, -120]);
  const yBgMark = useTransform(scrollYProgress, [0, 1], shouldReduce ? [0, 0] : [0, 220]);
  const opacityContent = useTransform(
    scrollYProgress,
    [0, 0.7, 1],
    shouldReduce ? [1, 1, 1] : [1, 1, 0],
  );
  const scaleBgMark = useTransform(scrollYProgress, [0, 1], shouldReduce ? [1, 1] : [1, 1.15]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden bg-black px-6 pb-16 pt-28 lg:px-10 lg:pb-20"
    >
      {heroVideo.enabled && heroVideo.src ? (
        <BackgroundVideo
          src={heroVideo.src}
          srcWebm={heroVideo.srcWebm}
          poster={heroVideo.poster}
          overlay={heroVideo.overlay}
        />
      ) : (
        <AnimatedBackground />
      )}

      {/* Background "X" — drifts on scroll. Hidden below lg to reduce visual dominance on tablet. */}
      <motion.div
        style={{ y: yBgMark, scale: scaleBgMark }}
        className="pointer-events-none absolute right-[-18%] top-1/2 hidden -translate-y-1/2 lg:block"
        aria-hidden="true"
      >
        <ArtXMark className="h-[110vh] w-auto opacity-[0.06]" />
      </motion.div>

      {/* Main content */}
      <motion.div
        style={{ y: yContent, opacity: opacityContent }}
        className="relative z-10 mx-auto w-full max-w-7xl"
      >
        {/* Eyebrow */}
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduce ? 0 : 0.7 }}
          className="mb-6 flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/50 sm:text-xs"
        >
          <span className="relative flex h-2 w-2">
            <span
              aria-hidden="true"
              className={`absolute inline-flex h-full w-full rounded-full bg-artx-cyan opacity-75 ${shouldReduce ? "" : "animate-ping"}`}
            />
            <span aria-hidden="true" className="relative inline-flex h-2 w-2 rounded-full bg-artx-cyan" />
          </span>
          <span>Creative Agency</span>
          <span className="text-white/20" aria-hidden="true">/</span>
          <span>Est. 2019</span>
          <span className="hidden text-white/20 sm:inline" aria-hidden="true">/</span>
          <span className="hidden sm:inline">Europe → Worldwide</span>
        </motion.div>

        {/* Headline — split-text reveal.
            Clamp tuned so the third line ("unforgettable.") stays above the fold
            on every viewport down to ~700px tall.
            Note: the gradient line is rendered as a single motion.span instead of
            SplitText because the gradient text-fill is broken by SplitText's
            nested inline-block transforms (background-clip: text needs a flat
            text node to clip against). */}
        <h1 className="font-display text-[clamp(2.5rem,7vw,7rem)] font-black leading-[0.95] tracking-[-0.03em] text-white">
          <SplitText as="span" delay={0} className="block">
            Design
          </SplitText>
          <SplitText as="span" delay={0.2} className="block">
            that makes brands
          </SplitText>
          <motion.span
            initial={shouldReduce ? false : { opacity: 0, y: 18, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: shouldReduce ? 0 : 0.7,
              delay: shouldReduce ? 0 : 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="block italic text-artx-gradient"
          >
            unforgettable.
          </motion.span>
        </h1>

        {/* Sub copy */}
        <motion.p
          initial={shouldReduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: shouldReduce ? 0 : 0.7,
            delay: shouldReduce ? 0 : 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-8 max-w-2xl text-base leading-relaxed text-white/65 md:text-lg"
        >
          We're a multidisciplinary creative agency working with ambitious teams across
          Europe and beyond. We design brand identities, logos, websites and campaigns
          that don't blend in.{" "}
          <span className="text-white">art is the craft. x is the variable.</span> Together,
          they're what we build every day.
        </motion.p>

        {/* CTAs — magnetic */}
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduce ? 0 : 0.6, delay: shouldReduce ? 0 : 1.1 }}
          className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
        >
          <MagneticButton href="#contact" cursorLabel="Go" variant="primary">
            Start a project
          </MagneticButton>
          <MagneticButton
            href="#services"
            cursorLabel="Explore"
            variant="ghost"
            arrow={false}
          >
            See what we do
          </MagneticButton>
        </motion.div>

        {/*
          TODO (Phase 2): Stats strip — add real, verifiable metrics once Portfolio
          is in place (years building brands, projects shipped, industries served).
          Removed temporarily because previous values were placeholder.
        */}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={shouldReduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: shouldReduce ? 0 : 1.4, duration: shouldReduce ? 0 : 0.8 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
        aria-hidden="true"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] text-white/40">Scroll</span>
        <div className="relative h-10 w-px overflow-hidden bg-white/15">
          <div className={`absolute inset-x-0 top-0 h-1/2 bg-white ${shouldReduce ? "" : "animate-float"}`} />
        </div>
      </motion.div>
    </section>
  );
}
