"use client";

import { useState, useEffect } from "react";
import DonasiCard from "../../../components/DonasiCard";
import Navbar from "@/components/layout/navbar";
import { getDonations } from "@/lib/api"; // Import fungsi getDonations
import BackButton from "@/components/ui/backbutton";

const DonationsPage: React.FC = () => {
  interface Donation {
    batasWaktu: string;
    id: number;
    judul: string;
    foto: string;
    deskripsi: string;
    penyelenggara: string;
    targetDonasi: number;
    progressDonasi: number;
  }
  
  const [donations, setDonations] = useState<Donation[]>([]);
  const [searchTerm, setSearchTerm] = useState(""); // State untuk pencarian
  const [visibleCount, setVisibleCount] = useState(6); // Jumlah donasi yang ditampilkan awal

  // Ambil data donasi dari database
  useEffect(() => {
    const fetchDonations = async () => {
      const data = await getDonations();
      setDonations(data);
    };

    fetchDonations();
  }, []);

  // Filter data berdasarkan pencarian
  const filteredData = donations.filter((item) =>
    item.judul.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fungsi untuk menambah jumlah item yang ditampilkan
  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 6, filteredData.length));
  };

  return (
    <>
      {/* Navbar */}
      <Navbar />
      
      <div className="container mx-auto px-4 pb-8 pt-4">
        
        <BackButton/>
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
        <div className="flex flex-col gap-4 mb-6">
          <h1 className="text-4xl font-bold">Donasi</h1>
        </div>

        {/* Grid Donasi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.slice(0, visibleCount).map((item) => (
            <a
              href={`/donation/${item.id}`}
              key={item.id}
              className="transition-transform hover:scale-105"
            >
              <DonasiCard {...item} />
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
    </>
  );
};

export default DonationsPage;
