import type { NextApiRequest, NextApiResponse } from "next";
import { authenticate } from "../_middleware";

// TODO: Replace with secure process management (e.g., PM2, systemd, Docker, etc.)
let botStatus = "stopped";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = authenticate(req, res, ["owner"]);
  if (!user) return;
  if (req.method !== "POST") return res.status(405).end();
  const { action } = req.body;
  // Only allow owner (add real auth check)
  if (req.headers["x-user-role"] !== "owner") return res.status(403).json({ error: "Forbidden" });

  if (action === "start") {
    // TODO: Start the bot process (e.g., via PM2 or system command)
    botStatus = "running";
    return res.status(200).json({ status: botStatus });
  }
  if (action === "stop") {
    // TODO: Stop the bot process
    botStatus = "stopped";
    return res.status(200).json({ status: botStatus });
  }
  if (action === "restart") {
    // TODO: Restart the bot process
    botStatus = "restarting";
    setTimeout(() => { botStatus = "running"; }, 1000);
    return res.status(200).json({ status: botStatus });
  }
  return res.status(400).json({ error: "Invalid action" });
}
