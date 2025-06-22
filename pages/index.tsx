import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <main style={{ maxWidth: 700, margin: "4rem auto", padding: "2rem", background: "var(--color-surface)", borderRadius: 24, boxShadow: "0 2px 8px #0001" }}>
      <h1 style={{ fontWeight: 700, fontSize: 36, marginBottom: 16 }}>LumeCore Billing</h1>
      <p style={{ fontSize: 18, color: "#cbd5e1", marginBottom: 24 }}>
        Welcome to the LumeCore Billing page!<br /><br />
        This portal provides a modern, secure, and feature-rich platform for managing billing operations, file uploads, digital signatures, authentication, file management, ticketing, server provisioning, and billing for Pterodactyl-based hosting.<br /><br />
        <strong>Key Features:</strong>
      </p>
      <ul style={{ margin: "1rem 0 1.5rem 1.5rem", color: "#cbd5e1" }}>
        <li>Billing dashboard with real-time stats and quick actions</li>
        <li>Backend API for secure file upload, reading, and digital signature</li>
        <li>Authentication and permissions for billing admins</li>
        <li>File management and digital signing UI</li>
        <li>Integrated billing with Stripe and PayPal</li>
        <li>Product management and server provisioning via Pterodactyl API</li>
        <li>Incident center, logs, and billing management</li>
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
