import type { NextApiRequest, NextApiResponse } from "next";
import { authenticate } from "../_middleware";

// TODO: Replace with real PayPal integration
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = authenticate(req, res);
  if (!user) return;
  if (req.method !== "POST") return res.status(405).end();
  const { amount } = req.body;
  // Simulate payment success
  if (amount >= 5) {
    return res.status(200).json({ success: true, message: "PayPal payment processed." });
  }
  res.status(400).json({ error: "Invalid amount" });
}
