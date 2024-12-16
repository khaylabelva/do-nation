"use client";

import { useState } from "react";
import DonasiCard from "./DonasiCard";

const DonasiSection: React.FC = () => {
  const dummyData = [
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
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(dummyData.length / 3));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(dummyData.length / 3)) % Math.ceil(dummyData.length / 3));
  };

  return (
    <section className="mt-16 px-4 relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Donasi</h2>
        <a href="/HomePage/donasi" className="text-blue-500 text-sm font-semibold hover:underline">
          Lihat Selengkapnya
        </a>
      </div>

      {/* Carousel Container */}
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {dummyData.map((item) => (
            <div key={item.id} className="w-1/3 flex-shrink-0 p-2 h-full items-stretch">
              <DonasiCard {...item} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute left-0 right-0 -bottom-12 flex justify-center gap-4">
        <button
          onClick={handlePrev}
          className="w-10 h-10 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 flex items-center justify-center"
        >
          ←
        </button>
        <button
          onClick={handleNext}
          className="w-10 h-10 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 flex items-center justify-center"
        >
          →
        </button>
      </div>
    </section>
  );
};

export default DonasiSection;
