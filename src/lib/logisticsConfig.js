/**
 * Configuration for the /logistics-automation landing page.
 *
 * Everything the site owner must supply lives here (or in Vercel env vars).
 * Nothing in this file invents a claim, a client, a number or a partnership.
 *
 * See docs/LOGISTICS-PAGE-SETUP.md for the full checklist.
 */

/** Where the lead form posts. Served by /api/logistics-lead.js on Vercel. */
export const LEAD_ENDPOINT = "/api/logistics-lead";

/** Public contact address (already used across the site). */
export const CONTACT_EMAIL = "hello@artx.agency";

/**
 * Booking / scheduling link.
 *
 * Set VITE_BOOKING_URL in Vercel → Project → Settings → Environment Variables
 * to a Calendly / Cal.com / HubSpot Meetings / Microsoft Bookings URL.
 *
 * While it is unset we deliberately do NOT render a fake scheduler — the
 * "Book an Introductory Call" CTA falls back to a pre-filled email instead.
 */
export const BOOKING_URL = import.meta.env?.VITE_BOOKING_URL || "";

/** True when a real scheduling link has been configured. */
export const HAS_BOOKING = Boolean(BOOKING_URL);

/** Fallback used whenever HAS_BOOKING is false. */
export const BOOKING_FALLBACK_MAILTO =
  `mailto:${CONTACT_EMAIL}` +
  "?subject=Introductory%20call%20%E2%80%94%20logistics%20automation" +
  "&body=Hello%20ArtX%2C%0A%0AI%27d%20like%20to%20book%20a%20short%20introductory%20call%20about%20automating%20a%20workflow%20in%20our%20logistics%20operation.%0A%0ACompany%3A%0ARole%3A%0AWorkflow%20I%27d%20like%20to%20discuss%3A%0APreferred%20times%3A%0A%0AThank%20you.";

/** Resolved href for the secondary "Book an Introductory Call" action. */
export const BOOKING_HREF = HAS_BOOKING ? BOOKING_URL : BOOKING_FALLBACK_MAILTO;

/**
 * Founder achievements.
 *
 * IMPORTANT — trust rule: an achievement is rendered ONLY after the owner has
 * verified it and added it below. An empty array renders nothing at all; we
 * never ship "[VERIFIED ACHIEVEMENT TO BE APPROVED]" to a live visitor.
 *
 * Candidates awaiting approval (do NOT publish until confirmed in writing):
 *   • "Helped scale charitable fundraising from QAR 30 million to QAR 450 million"
 *   • "Supported the growth of a business from approximately USD 4,000 to
 *      USD 13 million over five years"
 *
 * To publish one, move it into the array below, e.g.:
 *   export const VERIFIED_ACHIEVEMENTS = ["Helped scale ... to QAR 450 million"];
 */
export const VERIFIED_ACHIEVEMENTS = [];

/**
 * Geographic statement shown in the credibility strip.
 * Set to "" to hide it if it is ever inconsistent with the registered details.
 */
export const BASED_IN_STATEMENT =
  "Based in Brussels. Working with businesses across Europe and international markets.";

/** Canonical URL of this page — kept in one place for JSON-LD + analytics. */
export const PAGE_URL = "https://artx.agency/logistics-automation";
