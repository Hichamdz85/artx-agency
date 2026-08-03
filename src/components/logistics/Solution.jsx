import {
  Card,
  Chat,
  Check,
  Document,
  Eyebrow,
  IconChip,
  Lead,
  Reveal,
  Section,
  SectionTitle,
  Sync,
} from "./ui.jsx";

const pillars = [
  {
    n: "01",
    icon: Sync,
    title: "Workflow Automation",
    blurb:
      "Automate repetitive operational steps across e-mail, spreadsheets, CRMs, internal tools and logistics platforms.",
    items: [
      "Data transfer between systems",
      "Automated task creation",
      "Customer and supplier follow-ups",
      "Report generation",
      "CRM updates",
      "Internal notifications",
    ],
    accent: "from-[#FFD0FE] to-[#8437F5]",
  },
  {
    n: "02",
    icon: Document,
    title: "Document and E-mail Processing",
    blurb:
      "Extract, organise, classify and route information from operational documents and incoming messages.",
    items: [
      "Quote requests",
      "Invoices",
      "Bills of lading",
      "Packing lists",
      "Purchase orders",
      "Customs documents",
      "Delivery documents",
      "Supplier correspondence",
    ],
    accent: "from-[#8437F5] to-[#4B5EFB]",
  },
  {
    n: "03",
    icon: Chat,
    title: "AI-Assisted Customer Operations",
    blurb:
      "Help teams answer routine questions faster while keeping human review and control where it matters.",
    items: [
      "Shipment-status responses",
      "Request categorisation",
      "Draft e-mail responses",
      "FAQ support",
      "Customer request routing",
      "Multilingual response assistance",
    ],
    accent: "from-[#00A8FF] to-[#00DFFF]",
  },
];

export default function Solution() {
  return (
    <Section id="what-we-do" tone="raised" aria-labelledby="solution-title">
      <div className="max-w-3xl">
        <Reveal>
          <Eyebrow>What ArtX does</Eyebrow>
          <SectionTitle id="solution-title" accent="connected, automated processes">
            We turn repetitive logistics workflows into
          </SectionTitle>
          <Lead>
            We analyse how work currently moves through your business, identify unnecessary
            manual steps, and build focused automations that support your team.
          </Lead>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-5 lg:grid-cols-3">
        {pillars.map((pillar, i) => {
          const Icon = pillar.icon;
          return (
            <Reveal as="article" key={pillar.n} y={26} delay={i * 0.08}>
              <Card className="group relative h-full overflow-hidden transition-colors duration-500 hover:border-white/20">
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute -right-16 -top-24 h-52 w-52 rounded-full bg-gradient-to-br ${pillar.accent} opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-25`}
                />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <IconChip>
                      <Icon />
                    </IconChip>
                    <span className="text-xs uppercase tracking-[0.25em] text-white/45">
                      {pillar.n}
                    </span>
                  </div>

                  <h3 className="mt-6 font-display text-2xl font-extrabold leading-tight text-white">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{pillar.blurb}</p>

                  <ul className="mt-6 space-y-2 border-t border-white/[0.07] pt-5 text-sm text-white/75">
                    {pillar.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <Check className="mt-1 shrink-0 text-white/35" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </Reveal>
          );
        })}
      </div>

      <Reveal
        y={18}
        delay={0.1}
        className="mt-10 rounded-2xl border border-white/10 bg-white/[0.025] p-6 sm:p-8"
      >
        <p className="max-w-3xl text-base leading-relaxed text-white/85 sm:text-lg">
          Automation should support your team — not create another complex system they need
          to manage.
        </p>
      </Reveal>
    </Section>
  );
}
