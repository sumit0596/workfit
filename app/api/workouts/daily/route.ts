import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectToDatabase } from "@/lib/mongodb";
import WorkoutLog from "@/models/WorkoutLog";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    // Fetch logs for the logged-in user, sorted by newest first
    const logs = await WorkoutLog.find({ userEmail: session.user.email }).sort({ createdAt: -1 });

    // Format logs to match the frontend expectations
    const formattedLogs = logs.map((log: any) => ({
      id: log._id.toString(),
      date: log.date,
      exercise: log.exercise,
      category: log.category,
      set: log.setNumber,
      resistance: log.resistance,
      stance: log.stance,
      reps: log.reps,
      target: log.target,
      rpe: log.rpe,
      status: log.status,
      notes: log.notes,
    }));

    return NextResponse.json({ success: true, data: formattedLogs }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching workouts:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
