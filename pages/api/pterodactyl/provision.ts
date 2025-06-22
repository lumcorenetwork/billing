import type { NextApiRequest, NextApiResponse } from "next";
import { authenticate } from "../_middleware";

// Use environment variables for sensitive data
const PTERODACTYL_API_URL = process.env.PTERODACTYL_API_URL || "https://panel.lumecorehosting.co.uk/api";
const PTERODACTYL_API_KEY = process.env.PTERODACTYL_API_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = authenticate(req, res);
  if (!user) return;
  if (req.method !== "POST") return res.status(405).end();
  const { userId, amount } = req.body;
  if (!userId || !amount || amount < 5) {
    return res.status(400).json({ error: "Invalid request" });
  }
  if (!PTERODACTYL_API_KEY) {
    return res.status(500).json({ error: "Pterodactyl API key not set" });
  }
  try {
    // Example payload for server creation (customize as needed)
    const payload = {
      name: `user-${userId}-server`,
      user: userId,
      egg: 1, // Replace with your egg ID
      docker_image: "ghcr.io/pterodactyl/yolks:nodejs_18", // Example image
      startup: "npm run start", // Example startup command
      environment: {}, // Add required environment variables
      limits: { memory: 1024, swap: 0, disk: 10000, io: 500, cpu: 100 },
      feature_limits: { databases: 1, allocations: 1, backups: 1 },
      allocation: 1, // Replace with your allocation ID
    };
    const response = await fetch(`${PTERODACTYL_API_URL}/application/servers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${PTERODACTYL_API_KEY}`,
        "Accept": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const error = await response.json();
      return res.status(response.status).json({ error: error.errors || error.message || "Pterodactyl API error" });
    }
    const data = await response.json();
    return res.status(200).json({ success: true, server: data });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || "Server provisioning failed" });
  }
}
