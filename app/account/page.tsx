import type { Metadata } from "next";
import Link from "next/link";
import { CalendarCheck, Clock, ArrowRight, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "My Booking — VYRAND",
  description: "Manage your VYRAND experience bookings.",
};

export default function AccountPage() {
  return (
    <div style={{ paddingTop: 96, minHeight: "100vh" }}>
      <section
        style={{
          borderBottom: "1px solid var(--border)",
          backgroundColor: "var(--surface)",
          padding: "56px 24px 48px",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <span className="section-label">My Booking</span>
          <h1
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 800,
              textTransform: "uppercase",
              color: "var(--text)",
              marginTop: 16,
            }}
          >
            Your upcoming experiences.
          </h1>
        </div>
      </section>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px 96px" }}>
        {/* Demo booking card */}
        <div
          style={{
            border: "1px solid #25a267",
            borderRadius: 14,
            overflow: "hidden",
            marginBottom: 24,
            background: "linear-gradient(135deg, rgba(26,14,8,0.6), rgba(17,17,24,1))",
          }}
        >
          <div
            style={{
              borderBottom: "1px solid var(--border)",
              padding: "20px 28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <CalendarCheck size={18} style={{ color: "#25a267" }} />
              <div>
                <div style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 2 }}>
                  Confirmed
                </div>
                <div style={{ fontSize: "1.1rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--text)" }}>
                  Air — Wingsuit Flying
                </div>
              </div>
            </div>
            <span
              style={{
                fontSize: "0.58rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#25a267",
                border: "1px solid #25a267",
                borderRadius: 4,
                padding: "3px 8px",
              }}
            >
              Flagship
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
              gap: 0,
            }}
          >
            {[
              { icon: <CalendarCheck size={14} />, label: "Date", value: "Saturday, 3 May 2025" },
              { icon: <Clock size={14} />, label: "Time", value: "10:00 — arrive 09:45" },
              { icon: <MapPin size={14} />, label: "Location", value: "VYRAND, Andorra la Vella" },
            ].map((row, i, arr) => (
              <div
                key={row.label}
                style={{
                  padding: "20px 28px",
                  borderRight: i < arr.length - 1 ? "1px solid var(--border)" : "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--muted)", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>
                  <span style={{ color: "var(--accent)" }}>{row.icon}</span>
                  {row.label}
                </div>
                <div style={{ fontSize: "0.9rem", fontWeight: 500, color: "var(--text)" }}>
                  {row.value}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              borderTop: "1px solid var(--border)",
              padding: "16px 28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              backgroundColor: "var(--surface)",
            }}
          >
            <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>
              2 people · 70€/person · <strong style={{ color: "var(--text)" }}>140€ total</strong>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <button
                style={{
                  background: "none",
                  border: "1px solid var(--border)",
                  borderRadius: 6,
                  padding: "8px 16px",
                  color: "var(--muted)",
                  fontSize: "0.8rem",
                  cursor: "pointer",
                  transition: "color 0.2s, border-color 0.2s",
                }}
              >
                Cancel booking
              </button>
              <Link href="/contact" className="btn-secondary" style={{ padding: "8px 16px", fontSize: "0.8rem" }}>
                Contact us
              </Link>
            </div>
          </div>
        </div>

        {/* Empty state / look for more */}
        <div
          style={{
            border: "1px dashed var(--border)",
            borderRadius: 14,
            padding: "48px 32px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              border: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
              color: "var(--muted)",
            }}
          >
            <CalendarCheck size={22} />
          </div>
          <h3
            style={{
              fontSize: "1.1rem",
              fontWeight: 600,
              color: "var(--text)",
              marginBottom: 10,
            }}
          >
            No other upcoming bookings.
          </h3>
          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--muted)",
              lineHeight: 1.6,
              marginBottom: 24,
              maxWidth: 380,
              margin: "0 auto 24px",
            }}
          >
            You have one experience locked in. Want to add another before your visit?
          </p>
          <Link href="/experiences" className="btn-primary">
            Add an Experience <ArrowRight size={15} />
          </Link>
        </div>

        {/* Help section */}
        <div
          style={{
            marginTop: 40,
            padding: "24px 28px",
            borderRadius: 12,
            border: "1px solid var(--border)",
            backgroundColor: "var(--surface)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <div>
            <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text)", marginBottom: 4 }}>
              Need to change or cancel?
            </div>
            <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>
              Full refunds available up to 48h before your session. After that, we&apos;ll issue a credit.
            </div>
          </div>
          <Link href="/contact" className="btn-secondary" style={{ fontSize: "0.875rem" }}>
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
