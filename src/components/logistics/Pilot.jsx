import { track } from "../../lib/analytics.js";
import {
  Card,
  Check,
  Eyebrow,
  Lead,
  Reveal,
  SecondaryAction,
  Section,
  SectionTitle,
} from "./ui.jsx";

const candidates = [
  "High-frequency task",
  "Clear inputs and outputs",
  "Repetitive decision process",
  "Significant manual data entry",
  "Frequent customer or supplier communication",
  "Existing digital data",
  "Measurable time or error reduction",
];

/**
 * Illustrative scenarios — NOT client work.
 * Every card is explicitly labelled so a visitor cannot mistake it for a
 * delivered project, a case study or a measured result.
 */
const scenarios = [
  {
    title: "Freight Quote Intake",
    scenario:
      "A freight-forwarding team receives quote requests by e-mail in different formats.",
    workflow:
      "The system identifies the request, extracts origin, destination, dimensions, weight, service type and deadlines, then creates a structured task for the pricing team.",
    impact: "Faster intake, fewer missing fields and less manual copying.",
  },
  {
    title: "Shipment Update Assistance",
    scenario:
      "A customer-service team repeatedly checks shipment information and prepares similar status responses.",
    workflow:
      "The system gathers the available information, prepares a response draft, and flags exceptions for human review.",
    impact: "Shorter response times and more consistent communication.",
  },
  {
    title: "Document Processing",
    scenario:
      "Employees manually extract information from invoices, packing lists and transport documents.",
    workflow:
      "The system extracts selected fields, validates required information, and prepares the data for review or transfer.",
    impact: "Reduced data-entry workload and improved document visibility.",
  },
];

export default function Pilot() {
  return (
    <Section id="pilot" aria-labelledby="pilot-title">
      {/* Pilot */}
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <Reveal>
            <Eyebrow>Pilot first</Eyebrow>
            <SectionTitle id="pilot-title" accent="then expand">
              Start small, prove the value,
            </SectionTitle>
            <Lead>
              You do not need to automate your entire operation at once. The most effective
              starting point is usually one repetitive, high-volume workflow with a
              measurable outcome.
            </Lead>
            <div className="mt-9">
              <SecondaryAction
                href="#lead-form"
                onClick={() =>
                  track("logistics_cta_click", { location: "pilot", action: "pilot" })
                }
              >
                Discuss a Pilot Workflow
              </SecondaryAction>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-6">
          <Reveal y={22} delay={0.08}>
            <Card className="!p-7">
              <h3 className="text-xs uppercase tracking-[0.22em] text-white/60">
                Good pilot candidates
              </h3>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {candidates.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-white/75">
                    <Check className="mt-1 shrink-0 text-artx-cyan" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        </div>
      </div>

      {/* Example scenarios */}
      <div className="mt-20 border-t border-white/[0.07] pt-16">
        <Reveal className="max-w-3xl">
          <Eyebrow>Illustrative only</Eyebrow>
          <h2 className="mt-6 font-display text-3xl font-black leading-[1.05] tracking-tight text-white sm:text-4xl lg:text-5xl">
            Example automation <span className="text-artx-gradient italic">scenarios</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70">
            The three scenarios below are written to explain how a workflow is restructured.
            They are illustrative examples, not client results, and no outcome is measured or
            guaranteed.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {scenarios.map((item, i) => (
            <Reveal as="article" key={item.title} y={24} delay={i * 0.08}>
              <Card className="h-full">
                <span className="inline-flex rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/65">
                  Example scenario
                </span>

                <h3 className="mt-5 font-display text-xl font-extrabold leading-tight text-white">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-white/60">{item.scenario}</p>

                <div className="mt-5 border-t border-white/[0.07] pt-4">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-white/45">
                    Possible workflow
                  </span>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">{item.workflow}</p>
                </div>

                <div className="mt-5 border-t border-white/[0.07] pt-4">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-artx-cyan/90">
                    Potential impact
                  </span>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">{item.impact}</p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
