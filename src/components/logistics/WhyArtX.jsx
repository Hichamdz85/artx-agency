import { VERIFIED_ACHIEVEMENTS } from "../../lib/logisticsConfig.js";
import {
  Card,
  Check,
  Eyebrow,
  Globe,
  IconChip,
  Layers,
  Lead,
  Reveal,
  Route,
  Section,
  SectionTitle,
  Sync,
  Users,
} from "./ui.jsx";

const reasons = [
  {
    icon: Route,
    title: "Business-first approach",
    body: "We start with the operational problem, not the latest technology.",
  },
  {
    icon: Globe,
    title: "Logistics and cross-border experience",
    body: "Our background includes business development, logistics operations, suppliers, international coordination and growth across multiple markets.",
  },
  {
    icon: Layers,
    title: "Practical systems",
    body: "We focus on clear workflows that employees can understand, use and control.",
  },
  {
    icon: Users,
    title: "Direct senior involvement",
    body: "Projects receive direct strategic and operational involvement rather than being passed through layers of account management.",
  },
  {
    icon: Sync,
    title: "Flexible implementation",
    body: "We work around existing tools where practical and avoid unnecessary system replacement.",
  },
];

export default function WhyArtX() {
  return (
    <Section id="why-artx" aria-labelledby="why-artx-title">
      <div className="max-w-3xl">
        <Reveal>
          <Eyebrow>Why ArtX</Eyebrow>
          <SectionTitle id="why-artx-title" accent="before we automate them">
            We understand operations
          </SectionTitle>
          <Lead>
            Automation only holds up when the person designing it understands what the work
            actually looks like on a busy Tuesday morning.
          </Lead>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map((reason, i) => {
          const Icon = reason.icon;
          return (
            <Reveal as="article" key={reason.title} y={22} delay={Math.min(i, 3) * 0.07}>
              <Card className="h-full">
                <IconChip>
                  <Icon />
                </IconChip>
                <h3 className="mt-5 text-lg font-semibold leading-snug text-white">
                  {reason.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{reason.body}</p>
              </Card>
            </Reveal>
          );
        })}
      </div>

      {/* Founder */}
      <Reveal y={24} delay={0.05} className="mt-16">
        <div className="grid gap-10 rounded-3xl border border-white/[0.09] bg-gradient-to-b from-white/[0.05] to-white/[0.012] p-8 sm:p-10 lg:grid-cols-12 lg:gap-14 lg:p-14">
          <div className="lg:col-span-4">
            <Eyebrow>Leadership</Eyebrow>
            <h3 className="mt-6 font-display text-3xl font-black leading-[1.05] tracking-tight text-white sm:text-4xl">
              Business and operations experience{" "}
              <span className="text-artx-gradient italic">behind the technology</span>
            </h3>
          </div>

          <div className="lg:col-span-8">
            <p className="text-base leading-relaxed text-white/75">
              ArtX is led by Hichem Khelifi, a business development and operations executive
              with more than a decade of experience across Europe, Türkiye and the Gulf
              region.
            </p>
            <p className="mt-5 text-base leading-relaxed text-white/75">
              His background combines growth strategy, logistics, cross-border operations,
              marketing, process development and AI-enabled automation.
            </p>
            <p className="mt-5 text-base leading-relaxed text-white/75">
              This combination allows ArtX to approach automation from a business
              perspective: understanding the workflow, the commercial context, the people
              involved and the operational result before selecting the technology.
            </p>

            {/*
              Verified achievements render only when the owner has approved them in
              src/lib/logisticsConfig.js. Unapproved claims are never displayed.
            */}
            {VERIFIED_ACHIEVEMENTS.length > 0 && (
              <ul className="mt-8 space-y-3 border-t border-white/[0.08] pt-7">
                {VERIFIED_ACHIEVEMENTS.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-white/80">
                    <Check className="mt-1 shrink-0 text-artx-cyan" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
