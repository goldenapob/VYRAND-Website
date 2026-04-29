import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  experiences,
  getExperience,
  getOtherExperiences,
  intensityLabels,
} from "@/lib/experiences";
import { ArrowRight, Clock, Users, Zap, Shield, ChevronLeft } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return experiences.map((exp) => ({ slug: exp.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const exp = getExperience(slug);
  if (!exp) return {};
  return {
    title: `${exp.name} — ${exp.sport} Simulator | VYRAND`,
    description: `${exp.tagline} ${exp.description} Book now from ${exp.pricePerPerson}€ per person.`,
  };
}

function IntensityBar({ level }: { level: number }) {
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          style={{
            width: 24,
            height: 5,
            borderRadius: 2,
            backgroundColor: i <= level ? "var(--accent)" : "var(--border)",
          }}
        />
      ))}
    </div>
  );
}

export default async function ExperiencePage({ params }: Props) {
  const { slug } = await params;
  const exp = getExperience(slug);
  if (!exp) notFound();

  const others = getOtherExperiences(slug);
  const accentColor = exp.isFlagship ? "#25a267" : "var(--accent)";

  return (
    <div style={{ paddingTop: 96 }}>
      {/* Back nav */}
      <div
        style={{
          borderBottom: "1px solid var(--border)",
          backgroundColor: "var(--surface)",
          padding: "16px 24px",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Link
            href="/experiences"
            className="nav-link"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              color: "var(--muted)",
              fontSize: "0.85rem",
            }}
          >
            <ChevronLeft size={15} />
            All Experiences
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section style={{ position: "relative", overflow: "hidden", minHeight: 560 }}>
        <img
          src={exp.image}
          alt={`${exp.name} simulator`}
          style={{ position: "absolute", inset: 0, zIndex: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(10,10,15,0.95) 40%, rgba(10,10,15,0.3) 100%)",
            zIndex: 1,
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: 1280,
            margin: "0 auto",
            padding: "80px 24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            minHeight: 560,
          }}
        >
          <div style={{ maxWidth: 600 }}>
            <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
              {exp.isFlagship && (
                <span
                  style={{
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#25a267",
                    border: "1px solid #25a267",
                    borderRadius: 4,
                    padding: "4px 10px",
                  }}
                >
                  Flagship
                </span>
              )}
              {exp.isAndorraID && (
                <span
                  style={{
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                    border: "1px solid var(--accent)",
                    borderRadius: 4,
                    padding: "4px 10px",
                  }}
                >
                  Andorra ID
                </span>
              )}
              <span
                style={{
                  fontSize: "0.6rem",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  border: "1px solid var(--border)",
                  borderRadius: 4,
                  padding: "4px 10px",
                }}
              >
                {exp.sport}
              </span>
            </div>

            <h1
              style={{
                fontSize: "clamp(3rem, 8vw, 5.5rem)",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                color: "var(--text)",
                lineHeight: 1,
                marginBottom: 16,
              }}
            >
              {exp.name}
            </h1>

            <p
              style={{
                fontSize: "1.2rem",
                color: accentColor,
                fontWeight: 600,
                fontStyle: "italic",
                marginBottom: 24,
                lineHeight: 1.4,
              }}
            >
              {exp.heroLine}
            </p>

            <p
              style={{
                fontSize: "1rem",
                color: "var(--muted)",
                lineHeight: 1.7,
                marginBottom: 36,
              }}
            >
              {exp.description}
            </p>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <Link href={`/booking?exp=${exp.id}`} className="btn-primary">
                Book {exp.name} <ArrowRight size={16} />
              </Link>
              <Link href="/pricing" className="btn-secondary">
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section
        style={{
          backgroundColor: "var(--surface)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {[
            { icon: <Clock size={16} />, label: "Duration", value: exp.duration },
            { icon: <Users size={16} />, label: "Group Size", value: exp.groupSize },
            { icon: <Zap size={16} />, label: "Intensity", value: intensityLabels[exp.intensity] },
            { icon: <Shield size={16} />, label: "Min Age", value: `${exp.details.ageMin}+ years` },
          ].map((item, i, arr) => (
            <div
              key={item.label}
              style={{
                flex: "1 1 160px",
                padding: "28px 24px",
                borderRight: i < arr.length - 1 ? "1px solid var(--border)" : "none",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  color: "var(--muted)",
                  fontSize: "0.78rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                <span style={{ color: accentColor }}>{item.icon}</span>
                {item.label}
              </div>
              <div
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "var(--text)",
                }}
              >
                {item.value}
              </div>
            </div>
          ))}
          <div
            style={{
              flex: "1 1 160px",
              padding: "28px 24px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 8 }}>
              Price
            </div>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, background: "linear-gradient(90deg, #25a267, #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {exp.pricePerPerson}€
            </div>
            <div style={{ fontSize: "0.72rem", color: "var(--muted)", marginTop: 2 }}>per person</div>
          </div>
        </div>
      </section>

      {/* What to expect */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
          <div>
            <span className="section-label">What to Expect</span>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, color: "var(--text)", marginTop: 16, marginBottom: 32 }}>
              The full picture.
            </h2>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 16 }}>
              {exp.whatToExpect.map((item, i) => (
                <li key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <span
                    style={{
                      flexShrink: 0,
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      background: "linear-gradient(90deg, #25a267, #f97316)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      color: "#fff",
                      marginTop: 1,
                    }}
                  >
                    {i + 1}
                  </span>
                  <span style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.65 }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="section-label">Details</span>
            <div style={{ marginTop: 16 }}>
              {[
                { label: "Difficulty", value: exp.details.difficulty },
                { label: "Duration", value: exp.duration },
                { label: "Group Size", value: exp.groupSize },
                { label: "Minimum Age", value: `${exp.details.ageMin} years old` },
                { label: "Requirements", value: exp.details.requirements },
                { label: "Price Per Person", value: `${exp.pricePerPerson}€` },
              ].map((detail, i) => (
                <div
                  key={detail.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "16px 0",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <span style={{ fontSize: "0.85rem", color: "var(--muted)", letterSpacing: "0.05em" }}>
                    {detail.label}
                  </span>
                  <span style={{ fontSize: "0.9rem", fontWeight: 600, color: i === 5 ? "var(--accent)" : "var(--text)", textAlign: "right", maxWidth: 240 }}>
                    {detail.value}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 24 }}>
              <div style={{ fontSize: "0.75rem", color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>
                Intensity Level
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <IntensityBar level={exp.intensity} />
                <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text)" }}>
                  {intensityLabels[exp.intensity]}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery placeholder */}
      <section
        style={{
          backgroundColor: "var(--surface)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          padding: "80px 24px",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <span className="section-label">Gallery</span>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text)", marginTop: 16, marginBottom: 32 }}>
            See it in action.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 12, height: 480 }}>
            <div style={{ borderRadius: 12, gridRow: "span 2", overflow: "hidden" }}>
              <img
                src={exp.image}
                alt={`${exp.name} simulator`}
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
              />
            </div>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="img-placeholder" style={{ borderRadius: 12 }} />
            ))}
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 24px" }}>
        <div
          style={{
            borderRadius: 16,
            border: `1px solid ${exp.isFlagship ? "#25a267" : "var(--border)"}`,
            background: exp.isFlagship
              ? "linear-gradient(135deg, rgba(26,14,8,0.9), rgba(17,17,24,1))"
              : "var(--surface)",
            padding: "56px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 40,
            flexWrap: "wrap",
          }}
        >
          <div>
            <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800, color: "var(--text)", marginBottom: 12, lineHeight: 1.1 }}>
              Ready to book{" "}
              <span style={{ background: "linear-gradient(90deg, #25a267, #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                {exp.name}?
              </span>
            </h2>
            <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.7, maxWidth: 440 }}>
              {exp.pricePerPerson}€ per person · {exp.duration} · {exp.groupSize}. No experience needed.
            </p>
          </div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Link href={`/booking?exp=${exp.id}`} className="btn-primary" style={{ fontSize: "1rem", padding: "13px 28px" }}>
              Book {exp.name} <ArrowRight size={17} />
            </Link>
            <Link href="/pricing" className="btn-secondary" style={{ fontSize: "1rem", padding: "13px 28px" }}>
              View All Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Other experiences */}
      <section
        style={{
          backgroundColor: "var(--surface)",
          borderTop: "1px solid var(--border)",
          padding: "80px 24px",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <span className="section-label">More Experiences</span>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text)", marginTop: 16, marginBottom: 32 }}>
            Keep the rush going.
          </h2>
          <div style={{ display: "flex", gap: 20, overflowX: "auto", paddingBottom: 8 }}>
            {others.map((other) => (
              <Link
                key={other.id}
                href={`/experiences/${other.id}`}
                style={{ textDecoration: "none", flexShrink: 0 }}
              >
                <div
                  className="card-hover-sm"
                  style={{
                    width: 260,
                    borderRadius: 12,
                    border: "1px solid var(--border)",
                    backgroundColor: "var(--bg)",
                    overflow: "hidden",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ height: 150, overflow: "hidden" }}>
                    <img
                      src={other.image}
                      alt={`${other.name} simulator`}
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
                    />
                  </div>
                  <div style={{ padding: "16px 18px 20px" }}>
                    {other.isFlagship && (
                      <span style={{ fontSize: "0.57rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#25a267", border: "1px solid #25a267", borderRadius: 4, padding: "2px 7px", display: "inline-block", marginBottom: 8 }}>
                        Flagship
                      </span>
                    )}
                    <div style={{ fontSize: "1.1rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--text)", marginBottom: 4 }}>
                      {other.name}
                    </div>
                    <div style={{ fontSize: "0.78rem", color: "var(--muted)", marginBottom: 12 }}>
                      {other.sport}
                    </div>
                    <div style={{ fontSize: "0.78rem", color: "var(--accent)", fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                      Explore <ArrowRight size={12} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
