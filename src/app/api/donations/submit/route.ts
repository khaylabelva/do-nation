// src/app/api/donations/submit/route.ts
import { PrismaClient } from '@prisma/client';
import { getUser } from '@/lib/lucia';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const user = await getUser(); // Get currently logged-in user
    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized access' }), { status: 401 });
    }

    const { campaignId, jumlah, metodePembayaran, deskripsi } = await req.json();

    // Input validation
    if (!campaignId || !jumlah || !metodePembayaran ) {
      return new Response(JSON.stringify({ error: 'Invalid input data' }), { status: 400 });
    }

    // Start a transaction to ensure atomic operations
    const result = await prisma.$transaction(async (tx) => {
      // Step 1: Record the donation in the UserDonasi table
      const userDonasi = await tx.userDonasi.create({
        data: {
          userId: user.id,
          campaignId,
          jumlah,
          metodePembayaran,
          deskripsi: deskripsi || " ",
          createdAt: new Date(),
        },
      });

      // Step 2: Update progressDonasi in CampaignDonasi
      await tx.campaignDonasi.update({
        where: { id: campaignId },
        data: {
          progressDonasi: {
            increment: jumlah, // Increment progressDonasi by the donation amount
          },
        },
      });

      return userDonasi; // Return the created donation record
    });

    // Return success response
    return new Response(
      JSON.stringify({
        message: 'Donation recorded and campaign updated successfully',
        donation: result,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting donation:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  } finally {
    await prisma.$disconnect(); // Ensure Prisma client disconnects
  }
}
