import type { NextApiRequest, NextApiResponse } from "next";
import { authenticate } from "../_middleware";

// In-memory store for demo; replace with DB in production
let discordSettings = {
  botToken: "DISCORD_BOT_TOKEN",
  commands: ["!help", "!status"],
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = authenticate(req, res, req.method === "POST" ? ["owner"] : []);
  if (!user) return;
  if (req.method === "GET") {
    return res.status(200).json(discordSettings);
  }
  if (req.method === "POST") {
    const { botToken, commands } = req.body;
    if (botToken) discordSettings.botToken = botToken;
    if (commands) discordSettings.commands = commands;
    return res.status(200).json({ success: true, settings: discordSettings });
  }
  res.status(405).end();
}
