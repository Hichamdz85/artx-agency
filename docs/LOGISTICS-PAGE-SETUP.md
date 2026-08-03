# /logistics-automation - setup notes

The page is live-ready as it stands. Everything below is a value only the site
owner can supply. Nothing here blocks the page from working: each item has a
safe fallback, and no unverified claim is ever shown to a visitor.

---

## 1 - How the page is built

`logistics-automation.html` is a normal page of this static site, built exactly
like `services.html` and `pricing.html`:

- The `<nav id="navbar">` block and the `<footer>` block are **byte-for-byte
  identical** to `services.html`. Nothing shared was edited.
- The page content lives in one self-contained `<section class="artx-pg la">`
  with its own scoped `<style>` blocks - the same convention the other inner
  pages already use. No global CSS was touched.
- Design tokens are the live site's own: background `#060609`, accent
  `#D0F601`, cards `#141515` with `22px` radius, Gordita type, pill buttons.
- Vercel `cleanUrls: true` (already in `vercel.json`) serves it at
  `/logistics-automation`. No routing change was needed.

---

## 2 - Required before the first campaign

### 2.1 Lead delivery (email)

The form posts to `POST /api/logistics-lead` (`api/logistics-lead.mjs`, a Vercel
Node function with zero dependencies). Without configuration it still **accepts
and preserves** every submission: the complete lead is written to the function
log with a `LEAD_FALLBACK` marker (Vercel -> Project -> Logs). Configure these
to receive it by email instead:

| Variable | Example | Notes |
|---|---|---|
| `RESEND_API_KEY` | `re_xxxxxxxx` | Create at resend.com. Any provider can replace it - see `sendEmail()` in the function. |
| `LEAD_NOTIFY_TO` | `hello@artx.agency` | Destination inbox. |
| `LEAD_NOTIFY_FROM` | `ArtX <website@artx.agency>` | Must be a domain verified with the provider. |
| `LEAD_SEND_CONFIRMATION` | `true` | Optional. Also sends the visitor a confirmation email. |

Set them in **Vercel -> Project -> Settings -> Environment Variables**
(Production + Preview). Never commit them.

The notification email sets `reply_to` to the lead's address, so replying from
the inbox reaches them directly.

> The file uses the `.mjs` extension on purpose: this repository has no
> `package.json`, so a plain `.js` function would be treated as CommonJS and the
> `export default` handler would fail.

### 2.2 Booking link

The two "Book an introductory call" buttons open a pre-filled email to
`hello@artx.agency`. To point them at a real scheduler instead, add one line
before the page's closing `</body>` (or in your tag manager):

```html
<script>window.ARTX_BOOKING_URL = "https://cal.com/artx/intro";</script>
```

The page then rewrites both buttons to that URL, opens them in a new tab and
removes the "pre-filled email" note. Works with Calendly, Cal.com, HubSpot
Meetings or Microsoft Bookings.

---

## 3 - Content awaiting your approval

Two founder achievements were supplied but are **deliberately not published**,
because they are not independently verifiable from the page:

- "Helped scale charitable fundraising from QAR 30 million to QAR 450 million"
- "Supported the growth of a business from approximately USD 4,000 to USD 13 million over five years"

To publish one, add it as a list item in the founder block of
`logistics-automation.html` (search for `Leadership`). Only add what you are
prepared to substantiate.

The credibility strip states "Based in Brussels. Working with businesses across
Europe and international markets." Remove that line if it is ever inconsistent
with the registered company details.

---

## 4 - Recommended, not required

| Item | Status | Action |
|---|---|---|
| **Open Graph image** | Reuses the site-wide `artx-assets/og-image.png` | A page-specific 1200x630 image would improve link previews. Replace the `og:image` / `twitter:image` values in the page head. |
| **Navigation entry** | Not added | The shared `<nav>` is duplicated across all nine HTML files, so adding a link means editing all of them. The page is reachable by direct URL and is internally linked from its own breadcrumb schema. Say the word and it can be added site-wide in one pass. |
| **sitemap.xml / robots.txt** | Neither exists on the live site (both return 404) | Adding a sitemap would help this page get discovered. Not created here because it affects site-wide SEO and should be a deliberate decision. |
| **Analytics** | Events are pushed to `window.artxDataLayer`, and mirrored into `window.dataLayer` when a tag manager is present | Install GTM (the head already has an empty GTM comment block) and the events start flowing with no page changes. |
| **Contact page form** | `contact.html` has no `<form>` at all | The audit form on this page is the site's first working form. The same endpoint can serve `contact.html` later. |

---

## 5 - Deliberate omissions

- **No file upload.** It needs storage, virus scanning and a retention policy -
  business decisions, not defaults. The confirmation email invites the lead to
  reply with an attachment instead, which achieves the same result with no new
  attack surface.
- **No client logos, testimonials, case studies, ratings, awards or counts.**
  None were verified. The "Example automation scenarios" cards are labelled
  "Example scenario" and "Potential impact" on every card.
- **No `AggregateRating`, `Review`, `LocalBusiness` or award markup** in the
  structured data, for the same reason.
- **Technology names carry no logos** and are introduced as integration targets,
  so no partnership is implied.

---

## 6 - Analytics events

| Event | Fired when | Properties |
|---|---|---|
| `logistics_cta_click` | Any audit / use-case CTA | `location` |
| `logistics_booking_click` | Either booking button | `location` |
| `logistics_form_start` | First focus inside the form | - |
| `logistics_form_validation_failure` | Client-side validation blocks submit | `fields` |
| `logistics_form_submit_success` | 200 from the API | `companySize`, `businessType`, `country` |
| `logistics_form_submit_error` | Network or server error | - |
| `logistics_faq_open` | An FAQ item is expanded | `question` |

No event carries a name, email address, company name or free text.

---

## 7 - Verified

| Check | Result |
|---|---|
| Lighthouse desktop | 100 accessibility / 100 best practices / 100 SEO / 100 agentic browsing |
| Lighthouse mobile | 100 / 100 / 100 / 100 (61 audits, 0 failures) |
| Console | zero errors, zero warnings |
| Horizontal overflow at 375px | none |
| Heading structure | one `h1`, 15 `h2`, 37 `h3` |
| Shared nav / footer | byte-for-byte identical to `services.html` |
| Other pages | untouched |
| Form | empty-submit validation, success state, error state, honeypot, time trap |
| API | 13/13 unit tests (validation, honeypot, rate limit, control-character and HTML sanitisation) |

---

## 8 - Local testing

The repository is a plain static site, so any static server works, as long as it
reproduces Vercel's `cleanUrls`:

```bash
npx serve . -l 4199
```

Then open `http://localhost:4199/logistics-automation.html`.

`vercel dev` is the only way to exercise `/api/logistics-lead` locally. With a
plain static server the form reports a network error on submit - that is
expected, and the error state is part of the design.

---

## 9 - Files

**Added**

```
logistics-automation.html      the page (head, content, scoped CSS, form script)
api/logistics-lead.mjs         serverless form endpoint
docs/LOGISTICS-PAGE-SETUP.md   this file
```

**Changed:** nothing. `index.html`, `services.html`, `pricing.html`,
`blog.html`, `contact.html`, `404.html`, the policy pages, `vercel.json`, the
shared CSS and every asset are exactly as they were.
