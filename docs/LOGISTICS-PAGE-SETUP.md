# /logistics-automation — setup notes

Everything on the page is live and production-ready. The items below are the
values only the site owner can supply. Nothing here blocks the page from
working: each one has a safe fallback, and no unverified claim is ever shown.

---

## 1 · Required before the first campaign

### 1.1 Lead delivery (e-mail)

The form posts to `POST /api/logistics-lead` (Vercel Node Function). Without
configuration it still **accepts and preserves** every submission: the full
lead is written to the function log with a `LEAD_FALLBACK` marker
(Vercel → Project → Logs). Configure these to receive it by e-mail instead:

| Variable | Example | Notes |
|---|---|---|
| `RESEND_API_KEY` | `re_xxxxxxxx` | Create at resend.com. Any provider can be swapped in — see `api/logistics-lead.js` → `sendEmail()`. |
| `LEAD_NOTIFY_TO` | `hello@artx.agency` | Destination inbox. |
| `LEAD_NOTIFY_FROM` | `ArtX <website@artx.agency>` | Must be a domain verified with the provider. |
| `LEAD_SEND_CONFIRMATION` | `true` | Optional. Sends the visitor a confirmation e-mail. |

Set them in **Vercel → Project → Settings → Environment Variables**
(Production + Preview). Never commit them.

The notification e-mail sets `reply_to` to the lead's address, so replying
from the inbox reaches them directly.

### 1.2 Booking link

| Variable | Example |
|---|---|
| `VITE_BOOKING_URL` | `https://cal.com/artx/intro` |

Works with Calendly, Cal.com, HubSpot Meetings or Microsoft Bookings — any URL.
**Until it is set**, the "Book an Introductory Call" buttons open a pre-filled
e-mail to `hello@artx.agency` instead. No placeholder scheduler is ever shown.

This is a `VITE_` variable, so it is read at **build time** — after changing it,
redeploy.

---

## 2 · Content awaiting your approval

### 2.1 Founder achievements

`src/lib/logisticsConfig.js` → `VERIFIED_ACHIEVEMENTS`.

The array is **empty**, so nothing is rendered. Two candidates are listed in the
file's comments and are deliberately **not published**:

- "Helped scale charitable fundraising from QAR 30 million to QAR 450 million"
- "Supported the growth of a business from approximately USD 4,000 to USD 13 million over five years"

Move a string into the array only once you are prepared to substantiate it.

### 2.2 Geographic statement

`src/lib/logisticsConfig.js` → `BASED_IN_STATEMENT` currently reads
"Based in Brussels. Working with businesses across Europe and international
markets." Set it to `""` to hide the line entirely if it is ever inconsistent
with the registered company details.

---

## 3 · Recommended, not required

| Item | Status | Action |
|---|---|---|
| **Open Graph image** | Reuses `/hero/hero-poster.jpg` (1280×720) | A dedicated 1200×630 image for this page would improve link previews. Replace the `og:image` / `twitter:image` URLs in `logistics-automation.html`. |
| **Analytics provider** | None active | `src/lib/analytics.js` forwards events to Plausible, Vercel Analytics or GTM **if present**, and only after the visitor opts in via the existing cookie banner. Events are always readable at `window.artxDataLayer`. Add a provider script and it starts receiving events — no component changes needed. Remember to add the provider's cookies to `cookieInventory.analytics` in `src/lib/company.js`. |
| **LinkedIn in the footer** | Not added | No verified ArtX LinkedIn URL was available, so none was invented. Add it to `src/components/Footer.jsx` when you have it. |
| **Homepage link to this page** | Not added | The page is reachable at its direct URL and is in `sitemap.xml` + `llms.txt`. The global navigation was intentionally left untouched. Adding a "Logistics automation" entry to the homepage nav is a one-line change in `src/App.jsx` (`<Navbar links={...} />`). |
| **Legal pages** | Existing modals reused | Privacy Policy / Cookie Policy / Legal Notice open from the footer, driven by `src/lib/company.js`, which still contains `[TO_BE_FILLED]` placeholders for the Belgian company details. |

