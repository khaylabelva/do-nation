"use client";

import { useEffect, useState } from "react";
import AksiCard from "../../../components/cards/AksiCard";
import Navbar from "@/components/layout/navbar";
import { getActions } from "@/lib/api"; // Path sesuai lokasi file
import BackButton from "@/components/ui/backbutton";

interface Aksi {
  id: number;
  judul: string;
  foto: string;
  deskripsi: string;
  penyelenggara: string;
  targetAksi: number;
  progressAksi: number;
  batasWaktu: string;
  jumlahAksi: number;
  konversi: number;
}

const ActionsPage: React.FC = () => {
  const [aksiData, setAksiData] = useState<Aksi[]>([]);
  const [searchTerm, setSearchTerm] = useState(""); // Untuk pencarian
  const [visibleCount, setVisibleCount] = useState(4); // Jumlah data yang terlihat awal
  const [loading, setLoading] = useState(true);

  // Fetch data dari Prisma
  useEffect(() => {
    const fetchActions = async () => {
      try {
        const actions = await getActions();
        setAksiData(actions);
      } catch (error) {
        console.error("Error fetching actions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActions();
  }, []);

  // Filter data berdasarkan pencarian
  const filteredData = aksiData.filter((item) =>
    item.judul.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fungsi untuk memuat lebih banyak data
  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 4, filteredData.length));
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 pb-8 pt-4">
        <Navbar />
        <p className="text-center text-gray-500 mt-8">Memuat data...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <BackButton/>
        {/* Search Bar */}
        <div className="flex justify-center mt-8 mb-10">
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="Cari Aksi Sosial..."
              className="w-full p-3 pl-10 border border-neutral-500 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update state pencarian
            />
          </div>
        </div>

        {/* Header */}
        <div className="flex flex-col gap-4 mb-6">
          <h1 className="text-4xl font-bold">Aksi Sosial</h1>
        </div>

        {/* Grid Aksi Sosial */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filteredData.slice(0, visibleCount).map((item) => (
            <a
              href={`/action/${item.id}`} // Navigasi ke halaman detail berdasarkan id
              key={item.id}
              className="transition-transform hover:scale-105"
            >
              <AksiCard {...item} />
            </a>
          ))}
        </div>

        {/* Button Load More */}
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

        {/* Jika tidak ada data */}
        {filteredData.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            Tidak ada kampanye yang sesuai dengan pencarian Anda.
          </p>
        )}
      </div>
    </>
  );
};

export default ActionsPage;
