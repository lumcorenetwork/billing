import type { NextApiRequest, NextApiResponse } from "next";

// Use the same status as in bot-control.ts
let botStatus = "stopped";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ status: botStatus });
}
