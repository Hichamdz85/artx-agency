import { Eyebrow, Lead, Reveal, Section, SectionTitle } from "./ui.jsx";

const steps = [
  {
    n: "01",
    title: "Workflow Audit",
    body: "We review one business process, the people involved, the tools used, and the repetitive steps causing delays or unnecessary work.",
  },
  {
    n: "02",
    title: "Automation Plan",
    body: "We map the improved workflow, identify integration requirements, and define the expected operational benefit.",
  },
  {
    n: "03",
    title: "Prototype",
    body: "We build a focused prototype using a limited scope and representative business data.",
  },
  {
    n: "04",
    title: "Testing and Implementation",
    body: "We test exceptions, permissions, data quality and human review points before implementation.",
  },
  {
    n: "05",
    title: "Documentation and Support",
    body: "We provide clear documentation, staff guidance, and agreed support after launch.",
  },
];

export default function Process() {
  return (
    <Section id="process" aria-labelledby="process-title">
      <div className="max-w-3xl">
        <Reveal>
          <Eyebrow>How we work</Eyebrow>
          <SectionTitle id="process-title" accent="implementation process">
            A practical
          </SectionTitle>
          <Lead>
            Five steps, in order, with a decision point at the end of each one. You are never
            more than one step away from stopping.
          </Lead>
        </Reveal>
      </div>

      <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {steps.map((step, i) => (
          <Reveal as="li" key={step.n} y={22} delay={i * 0.07} className="list-none">
            <div className="relative h-full rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.045] to-white/[0.012] p-6">
              <span
                aria-hidden="true"
                className="font-display text-3xl font-black leading-none text-artx-gradient"
              >
                {step.n}
              </span>
              <h3 className="mt-4 text-base font-semibold leading-snug text-white">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">{step.body}</p>
            </div>
          </Reveal>
        ))}
      </ol>

      <Reveal
        y={16}
        delay={0.08}
        className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6"
      >
        <p className="text-sm leading-relaxed text-white/65">
          Focused pilot projects may often be delivered within two to six weeks, depending on
          complexity, integrations, data access and approval requirements. That is an
          indication based on scope, not a guaranteed delivery period.
        </p>
      </Reveal>
    </Section>
  );
}
