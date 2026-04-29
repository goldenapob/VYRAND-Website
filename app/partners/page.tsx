import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, Percent, Calendar, Users, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Partners & Hotels — VYRAND",
  description:
    "Partner with VYRAND. Commission packages for hotels and tour operators in Andorra.",
};

export default function PartnersPage() {
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
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <span className="section-label">Partners & Hotels</span>
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
            Give your guests
            <br />
            <span
              style={{
                background: "linear-gradient(90deg, #25a267, #f97316)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              the rush.
            </span>
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "var(--muted)",
              lineHeight: 1.7,
              maxWidth: 560,
            }}
          >
            VYRAND partners with hotels and tour operators in Andorra. We handle
            the experience — you earn commission on every booking.
          </p>
        </div>
      </section>

      {/* Why partner */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span className="section-label">Why Partner</span>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
              fontWeight: 700,
              color: "var(--text)",
              marginTop: 16,
            }}
          >
            The experience your guests are looking for.
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 24,
          }}
        >
          {[
            {
              icon: <Percent size={22} />,
              title: "Commission on every booking",
              desc: "Earn up to 15% commission on every guest booking you refer. Tracked automatically, paid monthly.",
            },
            {
              icon: <Calendar size={22} />,
              title: "Priority scheduling",
              desc: "Partner hotels get access to dedicated time slots and priority booking for group sessions.",
            },
            {
              icon: <Users size={22} />,
              title: "Group packages",
              desc: "Custom packages for hotel guests, corporate groups, and tour operators. We handle the logistics.",
            },
            {
              icon: <Building2 size={22} />,
              title: "Co-marketing support",
              desc: "VYRAND branding materials, landing pages, and digital assets for your website and reception.",
            },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                borderRadius: 12,
                border: "1px solid var(--border)",
                backgroundColor: "var(--surface)",
                padding: "28px",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 10,
                  backgroundColor: "rgba(249,115,22,0.08)",
                  border: "1px solid rgba(249,115,22,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--accent)",
                  marginBottom: 20,
                }}
              >
                {item.icon}
              </div>
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "var(--text)",
                  marginBottom: 10,
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--muted)",
                  lineHeight: 1.7,
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Packages */}
      <section
        style={{
          backgroundColor: "var(--surface)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          padding: "80px 24px",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <span className="section-label">Partnership Tiers</span>
          <h2
            style={{
              fontSize: "1.75rem",
              fontWeight: 700,
              color: "var(--text)",
              marginTop: 16,
              marginBottom: 40,
            }}
          >
            Choose your level.
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
            }}
          >
            {[
              {
                tier: "Referral",
                commission: "10%",
                desc: "For hotels and concierges who want to recommend VYRAND to guests with minimal setup.",
                features: [
                  "10% commission on referred bookings",
                  "Branded flyers for reception",
                  "Dedicated booking link for tracking",
                  "Monthly commission payouts",
                ],
                cta: "Start Referring",
                featured: false,
              },
              {
                tier: "Partner",
                commission: "15%",
                desc: "For hotels and tour operators that want to include VYRAND as an official activity option.",
                features: [
                  "15% commission on all bookings",
                  "Priority scheduling for your guests",
                  "Custom group packages available",
                  "Co-branded digital materials",
                  "Dedicated partner manager",
                  "Quarterly performance reviews",
                ],
                cta: "Become a Partner",
                featured: true,
              },
              {
                tier: "Exclusive",
                commission: "Custom",
                desc: "For large hotels, tour operators, or travel agencies wanting deep integration.",
                features: [
                  "Custom commission structure",
                  "White-label booking option",
                  "Private group time slots",
                  "On-site VYRAND ambassador",
                  "Custom experience packages",
                  "Direct invoice & billing",
                ],
                cta: "Talk to Us",
                featured: false,
              },
            ].map((pkg) => (
              <div
                key={pkg.tier}
                style={{
                  borderRadius: 14,
                  border: `1px solid ${pkg.featured ? "var(--accent)" : "var(--border)"}`,
                  backgroundColor: pkg.featured
                    ? "rgba(249,115,22,0.04)"
                    : "var(--bg)",
                  padding: "32px",
                  position: "relative",
                }}
              >
                {pkg.featured && (
                  <div
                    style={{
                      position: "absolute",
                      top: -1,
                      left: 24,
                      right: 24,
                      height: 2,
                      background: "linear-gradient(90deg, #25a267, #f97316)",
                      borderRadius: "0 0 2px 2px",
                    }}
                  />
                )}

                <div
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    marginBottom: 8,
                  }}
                >
                  {pkg.tier}
                </div>

                <div
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: 900,
                    background: "linear-gradient(90deg, #25a267, #f97316)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    lineHeight: 1,
                    marginBottom: 4,
                  }}
                >
                  {pkg.commission}
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--muted)",
                    marginBottom: 16,
                  }}
                >
                  commission
                </div>

                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--muted)",
                    lineHeight: 1.65,
                    marginBottom: 24,
                    paddingBottom: 24,
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  {pkg.desc}
                </p>

                <ul
                  style={{
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    marginBottom: 28,
                  }}
                >
                  {pkg.features.map((f) => (
                    <li
                      key={f}
                      style={{
                        display: "flex",
                        gap: 10,
                        alignItems: "flex-start",
                      }}
                    >
                      <Check
                        size={14}
                        style={{
                          color: "var(--accent)",
                          flexShrink: 0,
                          marginTop: 2,
                        }}
                      />
                      <span
                        style={{
                          fontSize: "0.845rem",
                          color: "var(--muted)",
                          lineHeight: 1.5,
                        }}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href="mailto:partners@vyrand.com"
                  className={pkg.featured ? "btn-primary" : "btn-secondary"}
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  {pkg.cta} <ArrowRight size={14} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section style={{ maxWidth: 860, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span className="section-label">Get in Touch</span>
          <h2
            style={{
              fontSize: "1.75rem",
              fontWeight: 700,
              color: "var(--text)",
              marginTop: 16,
            }}
          >
            Start the conversation.
          </h2>
          <p
            style={{
              fontSize: "0.95rem",
              color: "var(--muted)",
              marginTop: 12,
              lineHeight: 1.7,
            }}
          >
            Tell us about your property and we'll put together the right package.
            We reply within 24 hours.
          </p>
        </div>

        <div
          style={{
            border: "1px solid var(--border)",
            borderRadius: 16,
            padding: "40px 48px",
            backgroundColor: "var(--surface)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 20,
              marginBottom: 20,
            }}
          >
            {[
              { label: "Property / Company Name", placeholder: "Hotel Pyrenees Andorra" },
              { label: "Contact Name", placeholder: "Maria García" },
              { label: "Email", placeholder: "maria@hotel.com" },
              { label: "Phone", placeholder: "+376 000 000" },
            ].map((f) => (
              <div key={f.label}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    marginBottom: 10,
                  }}
                >
                  {f.label}
                </label>
                <input
                  type="text"
                  placeholder={f.placeholder}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    backgroundColor: "var(--bg)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    color: "var(--text)",
                    fontSize: "0.9rem",
                    outline: "none",
                  }}
                />
              </div>
            ))}
          </div>

          <div style={{ marginBottom: 20 }}>
            <label
              style={{
                display: "block",
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--muted)",
                marginBottom: 10,
              }}
            >
              What are you looking for?
            </label>
            <textarea
              placeholder="Tell us about your property, number of guests, type of partnership you're interested in..."
              rows={4}
              style={{
                width: "100%",
                padding: "12px 16px",
                backgroundColor: "var(--bg)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                color: "var(--text)",
                fontSize: "0.9rem",
                outline: "none",
                resize: "vertical",
                fontFamily: "inherit",
              }}
            />
          </div>

          <button
            className="btn-primary"
            style={{
              width: "100%",
              justifyContent: "center",
              fontSize: "1rem",
              padding: "14px 24px",
            }}
          >
            Send Partnership Enquiry <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
}
