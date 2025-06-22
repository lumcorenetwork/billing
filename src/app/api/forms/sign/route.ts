import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const formsDir = path.join(process.cwd(), "forms");

export async function POST(req: NextRequest) {
  const { file, signature } = await req.json();
  if (!file || !signature) {
    return NextResponse.json({ error: "Missing file or signature" }, { status: 400 });
  }
  const filePath = path.join(formsDir, file);
  try {
    const data = await fs.readFile(filePath, "utf-8");
    const form = JSON.parse(data);
    form.signatures = form.signatures || [];
    form.signatures.push(signature);
    await fs.writeFile(filePath, JSON.stringify(form, null, 2));
    return NextResponse.json({ message: "Signed", form });
  } catch {
    return NextResponse.json({ error: "Form not found" }, { status: 404 });
  }
}
