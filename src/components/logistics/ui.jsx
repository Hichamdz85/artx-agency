/**
 * Shared primitives for the /logistics-automation landing page.
 *
 * These wrap the tokens already used across the ArtX site (Grift display type,
 * the Pink → Purple → Cyan gradient, black surfaces, hairline dividers) so the
 * new page reads as native without introducing a second design system.
 */
import { motion, useReducedMotion } from "framer-motion";

/* =========================================================
   Motion — one reveal primitive, reduced-motion aware
   ========================================================= */

/**
 * Fade/slide a block into view once. Collapses to a plain element when the
 * visitor has "prefers-reduced-motion: reduce" set.
 */
export function Reveal({
  as = "div",
  y = 24,
  delay = 0,
  duration = 0.6,
  className = "",
  children,
  ...rest
}) {
  const shouldReduce = useReducedMotion();
  const Tag = motion[as] || motion.div;

  if (shouldReduce) {
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* =========================================================
   Layout
   ========================================================= */

/** Full-bleed black section with the site's hairline top divider. */
export function Section({
  id,
  className = "",
  hairline = true,
  tone = "black",
  children,
  ...rest
}) {
  const bg = tone === "raised" ? "bg-[#050505]" : "bg-black";
  return (
    <section
      id={id}
      className={`relative scroll-mt-24 lg:scroll-mt-28 ${bg} py-20 sm:py-24 lg:py-32 ${className}`}
      {...rest}
    >
      {hairline && (
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(132,55,245,0.55) 50%, transparent)",
          }}
        />
      )}
      <div className="mx-auto max-w-7xl px-6 lg:px-10">{children}</div>
    </section>
  );
}

/** Small uppercase label above a heading. */
export function Eyebrow({ children, className = "" }) {
  return (
    <span className={`block text-xs uppercase tracking-[0.3em] text-white/60 ${className}`}>
      {children}
    </span>
  );
}

/**
 * Section heading. `accent` is rendered in the brand gradient.
 * Always an <h2> — the page has exactly one <h1>, in the hero.
 */
export function SectionTitle({ children, accent, id, className = "" }) {
  return (
    <h2
      id={id}
      className={`mt-6 font-display text-4xl font-black leading-[1.03] tracking-tight text-white sm:text-5xl lg:text-[3.5rem] ${className}`}
    >
      {children}
      {accent ? (
        <>
          {" "}
          <span className="text-artx-gradient italic">{accent}</span>
        </>
      ) : null}
    </h2>
  );
}

/** Supporting paragraph under a section heading. */
export function Lead({ children, className = "" }) {
  return (
    <p className={`mt-6 max-w-2xl text-base leading-relaxed text-white/70 ${className}`}>
      {children}
    </p>
  );
}

/** Bordered surface used by every card on the page. */
export function Card({ as = "div", className = "", children, ...rest }) {
  const Tag = as;
  return (
    <Tag
      className={`rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.045] to-white/[0.012] p-6 sm:p-7 ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Round icon chip used at the top of cards and list rows. */
export function IconChip({ children, className = "" }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/85 ${className}`}
    >
      {children}
    </span>
  );
}

/* =========================================================
   Actions
   ========================================================= */

const baseAction =
  "inline-flex items-center justify-center gap-2.5 rounded-full text-sm font-semibold transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-artx-cyan sm:text-base";

/** White pill — the page's primary conversion action. */
export function PrimaryAction({
  as = "a",
  className = "",
  size = "lg",
  children,
  withArrow = true,
  ...rest
}) {
  const Tag = as;
  const pad = size === "sm" ? "px-5 py-3" : "px-7 py-4 sm:px-8 sm:py-5";
  return (
    <Tag
      className={`group ${baseAction} ${pad} bg-white text-black hover:scale-[1.03] ${className}`}
      {...rest}
    >
      {children}
      {withArrow && <ArrowRight className="transition-transform group-hover:translate-x-1" />}
    </Tag>
  );
}

