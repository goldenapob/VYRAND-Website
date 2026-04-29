import type { Metadata } from "next";
import Link from "next/link";
import { experiences, intensityLabels } from "@/lib/experiences";
import { ArrowRight, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "All Experiences — VYRAND",
  description:
    "Five extreme-sport simulators in Andorra. Wingsuit, ski jump, MTB, climbing, off-road buggy. No experience needed. From 70€.",
};

function IntensityBar({ level }: { level: number }) {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          style={{
            width: 18,
            height: 4,
            borderRadius: 2,
            backgroundColor: i <= level ? "var(--accent)" : "var(--border)",
          }}
        />
      ))}
    </div>
  );
}

export default function ExperiencesPage() {
  const flagship = experiences[0];
  const rest = experiences.slice(1);

  return (
    <div style={{ paddingTop: 96 }}>
      {/* Header */}
      <section
        style={{
          borderBottom: "1px solid var(--border)",
          padding: "72px 24px 64px",
          backgroundColor: "var(--surface)",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <span className="section-label">All Experiences</span>
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
            Five simulators.
            <br />
            One location.
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "var(--muted)",
              lineHeight: 1.7,
              maxWidth: 560,
            }}
          >
            Each experience is a different extreme sport, at full speed, without
            the risk. Mix and match for your group — or go all in on one.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 24px 96px" }}>
        {/* Flagship full-width */}
        <div style={{ marginBottom: 40 }}>
          <div
            style={{
              borderRadius: 16,
              border: "1px solid #25a267",
              background:
                "linear-gradient(135deg, rgba(26,14,8,0.95), rgba(17,17,24,1))",
              overflow: "hidden",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              minHeight: 480,
            }}
          >
            {/* Content */}
            <div
              style={{
                padding: "52px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
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
                    {flagship.sport}
                  </span>
                </div>

                <h2
                  style={{
                    fontSize: "3.5rem",
                    fontWeight: 900,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    color: "var(--text)",
                    lineHeight: 1,
                    marginBottom: 12,
                  }}
                >
                  {flagship.name}
                </h2>

                <p
                  style={{
                    fontSize: "1.1rem",
                    color: "#25a267",
                    fontWeight: 600,
                    marginBottom: 16,
                    fontStyle: "italic",
                  }}
                >
                  {flagship.tagline}
                </p>

                <p
                  style={{
                    fontSize: "0.95rem",
                    color: "var(--muted)",
                    lineHeight: 1.7,
                    maxWidth: 400,
                    marginBottom: 28,
                  }}
                >
                  {flagship.description}
                </p>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 16,
                    marginBottom: 24,
                  }}
                >
                  {[
                    { label: "Duration", value: flagship.duration },
                    { label: "Group size", value: flagship.groupSize },
                    { label: "Price", value: `${flagship.pricePerPerson}€/person` },
                    { label: "Age", value: `${flagship.details.ageMin}+ years` },
                  ].map((detail) => (
                    <div key={detail.label}>
                      <div
                        style={{
                          fontSize: "0.65rem",
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: "var(--muted)",
                          marginBottom: 4,
                        }}
                      >
                        {detail.label}
                      </div>
                      <div
                        style={{
                          fontSize: "0.925rem",
                          fontWeight: 600,
                          color: "var(--text)",
                        }}
                      >
                        {detail.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <IntensityBar level={flagship.intensity} />
                  <span
                    style={{
                      fontSize: "0.68rem",
                      color: "var(--muted)",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    {intensityLabels[flagship.intensity]}
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", gap: 12, marginTop: 36 }}>
                <Link href="/booking?exp=air" className="btn-primary">
                  Book Air <ArrowRight size={15} />
                </Link>
                <Link href="/experiences/air" className="btn-secondary">
                  Full Details
                </Link>
              </div>
            </div>

            {/* Image */}
            <div style={{ minHeight: 400, overflow: "hidden" }}>
              <img
                src="/images/experiences/air.jpeg"
                alt="Air wingsuit simulator"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block", minHeight: 400 }}
              />
            </div>
          </div>
        </div>

        {/* Other 4 experiences — 2 col grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 24,
          }}
        >
          {rest.map((exp) => (
            <div
              key={exp.id}
              className="card-hover"
              style={{
                borderRadius: 14,
                border: "1px solid var(--border)",
                backgroundColor: "var(--surface)",
                overflow: "hidden",
              }}
            >
              {/* Image */}
              <div style={{ height: 220, overflow: "hidden" }}>
                <img
                  src={exp.image}
                  alt={`${exp.name} simulator`}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
                />
              </div>

              {/* Content */}
              <div style={{ padding: "24px 28px 28px" }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
                  {exp.isAndorraID && (
                    <span
                      style={{
                        fontSize: "0.57rem",
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "var(--accent)",
                        border: "1px solid var(--accent)",
                        borderRadius: 4,
                        padding: "2px 7px",
                      }}
                    >
                      Andorra ID
                    </span>
                  )}
                  <span
                    style={{
                      fontSize: "0.57rem",
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--muted)",
                      border: "1px solid var(--border)",
                      borderRadius: 4,
                      padding: "2px 7px",
                    }}
                  >
                    {exp.sport}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: "1.75rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    color: "var(--text)",
                    marginBottom: 6,
                  }}
                >
                  {exp.name}
                </h3>

                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--accent)",
                    fontWeight: 600,
                    fontStyle: "italic",
                    marginBottom: 12,
                  }}
                >
                  {exp.tagline}
                </p>

                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--muted)",
                    lineHeight: 1.65,
                    marginBottom: 20,
                  }}
                >
                  {exp.description}
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: 20,
                    fontSize: "0.78rem",
                    color: "var(--muted)",
                    marginBottom: 18,
                    borderTop: "1px solid var(--border)",
                    paddingTop: 96,
                  }}
                >
                  <span>{exp.duration}</span>
                  <span>·</span>
                  <span>{exp.groupSize}</span>
                  <span>·</span>
                  <span style={{ color: "var(--accent)", fontWeight: 700 }}>
                    {exp.pricePerPerson}€
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 20,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <IntensityBar level={exp.intensity} />
                    <span
                      style={{
                        fontSize: "0.65rem",
                        color: "var(--muted)",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                    >
                      {intensityLabels[exp.intensity]}
                    </span>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 12 }}>
                  <Link
                    href={`/booking?exp=${exp.id}`}
                    className="btn-primary-sm"
                    style={{ flex: 1, justifyContent: "center" }}
                  >
                    Book This →
                  </Link>
                  <Link
                    href={`/experiences/${exp.id}`}
                    className="btn-secondary"
                    style={{ padding: "10px 16px", fontSize: "0.85rem" }}
                  >
                    <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
