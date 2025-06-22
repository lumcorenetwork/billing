import Layout from "../components/Layout";
import { useState } from "react";

const statuses = ["New", "In Progress", "Resolved"];

export default function Tickets() {
  const [tab, setTab] = useState("New");
  return (
    <Layout>
      <h1 style={{ fontFamily: "Inter, Poppins, sans-serif", fontWeight: 700, fontSize: 28, marginBottom: 24 }}>
        Tickets
      </h1>
      <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => setTab(status)}
            style={{
              background: tab === status ? "var(--color-accent)" : "var(--color-surface)",
              color: tab === status ? "#fff" : "var(--color-text)",
              border: "none",
              borderRadius: 12,
              padding: "0.5rem 1.5rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {status}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
        {/* Example ticket cards */}
        <div className="card" style={{ minWidth: 260, flex: 1, padding: 20, borderRadius: 20, boxShadow: "0 2px 8px #0001" }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Ticket #1</div>
          <div style={{ color: "#cbd5e1", marginBottom: 8 }}>Status: {tab}</div>
          <div style={{ marginBottom: 8 }}>Assigned to: Jane Doe</div>
          <button style={{ background: "#22c55e", color: "#fff", borderRadius: 8, padding: "0.5rem 1rem", border: "none" }}>
            Assign to me
          </button>
        </div>
      </div>
    </Layout>
  );
}
