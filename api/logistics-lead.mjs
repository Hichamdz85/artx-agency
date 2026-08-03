/**
 * POST /api/logistics-lead
 *
 * Receives the "Request a Free Workflow Audit" form from
 * /logistics-automation and delivers it to the ArtX inbox.
 *
 * Runtime: Vercel Node.js Function (no dependencies - plain fetch).
 * File extension is .mjs because this repository has no package.json,
 * so a plain .js function would be treated as CommonJS.
 *
 * Environment variables (all optional; see docs/LOGISTICS-PAGE-SETUP.md):
 *   RESEND_API_KEY          Resend API key used to send the notification.
 *   LEAD_NOTIFY_TO          Destination inbox, e.g. "hello@artx.agency".
 *   LEAD_NOTIFY_FROM        Verified sender, e.g. "ArtX <website@artx.agency>".
 *   LEAD_SEND_CONFIRMATION  "true" to also send the visitor a confirmation.
 *
 * Delivery guarantee: if e-mail is not configured - or the provider fails -
 * the complete submission is written to the function log with a LEAD_FALLBACK
 * marker so nothing is ever silently lost. The visitor still sees success,
 * because the request *was* received.
 */

/* ---------------------------------------------------------------
   Limits - mirrored on the client in logistics-automation.html
   --------------------------------------------------------------- */
const LIMITS = {
  firstName: 80,
  lastName: 80,
  workEmail: 160,
  company: 160,
  jobTitle: 120,
  website: 200,
  country: 80,
  companySize: 40,
  businessType: 60,
  challenge: 2000,
  systems: 500,
  frequency: 60,
  contactMethod: 40,
  phone: 40,
  meetingLanguage: 40,
  notes: 1500,
};

const REQUIRED = [
  "firstName",
  "lastName",
  "workEmail",
  "company",
  "jobTitle",
  "website",
  "country",
  "companySize",
  "businessType",
  "challenge",
  "systems",
  "frequency",
  "contactMethod",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const WEBSITE_RE = /^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(\/\S*)?$/i;

/**
 * Control characters to strip from every submitted value.
 * Tab (U+0009) and newline (U+000A) are intentionally preserved.
 * Built from a string literal so the source file stays pure ASCII.
 */
const CONTROL_RE = new RegExp("[\\u0000-\\u0008\\u000B\\u000C\\u000E-\\u001F\\u007F]", "g");

/** Minimum time a human needs to fill the form, in milliseconds. */
const MIN_ELAPSED_MS = 3000;

/* ---------------------------------------------------------------
   Helpers
   --------------------------------------------------------------- */

/** Strip control characters, normalise newlines, trim and cap length. */
function clean(value, max) {
  if (typeof value !== "string") return "";
  return value.replace(CONTROL_RE, "").replace(/\r\n?/g, "\n").trim().slice(0, max);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Best-effort per-IP throttle. Serverless instances are short-lived, so this
 * only blunts naive floods that hit the same warm instance.
 */
const hits = new Map();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 500) hits.clear(); // crude memory guard
  return recent.length > MAX_PER_WINDOW;
}

function clientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length) return forwarded.split(",")[0].trim();
  return req.socket?.remoteAddress || "unknown";
}

function emailDomain(address) {
  const at = address.lastIndexOf("@");
  return at === -1 ? "unknown" : address.slice(at + 1).toLowerCase();
}

/* ---------------------------------------------------------------
   E-mail delivery (Resend HTTP API - no SDK dependency)
   --------------------------------------------------------------- */
async function sendEmail({ to, from, subject, html, replyTo }) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      html,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Resend responded ${response.status}: ${detail.slice(0, 300)}`);
  }
  return response.json().catch(() => ({}));
}

function notificationHtml(lead, meta) {
  const row = (label, value) =>
    value
      ? `<tr>
           <td style="padding:6px 14px 6px 0;color:#666;vertical-align:top;white-space:nowrap;">${escapeHtml(label)}</td>
           <td style="padding:6px 0;color:#111;">${escapeHtml(value).replace(/\n/g, "<br>")}</td>
         </tr>`
      : "";

  return `<!doctype html>
<html><body style="margin:0;padding:24px;background:#f6f6f6;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
  <div style="max-width:640px;margin:0 auto;background:#fff;border-radius:12px;padding:28px;">
    <p style="margin:0 0 4px;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#888;">ArtX &middot; logistics-automation</p>
    <h1 style="margin:0 0 20px;font-size:20px;color:#111;">Free workflow audit request</h1>
    <table style="width:100%;border-collapse:collapse;font-size:14px;line-height:1.55;">
      ${row("Name", `${lead.firstName} ${lead.lastName}`)}
      ${row("Work e-mail", lead.workEmail)}
      ${row("Phone", lead.phone)}
      ${row("Job title", lead.jobTitle)}
      ${row("Company", lead.company)}
      ${row("Website", lead.website)}
      ${row("Country", lead.country)}
      ${row("Company size", lead.companySize)}
      ${row("Business type", lead.businessType)}
      ${row("Task frequency", lead.frequency)}
      ${row("Preferred contact", lead.contactMethod)}
      ${row("Meeting language", lead.meetingLanguage)}
    </table>
    <h2 style="margin:26px 0 8px;font-size:14px;color:#111;">Main workflow challenge</h2>
    <p style="margin:0;font-size:14px;line-height:1.6;color:#333;white-space:pre-wrap;">${escapeHtml(lead.challenge)}</p>
    <h2 style="margin:22px 0 8px;font-size:14px;color:#111;">Systems currently used</h2>
    <p style="margin:0;font-size:14px;line-height:1.6;color:#333;">${escapeHtml(lead.systems)}</p>
    ${
      lead.notes
        ? `<h2 style="margin:22px 0 8px;font-size:14px;color:#111;">Additional information</h2>
           <p style="margin:0;font-size:14px;line-height:1.6;color:#333;white-space:pre-wrap;">${escapeHtml(lead.notes)}</p>`
        : ""
    }
    <p style="margin:26px 0 0;padding-top:16px;border-top:1px solid #eee;font-size:12px;color:#999;">
      Received ${escapeHtml(meta.receivedAt)} &middot; consent given on submission
    </p>
  </div>
