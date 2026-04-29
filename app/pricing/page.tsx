import type { Metadata } from "next";
import Link from "next/link";
import { experiences } from "@/lib/experiences";
import { ArrowRight, Check, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing — VYRAND",
  description:
    "Transparent pricing for all VYRAND experiences in Andorra. From 70€ per person. No experience needed, no hidden fees.",
};

function IntensityBar({ level }: { level: number }) {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          style={{
            width: 14,
            height: 3,
            borderRadius: 2,
            backgroundColor: i <= level ? "var(--accent)" : "var(--border)",
          }}
        />
      ))}
    </div>
  );
}

const faqs = [
  {
    q: "Do I need prior experience?",
    a: "None. Zero. Our team briefs you in 5 minutes and you're good to go. Every simulator is designed for first-timers and adrenaline veterans alike.",
  },
  {
    q: "Is it safe?",
    a: "Completely. That's the whole point — extreme thrills without the risk. All simulators are certified and operated by trained staff. You feel everything except the danger.",
  },
  {
    q: "What's included in the price?",
    a: "Everything. Full simulator session, safety briefing, all equipment, personal stats report, and access to the VYRAND lounge before and after.",
  },
  {
    q: "Can we book multiple experiences?",
    a: "Yes. Book as many as you want in one session. Groups often do 2–3 back to back. Add them to your booking and we'll schedule them in sequence.",
  },
  {
    q: "Are there group discounts?",
    a: "For groups of 6+ or private events, contact us directly at info@vyrand.com. We offer custom packages for corporate events, birthdays, and hotel partners.",
  },
  {
    q: "What's your cancellation policy?",
    a: "Full refund up to 48 hours before your session. Within 48 hours, we offer a credit you can use for a future booking.",
  },
];

