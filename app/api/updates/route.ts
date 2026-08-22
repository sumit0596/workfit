import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    commitMessage: process.env.VERCEL_GIT_COMMIT_MESSAGE || "New updates have been deployed! Check out the latest features."
  });
}
