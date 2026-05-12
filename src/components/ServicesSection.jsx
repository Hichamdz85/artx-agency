import { motion, useReducedMotion } from "framer-motion";

const services = [
  {
    n: "01",
    title: "Brand Identity & Logo Design",
    blurb:
      "We design identity systems that travel — wordmarks, monograms, type, color, motion, voice. Built to feel iconic from day one.",
    bullets: ["Naming & Verbal Identity", "Logo & Wordmark Design", "Visual System & Guidelines", "Brand Strategy"],
    accent: "from-[#FFD0FE] to-[#8437F5]",
  },
  {
    n: "02",
    title: "Web Design & Development",
    blurb:
      "From editorial single-pages to product platforms — high-craft sites that load fast, score 100 Lighthouse, and convert.",
    bullets: ["UX & UI Design", "Framer / Webflow Builds", "React / Next.js Engineering", "Performance & SEO"],
    accent: "from-[#8437F5] to-[#4B5EFB]",
  },
  {
    n: "03",
    title: "Advertising Campaigns",
    blurb:
      "Campaigns rooted in the brand, expressed through every channel. Insight → big idea → distinctive creative → measurable lift.",
    bullets: ["Campaign Strategy", "Art Direction", "Copywriting", "Media Planning"],
    accent: "from-[#4B5EFB] to-[#00A8FF]",
  },
  {
    n: "04",
    title: "Social, Motion & Strategy",
    blurb:
      "We make the brand alive in feed — from monthly content systems to high-end motion idents and story-driven shorts.",
    bullets: ["Content Systems", "Motion & Animation", "Editorial Direction", "Channel Strategy"],
    accent: "from-[#00A8FF] to-[#00DFFF]",
  },
];

export default function ServicesSection() {
  const shouldReduce = useReducedMotion();

  const cardVariants = shouldReduce
    ? { hidden: { opacity: 1, y: 0 }, show: () => ({ opacity: 1, y: 0, transition: { duration: 0 } }) }
    : {
        hidden: { opacity: 0, y: 40 },
        show: (i) => ({
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
        }),
      };

  return (
    <section id="services" className="relative bg-black py-32 lg:py-40">
      {/* subtle top gradient line */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(132,55,245,0.6) 50%, transparent)",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <motion.div
              initial={shouldReduce ? false : { opacity: 0, y: 20 }}
              whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
              viewport={shouldReduce ? undefined : { once: true, margin: "-100px" }}
              transition={{ duration: shouldReduce ? 0 : 0.7 }}
              className="sticky top-32"
            >
              <span className="text-xs uppercase tracking-[0.3em] text-white/55">
                01 — What we do
              </span>
              <h2 className="mt-6 font-display text-5xl font-black leading-[0.95] tracking-tight text-white md:text-6xl">
                Four crafts. <br />
                <span className="text-artx-gradient italic">One studio.</span>
              </h2>
              <p className="mt-6 max-w-md text-base text-white/60">
                We bring the same level of craft to every layer of the brand — from the
                very first sketch to the final pixel shipped to production.
              </p>

              <a
                href="#contact"
                data-cursor="view"
                data-cursor-label="Brief us"
                className="mt-10 inline-flex items-center gap-2 rounded-sm text-sm font-medium text-white hover:gap-3 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-artx-cyan"
              >
                <span className="border-b border-white/40 pb-1">
                  Talk to us about your project
                </span>
                <svg
                  width="16"
                  height="16"
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

          <div className="lg:col-span-7">
            <div className="grid gap-5 sm:grid-cols-2">
              {services.map((s, i) => (
                <motion.article
                  key={s.n}
                  custom={i}
                  variants={cardVariants}
                  initial={shouldReduce ? false : "hidden"}
                  whileInView={shouldReduce ? undefined : "show"}
                  viewport={shouldReduce ? undefined : { once: true, margin: "-50px" }}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-7 transition-all duration-500 hover:border-white/20 hover:-translate-y-1"
                >
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute -top-32 -right-20 h-56 w-56 rounded-full bg-gradient-to-br ${s.accent} opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-30`}
                  />

                  <div className="relative">
                    <div className="flex items-center justify-between text-xs font-medium uppercase tracking-[0.25em] text-white/55">
                      <span>{s.n}</span>
                      <span
                        aria-hidden="true"
                        className={`h-2 w-2 rounded-full bg-gradient-to-br ${s.accent} opacity-80`}
                      />
                    </div>

                    <h3 className="mt-6 font-display text-2xl font-extrabold leading-tight text-white">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/55">{s.blurb}</p>

                    <ul className="mt-6 space-y-2 text-sm text-white/70">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex items-center gap-2">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-white/30"
                            aria-hidden="true"
                          >
                            <path d="M5 12l5 5L20 7" />
                          </svg>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
