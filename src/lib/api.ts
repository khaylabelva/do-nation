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
          id: true, // Hanya mengambil ID untuk menghitung jumlah aksi
        },
      },
    },
  });

  // Map hasil untuk menambahkan panjang `aksiList`
  return actions.map((action) => ({
    ...action,
    batasWaktu: action.batasWaktu.toISOString().split("T")[0], // Format Date
    jumlahAksi: action.aksiList.length, // Hitung jumlah aksi
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
  return await prisma.campaignAksi.findUnique({
    where: { id },
    select: {
      judul: true,
      foto: true,
      deskripsi: true,
      penyelenggara: true,
      targetAksi: true,
      progressAksi: true,
      pelakuAksiList: true, // Menghitung jumlah partisipan
      batasWaktu: true,
      konversi: true,
    },
  });
}

