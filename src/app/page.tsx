import DonationCard from "@/components/ui/DonationCard";

/* page.tsx */
const History = () => {
  const donations = [
    {
      title: "Banjir Bandang di Palu",
      totalDonation: "25.000",
      daysLeft: 7,
      imageSrc: "/images/flood.jpg",
    },
    {
      title: "Gempa Bumi di Lombok",
      totalDonation: "50.000",
      daysLeft: 10,
      imageSrc: "/images/earthquake.jpg",
    },
    {
      title: "Kebakaran Hutan di Kalimantan",
      totalDonation: "75.000",
      daysLeft: 15,
      imageSrc: "/images/fire.jpg",
    },
    {
      title: "Gempa Bumi di Lombok",
      totalDonation: "50.000",
      daysLeft: 10,
      imageSrc: "/images/earthquake.jpg",
    },
    {
      title: "Gempa Bumi di Lombok",
      totalDonation: "50.000",
      daysLeft: 10,
      imageSrc: "/images/earthquake.jpg",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 overflow-hidden">
      {/* Header Baru */}
      <nav className="flex items-center justify-between p-6 bg-white">
        {/* Logo + Garis + Navigasi */}
        <div className="flex items-center">
          {/* Logo */}
          <div className="text-[#2C63D2] text-xl font-bold">
            Do<span className="text-[#4C84F6]">Nation</span>
          </div>

          {/* Garis abu-abu */}
          <div className="h-6 w-[2px] bg-gray-300 mx-9"></div>

          {/* Navigasi */}
          <ul className="flex space-x-9 text-black font-normal">
            <li className="cursor-pointer">Home</li>
            <li className="cursor-pointer">Donation</li>
            <li className="cursor-pointer">FAQ</li>
          </ul>
        </div>

        {/* Tombol Masuk */}
        <button className="bg-[#4C84F6] text-white px-4 py-2 rounded-[12px]">Masuk</button>
      </nav>

      {/* Konten Utama */}
      <div className="flex-grow max-w-6xl p-6 flex gap-8">
        {/* Rekapitulasi (Kiri) */}
        <div className="w-1/3 space-y-6">
          <h2 className="text-2xl font-bold text-blue-600">Rekapitulasi</h2>

          {/* Total Donasi */}
          <div className="bg-white p-6 rounded-2xl border flex items-center">
            <div className="bg-blue-100 p-3 rounded-full">
              <span className="text-blue-600 text-2xl">💙</span>
            </div>
            <div className="ml-4">
              <p className="text-gray-600">Total Donasi:</p>
              <p className="text-xl font-bold">Rp25.000</p>
            </div>
          </div>

          {/* Total Aksi */}
          <div className="bg-white p-6 rounded-2xl border flex items-center">
            <div className="bg-yellow-100 p-3 rounded-full">
              <span className="text-yellow-600 text-2xl">⭐</span>
            </div>
            <div className="ml-4">
              <p className="text-gray-600">Total Aksi:</p>
              <p className="text-xl font-bold">20 Aksi</p>
            </div>
          </div>
        </div>

        {/* Riwayat (Kanan) */}
        <div className="w-2/3">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Riwayat</h2>

          {/* Scrollable Donation Cards */}
          <div className="flex overflow-x-auto space-x-6 p-2 hide-scrollbar w-full">
            {donations.map((donation, index) => (
              <div key={index} className="flex-shrink-0">
                <DonationCard
                  title={donation.title}
                  totalDonation={donation.totalDonation}
                  daysLeft={donation.daysLeft}
                  imageSrc={donation.imageSrc}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-600 text-white p-6">
        <p>
          <span className="font-bold">DoNation</span> - Satu Platform, Ribuan Kebaikan. Mulai Donasi Sekarang!
        </p>
      </footer>
    </div>
  );
};

export default History;
