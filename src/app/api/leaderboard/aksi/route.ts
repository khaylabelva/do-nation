import { getAksiLeaderboard } from "@/lib/api";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const leaderboard = await getAksiLeaderboard();
    return NextResponse.json(leaderboard);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch aksi leaderboard" }, { status: 500 });
  }
}
