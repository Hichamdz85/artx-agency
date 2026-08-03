import { Card, Eyebrow, Lead, Reveal, Section, SectionTitle } from "./ui.jsx";

const problems = [
  {
    title: "Copying shipment details by hand",
    body: "Data is read out of an e-mail and typed into a spreadsheet or an internal system, one field at a time.",
  },
  {
    title: "Preparing quotes manually",
    body: "Every request is re-read, re-formatted and re-priced from scratch, even when the pattern repeats weekly.",
  },
  {
    title: "Searching several systems for status",
    body: "A single customer question sends someone through the mailbox, a carrier portal and a shared file.",
  },
  {
    title: "Re-entering the same data",
    body: "The same reference lands in a mailbox, a spreadsheet, a CRM and an operational platform — typed four times.",
  },
  {
    title: "Processing PDFs and shipping documents",
    body: "Invoices, packing lists and transport documents are opened, read and transcribed before anything moves.",
  },
  {
    title: "Rebuilding the same reports",
    body: "Daily and weekly summaries are assembled by hand from sources that have not changed in months.",
  },
  {
    title: "Chasing customers and suppliers",
    body: "Follow-ups depend on someone remembering, on the right day, across a long list of open files.",
  },
  {
    title: "Sorting and routing requests",
    body: "Incoming messages are triaged by a person before the responsible colleague ever sees them.",
  },
];

export default function Problem() {
  return (
    <Section id="problem" aria-labelledby="problem-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal className="lg:sticky lg:top-32">
            <Eyebrow>The cost of manual work</Eyebrow>
            <SectionTitle id="problem-title" accent="operational costs">
              Manual logistics work creates hidden
            </SectionTitle>
            <Lead>
              Many logistics teams rely on capable employees working across e-mail,
              spreadsheets, documents, messaging apps, CRMs and legacy systems. The problem
              is not the team — it is the repetitive work between the systems.
            </Lead>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <ul className="grid list-none gap-4 p-0 sm:grid-cols-2">
            {problems.map((item, i) => (
              <Reveal as="li" key={item.title} y={20} delay={Math.min(i, 4) * 0.05}>
                <Card className="h-full !p-6">
                  <h3 className="text-base font-semibold leading-snug text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-white/60">{item.body}</p>
                </Card>
              </Reveal>
            ))}
          </ul>

          <Reveal
            y={18}
            delay={0.1}
            className="mt-8 rounded-2xl border border-white/10 bg-white/[0.025] p-6 sm:p-7"
          >
            <p className="text-base leading-relaxed text-white/85 sm:text-lg">
              These tasks may look small individually, but together they consume hours every
              week and increase the risk of delays and errors.
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
