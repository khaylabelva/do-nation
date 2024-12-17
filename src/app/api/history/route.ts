import { PrismaClient } from "@prisma/client";
import { getUser } from "@/lib/lucia";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const donasiHistory = await prisma.userDonasi.findMany({
      where: { userId: user.id },
      include: { campaign: true },
    });

    const aksiHistory = await prisma.userAksi.findMany({
      where: { userId: user.id },
      include: { campaign: true },
    });

    return NextResponse.json({ donasiHistory, aksiHistory }, { status: 200 });
  } catch (error) {
    console.error("Error fetching history:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
