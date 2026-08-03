import {
  Card,
  Check,
  Eyebrow,
  Lead,
  Lock,
  Reveal,
  Section,
  SectionTitle,
  Shield,
} from "./ui.jsx";

const categories = [
  { name: "E-mail platforms", tools: ["Microsoft 365", "Google Workspace"] },
  { name: "Spreadsheets", tools: ["Excel", "Google Sheets"] },
  { name: "CRM systems", tools: ["HubSpot", "Salesforce"] },
  { name: "Document storage", tools: ["SharePoint", "Google Drive"] },
  { name: "Knowledge and records", tools: ["Notion", "Airtable"] },
  { name: "Messaging tools", tools: ["Slack", "Microsoft Teams", "WhatsApp Business"] },
  {
    name: "Logistics and ERP platforms",
    tools: ["Subject to available APIs, exports or database access"],
  },
  { name: "Custom internal systems", tools: ["Custom APIs", "Webhooks", "Scheduled exports"] },
];

const controls = [
  "Human approval steps where necessary",
  "Role-based access considerations",
  "Secure handling of credentials",
  "Minimal required data access",
  "Logging and traceability",
  "Exception handling",
  "Data-retention considerations",
  "GDPR-aware implementation for European clients",
  "Separation of testing and production environments",
];

export default function Technology() {
  return (
    <Section id="technology" tone="raised" aria-labelledby="technology-title">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        {/* Technology */}
        <div className="lg:col-span-6">
          <Reveal>
            <Eyebrow>Technology</Eyebrow>
            <SectionTitle
              id="technology-title"
              className="!text-3xl sm:!text-4xl lg:!text-[2.75rem]"
            >
              Designed to work with the tools your team already uses
            </SectionTitle>
            <Lead className="!text-sm sm:!text-base">
              We connect to what is already in place. Platform names below are listed as
              integration targets only — no formal partnership or endorsement is implied.
            </Lead>
          </Reveal>

          <Reveal y={22} delay={0.08} className="mt-9">
            <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {categories.map((category) => (
                <div key={category.name}>
                  <dt className="text-[11px] uppercase tracking-[0.2em] text-white/50">
                    {category.name}
                  </dt>
                  <dd className="mt-2.5 flex flex-wrap gap-2">
                    {category.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full border border-white/[0.09] bg-white/[0.03] px-3 py-1.5 text-xs text-white/75"
                      >
                        {tool}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-sm leading-relaxed text-white/60">
              Integration feasibility depends on available APIs, access permissions, security
              policies and the technical condition of the existing systems.
            </p>
          </Reveal>
        </div>

        {/* Security & human control */}
        <div className="lg:col-span-6">
          <Reveal delay={0.05}>
            <Eyebrow>Control and oversight</Eyebrow>
            <h2 className="mt-6 font-display text-3xl font-black leading-[1.05] tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
              Automation with appropriate{" "}
              <span className="text-artx-gradient italic">control and oversight</span>
            </h2>
          </Reveal>

          <Reveal y={22} delay={0.1} className="mt-9">
            <Card className="!p-7">
              <div className="flex items-center gap-3">
                <Shield size={20} className="text-artx-cyan" />
                <span className="text-xs uppercase tracking-[0.22em] text-white/65">
                  Designed into every workflow
                </span>
              </div>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {controls.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-white/75">
                    <Check className="mt-1 shrink-0 text-white/35" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <div className="mt-5 flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <Lock size={18} className="mt-0.5 shrink-0 text-white/45" />
              <p className="text-sm leading-relaxed text-white/60">
                We design solutions with privacy, security, access control and GDPR
                considerations in mind. Final compliance responsibilities depend on the
                client's systems, processes, legal requirements and implementation scope.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
