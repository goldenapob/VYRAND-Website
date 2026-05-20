import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { experiences } from "@/lib/experiences";
import { CalendarCheck, Clock, ArrowRight, MapPin } from "lucide-react";
import CancelBookingButton from "./CancelBookingButton";
import LogoutButton from "./LogoutButton";

export const metadata = {
  title: "My Booking — VYRAND",
  description: "Manage your VYRAND experience bookings.",
};

type Booking = {
  id: string;
  experience_id: string;
  booking_date: string;
  booking_time: string;
  group_size: number;
  total_price: number;
  contact_name: string;
  status: string;
  created_at: string;
};

function formatDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function AccountPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?redirect=/account");

  const { data: bookings } = await supabase
    .from("bookings")
    .select("*")
    .eq("user_id", user.id)
    .order("booking_date", { ascending: true });

  const upcoming = (bookings ?? []).filter(
    (b: Booking) => b.status !== "cancelled" && new Date(b.booking_date) >= new Date(new Date().toDateString())
  );
  const past = (bookings ?? []).filter(
    (b: Booking) => b.status !== "cancelled" && new Date(b.booking_date) < new Date(new Date().toDateString())
  );

  const userName = (user.user_metadata?.full_name as string | undefined)?.split(" ")[0] ?? "there";

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
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
            <div>
              <h1
                style={{
                  fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  color: "var(--text)",
                  marginTop: 16,
                }}
              >
                Hey {userName}.
              </h1>
              <p style={{ fontSize: "0.95rem", color: "var(--muted)", marginTop: 8 }}>
                {user.email}
              </p>
            </div>
            <div style={{ marginTop: 20 }}>
              <LogoutButton />
            </div>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px 96px" }}>
        {/* Upcoming bookings */}
        {upcoming.length > 0 ? (
          <>
            <h2 style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 20 }}>
              Upcoming
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 48 }}>
              {upcoming.map((b: Booking) => {
                const exp = experiences.find((e) => e.id === b.experience_id);
                return (
                  <div
                    key={b.id}
                    style={{
                      border: `1px solid ${exp?.isFlagship ? "#25a267" : "var(--border)"}`,
                      borderRadius: 14,
                      overflow: "hidden",
                      background: exp?.isFlagship
                        ? "linear-gradient(135deg, rgba(26,14,8,0.6), var(--surface))"
                        : "var(--surface)",
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
                        flexWrap: "wrap",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <CalendarCheck size={18} style={{ color: exp?.isFlagship ? "#25a267" : "var(--accent)" }} />
                        <div>
                          <div style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 2 }}>
                            {b.status === "confirmed" ? "Confirmed" : b.status}
                          </div>
                          <div style={{ fontSize: "1.1rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--text)" }}>
                            {exp?.name ?? b.experience_id} — {exp?.sport}
                          </div>
                        </div>
                      </div>
                      {exp?.isFlagship && (
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
                      )}
                    </div>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                      }}
                    >
                      {[
                        { icon: <CalendarCheck size={14} />, label: "Date", value: formatDate(b.booking_date) },
                        { icon: <Clock size={14} />, label: "Time", value: `${b.booking_time} — arrive 15 min early` },
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
                        flexWrap: "wrap",
                      }}
                    >
                      <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>
                        {b.group_size} {b.group_size === 1 ? "person" : "people"} · {(b.total_price / b.group_size).toFixed(0)}€/person ·{" "}
                        <strong style={{ color: "var(--text)" }}>{b.total_price}€ total</strong>
                      </div>
                      <div style={{ display: "flex", gap: 12 }}>
                        <CancelBookingButton bookingId={b.id} />
                        <Link href="/contact" className="btn-secondary" style={{ padding: "8px 16px", fontSize: "0.8rem" }}>
                          Contact us
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div
            style={{
              border: "1px dashed var(--border)",
              borderRadius: 14,
              padding: "48px 32px",
              textAlign: "center",
              marginBottom: 48,
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
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--text)", marginBottom: 10 }}>
              No upcoming bookings.
            </h3>
            <p
              style={{
                fontSize: "0.875rem",
                color: "var(--muted)",
                lineHeight: 1.6,
                maxWidth: 380,
                margin: "0 auto 24px",
              }}
            >
              Ready to feel the rush? Book your first experience.
            </p>
            <Link href="/experiences" className="btn-primary">
              Explore Experiences <ArrowRight size={15} />
            </Link>
          </div>
        )}

        {/* Past bookings */}
        {past.length > 0 && (
          <>
            <h2 style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 16 }}>
              Past
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {past.map((b: Booking) => {
                const exp = experiences.find((e) => e.id === b.experience_id);
                return (
                  <div
                    key={b.id}
                    style={{
                      border: "1px solid var(--border)",
                      borderRadius: 12,
                      padding: "16px 24px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 16,
                      backgroundColor: "var(--surface)",
                      opacity: 0.6,
                      flexWrap: "wrap",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: "0.9rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--text)" }}>
                        {exp?.name ?? b.experience_id}
                      </div>
                      <div style={{ fontSize: "0.8rem", color: "var(--muted)", marginTop: 2 }}>
                        {formatDate(b.booking_date)} · {b.booking_time} · {b.group_size} people
                      </div>
                    </div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--muted)" }}>
                      {b.total_price}€
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Help */}
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
