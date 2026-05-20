"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ArrowRight, Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/account";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
    }
  }

  if (success) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            maxWidth: 420,
            backgroundColor: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 16,
            padding: "48px 36px",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              backgroundColor: "rgba(37,162,103,0.1)",
              border: "1px solid #25a267",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
              fontSize: "1.5rem",
            }}
          >
            ✓
          </div>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>
            Check your email.
          </h2>
          <p style={{ fontSize: "0.875rem", color: "var(--muted)", lineHeight: 1.6 }}>
            We sent a confirmation link to <strong style={{ color: "var(--text)" }}>{email}</strong>.
            Click the link to activate your account, then sign in.
          </p>
          <Link href="/login" className="btn-primary" style={{ marginTop: 28, justifyContent: "center" }}>
            Go to sign in <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        backgroundColor: "var(--bg)",
      }}
    >
      <div style={{ width: "100%", maxWidth: 420 }}>
        <Link
          href="/"
          style={{
            display: "block",
            textAlign: "center",
            fontSize: "1.5rem",
            fontWeight: 800,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            background: "linear-gradient(90deg, #25a267, #f97316)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textDecoration: "none",
            marginBottom: 40,
          }}
        >
          VYRAND
        </Link>

        <div
          style={{
            backgroundColor: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 16,
            padding: "40px 36px",
          }}
        >
          <span className="section-label" style={{ marginBottom: 12, display: "block" }}>
            Account
          </span>
          <h1
            style={{
              fontSize: "1.625rem",
              fontWeight: 800,
              color: "var(--text)",
              textTransform: "uppercase",
              letterSpacing: "-0.01em",
              marginBottom: 32,
            }}
          >
            Create account.
          </h1>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {[
              { key: "name", label: "Full Name", type: "text", placeholder: "Marc Torres", value: name, set: setName },
              { key: "email", label: "Email", type: "email", placeholder: "you@email.com", value: email, set: setEmail },
            ].map((field) => (
              <div key={field.key}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    marginBottom: 8,
                  }}
                >
                  {field.label}
                </label>
                <input
                  type={field.type}
                  required
                  value={field.value}
                  onChange={(e) => field.set(e.target.value)}
                  placeholder={field.placeholder}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    backgroundColor: "var(--bg)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    color: "var(--text)",
                    fontSize: "0.95rem",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                />
              </div>
            ))}

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  marginBottom: 8,
                }}
              >
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                  style={{
                    width: "100%",
                    padding: "12px 44px 12px 14px",
                    backgroundColor: "var(--bg)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    color: "var(--text)",
                    fontSize: "0.95rem",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--muted)",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div
                style={{
                  padding: "10px 14px",
                  backgroundColor: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.3)",
                  borderRadius: 8,
                  fontSize: "0.85rem",
                  color: "#f87171",
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{
                width: "100%",
                justifyContent: "center",
                marginTop: 8,
                opacity: loading ? 0.6 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Creating account..." : <>Create account <ArrowRight size={15} /></>}
            </button>
          </form>

          <p
            style={{
              textAlign: "center",
              fontSize: "0.85rem",
              color: "var(--muted)",
              marginTop: 24,
            }}
          >
            Already have an account?{" "}
            <Link href={`/login?redirect=${redirect}`} style={{ color: "var(--accent)", textDecoration: "none" }}>
              Sign in →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
