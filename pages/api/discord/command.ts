import type { NextApiRequest, NextApiResponse } from "next";

// Use the same settings as above or fetch from your DB
const discordSettings = {
  commands: ["!help", "!status"],
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ commands: discordSettings.commands });
}
