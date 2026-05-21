import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";
import PayPalCheckout from "@/components/PayPalCheckout";

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

      <div
        style={{
          maxWidth: 800,
          margin: "0 auto",
          padding: "48px 24px 96px",
          display: "grid",
          gridTemplateColumns: "1fr 360px",
          gap: 48,
        }}
      >
        {/* Payment */}
        <div>
          <h1
            style={{
              fontSize: "1.75rem",
              fontWeight: 800,
              color: "var(--text)",
              marginBottom: 8,
              textTransform: "uppercase",
            }}
          >
            Secure Payment
          </h1>

          <p style={{ fontSize: "0.85rem", color: "var(--muted)", marginBottom: 32, lineHeight: 1.6 }}>
            Pay safely via PayPal. No account needed — you can pay with a card through PayPal.
          </p>

          {/* Sandbox notice */}
          <div
            style={{
              marginBottom: 28,
              padding: "12px 16px",
              backgroundColor: "rgba(37,162,103,0.06)",
              border: "1px solid rgba(37,162,103,0.2)",
              borderRadius: 8,
              fontSize: "0.78rem",
              color: "var(--muted)",
              lineHeight: 1.6,
            }}
          >
            <strong style={{ color: "var(--accent2)" }}>Sandbox mode active</strong> — this is a test site.
            No real charges will be made. Use a PayPal Sandbox test account to complete payment.
          </div>

          <PayPalCheckout
            amount="140.00"
            experienceName="Air — Wingsuit Flying"
            groupSize={2}
          />

          <div
            style={{
              marginTop: 24,
              display: "flex",
              alignItems: "center",
              gap: 8,
              justifyContent: "center",
              color: "var(--muted)",
              fontSize: "0.75rem",
            }}
          >
            <Shield size={12} style={{ color: "var(--accent)" }} />
            Encrypted · Powered by PayPal
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
            <div
              style={{
                backgroundColor: "var(--surface)",
                borderBottom: "1px solid var(--border)",
                padding: "20px 24px",
              }}
            >
              <div
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  marginBottom: 4,
                }}
              >
                Order Summary
              </div>
            </div>

            <div style={{ padding: "24px" }}>
              <div
                style={{
                  marginBottom: 20,
                  paddingBottom: 20,
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <div
                  style={{
                    fontSize: "1rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    color: "var(--text)",
                    marginBottom: 4,
                  }}
                >
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
                <div
                  key={row.label}
                  style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}
                >
                  <span style={{ fontSize: "0.85rem", color: "var(--muted)" }}>{row.label}</span>
                  <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--text)" }}>{row.value}</span>
                </div>
              ))}

              <div
                style={{
                  borderTop: "1px solid var(--border)",
                  paddingTop: 16,
                  marginTop: 6,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text)" }}>Total</span>
                <span
                  style={{
                    fontSize: "1.375rem",
                    fontWeight: 800,
                    background: "linear-gradient(90deg, #25a267, #f97316)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  140€
                </span>
              </div>
            </div>

            <div
              style={{
                backgroundColor: "var(--surface)",
                borderTop: "1px solid var(--border)",
                padding: "16px 24px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: "0.78rem",
                  color: "var(--muted)",
                }}
              >
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
