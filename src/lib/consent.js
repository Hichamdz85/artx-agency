/**
 * Cookie/consent storage helper — GDPR + ePrivacy compliant.
 *
 * Rules implemented:
 *   • No tracking storage until consent.granted.
 *   • Equal prominence of Accept All / Reject All buttons (UI side).
 *   • Granular category-by-category opt-in (Analytics, Marketing).
 *   • Easy withdrawal — the consent panel can be reopened any time
 *     from the footer "Cookie preferences" link.
 *   • Versioned consent — if the policy changes, consent is renewed.
 *
 * Storage: localStorage key `artx_consent` holds the entire object.
 */
const STORAGE_KEY = "artx_consent";
const CONSENT_VERSION = "1.0";

export const defaultConsent = {
  version: CONSENT_VERSION,
  decidedAt: null, // ISO timestamp once the user makes a choice
  categories: {
    essential: true, // always on, required for the site to work
    analytics: false,
    marketing: false,
  },
};

export function readConsent() {
  if (typeof window === "undefined") return defaultConsent;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultConsent;
    const parsed = JSON.parse(raw);
    // Invalidate if version bumped
    if (parsed.version !== CONSENT_VERSION) return defaultConsent;
    return { ...defaultConsent, ...parsed };
  } catch {
    return defaultConsent;
  }
}

export function writeConsent(next) {
  if (typeof window === "undefined") return;
  const payload = {
    version: CONSENT_VERSION,
    decidedAt: new Date().toISOString(),
    categories: {
      essential: true,
      analytics: !!next?.categories?.analytics,
      marketing: !!next?.categories?.marketing,
    },
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  // Let the rest of the app react (e.g. Hero video can reload analytics).
  window.dispatchEvent(new CustomEvent("artx:consent", { detail: payload }));
  return payload;
}

export function hasDecided() {
  return readConsent().decidedAt !== null;
}

export function acceptAll() {
  return writeConsent({ categories: { analytics: true, marketing: true } });
}

export function rejectAll() {
  return writeConsent({ categories: { analytics: false, marketing: false } });
}
