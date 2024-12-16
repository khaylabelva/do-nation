"use client";

import Navbar from "@/components/layout/navbar";
import BackButton from "@/components/ui/backbutton";
import Placeholder from "@Images/image-placeholder.png"; // Replace with the actual image path
import Image from "next/image";
import ProgressBar from "@/components/ui/progressbar";
import UnicefIcon from "@Images/unicef-logo.png";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Import the useParams hook
import { getCampaignById } from "@/lib/api";

interface Campaign {
  id: number;
  judul: string;
  foto: string;
  deskripsi: string;
  penyelenggara: string;
  targetDonasi: number;
  progressDonasi: number;
}

const DonationPage: React.FC = () => {
  const params = useParams(); // Dynamically access route parameters
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        setLoading(true);
        const campaignId = parseInt(params.id as string, 10); // Parse the dynamic route parameter
        const data = await getCampaignById(campaignId);
        setCampaign(data);
      } catch (error) {
        console.error("Error fetching campaign data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [params.id]);

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
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl gap-16">
          {/* Left Image Section */}
          <div className="w-full md:w-[50%] rounded-[60px] overflow-hidden">
            <Image
              src={campaign.foto || Placeholder}
              alt={campaign.judul}
              className="object-cover w-full h-auto"
              width={400}
              height={300}
            />
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
                Tentang Penggalang Dana
              </h2>
              <p className="text-sm md:text-base text-neutral-600 leading-relaxed">
                {campaign.deskripsi}
              </p>
            </div>
            <a
              href={`/donation/${campaign.id}/payment`}
              className="block text-center bg-[#4C84F6] text-white py-3 rounded-full text-lg font-semibold transition-transform duration-300 transform hover:scale-105 hover:shadow-lg hover:bg-[#2C63D2]"
            >
              Donasi Sekarang
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationPage;
