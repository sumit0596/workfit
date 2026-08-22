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

    const logs = await WorkoutLog.find({
      userEmail: session.user.email,
    }).sort({ createdAt: -1 });

    const totalSets = logs.length;

    // Calculate workouts this month
    const now = new Date();
    const currentMonthLogs = logs.filter((log) => {
      const d = new Date(log.createdAt);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    });
    const uniqueDaysThisMonth = new Set(
      currentMonthLogs.map((log) => {
        const d = new Date(log.createdAt);
        return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
      })
    ).size;

    // Calculate Total Active Days (to replace Weight Change for now)
    const totalActiveDays = new Set(
      logs.map((log) => {
        const d = new Date(log.createdAt);
        return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
      })
    ).size;

    // Calculate Current Streak
    // We group logs by YYYY-MM-DD
    const activeDates = new Set(
      logs.map((log) => {
        const d = new Date(log.createdAt);
        return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
      })
    );

    let streak = 0;
    let checkDate = new Date(now);
    
    // First, check if today is active
    let checkStr = `${checkDate.getFullYear()}-${checkDate.getMonth()}-${checkDate.getDate()}`;
    if (activeDates.has(checkStr)) {
      streak++;
      // check backwards from yesterday
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      // today is not active, check if yesterday was active
      checkDate.setDate(checkDate.getDate() - 1);
    }

    // Now check continuously backwards
    while (true) {
      checkStr = `${checkDate.getFullYear()}-${checkDate.getMonth()}-${checkDate.getDate()}`;
      if (activeDates.has(checkStr)) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }

    return NextResponse.json({
      currentStreak: streak,
      workoutsThisMonth: uniqueDaysThisMonth,
      totalSets,
      totalActiveDays,
    }, { status: 200 });

  } catch (error: any) {
    console.error("Error fetching KPI summary:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
