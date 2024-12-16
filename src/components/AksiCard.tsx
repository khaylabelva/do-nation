interface AksiCardProps {
    id: number;
    judul: string;
    foto: string;
    deskripsi: string;
    penyelenggara: string;
    targetAksi: number;
    progressAksi: number;
    jumlahAksi: number;
    batasWaktu: Date;
    konversi: number;
    onClick?: () => void; // Fungsi untuk navigasi
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
        className="flex bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition duration-300"
        onClick={onClick} // Panggil fungsi onClick
      >
        {/* Gambar */}
        <div className="w-1/3">
          <img src={foto} alt={judul} className="h-full w-full object-cover" />
        </div>
  
        {/* Detail Kampanye */}
        <div className="w-2/3 p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold mb-2">{judul}</h3>
            <p className="text-sm text-gray-500 mb-2">
              Penyelenggara: <span className="font-semibold">{penyelenggara}</span>
            </p>
            <p className="text-sm text-blue-600 font-semibold">
              {jumlahAksi} Aksi = Rp {formatNumber(konversi)}
            </p>
          </div>
  
          {/* Informasi Tambahan */}
          <div className="mt-4 flex justify-between text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <span>👥</span> <span>{progressAksi} Supporter</span>
            </div>
            <div className="flex items-center gap-1">
              <span>✅</span> <span>{jumlahAksi} Aksi</span>
            </div>
            <div className="flex items-center gap-1">
              <span>⏳</span>
              <span>
                {Math.max(
                  0,
                  Math.ceil((batasWaktu.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
                )}{" "}
                Hari Tersisa
              </span>
            </div>
          </div>
  
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    );
  };
  
  export default AksiCard;
  