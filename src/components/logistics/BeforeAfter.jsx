import { Eyebrow, Reveal, Section, SectionTitle } from "./ui.jsx";

const before = [
  "Customer sends an e-mail",
  "Employee reads the request",
  "Employee copies data into Excel",
  "Employee searches another system",
  "Employee contacts a colleague",
  "Employee prepares a response",
  "Employee updates the CRM",
  "Manager receives a separate report",
];

const after = [
  "Request is captured automatically",
  "Relevant information is extracted",
  "Data is validated and organised",
  "Tasks are routed to the right person",
  "Draft responses are prepared",
  "Approved systems are updated",
  "Exceptions are flagged for human review",
  "Managers receive structured reporting",
];

function Column({ label, tone, items }) {
  const isAfter = tone === "after";
  return (
    <div
      className={`relative h-full rounded-2xl border p-6 sm:p-8 ${
        isAfter
          ? "border-artx-cyan/25 bg-gradient-to-b from-artx-cyan/[0.07] to-transparent"
          : "border-white/[0.08] bg-white/[0.02]"
      }`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`text-xs uppercase tracking-[0.28em] ${
            isAfter ? "text-artx-cyan" : "text-white/50"
          }`}
        >
          {label}
        </span>
        <span
          aria-hidden="true"
          className={`h-px flex-1 ${isAfter ? "bg-artx-cyan/25" : "bg-white/10"}`}
        />
      </div>

      <ol className="mt-7 space-y-0">
        {items.map((item, i) => (
          <li key={item} className="relative flex gap-4 pb-6 last:pb-0">
            {i < items.length - 1 && (
              <span
                aria-hidden="true"
                className={`absolute left-[13px] top-7 h-full w-px ${
                  isAfter ? "bg-artx-cyan/20" : "bg-white/10"
                }`}
              />
            )}
            <span
              aria-hidden="true"
              className={`relative z-10 mt-0.5 inline-flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold ${
                isAfter
                  ? "border-artx-cyan/40 bg-black text-artx-cyan"
                  : "border-white/15 bg-black text-white/50"
              }`}
            >
              {i + 1}
            </span>
            <span
              className={`text-sm leading-relaxed ${isAfter ? "text-white/85" : "text-white/60"}`}
            >
              {item}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function BeforeAfter() {
  return (
    <Section id="before-after" tone="raised" aria-labelledby="before-after-title">
      <div className="max-w-3xl">
        <Reveal>
          <Eyebrow>Before and after</Eyebrow>
          <SectionTitle id="before-after-title" accent="a connected workflow">
            From fragmented manual work to
          </SectionTitle>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-5 lg:grid-cols-2">
        <Reveal y={24}>
          <Column label="Today" tone="before" items={before} />
        </Reveal>
        <Reveal y={24} delay={0.1}>
          <Column label="With automation" tone="after" items={after} />
        </Reveal>
      </div>

      <Reveal
        y={16}
        delay={0.08}
        className="mt-8 rounded-2xl border border-white/10 bg-white/[0.025] p-6 sm:p-8"
      >
        <p className="max-w-3xl text-base leading-relaxed text-white/85 sm:text-lg">
          The goal is not to remove human judgement. It is to remove the unnecessary
          repetitive work around it.
        </p>
      </Reveal>
    </Section>
  );
}
