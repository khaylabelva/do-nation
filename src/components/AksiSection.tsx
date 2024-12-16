"use client";

import AksiCard from "./AksiCard";
import { useState } from "react";
import { useRouter } from "next/navigation";

const AksiSection: React.FC = () => {
  const router = useRouter();

  const dummyData = [
    {
      id: 1,
      judul: "Ayo Bergerak!",
      foto: "/HeroSectionImage.jpg",
      deskripsi: "Bergerak bersama untuk membantu sesama.",
      penyelenggara: "Futurizzteam",
      targetAksi: 500,
      progressAksi: 250,
      jumlahAksi: 5,
      batasWaktu: new Date("2024-12-31"),
      konversi: 25000,
    },
    {
      id: 2,
      judul: "Indonesia Cegah Stunting",
      foto: "/HeroSectionImage.jpg",
      deskripsi: "Cegah stunting untuk generasi emas Indonesia.",
      penyelenggara: "Bestariteam",
      targetAksi: 400,
      progressAksi: 328,
      jumlahAksi: 3,
      batasWaktu: new Date("2024-12-25"),
      konversi: 25000,
    },
    {
      id: 3,
      judul: "Bantu Anak Sekolah",
      foto: "/HeroSectionImage.jpg",
      deskripsi: "Bantu anak sekolah agar dapat belajar dengan nyaman.",
      penyelenggara: "Educateteam",
      targetAksi: 300,
      progressAksi: 150,
      jumlahAksi: 2,
      batasWaktu: new Date("2024-12-20"),
      konversi: 25000,
    },
    // Tambahkan data lainnya dengan id
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(dummyData.length / 2));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(dummyData.length / 2)) % Math.ceil(dummyData.length / 2));
  };

  const handleCardClick = (id: number) => {
    router.push(`/aksiSosial/${id}`); // Redirect ke halaman berdasarkan id
  };

  return (
    <section className="mt-4 mb-4 relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Aksi Sosial</h2>
        <a href="/HomePage/aksiSosial" className="text-blue-500 text-sm font-semibold hover:underline">
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
          {dummyData.map((item, index) => (
            <div key={index} className="w-1/2 flex-shrink-0 p-2 h-full items-stretch">
              <AksiCard {...item} onClick={() => handleCardClick(item.id)} />
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

export default AksiSection;
