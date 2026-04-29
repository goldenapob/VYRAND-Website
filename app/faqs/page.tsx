"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";

const faqGroups = [
  {
    label: "About the Experiences",
    items: [
      {
        q: "Do I need any prior experience?",
        a: "None at all. Every VYRAND simulator is designed for first-timers. Our team briefs you in 5 minutes before each session. If you've never wingsuit flown, skied, or ridden a downhill bike in your life — that's fine. That's the point.",
      },
      {
        q: "What does a session feel like?",
        a: "Genuinely intense. Each simulator replicates the physical sensations of the sport — wind speed, G-force feedback, motion, surround visuals and audio. It's not a video game with a racing wheel. It's as close to the real thing as you can get without leaving the ground.",
      },
      {
        q: "How long is each experience?",
        a: "Air and Alpine are 30 minutes each. Gravity, Vertical, and Terrain are 25 minutes each. That includes the safety briefing (5 min) and the full session. You won't want it to be any shorter.",
      },
      {
        q: "Can I do more than one experience in a visit?",
        a: "Yes, and we recommend it. Most groups do 2–3 experiences back to back. Book them all in one session and we'll schedule them in sequence with short breaks between.",
      },
      {
        q: "What is the intensity like? Is it too much?",
        a: "We rate each experience from 1–5. Air is a 5 (Maximum). Terrain and Vertical are a 3 (Intense). If you're prone to motion sickness or have specific health concerns, start with Vertical or Terrain. Our team will always guide you to the right experience.",
      },
    ],
  },
  {
    label: "Booking & Pricing",
    items: [
      {
        q: "How much does it cost?",
        a: "70€ per person, per experience. No hidden fees, no membership, no upsells. What you see on the pricing page is what you pay.",
      },
      {
        q: "How do I book?",
        a: "Through this website. Pick your experience, select a date and time, choose your group size (2–6 people), fill in your details, and pay. Takes about 3 minutes.",
      },
      {
        q: "Can I book for a group larger than 6?",
        a: "For groups of 7+, contact us at groups@vyrand.com. We offer dedicated time slots and custom pricing for larger groups, corporate events, and private parties.",
      },
      {
        q: "What is your cancellation policy?",
        a: "Full refund up to 48 hours before your session. Within 48 hours, we issue a credit valid for 12 months — so you can rebook at any time. No-shows are non-refundable.",
      },
      {
        q: "Do you offer group discounts?",
        a: "For groups of 6+ booking multiple experiences, contact us at groups@vyrand.com. We'll put together a custom package.",
      },
    ],
  },
  {
    label: "Practicalities",
    items: [
      {
        q: "What should I wear?",
        a: "Comfortable clothes — jeans, sportswear, whatever you'd wear to a gym or outdoor activity. We provide all equipment. Avoid very loose clothing or scarves that could get caught in the rig.",
      },
      {
        q: "Is there an age limit?",
        a: "Minimum age varies by simulator: 12 years for Alpine and Vertical, 14 years for Air, Gravity, and Terrain. There's no maximum age — we've had participants in their 70s.",
      },
      {
        q: "Are there height or weight requirements?",
        a: "Minimum height: 1.40m for Vertical, 1.45m for Alpine, 1.50m for Air, Gravity, and Terrain. Maximum weight: 120kg for all simulators. Please contact us if you have specific questions.",
      },
      {
        q: "Is it accessible for people with disabilities?",
        a: "Some experiences are accessible — contact us at info@vyrand.com with your specific situation and we'll tell you exactly what's possible. We want to find a way to make it work.",
      },
      {
        q: "Where do I go when I arrive?",
        a: "VYRAND Experience Center, Andorra la Vella. Exact address and directions are in your booking confirmation email. Arrive 15 minutes before your session time.",
      },
      {
        q: "Is there parking?",
        a: "Yes — there is a public car park adjacent to the center. Parking is free for VYRAND customers with validation at the reception.",
      },
    ],
  },
  {
    label: "Safety",
    items: [
      {
        q: "Is it safe?",
        a: "Completely. The entire premise of VYRAND is delivering extreme thrills without risk. All simulators are certified to EU safety standards, operated by trained staff, and equipped with emergency stop systems. You feel everything except the danger.",
      },
      {
        q: "What happens if I feel unwell during a session?",
        a: "Every simulator has an immediate stop function. Signal to the operator or press the emergency button and the session stops immediately. Our staff are trained in first aid and will be with you in seconds.",
      },
      {
        q: "Are there health conditions that would prevent me from participating?",
        a: "We recommend consulting a doctor if you have severe heart conditions, epilepsy, or are pregnant. For all other health questions, contact us and we'll advise. We have a full health questionnaire at reception.",
      },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        borderBottom: "1px solid var(--border)",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          gap: 16,
        }}
      >
        <span
          style={{
            fontSize: "0.975rem",
            fontWeight: open ? 600 : 500,
            color: open ? "var(--text)" : "var(--text)",
            lineHeight: 1.4,
            transition: "color 0.2s",
          }}
        >
          {q}
        </span>
        <ChevronDown
          size={16}
          style={{
            color: "var(--muted)",
            flexShrink: 0,
            transition: "transform 0.2s",
            transform: open ? "rotate(180deg)" : "none",
          }}
        />
      </button>
      {open && (
        <div
          style={{
            paddingBottom: 20,
            fontSize: "0.9rem",
            color: "var(--muted)",
            lineHeight: 1.75,
          }}
        >
          {a}
        </div>
      )}
    </div>
  );
}

export default function FAQsPage() {
  return (
    <div style={{ paddingTop: 96 }}>
      {/* Header */}
      <section
        style={{
          borderBottom: "1px solid var(--border)",
          backgroundColor: "var(--surface)",
          padding: "72px 24px 64px",
        }}
      >
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <span className="section-label">FAQs</span>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "-0.01em",
              color: "var(--text)",
              marginTop: 16,
              lineHeight: 1.05,
            }}
          >
            Everything you need to know.
          </h1>
          <p
            style={{
              fontSize: "1rem",
              color: "var(--muted)",
              marginTop: 16,
              lineHeight: 1.7,
            }}
          >
            Can&apos;t find your answer? Email us at{" "}
            <a
              href="mailto:info@vyrand.com"
              style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}
            >
              info@vyrand.com
            </a>{" "}
            — we reply within 24 hours.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "64px 24px 96px" }}>
        {faqGroups.map((group) => (
          <div key={group.label} style={{ marginBottom: 56 }}>
            <div
              style={{
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginBottom: 4,
                paddingBottom: 12,
                borderBottom: "1px solid var(--border)",
              }}
            >
              {group.label}
            </div>
            {group.items.map((item) => (
              <FAQItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        ))}

        {/* CTA */}
        <div
          style={{
            marginTop: 16,
            padding: "40px 40px",
            borderRadius: 16,
            border: "1px solid var(--border)",
            backgroundColor: "var(--surface)",
            textAlign: "center",
          }}
        >
          <h3
            style={{
              fontSize: "1.25rem",
              fontWeight: 700,
              color: "var(--text)",
              marginBottom: 10,
            }}
          >
            Still have questions?
          </h3>
          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--muted)",
              marginBottom: 24,
              lineHeight: 1.6,
            }}
          >
            Our team is available Monday–Sunday, 09:00–21:00.
          </p>
          <div
            style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}
          >
            <Link href="/contact" className="btn-secondary">
              Contact Us
            </Link>
            <Link href="/booking" className="btn-primary">
              Book Now <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
