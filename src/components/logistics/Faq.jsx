import { useState } from "react";
import { track } from "../../lib/analytics.js";
import { Eyebrow, Lead, Plus, Reveal, Section, SectionTitle } from "./ui.jsx";

/**
 * Single source of truth for the FAQ.
 * The same questions/answers are mirrored as FAQPage JSON-LD in
 * logistics-automation.html — keep both in sync when editing.
 */
export const faqs = [
  {
    q: "What logistics processes can be automated?",
    a: "Processes involving repetitive e-mails, documents, data entry, reporting, follow-ups, routing and system updates are often good candidates. The exact opportunity depends on the workflow, available data, business rules and system access.",
  },
  {
    q: "Do we need to replace our existing software?",
    a: "Usually not. ArtX first evaluates whether useful automation can be added around the systems already in place. In some cases, technical limitations may require a different approach.",
  },
  {
    q: "Can you work with legacy logistics systems?",
    a: "Potentially. Feasibility depends on whether the system offers an API, database access, exports, e-mail notifications, browser access or another reliable integration method.",
  },
  {
    q: "Will AI send messages without human review?",
    a: "Only if the agreed workflow allows it. Human approval can be required for quotes, sensitive customer communication, financial documents, exceptions and other high-impact actions.",
  },
  {
    q: "How long does an automation project take?",
    a: "A focused pilot may often take between two and six weeks. More complex projects can take longer depending on integrations, data quality, security requirements, testing and stakeholder availability.",
  },
  {
    q: "How much does a project cost?",
    a: "Pricing depends on workflow complexity, the number of integrations, document types, security requirements, support needs and implementation scope. The initial workflow audit helps define an appropriate pilot.",
  },
  {
    q: "Can you automate WhatsApp communication?",
    a: "Some WhatsApp workflows may be possible through approved WhatsApp Business solutions. Feasibility depends on the account setup, provider, consent requirements, message types and platform policies.",
  },
  {
    q: "Is our company data secure?",
    a: "Each project should be designed around the minimum required access, secure credential handling, appropriate permissions, testing controls and the client's security requirements. Specific security measures are agreed during project scoping.",
  },
  {
    q: "Do you provide ongoing support?",
    a: "Yes. Support, monitoring, maintenance and improvement options can be included based on the requirements of the implemented workflow.",
  },
  {
    q: "Can you support multilingual logistics operations?",
    a: "Yes. AI-assisted workflows may support multilingual classification, extraction, drafting and internal processing. Human review should remain available where accuracy or legal significance is important.",
  },
  {
    q: "What happens during the free workflow audit?",
    a: "We review one selected workflow, identify repetitive steps, assess potential automation opportunities, discuss system constraints and recommend a practical next step. The audit does not include full development or a complete technical specification.",
  },
];

function Item({ item, index, open, onToggle }) {
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <li className="border-b border-white/[0.08]">
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-start justify-between gap-6 py-6 text-left transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-artx-cyan"
        >
          <span className="text-base font-semibold leading-snug text-white sm:text-lg">
            {item.q}
          </span>
          <span
            aria-hidden="true"
            className={`mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/70 transition-transform duration-300 ${
              open ? "rotate-45 border-artx-cyan/50 text-artx-cyan" : ""
            }`}
          >
            <Plus />
          </span>
        </button>
      </h3>

      {/*
        The panel stays in the DOM (crawlers see every answer) but is made
        `invisible` when collapsed so assistive technology skips it.
      */}
      <div
        className={`grid transition-[grid-template-rows] duration-400 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className={`overflow-hidden ${open ? "visible" : "invisible"}`}>
          <div id={panelId} role="region" aria-labelledby={buttonId} className="pb-7 pr-12">
            <p className="max-w-3xl text-sm leading-relaxed text-white/65 sm:text-base">
              {item.a}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (i, question) => {
    setOpenIndex((current) => {
      const next = current === i ? -1 : i;
      if (next === i) track("logistics_faq_open", { question });
      return next;
    });
  };

  return (
    <Section id="faq" tone="raised" aria-labelledby="faq-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <Reveal className="lg:sticky lg:top-32">
            <Eyebrow>Questions</Eyebrow>
            <SectionTitle
              id="faq-title"
              accent="asked"
              className="!text-3xl sm:!text-4xl lg:!text-5xl"
            >
              Frequently
            </SectionTitle>
            <Lead className="!text-sm sm:!text-base">
              If your question is not answered here, ask it directly in the audit request
              form below.
            </Lead>
          </Reveal>
        </div>

        <div className="lg:col-span-8">
          <Reveal y={20}>
            <ul className="border-t border-white/[0.08]">
              {faqs.map((item, i) => (
                <Item
                  key={item.q}
                  item={item}
                  index={i}
                  open={openIndex === i}
                  onToggle={() => toggle(i, item.q)}
                />
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
