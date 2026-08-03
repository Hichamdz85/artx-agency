import { track } from "../../lib/analytics.js";
import { BOOKING_HREF, HAS_BOOKING } from "../../lib/logisticsConfig.js";
import { Eyebrow, PrimaryAction, Reveal, SecondaryAction, Section } from "./ui.jsx";

export default function FinalCta() {
  return (
    <Section id="final-cta" className="overflow-hidden" aria-labelledby="final-cta-title">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[52rem] w-[52rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-[150px]"
        style={{
          background:
            "radial-gradient(circle at center, #8437F5 0%, #00A8FF 42%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <Reveal y={16} duration={0.5}>
          <Eyebrow>One workflow is enough to start</Eyebrow>
        </Reveal>

        <Reveal as="h2" y={22} delay={0.06} duration={0.7} className="mt-7">
          <span
            id="final-cta-title"
            className="block font-display text-4xl font-black leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-[4rem]"
          >
            Find out what your logistics team{" "}
            <span className="text-artx-gradient italic">could automate</span>
          </span>
        </Reveal>

        <Reveal as="p" y={18} delay={0.12} className="mx-auto mt-7 max-w-xl">
          <span className="block text-base leading-relaxed text-white/70">
            Describe one repetitive operational process. We will help you assess whether it
            is suitable for automation and what a practical pilot could look like.
          </span>
        </Reveal>

        <Reveal
          y={18}
          delay={0.18}
          className="mt-11 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
        >
          <PrimaryAction
            href="#lead-form"
            data-cursor="view"
            data-cursor-label="Request"
            onClick={() =>
              track("logistics_cta_click", { location: "final_cta", action: "audit" })
            }
          >
            Request a Free Workflow Audit
          </PrimaryAction>
          <SecondaryAction
            href={BOOKING_HREF}
            {...(HAS_BOOKING ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            onClick={() =>
              track("logistics_booking_click", {
                location: "final_cta",
                mode: HAS_BOOKING ? "scheduler" : "email",
              })
            }
          >
            Book an Introductory Call
          </SecondaryAction>
        </Reveal>

        <Reveal as="p" y={12} delay={0.24} className="mt-6">
          <span className="block text-sm text-white/55">
            No obligation. No generic AI presentation. A practical conversation about your
            workflow.
          </span>
        </Reveal>
      </div>
    </Section>
  );
}
