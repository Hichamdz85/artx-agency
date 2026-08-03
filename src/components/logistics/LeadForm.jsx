import { useEffect, useMemo, useRef, useState } from "react";
import { track } from "../../lib/analytics.js";
import {
  BOOKING_HREF,
  BOOKING_URL,
  CONTACT_EMAIL,
  HAS_BOOKING,
  LEAD_ENDPOINT,
} from "../../lib/logisticsConfig.js";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Eyebrow,
  Reveal,
  SecondaryAction,
  Section,
  SectionTitle,
} from "./ui.jsx";

/* =========================================================
   Option lists
   ========================================================= */
const COMPANY_SIZES = [
  "1–9 employees",
  "10–49 employees",
  "50–249 employees",
  "250–999 employees",
  "1,000+ employees",
];

const BUSINESS_TYPES = [
  "Freight forwarding",
  "Road transportation",
  "Air freight",
  "Sea freight",
  "Warehousing",
  "Import/export",
  "Customs services",
  "Distribution",
  "E-commerce logistics",
  "Supply-chain operations",
  "Other",
];

const FREQUENCIES = [
  "1–5 times per week",
  "6–20 times per week",
  "21–50 times per week",
  "51–200 times per week",
  "More than 200 times per week",
  "Not sure yet",
];

const CONTACT_METHODS = ["E-mail", "Phone call", "Video call", "WhatsApp"];

const MEETING_LANGUAGES = ["English", "French", "Dutch", "Arabic", "Turkish", "Other"];

const COUNTRIES = [
  "Belgium",
  "Netherlands",
  "Luxembourg",
  "France",
  "Germany",
  "Spain",
  "Portugal",
  "Italy",
  "Austria",
  "Switzerland",
  "United Kingdom",
  "Ireland",
  "Denmark",
  "Sweden",
  "Norway",
  "Finland",
  "Poland",
  "Czechia",
  "Slovakia",
  "Hungary",
  "Romania",
  "Bulgaria",
  "Greece",
  "Croatia",
  "Slovenia",
  "Estonia",
  "Latvia",
  "Lithuania",
  "Türkiye",
  "Morocco",
  "Algeria",
  "Tunisia",
  "Egypt",
  "United Arab Emirates",
  "Saudi Arabia",
  "United States",
  "Canada",
  "Other",
];

/* =========================================================
   Validation — mirrored server-side in api/logistics-lead.js
   ========================================================= */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const WEBSITE_RE = /^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(\/\S*)?$/i;

const INITIAL = {
  firstName: "",
  lastName: "",
  workEmail: "",
  company: "",
  jobTitle: "",
  website: "",
  country: "",
  companySize: "",
  businessType: "",
  challenge: "",
  systems: "",
  frequency: "",
  contactMethod: "",
  phone: "",
  meetingLanguage: "",
  notes: "",
  consent: false,
  // Honeypot — must stay empty. Named to look attractive to naive bots.
  faxNumber: "",
};

function validate(values) {
  const errors = {};
  const req = (key, message) => {
    if (!String(values[key] ?? "").trim()) errors[key] = message;
  };

  req("firstName", "Please enter your first name.");
  req("lastName", "Please enter your last name.");
  req("company", "Please enter your company name.");
  req("jobTitle", "Please enter your job title.");
  req("country", "Please select your country.");
  req("companySize", "Please select your company size.");
  req("businessType", "Please select the type of logistics business.");
  req("frequency", "Please estimate how often the task occurs.");
  req("contactMethod", "Please choose a preferred contact method.");

  if (!values.workEmail.trim()) {
    errors.workEmail = "Please enter your work e-mail address.";
  } else if (!EMAIL_RE.test(values.workEmail.trim())) {
    errors.workEmail = "Please enter a valid e-mail address, for example name@company.com.";
  }

  if (!values.website.trim()) {
    errors.website = "Please enter your company website.";
  } else if (!WEBSITE_RE.test(values.website.trim())) {
    errors.website = "Please enter a valid website, for example company.com.";
  }

  const challenge = values.challenge.trim();
  if (!challenge) {
    errors.challenge = "Please describe the workflow you would like us to review.";
  } else if (challenge.length < 20) {
    errors.challenge = "Please add a little more detail — at least a full sentence.";
  }

  if (!values.systems.trim()) {
    errors.systems = "Please list the main systems your team uses today.";
  }

  if (!values.consent) {
    errors.consent = "Please confirm that ArtX may contact you about this request.";
  }

  return errors;
}

