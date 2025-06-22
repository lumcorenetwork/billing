import Layout from "../components/Layout";

export default function Logs() {
  return (
    <Layout>
      <h1 style={{ fontFamily: "Inter, Poppins, sans-serif", fontWeight: 700, fontSize: 28, marginBottom: 24 }}>
        Incident Center
      </h1>
      <h2 style={{ fontWeight: 600, marginBottom: 12 }}>Downtime/DDoS Alerts</h2>
      <ul>
        <li>2024-06-10 14:22 - Node 3: DDoS mitigated</li>
        <li>2024-06-09 09:10 - Node 2: Downtime 5min</li>
      </ul>
      <h2 style={{ fontWeight: 600, marginBottom: 12, marginTop: 24 }}>SOP Access</h2>
      <a href="/sop.pdf" target="_blank" rel="noopener" style={{ color: "var(--color-accent)" }}>
        Download SOP (PDF)
      </a>
    </Layout>
  );
}
