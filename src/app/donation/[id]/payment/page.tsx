"use client";

import Navbar from "@/components/layout/navbar";
import BackButton from "@/components/ui/backbutton";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getDonationCampaignById } from "@/lib/api";

interface DonationCampaign {
  id: number;
  judul: string;
  penyelenggara: string;
  foto: string;
  deskripsi: string;
  targetDonasi: number;
  progressDonasi: number;
}

const PaymentPage: React.FC = () => {
  const params = useParams(); // Get dynamic route parameters
  const [donationCampaign, setDonationCampaign] = useState<DonationCampaign | null>(null);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        setLoading(true); // Start loading
        const campaignId = parseInt(params.id as string, 10);
        const data = await getDonationCampaignById(campaignId);
        setDonationCampaign(data);
      } catch (error) {
        console.error("Error fetching campaign data:", error);
      } finally {
        setLoading(false); // Stop loading
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

  if (!donationCampaign) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-600">Kampanye donasi tidak ditemukan</h1>
      </div>
    );
  }

  const { judul, penyelenggara } = donationCampaign;

  return (
    <div className="bg-white min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Container */}
      <div className="container mx-auto px-4 py-8 mt-8">
        {/* Header */}
        <div className="flex items-center mb-7">
          <BackButton />
          <h1 className="text-3xl font-bold">{judul}</h1>
          <span className="ml-auto text-gray-500 text-lg">{penyelenggara}</span>
        </div>

        {/* Isi Nominal Donasi */}
        <div className="border border-gray-200 rounded-2xl bg-white p-4 mb-6 shadow-sm">
          <h2 className="font-semibold text-xl mb-2">Isi Nominal Donasi:</h2>
          <div className="flex items-center bg-blue-50 rounded-2xl p-3 justify-between">
            <div className="flex items-center justify-center bg-blue-600 text-white rounded-full w-9 h-9 text-lg ml-4 font-bold">
              Rp
            </div>
            <div>
              <input
                type="text"
                defaultValue="100.000"
                className="ml-4 text-black font-bold text-2xl bg-transparent border-none outline-none w-[130px]"
              />
            </div>
          </div>
        </div>

        {/* Dua Kolom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Kolom Kiri */}
          <div className="flex flex-col gap-4">
            {/* Informasi Donatur */}
            <div className="border border-gray-200 rounded-2xl bg-white p-5 shadow-sm flex flex-col">
              <h3 className="font-semibold text-xl mb-2">Nama Donatur</h3>
              <p className="text-gray-400 text-base mb-2">isi.email@contoh.com</p>
              {/* Toggle Switch */}
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-600">
                  Sembunyikan nama saya (donasi sebagai anonim)
                </label>
                <label className="relative inline-block w-12 h-6">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-12 h-6 bg-gray-300 peer-checked:bg-blue-600 rounded-full transition-all"></div>
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-6"></div>
                </label>
              </div>
            </div>

            {/* Pilih Metode Pembayaran */}
            <div className="border border-gray-200 rounded-2xl bg-white p-5 shadow-sm flex justify-between items-center">
              <h3 className="font-semibold text-xl">Pilih Metode Pembayaran</h3>
              <button className="bg-blue-600 text-white py-1 px-6 rounded-full hover:bg-blue-700 text-sm font-semibold">
                Pilih
              </button>
            </div>
          </div>

          {/* Kolom Kanan */}
          <div className="border border-gray-200 rounded-2xl bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-xl mb-3">
              Sertakan doa dan dukungan (opsional)
            </h3>
            <textarea
              className="w-full h-[130px] p-3 rounded-lg border border-gray-200 text-[12px]"
              placeholder="Tulis doa untuk penggalang dana atau dirimu agar bisa diamini oleh orang baik lainnya."
              maxLength={300}
            />
          </div>
        </div>

        {/* Total Donasi dan Tombol Submit */}
        <div className="flex items-center justify-between mt-6 gap-4">
          <div className="flex items-center justify-between border border-gray-200 rounded-2xl bg-white p-5 shadow-sm h-14 w-[500px]">
            <div className="flex-1 text-left ml-4">
              <p className="text-gray-500 text-[14px]">Total Donasi</p>
            </div>
            <div className="text-blue-600 font-bold text-[24px]">Rp100.000</div>
          </div>

          <button className="bg-blue-600 text-white h-14 px-12 rounded-2xl text-xl font-semibold hover:bg-blue-700 flex-grow">
            Lanjut Pembayaran
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
