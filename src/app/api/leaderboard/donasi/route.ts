import { getDonasiLeaderboard } from "@/lib/api";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const leaderboard = await getDonasiLeaderboard();
    return NextResponse.json(leaderboard);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch donasi leaderboard" }, { status: 500 });
  }
}
