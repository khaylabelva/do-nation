'use client';

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/navbar";
import { UserCircle } from "lucide-react"; // Lucide-react for profile icon

interface LeaderboardEntry {
  username: string;
  total: number;
}

const LeaderboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"donasi" | "aksi">("donasi");
  const [data, setData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/leaderboard/${activeTab === "donasi" ? "donasi" : "aksi"}`
      );
      const result = await res.json();
      setData(result);
    } catch (error) {
      console.error("Failed to fetch leaderboard:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [activeTab]);

  const getTop3Title = (index: number) => {
    if (activeTab === "donasi") {
      return [
        "Si Paling Donatur",
        "Si Suka Berbagi",
        "Si Demen Membantu",
      ][index];
    } else {
      return [
        "Si Paling Aksi",
        "Si Banyak Gerak",
        "Si Rajin Foto",
      ][index];
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-8">
        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-white rounded-full p-1 border">
            <button
              onClick={() => setActiveTab("donasi")}
              className={`px-6 py-2 rounded-full font-semibold ${
                activeTab === "donasi" ? "bg-blue-500 text-white" : "text-gray-600"
              }`}
            >
              Donasi
            </button>
            <button
              onClick={() => setActiveTab("aksi")}
              className={`px-6 py-2 rounded-full font-semibold ${
                activeTab === "aksi" ? "bg-blue-500 text-white" : "text-gray-600"
              }`}
            >
              Aksi
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <p className="text-center text-gray-500">Memuat data...</p>
        ) : (
          <>
            {/* Podium for Top 3 */}
            <div className="flex justify-center items-end gap-4 mb-8">
                {/* 2nd Place */}
                {data[1] && (
                    <div className="flex flex-col items-center">
                    <UserCircle size={50} className="text-[#4C84F6] mb-2" />
                    <p className="text-sm font-bold text-gray-800">{data[1].username}</p>
                    <p className="text-sm text-gray-600 mb-2">
                        {activeTab === "donasi"
                        ? `Rp${data[1].total.toLocaleString()}`
                        : `${data[1].total} Aksi`}
                    </p>
                    <div className="bg-[#4C84F6] w-20 h-28 flex items-center justify-center text-white text-xl font-bold rounded-t-lg shadow-md">
                        2
                    </div>
                    </div>
                )}

                {/* 1st Place */}
                {data[0] && (
                <div className="flex flex-col items-center relative">
                    {/* Crown Icon */}
                    <div className="absolute -top-6">
                    <span className="text-yellow-400 text-4xl">&#x1F451;</span> {/* 👑 Emoji */}
                    </div>
                    {/* User Icon */}
                    <UserCircle size={60} className="text-yellow-400 mb-2" />
                    <p className="text-sm font-bold text-gray-800">{data[0].username}</p>
                    <p className="text-sm text-gray-600 mb-2">
                    {activeTab === "donasi"
                        ? `Rp${data[0].total.toLocaleString()}`
                        : `${data[0].total} Aksi`}
                    </p>
                    {/* Podium Base */}
                    <div className="bg-yellow-400 w-24 h-36 flex items-center justify-center text-white text-2xl font-bold rounded-t-lg shadow-md">
                    1
                    </div>
                </div>
                )}


                {/* 3rd Place */}
                {data[2] && (
                    <div className="flex flex-col items-center">
                    <UserCircle size={50} className="text-blue-300 mb-2" />
                    <p className="text-sm font-bold text-gray-800">{data[2].username}</p>
                    <p className="text-sm text-gray-600 mb-2">
                        {activeTab === "donasi"
                        ? `Rp${data[2].total.toLocaleString()}`
                        : `${data[2].total} Aksi`}
                    </p>
                    <div className="bg-blue-300 w-20 h-24 flex items-center justify-center text-white text-xl font-bold rounded-t-lg shadow-md">
                        3
                    </div>
                    </div>
                )}
                </div>

                {/* Leaderboard for Rank 1 and onward */}
                <div className="max-w-2xl mx-auto space-y-4">
                {data.map((entry, index) => (
                    <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-white rounded-xl shadow-md border"
                    >
                    {/* Left Section */}
                    <div className="flex items-center">
                        <div
                        className={`w-10 h-10 flex items-center justify-center rounded-full font-bold text-white ${
                            index === 0
                            ? "bg-yellow-400"
                            : index === 1
                            ? "bg-[#4C84F6]"
                            : index === 2
                            ? "bg-blue-300"
                            : "bg-gray-300"
                        }`}
                        >
                        {index + 1}
                        </div>
                        <div className="ml-4">
                        <h3 className="text-lg font-bold text-gray-800">{entry.username}</h3>
                        <p className="text-sm text-gray-600">
                            {index < 3 ? getTop3Title(index) : "Menaiki Daun Leaderboard"}
                        </p>
                        </div>
                    </div>
                    {/* Right Section */}
                    <div className="text-right">
                        <p className="text-gray-500 text-sm">
                        {activeTab === "donasi" ? "Total Donasi" : "Total Aksi"}
                        </p>
                        <p className="font-bold text-lg text-gray-800">
                        {activeTab === "donasi"
                            ? `Rp${entry.total.toLocaleString()}`
                            : `${entry.total} Aksi`}
                        </p>
                    </div>
                    </div>
                ))}
                </div>
          </>
        )}
      </div>
    </>
  );
};

export default LeaderboardPage;
