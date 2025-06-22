import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const formsDir = path.join(process.cwd(), "forms");

export async function POST(req: NextRequest) {
  const { title, content } = await req.json();
  if (!title || !content) {
    return NextResponse.json({ error: "Missing title or content" }, { status: 400 });
  }
  await fs.mkdir(formsDir, { recursive: true });
  const fileName = `${Date.now()}-${title.replace(/[^a-zA-Z0-9-_]/g, "_")}.json`;
  const filePath = path.join(formsDir, fileName);
  const form = { title, content, signatures: [] };
  await fs.writeFile(filePath, JSON.stringify(form, null, 2));
  return NextResponse.json({ message: "Form created", file: fileName });
}

export async function GET() {
  await fs.mkdir(formsDir, { recursive: true });
  const files = await fs.readdir(formsDir);
  const forms = await Promise.all(
    files.map(async (file) => {
      const data = await fs.readFile(path.join(formsDir, file), "utf-8");
      return { ...JSON.parse(data), file };
    })
  );
  return NextResponse.json({ forms });
}
