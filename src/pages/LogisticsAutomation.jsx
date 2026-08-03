import { lazy, Suspense } from "react";
import CookieConsent from "../components/CookieConsent.jsx";
import CustomCursor from "../components/CustomCursor.jsx";
import Footer from "../components/Footer.jsx";
import LegalModals from "../components/LegalModals.jsx";
import Navbar from "../components/Navbar.jsx";
import ScrollToTop from "../components/ScrollToTop.jsx";

import AuditOffer from "../components/logistics/AuditOffer.jsx";
import BeforeAfter from "../components/logistics/BeforeAfter.jsx";
import Hero from "../components/logistics/Hero.jsx";
import Problem from "../components/logistics/Problem.jsx";
import Process from "../components/logistics/Process.jsx";
import Solution from "../components/logistics/Solution.jsx";
import UseCases from "../components/logistics/UseCases.jsx";

// Below-the-fold sections are code-split so the hero paints with the smallest
// possible JS payload. Each chunk is fetched while the visitor reads above it.
const WhyArtX = lazy(() => import("../components/logistics/WhyArtX.jsx"));
const Technology = lazy(() => import("../components/logistics/Technology.jsx"));
const Pilot = lazy(() => import("../components/logistics/Pilot.jsx"));
const Faq = lazy(() => import("../components/logistics/Faq.jsx"));
const FinalCta = lazy(() => import("../components/logistics/FinalCta.jsx"));
const LeadForm = lazy(() => import("../components/logistics/LeadForm.jsx"));

/** Reserves vertical space so a lazy chunk cannot cause layout shift. */
function SectionFallback({ className = "min-h-[36rem]" }) {
  return <div className={`${className} bg-black`} aria-hidden="true" />;
}

const navLinks = [
  { label: "The problem", href: "#problem" },
  { label: "What we automate", href: "#use-cases" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
];

export default function LogisticsAutomation() {
  return (
    <>
      {/* Skip-to-content (WCAG 2.4.1) — visible only on keyboard focus */}
      <a
        href="#main"
        className="fixed left-4 top-4 z-[100] -translate-y-20 rounded-md bg-white px-4 py-2 text-sm font-semibold text-black shadow-lg transition-transform focus-visible:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-artx-cyan"
      >
        Skip to content
      </a>

      <CustomCursor />
      <Navbar
        links={navLinks}
        homeHref="/"
        ctaLabel="Request a Free Audit"
        ctaHref="#lead-form"
      />

      <main id="main" className="relative">
        <Hero />
        <Problem />
        <Solution />
        <UseCases />
        <BeforeAfter />
        <Process />
        <AuditOffer />

        <Suspense fallback={<SectionFallback />}>
          <WhyArtX />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Technology />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Pilot />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Faq />
        </Suspense>
        <Suspense fallback={<SectionFallback className="min-h-[28rem]" />}>
          <FinalCta />
        </Suspense>
        <Suspense fallback={<SectionFallback className="min-h-[48rem]" />}>
          <LeadForm />
        </Suspense>
      </main>

      <Footer />

      {/* Floating UI — identical to the homepage */}
      <ScrollToTop />
      <CookieConsent />
      <LegalModals />
    </>
  );
}
