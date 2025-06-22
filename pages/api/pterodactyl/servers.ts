import type { NextApiRequest, NextApiResponse } from "next";
import { authenticate } from "../_middleware";

const PTERODACTYL_API_URL = process.env.PTERODACTYL_API_URL || "https://panel.lumecorehosting.co.uk/api";
const PTERODACTYL_API_KEY = process.env.PTERODACTYL_API_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = authenticate(req, res);
  if (!user) return;
  if (req.method !== "GET") return res.status(405).end();
  if (!PTERODACTYL_API_KEY) {
    return res.status(500).json({ error: "Pterodactyl API key not set" });
  }
  try {
    // Fetch all servers and filter by user ID
    const response = await fetch(`${PTERODACTYL_API_URL}/application/servers`, {
      headers: {
        "Authorization": `Bearer ${PTERODACTYL_API_KEY}`,
        "Accept": "application/json",
      },
    });
    if (!response.ok) {
      const error = await response.json();
      return res.status(response.status).json({ error: error.errors || error.message || "Pterodactyl API error" });
    }
    const data = await response.json();
    // Filter servers by user ID
    const userServers = data.data.filter((srv: any) => srv.attributes.user === user.id);
    return res.status(200).json({ servers: userServers });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || "Failed to fetch servers" });
  }
}
