import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getUser } from "@/lib/lucia"; // Replace with your authentication helper

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    // 1. Authenticate the user
    const user = await getUser(); // Replace with your auth logic
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Extract campaignId from query parameters
    const { searchParams } = new URL(req.url);
    const campaignId = parseInt(searchParams.get("campaignId") || "", 10);

    if (!campaignId) {
      return NextResponse.json(
        { error: "campaignId is required" },
        { status: 400 }
      );
    }

    // 3. Fetch UserAksi data for the specific campaignId and userId
    const userAksi = await prisma.userAksi.findMany({
      where: {
        campaignId: campaignId,
        userId: user.id,
      },
      select: {
        id: true,
      },
    });

    // 4. Return the UserAksi data
    return NextResponse.json(userAksi, { status: 200 });
  } catch (error) {
    console.error("Error fetching user actions:", error);
    return NextResponse.json(
      { error: "Failed to fetch user actions" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
