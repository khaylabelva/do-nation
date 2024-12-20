"use client";

import Navbar from "@/components/layout/navbar";
import BackButton from "@/components/ui/backbutton";
import Placeholder from "@Images/image-placeholder.png";
import Image from "next/image";
import ProgressBar from "@/components/ui/progressbar";
import UnicefIcon from "@Images/unicef-logo.png";
import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { getCampaignById, getUserDonasiByCampaignId } from "@/lib/api";
import CompactCard from "@/components/cards/CompactCard";

interface Campaign {
  id: number;
  judul: string;
  foto: string;
  deskripsi: string;
  penyelenggara: string;
  targetDonasi: number;
  progressDonasi: number;
}

interface UserDonasi {
  id: number;
  username: string;
  jumlah: number;
  deskripsi: string;
  createdAt: string;
}

const DonationPage: React.FC = () => {
  const params = useParams();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [userDonasiList, setUserDonasiList] = useState<UserDonasi[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulate logged-in state

  const donationContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCampaignData = async () => {
      try {
        setLoading(true);
        const campaignId = parseInt(params.id as string, 10);

        const campaignData = await getCampaignById(campaignId);
        setCampaign(campaignData);

        const donasiData = await getUserDonasiByCampaignId(campaignId);
        setUserDonasiList(donasiData);
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

  const handleDonationClick = () => {
    if (!isLoggedIn) {
      toast.error("Kamu harus login terlebih dahulu!");
      return;
    }
    // Navigate to the payment page
    window.location.href = `/donation/${campaign?.id}/payment`;
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
        <h1 className="text-2xl font-bold text-gray-600">Campaign not found</h1>
      </div>
    );
  }

  const progressPercentage = Math.min(
    (campaign.progressDonasi / campaign.targetDonasi) * 100,
    100
  );

  return (
    <div className="bg-neutral-50 min-h-screen flex flex-col overflow-hidden">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="flex flex-col md:flex-row w-full max-w-6xl gap-16 relative">
          {/* Left Image Section with Donation List */}
          <div className="relative w-full md:w-[50%] rounded-t-[60px] overflow-hidden">
            <Image
              src={campaign.foto || Placeholder}
              alt={campaign.judul}
              className="object-cover w-full h-auto"
              width={400}
              height={300}
            />

            {/* Donation List Section */}
            <div className="relative mt-4">
              <h2 className="text-xl font-bold mb-2">Donasi Terbaru</h2>

              <div className="flex items-center relative">
                {/* Left Arrow */}
                <button
                  onClick={() => scrollDonations("left")}
                  className="absolute left-0 z-10 bg-white rounded-full shadow-md p-2 flex items-center justify-center w-8 h-8 transform -translate-y-1/2 top-1/2"
                >
                  &#9664;
                </button>

                {/* Scrollable Donation List */}
                <div
                  ref={donationContainerRef}
                  className="flex overflow-x-auto hide-scrollbar space-x-6 px-10 py-2"
                  style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
                >
                  {userDonasiList.slice().reverse().map((donasi) => (
                    <CompactCard
                      key={donasi.id}
                      username={donasi.username}
                      deskripsi={donasi.deskripsi}
                      jumlah={donasi.jumlah}
                      createdAt={donasi.createdAt}
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
                Rp{campaign.progressDonasi.toLocaleString()}
              </div>
              <p className="text-sm md:text-base text-neutral-400">
                Terkumpul dari Rp{campaign.targetDonasi.toLocaleString()}
              </p>
            </div>
            <ProgressBar value={progressPercentage} />
            <div className="flex items-center gap-4 mt-6 p-4 border border-neutral-300 rounded-xl shadow-sm">
              <Image
                src={UnicefIcon}
                alt="Unicef Indonesia"
                className="w-12 h-12 object-cover rounded-full"
                width={48}
                height={48}
              />
              <div>
                <span className="text-lg md:text-xl font-bold text-[#4C84F6]">
                  {campaign.penyelenggara}
                </span>
              </div>
            </div>
            <div className="border border-neutral-300 rounded-xl p-4 bg-white shadow-sm">
              <h2 className="font-bold text-lg md:text-xl mb-2">
                Tentang Penggalangan Dana
              </h2>
              <p className="text-sm md:text-base text-neutral-600 leading-relaxed">
                {campaign.deskripsi}
              </p>
            </div>
            <button
              onClick={handleDonationClick}
              className="w-full text-center bg-[#4C84F6] text-white py-3 rounded-full text-lg font-semibold transition-transform duration-300 transform hover:scale-105 hover:shadow-lg hover:bg-[#2C63D2]"
            >
              Donasi Sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationPage;
