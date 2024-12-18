"use server"

import {prisma} from "@/lib/prisma";

export async function getActions() {
  const actions = await prisma.campaignAksi.findMany({
    select: {
      id: true,
      judul: true,
      foto: true,
      deskripsi: true,
      penyelenggara: true,
      targetAksi: true,
      progressAksi: true,
      batasWaktu: true,
      konversi: true,
      aksiList: {
        select: {
          id: true, // Only fetching IDs for aksiList
        },
      },
      pelakuAksiList: {
        select: {
          id: true, // Only fetching IDs for participants
        },
      },
    },
  });

  // Map results to include `jumlahAksi` and `jumlahPartisipan`
  return actions.map((action) => ({
    ...action,
    batasWaktu: action.batasWaktu.toISOString().split("T")[0], // Format Date
    jumlahAksi: action.aksiList.length, // Count aksiList
    jumlahPartisipan: action.pelakuAksiList.length, // Count pelakuAksiList
  }));
}


export async function getDonations() {
  const donations = await prisma.campaignDonasi.findMany({
    select: {
      id: true,
      judul: true,
      foto: true,
      deskripsi: true,
      penyelenggara: true,
      targetDonasi: true,
      progressDonasi: true,
      batasWaktu: true,
    },
  });

  // Map hasil untuk memformat tanggal
  return donations.map((donation) => ({
    ...donation,
    batasWaktu: donation.batasWaktu.toISOString().split("T")[0], // Format Date
  }));
}

export async function getActionsSection() {
  const actions = await prisma.campaignAksi.findMany({
    select: {
      id: true,
      judul: true,
      foto: true,
      deskripsi: true,
      penyelenggara: true,
      targetAksi: true,
      progressAksi: true,
      batasWaktu: true,
      konversi: true,
      aksiList: {
        select: {
          id: true, // Hanya mengambil ID untuk menghitung jumlah aksi
        },
      },
    },
    take: 6, // Ambil 6 aksi untuk carousel
  });

  // Format data jika perlu
  return actions.map((action) => ({
    ...action,
    batasWaktu: action.batasWaktu.toISOString().split("T")[0],
    jumlahAksi: action.aksiList.length, // Hitung jumlah aksi
  }));
}

export async function getDonationsSection() {
  const donations = await prisma.campaignDonasi.findMany({
    select: {
      id: true,
      judul: true,
      foto: true,
      deskripsi: true,
      penyelenggara: true,
      targetDonasi: true,
      progressDonasi: true,
      batasWaktu: true,
    },
    take: 6, // Ambil 6 donasi untuk carousel
  });

  // Map hasil untuk memformat tanggal
  return donations.map((donation) => ({
    ...donation,
    batasWaktu: donation.batasWaktu.toISOString().split("T")[0], // Format Date
  }));
}

export async function getCampaignById(id: number) {
  return prisma.campaignDonasi.findUnique({
    where: { id },
    select: {
      id: true,
      judul: true,
      foto: true,
      deskripsi: true,
      penyelenggara: true,
      targetDonasi: true,
      progressDonasi: true,
    },
  });
}

export async function getDonationCampaignById(id: number) {
  return await prisma.campaignDonasi.findUnique({
    where: { id },
    select: {
      id: true,
      judul: true,
      foto: true,
      deskripsi: true,
      penyelenggara: true,
      targetDonasi: true,
      progressDonasi: true,
    },
  });
}

export async function getAksiByCampaignId(id: number) {
  return await prisma.aksi.findMany({
    where: { campaignId: id },
    select: {
      campaignId: true,
      id: true,
      deskripsi: true,
  },
  });

}

export async function getCampaignAksiById(id: number) {
  const actions = await prisma.campaignAksi.findUnique({
    where: { id },
    select: {
      id: true,
      judul: true,
      foto: true,
      deskripsi: true,
      penyelenggara: true,
      targetAksi: true,
      progressAksi: true,
      batasWaktu: true,
      konversi: true,
      aksiList: {
        select: {
          id: true, // Fetch IDs for aksiList
        },
      },
      pelakuAksiList: {
        select: {
          id: true, // Fetch IDs for pelakuAksiList
        },
      },
    },
  });

  if (!actions) {
    throw new Error("CampaignAksi not found");
  }

  // Map results with transformed properties
  const transformedResult = {
    ...actions,
    batasWaktu: actions.batasWaktu.toISOString().split("T")[0], // Format Date to YYYY-MM-DD
    jumlahAksi: actions.aksiList.length, // Count aksiList entries
    jumlahPartisipan: actions.pelakuAksiList.length, // Count pelakuAksiList entries
  };

  return transformedResult;
}



export async function getUserDonasiByCampaignId(campaignId: number) {
  const userDonasiList = await prisma.userDonasi.findMany({
    where: { campaignId },
    select: {
      id: true,
      userId: true, // Include userId to align with UserDonasi type
      jumlah: true,
      deskripsi: true,
      createdAt: true,
      user: {
        select: { username: true }, // Fetch the username
      },
    },
  });

  return userDonasiList.map((donasi) => ({
    id: donasi.id,
    userId: donasi.userId, // Include userId
    username: donasi.user.username,
    jumlah: donasi.jumlah,
    deskripsi: donasi.deskripsi,
    createdAt: donasi.createdAt.toISOString(),
  }));
}

export async function getUserAksiByCampaignId(campaignId: number) {
  const userAksiList = await prisma.userAksi.findMany({
    where: { campaignId },
    select: {
      id: true,
      deskripsi: true,
      createdAt: true,
      fotoDokumentasi: true,
      user: {
        select: { username: true }, // Fetch the username
      },
    },
  });

  // Map the data to include `username` for easier access
  return userAksiList.map((aksi) => ({
    id: aksi.id,
    username: aksi.user.username, // Extract username from the user relation
    deskripsi: aksi.deskripsi,
    createdAt: aksi.createdAt.toISOString(),
    fotoDokumentasi: aksi.fotoDokumentasi,
  }));
}