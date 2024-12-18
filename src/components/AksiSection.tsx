"use client";

import AksiCard from "./cards/AksiCard";
import { useState, useEffect } from "react";

const AksiSection: React.FC = () => {
  interface Action {
    id: number;
    judul: string;
    foto: string;
    deskripsi: string;
    penyelenggara: string;
    targetAksi: number;
    progressAksi: number;
    konversi: number;
    batasWaktu: string;
    aksiList: { /* Structure of aksiList items */ }[];
    pelakuAksiList: { /* Structure of pelakuAksiList items */ }[];
  }

  const [actions, setActions] = useState<Action[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch all campaignAksi from API
  useEffect(() => {
    const fetchActions = async () => {
      try {
        const res = await fetch("/api/actions");
        if (!res.ok) throw new Error("Failed to fetch actions");
        const data = await res.json();
        setActions(data);
      } catch (error) {
        console.error("Error fetching actions:", error);
      }
    };

    fetchActions();
  }, []);

  // Function for carousel navigation
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(actions.length / 2));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(actions.length / 2)) % Math.ceil(actions.length / 2));
  };

  return (
    <section className="mt-4 mb-4 relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Aksi Sosial</h2>
        <a href="/homepage/actions" className="text-blue-500 text-sm font-semibold hover:underline">
          Lihat Selengkapnya
        </a>
      </div>

      {/* Carousel Container */}
      <div className="relative overflow-hidden gap-4">
        <div
          className="flex transition-transform duration-700 ease-in-out mb-8"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {actions.map((item) => (
            <div key={item.id} className="w-1/2 flex-shrink-0 p-2 h-full items-stretch">
              <AksiCard
                id={item.id}
                judul={item.judul}
                foto={item.foto}
                deskripsi={item.deskripsi}
                penyelenggara={item.penyelenggara}
                targetAksi={item.targetAksi}
                progressAksi={item.progressAksi}
                konversi={item.konversi}
                batasWaktu={item.batasWaktu} 
                jumlahAksi={item.aksiList.length}/>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute left-0 right-0 -bottom-12 flex justify-center gap-4 mt-4">
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
