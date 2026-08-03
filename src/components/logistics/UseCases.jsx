import {
  Card,
  Clock,
  Database,
  Document,
  Eyebrow,
  IconChip,
  Layers,
  Lead,
  Mail,
  Report,
  Reveal,
  Route,
  Search,
  Section,
  SectionTitle,
} from "./ui.jsx";

const useCases = [
  {
    icon: Mail,
    title: "Automated RFQ Processing",
    problem:
      "Quote requests arrive by e-mail and web form in a different shape every time.",
    outcome:
      "Capture the request, extract the shipment details, organise the data and prepare it for pricing or review.",
  },
  {
    icon: Search,
    title: "Shipment Status Requests",
    problem:
      "The same status question is answered several times a day from several systems.",
    outcome:
      "Collect the relevant shipment information so customer service can prepare faster, more consistent updates.",
  },
  {
    icon: Document,
    title: "Document Data Extraction",
    problem:
      "Invoices, packing lists, transport documents and purchase orders are read and retyped by hand.",
    outcome:
      "Extract structured information from PDFs and operational documents, ready for review or transfer.",
  },
  {
    icon: Route,
    title: "E-mail Classification and Routing",
    problem:
      "A shared mailbox is triaged manually before anyone can start the actual work.",
    outcome:
      "Identify the purpose of incoming e-mail, assign a category, route the request and create the task.",
  },
  {
    icon: Database,
    title: "CRM and Spreadsheet Updates",
    problem:
      "The same reference is entered into a spreadsheet, a CRM and an operational platform.",
    outcome:
      "Synchronise selected information across systems so the copying stops being a human task.",
  },
  {
    icon: Clock,
    title: "Customer and Supplier Follow-Ups",
    problem:
      "Follow-ups depend on someone remembering the right file on the right day.",
    outcome:
      "Trigger scheduled reminders and follow-up messages based on shipment, quote or document status.",
  },
  {
    icon: Report,
    title: "Operations Reporting",
    problem:
      "Daily and weekly summaries are rebuilt manually from the same sources every time.",
    outcome:
      "Prepare recurring summaries from multiple data sources and send them to the relevant managers.",
  },
  {
    icon: Layers,
    title: "Internal Knowledge Assistant",
    problem:
      "Procedures, templates and customer specifics live in people's heads and scattered folders.",
    outcome:
      "Help employees find procedures, customer information, templates and operational knowledge faster.",
  },
];

export default function UseCases() {
  return (
    <Section id="use-cases" aria-labelledby="use-cases-title">
      <div className="max-w-3xl">
        <Reveal>
          <Eyebrow>Where automation pays off first</Eyebrow>
          <SectionTitle id="use-cases-title" accent="we can automate">
            High-impact logistics workflows
          </SectionTitle>
          <Lead>
            Each of these starts as one contained project with a clear input, a clear output
            and a measurable amount of manual work removed.
          </Lead>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {useCases.map((item, i) => {
          const Icon = item.icon;
          return (
            <Reveal as="article" key={item.title} y={22} delay={Math.min(i, 4) * 0.06}>
              <Card className="group h-full transition-colors duration-500 hover:border-white/20">
                <IconChip className="transition-colors duration-500 group-hover:border-white/25 group-hover:text-white">
                  <Icon />
                </IconChip>

                <h3 className="mt-5 text-lg font-semibold leading-snug text-white">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-white/55">{item.problem}</p>

                <div className="mt-5 border-t border-white/[0.07] pt-4">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-artx-cyan/90">
                    With automation
                  </span>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">{item.outcome}</p>
                </div>
              </Card>
            </Reveal>
          );
        })}
      </div>

      <Reveal
        y={16}
        delay={0.08}
        className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6"
      >
        <p className="text-sm leading-relaxed text-white/60">
          Available integrations depend on system access, APIs, data structure and security
          requirements. Each workflow is assessed technically before anything is committed.
        </p>
      </Reveal>
    </Section>
  );
}
