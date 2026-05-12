import { motion, useReducedMotion } from "framer-motion";
import FlowArt, { FlowSection } from "./FlowArt.jsx";
import { ArtXMark } from "./Logo.jsx";

/**
 * Manifesto — three sequential "stages" that flip into view as the user
 * scrolls, each landing on a brand pillar.
 *
 *   Stage 1 — "art is the craft."     →  The art (rigour, restraint)
 *   Stage 2 — "x is the variable."    →  The x   (adaptability)
 *   Stage 3 — "Built every single day." →  The result (output, delivery)
 *
 * Visual treatment per stage:
 *   - Pure black canvas (unified across stages → feels like one room).
 *   - A unique ambient orb positioned differently each stage.
 *   - Massive Grift typography. Italic word in artx gradient — the same trick
 *     already used in Hero, Services, CTA → maintains the brand signature.
 *   - A subtle X mark watermark, faded, drifting on each stage.
 *
 * The whole sequence is wrapped in <FlowArt>, which applies the Card-Stack
 * pin + rotation effect on ≥768px without reduced motion.
 */

const Eyebrow = ({ children }) => (
  <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/45 sm:text-xs">
    <span aria-hidden="true" className="h-px w-10 bg-white/30" />
    <span>{children}</span>
  </div>
);

const Headline = ({ plain, accent }) => (
  <h2 className="mt-8 font-display text-[clamp(2.75rem,8vw,8.5rem)] font-black leading-[0.92] tracking-[-0.035em] text-white">
    {plain}{" "}
    <span className="italic text-artx-gradient">{accent}</span>
  </h2>
);

const Body = ({ children }) => (
  <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
    {children}
  </p>
);

const Tags = ({ items }) => (
  <ul className="mt-10 flex flex-wrap gap-2.5">
    {items.map((t) => (
      <li
        key={t}
        className="rounded-full border border-white/15 bg-white/[0.03] px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm"
      >
        {t}
      </li>
    ))}
  </ul>
);

/* ─── Stage-specific backdrops ────────────────────────────────────────────── */

function StageBackdrop({ variant }) {
  // Each stage gets a different orb position + a different X-mark angle.
  // Together they make the three stages feel related but not identical.
  const config = {
    1: {
      orb: "absolute right-[-10%] top-[-10%] h-[40rem] w-[40rem] blur-[140px]",
      orbBg: "radial-gradient(circle at center, #FFD0FE 0%, transparent 65%)",
      orbOpacity: "opacity-25",
      markPos: "right-[-12%] top-1/2 -translate-y-1/2 rotate-[8deg]",
    },
    2: {
      orb: "absolute left-1/2 top-1/2 h-[48rem] w-[48rem] -translate-x-1/2 -translate-y-1/2 blur-[160px]",
      orbBg: "radial-gradient(circle at center, #8437F5 0%, transparent 60%)",
      orbOpacity: "opacity-30",
      markPos: "left-[-15%] top-1/2 -translate-y-1/2 -rotate-[12deg]",
    },
    3: {
      orb: "absolute left-[-10%] bottom-[-20%] h-[46rem] w-[46rem] blur-[150px]",
      orbBg: "radial-gradient(circle at center, #00A8FF 0%, transparent 65%)",
      orbOpacity: "opacity-30",
      markPos: "right-[-8%] bottom-[-20%] rotate-[18deg]",
    },
  }[variant];

  return (
    <>
      <div
        aria-hidden="true"
        className={`pointer-events-none rounded-full ${config.orb} ${config.orbOpacity}`}
        style={{ background: config.orbBg }}
      />
      <ArtXMark
        className={`pointer-events-none absolute hidden h-[80vh] w-auto opacity-[0.05] md:block ${config.markPos}`}
      />
      {/* Top hairline separator between stacked stages */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.18) 50%, transparent)",
        }}
      />
    </>
  );
}

/* ─── Each stage as a self-contained motion block ─────────────────────────── */

