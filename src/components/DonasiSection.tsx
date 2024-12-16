"use client";

import DonasiCard from "./DonasiCard";
import { useState, useEffect } from "react";
import { getDonationsSection } from "@/lib/api"; // Import fungsi getDonations

const DonasiSection: React.FC = () => {
  interface Donation {
    id: number;
    judul: string;
    foto: string;
    deskripsi: string;
    penyelenggara: string;
    targetDonasi: number;
    progressDonasi: number;
    batasWaktu: string;
  }
  
  const [donations, setDonations] = useState<Donation[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch data dari database saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchDonations = async () => {
      const data = await getDonationsSection();
      setDonations(data);
    };

    fetchDonations();
  }, []);

  // Fungsi untuk navigasi carousel ke kanan
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(donations.length / 3));
  };

  // Fungsi untuk navigasi carousel ke kiri
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(donations.length / 3)) % Math.ceil(donations.length / 3));
  };

  return (
    <section className="my-16 px-4 relative mb-32">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Donasi</h2>
        <a href="/homepage/donations" className="text-blue-500 text-sm font-semibold hover:underline">
          Lihat Selengkapnya
        </a>
      </div>

      {/* Carousel Container */}
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out mb-8"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {donations.map((item) => (
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
