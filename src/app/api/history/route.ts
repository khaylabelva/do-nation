import { PrismaClient } from "@prisma/client";
import { getUser } from "@/lib/lucia";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Get the logged-in user
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch user's donation history with related CampaignDonasi data
    const donasiHistory = await prisma.userDonasi.findMany({
      where: { userId: user.id },
      include: {
        campaign: true, // Join CampaignDonasi data
      },
    });

    // Fetch user's action history with related CampaignAksi data
    const aksiHistory = await prisma.userAksi.findMany({
      where: { userId: user.id },
      include: {
        campaign: true, // Join CampaignAksi data
      },
    });

    // Send the response
    return NextResponse.json({
      donasiHistory,
      aksiHistory,
    });
  } catch (error) {
    console.error("Error fetching history:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect(); // Disconnect the Prisma client
  }
}
