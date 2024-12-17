'use client'

import { useState } from "react";
import Navbar from "@/components/layout/navbar";
import DonasiCard from "@/components/DonasiCard";
import AksiCard from "@/components/AksiCard";

const History = () => {
  const [selectedType, setSelectedType] = useState<"donasi" | "aksi">("donasi");

  const donations = [
    {
      id: 1,
      judul: "Banjir Bandang di Palu",
      totalDonation: "25.000",
      daysLeft: 7,
      imageSrc: "./flood.jpg",
      deskripsi: "Deskripsi singkat tentang aksi Banjir Bandang di Palu.",
      penyelenggara: "Penyelenggara 1",
      targetDonasi: 100000,
      progressDonasi: 25000,
      batasWaktu: "2024-12-31",
    },
    {
      id: 2,
      judul: "Gempa Bumi di Lombok",
      totalDonation: "50.000",
      daysLeft: 10,
      imageSrc: "./earthquake.jpg",
      deskripsi: "Deskripsi singkat tentang aksi Gempa Bumi di Lombok.",
      penyelenggara: "Penyelenggara 2",
      targetDonasi: 100000,
      progressDonasi: 50000,
      batasWaktu: "2024-12-31",
    },
    {
      id: 3,
      judul: "Kebakaran Hutan di Kalimantan",
      totalDonation: "75.000",
      daysLeft: 15,
      imageSrc: "./fire.jpg",
      deskripsi: "Deskripsi singkat tentang aksi Kebakaran Hutan di Kalimantan.",
      penyelenggara: "Penyelenggara 3",
      targetDonasi: 100000,
      progressDonasi: 75000,
      batasWaktu: "2024-12-31",
    },
  ];

  const actions = [
    {
      id: 1,
      judul: "Kegiatan Bersih Sungai",
      foto: "./flood.jpg",
      deskripsi: "Aksi lingkungan untuk kebersihan sungai.",
      penyelenggara: "Organisasi Lingkungan",
      targetAksi: 200,
      progressAksi: 150,
      jumlahAksi: 150,
      konversi: 1500000,
      batasWaktu: "2024-12-31",
    },
    {
      id: 2,
      judul: "Donor Darah Massal",
      foto: "./papua.jpg",
      deskripsi: "Aksi kesehatan untuk ketersediaan darah.",
      penyelenggara: "Palang Merah",
      targetAksi: 100,
      progressAksi: 80,
      jumlahAksi: 80,
      konversi: 800000,
      batasWaktu: "2024-12-31",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 overflow-hidden">
      <Navbar />

      {/* Konten Utama */}
      <div className="flex-grow p-6 px-12 flex gap-8">
        {/* Rekapitulasi (Kiri) */}
        <div className="w-1/4 space-y-6">
          <h2 className="text-2xl font-bold text-blue-600">Rekapitulasi</h2>

          {/* Total Donasi */}
          <div className="bg-white p-6 rounded-2xl border flex items-center">
            <div className="bg-blue-100 p-3 rounded-full">
              <span className="text-blue-600 text-2xl">💙</span>
            </div>
            <div className="ml-4">
              <p className="text-gray-600">Total Donasi:</p>
              <p className="text-xl font-bold">Rp25.000</p>
            </div>
          </div>

          {/* Total Aksi */}
          <div className="bg-white p-6 rounded-2xl border flex items-center">
            <div className="bg-yellow-100 p-3 rounded-full">
              <span className="text-yellow-600 text-2xl">⭐</span>
            </div>
            <div className="ml-4">
              <p className="text-gray-600">Total Aksi:</p>
              <p className="text-xl font-bold">20 Aksi</p>
            </div>
          </div>
        </div>

        {/* Riwayat (Kanan) */}
        <div className="w-3/4">
          <div className="flex flex-row">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Riwayat</h2>

            {/* Styled Dropdown */}
            <div className="relative ml-4 mb-4">
              <select
                className="block appearance-none w-40 bg-gray-50 border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as "donasi" | "aksi")}
              >
                <option value="donasi" className="text-gray-700">Donasi</option>
                <option value="aksi" className="text-gray-700">Aksi</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                {/* Dropdown Icon */}
                <svg
                  className="h-5 w-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06-.02L10 10.88l3.71-3.7a.75.75 0 011.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.25a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

          </div>
          

          {/* Conditional Rendering */}
          <div className="flex overflow-x-auto space-x-6 p-2 hide-scrollbar w-full"
          style={{
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}>
            {selectedType === "donasi"
              ? donations.map((donation) => (
                  <div
                    key={donation.id}
                    className="flex-shrink-0 w-[380px] h-[350px]"
                  >
                    <DonasiCard
                      id={donation.id}
                      judul={donation.judul}
                      foto={donation.imageSrc}
                      deskripsi={donation.deskripsi}
                      penyelenggara={donation.penyelenggara}
                      targetDonasi={donation.targetDonasi}
                      progressDonasi={donation.progressDonasi}
                      batasWaktu={donation.batasWaktu}
                    />
                  </div>
                ))
              : actions.map((action) => (
                  <div
                    key={action.id}
                    className="flex-shrink-0 w-[600px] h-[172px]"
                  >
                    <AksiCard
                      id={action.id}
                      judul={action.judul}
                      foto={action.foto}
                      deskripsi={action.deskripsi}
                      penyelenggara={action.penyelenggara}
                      targetAksi={action.targetAksi}
                      progressAksi={action.progressAksi}
                      jumlahAksi={action.jumlahAksi}
                      konversi={action.konversi}
                      batasWaktu={action.batasWaktu}
                    />
                  </div>
                ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-600 text-white p-6">
        <p>
          <span className="font-bold">DoNation</span> - Satu Platform, Ribuan
          Kebaikan. Mulai Donasi Sekarang!
        </p>
      </footer>
    </div>
  );
};

export default History;
