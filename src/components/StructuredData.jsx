/**
 * JSON-LD structured data — helps Google, Bing, ChatGPT-Search and
 * Perplexity understand the brand, services and entity graph.
 * Generated using schema.org vocabulary (Organization + Service + WebSite).
 */
export default function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://artx.agency/#org",
        name: "ArtX Creative Agency",
        alternateName: "ArtX",
        url: "https://artx.agency",
        logo: "https://artx.agency/favicon.svg",
        foundingDate: "2019",
        slogan: "Design that makes brands unforgettable.",
        description:
          "ArtX is a multidisciplinary creative agency designing brand identities, logos, websites and advertising for ambitious teams across Europe and beyond.",
        sameAs: [],
        contactPoint: [
          {
            "@type": "ContactPoint",
            email: "hello@artx.agency",
            contactType: "customer service",
            areaServed: ["EU", "Worldwide"],
            availableLanguage: ["en"],
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://artx.agency/#website",
        url: "https://artx.agency",
        name: "ArtX — Creative Agency",
        publisher: { "@id": "https://artx.agency/#org" },
        inLanguage: "en",
      },
      {
        "@type": "Service",
        name: "Brand Identity & Logo Design",
        provider: { "@id": "https://artx.agency/#org" },
        areaServed: "Worldwide",
        description:
          "Identity systems that travel: wordmarks, monograms, type, color, motion and voice — built to feel iconic from day one.",
      },
      {
        "@type": "Service",
        name: "Web Design & Development",
        provider: { "@id": "https://artx.agency/#org" },
        areaServed: "Worldwide",
        description:
          "From editorial single-pages to product platforms — high-craft sites that load fast, score 100 on Lighthouse, and convert.",
      },
      {
        "@type": "Service",
        name: "Advertising Campaigns",
        provider: { "@id": "https://artx.agency/#org" },
        areaServed: "Worldwide",
        description:
          "Campaigns rooted in the brand and expressed through every channel — insight → big idea → distinctive creative → measurable lift.",
      },
      {
        "@type": "Service",
        name: "Social, Motion & Strategy",
        provider: { "@id": "https://artx.agency/#org" },
        areaServed: "Worldwide",
        description:
          "Bringing brands alive in feed — content systems, motion idents and story-driven shorts.",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