</body></html>`;
}

function confirmationHtml(lead) {
  return `<!doctype html>
<html><body style="margin:0;padding:24px;background:#f6f6f6;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:12px;padding:28px;">
    <h1 style="margin:0 0 14px;font-size:20px;color:#111;">Thank you, ${escapeHtml(lead.firstName)}.</h1>
    <p style="margin:0 0 14px;font-size:15px;line-height:1.6;color:#333;">
      We have received your workflow audit request. We will review the information you sent
      and come back to you regarding the next step.
    </p>
    <p style="margin:0 0 14px;font-size:15px;line-height:1.6;color:#333;">
      In the meantime, if you can share an example document or e-mail that represents the
      process, simply reply to this message.
    </p>
    <p style="margin:22px 0 0;font-size:13px;color:#888;">ArtX &mdash; artx.agency</p>
  </div>
</body></html>`;
}

/* ---------------------------------------------------------------
   Handler
   --------------------------------------------------------------- */
export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, message: "Method not allowed." });
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ ok: false, message: "Invalid request body." });
    }
  }
  if (!body || typeof body !== "object") {
    return res.status(400).json({ ok: false, message: "Invalid request body." });
  }

  // 1 - Spam gates. Both answer 200 so bots learn nothing from the response.
  if (clean(body.faxNumber, 80)) {
    console.warn("[logistics-lead] honeypot triggered");
    return res.status(200).json({ ok: true });
  }
  if (Number(body.elapsedMs) < MIN_ELAPSED_MS) {
    console.warn("[logistics-lead] submitted too fast:", body.elapsedMs);
    return res.status(200).json({ ok: true });
  }

  // 2 - Throttle
  const ip = clientIp(req);
  if (rateLimited(ip)) {
    return res
      .status(429)
      .json({ ok: false, message: "Too many requests. Please try again in a few minutes." });
  }

  // 3 - Sanitize
  const lead = {};
  for (const [field, max] of Object.entries(LIMITS)) {
    lead[field] = clean(body[field], max);
  }

  // 4 - Validate (server-side mirror of the client rules)
  const errors = [];
  for (const field of REQUIRED) {
    if (!lead[field]) errors.push(field);
  }
  if (lead.workEmail && !EMAIL_RE.test(lead.workEmail)) errors.push("workEmail");
  if (lead.website && !WEBSITE_RE.test(lead.website)) errors.push("website");
  if (lead.challenge && lead.challenge.length < 20) errors.push("challenge");
  if (body.consent !== true) errors.push("consent");

  if (errors.length) {
    return res.status(400).json({
      ok: false,
      message: "Some required information is missing or invalid.",
      fields: [...new Set(errors)],
    });
  }

  const meta = { receivedAt: new Date().toISOString(), ip };

  // 5 - Deliver
  const to = process.env.LEAD_NOTIFY_TO;
  const from = process.env.LEAD_NOTIFY_FROM;
  const configured = Boolean(process.env.RESEND_API_KEY && to && from);
  let delivered = false;

  if (configured) {
    try {
      await sendEmail({
        to,
        from,
        replyTo: lead.workEmail,
        subject: `Workflow audit request - ${lead.company} (${lead.businessType})`,
        html: notificationHtml(lead, meta),
      });
      delivered = true;

      if (process.env.LEAD_SEND_CONFIRMATION === "true") {
        try {
          await sendEmail({
            to: lead.workEmail,
            from,
            subject: "We received your workflow audit request - ArtX",
            html: confirmationHtml(lead),
          });
        } catch (error) {
          console.warn("[logistics-lead] confirmation e-mail failed:", error.message);
        }
      }
    } catch (error) {
      console.error("[logistics-lead] notification e-mail failed:", error.message);
    }
  }

  // 6 - Log. Redacted when delivery succeeded; complete when it did not, so a
  //     lead can always be recovered from the Vercel function logs.
  if (delivered) {
    console.log(
      "[logistics-lead] delivered",
      JSON.stringify({
        at: meta.receivedAt,
        emailDomain: emailDomain(lead.workEmail),
        country: lead.country,
        companySize: lead.companySize,
        businessType: lead.businessType,
        frequency: lead.frequency,
      }),
    );
  } else {
    console.warn(
      "[logistics-lead] LEAD_FALLBACK - e-mail delivery unavailable, full submission below",
      JSON.stringify({ ...lead, receivedAt: meta.receivedAt }),
    );
  }

  return res.status(200).json({ ok: true, delivered });
}
