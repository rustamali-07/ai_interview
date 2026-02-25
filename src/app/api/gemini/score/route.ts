import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildScoringPrompt } from "@/lib/prompts";
import { InterviewSetup, TranscriptEntry } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const { transcript, setup } = (await request.json()) as {
      transcript: TranscriptEntry[];
      setup: InterviewSetup;
    };

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-04-17" });

    const prompt = buildScoringPrompt(transcript, setup);

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.3,
        responseMimeType: "application/json",
      },
    });

    const text = result.response.text();

    // Parse JSON — strip markdown code blocks if present
    const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const scoreResult = JSON.parse(cleaned);

    return NextResponse.json({ result: scoreResult });
  } catch (error: unknown) {
    console.error("Scoring error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to score interview" },
      { status: 500 }
    );
  }
}
