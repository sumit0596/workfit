import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Update from "@/models/Update";

export async function GET() {
  try {
    await connectToDatabase();
    
    const currentMessage = process.env.VERCEL_GIT_COMMIT_MESSAGE;
    const currentSha = process.env.VERCEL_GIT_COMMIT_SHA;

    // If deployed on Vercel with a new commit, save it to DB
    if (currentMessage && currentSha) {
      const exists = await Update.findOne({ sha: currentSha });
      
      if (!exists) {
        await Update.create({ message: currentMessage, sha: currentSha });
        
        // Keep only the 5 most recent updates
        const allUpdates = await Update.find().sort({ createdAt: -1 });
        if (allUpdates.length > 5) {
          const toDelete = allUpdates.slice(5).map((u: any) => u._id);
          await Update.deleteMany({ _id: { $in: toDelete } });
        }
      }
    }

    // Retrieve the latest 5 updates
    const updates = await Update.find().sort({ createdAt: -1 }).limit(5);

    // If DB is completely empty (e.g. running locally for the first time), provide a dummy
    if (updates.length === 0) {
      return NextResponse.json({
        updates: [
          { message: "New updates have been deployed! Check out the latest features.", createdAt: new Date().toISOString() }
        ]
      });
    }

    return NextResponse.json({ updates });
  } catch (error) {
    console.error("Error fetching updates:", error);
    return NextResponse.json({ updates: [] }, { status: 500 });
  }
}
