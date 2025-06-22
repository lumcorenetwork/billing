import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const formsDir = path.join(process.cwd(), "forms");

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const file = searchParams.get("file");
  if (!file) {
    return NextResponse.json({ error: "No form file provided" }, { status: 400 });
  }
  const filePath = path.join(formsDir, file);
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return NextResponse.json({ form: JSON.parse(data) });
  } catch {
    return NextResponse.json({ error: "Form not found" }, { status: 404 });
  }
}
