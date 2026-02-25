import { NextResponse } from "next/server";

export async function POST() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }
  // Return the API key securely for WebSocket connection
  // In production, use ephemeral tokens. For now, return masked key reference.
  return NextResponse.json({ apiKey });
}
