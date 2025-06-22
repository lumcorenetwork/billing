import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useSession } from "next-auth/react";

// Extend types for custom session and user properties
interface CustomUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  isAdmin?: boolean;
}
interface CustomSession {
  user?: CustomUser;
  accessToken?: string;
}

export default function Servers() {
  const { data, status } = useSession();
  // Use type assertion to access custom session properties
  const session = data as { accessToken?: string; user?: { id: string } } | null;
  const [servers, setServers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status !== "authenticated") return;
    setLoading(true);
    fetch("/api/pterodactyl/servers", {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error((await res.json()).error || "Failed to fetch servers");
        return res.json();
      })
      .then((data) => {
        setServers(data.servers || []);
        setError("");
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [status, session]);

  if (status === "loading") return <Layout><div>Loading...</div></Layout>;
  if (status !== "authenticated") return <Layout><div>You must be logged in to view your servers.</div></Layout>;

  return (
    <Layout>
      <h1 style={{ fontWeight: 700, fontSize: 28, marginBottom: 24 }}>Your Servers</h1>
      {loading && <div>Loading servers...</div>}
      {error && <div style={{ color: "#f87171" }}>{error}</div>}
      {!loading && !error && servers.length === 0 && <div>No servers found.</div>}
      <ul style={{ marginTop: 24 }}>
        {servers.map((srv) => (
          <li key={srv.attributes.identifier} style={{ marginBottom: 16, padding: 16, border: "1px solid #e5e7eb", borderRadius: 8 }}>
            <strong>{srv.attributes.name}</strong><br />
            <span>ID: {srv.attributes.identifier}</span><br />
            <span>Status: {srv.attributes.suspended ? "Suspended" : "Active"}</span><br />
            <a href={`https://panel.lumecorehosting.co.uk/server/${srv.attributes.identifier}`} target="_blank" rel="noopener noreferrer" style={{ color: "#06b6d4" }}>
              Open in Panel
            </a>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
