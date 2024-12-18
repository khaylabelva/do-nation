"use client";

import { useRouter } from "next/navigation";

interface HistoryDonasiCardProps {
  id: number; // ID untuk navigasi
  judul: string;
  foto: string;
  deskripsi: string;
  penyelenggara: string;
  jumlah: number; // Total jumlah yang user donasikan
  createdAt: string; // Waktu donasi dibuat
}

const HistoryDonasiCard: React.FC<HistoryDonasiCardProps> = ({
  id,
  judul,
  foto,
  deskripsi,
  penyelenggara,
  jumlah,
  createdAt,
}) => {
  const router = useRouter(); // Router untuk navigasi

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("id-ID").format(value);
  };

  const handleCardClick = () => {
    router.push(`/donation/${id}`); // Navigasi ke halaman donasi/{id}
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
        <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">
          {judul}
        </h3>

        {/* Deskripsi */}
        <div className="text-gray-600 text-sm h-10 overflow-hidden italic">
          <p className="line-clamp-2">
            " {deskripsi == " " ? "Semoga Berkah" : deskripsi } "
          </p>
        </div>

        {/* Donation Info and Date */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 font-medium">
            Jumlah Donasi: <span className="font-bold text-gray-800">Rp{formatNumber(jumlah)}</span>
          </span>
          <span className="text-gray-500 text-right">
            {formatDateTime(createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HistoryDonasiCard;
