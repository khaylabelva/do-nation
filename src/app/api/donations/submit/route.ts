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

    const { campaignId, jumlah, metodePembayaran } = await req.json();

    // Input validation
    if (!campaignId || !jumlah || !metodePembayaran) {
      return new Response(JSON.stringify({ error: 'Invalid input data' }), { status: 400 });
    }

    // Step 1: Record the donation in the UserDonasi table
    const newDonation = await prisma.userDonasi.create({
      data: {
        userId: user.id,
        campaignId: campaignId,
        jumlah: jumlah,
        metodePembayaran: metodePembayaran,
      },
    });

    // Step 2: Update progressDonasi in CampaignDonasi
    await prisma.campaignDonasi.update({
      where: { id: campaignId },
      data: {
        progressDonasi: {
          increment: jumlah, // Add the donated amount to progressDonasi
        },
      },
    });

    // Return success response
    return new Response(
      JSON.stringify({
        message: 'Donation recorded and campaign updated successfully',
        donation: newDonation,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting donation:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
