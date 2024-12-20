"use client";

import Navbar from "@/components/layout/navbar";
import BackButton from "@/components/ui/backbutton";
import Placeholder from "@Images/image-placeholder.png"; // Replace with the actual image path
import Image from "next/image";
import ProgressBar from "@/components/ui/progressbar";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getCampaignAksiById, getUserAksiByCampaignId } from "@/lib/api";
import CompactCard from "@/components/cards/CompactCard";
import { toast } from "sonner"; // Import toast library
import { set } from "zod";

interface Campaign {
  id: number;
  judul: string;
  foto: string;
  deskripsi: string;
  penyelenggara: string;
  targetAksi: number;
  progressAksi: number;
  konversi: number;
  batasWaktu: string;
  jumlahAksi: number;
  jumlahPartisipan: number;
}

interface UserAksi {
  id: number;
  username: string;
  deskripsi: string;
  createdAt: string;
  fotoDokumentasi: string;
}

const ActionPage: React.FC = () => {
  const params = useParams();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [userAksiList, setIsLoggedInAksiList] = useState<UserAksi[]>([]);
  const [loading, setLoading] = useState(true);
  const donationContainerRef = useRef<HTMLDivElement>(null);

  // Simulated logged-in state (replace with actual authentication state)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchCampaignData = async () => {
      try {
        setLoading(true);

        // Fetch campaign details
        const campaignId = parseInt(params.id as string, 10);
        const campaignData = await getCampaignAksiById(campaignId);
        setCampaign(campaignData);

        // Fetch user actions related to this campaign
        const aksiData = await getUserAksiByCampaignId(campaignId);
        setIsLoggedInAksiList(aksiData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaignData();

    const fetchUser = async () => {
      try {
        const response = await fetch('/api/auth/user', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          setIsLoggedIn(false); // No user session
          return;
        }

        setIsLoggedIn(true); // User session exists

      } catch (error) {
        console.error('Error fetching user:', error);
        setIsLoggedIn(false); // No user session
      }
    };

    fetchUser();
  }, [params.id]);

  const scrollDonations = (direction: "left" | "right") => {
    if (donationContainerRef.current) {
      const scrollAmount = 300;
      donationContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleMulaiAksiClick = () => {
    console.log(isLoggedIn);
    if (!isLoggedIn) {
      toast.error("Kamu harus login terlebih dahulu!");
      return;
    }
    // Proceed to documentation page
    window.location.href = `/action/${params.id}/documentation`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-600">Memuat data...</h1>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-600">Aksi tidak ditemukan</h1>
      </div>
    );
  }

  const remainingDays = Math.max(
    0,
    Math.ceil(
      (new Date(campaign.batasWaktu).getTime() - new Date().getTime()) /
        (1000 * 60 * 60 * 24)
    )
  );

  const progressPercentage = Math.min(
    (campaign.progressAksi / campaign.targetAksi) * 100,
    100
  );

  return (
    <div className="bg-neutral-50 min-h-screen flex flex-col overflow-hidden">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl gap-16">
          {/* Left Image Section with CompactCard */}
          <div className="relative w-full md:w-[50%] rounded-t-[60px] overflow-hidden">
            <Image
              src={campaign.foto || Placeholder}
              alt={campaign.judul}
              className="object-cover w-full h-auto"
              width={400}
              height={300}
            />

            {/* CompactCard Section */}
            <div className="relative mt-4">
              <h2 className="text-lg font-bold mb-4">Partisipasi Terbaru</h2>

              <div className="flex items-center relative">
                {/* Left Arrow */}
                <button
                  onClick={() => scrollDonations("left")}
                  className="absolute left-0 z-10 bg-white rounded-full shadow-md p-2 flex items-center justify-center w-8 h-8 transform -translate-y-1/2 top-1/2"
                >
                  &#9664;
                </button>

                {/* Scrollable CompactCard List */}
                <div
                  ref={donationContainerRef}
                  className="flex overflow-x-auto hide-scrollbar space-x-6 px-10 py-2"
                  style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
                >
                  {userAksiList.map((aksi) => (
                    <CompactCard
                      key={aksi.id}
                      username={aksi.username}
                      deskripsi={aksi.deskripsi}
                      jumlah={campaign.konversi / campaign.jumlahAksi}
                      createdAt={aksi.createdAt}
                    />
                  ))}
                </div>

                {/* Right Arrow */}
                <button
                  onClick={() => scrollDonations("right")}
                  className="absolute right-0 z-10 bg-white rounded-full shadow-md p-2 flex items-center justify-center w-8 h-8 transform -translate-y-1/2 top-1/2"
                >
                  &#9654;
                </button>
              </div>
            </div>
          </div>

          {/* Right Content Section */}
          <div className="w-full md:w-3/5 space-y-4">
            <BackButton />
            <h1 className="text-2xl md:text-4xl font-bold">{campaign.judul}</h1>
            <div>
              <div className="text-3xl md:text-3xl font-bold text-[#4C84F6]">
                {campaign.progressAksi} Aksi
              </div>
              <p className="text-sm md:text-base text-neutral-400">
                Terkumpul dari {campaign.targetAksi} Aksi
              </p>
            </div>

            {/* Progress Bar */}
            <ProgressBar value={progressPercentage} />

            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-6 mt-4 p-4 border border-neutral-300 rounded-xl">
              <div className="flex flex-row items-center justify-center gap-1">
                <div className="text-5xl">🌟</div>
                <div className="flex flex-col items-start">
                  <span className="text-lg md:text-xl font-bold">{campaign.progressAksi}</span>
                  <span className="text-sm text-neutral-500">Aksi Selesai</span>
                </div>
              </div>
              <div className="flex flex-row items-center justify-center gap-1">
                <div className="text-5xl">⏰</div>
                <div className="flex flex-col items-start">
                  <span className="text-lg md:text-xl font-bold">{remainingDays}</span>
                  <span className="text-sm text-neutral-500">Hari Tersisa</span>
                </div>
              </div>
              <div className="flex flex-row items-center justify-center gap-1">
                <div className="text-5xl">👤</div>
                <div className="flex flex-col items-start">
                  <span className="text-lg md:text-xl font-bold">{campaign.jumlahPartisipan}</span>
                  <span className="text-sm text-neutral-500">Partisipan</span>
                </div>
              </div>
            </div>

            {/* Action Section */}
            <div className="flex flex-col border rounded-xl border-neutral-300 p-4 gap-4">
              <div className="flex flex-1 flex-row gap-2">
                {/* Conversion Rate */}
                <div className="bg-blue-50 p-4 rounded-xl flex flex-row items-start gap-4">
                  <Image
                    src={Placeholder}
                    alt="Placeholder"
                    className="object-cover w-12 h-12 rounded-full"
                  />
                  <div className="flex flex-col">
                    <div className="text-black text-2xl font-bold">
                      Rp{campaign.konversi.toLocaleString()}
                    </div>
                    <p className="text-xs font-medium text-neutral-500">
                      Untuk {campaign.jumlahAksi} aksi yang selesai dilakukan
                    </p>
                  </div>
                </div>

                {/* Organizer Info */}
                <div className="bg-gray-100 p-4 rounded-xl flex flex-col flex-1 items-start font-semibold">
                  <div className="text-2xl overflow-hidden whitespace-nowrap text-ellipsis w-[160px]">{campaign.penyelenggara}</div>
                  <p className="text-xs font-medium text-neutral-500">
                    Penggalang Aksi
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleMulaiAksiClick}
                className="w-full bg-[#4C84F6] text-white py-3 rounded-full text-lg text-center font-semibold transition-transform duration-300 transform hover:scale-105 hover:shadow-lg hover:bg-[#2C63D2]"
              >
                Mulai Aksi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionPage;
