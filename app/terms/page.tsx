import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions — VYRAND",
  description: "VYRAND terms and conditions. Booking, cancellation, and participation policies.",
};

const sections = [
  {
    title: "1. About these terms",
    content: `These Terms & Conditions govern the booking and participation in experiences offered by VYRAND ("we", "us", "our") at our facility in Andorra la Vella, Principat d'Andorra. By completing a booking, you agree to these terms in full.`,
  },
  {
    title: "2. Booking and payment",
    content: `All bookings are subject to availability. A booking is confirmed only upon receipt of full payment. We accept major credit/debit cards and PayPal. Prices are stated in Euros (€) and are per person, per experience.

We reserve the right to modify pricing. Any change will not affect bookings already confirmed and paid.`,
  },
  {
    title: "3. Cancellation and refunds",
    content: `Cancellations made more than 48 hours before your session: full refund to the original payment method within 5–10 business days.

Cancellations made within 48 hours of your session: no refund. We will issue a credit note valid for 12 months from the original booking date.

No-shows (failure to arrive at your booked time): non-refundable.

If VYRAND cancels or significantly changes your booking (due to technical issues, emergency, or force majeure), you will receive a full refund or alternative slot at your choice.`,
  },
  {
    title: "4. Participation requirements",
    content: `To participate in VYRAND experiences, you must:

— Meet the minimum age requirement for the chosen simulator (12–14 years, depending on experience)
— Meet the minimum height requirement (1.40m–1.50m, depending on experience)
— Weigh no more than 120kg
— Not be under the influence of alcohol or drugs
— Complete and sign the on-site health questionnaire truthfully
— Follow all instructions given by VYRAND staff

We reserve the right to refuse participation to any individual who does not meet these requirements, without refund.`,
  },
  {
    title: "5. Health and medical conditions",
    content: `Participants with the following conditions should consult a doctor before booking:

— Severe cardiovascular conditions
— Epilepsy or seizure disorders
— Pregnancy
— Recent surgery or injury affecting mobility

By participating, you confirm that you are in suitable health. VYRAND is not liable for any pre-existing medical conditions that may be aggravated by participation.`,
  },
  {
    title: "6. Safety and conduct",
    content: `You must follow all safety briefings and instructions provided by VYRAND staff. Failure to do so may result in immediate termination of your session without refund.

All simulators have emergency stop functions. Staff are trained in first aid and emergency response.

You must not attempt to misuse, tamper with, or damage any simulator or facility equipment. Any damage caused intentionally or through gross negligence may be billed to the responsible party.`,
  },
  {
    title: "7. Liability",
    content: `VYRAND operates certified simulators with rigorous safety standards. All experiences involve simulated motion and sensory stimulation. While VYRAND takes every reasonable precaution, by participating you acknowledge and accept the inherent nature of high-intensity simulated experiences.

VYRAND's liability is limited to direct losses caused by our proven negligence. We exclude liability for indirect losses, loss of enjoyment, or pre-existing health conditions. Our maximum liability shall not exceed the amount paid for your booking.`,
  },
  {
    title: "8. Intellectual property",
    content: `All content on the VYRAND website — including text, images, design, and branding — is owned by VYRAND or licensed to us. You may not reproduce, distribute, or create derivative works without our written permission.`,
  },
  {
    title: "9. Photography and media",
    content: `VYRAND may take photographs or video footage during sessions for marketing purposes. If you do not wish to be photographed, please inform staff before your session. You grant VYRAND permission to use any media in which you appear for promotional purposes, unless you opt out.`,
  },
  {
    title: "10. Governing law",
    content: `These terms are governed by the laws of the Principat d'Andorra. Any dispute shall be subject to the exclusive jurisdiction of the courts of Andorra.`,
  },
  {
    title: "11. Changes to these terms",
    content: `We may update these terms from time to time. The version in force at the time of your booking shall apply. We will notify customers of material changes via email.`,
  },
];

export default function TermsPage() {
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
            Terms & Conditions
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
          Questions about these terms? Email{" "}
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
