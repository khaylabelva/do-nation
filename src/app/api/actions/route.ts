import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch all CampaignAksi records
    const actions = await prisma.campaignAksi.findMany({
      include: {
        aksiList: true, // Include the list of actions
        pelakuAksiList: true, // Include the list of participants
      },
    });

    return NextResponse.json(actions, { status: 200 });
  } catch (error) {
    console.error("Error fetching actions:", error);
    return NextResponse.json({ error: "Failed to fetch actions" }, { status: 500 });
  }
}
