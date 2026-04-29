import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Calendar, Clock, Users, MapPin, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Booking Confirmed! — VYRAND",
  description: "Your VYRAND experience is confirmed. See you in Andorra.",
};

export default function BookingConfirmedPage() {
  return (
    <div style={{ paddingTop: 96, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 24px" }}>
      <div style={{ maxWidth: 600, width: "100%", textAlign: "center" }}>
        {/* Success icon */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(249,115,22,0.15), rgba(37,162,103,0.1))",
            border: "1px solid rgba(249,115,22,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 32px",
          }}
        >
          <CheckCircle size={36} style={{ color: "var(--accent)" }} />
        </div>

        <div
          style={{
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: 16,
          }}
        >
          Booking Confirmed
        </div>

        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "-0.01em",
            color: "var(--text)",
            lineHeight: 1.05,
            marginBottom: 16,
          }}
        >
          You&apos;re in.
          <br />
          <span
            style={{
              background: "linear-gradient(90deg, #25a267, #f97316)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            See you in Andorra.
          </span>
        </h1>

        <p
          style={{
            fontSize: "1rem",
            color: "var(--muted)",
            lineHeight: 1.7,
            marginBottom: 40,
          }}
        >
          Your booking is confirmed. We&apos;ve sent a confirmation email with all the
          details. Bring your group — the simulator is ready for you.
        </p>

        {/* Booking details */}
        <div
          style={{
            border: "1px solid var(--border)",
            borderRadius: 14,
            overflow: "hidden",
            textAlign: "left",
            marginBottom: 32,
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(37,162,103,0.06)",
              borderBottom: "1px solid var(--border)",
              padding: "20px 24px",
            }}
          >
            <div style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 4 }}>
              Your Experience
            </div>
            <div style={{ fontSize: "1.2rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--text)" }}>
              Air — Wingsuit Flying
            </div>
          </div>

          {[
            { icon: <Calendar size={14} />, label: "Date", value: "Saturday, May 3, 2025" },
            { icon: <Clock size={14} />, label: "Time", value: "10:00 — arrive 15 min early" },
            { icon: <Users size={14} />, label: "Group", value: "2 people" },
            { icon: <MapPin size={14} />, label: "Location", value: "VYRAND, Andorra la Vella" },
          ].map((row) => (
            <div
              key={row.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "14px 24px",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <span style={{ color: "var(--accent)", flexShrink: 0 }}>{row.icon}</span>
              <div>
                <div style={{ fontSize: "0.7rem", color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 2 }}>
                  {row.label}
                </div>
                <div style={{ fontSize: "0.9rem", fontWeight: 500, color: "var(--text)" }}>
                  {row.value}
                </div>
              </div>
            </div>
          ))}

          <div style={{ padding: "20px 24px", backgroundColor: "var(--surface)", display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text)" }}>Total Paid</span>
            <span style={{ fontSize: "1.25rem", fontWeight: 800, background: "linear-gradient(90deg, #25a267, #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              140€
            </span>
          </div>
        </div>

        {/* What to know */}
        <div
          style={{
            border: "1px solid var(--border)",
            borderRadius: 12,
            padding: "24px",
            backgroundColor: "var(--surface)",
            textAlign: "left",
            marginBottom: 40,
          }}
        >
          <h3 style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text)", marginBottom: 16, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Before You Arrive
          </h3>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              "Arrive 15 minutes before your slot — we need time to brief you",
              "Wear comfortable clothes — no special gear needed, we provide everything",
              "No alcohol before the session — take the rush straight",
              "Bring photo ID for all participants",
              "Questions? Email us: info@vyrand.com",
            ].map((item, i) => (
              <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: "var(--accent)", flexShrink: 0, marginTop: 7 }} />
                <span style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.55 }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/account" className="btn-secondary">
            My Bookings
          </Link>
          <Link href="/experiences" className="btn-primary">
            Book Another <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}
