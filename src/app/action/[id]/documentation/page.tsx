"use client";

import { useEffect, useState } from "react";
import { getAksiByCampaignId, getCampaignAksiById } from "@/lib/api"; // Ensure this is a client-compatible API call
import { useParams, useRouter } from "next/navigation"; // Use the Next.js `useParams` hook to retrieve params dynamically
import BackButton from "@/components/ui/backbutton";
import { ArrowRight } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

interface Aksi {
  id: number;
  deskripsi: string;
}

interface UserAksi {
  aksiId: number;
}

interface Campaign {
  judul: string;
  penyelenggara: string;
} 

const DocumentationPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const campaignId = parseInt(params.id as string, 10);

  const [aksiList, setAksiList] = useState<Aksi[]>([]);
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [userAksiData, setUserAksiData] = useState<UserAksi[]>([]);
  const [currentAksiIndex, setCurrentAksiIndex] = useState(0);
  const [imageInput, setImageInput] = useState<File | null>(null);
  const [textInput, setTextInput] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const aksi = await getAksiByCampaignId(campaignId);
        setAksiList(aksi);

        const campaignData = await getCampaignAksiById(campaignId);
        setCampaign(campaignData);

        // Fetch UserAksi to determine progress
        const res = await fetch(`/api/user-aksi?campaignId=${campaignId}`);
        if (res.ok) {
          const userAksi = await res.json();
          setUserAksiData(userAksi);

          // Determine AksiIndex based on UserAksi length
          const aksiCount = userAksi.length;
          if (aksiCount >= aksi.length) {
            toast.info("Kamu telah menyelesaikan semua aksi!");
            router.push(`/action/${campaignId}`);
          } else {
            setCurrentAksiIndex(aksiCount);
          }
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [campaignId, router]);

  const handleSubmit = async () => {
    const payload = {
      campaignId,
      deskripsi: textInput.trim()
        ? `Aksi ${currentAksiIndex + 1}: ${textInput}`
        : `Aksi ${currentAksiIndex + 1}: ${aksiList[currentAksiIndex].deskripsi}`,
      fotoDokumentasi: "", // Placeholder
    };

    try {
      const res = await fetch("/api/actions/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.refresh();
        toast.success(`Kamu telah menyelesaikan aksi ke-${currentAksiIndex+1}`);
        router.push(`/action/${campaignId}`);
      } else {
        toast.error("Gagal mengirim aksi.");
      }
    } catch (error) {
      console.error("Error submitting aksi:", error);
      toast.error("Terjadi kesalahan, silakan coba lagi.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-600">Memuat data...</h1>
      </div>
    );
  }

  if (!aksiList.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-600">
          Aksi tidak ditemukan untuk kampanye ini.
        </h1>
      </div>
    );
  }

  const currentAksi = aksiList[currentAksiIndex];

  return (
    <div className="container mx-auto py-8 px-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <BackButton />
        <h1 className="text-3xl font-bold text-gray-900 text-center">
          {campaign?.judul}
        </h1>
        <span className="text-gray-400 font-medium text-lg">{campaign?.penyelenggara}</span>
      </div>
  
      {/* Progress Indicator */}
      <div className="flex items-center justify-center mb-8">
        {aksiList.map((aksi, index) => (
          <div key={aksi.id} className="flex items-center">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                index === currentAksiIndex
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              {index + 1}
            </div>
            {index < aksiList.length - 1 && (
              <div className="h-1 w-32 bg-gray-300 mx-1"></div>
            )}
          </div>
        ))}
      </div>
  
      {/* Content Grid */}
      <div className="grid grid-cols-2 gap-8">
        {/* Kiri: Aksi Details dan Upload File */}
        <div className="flex flex-col gap-6">
          {/* Aksi Details */}
          <div className="border border-gray-300 rounded-lg p-6 bg-white">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-500 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <div className="ml-4 h-10">
                <h3 className="text-gray-400 font-medium text-sm">
                  Aksi {currentAksi.id}
                </h3>
                <h2 className="font-bold text-lg text-gray-800 leading-tight">
                  {currentAksi.deskripsi}
                </h2>
              </div>
            </div>
          </div>
  
          {/* Upload File */}
          <div className="border border-gray-300 rounded-lg p-6 bg-white flex flex-col justify-between h-full">
            <label className="block font-semibold text-gray-800 mb-2">
              Upload File
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files && setImageInput(e.target.files[0])}
              className="block w-full border rounded-lg p-2 text-gray-500 focus:outline-none"
            />
            <div className="flex items-center justify-center h-full">
              {imageInput ? (
                <img
                  src={URL.createObjectURL(imageInput)}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg"
                />
              ) : (
                <span className="text-gray-400 italic">
                  The preview will show up here
                </span>
              )}
            </div>
          </div>
        </div>
  
        {/* Kanan: Deskripsi Input */}
        <div className="border border-gray-300 rounded-lg p-6 bg-white h-full">
          <label className="block font-semibold text-gray-800 mb-2">
            Deskripsi Aksi
          </label>
          <textarea
            rows={12}
            placeholder="Tulis caption untuk aksimu..."
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            className="w-full border rounded-lg p-4 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 h-[1/2]"
          ></textarea>
        </div>
      </div>
  
      {/* Submit Button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-full text-lg shadow-md transition duration-300"
        >
          Submit Aksi
        </button>
      </div>

    </div>
  );        
};

export default DocumentationPage;
