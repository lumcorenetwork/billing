import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useSession } from "next-auth/react";

type CustomUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
  isAdmin?: boolean;
};

type CustomSession = {
  user?: CustomUser;
  accessToken?: string;
};

export default function Settings() {
  const { data: session, status: authStatus } = useSession<CustomSession>();
  const user = session?.user;
  const accessToken = session?.accessToken;

  // Settings state
  const [portalName, setPortalName] = useState("");
  const [stripeKey, setStripeKey] = useState("");
  const [paypalClientId, setPaypalClientId] = useState("");
  const [pteroApiUrl, setPteroApiUrl] = useState("");
  const [pteroApiKey, setPteroApiKey] = useState("");
  const [status, setStatus] = useState("");
  // Products
  const [products, setProducts] = useState<any[]>([]);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [productForm, setProductForm] = useState({ name: "", price: 0, description: "" });
  // Discord bot
  const [discordBotToken, setDiscordBotToken] = useState("");
  const [discordCommands, setDiscordCommands] = useState<string[]>([]);
  const [newCommand, setNewCommand] = useState("");
  const [botStatus, setBotStatus] = useState<string>("unknown");
  const [botActionLoading, setBotActionLoading] = useState(false);
  const [botLog, setBotLog] = useState<string>("");
  const [showBotLog, setShowBotLog] = useState(false);

  // Fetch all settings and products on mount
  useEffect(() => {
    if (authStatus !== "authenticated" || !accessToken) return;
    // Payment & Pterodactyl
    fetch("/api/settings/payment", { headers: { Authorization: `Bearer ${accessToken}` } })
      .then(res => res.json())
      .then(data => {
        setStripeKey(data.stripeKey || "");
        setPaypalClientId(data.paypalClientId || "");
      });
    fetch("/api/settings/pterodactyl", { headers: { Authorization: `Bearer ${accessToken}` } })
      .then(res => res.json())
      .then(data => {
        setPteroApiUrl(data.apiUrl || "");
        setPteroApiKey(data.apiKey || "");
      });
    // Portal name
    fetch("/api/settings/portal", { headers: { Authorization: `Bearer ${accessToken}` } })
      .then(res => res.json())
      .then(data => setPortalName(data.portalName || ""));
    // Products
    fetch("/api/products", { headers: { Authorization: `Bearer ${accessToken}` } })
      .then(res => res.json())
      .then(data => setProducts(data.products || []));
    // Discord bot
    fetch("/api/discord/settings", { headers: { Authorization: `Bearer ${accessToken}` } })
      .then(res => res.json())
      .then(data => {
        setDiscordBotToken(data.botToken || "");
        setDiscordCommands(data.commands || []);
      });
    fetch("/api/discord/bot-status")
      .then(res => res.json())
      .then(data => setBotStatus(data.status || "unknown"))
      .catch(() => setBotStatus("unknown"));
  }, [authStatus, accessToken]);

  // Save all settings
  const saveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("");
    try {
      await fetch("/api/settings/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
        body: JSON.stringify({ stripeKey, paypalClientId }),
      });
      await fetch("/api/settings/pterodactyl", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
        body: JSON.stringify({ apiUrl: pteroApiUrl, apiKey: pteroApiKey }),
      });
      await fetch("/api/settings/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
        body: JSON.stringify({ portalName }),
      });
      setStatus("Settings updated.");
    } catch {
      setStatus("Failed to update settings.");
    }
  };

  // Product CRUD
  const handleProductFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };
  const addOrEditProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      await fetch(`/api/products/${editingProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
        body: JSON.stringify(productForm),
      });
    } else {
      await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
        body: JSON.stringify(productForm),
      });
    }
    setProductForm({ name: "", price: 0, description: "" });
    setEditingProduct(null);
    // Refresh products
    const res = await fetch("/api/products", { headers: { Authorization: `Bearer ${accessToken}` } });
    const data = await res.json();
    setProducts(data.products || []);
  };
  const editProduct = (product: any) => {
    setEditingProduct(product);
    setProductForm({ name: product.name, price: product.price, description: product.description });
  };
  const deleteProduct = async (id: string) => {
    await fetch(`/api/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    // Refresh products
    const res = await fetch("/api/products", { headers: { Authorization: `Bearer ${accessToken}` } });
    const data = await res.json();
    setProducts(data.products || []);
  };

  // Discord bot controls
  const handleBotAction = async (action: "start" | "stop" | "restart") => {
    setBotActionLoading(true);
    try {
      const res = await fetch(`/api/discord/bot-control`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
        body: JSON.stringify({ action }),
      });
      const data = await res.json();
      setBotStatus(data.status || "unknown");
    } catch {
      setBotStatus("unknown");
    }
    setBotActionLoading(false);
  };
  const fetchBotLog = async () => {
    const res = await fetch("/api/discord/bot-log", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    const data = await res.json();
    setBotLog(data.log || "");
  };

  // Discord bot settings
  const saveDiscordSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/discord/settings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ botToken: discordBotToken, commands: discordCommands }),
    });
    setStatus("Discord bot settings updated.");
  };
  const addDiscordCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCommand && !discordCommands.includes(newCommand)) {
      setDiscordCommands([...discordCommands, newCommand]);
      setNewCommand("");
    }
  };
  const removeDiscordCommand = (cmd: string) => {
    setDiscordCommands(discordCommands.filter(c => c !== cmd));
  };

  if (authStatus === "loading") {
    return <Layout><div>Loading...</div></Layout>;
  }
  if (!user) {
    return <Layout><div>You must be logged in to access settings.</div></Layout>;
  }

  return (
    <Layout>
      <h1 style={{ fontWeight: 700, fontSize: 28, marginBottom: 24 }}>Settings</h1>
      {user?.role === "owner" || user?.role === "admin" ? (
        <>
          <form onSubmit={saveSettings} style={{ maxWidth: 500, marginBottom: 32 }}>
            <label>Portal Name</label>
            <input
              value={portalName}
              onChange={e => setPortalName(e.target.value)}
              style={{ width: "100%", marginBottom: 12, padding: 8, borderRadius: 8, border: "1px solid #ccc" }}
            />
            <h2 style={{ fontWeight: 600, fontSize: 20, margin: "24px 0 8px" }}>Stripe & PayPal Integration</h2>
            <label>Stripe Public Key</label>
            <input
              value={stripeKey}
              onChange={e => setStripeKey(e.target.value)}
              style={{ width: "100%", marginBottom: 12, padding: 8, borderRadius: 8, border: "1px solid #ccc" }}
            />
            <label>PayPal Client ID</label>
            <input
              value={paypalClientId}
              onChange={e => setPaypalClientId(e.target.value)}
              style={{ width: "100%", marginBottom: 12, padding: 8, borderRadius: 8, border: "1px solid #ccc" }}
            />
            <h2 style={{ fontWeight: 600, fontSize: 20, margin: "24px 0 8px" }}>Pterodactyl API</h2>
            <label>Pterodactyl API URL</label>
            <input
              value={pteroApiUrl}
              onChange={e => setPteroApiUrl(e.target.value)}
              style={{ width: "100%", marginBottom: 12, padding: 8, borderRadius: 8, border: "1px solid #ccc" }}
            />
            <label>Pterodactyl API Key</label>
            <input
              value={pteroApiKey}
              onChange={e => setPteroApiKey(e.target.value)}
              style={{ width: "100%", marginBottom: 12, padding: 8, borderRadius: 8, border: "1px solid #ccc" }}
            />
            <button type="submit" style={{ background: "#22c55e", color: "#fff", border: "none", borderRadius: 8, padding: "0.5rem 1rem", fontWeight: 600 }}>
              Save Settings
            </button>
            {status && <div style={{ marginTop: 12, color: "#06b6d4" }}>{status}</div>}
          </form>
          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontWeight: 600, fontSize: 20, marginBottom: 12 }}>Products</h2>
            <form onSubmit={addOrEditProduct} style={{ marginBottom: 16 }}>
              <input
                name="name"
                placeholder="Product Name"
                value={productForm.name}
                onChange={handleProductFormChange}
                required
                style={{ marginRight: 8, padding: 8, borderRadius: 8, border: "1px solid #ccc" }}
              />
              <input
                name="price"
                type="number"
                placeholder="Price"
                value={productForm.price}
                onChange={handleProductFormChange}
                required
                style={{ marginRight: 8, padding: 8, borderRadius: 8, border: "1px solid #ccc", width: 100 }}
              />
              <textarea
                name="description"
                placeholder="Description"
                value={productForm.description}
                onChange={handleProductFormChange}
                required
                style={{ marginRight: 8, padding: 8, borderRadius: 8, border: "1px solid #ccc", width: 200, verticalAlign: "top" }}
              />
              <button type="submit" style={{ background: "#8b5cf6", color: "#fff", border: "none", borderRadius: 8, padding: "0.5rem 1rem", fontWeight: 600 }}>
                {editingProduct ? "Update" : "Add"}
              </button>
              {editingProduct && (
                <button type="button" onClick={() => { setEditingProduct(null); setProductForm({ name: "", price: 0, description: "" }); }} style={{ marginLeft: 8, background: "#f87171", color: "#fff", border: "none", borderRadius: 8, padding: "0.5rem 1rem", fontWeight: 600 }}>
                  Cancel
                </button>
              )}
            </form>
            <table style={{ width: "100%", borderRadius: 16, overflow: "hidden" }}>
              <thead style={{ background: "var(--color-surface)" }}>
                <tr>
                  <th style={{ padding: 8 }}>Name</th>
                  <th style={{ padding: 8 }}>Price</th>
                  <th style={{ padding: 8 }}>Description</th>
                  <th style={{ padding: 8 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td style={{ padding: 8 }}>{product.name}</td>
                    <td style={{ padding: 8 }}>${product.price}</td>
                    <td style={{ padding: 8 }}>{product.description}</td>
                    <td style={{ padding: 8 }}>
                      <button onClick={() => editProduct(product)} style={{ background: "#06b6d4", color: "#fff", border: "none", borderRadius: 8, padding: "0.25rem 0.75rem", fontWeight: 600, marginRight: 8 }}>
                        Edit
                      </button>
                      <button onClick={() => deleteProduct(product.id)} style={{ background: "#f87171", color: "#fff", border: "none", borderRadius: 8, padding: "0.25rem 0.75rem", fontWeight: 600 }}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
          {user.role === "owner" && (
            <section style={{ marginBottom: 32 }}>
              <h2 style={{ fontWeight: 600, fontSize: 20, marginBottom: 12 }}>Discord Bot Integration</h2>
              <div style={{ marginBottom: 12 }}>
                <strong>Bot Status:</strong> {botStatus}
                <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                  <button
                    onClick={() => handleBotAction("start")}
                    disabled={botActionLoading}
                    style={{ background: "#22c55e", color: "#fff", border: "none", borderRadius: 8, padding: "0.5rem 1rem", fontWeight: 600 }}
                  >
                    Start
                  </button>
                  <button
                    onClick={() => handleBotAction("stop")}
                    disabled={botActionLoading}
                    style={{ background: "#f87171", color: "#fff", border: "none", borderRadius: 8, padding: "0.5rem 1rem", fontWeight: 600 }}
                  >
                    Stop
                  </button>
                  <button
                    onClick={() => handleBotAction("restart")}
                    disabled={botActionLoading}
                    style={{ background: "#8b5cf6", color: "#fff", border: "none", borderRadius: 8, padding: "0.5rem 1rem", fontWeight: 600 }}
                  >
                    Restart
                  </button>
                </div>
              </div>
              <form onSubmit={saveDiscordSettings} style={{ marginBottom: 16 }}>
                <label>Discord Bot Token</label>
                <input
                  value={discordBotToken}
                  onChange={e => setDiscordBotToken(e.target.value)}
                  style={{ width: "100%", marginBottom: 12, padding: 8, borderRadius: 8, border: "1px solid #ccc" }}
                />
                <h3 style={{ fontWeight: 500, marginBottom: 8 }}>Allowed Commands</h3>
                <form onSubmit={addDiscordCommand} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  <input
                    value={newCommand}
                    onChange={e => setNewCommand(e.target.value)}
                    placeholder="Add command (e.g. !info)"
                    style={{ flex: 1, padding: 8, borderRadius: 8, border: "1px solid #ccc" }}
                  />
                  <button type="submit" style={{ background: "#8b5cf6", color: "#fff", border: "none", borderRadius: 8, padding: "0.5rem 1rem", fontWeight: 600 }}>
                    Add
                  </button>
                </form>
                <ul>
                  {discordCommands.map(cmd => (
                    <li key={cmd} style={{ marginBottom: 4, display: "flex", alignItems: "center", gap: 8 }}>
                      <span>{cmd}</span>
                      <button
                        type="button"
                        onClick={() => removeDiscordCommand(cmd)}
                        style={{ background: "#f87171", color: "#fff", border: "none", borderRadius: 8, padding: "0.25rem 0.75rem", fontWeight: 600 }}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
                <button type="submit" style={{ background: "#5865F2", color: "#fff", border: "none", borderRadius: 8, padding: "0.5rem 1rem", fontWeight: 600, marginTop: 8 }}>
                  Save Bot Settings
                </button>
              </form>
              <div style={{ marginTop: 16 }}>
                <button
                  onClick={() => {
                    if (!showBotLog) fetchBotLog();
                    setShowBotLog(!showBotLog);
                  }}
                  style={{ background: "#334155", color: "#fff", border: "none", borderRadius: 8, padding: "0.5rem 1rem", fontWeight: 600 }}
                >
                  {showBotLog ? "Hide" : "Show"} Bot Error Log
                </button>
                {showBotLog && (
                  <pre style={{ background: "#181a2e", color: "#f87171", padding: 16, borderRadius: 8, marginTop: 8, maxHeight: 300, overflow: "auto" }}>
                    {botLog || "No errors logged."}
                  </pre>
                )}
              </div>
            </section>
          )}
        </>
      ) : (
        <div style={{ color: "#f87171" }}>You do not have permission to edit settings.</div>
      )}
    </Layout>
  );
}
