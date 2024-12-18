"use client";

import { useRouter } from "next/navigation";

interface HistoryAksiCardProps {
  id: number;
  judul: string;
  foto: string;
  deskripsi: string;
  penyelenggara: string;
  targetAksi: number;
  progressAksi: number; 
  createdAt: string;
}

const HistoryAksiCard: React.FC<HistoryAksiCardProps> = ({
  id,
  judul,
  foto,
  deskripsi,
  penyelenggara,
  progressAksi,
  targetAksi,
  createdAt
}) => {
  const router = useRouter(); // Enable navigation
  const progressPercentage = (progressAksi / targetAksi) * 100;

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("id-ID").format(value);
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleDateString("en-US", options); // Contoh: "May, 14. 13:00"
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
      <div className="w-1/3">
        <img src={foto} alt={judul} className="h-full w-full object-cover" />
      </div>

      {/* Campaign Details */}
      <div className="w-2/3 p-4 flex flex-col justify-between">
        <div>
          <p className="text-xs text-gray-400 mb-1">{penyelenggara}</p>
          <h3 className="font-bold text-gray-800 mb-1">{judul}</h3>
        </div>

        {/* Deskripsi */}
        <div className="text-gray-600 text-sm h-10 overflow-hidden italic">
          <p className="line-clamp-2">
            " {deskripsi == " " ? "Semoga Berkah" : deskripsi } "
          </p>
        </div>

        {/* Donation Info and Date */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 font-medium">
            🌟 <span className="font-bold text-gray-800">{progressAksi}</span> Aksi Terkumpul
          </span>
          <span className="text-gray-500 text-right">
            {formatDateTime(createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HistoryAksiCard;