export default function PricingPage() {
  return (
    <div style={{ paddingTop: 96 }}>
      {/* Header */}
      <section
        style={{
          borderBottom: "1px solid var(--border)",
          backgroundColor: "var(--surface)",
          padding: "72px 24px 64px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <span className="section-label">Pricing</span>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "-0.01em",
              color: "var(--text)",
              marginTop: 16,
              marginBottom: 16,
              lineHeight: 1.05,
            }}
          >
            No surprises.
            <br />
            <span
              style={{
                background: "linear-gradient(90deg, #25a267, #f97316)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Just the price.
            </span>
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "var(--muted)",
              lineHeight: 1.7,
            }}
          >
            70€ per person, per experience. That&apos;s it. No upsells, no hidden
            fees, no membership required.
          </p>
        </div>
      </section>

      {/* Pricing table */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 24px" }}>
        <div
          style={{
            border: "1px solid var(--border)",
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          {/* Table header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
              backgroundColor: "var(--surface)",
              borderBottom: "1px solid var(--border)",
              padding: "16px 28px",
            }}
          >
            {["Experience", "Duration", "Group Size", "Intensity", "Price"].map(
              (col) => (
                <div
                  key={col}
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                  }}
                >
                  {col}
                </div>
              )
            )}
          </div>

          {/* Table rows */}
          {experiences.map((exp, i) => (
            <div
              key={exp.id}
              className="row-hover"
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
                padding: "24px 28px",
                alignItems: "center",
                borderBottom:
                  i < experiences.length - 1
                    ? "1px solid var(--border)"
                    : "none",
                backgroundColor:
                  exp.isFlagship ? "rgba(37,162,103,0.04)" : "transparent",
              }}
            >
              {/* Experience name */}
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}
                  >
                    <span
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                        color: "var(--text)",
                      }}
                    >
                      {exp.name}
                    </span>
                    {exp.isFlagship && (
                      <span
                        style={{
                          fontSize: "0.55rem",
                          fontWeight: 700,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "#25a267",
                          border: "1px solid #25a267",
                          borderRadius: 4,
                          padding: "2px 6px",
                        }}
                      >
                        Flagship
                      </span>
                    )}
                    {exp.isAndorraID && (
                      <span
                        style={{
                          fontSize: "0.55rem",
                          fontWeight: 700,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "var(--accent)",
                          border: "1px solid var(--accent)",
                          borderRadius: 4,
                          padding: "2px 6px",
                        }}
                      >
                        Andorra ID
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>
                    {exp.sport}
                  </div>
                </div>
              </div>

              {/* Duration */}
              <div style={{ fontSize: "0.9rem", color: "var(--text)", fontWeight: 500 }}>
                {exp.duration}
              </div>

              {/* Group size */}
              <div style={{ fontSize: "0.9rem", color: "var(--text)", fontWeight: 500 }}>
                {exp.groupSize}
              </div>

              {/* Intensity */}
              <div>
                <IntensityBar level={exp.intensity} />
              </div>

              {/* Price + CTA */}
              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <div>
                  <div
                    style={{
                      fontSize: "1.375rem",
                      fontWeight: 800,
                      background: "linear-gradient(90deg, #25a267, #f97316)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      lineHeight: 1.1,
                    }}
                  >
                    {exp.pricePerPerson}€
                  </div>
                  <div
                    style={{
                      fontSize: "0.68rem",
                      color: "var(--muted)",
                      marginTop: 2,
                    }}
                  >
                    per person
                  </div>
                </div>
                <Link
                  href={`/booking?exp=${exp.id}`}
                  className="btn-primary-sm"
                >
                  Book →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* What's included */}
        <div
          style={{
            marginTop: 48,
            border: "1px solid var(--border)",
            borderRadius: 16,
            padding: "40px 48px",
            backgroundColor: "var(--surface)",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
          }}
        >
          <div>
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "var(--text)",
                marginBottom: 24,
              }}
            >
              What&apos;s included in every booking
            </h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                "Full simulator session (25–30 min)",
                "Safety briefing by trained staff",
                "All equipment — nothing to bring",
                "Personal stats report (speed, G-force, more)",
                "VYRAND lounge access before & after",
                "Instant photo moment at peak intensity",
              ].map((item) => (
                <li key={item} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <Check size={16} style={{ color: "var(--accent)", flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.5 }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text)", marginBottom: 24 }}>
              Groups & private events
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.7, marginBottom: 20 }}>
              For groups of 6+, corporate events, birthdays, or hotel packages —
              we offer custom pricing and dedicated time slots.
            </p>
            <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.7, marginBottom: 28 }}>
              Hotels and tour operators: see our{" "}
              <Link
                href="/partners"
                style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}
              >
                Partners page
              </Link>{" "}
              for commission rates and package options.
            </p>
            <a
              href="mailto:info@vyrand.com"
              className="btn-secondary"
              style={{ display: "inline-flex" }}
            >
              Contact for Groups
            </a>
          </div>
        </div>
      </section>

      {/* FAQ section */}
      <section
        style={{
          backgroundColor: "var(--surface)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          padding: "80px 24px",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <span className="section-label">FAQ</span>
          <h2 style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--text)", marginTop: 16, marginBottom: 40 }}>
            Common questions.
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {faqs.map((faq, i) => (
              <div
                key={i}
                style={{
                  borderBottom: "1px solid var(--border)",
                  padding: "24px 0",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 14,
                    marginBottom: 12,
                  }}
                >
                  <HelpCircle size={16} style={{ color: "var(--accent)", flexShrink: 0, marginTop: 2 }} />
                  <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text)", lineHeight: 1.4 }}>
                    {faq.q}
                  </h3>
                </div>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "var(--muted)",
                    lineHeight: 1.7,
                    paddingLeft: 30,
                  }}
                >
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800, color: "var(--text)", marginBottom: 16, lineHeight: 1.1 }}>
          Ready to book?
        </h2>
        <p style={{ fontSize: "1rem", color: "var(--muted)", marginBottom: 32, lineHeight: 1.7 }}>
          Pick your experience and lock in your slot. Takes 3 minutes.
        </p>
        <Link href="/booking" className="btn-primary" style={{ fontSize: "1.05rem", padding: "14px 36px" }}>
          Book Now <ArrowRight size={18} />
        </Link>
      </section>
    </div>
  );
}
