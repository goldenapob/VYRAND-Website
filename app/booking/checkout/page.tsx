import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Lock, CreditCard, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Checkout — VYRAND",
  description: "Secure payment for your VYRAND experience booking.",
};

export default function CheckoutPage() {
  return (
    <div style={{ paddingTop: 96, minHeight: "100vh" }}>
      <section
        style={{
          borderBottom: "1px solid var(--border)",
          backgroundColor: "var(--surface)",
          padding: "40px 24px",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", alignItems: "center", gap: 12 }}>
          <Link
            href="/booking"
            style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--muted)", textDecoration: "none", fontSize: "0.85rem" }}
          >
            <ArrowLeft size={14} /> Back to Booking
          </Link>
        </div>
      </section>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px 96px", display: "grid", gridTemplateColumns: "1fr 360px", gap: 48 }}>
        {/* Payment form */}
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--text)", marginBottom: 8, textTransform: "uppercase" }}>
            Secure Payment
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 36, color: "var(--muted)", fontSize: "0.82rem" }}>
            <Lock size={13} style={{ color: "var(--accent)" }} />
            256-bit SSL encrypted · Powered by Stripe
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Card number */}
            <div>
              <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 10 }}>
                Card Number
              </label>
              <div
                style={{
                  padding: "13px 16px",
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  color: "var(--muted)",
                  fontSize: "0.9rem",
                }}
              >
                <span>•••• •••• •••• ••••</span>
                <CreditCard size={16} />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 10 }}>
                  Expiry Date
                </label>
                <div style={{ padding: "13px 16px", backgroundColor: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--muted)", fontSize: "0.9rem" }}>
                  MM / YY
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 10 }}>
                  CVV
                </label>
                <div style={{ padding: "13px 16px", backgroundColor: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--muted)", fontSize: "0.9rem" }}>
                  •••
                </div>
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 10 }}>
                Cardholder Name
              </label>
              <div style={{ padding: "13px 16px", backgroundColor: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--muted)", fontSize: "0.9rem" }}>
                Name as shown on card
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: 12,
              padding: "14px 16px",
              backgroundColor: "rgba(249,115,22,0.04)",
              border: "1px solid rgba(249,115,22,0.15)",
              borderRadius: 8,
              fontSize: "0.78rem",
              color: "var(--muted)",
              lineHeight: 1.6,
            }}
          >
            <strong style={{ color: "var(--text)" }}>Note:</strong> This is a demo checkout page.
            Real payment processing will be integrated via Stripe before launch.
            No charges will be made.
          </div>

          <Link
            href="/booking/confirmed"
            className="btn-primary"
            style={{ marginTop: 28, width: "100%", justifyContent: "center", fontSize: "1rem", padding: "14px 24px" }}
          >
            <Lock size={15} />
            Pay & Confirm Booking
          </Link>

          <div style={{ display: "flex", gap: 24, justifyContent: "center", marginTop: 20 }}>
            {["Visa", "Mastercard", "Amex", "PayPal"].map((card) => (
              <span key={card} style={{ fontSize: "0.72rem", color: "var(--muted)", fontWeight: 500 }}>
                {card}
              </span>
            ))}
          </div>
        </div>

        {/* Order summary */}
        <div>
          <div
            style={{
              border: "1px solid var(--border)",
              borderRadius: 14,
              overflow: "hidden",
              position: "sticky",
              top: 100,
            }}
          >
            <div style={{ backgroundColor: "var(--surface)", borderBottom: "1px solid var(--border)", padding: "20px 24px" }}>
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 4 }}>
                Order Summary
              </div>
            </div>

            <div style={{ padding: "24px" }}>
              <div style={{ marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid var(--border)" }}>
                <div style={{ fontSize: "1rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--text)", marginBottom: 4 }}>
                  Air — Wingsuit Flying
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>
                  2 people · 30 min · 10:00
                </div>
              </div>

              {[
                { label: "Price per person", value: "70€" },
                { label: "Group size", value: "2 people" },
                { label: "Subtotal", value: "140€" },
              ].map((row) => (
                <div key={row.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{ fontSize: "0.85rem", color: "var(--muted)" }}>{row.label}</span>
                  <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--text)" }}>{row.value}</span>
                </div>
              ))}

              <div style={{ borderTop: "1px solid var(--border)", paddingTop: 96, marginTop: 6, display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text)" }}>Total</span>
                <span style={{ fontSize: "1.375rem", fontWeight: 800, background: "linear-gradient(90deg, #25a267, #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  140€
                </span>
              </div>
            </div>

            <div style={{ backgroundColor: "var(--surface)", borderTop: "1px solid var(--border)", padding: "16px 24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.78rem", color: "var(--muted)" }}>
                <Shield size={13} style={{ color: "var(--accent)" }} />
                Full refund available up to 48h before session
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
