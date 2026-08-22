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

    const now = new Date();
    // Monday as start of week
    const day = now.getDay();
    const diffToMonday = now.getDate() - day + (day === 0 ? -6 : 1);
    
    const monday = new Date(now);
    monday.setDate(diffToMonday);
    monday.setHours(0, 0, 0, 0);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);

    const logs = await WorkoutLog.find({
      userEmail: session.user.email,
      createdAt: {
        $gte: monday,
        $lte: sunday,
      },
    });

    const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const weeklyData = [];
    
    let activeDaysThisWeek = 0;

    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(monday);
      currentDay.setDate(monday.getDate() + i);

      // Find logs for this specific day
      const dayLogs = logs.filter(log => {
        const logDate = new Date(log.createdAt);
        return logDate.getDate() === currentDay.getDate() && 
               logDate.getMonth() === currentDay.getMonth() && 
               logDate.getFullYear() === currentDay.getFullYear();
      });

      const totalSets = dayLogs.length; // performance metric
      const isToday = now.getDate() === currentDay.getDate() && 
                      now.getMonth() === currentDay.getMonth() && 
                      now.getFullYear() === currentDay.getFullYear();

      if (totalSets > 0) activeDaysThisWeek++;

      weeklyData.push({
        dayName: dayNames[i],
        isToday,
        performance: totalSets,
      });
    }

    return NextResponse.json({
      days: weeklyData,
      activeDaysThisWeek
    }, { status: 200 });

  } catch (error: any) {
    console.error("Error fetching weekly summary:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
