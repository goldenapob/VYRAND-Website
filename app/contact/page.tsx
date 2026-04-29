import type { Metadata } from "next";
import { MapPin, Mail, Clock, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact — VYRAND",
  description: "Find VYRAND in Andorra. Contact us for bookings, groups, and partnerships.",
};

export default function ContactPage() {
  return (
    <div style={{ paddingTop: 96 }}>
      {/* Header */}
      <section style={{ borderBottom: "1px solid var(--border)", backgroundColor: "var(--surface)", padding: "72px 24px 64px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <span className="section-label">Contact</span>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.01em", color: "var(--text)", marginTop: 16, lineHeight: 1.05 }}>
            Find us in Andorra.
          </h1>
        </div>
      </section>

      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72 }}>
          {/* Contact info */}
          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {[
                {
                  icon: <MapPin size={20} />,
                  title: "Location",
                  lines: ["VYRAND Experience Center", "Carrer de la Unió, Andorra la Vella", "Principat d'Andorra"],
                },
                {
                  icon: <Mail size={20} />,
                  title: "Email",
                  lines: ["info@vyrand.com", "groups@vyrand.com (for groups & events)"],
                },
                {
                  icon: <Phone size={20} />,
                  title: "Phone",
                  lines: ["+376 000 000"],
                },
                {
                  icon: <Clock size={20} />,
                  title: "Opening Hours",
                  lines: ["Monday – Friday: 10:00 – 20:00", "Saturday – Sunday: 09:00 – 21:00", "Open year-round"],
                },
              ].map((item) => (
                <div key={item.title} style={{ display: "flex", gap: 20 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, backgroundColor: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)", flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 8 }}>
                      {item.title}
                    </div>
                    {item.lines.map((line, i) => (
                      <div key={i} style={{ fontSize: "0.9rem", color: "var(--text)", lineHeight: 1.6 }}>
                        {line}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact form */}
          <div>
            <h2 style={{ fontSize: "1.375rem", fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>
              Send us a message
            </h2>
            <p style={{ fontSize: "0.875rem", color: "var(--muted)", marginBottom: 28, lineHeight: 1.6 }}>
              For groups, events, partnerships, or any question — we reply within 24 hours.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {[
                { label: "Your Name", type: "text", placeholder: "Marc Torres" },
                { label: "Email Address", type: "email", placeholder: "marc@email.com" },
                { label: "Subject", type: "text", placeholder: "Group booking enquiry" },
              ].map((field) => (
                <div key={field.label}>
                  <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 10 }}>
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    style={{ width: "100%", padding: "12px 16px", backgroundColor: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text)", fontSize: "0.9rem", outline: "none" }}
                  />
                </div>
              ))}

              <div>
                <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 10 }}>
                  Message
                </label>
                <textarea
                  placeholder="Tell us what you need..."
                  rows={5}
                  style={{ width: "100%", padding: "12px 16px", backgroundColor: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text)", fontSize: "0.9rem", outline: "none", resize: "vertical", fontFamily: "inherit" }}
                />
              </div>

              <button className="btn-primary" style={{ width: "100%", justifyContent: "center", fontSize: "0.95rem", padding: "13px 24px" }}>
                Send Message →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section style={{ backgroundColor: "var(--surface)", borderTop: "1px solid var(--border)" }}>
        <div className="img-placeholder" style={{ height: 380 }}>
          <div>
            <MapPin size={32} style={{ margin: "0 auto 12px", color: "var(--accent)" }} />
            <div>Google Maps embed — VYRAND location in Andorra la Vella</div>
            <div style={{ marginTop: 6, fontSize: "0.6rem", opacity: 0.4 }}>
              Interactive map with directions from France & Spain
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
