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
  batasWaktu: Date;
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
    router.push(`/donasi/${id}`); // Navigasi ke halaman donasi/{id}
  };

  return (
    <div
      onClick={handleCardClick}
      className="shadow-md rounded-lg overflow-hidden flex flex-col h-full cursor-pointer hover:shadow-lg transition-shadow"
    >
      <img src={foto} alt={judul} className="w-full h-40 object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold mb-1">{judul}</h3>
        <p className="text-gray-600 text-sm flex-grow">{deskripsi}</p>
        <p className="text-sm text-gray-700 mt-2">
          Penyelenggara: <span className="font-semibold">{penyelenggara}</span>
        </p>
        <div className="mt-2">
          <div className="w-full bg-gray-200 h-2.5 rounded-full">
            <div
              className="bg-blue-500 h-2.5 rounded-full"
              style={{ width: `${(progressDonasi / targetDonasi) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-1 text-sm">
            <span>
              Rp{formatNumber(progressDonasi)} / Rp{formatNumber(targetDonasi)}
            </span>
            <span>
              {Math.max(
                0,
                Math.ceil((new Date(batasWaktu).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
              )}{" "}
              Hari Tersisa
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonasiCard;
