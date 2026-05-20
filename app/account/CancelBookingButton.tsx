"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function CancelBookingButton({ bookingId }: { bookingId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function cancel() {
    if (!confirm("Cancel this booking? Full refunds are available up to 48h before your session.")) return;
    setLoading(true);
    await supabase.from("bookings").update({ status: "cancelled" }).eq("id", bookingId);
    router.refresh();
  }

  return (
    <button
      onClick={cancel}
      disabled={loading}
      style={{
        background: "none",
        border: "1px solid var(--border)",
        borderRadius: 6,
        padding: "8px 16px",
        color: "var(--muted)",
        fontSize: "0.8rem",
        cursor: loading ? "not-allowed" : "pointer",
        opacity: loading ? 0.5 : 1,
        transition: "color 0.2s, border-color 0.2s",
      }}
    >
      {loading ? "Cancelling..." : "Cancel booking"}
    </button>
  );
}
