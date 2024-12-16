"use client";

import AksiCard from "./AksiCard";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getActionsSection } from "@/lib/api"; // Import fungsi getActions

const AksiSection: React.FC = () => {
  const router = useRouter();

  interface Action {
    batasWaktu: string;
    jumlahAksi: number;
    id: number;
    judul: string;
    foto: string;
    deskripsi: string;
    penyelenggara: string;
    targetAksi: number;
    progressAksi: number;
    konversi: number;
    aksiList: {
      // Define the structure of aksiList items here
    }[];
  }
  
  const [actions, setActions] = useState<Action[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch data dari database saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchActions = async () => {
      const data = await getActionsSection();
      setActions(data);
    };

    fetchActions();
  }, []);

  // Fungsi untuk navigasi carousel ke kanan
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(actions.length / 2));
  };

  // Fungsi untuk navigasi carousel ke kiri
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(actions.length / 2)) % Math.ceil(actions.length / 2));
  };

  // Fungsi untuk mengarahkan ke halaman detail aksi
  const handleCardClick = (id: number) => {
    router.push(`/action/${id}`); // Redirect ke halaman berdasarkan id
  };

  return (
    <section className="mt-4 mb-4 relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Aksi Sosial</h2>
        <a href="/home/aksisosial" className="text-blue-500 text-sm font-semibold hover:underline">
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
          {actions.map((item, index) => (
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