/** Outlined pill — the page's secondary action. */
export function SecondaryAction({ as = "a", className = "", children, ...rest }) {
  const Tag = as;
  return (
    <Tag
      className={`${baseAction} border border-white/20 px-7 py-4 text-white hover:border-white/45 hover:bg-white/[0.04] sm:px-8 sm:py-5 ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* =========================================================
   Icons — one family: 24×24, 1.6 stroke, round caps/joins.
   All decorative; meaning is carried by the adjacent text.
   ========================================================= */

function Glyph({ children, className = "", size = 22, strokeWidth = 1.6 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {children}
    </svg>
  );
}

export const ArrowRight = (p) => (
  <Glyph size={16} strokeWidth={2.4} {...p}>
    <path d="M5 12h14M13 5l7 7-7 7" />
  </Glyph>
);

export const Check = (p) => (
  <Glyph size={14} strokeWidth={2.6} {...p}>
    <path d="M5 12l5 5L20 7" />
  </Glyph>
);

export const Mail = (p) => (
  <Glyph {...p}>
    <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
    <path d="m3.5 7 7.4 5.3a2 2 0 0 0 2.2 0L20.5 7" />
  </Glyph>
);

export const Document = (p) => (
  <Glyph {...p}>
    <path d="M14 2.5H7A2.5 2.5 0 0 0 4.5 5v14A2.5 2.5 0 0 0 7 21.5h10a2.5 2.5 0 0 0 2.5-2.5V8z" />
    <path d="M14 2.5V8h5.5M8.5 13h7M8.5 17h4.5" />
  </Glyph>
);

export const Database = (p) => (
  <Glyph {...p}>
    <ellipse cx="12" cy="5.5" rx="7.5" ry="3" />
    <path d="M4.5 5.5v13c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-13M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3" />
  </Glyph>
);

export const Chat = (p) => (
  <Glyph {...p}>
    <path d="M20.5 12.5a7.5 7.5 0 0 1-7.5 7.5 8 8 0 0 1-3.4-.75L4.5 21l1.3-4.6A7.5 7.5 0 1 1 20.5 12.5Z" />
    <path d="M9 11.5h6M9 14.5h3.5" />
  </Glyph>
);

export const Report = (p) => (
  <Glyph {...p}>
    <path d="M3.5 20.5h17" />
    <rect x="5" y="12" width="3.5" height="6" rx="1" />
    <rect x="10.25" y="8" width="3.5" height="10" rx="1" />
    <rect x="15.5" y="4.5" width="3.5" height="13.5" rx="1" />
  </Glyph>
);

export const Route = (p) => (
  <Glyph {...p}>
    <circle cx="5.5" cy="6" r="2.5" />
    <circle cx="18.5" cy="18" r="2.5" />
    <path d="M8 6h6a4 4 0 0 1 0 8H10a4 4 0 0 0 0 8h.5" />
  </Glyph>
);

export const Sync = (p) => (
  <Glyph {...p}>
    <path d="M20.5 11a8.5 8.5 0 0 0-14.9-4.6L3 9" />
    <path d="M3 4.5V9h4.5M3.5 13a8.5 8.5 0 0 0 14.9 4.6L21 15" />
    <path d="M21 19.5V15h-4.5" />
  </Glyph>
);

export const Clock = (p) => (
  <Glyph {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </Glyph>
);

export const Search = (p) => (
  <Glyph {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4.5 4.5" />
  </Glyph>
);

export const Shield = (p) => (
  <Glyph {...p}>
    <path d="M12 2.8 4.5 6v6c0 4.5 3.1 8.1 7.5 9.3 4.4-1.2 7.5-4.8 7.5-9.3V6z" />
    <path d="m9 12 2.2 2.2L15.5 10" />
  </Glyph>
);

export const Lock = (p) => (
  <Glyph {...p}>
    <rect x="4.5" y="10" width="15" height="10.5" rx="2.5" />
    <path d="M8 10V7.5a4 4 0 0 1 8 0V10" />
  </Glyph>
);

export const Users = (p) => (
  <Glyph {...p}>
    <circle cx="9.5" cy="8" r="3.5" />
    <path d="M2.5 20a7 7 0 0 1 14 0M17 5.2a3.5 3.5 0 0 1 0 6.6M18 14.4a6.5 6.5 0 0 1 3.5 5.6" />
  </Glyph>
);

export const Globe = (p) => (
  <Glyph {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.5 12h17M12 3.5c2.2 2.4 3.3 5.3 3.3 8.5s-1.1 6.1-3.3 8.5c-2.2-2.4-3.3-5.3-3.3-8.5s1.1-6.1 3.3-8.5Z" />
  </Glyph>
);

export const Layers = (p) => (
  <Glyph {...p}>
    <path d="m12 3 8.5 4.5L12 12 3.5 7.5 12 3Z" />
    <path d="m3.5 12.2 8.5 4.5 8.5-4.5M3.5 16.7l8.5 4.5 8.5-4.5" />
  </Glyph>
);

export const Alert = (p) => (
  <Glyph {...p}>
    <path d="M12 4.2 21 19.5H3L12 4.2Z" />
    <path d="M12 10v3.8M12 16.8h.01" />
  </Glyph>
);

export const Spark = (p) => (
  <Glyph {...p}>
    <path d="M12 3.2 13.9 9l5.8 1.9-5.8 1.9L12 18.6 10.1 12.8 4.3 10.9 10.1 9 12 3.2Z" />
    <path d="M18.5 3.5v3M20 5h-3" />
  </Glyph>
);

export const Plus = (p) => (
  <Glyph size={18} strokeWidth={2} {...p}>
    <path d="M12 5v14M5 12h14" />
  </Glyph>
);

export const ChevronDown = (p) => (
  <Glyph size={16} strokeWidth={2} {...p}>
    <path d="m6 9 6 6 6-6" />
  </Glyph>
);
