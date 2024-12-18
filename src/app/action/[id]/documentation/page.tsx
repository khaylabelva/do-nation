"use client";

import { useEffect, useState } from "react";
import { getAksiByCampaignId } from "@/lib/api"; // Ensure this is a client-compatible API call
import { useParams, useRouter } from "next/navigation"; // Use the Next.js `useParams` hook to retrieve params dynamically
import BackButton from "@/components/ui/backbutton";
import { ArrowRight } from "lucide-react";
import { ArrowLeft } from "lucide-react";

interface Aksi {
  id: number;
  deskripsi: string;
}

interface UserAksi {
  id: number;
  aksiId: number;
  fotoDokumentasi: File | null;
  deskripsi: string;
  verified: boolean;
}

const DocumentationPage: React.FC = () => {
  const params = useParams(); // Use the hook to get the `id`
  const router = useRouter();
  const campaignId = parseInt(params.id as string, 10);

  const [aksiList, setAksiList] = useState<Aksi[]>([]);
  const [currentAksiIndex, setCurrentAksiIndex] = useState(0);
  const [userAksiData, setUserAksiData] = useState<UserAksi[]>([]);
  const [imageInput, setImageInput] = useState<File | null>(null);
  const [textInput, setTextInput] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state


  // Fetch Aksi data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Start loading
        const data = await getAksiByCampaignId(campaignId);
        setAksiList(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false); // End loading
        }
    };

    fetchData();
  }, [campaignId]);

    if (loading) {
        return (
        <div className="min-h-screen flex items-center justify-center">
            <h1 className="text-2xl font-bold text-gray-600">Memuat data...</h1>
        </div>
        );
    }    

  if (aksiList.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-600">
          Aksi tidak ditemukan untuk kampanye ini.
        </h1>
      </div>
    );
  }

  const currentAksi = aksiList[currentAksiIndex];

  const loadExistingData = () => {
    const existingData = userAksiData.find((aksi) => aksi.aksiId === currentAksi.id);
    if (existingData) {
      setImageInput(existingData.fotoDokumentasi);
      setTextInput(existingData.deskripsi);
    } else {
      setImageInput(null);
      setTextInput("");
    }
  };

  const handleNavigation = (direction: "next" | "prev") => {
    setCurrentAksiIndex((prev) => {
      const newIndex = direction === "next" ? prev + 1 : prev - 1;
      if (newIndex >= 0 && newIndex < aksiList.length) {
        return newIndex;
      }
      return prev;
    });
    setTimeout(loadExistingData, 0);
  };

  const handleSubmit = async () => {
    const payload = {
      campaignId,
      deskripsi: textInput.trim()
        ? `Aksi ${currentAksiIndex + 1}: ${textInput}`
        : `Aksi ${currentAksiIndex + 1}: ${aksiList[currentAksiIndex].deskripsi}`, // Fallback to current aksi description
      fotoDokumentasi: "", // Placeholder for image upload
    };
  
    try {
      const res = await fetch("/api/actions/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      const result = await res.json();
  
      if (!res.ok) {
        console.error(result.error || "Failed to submit aksi");
        alert("Failed to submit aksi.");
      } else {
        alert("Aksi submitted successfully!");
        router.push(`/action/${campaignId}`); // Navigate back to the action page
      }
    } catch (error) {
      console.error("Error submitting aksi:", error);
      alert("An error occurred while submitting aksi.");
    }
  };
  
  

  return (
    <div className="container mx-auto px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <BackButton/>
        <h1 className="text-2xl font-bold">{`Aksi ${currentAksi.id}`}</h1>
        <span className="text-gray-500">Unity Foundation</span>
      </div>

      {/* Navigation */}
      <div className="flex justify-center space-x-2 mb-8">
        {aksiList.map((aksi, index) => (
          <button
            key={aksi.id}
            onClick={() => {
              setCurrentAksiIndex(index);
              loadExistingData();
            }}
            className={`w-10 h-10 rounded-full ${
              index === currentAksiIndex ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
            }`}
          >
            {aksi.id}
          </button>
        ))}
      </div>

      {/* Aksi Details */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-1">{`Aksi ${currentAksi.id}`}</h2>
        <p className="text-gray-500">{currentAksi.deskripsi}</p>
      </div>

      {/* Input Section */}
      <div>
        <h3 className="text-md font-semibold mb-4">Submisi Aksi</h3>
        <div className="flex items-center mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files && setImageInput(e.target.files[0])}
            className="border p-2 rounded-md"
          />
          {imageInput && (
            <img
              src={URL.createObjectURL(imageInput)}
              alt="Preview"
              className="w-24 h-24 object-cover ml-4 rounded-md"
            />
          )}
        </div>
        <textarea
          rows={4}
          placeholder="Deskripsi Aksi"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          className="w-full border p-2 rounded-md"
        ></textarea>
      </div>

      {/* Submit Button */}
      <div className="text-center mt-8">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold transition duration-300"
        >
          Submit Aksi
        </button>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => handleNavigation("prev")}
          className={`flex items-center text-blue-500 text-md font-medium ${currentAksiIndex === 0 && "invisible"}`}
          >
          <ArrowLeft size={20} className="mr-1" />
          Sebelumnya
        </button>
        <button
          onClick={() => handleNavigation("next")}
          className={`flex items-center text-blue-500 text-md font-medium ${currentAksiIndex === aksiList.length - 1 && "invisible"}`}
          >
          <ArrowRight size={20} className="mr-1" /> {/* Icon with size and spacing */}
          Selanjutnya
        </button>
      </div>
    </div>
  );
};

export default DocumentationPage;
