import { GetServerSideProps } from "next";

import { PrismaClient } from "@prisma/client";

// Prisma Client
const prisma = new PrismaClient();

export const getServerSideProps: GetServerSideProps = async () => {
    // Fetch Donasi Campaigns
    const donasiCampaigns = await prisma.campaignDonasi.findMany({
      select: {
        id: true,
        judul: true,
        foto: true,
        targetDonasi: true,
        progressDonasi: true,
        batasWaktu: true,
      },
      take: 6,
    });
  
    // Fetch Aksi Campaigns
    const aksiCampaigns = await prisma.campaignAksi.findMany({
      select: {
        id: true,
        judul: true,
        foto: true,
        targetAksi: true,
        progressAksi: true,
        batasWaktu: true,
      },
      take: 6,
    });
  
    return {
      props: {
        donasiCampaigns: donasiCampaigns.map((campaign) => ({
          ...campaign,
          batasWaktu: campaign.batasWaktu.toISOString().split("T")[0], // Format Date
        })),
        aksiCampaigns: aksiCampaigns.map((campaign) => ({
          ...campaign,
          batasWaktu: campaign.batasWaktu.toISOString().split("T")[0], // Format Date
        })),
      },
    };
  };