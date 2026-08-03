/**
 * Consent-aware analytics dispatcher.
 *
 * Design rules (kept deliberately conservative):
 *   • No new analytics provider is loaded by this file. It only *forwards*
 *     events to a provider that is already present on the page.
 *   • Nothing is sent unless the visitor opted into the "analytics" category
 *     in the existing ArtX cookie banner (src/lib/consent.js).
 *   • No cookies, no localStorage, no personal data. Event payloads carry
 *     categorical values only (never a name, e-mail, company or free text).
 *   • Events are always pushed to window.artxDataLayer so the owner can wire
 *     up GA4 / Plausible / Vercel Analytics later without touching components.
 */
import { readConsent } from "./consent.js";

/** Local, in-memory event log. Never persisted, never sent anywhere by itself. */
function queue() {
  if (typeof window === "undefined") return null;
  if (!Array.isArray(window.artxDataLayer)) window.artxDataLayer = [];
  return window.artxDataLayer;
}

function analyticsAllowed() {
  try {
    return readConsent().categories.analytics === true;
  } catch {
    return false;
  }
}

/**
 * Track a product event.
 *
 * @param {string} name  snake_case event name, e.g. "logistics_form_submit_success"
 * @param {Record<string, string|number|boolean>} [props] categorical properties only
 */
export function track(name, props = {}) {
  if (typeof window === "undefined" || !name) return;

  queue()?.push({ name, props, ts: Date.now() });

  if (!analyticsAllowed()) return;

  try {
    // Plausible (script sets window.plausible)
    if (typeof window.plausible === "function") {
      window.plausible(name, { props });
    }
    // Vercel Analytics (window.va)
    if (typeof window.va === "function") {
      window.va("event", { name, ...props });
    }
    // Google Tag Manager / GA4 via dataLayer
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: name, ...props });
    }
  } catch {
    // Analytics must never break the page.
  }
}

/**
 * Fire an event once, the first time an element scrolls into view.
 * Returns a cleanup function. No-ops when IntersectionObserver is missing.
 *
 * @param {Element|null} el
 * @param {string} name
 * @param {Record<string, unknown>} [props]
 */
export function trackOnceInView(el, name, props = {}) {
  if (!el || typeof IntersectionObserver === "undefined") return () => {};
  let fired = false;
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && !fired) {
          fired = true;
          track(name, props);
          io.disconnect();
        }
      }
    },
    { threshold: 0.35 },
  );
  io.observe(el);
  return () => io.disconnect();
}