function Stage1() {
  const shouldReduce = useReducedMotion();
  const enter = (delay = 0) =>
    shouldReduce
      ? { initial: false, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 24, filter: "blur(8px)" },
          whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
          viewport: { once: true, margin: "-20%" },
          transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
        };

  return (
    <FlowSection aria-label="Stage one — art">
      <StageBackdrop variant={1} />
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <motion.div {...enter(0)}>
          <Eyebrow>01 — The art</Eyebrow>
        </motion.div>
        <motion.div {...enter(0.1)}>
          <Headline plain="art is" accent="the craft." />
        </motion.div>
        <motion.div {...enter(0.25)}>
          <Body>
            Type. Color. Composition. Restraint. Every decision serves the brand;
            every pixel pulls its weight. We don't decorate brands — we draw them
            so sharply they can't be ignored.
          </Body>
        </motion.div>
        <motion.div {...enter(0.4)}>
          <Tags items={["Typography", "Identity systems", "Restraint", "Detail"]} />
        </motion.div>
      </div>
    </FlowSection>
  );
}

function Stage2() {
  const shouldReduce = useReducedMotion();
  const enter = (delay = 0) =>
    shouldReduce
      ? { initial: false, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 24, filter: "blur(8px)" },
          whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
          viewport: { once: true, margin: "-20%" },
          transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
        };

  return (
    <FlowSection aria-label="Stage two — x">
      <StageBackdrop variant={2} />
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <motion.div {...enter(0)}>
          <Eyebrow>02 — The x</Eyebrow>
        </motion.div>
        <motion.div {...enter(0.1)}>
          <Headline plain="x is" accent="the variable." />
        </motion.div>
        <motion.div {...enter(0.25)}>
          <Body>
            The unknown problem. The new audience. The next medium. We thrive on
            what the brief can't fully describe — and ship a system that adapts
            instead of a single artefact that won't.
          </Body>
        </motion.div>
        <motion.div {...enter(0.4)}>
          <Tags items={["Adaptive", "Multidisciplinary", "Strategy", "Systems"]} />
        </motion.div>
      </div>
    </FlowSection>
  );
}

function Stage3() {
  const shouldReduce = useReducedMotion();
  const enter = (delay = 0) =>
    shouldReduce
      ? { initial: false, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 24, filter: "blur(8px)" },
          whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
          viewport: { once: true, margin: "-20%" },
          transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
        };

  return (
    <FlowSection aria-label="Stage three — built every day">
      <StageBackdrop variant={3} />
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <motion.div {...enter(0)}>
          <Eyebrow>03 — The output</Eyebrow>
        </motion.div>
        <motion.div {...enter(0.1)}>
          <Headline plain="Built" accent="every single day." />
        </motion.div>
        <motion.div {...enter(0.25)}>
          <Body>
            Brand identities. Logos. Websites. Campaigns. Motion. Strategy.
            Everything we touch comes out feeling alive — because it's made by
            people who care that much, every single day.
          </Body>
        </motion.div>
        <motion.div
          {...enter(0.4)}
          className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
        >
          <a
            href="#services"
            data-cursor="view"
            data-cursor-label="See"
            className="group inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-semibold text-black transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-artx-cyan"
          >
            See what we do
            <svg
              className="transition-transform group-hover:translate-x-1"
              width="16"
              height="16"
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
            href="#contact"
            data-cursor="view"
            data-cursor-label="Talk"
            className="group inline-flex items-center gap-2 rounded-sm text-sm font-medium text-white/80 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-artx-cyan"
          >
            <span className="border-b border-white/30 pb-1">
              or brief us directly
            </span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </div>
    </FlowSection>
  );
}

export default function ManifestoFlow() {
  return (
    <FlowArt aria-label="ArtX manifesto">
      <Stage1 />
      <Stage2 />
      <Stage3 />
    </FlowArt>
  );
}
