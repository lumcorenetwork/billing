import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const uploadDir = path.join(process.cwd(), "uploads");

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }
  await fs.mkdir(uploadDir, { recursive: true });
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const filePath = path.join(uploadDir, file.name);
  await fs.writeFile(filePath, buffer);
  return NextResponse.json({ message: "File uploaded", name: file.name });
}

export async function GET() {
  const files = await fs.readdir(uploadDir).catch(() => []);
  return NextResponse.json({ files });
}
