import type { NextApiRequest, NextApiResponse } from "next";
import { authenticate } from "../_middleware";

// In-memory store for demo; replace with DB in production
let paymentSettings = {
  stripeKey: "pk_test_1234",
  paypalClientId: "sb-paypal-client-id",
};

function isAdmin(req: NextApiRequest) {
  // TODO: Replace with real authentication/authorization
  return req.headers["x-user-role"] === "admin" || req.headers["x-user-role"] === "owner";
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = authenticate(req, res, req.method === "POST" ? ["admin", "owner"] : []);
  if (!user) return;
  if (req.method === "GET") {
    return res.status(200).json(paymentSettings);
  }
  if (req.method === "POST") {
    if (!isAdmin(req)) return res.status(403).json({ error: "Forbidden" });
    const { stripeKey, paypalClientId } = req.body;
    if (stripeKey) paymentSettings.stripeKey = stripeKey;
    if (paypalClientId) paymentSettings.paypalClientId = paypalClientId;
    return res.status(200).json({ success: true, settings: paymentSettings });
  }
  res.status(405).end();
}
