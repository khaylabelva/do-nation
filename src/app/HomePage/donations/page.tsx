"use client";

import { useState } from "react";
import DonasiCard from "../../../components/DonasiCard";
import Navbar from "@/components/layout/navbar";

const DonasiPage: React.FC = () => {
  const initialData = [
    {
      id: 1,
      judul: "Banjir Bandang di Palu",
      foto: "/HeroSectionImage.jpg",
      deskripsi: "Bantu korban banjir bandang yang membutuhkan uluran tangan kita.",
      penyelenggara: "Relawan Palu",
      targetDonasi: 20000000,
      progressDonasi: 12000000,
      batasWaktu: new Date("2024-12-31"),
    },
    {
      id: 2,
      judul: "Pendidikan untuk Anak Indonesia",
      foto: "/HeroSectionImage.jpg",
      deskripsi: "Bantu anak-anak Indonesia mendapatkan pendidikan yang layak.",
      penyelenggara: "Yayasan Cerdas",
      targetDonasi: 30000000,
      progressDonasi: 15000000,
      batasWaktu: new Date("2024-11-30"),
    },
    {
      id: 3,
      judul: "Gempa Bumi Cianjur",
      foto: "/HeroSectionImage.jpg",
      deskripsi: "Bantu pemulihan masyarakat terdampak gempa bumi di Cianjur.",
      penyelenggara: "Relawan Peduli",
      targetDonasi: 10000000,
      progressDonasi: 7000000,
      batasWaktu: new Date("2024-10-31"),
    },
    {
      id: 4,
      judul: "Donasi Buku Sekolah",
      foto: "/HeroSectionImage.jpg",
      deskripsi: "Bantu anak-anak dengan donasi buku sekolah.",
      penyelenggara: "Yayasan Buku",
      targetDonasi: 15000000,
      progressDonasi: 9000000,
      batasWaktu: new Date("2024-09-15"),
    },
    {
      id: 5,
      judul: "Pembangunan Sekolah",
      foto: "/HeroSectionImage.jpg",
      deskripsi: "Bangun sekolah untuk anak-anak di pedesaan.",
      penyelenggara: "BuildSchool",
      targetDonasi: 25000000,
      progressDonasi: 18000000,
      batasWaktu: new Date("2024-08-31"),
    },
    {
      id: 6,
      judul: "Bantuan Makanan Prasejahtera",
      foto: "/HeroSectionImage.jpg",
      deskripsi: "Bantu penyediaan pangan untuk keluarga prasejahtera.",
      penyelenggara: "FoodCare",
      targetDonasi: 20000000,
      progressDonasi: 14000000,
      batasWaktu: new Date("2024-07-20"),
    },
  ];

  const [searchTerm, setSearchTerm] = useState(""); // State untuk pencarian
  const [visibleCount, setVisibleCount] = useState(6); // Jumlah donasi yang ditampilkan awal

  // Filter data berdasarkan pencarian
  const filteredData = initialData.filter((item) =>
    item.judul.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fungsi untuk menambah jumlah item yang ditampilkan
  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 6, filteredData.length));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navbar */}
      <Navbar />

      {/* Search Bar */}
      <div className="flex justify-center mt-8 mb-10">
        <div className="relative w-1/2">
          <input
            type="text"
            placeholder="Cari Kampanye Donasi..."
            className="w-full p-3 pl-10 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => window.history.back()}
          className="text-blue-500 font-semibold hover:underline flex items-center"
        >
          ← Kembali
        </button>
        <h1 className="text-4xl font-bold">Donasi</h1>
      </div>

      {/* Grid Donasi */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.slice(0, visibleCount).map((item) => (
          <a
            href={`/donasi/${item.id}`}
            key={item.id}
            className="transition-transform hover:scale-105"
          >
            <DonasiCard {...item} batasWaktu={item.batasWaktu.toISOString()} />
          </a>
        ))}
      </div>

      {/* Load More Button */}
      {visibleCount < filteredData.length && (
        <div className="text-center mt-8">
          <button
            onClick={handleLoadMore}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold transition duration-300"
          >
            Tampilkan Lebih Banyak
          </button>
        </div>
      )}

      {/* Jika data kosong */}
      {filteredData.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          Tidak ada kampanye yang sesuai dengan pencarian Anda.
        </p>
      )}
    </div>
  );
};

export default DonasiPage;
