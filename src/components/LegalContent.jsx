import { company, cookieInventory } from "../lib/company.js";

/**
 * Legal content components rendered inside <Modal>.
 *
 * All three documents are drafted for a Belgian SRL/BV creative agency under:
 *   • GDPR (Regulation 2016/679)
 *   • ePrivacy Directive (transposed in Belgian law on electronic communications)
 *   • Belgian Code of Economic Law, Book III, Title 2 (electronic commerce)
 *   • Belgian Data Protection Act (30 July 2018)
 *
 * The text uses placeholders ([TO_BE_FILLED]) where company-specific data
 * has to be inserted. Update `src/lib/company.js`, not this file.
 */

/* ─── shared primitives ─────────────────────────────────────────────────── */

const H = ({ children }) => (
  <h3 className="mb-3 mt-8 font-display text-lg font-extrabold tracking-tight text-white">
    {children}
  </h3>
);
const P = ({ children }) => <p className="mb-4 text-white/75">{children}</p>;
const Li = ({ children }) => (
  <li className="mb-1.5 flex gap-2">
    <span aria-hidden="true" className="text-artx-cyan">·</span>
    <span>{children}</span>
  </li>
);
const Ul = ({ children }) => <ul className="mb-4 space-y-1 text-white/75">{children}</ul>;
const Meta = ({ children }) => (
  <p className="mb-6 text-xs uppercase tracking-[0.18em] text-white/45">{children}</p>
);

/* ─── 1. Privacy Policy ─────────────────────────────────────────────────── */

