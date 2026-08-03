import { track } from "../../lib/analytics.js";
import { Check, Eyebrow, PrimaryAction, Reveal, Section, Spark } from "./ui.jsx";

const included = [
  "Review of one selected workflow",
  "Identification of repetitive manual steps",
  "Initial automation opportunities",
  "Integration and data considerations",
  "Suggested pilot scope",
  "High-level implementation recommendation",
];

export default function AuditOffer() {
  return (
    <Section id="free-audit" tone="raised" aria-labelledby="free-audit-title">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-white/12 bg-gradient-to-b from-white/[0.07] to-white/[0.015] p-8 sm:p-12 lg:p-16">
          {/* Brand orb */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-32 h-[34rem] w-[34rem] rounded-full opacity-25 blur-[130px]"
            style={{
              background:
                "radial-gradient(circle at center, #8437F5 0%, #00A8FF 45%, transparent 70%)",
            }}
          />

          <div className="relative grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-[11px] uppercase tracking-[0.2em] text-white/80">
                <Spark size={14} className="text-artx-cyan" />
                Start with one workflow
              </span>

              <h2
                id="free-audit-title"
                className="mt-7 font-display text-4xl font-black leading-[1.03] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]"
              >
                Request a free logistics{" "}
                <span className="text-artx-gradient italic">workflow audit</span>
              </h2>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
                Tell us about one repetitive process inside your logistics operation. We will
                review the workflow and identify where automation may save time, reduce
                errors or improve response speed.
              </p>

              <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                <PrimaryAction
                  href="#lead-form"
                  data-cursor="view"
                  data-cursor-label="Request"
                  onClick={() =>
                    track("logistics_cta_click", { location: "audit_offer", action: "audit" })
                  }
                >
                  Request My Free Audit
                </PrimaryAction>
              </div>

              <p className="mt-5 max-w-lg text-sm text-white/55">
                Typically suitable for operations involving recurring e-mails, documents,
                spreadsheets, reporting or system updates.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-white/10 bg-black/40 p-6 sm:p-7">
                <h3 className="text-xs uppercase tracking-[0.24em] text-white/60">
                  The audit may include
                </h3>
                <ul className="mt-5 space-y-3.5">
                  {included.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-white/80">
                      <Check className="mt-1 shrink-0 text-artx-cyan" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 border-t border-white/[0.08] pt-5 text-xs leading-relaxed text-white/55">
                  The free audit is an initial assessment, not a complete technical
                  specification or an implementation commitment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
