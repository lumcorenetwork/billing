import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUsername(localStorage.getItem("lcb_username"));
    }
  }, []);

  return (
    <main style={{ maxWidth: 700, margin: "4rem auto", padding: "2rem", background: "var(--color-surface)", borderRadius: 24, boxShadow: "0 2px 8px #0001" }}>
      <h1 style={{ fontWeight: 700, fontSize: 32, marginBottom: 24 }}>LumeCore Billing Dashboard</h1>
      {username && (
        <p style={{ fontSize: 20, color: "#a3e635", marginBottom: 16 }}>
          Welcome, <strong>{username}</strong>!
        </p>
      )}
      <p style={{ fontSize: 18, color: "#cbd5e1", marginBottom: 24 }}>
        Welcome to your billing dashboard. Here you can manage invoices, payments, and view billing analytics.
      </p>
      <ul style={{ margin: "1rem 0 1.5rem 1.5rem", color: "#cbd5e1" }}>
        <li>View and manage invoices</li>
        <li>Track payments and billing history</li>
        <li>Access billing analytics and reports</li>
        <li>Manage payment methods</li>
        <li>Download receipts and statements</li>
      </ul>
      <div style={{ display: "flex", gap: 16, marginTop: 32 }}>
        <Link href="/auth/signup">
          <button style={{ background: "#22c55e", color: "#fff", border: "none", borderRadius: 8, padding: "0.75rem 2rem", fontWeight: 600, fontSize: 18 }}>
            Sign Up
          </button>
        </Link>
        <Link href="/auth/login">
          <button style={{ background: "#8b5cf6", color: "#fff", border: "none", borderRadius: 8, padding: "0.75rem 2rem", fontWeight: 600, fontSize: 18 }}>
            Login
          </button>
        </Link>
      </div>
    </main>
  );
}
