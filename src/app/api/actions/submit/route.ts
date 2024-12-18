import { PrismaClient } from "@prisma/client";
import { getUser } from "@/lib/lucia"; // To fetch the logged-in user
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const { campaignId, deskripsi, fotoDokumentasi } = await req.json();

    // Get the current logged-in user
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Validate required fields
    if (!campaignId || !deskripsi) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Start a transaction to ensure both UserAksi creation and CampaignAksi update succeed
    const result = await prisma.$transaction(async (tx) => {
      // 1. Create a new record in UserAksi
      const userAksi = await tx.userAksi.create({
        data: {
          userId: user.id,
          campaignId,
          deskripsi: deskripsi || "",
          fotoDokumentasi: fotoDokumentasi || "",
          verified: true,
          createdAt: new Date(),
        },
      });

      // 2. Update progressAksi in CampaignAksi table
      await prisma.campaignAksi.update({
        where: { id: campaignId },
        data: {
          progressAksi: { increment: 1 }, 
        },
      });

      await prisma.user.update({
        where: { id: user.id },
        data: {
          totalAksi: { increment: 1 },
        },
      });

      return userAksi;
    });

    return NextResponse.json(
      { success: true, userAksi: result },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting aksi:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect(); // Ensure Prisma client disconnects
  }
}