export function PrivacyPolicy() {
  return (
    <>
      <Meta>
        Version {company.privacyPolicyVersion} · Last updated {company.privacyPolicyDate}
      </Meta>

      <P>
        This Privacy Policy explains how {company.legalName} ({company.tradingName})
        — referred to as <strong className="text-white">"we"</strong>,{" "}
        <strong className="text-white">"us"</strong> or{" "}
        <strong className="text-white">"ArtX"</strong> — collects and processes personal
        data through {company.website}, in compliance with the EU General Data Protection
        Regulation 2016/679 (<em>GDPR</em>) and the Belgian Data Protection Act of 30 July
        2018.
      </P>

      <H>1. Data controller</H>
      <P>
        {company.legalName}, {company.legalForm}<br />
        {company.address.line1}, {company.address.postalCode} {company.address.city},{" "}
        {company.address.country}<br />
        Company number (BCE/KBO): {company.registrationNumber}<br />
        VAT: {company.vatNumber}<br />
        Email:{" "}
        <a className="text-artx-cyan underline-offset-4 hover:underline" href={`mailto:${company.email}`}>
          {company.email}
        </a>
        <br />
        Data-protection contact:{" "}
        <a className="text-artx-cyan underline-offset-4 hover:underline" href={`mailto:${company.dpoEmail}`}>
          {company.dpoEmail}
        </a>
      </P>

      <H>2. What data we collect</H>
      <P>We only collect what we need to run the business and reply to enquiries:</P>
      <Ul>
        <Li><strong className="text-white">Contact data</strong> — name, email address, optional company name and message — when you email us or fill in a brief.</Li>
        <Li><strong className="text-white">Technical data</strong> — IP address, browser type and OS, referrer, pages viewed — collected automatically by our hosting provider for security and operational logs.</Li>
        <Li><strong className="text-white">Analytics data</strong> — aggregated and anonymised, only if you explicitly opt in via the cookie banner.</Li>
      </Ul>
      <P>We do not collect special categories of data (Article 9 GDPR).</P>

      <H>3. Purposes and legal bases (Article 6 GDPR)</H>
      <Ul>
        <Li><strong className="text-white">Replying to your enquiry</strong> — legal basis: pre-contractual measures / our legitimate interest in conducting business.</Li>
        <Li><strong className="text-white">Performing a signed contract</strong> — legal basis: contract performance.</Li>
        <Li><strong className="text-white">Security and abuse prevention</strong> — legal basis: legitimate interest.</Li>
        <Li><strong className="text-white">Analytics and improvement of the website</strong> — legal basis: your explicit consent, withdrawable at any time.</Li>
        <Li><strong className="text-white">Compliance with legal obligations</strong> — e.g. tax records — legal basis: legal obligation.</Li>
      </Ul>

      <H>4. Retention periods</H>
      <Ul>
        <Li>Enquiry emails: up to 24 months after our last interaction, unless a contract follows.</Li>
        <Li>Client contractual data: the duration of the engagement plus 10 years (Belgian accounting law).</Li>
        <Li>Server logs: 30 days.</Li>
        <Li>Analytics consent record: 12 months, or until you withdraw it.</Li>
      </Ul>

      <H>5. Recipients & sub-processors</H>
      <P>
        Your data is only shared with the service providers strictly needed to operate
        the site and run our business — currently:
      </P>
      <Ul>
        <Li>
          <strong className="text-white">{company.host.name}</strong> — hosting and content
          delivery ({company.host.address}). Data may transit EU and US data centres under
          the EU-US Data Privacy Framework.
        </Li>
        <Li>Belgian accountants and tax authorities, where legally required.</Li>
      </Ul>
      <P>
        We do not sell personal data and we do not share it with advertisers.
      </P>

      <H>6. Your rights</H>
      <P>You can exercise the following rights free of charge at any time:</P>
      <Ul>
        <Li>Right of access (Art. 15) — get a copy of your data.</Li>
        <Li>Right to rectification (Art. 16) — correct inaccurate data.</Li>
        <Li>Right to erasure (Art. 17) — "right to be forgotten".</Li>
        <Li>Right to restriction (Art. 18) and objection (Art. 21).</Li>
        <Li>Right to data portability (Art. 20).</Li>
        <Li>Right to withdraw consent at any time, without affecting prior lawful processing.</Li>
      </Ul>
      <P>
        To exercise any of these rights, email{" "}
        <a className="text-artx-cyan underline-offset-4 hover:underline" href={`mailto:${company.dpoEmail}`}>
          {company.dpoEmail}
        </a>
        . We respond within one month (extendable by two months under Article 12(3) GDPR
        in complex cases).
      </P>

      <H>7. Right to lodge a complaint</H>
      <P>
        If you believe we are mishandling your data, you may lodge a complaint with the
        Belgian supervisory authority:
      </P>
      <P>
        <strong className="text-white">{company.supervisoryAuthority.name}</strong><br />
        {company.supervisoryAuthority.address}<br />
        Phone: {company.supervisoryAuthority.phone}<br />
        Web:{" "}
        <a
          className="text-artx-cyan underline-offset-4 hover:underline"
          href={company.supervisoryAuthority.website}
          target="_blank"
          rel="noopener noreferrer"
        >
          {company.supervisoryAuthority.website.replace("https://", "")}
        </a>
      </P>

      <H>8. International transfers</H>
      <P>
        Where data is transferred outside the European Economic Area (e.g. to our US
        hosting provider), we rely on the European Commission's adequacy decisions and
        on Standard Contractual Clauses (SCCs) approved under Article 46(2) GDPR.
      </P>

      <H>9. Automated decision-making</H>
      <P>
        We do not use your personal data for automated decision-making with legal effects
        on you (Article 22 GDPR).
      </P>

      <H>10. Changes to this policy</H>
      <P>
        We may update this Privacy Policy occasionally. Material changes will be flagged
        on the site at least 30 days before they take effect.
      </P>
    </>
  );
}

/* ─── 2. Cookie Policy ──────────────────────────────────────────────────── */

