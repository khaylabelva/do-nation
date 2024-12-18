"use client";

import { useRouter } from "next/navigation";

interface DonasiCardProps {
  id: number; // ID untuk navigasi
  judul: string;
  foto: string;
  deskripsi: string;
  penyelenggara: string;
  targetDonasi: number;
  progressDonasi: number;
  batasWaktu: string;
}

const DonasiCard: React.FC<DonasiCardProps> = ({
  id,
  judul,
  foto,
  deskripsi,
  penyelenggara,
  targetDonasi,
  progressDonasi,
  batasWaktu,
}) => {
  const router = useRouter(); // Router untuk navigasi

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("id-ID").format(value);
  };

  const handleCardClick = () => {
    router.push(`/donation/${id}`); // Navigasi ke halaman donasi/{id}
  };

  const calculateDaysLeft = () => {
    const daysLeft = Math.ceil(
      (new Date(batasWaktu).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );
    return Math.max(daysLeft, 0); // Avoid negative days
  };

  return (
    <div
      onClick={handleCardClick}
      className="rounded-2xl border border-gray-400 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    >
      {/* Image Section */}
      <div className="h-[200px] w-full">
        <img
          src={foto || "/placeholder.jpg"}
          alt={judul}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="p-4">
        <p className="text-xs text-gray-400 mb-1">{penyelenggara}</p>
        <h3 className="font-bold text-gray-800 mb-4">{judul}</h3>

        {/* Progress Bar */}
        <div className="mb-3">
          <div className="w-full h-2 bg-gray-300 rounded-full">
            <div
              className="h-full bg-blue-500 rounded-full"
              style={{ width: `${(progressDonasi / targetDonasi) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Donation Info and Days Left */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 font-medium">
            Total Donasi:{" "}
            <span className="font-bold text-gray-800">
              Rp{formatNumber(progressDonasi)}
            </span>
          </span>
          <span className="text-gray-500">{calculateDaysLeft()} hari lagi</span>
        </div>
      </div>
    </div>
  );
};

export default DonasiCard;
