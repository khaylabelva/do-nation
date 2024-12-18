"use client";

import { useRouter } from "next/navigation";

interface AksiCardProps {
  id: number;
  judul: string;
  foto: string;
  deskripsi: string;
  penyelenggara: string;
  targetAksi: number;
  progressAksi: number; 
  jumlahAksi: number;
  batasWaktu: string;
  konversi: number;
  jumlahPartisipan: number; // Accept the list of participants
}

const AksiCard: React.FC<AksiCardProps> = ({
  id,
  judul,
  foto,
  penyelenggara,
  targetAksi,
  progressAksi,
  jumlahAksi,
  batasWaktu,
  konversi,
  jumlahPartisipan
}) => {
  const router = useRouter(); // Enable navigation
  const progressPercentage = (progressAksi / targetAksi) * 100;

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("id-ID").format(value);
  };

  const calculateDaysLeft = () => {
    const daysLeft = Math.ceil(
      (new Date(batasWaktu).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );
    return Math.max(daysLeft, 0); // Avoid negative days
  };

  const handleCardClick = () => {
    router.push(`/action/${id}`); // Navigate to the specific action page
  };

  return (
    <div
      className="flex h-full bg-white border border-gray-400 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-shadow "
      onClick={handleCardClick} // Call navigation function
    >
      {/* Image */}
      <div className="w-[45%]">
        <img src={foto} alt={judul} className="object-cover" />
      </div>

      {/* Campaign Details */}
      <div className="w-2/3 p-4 flex flex-col justify-between">
        <div>
          <p className="text-xs text-gray-400 mb-1">{penyelenggara}</p>
          <h3 className="font-bold text-gray-800 mb-1">{judul}</h3>
        </div>

        <div className="flex justify-between text-sm text-gray-600">
          <div>🌟 {progressAksi} Aksi</div>
          <div>
            ⏰ {calculateDaysLeft()}{" "}
            Hari Tersisa
          </div>
          <div>👤{jumlahPartisipan} Partisipan</div>
        </div>

        {/* Progress */}
        <div className="mt-2">
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <span className="text-gray-600 font-medium">
            Konversi:{" "}
            <span className="font-bold text-gray-800">
              {jumlahAksi} Aksi = Rp {formatNumber(konversi)}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default AksiCard;
