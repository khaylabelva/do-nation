import Navbar from "@/components/layout/navbar";
import DonasiCard from "@/components/DonasiCard";

/* page.tsx */
const History = () => {
  const donations = [
    {
      id: 1,
      judul: "Banjir Bandang di Palu",
      totalDonation: "25.000",
      daysLeft: 7,
      imageSrc: "./flood.jpg",
      deskripsi: "Deskripsi singkat tentang aksi Banjir Bandang di Palu.",
      penyelenggara: "Penyelenggara 1",
      targetDonasi: 100000,
      progressDonasi: 25000,
      batasWaktu: "2024-12-31",
    },
    {
      id: 2,
      judul: "Gempa Bumi di Lombok",
      totalDonation: "50.000",
      daysLeft: 10,
      imageSrc: "./earthquake.jpg",
      deskripsi: "Deskripsi singkat tentang aksi Gempa Bumi di Lombok.",
      penyelenggara: "Penyelenggara 2",
      targetDonasi: 100000,
      progressDonasi: 50000,
      batasWaktu: "2024-12-31",
    },
    {
      id: 3,
      judul: "Kebakaran Hutan di Kalimantan",
      totalDonation: "75.000",
      daysLeft: 15,
      imageSrc: "./fire.jpg",
      deskripsi: "Deskripsi singkat tentang aksi Kebakaran Hutan di Kalimantan.",
      penyelenggara: "Penyelenggara 3",
      targetDonasi: 100000,
      progressDonasi: 75000,
      batasWaktu: "2024-12-31",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 overflow-hidden">
      <Navbar />

      {/* Konten Utama */}
      <div className="flex-grow p-6 flex gap-8">
        {/* Rekapitulasi (Kiri) */}
        <div className="w-full space-y-6">
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
        <div className="w-3/4">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Riwayat</h2>

          {/* Scrollable Donation Cards */}
          <div className="flex overflow-x-auto space-x-6 p-2 hide-scrollbar w-full">
            {donations.map((donation) => (
              <div
                key={donation.id}
                className="flex-shrink-0 w-[380px] h-[350px]"
              >
                <DonasiCard
                  id={donation.id}
                  judul={donation.judul}
                  foto={donation.imageSrc}
                  deskripsi={donation.deskripsi}
                  penyelenggara={donation.penyelenggara}
                  targetDonasi={donation.targetDonasi}
                  progressDonasi={donation.progressDonasi}
                  batasWaktu={donation.batasWaktu}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-600 text-white p-6">
        <p>
          <span className="font-bold">DoNation</span> - Satu Platform, Ribuan
          Kebaikan. Mulai Donasi Sekarang!
        </p>
      </footer>
    </div>
  );
};

export default History;

