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
  onClick?: () => void; // Function for navigation
}

const AksiCard: React.FC<AksiCardProps> = ({
  judul,
  foto,
  penyelenggara,
  progressAksi,
  targetAksi,
  jumlahAksi,
  konversi,
  batasWaktu,
  onClick,
}) => {
  const progressPercentage = (progressAksi / targetAksi) * 100;

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("id-ID").format(value);
  };

  return (
    <div
      className="flex h-full bg-white border border-gray-400 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-shadow "
      onClick={onClick} // Call onClick function
    >
      {/* Image */}
      <div className="w-1/3">
        <img src={foto} alt={judul} className="h-full w-full object-cover" />
      </div>

      {/* Campaign Details */}
      <div className="w-2/3 p-4 flex flex-col justify-between">
        {/* Header */}
        <div>
          <p className="text-xs text-gray-400 mb-1">{penyelenggara}</p>
          <h3 className="font-bold text-gray-800 mb-1">{judul}</h3>
        </div>

        {/* Additional Info */}
        <div className="flex justify-between text-sm text-gray-600">
          <div className="flex items-center gap-1">
            🌟 <span>{jumlahAksi} Aksi</span>
          </div>
          <div className="flex items-center gap-1">
            ⏰{" "}
            <span>
              {Math.max(
                0,
                Math.ceil(
                  (new Date(batasWaktu).getTime() - new Date().getTime()) /
                    (1000 * 60 * 60 * 24)
                )
              )}{" "}
              Hari Tersisa
            </span>
          </div>
          <div className="flex items-center gap-1">
            👤 <span>{progressAksi} Partisipan</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-2 ">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <p className="text-sm text-blue-600 font-semibold mt-4">
            
          </p>
          <span className="text-gray-600 font-medium">
            Konversi: {""}
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