export function CookiePolicy({ onOpenPreferences }) {
  return (
    <>
      <Meta>
        Version {company.cookiePolicyVersion} · Last updated {company.cookiePolicyDate}
      </Meta>

      <P>
        This Cookie Policy explains how {company.legalName} uses cookies and similar
        technologies on {company.website}, in line with Article 5(3) of the ePrivacy
        Directive (transposed in Belgian law) and Article 7 GDPR for consent.
      </P>

      <H>1. What are cookies?</H>
      <P>
        Cookies are small files placed on your device that store information so the site
        can remember you across visits. We use a broader definition that also includes{" "}
        <em>localStorage</em>, <em>sessionStorage</em>, and similar browser storage.
      </P>

      <H>2. Categories we use</H>

      {Object.entries(cookieInventory).map(([key, cat]) => (
        <div key={key} className="mb-6 rounded-xl border border-white/[0.08] bg-white/[0.02] p-5">
          <div className="mb-2 flex items-center gap-3">
            <h4 className="font-display text-base font-extrabold text-white">{cat.name}</h4>
            <span
              className={
                cat.required
                  ? "rounded-full bg-artx-cyan/15 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.18em] text-artx-cyan"
                  : "rounded-full border border-white/15 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.18em] text-white/60"
              }
            >
              {cat.required ? "Always active" : "Opt-in required"}
            </span>
          </div>
          <p className="mb-3 text-sm text-white/65">{cat.description}</p>
          <table className="w-full text-left text-xs text-white/70">
            <thead className="text-[10px] uppercase tracking-[0.18em] text-white/45">
              <tr>
                <th className="pb-1.5 pr-3">Name</th>
                <th className="pb-1.5 pr-3">Type</th>
                <th className="pb-1.5 pr-3">Purpose</th>
                <th className="pb-1.5">Duration</th>
              </tr>
            </thead>
            <tbody>
              {cat.items.map((item, i) => (
                <tr key={i} className="border-t border-white/[0.06]">
                  <td className="py-1.5 pr-3 font-mono text-white/85">{item.name}</td>
                  <td className="py-1.5 pr-3">{item.type}</td>
                  <td className="py-1.5 pr-3">{item.purpose}</td>
                  <td className="py-1.5">{item.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      <H>3. Your choices</H>
      <P>
        You can change or withdraw your consent at any time by clicking the button below.
        Refusing optional cookies has no impact on your access to the site.
      </P>
      <button
        type="button"
        onClick={onOpenPreferences}
        className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-artx-cyan"
      >
        Manage cookie preferences →
      </button>

      <H>4. Browser settings</H>
      <P>
        You can also block or delete cookies directly in your browser settings (Chrome,
        Safari, Firefox, Edge). Note that this may break the site's functionality.
      </P>
    </>
  );
}

/* ─── 3. Legal Notice / Mentions légales ────────────────────────────────── */

export function LegalNotice() {
  return (
    <>
      <Meta>Required under Belgian Code of Economic Law, Book III, art. III.74</Meta>

      <H>Editor of the website</H>
      <P>
        <strong className="text-white">{company.legalName}</strong><br />
        Legal form: {company.legalForm}<br />
        Registered office: {company.address.line1}, {company.address.postalCode}{" "}
        {company.address.city}, {company.address.country}<br />
        Company number (BCE/KBO): {company.registrationNumber}<br />
        VAT: {company.vatNumber}<br />
        Publisher / responsible person: {company.director}<br />
        Email:{" "}
        <a className="text-artx-cyan underline-offset-4 hover:underline" href={`mailto:${company.email}`}>
          {company.email}
        </a>
        <br />
        Website: {company.website}
      </P>

      <H>Hosting provider</H>
      <P>
        <strong className="text-white">{company.host.name}</strong><br />
        {company.host.address}<br />
        Web:{" "}
        <a
          className="text-artx-cyan underline-offset-4 hover:underline"
          href={company.host.website}
          target="_blank"
          rel="noopener noreferrer"
        >
          {company.host.website.replace("https://", "")}
        </a>
      </P>

      <H>Intellectual property</H>
      <P>
        The entire site — including the ArtX wordmark, the gradient mark, the Grift
        typeface (licensed), all text, design and code — is the exclusive property of{" "}
        {company.legalName} or its licensors. Reproduction, distribution, modification or
        commercial use of any element without prior written authorisation is prohibited
        under Belgian copyright law (Code of Economic Law, Book XI).
      </P>

      <H>Liability</H>
      <P>
        We make every effort to keep the information on this site accurate and up to date,
        but we cannot guarantee its completeness or fitness for a particular purpose.
        Information is provided "as is". We disclaim liability for any indirect or
        consequential damage arising from your use of the site, except in cases of gross
        negligence or wilful misconduct.
      </P>

      <H>Applicable law and jurisdiction</H>
      <P>
        This notice and any use of the site are governed by{" "}
        <strong className="text-white">Belgian law</strong>. Any dispute that cannot be
        resolved amicably falls under the exclusive jurisdiction of the courts of the
        judicial district in which the registered office of {company.tradingName} is
        located.
      </P>

      <H>Contact</H>
      <P>
        For any question about this notice, write to{" "}
        <a className="text-artx-cyan underline-offset-4 hover:underline" href={`mailto:${company.email}`}>
          {company.email}
        </a>
        .
      </P>
    </>
  );
}
