import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — VYRAND",
  description: "VYRAND privacy policy. How we collect, use, and protect your data.",
};

const sections = [
  {
    title: "1. Who we are",
    content: `VYRAND is an extreme-sport simulator experience centre located in Andorra la Vella, Principat d'Andorra. We are the data controller for any personal data you provide when using our website or booking our experiences.

Contact: info@vyrand.com`,
  },
  {
    title: "2. What data we collect",
    content: `We collect the following data when you make a booking or contact us:

— Name and contact details (email, phone number)
— Booking information (date, experience, group size)
— Payment data (processed securely via Stripe — we never see your full card number)
— Health questionnaire responses (collected on-site for safety purposes)
— Communications you send us (email, contact form)

We also collect anonymised analytics data (page views, session duration) via privacy-respecting tools. No personal identifiers are included in analytics.`,
  },
  {
    title: "3. How we use your data",
    content: `We use your data to:

— Process and confirm your booking
— Send you booking confirmations and reminders
— Handle any changes, cancellations, or refunds
— Respond to your enquiries
— Send you relevant updates if you opt in (you can unsubscribe at any time)
— Improve our services through anonymised analytics

We do not sell, rent, or share your personal data with third parties for marketing purposes.`,
  },
  {
    title: "4. Legal basis for processing",
    content: `We process your personal data on the following legal bases under GDPR:

— Contract performance: to process and fulfil your booking
— Legitimate interests: for security, fraud prevention, and improving our services
— Consent: for marketing communications (opt-in only)
— Legal obligation: for tax records and compliance`,
  },
  {
    title: "5. Data retention",
    content: `We retain your booking data for 5 years for legal and accounting purposes. Marketing opt-in data is retained until you unsubscribe. You may request deletion of your personal data at any time (subject to legal retention obligations).`,
  },
  {
    title: "6. Your rights",
    content: `Under GDPR, you have the right to:

— Access the personal data we hold about you
— Correct inaccurate data
— Request deletion of your data
— Withdraw consent at any time
— Lodge a complaint with the relevant supervisory authority

To exercise any of these rights, email: info@vyrand.com`,
  },
  {
    title: "7. Cookies",
    content: `We use strictly necessary cookies to operate the website (session management, booking flow). We do not use advertising cookies or third-party tracking cookies without your explicit consent.`,
  },
  {
    title: "8. Security",
    content: `We take reasonable technical and organisational measures to protect your data. Payment processing is handled entirely by Stripe (PCI DSS Level 1 certified). We use HTTPS encryption on all pages.`,
  },
  {
    title: "9. Changes to this policy",
    content: `We may update this privacy policy from time to time. Material changes will be communicated via email to customers with active bookings. The date of the last update is shown at the bottom of this page.`,
  },
];

export default function PrivacyPage() {
  return (
    <div style={{ paddingTop: 96 }}>
      <section
        style={{
          borderBottom: "1px solid var(--border)",
          backgroundColor: "var(--surface)",
          padding: "60px 24px 48px",
        }}
      >
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <span className="section-label">Legal</span>
          <h1
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              fontWeight: 800,
              color: "var(--text)",
              marginTop: 16,
            }}
          >
            Privacy Policy
          </h1>
          <p style={{ fontSize: "0.875rem", color: "var(--muted)", marginTop: 10 }}>
            Last updated: April 2025
          </p>
        </div>
      </section>

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "56px 24px 96px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          {sections.map((s) => (
            <div key={s.title}>
              <h2
                style={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "var(--text)",
                  marginBottom: 16,
                }}
              >
                {s.title}
              </h2>
              <div
                style={{
                  fontSize: "0.9rem",
                  color: "var(--muted)",
                  lineHeight: 1.8,
                  whiteSpace: "pre-line",
                }}
              >
                {s.content}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 56,
            padding: "24px",
            borderRadius: 10,
            border: "1px solid var(--border)",
            backgroundColor: "var(--surface)",
            fontSize: "0.875rem",
            color: "var(--muted)",
            lineHeight: 1.7,
          }}
        >
          Questions about this policy? Email{" "}
          <a
            href="mailto:info@vyrand.com"
            style={{ color: "var(--accent)", textDecoration: "none" }}
          >
            info@vyrand.com
          </a>
        </div>
      </div>
    </div>
  );
}
