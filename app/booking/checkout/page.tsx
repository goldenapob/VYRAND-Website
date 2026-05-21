"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Shield } from "lucide-react";
import PayPalCheckout from "@/components/PayPalCheckout";
import { createClient } from "@/lib/supabase/client";
import { experiences } from "@/lib/experiences";

interface CheckoutData {
  experienceId: string;
  selectedDate: string;
  selectedTime: string;
  groupSize: number;
  totalPrice: number;
  contact: { name: string; email: string; phone: string; notes: string };
}

export default function CheckoutPage() {
  const router = useRouter();
  const supabase = createClient();
  const [data, setData] = useState<CheckoutData | null>(null);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("vyrand_checkout");
      if (raw) {
        setData(JSON.parse(raw));
      } else {
        router.replace("/booking");
      }
    } catch {
      router.replace("/booking");
    }
  }, [router]);

  const handlePaymentSuccess = async () => {
    if (!data) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login?redirect=/booking/checkout");
      return;
    }

    const { error } = await supabase.from("bookings").insert({
      user_id: user.id,
      experience_id: data.experienceId,
      booking_date: data.selectedDate,
      booking_time: data.selectedTime,
      group_size: data.groupSize,
      total_price: data.totalPrice,
      contact_name: data.contact.name,
      contact_email: data.contact.email,
      contact_phone: data.contact.phone,
      notes: data.contact.notes || null,
    });

    if (error) {
      setSubmitError("Payment approved but booking failed. Contact us: info@vyrand.com");
      return;
    }

    localStorage.removeItem("vyrand_checkout");
    await Promise.all([
      supabase.from("profiles").upsert({
        id: user.id,
        full_name: data.contact.name,
        phone: data.contact.phone,
        updated_at: new Date().toISOString(),
      }),
      supabase.auth.updateUser({
        data: { full_name: data.contact.name, phone: data.contact.phone },
      }),
    ]);
    try {
      localStorage.setItem(
        "vyrand_contact",
        JSON.stringify({ name: data.contact.name, email: data.contact.email, phone: data.contact.phone })
      );
    } catch { /* ignore */ }
    router.push("/booking/confirmed");
  };

  if (!data) {
    return (
      <div style={{ paddingTop: 140, minHeight: "100vh", textAlign: "center", color: "var(--muted)", fontSize: "0.9rem" }}>
        Loading…
      </div>
    );
  }

  const exp = experiences.find((e) => e.id === data.experienceId);
  const expLabel = exp ? `${exp.name} — ${exp.sport}` : data.experienceId;

  return (
    <div style={{ paddingTop: 96, minHeight: "100vh" }}>
      {/* Breadcrumb bar */}
      <section
        style={{
          borderBottom: "1px solid var(--border)",
          backgroundColor: "var(--surface)",
          padding: "28px 24px",
        }}
      >
        <div style={{ maxWidth: 860, margin: "0 auto", display: "flex", alignItems: "center", gap: 12 }}>
          <Link
            href="/booking"
            style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--muted)", textDecoration: "none", fontSize: "0.85rem" }}
          >
            <ArrowLeft size={14} /> Back to Booking
          </Link>
          <span style={{ color: "var(--border)" }}>·</span>
          <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)" }}>
            Checkout
          </span>
        </div>
      </section>

      <div
        style={{
          maxWidth: 860,
          margin: "0 auto",
          padding: "48px 24px 96px",
          display: "grid",
          gridTemplateColumns: "1fr 340px",
          gap: 48,
        }}
      >
        {/* Left — Payment */}
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
          <p style={{ fontSize: "0.85rem", color: "var(--muted)", marginBottom: 28, lineHeight: 1.6 }}>
            Pay safely via PayPal. No PayPal account needed — you can pay with a debit or credit card.
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
            amount={data.totalPrice.toFixed(2)}
            experienceName={expLabel}
            groupSize={data.groupSize}
            onSuccess={handlePaymentSuccess}
          />

          {submitError && (
            <p style={{ fontSize: "0.82rem", color: "#f87171", marginTop: 14 }}>{submitError}</p>
          )}

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
            256-bit SSL encrypted · Powered by PayPal
          </div>
        </div>

        {/* Right — Order summary */}
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
              <div style={{ marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid var(--border)" }}>
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
                  {expLabel}
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>
                  {data.groupSize} {data.groupSize === 1 ? "person" : "people"} · {exp?.duration ?? "30 min"} · {data.selectedTime}
                </div>
                <div style={{ fontSize: "0.78rem", color: "var(--muted)", marginTop: 2 }}>
                  {data.selectedDate}
                </div>
              </div>

              {[
                { label: "Price per person", value: `${exp?.pricePerPerson ?? 70}€` },
                { label: "Group size", value: `${data.groupSize} ${data.groupSize === 1 ? "person" : "people"}` },
                { label: "Subtotal", value: `${data.totalPrice}€` },
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
                  alignItems: "center",
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
                  {data.totalPrice}€
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
