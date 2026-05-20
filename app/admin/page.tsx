import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { experiences } from "@/lib/experiences";
import PriceEditor from "./PriceEditor";

export const metadata = {
  title: "Admin — VYRAND",
};

type PriceRow = { id: string; price_per_person: number };

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?redirect=/admin");

  // Only users with role=admin in app_metadata can access
  const role = user.app_metadata?.role;
  if (role !== "admin") {
    redirect("/");
  }

  const { data: prices } = await supabase
    .from("experience_prices")
    .select("id, price_per_person");

  const priceMap: Record<string, number> = {};
  (prices ?? []).forEach((row: PriceRow) => {
    priceMap[row.id] = row.price_per_person;
  });

  // Fetch recent bookings for overview
  const { data: recentBookings } = await supabase
    .from("bookings")
    .select("id, experience_id, booking_date, booking_time, group_size, total_price, contact_name, contact_email, status, created_at")
    .order("created_at", { ascending: false })
    .limit(20);

  return (
    <div style={{ paddingTop: 96, minHeight: "100vh" }}>
      <section
        style={{
          borderBottom: "1px solid var(--border)",
          backgroundColor: "var(--surface)",
          padding: "48px 24px",
        }}
      >
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <span className="section-label">Admin Panel</span>
          <h1
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 900,
              textTransform: "uppercase",
              color: "var(--text)",
              marginTop: 16,
            }}
          >
            VYRAND Dashboard.
          </h1>
        </div>
      </section>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "48px 24px 96px" }}>
        {/* Price Editor */}
        <section style={{ marginBottom: 64 }}>
          <h2
            style={{
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--accent)",
              borderBottom: "1px solid var(--border)",
              paddingBottom: 10,
              marginBottom: 24,
            }}
          >
            Experience Prices
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {experiences.map((exp) => (
              <PriceEditor
                key={exp.id}
                experienceId={exp.id}
                experienceName={exp.name}
                sport={exp.sport}
                currentPrice={priceMap[exp.id] ?? exp.pricePerPerson}
                isFlagship={exp.isFlagship}
              />
            ))}
          </div>
        </section>

        {/* Recent Bookings */}
        <section>
          <h2
            style={{
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--accent)",
              borderBottom: "1px solid var(--border)",
              paddingBottom: 10,
              marginBottom: 24,
            }}
          >
            Recent Bookings
          </h2>

          {!recentBookings || recentBookings.length === 0 ? (
            <p style={{ color: "var(--muted)", fontSize: "0.875rem" }}>No bookings yet.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "0.85rem",
                }}
              >
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    {["Name", "Email", "Experience", "Date", "Time", "Group", "Total", "Status"].map((h) => (
                      <th
                        key={h}
                        style={{
                          textAlign: "left",
                          padding: "10px 12px",
                          fontSize: "0.65rem",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "var(--muted)",
                          fontWeight: 600,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((b) => (
                    <tr
                      key={b.id}
                      style={{
                        borderBottom: "1px solid var(--border)",
                        opacity: b.status === "cancelled" ? 0.4 : 1,
                      }}
                    >
                      <td style={{ padding: "12px 12px", color: "var(--text)", fontWeight: 500 }}>{b.contact_name}</td>
                      <td style={{ padding: "12px 12px", color: "var(--muted)" }}>{b.contact_email}</td>
                      <td style={{ padding: "12px 12px", color: "var(--text)", textTransform: "uppercase", fontSize: "0.8rem", letterSpacing: "0.04em" }}>
                        {experiences.find((e) => e.id === b.experience_id)?.name ?? b.experience_id}
                      </td>
                      <td style={{ padding: "12px 12px", color: "var(--muted)", whiteSpace: "nowrap" }}>{b.booking_date}</td>
                      <td style={{ padding: "12px 12px", color: "var(--muted)" }}>{b.booking_time}</td>
                      <td style={{ padding: "12px 12px", color: "var(--muted)", textAlign: "center" }}>{b.group_size}</td>
                      <td style={{ padding: "12px 12px", color: "var(--text)", fontWeight: 600 }}>{b.total_price}€</td>
                      <td style={{ padding: "12px 12px" }}>
                        <span
                          style={{
                            fontSize: "0.6rem",
                            fontWeight: 700,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            padding: "3px 8px",
                            borderRadius: 4,
                            border: `1px solid ${b.status === "confirmed" ? "#25a267" : b.status === "cancelled" ? "#f87171" : "var(--border)"}`,
                            color: b.status === "confirmed" ? "#25a267" : b.status === "cancelled" ? "#f87171" : "var(--muted)",
                          }}
                        >
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
