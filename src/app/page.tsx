export default function HomePage() {
  const donations = [
    {
      title: "Banjir Bandang di Palu",
      totalDonation: "Rp25.000.000",
      daysLeft: 7,
      imageSrc: "/images/flood.jpg",
      progress: "30%",
    },
    {
      title: "Gempa Bumi di Lombok",
      totalDonation: "Rp50.000.000",
      daysLeft: 10,
      imageSrc: "/images/earthquake.jpg",
      progress: "55%",
    },
    {
      title: "Kebakaran Hutan di Kalimantan",
      totalDonation: "Rp75.000.000",
      daysLeft: 15,
      imageSrc: "/images/fire.jpg",
      progress: "70%",
    },
  ];
  return (
    <div className="font-sans">
      <nav className="flex items-center justify-between p-6">
        {/* Logo + Garis + Navigasi */}
        <div className="flex items-center">
          {/* Logo */}
          <div className="text-[#2C63D2] text-xl font-bold">
            Do<span className="text-[#4C84F6]">Nation</span>
          </div>

          {/* Garis abu-abu */}
          <div className="h-6 w-[2px] bg-gray-300 mx-9"></div>

          {/* Navigasi (Mepet Garis) */}
          <ul className="flex space-x-9 text-black font-normal">
            <li className="cursor-pointer">Home</li>
            <li className="cursor-pointer">Donation</li>
            <li className="cursor-pointer">FAQ</li>
          </ul>
        </div>

        {/* Tombol Masuk */}
        <button className="bg-[#4C84F6] text-white px-4 py-2 rounded-[12px]">Masuk</button>
      </nav>

      <div className="relative w-full max-w-[1300px] mx-auto h-[470px] flex bg-blue-100 overflow-hidden rounded-2xl">
        <img
          src="/landingpage.png"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover rounded-[20px]"
        />
        <h1 className="text-[120px] font-bold ml-9 mb-1 text-white relative drop-shadow-lg place-content-end">
          DoNation
        </h1>
      </div>

      {/* Deskripsi */}
      <section className="px-16 pt-20 pb-8">
        <h2 className="text-2xl font-bold">Donasi Cepat, Efisien, dan Berdampak Besar</h2>
        <p className="text-gray-400 mt-2 mx-auto font-normal">
          Raih perubahan dalam hitungan menit! Wujudkan aksi kebaikan dengan platform donasi yang mudah, cepat, dan terpercaya.
        </p>
      </section>

      {/* Cards Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-16 mb-10">
        {[
          { 
            image: "/icon-1.png", 
            title: "Hadirkan Dampak Nyata", 
            desc: "Sebarkan kebahagiaan melalui aksi donasi yang membawa perubahan besar. Jelaskan bagaimana setiap kontribusi dapat memberikan arti yang besar bagi sesama." 
          },
          { 
            image: "/icon-2.png", 
            title: "Sebarkan Kebaikan Lebih Cepat", 
            desc: "Manfaatkan kekuatan media sosial dan jaringan online. Bagikan kampanye donasi Anda dengan mudah ke berbagai platform hanya dalam hitungan detik." 
          },
          { 
            image: "/icon-3.png", 
            title: "Terhubung Hingga ke Penjuru Dunia", 
            desc: "Bangun jaringan solidaritas yang kuat untuk mendukung tujuan mulia Anda. Ajak lebih banyak orang untuk berpartisipasi dan bergerak bersama di komunitas lokal maupun global." 
          },
        ].map((item, index) => (
          <div 
            key={index} 
            className="flex flex-col justify-end bg-gray-100 border-[0.2px] border-gray-500 rounded-2xl text-justify p-6 min-h-[300px] hover:shadow-lg transition"
          >
            {/* Image */}
            <div className="w-12 h-12 bg-gray-200 rounded-full flex justify-center mb-4 overflow-hidden">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Title */}
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              {item.title}
            </h3>
            {/* Description */}
            <p className="text-gray-600 text-sm">
              {item.desc}
            </p>
          </div>
        ))}
      </section>

      {/* Donasi Section */}
      <section className="px-16 pt-16">
        <h2 className="text-2xl font-bold mb-1">
          Ayo Bertindak <span className="text-blue-500">Sekarang!</span>
        </h2>
        <p className="text-gray-400 mt-2 mb-8 mx-auto font-normal">
        Waktu tak menunggu. Bersama, kita bisa membuat perbedaan. Berikan donasi Anda dan lihat dampaknya langsung. Setiap detik berarti!
        </p>
        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {donations.map((donation, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-400 bg-white overflow-hidden"
            >
              {/* Image */}
              <div className="h-[200px] w-full">
                <img
                  src={donation.imageSrc}
                  alt={donation.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Card Content */}
              <div className="p-4">
                <p className="text-xs text-gray-400 mb-1">Unity Foundation</p>
                <h3 className="font-bold text-gray-800 mb-4">{donation.title}</h3>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="w-full h-2 bg-gray-300 rounded-full">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: donation.progress }}
                    ></div>
                  </div>
                </div>

                {/* Total Donasi and Days Left */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 font-medium">
                    Total Donasi:{" "}
                    <span className="font-bold text-gray-800">
                      {donation.totalDonation}
                    </span>
                  </span>
                  <span className="text-gray-500">{donation.daysLeft} days left</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mt-10 px-16 py-14">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        <p className="text-gray-400 mt-2 mb-16">
          Kami di sini untuk membantu Anda memulai perjalanan kebaikan. Temukan jawabannya di sini!
        </p>
        <div className="max-w-3xl mx-auto divide-y divide-gray-200">
          {[
            "Bagaimana Cara Saya Berdonasi?",
            "Bisakah Saya Berdonasi untuk Mengenang Seseorang?",
            "Bisakah Saya Mengatur Donasi Berkala?",
            "Bagaimana Donasi Saya Akan Digunakan?",
          ].map((faq, index) => (
            <details
              key={index}
              className="group py-4 cursor-pointer"
            >
              {/* FAQ Summary */}
              <summary className="flex justify-between items-center text-lg font-semibold text-gray-800 hover:text-blue-500 transition">
                {faq}
                <span className="text-xl text-gray-400 group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>

              {/* FAQ Content */}
              <p className="mt-2 text-sm text-gray-500">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec posuere ultricies nisi non interdum.
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white mt-16 py-8">
        <div className="container mx-auto flex flex-wrap justify-between px-4">
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <h3 className="font-bold text-lg mb-2">DoNation</h3>
            <p>Satu Platform, Ribuan Kebaikan. Mulai Donasi Sekarang!</p>
          </div>
          <div>
            <h4 className="font-bold mb-2">Donasi</h4>
            <ul>
              <li>Pendidikan</li>
              <li>Sosial</li>
              <li>Kesehatan</li>
              <li>Bencana</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">Bantuan</h4>
            <ul>
              <li>FAQ</li>
              <li>Kebijakan Privasi</li>
              <li>Aksesibilitas</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}