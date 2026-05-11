import CustomCursor from "./components/CustomCursor.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import ServicesSection from "./components/ServicesSection.jsx";
// TrustedBy (client marquee) intentionally not rendered — placeholder names
// would mislead visitors. Will be reintroduced in Phase 2 with real clients.
// import TrustedBy from "./components/TrustedBy.jsx";
import CTASection from "./components/CTASection.jsx";
import Footer from "./components/Footer.jsx";
// StructuredData is rendered directly in index.html for SEO without JS execution.

export default function App() {
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
      <Navbar />

      <main id="main" className="relative">
        <Hero />
        <ServicesSection />
        <CTASection />
      </main>

      <Footer />
    </>
  );
}
