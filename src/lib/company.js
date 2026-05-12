/**
 * ArtX Creative Agency — official company details.
 *
 * Single source of truth for legal docs (Privacy Policy, Cookie Policy,
 * Legal Notice) and structured data (JSON-LD).
 *
 * ⚠️ FILL IN the [TO_BE_FILLED] values below before publishing — the
 * Belgian Code of Economic Law (art. III.74) requires a website
 * representing a Belgian company to display these.
 */
export const company = {
  // ── Identity ─────────────────────────────────────────────────────────
  legalName: "ArtX Creative Agency",
  tradingName: "ArtX",
  legalForm: "[TO_BE_FILLED — e.g. SRL / BV / SA]",

  // ── Registered office (Belgium) ──────────────────────────────────────
  address: {
    line1: "[TO_BE_FILLED — Street name and number]",
    postalCode: "[TO_BE_FILLED]",
    city: "[TO_BE_FILLED — e.g. Brussels]",
    country: "Belgium",
  },

  // ── Belgian registration numbers ─────────────────────────────────────
  // BCE/KBO = Banque-Carrefour des Entreprises / Kruispuntbank van Ondernemingen
  // VAT in Belgium is "BE" + 10 digits, written as "BE0XXX.XXX.XXX"
  registrationNumber: "[TO_BE_FILLED — BCE/KBO number, e.g. 0XXX.XXX.XXX]",
  vatNumber: "[TO_BE_FILLED — e.g. BE0XXX.XXX.XXX]",

  // ── Founding & contact ───────────────────────────────────────────────
  founded: "2019",
  email: "hello@artx.agency",
  website: "https://artx.agency",
  director: "[TO_BE_FILLED — Director / responsible publisher]",

  // ── Hosting (must be disclosed under Belgian art. III.74) ────────────
  host: {
    name: "Vercel Inc.",
    address: "440 N Barranca Avenue #4133, Covina, CA 91723, United States",
    website: "https://vercel.com",
  },

  // ── Data protection ──────────────────────────────────────────────────
  dpoEmail: "privacy@artx.agency", // alias for hello@ until DPO is appointed
  supervisoryAuthority: {
    name: "Belgian Data Protection Authority (APD / GBA)",
    nameFr: "Autorité de protection des données",
    nameNl: "Gegevensbeschermingsautoriteit",
    address: "Rue de la Presse 35, 1000 Bruxelles, Belgium",
    phone: "+32 (0)2 274 48 00",
    website: "https://www.dataprotectionauthority.be",
  },

  // ── Document versioning (update on substantial changes) ──────────────
  privacyPolicyVersion: "1.0",
  privacyPolicyDate: "2026-05",
  cookiePolicyVersion: "1.0",
  cookiePolicyDate: "2026-05",
};

/**
 * Cookie inventory — the source of truth for the Cookie Consent modal.
 * Update this whenever a new cookie/storage key is added.
 */
export const cookieInventory = {
  essential: {
    name: "Essential",
    description:
      "Required for the website to work. Cannot be disabled. No personal data is sent off-device.",
    required: true,
    items: [
      {
        name: "artx_consent",
        type: "localStorage",
        purpose: "Remembers your cookie consent choices.",
        duration: "12 months",
      },
    ],
  },
  analytics: {
    name: "Analytics",
    description:
      "Helps us understand how visitors use the site so we can improve it. Currently disabled by default — only enabled if you opt in.",
    required: false,
    items: [
      // Add Plausible / Vercel Analytics / GA cookies here when wired
      {
        name: "(none active yet)",
        type: "—",
        purpose: "No analytics provider is currently active on this site.",
        duration: "—",
      },
    ],
  },
  marketing: {
    name: "Marketing",
    description:
      "Used for advertising and retargeting. Currently not used on this site.",
    required: false,
    items: [
      {
        name: "(none active yet)",
        type: "—",
        purpose: "No marketing cookies are currently set on this site.",
        duration: "—",
      },
    ],
  },
};
