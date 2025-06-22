import type { NextApiRequest, NextApiResponse } from "next";
import { authenticate } from "../_middleware";
import fs from "fs";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = authenticate(req, res, ["owner"]);
  if (!user) return;
  const logPath = path.join(process.cwd(), "discord-bot", "bot-error.log");
  try {
    const log = fs.existsSync(logPath) ? fs.readFileSync(logPath, "utf8") : "";
    res.status(200).json({ log });
  } catch {
    res.status(500).json({ error: "Could not read log file." });
  }
}
