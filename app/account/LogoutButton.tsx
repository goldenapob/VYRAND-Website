"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  async function logout() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <button
      onClick={logout}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        background: "none",
        border: "1px solid var(--border)",
        borderRadius: 6,
        padding: "8px 14px",
        color: "var(--muted)",
        fontSize: "0.8rem",
        cursor: "pointer",
        transition: "color 0.2s, border-color 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "#f87171";
        e.currentTarget.style.borderColor = "#f87171";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "var(--muted)";
        e.currentTarget.style.borderColor = "var(--border)";
      }}
    >
      <LogOut size={13} /> Sign out
    </button>
  );
}
