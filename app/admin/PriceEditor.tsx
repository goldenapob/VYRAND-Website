"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Check, Pencil } from "lucide-react";

type Props = {
  experienceId: string;
  experienceName: string;
  sport: string;
  currentPrice: number;
  isFlagship: boolean;
};

export default function PriceEditor({ experienceId, experienceName, sport, currentPrice, isFlagship }: Props) {
  const [editing, setEditing] = useState(false);
  const [price, setPrice] = useState(String(currentPrice));
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const supabase = createClient();

  async function save() {
    const num = parseFloat(price);
    if (isNaN(num) || num <= 0) {
      setError("Enter a valid price.");
      return;
    }
    setSaving(true);
    setError("");

    const { error: dbError } = await supabase
      .from("experience_prices")
      .update({ price_per_person: num, updated_at: new Date().toISOString() })
      .eq("id", experienceId);

    if (dbError) {
      setError(dbError.message);
      setSaving(false);
    } else {
      setSaved(true);
      setEditing(false);
      setSaving(false);
      setTimeout(() => setSaved(false), 2500);
    }
  }

  return (
    <div
      style={{
        border: `1px solid ${isFlagship ? "#25a267" : "var(--border)"}`,
        borderRadius: 10,
        padding: "18px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        backgroundColor: "var(--surface)",
        flexWrap: "wrap",
      }}
    >
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: "0.95rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--text)" }}>
            {experienceName}
          </span>
          {isFlagship && (
            <span style={{ fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#25a267", border: "1px solid #25a267", borderRadius: 4, padding: "1px 5px" }}>
              Flagship
            </span>
          )}
        </div>
        <div style={{ fontSize: "0.8rem", color: "var(--muted)", marginTop: 2 }}>{sport}</div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {editing ? (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input
                type="number"
                min="1"
                step="1"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                style={{
                  width: 90,
                  padding: "8px 12px",
                  backgroundColor: "var(--bg)",
                  border: "1px solid var(--accent)",
                  borderRadius: 6,
                  color: "var(--text)",
                  fontSize: "1rem",
                  fontWeight: 700,
                  outline: "none",
                  textAlign: "right",
                }}
                onKeyDown={(e) => e.key === "Enter" && save()}
                autoFocus
              />
              <span style={{ color: "var(--muted)", fontSize: "0.85rem" }}>€ / person</span>
            </div>
            <button
              onClick={save}
              disabled={saving}
              style={{
                padding: "8px 18px",
                backgroundColor: "var(--accent)",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                fontWeight: 700,
                fontSize: "0.85rem",
                cursor: saving ? "not-allowed" : "pointer",
                opacity: saving ? 0.6 : 1,
              }}
            >
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => { setEditing(false); setPrice(String(currentPrice)); setError(""); }}
              style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", fontSize: "0.85rem" }}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <span
              style={{
                fontSize: "1.375rem",
                fontWeight: 800,
                color: saved ? "#25a267" : "var(--text)",
                transition: "color 0.3s",
                minWidth: 70,
                textAlign: "right",
              }}
            >
              {price}€
            </span>
            {saved && <Check size={16} color="#25a267" />}
            <button
              onClick={() => setEditing(true)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 14px",
                backgroundColor: "var(--tag-bg)",
                border: "1px solid var(--border)",
                borderRadius: 6,
                color: "var(--muted)",
                fontSize: "0.8rem",
                cursor: "pointer",
                transition: "color 0.2s",
              }}
            >
              <Pencil size={13} /> Edit
            </button>
          </>
        )}
        {error && (
          <span style={{ fontSize: "0.8rem", color: "#f87171" }}>{error}</span>
        )}
      </div>
    </div>
  );
}