/* =========================================================
   Field primitives
   ========================================================= */
const fieldBase =
  "w-full rounded-xl border bg-white/[0.03] px-4 py-3.5 text-sm text-white placeholder:text-white/35 transition-colors focus:border-artx-cyan/60 focus:bg-white/[0.05] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-artx-cyan";

function FieldShell({ id, label, error, hint, required, children, className = "" }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-white/85">
        {label}
        {required ? (
          <span className="text-artx-cyan"> *</span>
        ) : (
          <span className="ml-1.5 text-xs font-normal text-white/40">(optional)</span>
        )}
      </label>
      {hint ? <p className="mt-1 text-xs text-white/45">{hint}</p> : null}
      <div className="mt-2">{children}</div>
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-xs text-[#ff8a8a]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Input({ id, error, ...rest }) {
  return (
    <input
      id={id}
      name={id}
      aria-invalid={error ? "true" : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
      className={`${fieldBase} ${error ? "border-[#ff8a8a]/60" : "border-white/10"}`}
      {...rest}
    />
  );
}

function Select({ id, error, options, placeholder, ...rest }) {
  return (
    <div className="relative">
      <select
        id={id}
        name={id}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${fieldBase} appearance-none pr-11 ${
          error ? "border-[#ff8a8a]/60" : "border-white/10"
        }`}
        {...rest}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option} className="bg-[#0a0a0a] text-white">
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/45" />
    </div>
  );
}

function Textarea({ id, error, ...rest }) {
  return (
    <textarea
      id={id}
      name={id}
      aria-invalid={error ? "true" : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
      className={`${fieldBase} min-h-[7.5rem] resize-y leading-relaxed ${
        error ? "border-[#ff8a8a]/60" : "border-white/10"
      }`}
      {...rest}
    />
  );
}

/* =========================================================
   Booking block
   ========================================================= */
function BookingBlock() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-7">
      <h3 className="font-display text-2xl font-extrabold leading-tight text-white">
        Prefer to speak directly?
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-white/65">
        Book a short introductory conversation to discuss your workflow and determine
        whether an automation audit is appropriate.
      </p>
      <div className="mt-6">
        <SecondaryAction
          href={BOOKING_HREF}
          {...(HAS_BOOKING ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="w-full !px-6 !py-4 sm:w-auto"
          onClick={() =>
            track("logistics_booking_click", {
              location: "form_sidebar",
              mode: HAS_BOOKING ? "scheduler" : "email",
            })
          }
        >
          Book an Introductory Call
          <ArrowRight />
        </SecondaryAction>
      </div>
      {!HAS_BOOKING && (
        <p className="mt-4 text-xs leading-relaxed text-white/45">
          Opens a pre-filled e-mail to {CONTACT_EMAIL}. A live scheduling link can be added
          at any time — see the setup notes.
        </p>
      )}
    </div>
  );
}

/* =========================================================
   Lead form
   ========================================================= */
export default function LeadForm() {
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [submitError, setSubmitError] = useState("");
  const startedRef = useRef(false);
  const formRef = useRef(null);
  const successRef = useRef(null);
  const mountedAt = useMemo(() => Date.now(), []);

  useEffect(() => {
    if (status === "success" && successRef.current) successRef.current.focus();
  }, [status]);

  const onFirstInteraction = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    track("logistics_form_start");
  };

  const setField = (key) => (event) => {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === "submitting") return;

    const found = validate(values);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      track("logistics_form_validation_failure", { fields: Object.keys(found).join(",") });
      const firstKey = Object.keys(found)[0];
      const el = formRef.current?.querySelector(`#${firstKey}`);
      if (el) {
        el.focus();
        el.scrollIntoView({ block: "center", behavior: "smooth" });
      }
      return;
    }

    setStatus("submitting");
    setSubmitError("");

    try {
      const response = await fetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, elapsedMs: Date.now() - mountedAt }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.message || "The request could not be submitted.");
      }

      setStatus("success");
      // Categorical properties only — no names, e-mails or free text.
      track("logistics_form_submit_success", {
        companySize: values.companySize,
        businessType: values.businessType,
        country: values.country,
      });
    } catch (error) {
      setStatus("error");
      setSubmitError(
        error?.message ||
          "Something went wrong while sending your request. Please try again, or e-mail us directly.",
      );
      track("logistics_form_submit_error");
    }
  };

  const submitting = status === "submitting";

  return (
    <Section id="lead-form" aria-labelledby="lead-form-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Intro + booking */}
        <div className="lg:col-span-4">
          <Reveal className="lg:sticky lg:top-32">
            <Eyebrow>Audit request</Eyebrow>
            <SectionTitle
              id="lead-form-title"
              accent="workflow"
              className="!text-3xl sm:!text-4xl lg:!text-5xl"
            >
              Tell us about one
            </SectionTitle>
            <p className="mt-6 text-base leading-relaxed text-white/70">
              The more concrete the process, the more useful the audit. One recurring task is
              enough to start.
            </p>

            <div className="mt-10">
              <BookingBlock />
            </div>
          </Reveal>
        </div>

        {/* Form */}
        <div className="lg:col-span-8">
          {status === "success" ? (
            <Reveal
              y={16}
              className="rounded-2xl border border-artx-cyan/25 bg-gradient-to-b from-artx-cyan/[0.07] to-transparent p-8 sm:p-10"
            >
              <div
                ref={successRef}
                tabIndex={-1}
                role="status"
                aria-live="polite"
                className="focus:outline-none"
              >
                <span
                  aria-hidden="true"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-artx-cyan/40 bg-artx-cyan/10 text-artx-cyan"
                >
                  <Check className="!h-5 !w-5" />
                </span>
                <h3 className="mt-6 font-display text-2xl font-extrabold text-white sm:text-3xl">
                  Thank you. Your request has been received.
                </h3>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70">
                  We will review the workflow information and contact you regarding the next
                  step.
                </p>
                <p className="mt-6 text-sm text-white/55">
                  Anything to add in the meantime? Write to{" "}
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-artx-cyan underline-offset-4 hover:underline"
                  >
                    {CONTACT_EMAIL}
                  </a>
                  .
                </p>
              </div>
            </Reveal>
          ) : (
            <Reveal y={20}>
              <form
                ref={formRef}
                noValidate
                onSubmit={handleSubmit}
                onFocusCapture={onFirstInteraction}
                className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 sm:p-9"
              >
                {/* Honeypot — hidden from humans and assistive technology */}
                <div aria-hidden="true" className="absolute h-px w-px overflow-hidden opacity-0">
                  <label htmlFor="faxNumber">Fax number</label>
                  <input
                    id="faxNumber"
                    name="faxNumber"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={values.faxNumber}
                    onChange={setField("faxNumber")}
                  />
                </div>

                <fieldset disabled={submitting} className="border-0 p-0">
                  <legend className="sr-only">Free workflow audit request</legend>

                  {/* — About you — */}
                  <p className="text-xs uppercase tracking-[0.22em] text-white/50">
                    About you
                  </p>
                  <div className="mt-5 grid gap-5 sm:grid-cols-2">
                    <FieldShell id="firstName" label="First name" required error={errors.firstName}>
                      <Input
                        id="firstName"
                        type="text"
                        autoComplete="given-name"
                        value={values.firstName}
                        onChange={setField("firstName")}
                        error={errors.firstName}
                        required
                      />
                    </FieldShell>

                    <FieldShell id="lastName" label="Last name" required error={errors.lastName}>
                      <Input
                        id="lastName"
                        type="text"
                        autoComplete="family-name"
                        value={values.lastName}
                        onChange={setField("lastName")}
                        error={errors.lastName}
                        required
                      />
                    </FieldShell>

                    <FieldShell id="workEmail" label="Work e-mail" required error={errors.workEmail}>
                      <Input
                        id="workEmail"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        placeholder="name@company.com"
                        value={values.workEmail}
                        onChange={setField("workEmail")}
                        error={errors.workEmail}
                        required
                      />
                    </FieldShell>

                    <FieldShell id="jobTitle" label="Job title" required error={errors.jobTitle}>
                      <Input
                        id="jobTitle"
                        type="text"
                        autoComplete="organization-title"
                        placeholder="Head of Operations"
                        value={values.jobTitle}
                        onChange={setField("jobTitle")}
                        error={errors.jobTitle}
                        required
                      />
                    </FieldShell>

                    <FieldShell id="phone" label="Phone number" error={errors.phone}>
                      <Input
                        id="phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="+32 ..."
                        value={values.phone}
                        onChange={setField("phone")}
                      />
                    </FieldShell>

                    <FieldShell
                      id="meetingLanguage"
                      label="Preferred meeting language"
                      error={errors.meetingLanguage}
                    >
                      <Select
                        id="meetingLanguage"
                        placeholder="Select a language"
                        options={MEETING_LANGUAGES}
                        value={values.meetingLanguage}
                        onChange={setField("meetingLanguage")}
                      />
                    </FieldShell>
                  </div>

                  {/* — Company — */}
                  <p className="mt-10 border-t border-white/[0.07] pt-8 text-xs uppercase tracking-[0.22em] text-white/50">
                    Your company
                  </p>
                  <div className="mt-5 grid gap-5 sm:grid-cols-2">
                    <FieldShell id="company" label="Company name" required error={errors.company}>
                      <Input
                        id="company"
                        type="text"
                        autoComplete="organization"
                        value={values.company}
                        onChange={setField("company")}
                        error={errors.company}
                        required
                      />
                    </FieldShell>

                    <FieldShell id="website" label="Company website" required error={errors.website}>
                      <Input
                        id="website"
                        type="text"
                        inputMode="url"
                        autoComplete="url"
                        placeholder="company.com"
                        value={values.website}
                        onChange={setField("website")}
                        error={errors.website}
                        required
                      />
                    </FieldShell>

                    <FieldShell id="country" label="Country" required error={errors.country}>
                      <Select
                        id="country"
                        placeholder="Select a country"
                        options={COUNTRIES}
                        value={values.country}
                        onChange={setField("country")}
                        error={errors.country}
                        required
                      />
                    </FieldShell>

                    <FieldShell
                      id="companySize"
                      label="Company size"
                      required
                      error={errors.companySize}
                    >
                      <Select
                        id="companySize"
                        placeholder="Select a range"
                        options={COMPANY_SIZES}
                        value={values.companySize}
                        onChange={setField("companySize")}
                        error={errors.companySize}
                        required
                      />
                    </FieldShell>

                    <FieldShell
                      id="businessType"
                      label="Type of logistics business"
                      required
                      error={errors.businessType}
                      className="sm:col-span-2"
                    >
                      <Select
                        id="businessType"
                        placeholder="Select the closest match"
                        options={BUSINESS_TYPES}
                        value={values.businessType}
                        onChange={setField("businessType")}
                        error={errors.businessType}
                        required
                      />
                    </FieldShell>
                  </div>

                  {/* — Workflow — */}
                  <p className="mt-10 border-t border-white/[0.07] pt-8 text-xs uppercase tracking-[0.22em] text-white/50">
                    The workflow
                  </p>
                  <div className="mt-5 grid gap-5">
                    <FieldShell
                      id="challenge"
                      label="Main workflow challenge"
                      required
                      error={errors.challenge}
                      hint="One recurring process is enough. Describe what happens today."
                    >
                      <Textarea
                        id="challenge"
                        rows={4}
                        maxLength={2000}
                        placeholder="Example: Our team manually copies shipment data from incoming emails into Excel and then prepares customer updates."
                        value={values.challenge}
                        onChange={setField("challenge")}
                        error={errors.challenge}
                        required
                      />
                    </FieldShell>

                    <FieldShell
                      id="systems"
                      label="Systems currently used"
                      required
                      error={errors.systems}
                    >
                      <Input
                        id="systems"
                        type="text"
                        maxLength={500}
                        placeholder="Example: Outlook, Excel, CargoWise, HubSpot, internal ERP…"
                        value={values.systems}
                        onChange={setField("systems")}
                        error={errors.systems}
                        required
                      />
                    </FieldShell>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <FieldShell
                        id="frequency"
                        label="How often does the task occur?"
                        required
                        error={errors.frequency}
                      >
                        <Select
                          id="frequency"
                          placeholder="Select an estimate"
                          options={FREQUENCIES}
                          value={values.frequency}
                          onChange={setField("frequency")}
                          error={errors.frequency}
                          required
                        />
                      </FieldShell>

                      <FieldShell
                        id="contactMethod"
                        label="Preferred contact method"
                        required
                        error={errors.contactMethod}
                      >
                        <Select
                          id="contactMethod"
                          placeholder="Select a method"
                          options={CONTACT_METHODS}
                          value={values.contactMethod}
                          onChange={setField("contactMethod")}
                          error={errors.contactMethod}
                          required
                        />
                      </FieldShell>
                    </div>

                    <FieldShell id="notes" label="Additional information" error={errors.notes}>
                      <Textarea
                        id="notes"
                        rows={3}
                        maxLength={1500}
                        placeholder="Anything else that helps us understand the process, the systems or the constraints."
                        value={values.notes}
                        onChange={setField("notes")}
                      />
                    </FieldShell>
                  </div>

                  {/* — Consent — */}
                  <div className="mt-8 border-t border-white/[0.07] pt-8">
                    <div className="flex items-start gap-3">
                      <input
                        id="consent"
                        name="consent"
                        type="checkbox"
                        checked={values.consent}
                        onChange={setField("consent")}
                        aria-invalid={errors.consent ? "true" : undefined}
                        aria-describedby={errors.consent ? "consent-error" : undefined}
                        className="mt-0.5 h-5 w-5 shrink-0 rounded border-white/25 bg-white/5 accent-artx-purple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-artx-cyan"
                        required
                      />
                      <label htmlFor="consent" className="text-sm leading-relaxed text-white/70">
                        By submitting this form, you agree that ArtX may contact you regarding
                        your request. Your information will be handled according to the{" "}
                        <button
                          type="button"
                          onClick={() =>
                            window.dispatchEvent(
                              new CustomEvent("artx:open-modal", { detail: "privacy" }),
                            )
                          }
                          className="rounded-sm text-artx-cyan underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-artx-cyan"
                        >
                          privacy policy
                        </button>
                        .
                      </label>
                    </div>
                    {errors.consent ? (
                      <p id="consent-error" className="mt-2 text-xs text-[#ff8a8a]">
                        {errors.consent}
                      </p>
                    ) : null}
                  </div>

                  {/* — Submit — */}
                  <div className="mt-8 flex flex-col gap-4">
                    <button
                      type="submit"
                      data-cursor="view"
                      data-cursor-label="Send"
                      className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-white px-8 py-4.5 text-base font-semibold text-black transition-transform hover:scale-[1.02] disabled:cursor-progress disabled:opacity-70 disabled:hover:scale-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-artx-cyan sm:w-auto sm:self-start"
                    >
                      {submitting ? (
                        <>
                          <span
                            aria-hidden="true"
                            className="h-4 w-4 animate-spin rounded-full border-2 border-black/25 border-t-black"
                          />
                          Sending…
                        </>
                      ) : (
                        <>
                          Request My Free Audit
                          <ArrowRight className="transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>

                    <p aria-live="polite" className="min-h-[1.25rem] text-sm">
                      {status === "error" && submitError ? (
                        <span className="text-[#ff8a8a]">
                          {submitError} You can also e-mail{" "}
                          <a
                            href={`mailto:${CONTACT_EMAIL}`}
                            className="underline underline-offset-4"
                          >
                            {CONTACT_EMAIL}
                          </a>
                          .
                        </span>
                      ) : (
                        <span className="text-white/45">
                          Fields marked with <span className="text-artx-cyan">*</span> are
                          required.
                        </span>
                      )}
                    </p>
                  </div>
                </fieldset>
              </form>
            </Reveal>
          )}
        </div>
      </div>
    </Section>
  );
}

export { BOOKING_URL };
