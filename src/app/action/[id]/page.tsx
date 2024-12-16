"use client";

import Navbar from "@/components/layout/navbar";
import BackButton from "@/components/ui/backbutton";
import Placeholder from "@Images/image-placeholder.png"; // Replace with the actual image path
import Image from "next/image";
import ProgressBar from "@/components/ui/progressbar";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getCampaignAksiById } from "@/lib/api";

interface Campaign {
  judul: string;
  foto?: string;
  deskripsi: string;
  penyelenggara: string;
  targetAksi: number;
  progressAksi: number;
  pelakuAksiList: any[]; // Adjust type as necessary
  batasWaktu: Date;
  konversi: number;
}

const ActionPage: React.FC = () => {
  const params = useParams(); // Dynamically access route parameters
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        setLoading(true); // Start loading
        const data = await getCampaignAksiById(parseInt(params.id as string, 10));
        setCampaign(data);
      } catch (error) {
        console.error("Error fetching campaign data:", error);
      } finally {
        setLoading(false); // End loading
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
                  <span className="text-lg md:text-xl font-bold">{campaign.pelakuAksiList.length}</span>
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
                      Untuk setiap aksi yang selesai dilakukan
                    </p>
                  </div>
                </div>

                {/* Organizer Info */}
                <div className="bg-gray-100 p-4 rounded-xl flex flex-col flex-1 items-start font-semibold">
                  <div className="text-2xl">{campaign.penyelenggara}</div>
                  <p className="text-xs font-medium text-neutral-500">
                    Penggalang Aksi
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <a
                href={`/action/${params.id}/documentation`}
                className="w-full bg-[#4C84F6] text-white py-3 rounded-full text-lg text-center font-semibold transition-transform duration-300 transform hover:scale-105 hover:shadow-lg hover:bg-[#2C63D2]"
              >
                Mulai Aksi
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionPage;
