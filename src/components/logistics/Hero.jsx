import { track } from "../../lib/analytics.js";
import { BASED_IN_STATEMENT } from "../../lib/logisticsConfig.js";
import {
  Card,
  Chat,
  Check,
  Database,
  Document,
  Eyebrow,
  Mail,
  PrimaryAction,
  Report,
  Reveal,
  SecondaryAction,
} from "./ui.jsx";

/* ---------------------------------------------------------
   Workflow visual — built from styled UI cards, not stock art.
   Zero image bytes, no layout shift, scales to any viewport.
   --------------------------------------------------------- */
const flow = [
  {
    icon: Mail,
    label: "Incoming request",
    detail: "Quote request arrives by e-mail",
    tag: "Captured",
  },
  {
    icon: Document,
    label: "Document processing",
    detail: "Origin, destination, weight and dimensions extracted",
    tag: "Structured",
  },
  {
    icon: Database,
    label: "Operational system",
    detail: "Task created, records updated",
    tag: "Synced",
  },
  {
    icon: Chat,
    label: "Customer update",
    detail: "Response prepared for the team to approve",
    tag: "Human review",
    human: true,
  },
  {
    icon: Report,
    label: "Operations report",
    detail: "Daily summary sent to the manager",
    tag: "Scheduled",
  },
];

function WorkflowVisual() {
  return (
    <figure className="relative m-0">
      <figcaption className="sr-only">
        Illustration of an automated logistics workflow: an incoming e-mail request is
        captured, shipment documents are processed into structured data, the operational
        system is updated, a customer response is prepared for human approval, and an
        operations report is sent to the manager.
      </figcaption>

      <Card className="relative overflow-hidden !p-5 sm:!p-6">
        {/* Panel header — evokes an operations console without claiming to be one */}
        <div className="flex items-center justify-between gap-4 border-b border-white/[0.07] pb-4">
          <span className="text-xs uppercase tracking-[0.22em] text-white/60">
            Workflow · quote intake
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-white/70">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-artx-cyan animate-pulse-glow"
            />
            Automated
          </span>
        </div>

        <ol className="relative mt-5 space-y-3">
          {flow.map((step, i) => {
            const Icon = step.icon;
            return (
              <li key={step.label} className="relative flex gap-4">
                {i < flow.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute left-[19px] top-10 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-white/25 to-white/5"
                  />
                )}

                <span
                  aria-hidden="true"
                  className={`relative z-10 mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${
                    step.human
                      ? "border-artx-cyan/40 bg-artx-cyan/10 text-artx-cyan"
                      : "border-white/10 bg-white/[0.04] text-white/85"
                  }`}
                >
                  <Icon size={19} />
                </span>

                <div className="min-w-0 flex-1 pb-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <p className="text-sm font-semibold text-white">{step.label}</p>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] ${
                        step.human
                          ? "bg-artx-cyan/15 text-artx-cyan"
                          : "bg-white/[0.06] text-white/60"
                      }`}
                    >
                      {step.tag}
                    </span>
                  </div>
                  <p className="mt-1 text-sm leading-snug text-white/60">{step.detail}</p>
                </div>
              </li>
            );
          })}
        </ol>

        <p className="mt-5 border-t border-white/[0.07] pt-4 text-xs leading-relaxed text-white/55">
          Illustrative workflow. The steps, systems and approval points are defined per
          client during scoping.
        </p>
      </Card>
    </figure>
  );
}

/* ---------------------------------------------------------
   Credibility strip
   --------------------------------------------------------- */
const credibility = [
  "Built around your existing workflows",
  "Practical implementation, not AI experiments",
  "Direct senior-level involvement",
  "Designed for small and mid-sized logistics companies",
];

function CredibilityStrip() {
  return (
    <div className="relative border-y border-white/[0.07] bg-[#050505]">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
          {credibility.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-white/75">
              <Check className="mt-1 shrink-0 text-artx-cyan" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        {BASED_IN_STATEMENT ? (
          <p className="mt-6 border-t border-white/[0.06] pt-5 text-xs uppercase tracking-[0.2em] text-white/50">
            {BASED_IN_STATEMENT}
          </p>
        ) : null}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   Hero
   --------------------------------------------------------- */
export default function Hero() {
  return (
    <>
      <section
        id="top"
        className="relative isolate overflow-hidden bg-black px-6 pb-20 pt-28 sm:pt-36 lg:px-10 lg:pb-28 lg:pt-44"
      >
        {/* Ambient gradient field — pure CSS, no JS, no image weight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 h-[46rem] w-[80rem] -translate-x-1/2 rounded-full opacity-30 blur-[150px]"
          style={{
            background:
              "radial-gradient(circle at 30% 40%, #8437F5 0%, transparent 62%), radial-gradient(circle at 72% 55%, #00A8FF 0%, transparent 58%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent"
        />

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-12 lg:gap-12">
          {/* Copy */}
          <div className="lg:col-span-7">
            <Reveal as="div" y={16} duration={0.5}>
              <Eyebrow>AI Automation for Logistics Operations</Eyebrow>
            </Reveal>

            <Reveal as="h1" y={22} delay={0.06} duration={0.7} className="mt-7">
              <span className="block font-display text-[2.6rem] font-black leading-[1.03] tracking-tight text-white sm:text-6xl lg:text-[4.25rem]">
                Reduce repetitive work across your{" "}
                <span className="text-artx-gradient italic">logistics operations</span>
              </span>
            </Reveal>

            <Reveal as="p" y={18} delay={0.12} className="mt-7 max-w-2xl">
              <span className="block text-base leading-relaxed text-white/70 sm:text-lg">
                ArtX helps logistics and transportation companies automate repetitive
                workflows across e-mail, documents, spreadsheets, customer requests and
                internal systems — without replacing the tools they already use.
              </span>
            </Reveal>

            <Reveal
              y={18}
              delay={0.18}
              className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
            >
              <PrimaryAction
                href="#free-audit"
                data-cursor="view"
                data-cursor-label="Free audit"
                onClick={() => track("logistics_cta_click", { location: "hero", action: "audit" })}
              >
                Request a Free Workflow Audit
              </PrimaryAction>
              <SecondaryAction
                href="#use-cases"
                onClick={() =>
                  track("logistics_cta_click", { location: "hero", action: "use_cases" })
                }
              >
                See What We Automate
              </SecondaryAction>
            </Reveal>

            <Reveal as="p" y={12} delay={0.24} className="mt-5 max-w-lg">
              <span className="block text-sm text-white/55">
                No obligation. We review one workflow and identify practical automation
                opportunities.
              </span>
            </Reveal>
          </div>

          {/* Visual */}
          <Reveal y={28} delay={0.15} duration={0.75} className="lg:col-span-5">
            <WorkflowVisual />
          </Reveal>
        </div>
      </section>

      <CredibilityStrip />
    </>
  );
}
