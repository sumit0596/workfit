import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectToDatabase } from "@/lib/mongodb";
import WorkoutLog from "@/models/WorkoutLog";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { exercise, setNumber, band, stance, reps, rpe, date, category } = body;

    if (!exercise || !setNumber || !reps || !rpe) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await connectToDatabase();

    // Determine status logic (simple version: if RPE >= 8, GOAL MET, else BUILD)
    let status = "";
    if (rpe >= 8) {
      status = "GOAL MET";
    } else {
      status = "BUILD";
    }

    // Standardize category if not provided
    const computedCategory = category || "General";

    const newLog = new WorkoutLog({
      userEmail: session.user.email,
      exercise,
      category: computedCategory,
      setNumber,
      resistance: band || "-",
      stance: stance || "-",
      reps,
      target: "8-12", // Placeholder default as requested
      rpe,
      status,
      notes: "", // Placeholder
      date: date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    });

    await newLog.save();

    return NextResponse.json({ success: true, log: newLog }, { status: 201 });
  } catch (error: any) {
    console.error("Error logging workout:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
