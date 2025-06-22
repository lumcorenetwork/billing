import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const uploadDir = path.join(process.cwd(), "uploads");

export async function POST(req: NextRequest) {
  const { name, signature } = await req.json();
  if (!name || !signature) {
    return NextResponse.json({ error: "Missing file name or signature" }, { status: 400 });
  }
  const filePath = path.join(uploadDir, name);
  try {
    let data = await fs.readFile(filePath, "utf-8");
    data += `\n\n--- Signed by: ${signature} ---`;
    await fs.writeFile(filePath, data);
    return NextResponse.json({ message: "File signed" });
  } catch {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
