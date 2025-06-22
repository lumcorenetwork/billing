import { NextRequest, NextResponse } from "next/server";

// Placeholder for Discord OAuth
export async function GET(req: NextRequest) {
  // In a real app, redirect to Discord OAuth URL
  return NextResponse.redirect("https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=identify email");
}
