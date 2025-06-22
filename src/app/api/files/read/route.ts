import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const uploadDir = path.join(process.cwd(), "uploads");

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");
  if (!name) {
    return NextResponse.json({ error: "No file name provided" }, { status: 400 });
  }
  const filePath = path.join(uploadDir, name);
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return NextResponse.json({ name, data });
  } catch {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