---

## 4 · Deliberate omissions (and why)

- **No file upload.** The brief listed "upload sample document" as optional. It
  is not implemented because it needs a storage backend (Vercel Blob or S3),
  virus scanning and a retention policy — all of which are business decisions,
  not defaults. The confirmation e-mail invites the lead to reply with an
  attachment instead, which achieves the same outcome with zero new attack
  surface.
- **No client logos, testimonials, case studies, ratings or counts.** None were
  verified. The "Example automation scenarios" section is explicitly labelled
  "Example scenario" / "Potential impact" on every card.
- **No `AggregateRating`, `Review`, `LocalBusiness` address or award markup**
  in the structured data, for the same reason.
- **Technology names carry no logos** and are introduced as integration targets,
  so no partnership is implied.

---

## 5 · Analytics events emitted

| Event | Fired when | Properties |
|---|---|---|
| `logistics_cta_click` | Any audit / use-case CTA | `location`, `action` |
| `logistics_booking_click` | Booking CTA | `location`, `mode` (`scheduler` or `email`) |
| `logistics_form_start` | First focus inside the form | — |
| `logistics_form_validation_failure` | Client-side validation blocks submit | `fields` |
| `logistics_form_submit_success` | 200 from the API | `companySize`, `businessType`, `country` |
| `logistics_form_submit_error` | Network or server error | — |
| `logistics_faq_open` | An FAQ item is expanded | `question` |

No event ever carries a name, e-mail address, company name or free text.

---

## 6 · Local development

```bash
npm install
npm run dev     # http://localhost:5173/logistics-automation
npm run build   # writes dist/logistics-automation.html
npm run preview # http://localhost:4173/logistics-automation.html
```

In production, Vercel's `cleanUrls: true` + `trailingSlash: false`
(already in `vercel.json`) serve `dist/logistics-automation.html`
at `/logistics-automation`.

The API function only runs on Vercel (`vercel dev` locally). With the plain Vite
dev server the form will report a network error on submit — that is expected.

---

## 7 · Files added or changed

**Added**

```
logistics-automation.html                     page entry: meta, OG, JSON-LD, noscript
src/logistics.jsx                             React entry
src/pages/LogisticsAutomation.jsx             page composition
src/components/logistics/ui.jsx               shared primitives + icon family
src/components/logistics/Hero.jsx             hero, workflow visual, credibility strip
src/components/logistics/Problem.jsx          problem grid
src/components/logistics/Solution.jsx         three service pillars
src/components/logistics/UseCases.jsx         eight use cases
src/components/logistics/BeforeAfter.jsx      before/after comparison
src/components/logistics/Process.jsx          five-step process
src/components/logistics/AuditOffer.jsx       free audit offer
src/components/logistics/WhyArtX.jsx          why ArtX + founder
src/components/logistics/Technology.jsx       technology + security & control
src/components/logistics/Pilot.jsx            pilot + example scenarios
src/components/logistics/Faq.jsx              accessible accordion (11 questions)
src/components/logistics/FinalCta.jsx         final conversion section
src/components/logistics/LeadForm.jsx         lead form + booking block
src/lib/logisticsConfig.js                    owner-supplied configuration
src/lib/analytics.js                          consent-aware event dispatcher
api/logistics-lead.js                         serverless form endpoint
docs/LOGISTICS-PAGE-SETUP.md                  this file
```

**Changed**

```
vite.config.js              multi-page build input + dev clean-URL rewrite
src/components/Navbar.jsx   accepts links / homeHref / ctaLabel / ctaHref props
                            (defaults reproduce the homepage exactly)
public/sitemap.xml          new URL entry
public/llms.txt             new section for AI crawlers
```

**Untouched:** `index.html`, `src/App.jsx`, `src/main.jsx`, every existing
homepage section, `vercel.json`, `src/index.css`.
