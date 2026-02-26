import { NextRequest, NextResponse } from "next/server";

// Polls Vapi's REST API for call analysis (structuredData) after call ends
// Vapi runs the analysisPlan automatically — we just fetch the result

async function fetchCallAnalysis(callId: string, attempt = 0): Promise<unknown> {
    const apiKey = process.env.VAPI_API_KEY;
    if (!apiKey || apiKey === "your_vapi_secret_key_here") {
        throw new Error("VAPI_API_KEY not configured in .env.local");
    }

    const res = await fetch(`https://api.vapi.ai/call/${callId}`, {
        headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
        },
        cache: "no-store",
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Vapi API error ${res.status}: ${text.slice(0, 200)}`);
    }

    const call = await res.json();
    console.log(`[vapi-score] call.status=${call.status} attempt=${attempt}`);

    const structured = call.analysis?.structuredData;
    if (structured && typeof structured === "object") {
        return structured;
    }

    // Analysis not ready yet — caller should retry
    return null;
}

export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ callId: string }> }
) {
    const { callId } = await params;

    if (!callId) {
        return NextResponse.json({ error: "callId is required" }, { status: 400 });
    }

    try {
        // Poll up to 10 times with 3s delay between attempts
        for (let i = 0; i < 10; i++) {
            const result = await fetchCallAnalysis(callId, i);
            if (result) {
                console.log(`[vapi-score] ✅ Got structured data on attempt ${i + 1}`);
                return NextResponse.json({ result });
            }
            if (i < 9) {
                await new Promise((r) => setTimeout(r, 3000));
            }
        }

        return NextResponse.json(
            { error: "Vapi analysis not ready after 30s. Try again shortly." },
            { status: 202 }
        );
    } catch (error: unknown) {
        console.error("[vapi-score] Error:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to fetch analysis" },
            { status: 500 }
        );
    }
}
