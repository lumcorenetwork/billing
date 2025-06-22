import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import { useSession } from "next-auth/react";

// Extend types for custom session and user properties
type CustomUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  isAdmin?: boolean;
};

type CustomSession = {
  user?: CustomUser;
  accessToken?: string;
};

export default function Billing() {
  const { data: session, status: authStatus } = useSession<CustomSession>();
  const user = session?.user;
  const [amount, setAmount] = useState<number>(10);
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (authStatus !== "authenticated" || !session?.accessToken) return;
    // Optionally fetch payment settings here if you want to use them
    // (stripeKey and paypalClientId are not used in this component)
  }, [authStatus, session]);

  const handlePayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    try {
      if (!session?.accessToken || !user?.id) throw new Error("Session or user not available");
      const res = await fetch("/api/billing/stripe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({ amount }),
      });
      if (!res.ok) throw new Error("Stripe payment failed");
      const provision = await fetch("/api/pterodactyl/provision", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({ userId: user.id, amount }),
      });
      if (!provision.ok) throw new Error("Server provisioning failed");
      setStatus("Payment successful! Your server is being provisioned.");
    } catch (err: any) {
      setStatus(err?.message || "Payment or provisioning failed.");
    }
    setLoading(false);
  };

  const handlePaypal = async () => {
    setLoading(true);
    setStatus("");
    try {
      if (!session?.accessToken || !user?.id) throw new Error("Session or user not available");
      const res = await fetch("/api/billing/paypal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({ amount }),
      });
      if (!res.ok) throw new Error("PayPal payment failed");
      const provision = await fetch("/api/pterodactyl/provision", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({ userId: user.id, amount }),
      });
      if (!provision.ok) throw new Error("Server provisioning failed");
      setStatus("PayPal payment successful! Your server is being provisioned.");
    } catch (err: any) {
      setStatus(err?.message || "Payment or provisioning failed.");
    }
    setLoading(false);
  };

  if (authStatus === "loading") {
    return <Layout><div>Loading...</div></Layout>;
  }
  if (!user) {
    return <Layout><div>You must be logged in to access billing.</div></Layout>;
  }

  return (
    <Layout>
      <h1 style={{ fontWeight: 700, fontSize: 28, marginBottom: 24 }}>Billing & Server Purchase</h1>
      {user.isAdmin && (
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontWeight: 600, fontSize: 20 }}>Payment Integration Settings</h2>
          <div>
            <Link href="/settings">
              <button style={{ background: "#06b6d4", color: "#fff", border: "none", borderRadius: 8, padding: "0.5rem 1rem", fontWeight: 600 }}>
                Edit Payment Settings in Settings Page
              </button>
            </Link>
          </div>
        </div>
      )}
      <form onSubmit={handlePayment} style={{ maxWidth: 400, margin: "0 auto" }}>
        <label style={{ display: "block", marginBottom: 8 }}>Amount ($)</label>
        <input
          type="number"
          min={5}
          value={amount}
          onChange={e => setAmount(Number(e.target.value))}
          style={{ width: "100%", marginBottom: 16, padding: 8, borderRadius: 8, border: "1px solid #ccc" }}
        />
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              flex: 1,
              background: "#635bff",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "0.75rem",
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            Pay with Stripe
          </button>
          <button
            type="button"
            disabled={loading}
            style={{
              flex: 1,
              background: "#ffc439",
              color: "#222",
              border: "none",
              borderRadius: 8,
              padding: "0.75rem",
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer"
            }}
            onClick={handlePaypal}
          >
            Pay with PayPal
          </button>
        </div>
        {status && <div style={{ marginTop: 12, color: "#06b6d4" }}>{status}</div>}
      </form>
      <p style={{ marginTop: 32, color: "#cbd5e1" }}>
        After payment, your server will be automatically added to the Pterodactyl panel.
      </p>
    </Layout>
  );
}
