import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Zap, MapPin, Users, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About VYRAND — Extreme Sport Simulators in Andorra",
  description:
    "The story behind VYRAND. Why Andorra, why simulators, and why we believe the rush doesn't need the risk.",
};

export default function AboutPage() {
  return (
    <div style={{ paddingTop: 96 }}>
      {/* Hero */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: 480,
          borderBottom: "1px solid var(--border)",
        }}
      >
        <img
          src="/images/about/local-1.png"
          alt="VYRAND facilities"
          style={{ position: "absolute", inset: 0, zIndex: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(10,10,15,0.95) 50%, rgba(10,10,15,0.5) 100%)", zIndex: 1 }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", padding: "96px 24px", display: "flex", flexDirection: "column", justifyContent: "center", minHeight: 480 }}>
          <div style={{ maxWidth: 560 }}>
            <span className="section-label">About</span>
            <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.01em", color: "var(--text)", marginTop: 16, lineHeight: 1.05 }}>
              Built for the rush.
              <br />
              <span style={{ background: "linear-gradient(90deg, #25a267, #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Not the risk.
              </span>
            </h1>
          </div>
        </div>
      </section>

      {/* Story */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
          <div>
            <span className="section-label">The Idea</span>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, color: "var(--text)", marginTop: 16, marginBottom: 24, lineHeight: 1.2 }}>
              The adrenaline of extreme sport.<br />The safety of solid ground.
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8 }}>
                VYRAND started with a simple observation: the best parts of extreme sport
                aren&apos;t the risk — they&apos;re the speed, the sensation, the total commitment
                of every muscle and nerve. The risk is just the tax you pay to access them.
              </p>
              <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8 }}>
                So we asked: what if you could skip the tax? What if the most intense
                moments of wingsuit flying, ski jumping, downhill MTB, and off-road racing
                were accessible to anyone — without years of training, without equipment costs,
                without risk of injury?
              </p>
              <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8 }}>
                That&apos;s VYRAND. Five world-class simulators, built from the ground up, designed
                to deliver the real sensation — the wind, the speed, the G-force — without
                the consequence. Leave the risk. Live the rush.
              </p>
            </div>
          </div>

          <div style={{ borderRadius: 16, height: 420, overflow: "hidden" }}>
            <img
              src="/images/about/local-2.png"
              alt="VYRAND interior"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
            />
          </div>
        </div>
      </section>

      {/* Why Andorra */}
      <section style={{ backgroundColor: "var(--surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div style={{ borderRadius: 16, height: 380, overflow: "hidden" }}>
              <img
                src="/images/about/local-1.png"
                alt="VYRAND Andorra"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
              />
            </div>
            <div>
              <span className="section-label">Why Andorra</span>
              <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, color: "var(--text)", marginTop: 16, marginBottom: 24, lineHeight: 1.2 }}>
                The adventure capital of the Pyrenees.
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8 }}>
                  Andorra already draws over 8 million visitors per year. They come for
                  the skiing, the hiking, the shopping — and increasingly, for experiences
                  that don&apos;t exist anywhere else.
                </p>
                <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8 }}>
                  We chose Andorra because it&apos;s the right country for what we&apos;re building:
                  a place where adventure tourism is in the culture, where the landscape
                  inspires extreme sport, and where both French and Spanish tourists are
                  already looking for something different to do.
                </p>
                <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8 }}>
                  VYRAND is the experience Andorra was missing — premium, accessible,
                  and unlike anything else in the region.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span className="section-label">What We Stand For</span>
          <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.25rem)", fontWeight: 700, color: "var(--text)", marginTop: 16 }}>
            The principles behind VYRAND.
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 32 }}>
          {[
            { icon: <Zap size={22} />, title: "Intensity first", desc: "Every simulator is designed to push the experience to its maximum — not a gentle approximation, but the closest thing to the real sensation." },
            { icon: <Shield size={22} />, title: "Zero compromise on safety", desc: "Certified equipment, trained staff, rigorous protocols. The whole point is you walk away wanting to come back." },
            { icon: <Users size={22} />, title: "Built for groups", desc: "The best experiences are shared ones. Every simulator is designed for 2–6 people, competing or encouraging each other." },
            { icon: <MapPin size={22} />, title: "Rooted in Andorra", desc: "Alpine reflects the mountains outside. The location matters. We're not a franchise — we're built here, for here." },
          ].map((v) => (
            <div key={v.title} style={{ borderRadius: 12, border: "1px solid var(--border)", backgroundColor: "var(--surface)", padding: "28px 28px 32px" }}>
              <div style={{ width: 48, height: 48, borderRadius: 10, backgroundColor: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)", marginBottom: 20 }}>
                {v.icon}
              </div>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text)", marginBottom: 10 }}>
                {v.title}
              </h3>
              <p style={{ fontSize: "0.875rem", color: "var(--muted)", lineHeight: 1.7 }}>
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Safety certifications */}
      <section style={{ backgroundColor: "var(--surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <span className="section-label">Safety</span>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center", marginTop: 24 }}>
            <div>
              <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, color: "var(--text)", marginBottom: 20, lineHeight: 1.2 }}>
                Safety isn&apos;t a feature.<br />It&apos;s the foundation.
              </h2>
              <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: 16 }}>
                All VYRAND simulators are certified to EU safety standards. Our staff
                are trained in simulator operation, emergency protocols, and participant
                wellbeing. Every session begins with a safety briefing.
              </p>
              <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: 24 }}>
                We have age minimums (12–14 years depending on simulator), height requirements,
                and health guidelines — not because we want to exclude anyone, but because
                we take the responsibility of creating thrills seriously.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {["EU Safety Certified Equipment", "Trained & Certified Operators", "Emergency Protocol Trained Staff", "Regular Equipment Inspection"].map((cert) => (
                  <div key={cert} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Shield size={14} style={{ color: "var(--accent)" }} />
                    <span style={{ fontSize: "0.875rem", color: "var(--muted)" }}>{cert}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ borderRadius: 16, height: 340, overflow: "hidden" }}>
              <img
                src="/images/about/local-2.png"
                alt="VYRAND safety and equipment"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800, color: "var(--text)", marginBottom: 16 }}>
          Come and feel it yourself.
        </h2>
        <p style={{ fontSize: "1rem", color: "var(--muted)", marginBottom: 32, lineHeight: 1.7, maxWidth: 480, margin: "0 auto 32px" }}>
          Reading about it is one thing. The simulator is something else entirely.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/booking" className="btn-primary" style={{ fontSize: "1.05rem", padding: "14px 32px" }}>
            Book Now <ArrowRight size={17} />
          </Link>
          <Link href="/experiences" className="btn-secondary" style={{ fontSize: "1.05rem", padding: "14px 32px" }}>
            See All Experiences
          </Link>
        </div>
      </section>
    </div>
  );
}
