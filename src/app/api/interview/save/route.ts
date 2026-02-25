import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, action, data } = body;

    if (!sessionId) {
      return NextResponse.json({ error: "sessionId required" }, { status: 400 });
    }

    const docRef = doc(db, "interviews", sessionId);

    if (action === "create") {
      await setDoc(docRef, {
        ...data,
        createdAt: Date.now(),
        status: "in-progress",
      });
    } else if (action === "update") {
      await updateDoc(docRef, {
        ...data,
        updatedAt: Date.now(),
      });
    } else if (action === "complete") {
      await updateDoc(docRef, {
        ...data,
        status: "completed",
        completedAt: Date.now(),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Save interview error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to save interview" },
      { status: 500 }
    );
  }
}
