"use client";

import Link from "next/link";
import { experiences } from "@/lib/experiences";
import {
  ArrowRight,
  Zap,
  Shield,
  Users,
  MapPin,
  Star,
  ChevronRight,
} from "lucide-react";

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

export default function HomePage() {
  const flagship = experiences[0];
  const rest = experiences.slice(1);

  return (
    <div style={{ paddingTop: 96 }}>
      {/* ─── HERO ─── */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          padding: "80px 24px",
        }}
      >
        <img
          src="/images/experiences/air.jpeg"
          alt="Air wingsuit simulator"
          style={{ position: "absolute", inset: 0, zIndex: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(10,10,15,0.65) 0%, rgba(10,10,15,0.55) 40%, rgba(10,10,15,0.85) 80%, rgba(10,10,15,1) 100%)",
            zIndex: 1,
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            maxWidth: 900,
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 14px",
              borderRadius: 20,
              border: "1px solid rgba(37,162,103,0.3)",
              backgroundColor: "rgba(37,162,103,0.08)",
              marginBottom: 32,
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#25a267",
            }}
          >
            <Zap size={11} />
            Now Open in Andorra
          </div>

          <h1
            style={{
              fontSize: "clamp(2.5rem, 8vw, 5.5rem)",
              fontWeight: 900,
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              color: "var(--text)",
              marginBottom: 24,
            }}
          >
            Leave the{" "}
            <span style={{ background: "linear-gradient(90deg, #25a267, #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              risk
            </span>
            ,<br />
            live the{" "}
            <span style={{ background: "linear-gradient(90deg, #25a267, #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              rush
            </span>
            .
          </h1>

          <p
            style={{
              fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
              color: "var(--muted)",
              lineHeight: 1.7,
              maxWidth: 560,
              margin: "0 auto 40px",
            }}
          >
            5 extreme-sport simulators in Andorra. Wingsuit, ski jump, MTB,
            climbing, buggy. No experience needed — just the nerve.
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/booking" className="btn-primary">
              Book Now <ArrowRight size={16} />
            </Link>
            <Link href="/experiences" className="btn-secondary">
              See All Experiences
            </Link>
          </div>

          <div
            style={{
              display: "flex",
              gap: 48,
              justifyContent: "center",
              marginTop: 72,
              flexWrap: "wrap",
            }}
          >
            {[
              { value: "5", label: "Simulators" },
              { value: "70€", label: "Per person" },
              { value: "2–6", label: "Group size" },
              { value: "200 km/h", label: "Max speed" },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.75rem", fontWeight: 800, background: "linear-gradient(90deg, #25a267, #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1.1 }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: "0.65rem", color: "var(--muted)", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: 4 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 32,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2,
          }}
        >
          <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom, var(--accent), transparent)" }} />
        </div>
      </section>

      {/* ─── EXPERIENCES ─── */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "96px 24px" }}>
        <div style={{ marginBottom: 56 }}>
          <span className="section-label">Experiences</span>
          <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700, color: "var(--text)", marginTop: 16, lineHeight: 1.2 }}>
            Five ways to feel alive.<br />Zero ways to get hurt.
          </h2>
        </div>

        {/* Flagship Air card */}
        <div
          style={{
            borderRadius: 16,
            border: "1px solid #25a267",
            background: "linear-gradient(135deg, rgba(26,14,8,0.9), rgba(17,17,24,1))",
            overflow: "hidden",
            marginBottom: 24,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            minHeight: 420,
          }}
        >
          <div style={{ padding: "48px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#25a267", border: "1px solid #25a267", borderRadius: 4, padding: "4px 10px" }}>
                  Flagship
                </span>
                <span style={{ fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", border: "1px solid var(--border)", borderRadius: 4, padding: "4px 10px" }}>
                  Wingsuit Flying
                </span>
              </div>
              <h3 style={{ fontSize: "3rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--text)", lineHeight: 1, marginBottom: 16 }}>
                Air
              </h3>
              <p style={{ fontSize: "1rem", color: "var(--muted)", lineHeight: 1.7, maxWidth: 380, marginBottom: 20 }}>
                {flagship.description}
              </p>
              <div style={{ display: "flex", gap: 20, fontSize: "0.8rem", color: "var(--muted)", marginBottom: 16 }}>
                <span>{flagship.duration}</span>
                <span>·</span>
                <span>{flagship.groupSize}</span>
                <span>·</span>
                <span style={{ color: "var(--accent)", fontWeight: 600 }}>{flagship.pricePerPerson}€/person</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <IntensityBar level={flagship.intensity} />
                <span style={{ fontSize: "0.65rem", color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  Maximum
                </span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
              <Link href="/booking?exp=air" className="btn-primary">
                Book Air <ArrowRight size={15} />
              </Link>
              <Link href="/experiences/air" className="btn-secondary">
                Explore
              </Link>
            </div>
          </div>

          <div style={{ minHeight: 360, overflow: "hidden", position: "relative" }}>
            <img
              src="/images/experiences/air.jpeg"
              alt="Air wingsuit simulator"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block", minHeight: 360 }}
            />
          </div>
        </div>

        {/* Rest of experiences grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: 20 }}>
          {rest.map((exp) => (
            <Link key={exp.id} href={`/experiences/${exp.id}`} style={{ textDecoration: "none" }}>
              <div
                style={{
                  borderRadius: 12,
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--surface)",
                  overflow: "hidden",
                  transition: "border-color 0.2s, transform 0.2s",
                  height: "100%",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLElement).style.transform = "none";
                }}
              >
                <div style={{ height: 190, overflow: "hidden" }}>
                  <img
                    src={exp.image}
                    alt={`${exp.name} simulator`}
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
                  />
                </div>
                <div style={{ padding: "20px 22px 24px" }}>
                  <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                    {exp.isAndorraID && (
                      <span style={{ fontSize: "0.57rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", border: "1px solid var(--accent)", borderRadius: 4, padding: "2px 7px" }}>
                        Andorra
                      </span>
                    )}
                    <span style={{ fontSize: "0.57rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", border: "1px solid var(--border)", borderRadius: 4, padding: "2px 7px" }}>
                      {exp.sport}
                    </span>
                  </div>
                  <h3 style={{ fontSize: "1.5rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--text)", marginBottom: 8 }}>
                    {exp.name}
                  </h3>
                  <p style={{ fontSize: "0.875rem", color: "var(--muted)", lineHeight: 1.6, marginBottom: 16 }}>
                    {exp.tagline}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <IntensityBar level={exp.intensity} />
                    <span style={{ fontSize: "0.8rem", color: "var(--accent)", fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                      Book <ChevronRight size={13} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section style={{ backgroundColor: "var(--surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "96px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span className="section-label">How It Works</span>
            <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.25rem)", fontWeight: 700, marginTop: 16, color: "var(--text)" }}>
              Three steps to the rush.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 40 }}>
            {[
              { step: "01", title: "Arrive", desc: "Show up at VYRAND in Andorra. No kit needed — we have everything. Just bring your crew and your nerve.", icon: <MapPin size={22} /> },
              { step: "02", title: "Choose", desc: "Pick your experience or mix it up. Our team briefs you in 5 minutes. No prior experience, no skill required.", icon: <Zap size={22} /> },
              { step: "03", title: "Feel it", desc: "Strap in and go. Full immersion, full speed, full adrenaline. No risk, all rush.", icon: <Shield size={22} /> },
            ].map((item) => (
              <div key={item.step} style={{ textAlign: "center" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", color: "var(--accent)", backgroundColor: "rgba(249,115,22,0.05)" }}>
                  {item.icon}
                </div>
                <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.25em", color: "var(--accent)", textTransform: "uppercase", marginBottom: 12 }}>
                  {item.step}
                </div>
                <h3 style={{ fontSize: "1.375rem", fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.7, maxWidth: 300, margin: "0 auto" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING TEASER ─── */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "96px 24px" }}>
        <div style={{ borderRadius: 16, border: "1px solid var(--border)", background: "linear-gradient(135deg, rgba(17,17,24,1) 0%, rgba(26,14,8,0.3) 100%)", padding: "56px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40, flexWrap: "wrap" }}>
          <div>
            <span className="section-label">Pricing</span>
            <h2 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "var(--text)", marginBottom: 16, lineHeight: 1.1 }}>
              From{" "}
              <span style={{ background: "linear-gradient(90deg, #25a267, #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                70€
              </span>{" "}
              per person.
            </h2>
            <p style={{ fontSize: "1rem", color: "var(--muted)", lineHeight: 1.7, maxWidth: 440 }}>
              No experience needed. No hidden fees. Groups of 2–6 people. 25–30 minutes of pure adrenaline.
            </p>
          </div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Link href="/pricing" className="btn-secondary">View Pricing</Link>
            <Link href="/booking" className="btn-primary">Book Now →</Link>
          </div>
        </div>
      </section>

      {/* ─── SOCIAL PROOF ─── */}
      <section style={{ backgroundColor: "var(--surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "96px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="section-label">Reviews</span>
            <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.25rem)", fontWeight: 700, marginTop: 16, color: "var(--text)" }}>
              What they said.
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {[
              { text: "The Air simulator is unlike anything I've ever tried. I came in skeptical and left completely blown away. The speed, the visuals, the wind — it's impossible to explain how real it feels.", name: "Marc T.", origin: "Barcelona", exp: "Air" },
              { text: "Did Alpine with my partner who has skied for 20 years. She said it felt more intense than the real thing. We did it twice. Best 140€ we spent in Andorra — and we ski here every winter.", name: "Clara V.", origin: "London", exp: "Alpine" },
              { text: "Came as a group of 5 for a birthday. Did Gravity and Terrain. The competition between us was insane. Already planning to come back for Air. Absolutely worth it.", name: "Jordi M.", origin: "Andorra la Vella", exp: "Gravity + Terrain" },
            ].map((review) => (
              <div key={review.name} style={{ backgroundColor: "var(--bg)", border: "1px solid var(--border)", borderRadius: 12, padding: "28px 32px" }}>
                <div style={{ display: "flex", gap: 3, marginBottom: 16 }}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={13} style={{ fill: "#25a267", color: "#25a267" }} />
                  ))}
                </div>
                <p style={{ fontSize: "0.9rem", color: "var(--text)", lineHeight: 1.75, marginBottom: 20, fontStyle: "italic" }}>
                  &ldquo;{review.text}&rdquo;
                </p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid var(--border)", paddingTop: 96 }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "0.875rem", color: "var(--text)" }}>{review.name}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--muted)" }}>{review.origin}</div>
                  </div>
                  <span style={{ fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", border: "1px solid var(--border)", borderRadius: 4, padding: "3px 8px" }}>
                    {review.exp}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 48, justifyContent: "center", marginTop: 56, flexWrap: "wrap" }}>
            {[
              { icon: <Shield size={18} />, label: "Certified Safety Systems" },
              { icon: <Users size={18} />, label: "2,000+ Experiences Booked" },
              { icon: <MapPin size={18} />, label: "Based in Andorra" },
            ].map((badge) => (
              <div key={badge.label} style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--muted)", fontSize: "0.875rem" }}>
                <span style={{ color: "var(--accent)" }}>{badge.icon}</span>
                {badge.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LOCATION ─── */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "96px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <span className="section-label">Location</span>
            <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700, color: "var(--text)", marginTop: 16, marginBottom: 20, lineHeight: 1.2 }}>
              In the heart of{" "}
              <span style={{ background: "linear-gradient(90deg, #25a267, #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Andorra.
              </span>
            </h2>
            <p style={{ fontSize: "1rem", color: "var(--muted)", lineHeight: 1.7, marginBottom: 16 }}>
              Andorra is already one of Europe&apos;s premier adventure destinations.
              We sit right in the middle of it — accessible from both France and Spain.
            </p>
            <p style={{ fontSize: "1rem", color: "var(--muted)", lineHeight: 1.7, marginBottom: 32 }}>
              Open year-round. Ski season or summer visit — VYRAND fits your itinerary.
            </p>
            <Link href="/contact" className="btn-secondary">
              Get Directions <ArrowRight size={15} />
            </Link>
          </div>
          <div style={{ borderRadius: 16, height: 360, overflow: "hidden" }}>
            <img
              src="/images/about/local-1.png"
              alt="VYRAND Andorra location"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
            />
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section style={{ backgroundColor: "var(--surface)", borderTop: "1px solid var(--border)", padding: "120px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 600, height: 300, background: "radial-gradient(ellipse, rgba(249,115,22,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: 700, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.01em", color: "var(--text)", lineHeight: 1.05, marginBottom: 24 }}>
            Ready to feel<br />
            <span style={{ background: "linear-gradient(90deg, #25a267, #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              200 km/h?
            </span>
          </h2>
          <p style={{ fontSize: "1.125rem", color: "var(--muted)", lineHeight: 1.7, marginBottom: 40 }}>
            Book your group experience today. 2–6 people, 70€ per person, no experience needed.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/booking" className="btn-primary" style={{ fontSize: "1.05rem", padding: "14px 32px" }}>
              Book Now <ArrowRight size={18} />
            </Link>
            <Link href="/experiences" className="btn-secondary" style={{ fontSize: "1.05rem", padding: "14px 32px" }}>
              Explore Experiences
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
