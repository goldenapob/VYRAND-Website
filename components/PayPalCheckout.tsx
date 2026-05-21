"use client";

import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  amount: string;
  experienceName: string;
  groupSize: number;
}

function PayPalButtonsWrapper({ amount, experienceName, groupSize }: Props) {
  const router = useRouter();
  const [{ isPending }] = usePayPalScriptReducer();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (isPending) {
    return (
      <div style={{ padding: "20px 0", textAlign: "center", color: "var(--muted)", fontSize: "0.85rem" }}>
        Loading PayPal…
      </div>
    );
  }

  if (success) {
    return (
      <div style={{ padding: "20px 0", textAlign: "center", color: "var(--accent2)", fontSize: "0.9rem", fontWeight: 600 }}>
        Payment approved — redirecting…
      </div>
    );
  }

  return (
    <>
      {error && (
        <div
          style={{
            marginBottom: 16,
            padding: "12px 16px",
            backgroundColor: "rgba(230,57,70,0.08)",
            border: "1px solid rgba(230,57,70,0.25)",
            borderRadius: 8,
            color: "#e63946",
            fontSize: "0.82rem",
          }}
        >
          {error}
        </div>
      )}
      <PayPalButtons
        style={{ layout: "vertical", color: "gold", shape: "rect", label: "pay" }}
        createOrder={(_data, actions) =>
          actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                amount: { currency_code: "EUR", value: amount },
                description: `VYRAND — ${experienceName} × ${groupSize} people`,
              },
            ],
          })
        }
        onApprove={async (_data, actions) => {
          if (actions.order) {
            await actions.order.capture();
          }
          setSuccess(true);
          router.push("/booking/confirmed");
        }}
        onError={() => {
          setError("Payment failed. Please try again or use a different account.");
        }}
        onCancel={() => {
          setError("Payment cancelled.");
        }}
      />
    </>
  );
}

export default function PayPalCheckout(props: Props) {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  if (!clientId || clientId === "REPLACE_WITH_YOUR_SANDBOX_CLIENT_ID") {
    return (
      <div
        style={{
          padding: "20px 16px",
          backgroundColor: "rgba(249,115,22,0.06)",
          border: "1px solid rgba(249,115,22,0.2)",
          borderRadius: 8,
          fontSize: "0.82rem",
          color: "var(--muted)",
          lineHeight: 1.6,
        }}
      >
        <strong style={{ color: "var(--text)" }}>PayPal not configured.</strong>
        <br />
        Add your Sandbox Client ID to <code style={{ color: "var(--accent)" }}>.env.local</code> →{" "}
        <code style={{ color: "var(--accent)" }}>NEXT_PUBLIC_PAYPAL_CLIENT_ID</code>
      </div>
    );
  }

  return (
    <PayPalScriptProvider
      options={{
        clientId,
        currency: "EUR",
        intent: "capture",
      }}
    >
      <PayPalButtonsWrapper {...props} />
    </PayPalScriptProvider>
  );
}
