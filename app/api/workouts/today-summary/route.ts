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

    const todayDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    const logs = await WorkoutLog.find({
      userEmail: session.user.email,
      date: todayDate,
    });

    if (!logs || logs.length === 0) {
      return NextResponse.json({
        category: "None",
        uniqueExercises: 0,
        estimatedTimeMin: 0,
        totalSets: 0,
        progressPercent: 0
      }, { status: 200 });
    }

    const totalSets = logs.length;
    const uniqueExercisesSet = new Set(logs.map(log => log.exercise));
    const uniqueExercises = uniqueExercisesSet.size;

    // Estimate time: let's say 2 minutes per set, plus 3 minutes per unique exercise (setup time)
    const estimatedTimeMin = totalSets * 2 + uniqueExercises * 3;

    // Find dominant category
    const categoryCounts: Record<string, number> = {};
    logs.forEach(log => {
      const cat = log.category || "General";
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });
    const dominantCategory = Object.keys(categoryCounts).reduce((a, b) => categoryCounts[a] > categoryCounts[b] ? a : b);

    // Goal: say 12 sets is 100%
    const goalSets = 12;
    const progressPercent = Math.min(100, Math.round((totalSets / goalSets) * 100));

    return NextResponse.json({
      category: dominantCategory,
      uniqueExercises,
      estimatedTimeMin,
      totalSets,
      progressPercent
    }, { status: 200 });

  } catch (error: any) {
    console.error("Error fetching today's summary:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
