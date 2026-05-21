"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { experiences } from "@/lib/experiences";
import { createClient } from "@/lib/supabase/client";
import { ArrowRight, ArrowLeft, Check, User, LogIn } from "lucide-react";

type Step = 1 | 2 | 3 | 4;

export default function BookingPage() {
  const router = useRouter();
  const supabase = createClient();

  const [step, setStep] = useState<Step>(1);
  const [selectedExp, setSelectedExp] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [groupSize, setGroupSize] = useState<number>(2);
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [loggedInAs, setLoggedInAs] = useState<string | null>(null);
  const [autoFilled, setAutoFilled] = useState(false);
  // Prevent the step-3 pre-fill from overriding data the user explicitly entered
  const [skipPrefill, setSkipPrefill] = useState(false);

  const DRAFT_KEY = "vyrand_booking_draft";
  const DRAFT_TTL = 30 * 60 * 1000; // 30 minutes

  // Read ?exp= from URL on the client, avoiding useSearchParams Suspense issues.
  // Also restore any booking draft saved before a login redirect.
  useEffect(() => {
    const init = async () => {
      // Check for a saved draft (localStorage survives auth redirects)
      try {
        const raw = localStorage.getItem(DRAFT_KEY);
        if (raw) {
          const draft = JSON.parse(raw) as {
            selectedExp: string;
            selectedDate: string;
            selectedTime: string;
            groupSize: number;
            contact: typeof contact;
            returnStep: Step;
            savedAt: number;
          };
          // Discard if older than 30 min
          if (draft.savedAt && Date.now() - draft.savedAt < DRAFT_TTL) {
            // Only jump to Review (step 4) if the user actually authenticated.
            // If they pressed Back from login/register without completing auth,
            // send them back to Step 3 so they can sign in / create account.
            const { data: { user } } = await supabase.auth.getUser();
            const targetStep: Step = user ? (draft.returnStep ?? 4) : 3;

            if (targetStep === 4) {
              // Auth succeeded — consume the draft
              localStorage.removeItem(DRAFT_KEY);
              setSkipPrefill(true);
            }
            // If not authed, leave the draft in localStorage so it's still
            // available when they complete sign-in / registration.

            setSelectedExp(draft.selectedExp ?? "");
            setSelectedDate(draft.selectedDate ?? "");
            setSelectedTime(draft.selectedTime ?? "");
            setGroupSize(draft.groupSize ?? 2);
            setContact(draft.contact ?? { name: "", email: "", phone: "", notes: "" });
            setStep(targetStep);
            return;
          }
          localStorage.removeItem(DRAFT_KEY);
        }
      } catch { /* ignore */ }

      const params = new URLSearchParams(window.location.search);
      const exp = params.get("exp");
      if (exp) {
        setSelectedExp(exp);
        setStep(2);
      }
    };

    init();
  }, []);

  // Save full booking state to localStorage and navigate to auth pages
  const saveDraft = () => {
    try {
      localStorage.setItem(
        DRAFT_KEY,
        JSON.stringify({
          selectedExp,
          selectedDate,
          selectedTime,
          groupSize,
          contact,
          returnStep: 4 as Step,
          savedAt: Date.now(),
        })
      );
    } catch { /* ignore */ }
  };

  const bookingRedirect = encodeURIComponent("/booking" + (selectedExp ? `?exp=${selectedExp}` : ""));

  const saveAndLogin = () => {
    saveDraft();
    router.push(`/login?redirect=${bookingRedirect}`);
  };

  const saveAndRegister = () => {
    saveDraft();
    router.push(`/register?redirect=${bookingRedirect}`);
  };

  // When reaching Step 3, pre-fill contact details (skipped if restored from a draft)
  useEffect(() => {
    if (step !== 3 || skipPrefill) return;

    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (user) {
        // Prefer profiles table; fall back to user metadata
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name, phone")
          .eq("id", user.id)
          .single();

        const meta = user.user_metadata ?? {};
        const savedName = profile?.full_name ?? meta.full_name ?? meta.name ?? "";
        const savedPhone = profile?.phone ?? meta.phone ?? "";
        const savedEmail = user.email ?? "";
        setContact((prev) => ({
          ...prev,
          name: prev.name || savedName,
          email: prev.email || savedEmail,
          phone: prev.phone || savedPhone,
        }));
        setLoggedInAs(savedEmail);
        if (savedName || savedPhone) setAutoFilled(true);
      } else {
        // Fallback: saved contact for returning guests on the same device
        try {
          const raw = localStorage.getItem("vyrand_contact");
          if (raw) {
            const saved = JSON.parse(raw) as { name?: string; email?: string; phone?: string };
            setContact((prev) => ({
              ...prev,
              name: prev.name || saved.name || "",
              email: prev.email || saved.email || "",
              phone: prev.phone || saved.phone || "",
            }));
            if (saved.name || saved.email) setAutoFilled(true);
          }
        } catch { /* ignore */ }
      }
    });
  }, [step, skipPrefill]);

  const currentExp = experiences.find((e) => e.id === selectedExp);
  const totalPrice = currentExp ? currentExp.pricePerPerson * groupSize : 0;

  const steps = [
    { n: 1, label: "Experience" },
    { n: 2, label: "Date & Time" },
    { n: 3, label: "Your Details" },
    { n: 4, label: "Review" },
  ];

  const availableTimes = [
    "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00",
  ];

  const canProceed = () => {
    if (step === 1) return selectedExp !== "";
    if (step === 2) return selectedDate !== "" && selectedTime !== "";
    if (step === 3) return loggedInAs !== null;
    return true;
  };

  return (
    <div style={{ paddingTop: 96, minHeight: "100vh" }}>
      {/* Header */}
      <section
        style={{
          borderBottom: "1px solid var(--border)",
          backgroundColor: "var(--surface)",
          padding: "48px 24px",
        }}
      >
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <span className="section-label">Booking</span>
          <h1
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "-0.01em",
              color: "var(--text)",
              marginTop: 16,
            }}
          >
            Book your experience.
          </h1>
        </div>
      </section>

      {/* Progress bar */}
      <div
        style={{
          backgroundColor: "var(--surface)",
          borderBottom: "1px solid var(--border)",
          padding: "20px 24px",
          position: "sticky",
          top: 64,
          zIndex: 50,
        }}
      >
        <div
          style={{
            maxWidth: 760,
            margin: "0 auto",
            display: "flex",
            gap: 0,
          }}
        >
          {steps.map((s, i) => (
            <div
              key={s.n}
              style={{
                display: "flex",
                alignItems: "center",
                flex: 1,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    backgroundColor:
                      step > s.n
                        ? "var(--accent)"
                        : step === s.n
                        ? "var(--accent)"
                        : "var(--border)",
                    border:
                      step === s.n
                        ? "2px solid var(--accent)"
                        : "2px solid transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s",
                  }}
                >
                  {step > s.n ? (
                    <Check size={14} color="#fff" />
                  ) : (
                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        color: step >= s.n ? "#fff" : "var(--muted)",
                      }}
                    >
                      {s.n}
                    </span>
                  )}
                </div>
                <span
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: step === s.n ? 600 : 400,
                    color: step >= s.n ? "var(--text)" : "var(--muted)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  style={{
                    flex: 1,
                    height: 1,
                    backgroundColor:
                      step > s.n ? "var(--accent)" : "var(--border)",
                    marginBottom: 20,
                    transition: "background-color 0.3s",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          maxWidth: 760,
          margin: "0 auto",
          padding: "48px 24px 96px",
        }}
      >
        {/* STEP 1 — Select Experience */}
        {step === 1 && (
          <div>
            <h2 style={{ fontSize: "1.375rem", fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>
              Choose your experience
            </h2>
            <p style={{ fontSize: "0.875rem", color: "var(--muted)", marginBottom: 32 }}>
              Select one experience for this booking. You can always book more separately.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {experiences.map((exp) => (
                <button
                  key={exp.id}
                  onClick={() => setSelectedExp(exp.id)}
                  style={{
                    background: "none",
                    border: `2px solid ${selectedExp === exp.id ? (exp.isFlagship ? "#25a267" : "var(--accent)") : "var(--border)"}`,
                    borderRadius: 12,
                    padding: "20px 24px",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "border-color 0.2s, background 0.2s",
                    backgroundColor:
                      selectedExp === exp.id
                        ? exp.isFlagship
                          ? "rgba(37,162,103,0.06)"
                          : "rgba(249,115,22,0.05)"
                        : "var(--surface)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                  }}
                >
                  <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 8,
                        backgroundColor: "var(--tag-bg)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.7rem",
                        color: "var(--muted)",
                        letterSpacing: "0.05em",
                        flexShrink: 0,
                      }}
                    >
                      IMG
                    </div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: "1rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--text)" }}>
                          {exp.name}
                        </span>
                        {exp.isFlagship && (
                          <span style={{ fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#25a267", border: "1px solid #25a267", borderRadius: 4, padding: "1px 5px" }}>
                            Flagship
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>
                        {exp.sport} · {exp.duration} · {exp.groupSize}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "1.1rem", fontWeight: 800, color: selectedExp === exp.id ? "var(--accent)" : "var(--text)" }}>
                        {exp.pricePerPerson}€
                      </div>
                      <div style={{ fontSize: "0.7rem", color: "var(--muted)" }}>/ person</div>
                    </div>
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        border: `2px solid ${selectedExp === exp.id ? "var(--accent)" : "var(--border)"}`,
                        backgroundColor: selectedExp === exp.id ? "var(--accent)" : "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.2s",
                        flexShrink: 0,
                      }}
                    >
                      {selectedExp === exp.id && <Check size={11} color="#fff" />}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2 — Date & Time */}
        {step === 2 && currentExp && (
          <div>
            <h2 style={{ fontSize: "1.375rem", fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>
              Pick your date & time
            </h2>
            <p style={{ fontSize: "0.875rem", color: "var(--muted)", marginBottom: 32 }}>
              Booking for{" "}
              <strong style={{ color: "var(--text)" }}>{currentExp.name}</strong> —{" "}
              {currentExp.sport}
            </p>

            {/* Date picker */}
            <div style={{ marginBottom: 32 }}>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 12 }}>
                Select Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                style={{
                  width: "100%",
                  maxWidth: 300,
                  padding: "12px 16px",
                  backgroundColor: "var(--surface)",
                  border: `1px solid ${selectedDate ? "var(--accent)" : "var(--border)"}`,
                  borderRadius: 8,
                  color: "var(--text)",
                  fontSize: "0.95rem",
                  outline: "none",
                  cursor: "pointer",
                }}
              />
            </div>

            {/* Time slots */}
            <div style={{ marginBottom: 32 }}>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 12 }}>
                Select Time
              </label>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {availableTimes.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    style={{
                      padding: "10px 20px",
                      borderRadius: 8,
                      border: `1px solid ${selectedTime === time ? "var(--accent)" : "var(--border)"}`,
                      backgroundColor: selectedTime === time ? "rgba(249,115,22,0.1)" : "var(--surface)",
                      color: selectedTime === time ? "var(--accent)" : "var(--text)",
                      fontSize: "0.9rem",
                      fontWeight: selectedTime === time ? 700 : 400,
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Group size */}
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 12 }}>
                Group Size (2–6 people)
              </label>
              <div style={{ display: "flex", gap: 10 }}>
                {[2, 3, 4, 5, 6].map((n) => (
                  <button
                    key={n}
                    onClick={() => setGroupSize(n)}
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 8,
                      border: `1px solid ${groupSize === n ? "var(--accent)" : "var(--border)"}`,
                      backgroundColor: groupSize === n ? "rgba(249,115,22,0.1)" : "var(--surface)",
                      color: groupSize === n ? "var(--accent)" : "var(--text)",
                      fontSize: "1rem",
                      fontWeight: groupSize === n ? 700 : 400,
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <p style={{ fontSize: "0.8rem", color: "var(--muted)", marginTop: 10 }}>
                Total: <strong style={{ color: "var(--text)" }}>{totalPrice}€</strong>{" "}
                ({groupSize} × {currentExp.pricePerPerson}€)
              </p>
            </div>
          </div>
        )}

        {/* STEP 3 — Auth */}
        {step === 3 && (
          loggedInAs ? (
            /* Logged in — show pre-filled contact details */
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "12px 16px",
                  backgroundColor: "rgba(37,162,103,0.08)",
                  border: "1px solid rgba(37,162,103,0.3)",
                  borderRadius: 8,
                  marginBottom: 28,
                }}
              >
                <User size={15} color="#25a267" />
                <span style={{ fontSize: "0.82rem", color: "#25a267", fontWeight: 500 }}>
                  Signed in as <strong>{loggedInAs}</strong>
                  {autoFilled && " · Details pre-filled"}
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {[
                  { key: "name", label: "Full Name", type: "text", placeholder: "Marc Torres" },
                  { key: "phone", label: "Phone Number", type: "tel", placeholder: "+34 600 000 000" },
                ].map((field) => (
                  <div key={field.key}>
                    <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 10 }}>
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={contact[field.key as keyof typeof contact]}
                      onChange={(e) => setContact((prev) => ({ ...prev, [field.key]: e.target.value }))}
                      style={{
                        width: "100%",
                        padding: "13px 16px",
                        backgroundColor: "var(--surface)",
                        border: `1px solid ${contact[field.key as keyof typeof contact] ? "var(--accent)" : "var(--border)"}`,
                        borderRadius: 8,
                        color: "var(--text)",
                        fontSize: "0.95rem",
                        outline: "none",
                        transition: "border-color 0.2s",
                        boxSizing: "border-box",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                      onBlur={(e) => { if (!contact[field.key as keyof typeof contact]) e.currentTarget.style.borderColor = "var(--border)"; }}
                    />
                  </div>
                ))}

                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 10 }}>
                    Notes (optional)
                  </label>
                  <textarea
                    placeholder="Accessibility requirements, special requests..."
                    value={contact.notes}
                    onChange={(e) => setContact((prev) => ({ ...prev, notes: e.target.value }))}
                    rows={3}
                    style={{
                      width: "100%",
                      padding: "13px 16px",
                      backgroundColor: "var(--surface)",
                      border: "1px solid var(--border)",
                      borderRadius: 8,
                      color: "var(--text)",
                      fontSize: "0.95rem",
                      outline: "none",
                      resize: "vertical",
                      fontFamily: "inherit",
                      transition: "border-color 0.2s",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                  />
                </div>
              </div>
            </div>
          ) : (
            /* Not logged in — auth only, nothing else */
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "64px 24px",
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 24,
                }}
              >
                <User size={24} color="var(--muted)" />
              </div>

              <h2 style={{ fontSize: "1.375rem", fontWeight: 800, color: "var(--text)", textTransform: "uppercase", letterSpacing: "-0.01em", marginBottom: 10 }}>
                Your details
              </h2>
              <p style={{ fontSize: "0.9rem", color: "var(--muted)", maxWidth: 320, lineHeight: 1.6, marginBottom: 36 }}>
                Sign in or create a free account. Your name, email and phone will be saved — no need to fill them in next time.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", maxWidth: 320 }}>
                <button
                  onClick={saveAndRegister}
                  className="btn-primary"
                  style={{ justifyContent: "center", fontSize: "0.95rem", padding: "13px 24px" }}
                >
                  Create account →
                </button>
                <button
                  onClick={saveAndLogin}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    color: "var(--text)",
                    background: "none",
                    border: "1px solid var(--border)",
                    borderRadius: 6,
                    cursor: "pointer",
                    padding: "12px 24px",
                    transition: "border-color 0.15s",
                    width: "100%",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                >
                  <LogIn size={15} /> Sign in
                </button>
              </div>
            </div>
          )
        )}

        {/* STEP 4 — Review */}
        {step === 4 && currentExp && (
          <div>
            <h2 style={{ fontSize: "1.375rem", fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>
              Review your booking
            </h2>
            <p style={{ fontSize: "0.875rem", color: "var(--muted)", marginBottom: 32 }}>
              Check everything looks right before proceeding to payment.
            </p>

            <div
              style={{
                border: "1px solid var(--border)",
                borderRadius: 12,
                overflow: "hidden",
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  backgroundColor: currentExp.isFlagship
                    ? "rgba(37,162,103,0.06)"
                    : "var(--surface)",
                  borderBottom: "1px solid var(--border)",
                  padding: "20px 24px",
                }}
              >
                <div style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 4 }}>
                  Experience
                </div>
                <div style={{ fontSize: "1.25rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--text)" }}>
                  {currentExp.name} — {currentExp.sport}
                </div>
              </div>

              {[
                { label: "Date", value: selectedDate },
                { label: "Time", value: selectedTime },
                { label: "Group Size", value: `${groupSize} people` },
                { label: "Name", value: contact.name },
                { label: "Email", value: contact.email },
                { label: "Phone", value: contact.phone },
              ].map((row) => (
                <div
                  key={row.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "14px 24px",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <span style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
                    {row.label}
                  </span>
                  <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--text)" }}>
                    {row.value}
                  </span>
                </div>
              ))}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "20px 24px",
                  backgroundColor: "var(--surface)",
                }}
              >
                <span style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text)" }}>
                  Total
                </span>
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
                  {totalPrice}€
                </span>
              </div>
            </div>

            <p style={{ fontSize: "0.8rem", color: "var(--muted)", lineHeight: 1.6, marginBottom: 8 }}>
              By proceeding, you agree to our{" "}
              <Link href="/terms" style={{ color: "var(--accent)", textDecoration: "none" }}>
                Terms & Conditions
              </Link>
              . Full refund available up to 48h before your session.
            </p>
          </div>
        )}

        {/* Navigation */}
        <div
          style={{
            marginTop: 40,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {step > 1 ? (
            <button
              onClick={() => setStep((prev) => (prev - 1) as Step)}
              className="btn-secondary"
            >
              <ArrowLeft size={15} /> Back
            </button>
          ) : (
            <Link href="/experiences" className="btn-secondary">
              <ArrowLeft size={15} /> Experiences
            </Link>
          )}

          {step < 4 && !(step === 3 && !loggedInAs) ? (
            <button
              onClick={() => canProceed() && setStep((prev) => (prev + 1) as Step)}
              className="btn-primary"
              style={{ opacity: canProceed() ? 1 : 0.4, cursor: canProceed() ? "pointer" : "not-allowed" }}
            >
              Continue <ArrowRight size={15} />
            </button>
          ) : (
            <button
              onClick={async () => {
                if (!currentExp) return;
                setSubmitting(true);
                setSubmitError("");

                const { data: { user } } = await supabase.auth.getUser();
                if (!user) {
                  saveAndLogin();
                  return;
                }

                const { error } = await supabase.from("bookings").insert({
                  user_id: user.id,
                  experience_id: selectedExp,
                  booking_date: selectedDate,
                  booking_time: selectedTime,
                  group_size: groupSize,
                  total_price: totalPrice,
                  contact_name: contact.name,
                  contact_email: contact.email,
                  contact_phone: contact.phone,
                  notes: contact.notes || null,
                });

                if (error) {
                  setSubmitError("Something went wrong. Please try again.");
                  setSubmitting(false);
                } else {
                  // Persist name + phone to profiles table and user metadata
                  await Promise.all([
                    supabase.from("profiles").upsert({
                      id: user.id,
                      full_name: contact.name,
                      phone: contact.phone,
                      updated_at: new Date().toISOString(),
                    }),
                    supabase.auth.updateUser({
                      data: { full_name: contact.name, phone: contact.phone },
                    }),
                  ]);
                  try {
                    localStorage.setItem(
                      "vyrand_contact",
                      JSON.stringify({ name: contact.name, email: contact.email, phone: contact.phone })
                    );
                  } catch { /* ignore */ }
                  router.push("/booking/confirmed");
                }
              }}
              className="btn-primary"
              disabled={submitting}
              style={{ fontSize: "1rem", padding: "13px 28px", opacity: submitting ? 0.6 : 1, cursor: submitting ? "not-allowed" : "pointer" }}
            >
              {submitting ? "Confirming..." : <>Confirm Booking <ArrowRight size={17} /></>}
            </button>
          )}
          {submitError && (
            <p style={{ fontSize: "0.85rem", color: "#f87171", marginTop: 8, textAlign: "right" }}>
              {submitError}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

