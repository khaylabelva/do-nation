"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/navbar";
import AksiCard from "@/components/cards/AksiCard";
import { toast } from "sonner";
import HistoryDonasiCard from "@/components/cards/HistoryDonasiCard";
import HistoryAksiCard from "@/components/cards/HistoryAksiCard";

const History = () => {
  const [selectedType, setSelectedType] = useState<"donasi" | "aksi">("donasi");

  const [donations, setDonations] = useState<any[]>([]);
  const [actions, setActions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch user's history
  useEffect(() => {
    const fetchUserHistory = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/history");
        if (!res.ok) throw new Error("Failed to fetch user history");

        const data = await res.json();

        setDonations(data.donasiHistory || []);
        setActions(data.aksiHistory || []);
      } catch (error) {
        console.error("Error fetching user history:", error);
        toast.error("Failed to load history data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserHistory();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 overflow-hidden">
      <Navbar />

      {/* Main Content */}
      <div className="flex-grow p-6 px-12 flex gap-8">
        {/* Summary Section */}
        <div className="min-w-max space-y-6">
          <h2 className="text-2xl font-bold text-blue-600">Rekapitulasi</h2>

          {/* Total Donasi */}
          <div className="bg-white p-6 pr-20 rounded-2xl border flex items-center">
            <div className="bg-blue-100 p-3 rounded-full">
              <span className="text-blue-600 text-2xl">💙</span>
            </div>
            <div className="ml-4">
              <p className="text-gray-600">Total Donasi:</p>
              <p className="text-xl font-bold">
                Rp
                {donations
                  .reduce((total, donation) => total + donation.jumlah, 0)
                  .toLocaleString("id-ID")}
              </p>
            </div>
          </div>

          {/* Total Aksi */}
          <div className="bg-white p-6 rounded-2xl border flex items-center">
            <div className="bg-yellow-100 p-3 rounded-full">
              <span className="text-yellow-600 text-2xl">⭐</span>
            </div>
            <div className="ml-4">
              <p className="text-gray-600">Total Aksi:</p>
              <p className="text-xl font-bold">{actions.length} Aksi</p>
            </div>
          </div>
        </div>

        {/* History Section */}
        <div className="w-3/4">
          <div className="flex flex-row items-center">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Riwayat</h2>

            {/* Styled Dropdown */}
            <div className="relative ml-4 mb-4">
              <select
                className="block appearance-none w-40 bg-gray-50 border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none"
                value={selectedType}
                onChange={(e) =>
                  setSelectedType(e.target.value as "donasi" | "aksi")
                }
              >
                <option value="donasi" className="text-gray-700">
                  Donasi
                </option>
                <option value="aksi" className="text-gray-700">
                  Aksi
                </option>
              </select>
            </div>
          </div>

          {/* Conditional Rendering */}
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : (
            <div
              className="flex overflow-x-auto space-x-6 p-2 hide-scrollbar w-full"
              style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
            >
              {selectedType === "donasi" ? (
                donations.length > 0 ? (
                  donations.slice().reverse().map((donation) => (
                    <div
                      key={donation.id}
                      className="flex-shrink-0 w-[380px] h-[350px]"
                    >
                      <HistoryDonasiCard
                        id={donation.campaignId}
                        judul={donation.campaign.judul}
                        foto={donation.campaign.foto}
                        deskripsi={donation.deskripsi}
                        penyelenggara={donation.campaign.penyelenggara}
                        jumlah={donation.jumlah}
                        createdAt={donation.createdAt}
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No donation history available.</p>
                )
              ) : actions.length > 0 ? (
                actions.slice().reverse().map((action) => (
                  <div
                    key={action.id}
                    className="flex-shrink-0 w-[600px] h-[172px]"
                  >
                    <HistoryAksiCard
                      id={action.campaignId}
                      judul={action.campaign.judul}
                      foto={action.campaign.foto}
                      deskripsi={action.deskripsi}
                      penyelenggara={action.campaign.penyelenggara}
                      targetAksi={action.campaign.targetAksi}
                      progressAksi={action.campaign.progressAksi}
                      createdAt={action.createdAt}
                    />
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No action history available.</p>
              )}
            </div>
          )}
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
