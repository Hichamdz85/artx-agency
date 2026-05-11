/**
 * "Trusted by" infinite marquee.
 *
 * Logos are placeholder names rendered as stylized wordmarks — drop in real
 * client logos by replacing the strings below or rendering <img/> instead.
 */
const clients = [
  { name: "NORTHWIND", style: "tracking-[0.25em] font-black" },
  { name: "Lumière", style: "italic font-medium" },
  { name: "FORM·STUDIO", style: "tracking-[0.2em] font-semibold" },
  { name: "Hypernova", style: "font-extrabold" },
  { name: "MERIDIAN", style: "tracking-[0.3em] font-light" },
  { name: "kairos.", style: "lowercase font-black" },
  { name: "Vantablack™", style: "font-medium" },
  { name: "ECLIPSE", style: "tracking-[0.18em] font-extrabold" },
  { name: "obsidian", style: "lowercase tracking-[0.15em] font-semibold" },
  { name: "PARADISO", style: "tracking-[0.25em] italic font-medium" },
];

export default function TrustedBy() {
  const row = [...clients, ...clients]; // duplicate for seamless loop

  return (
    <section className="relative overflow-hidden border-y border-white/[0.06] bg-black py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-center gap-4">
          <span className="text-xs uppercase tracking-[0.4em] text-white/40">
            Trusted by ambitious teams
          </span>
          <p className="max-w-xl text-center text-sm text-white/30">
            From early-stage founders to international brand teams — a few of the
            studios, labels and operators we've designed with.
          </p>
        </div>
      </div>

      {/* Marquee */}
      <div className="relative mt-14">
        {/* Fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-black to-transparent" />

        <div className="flex w-max animate-marquee gap-16 whitespace-nowrap">
          {row.map((c, i) => (
            <span
              key={i}
              className={`font-display text-2xl text-white/55 transition-colors hover:text-white md:text-3xl ${c.style}`}
            >
              {c.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
