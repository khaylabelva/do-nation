import Navbar from "@/components/layout/navbar";
import HeroSection from "../../components/HeroSection";
import AksiSection from "../../components/AksiSection";
import DonasiSection from "../../components/DonasiSection";

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <main className="container mx-auto px-8 mt-32 mb-4">
        <AksiSection />
        <DonasiSection />
        {/* Footer */}
        <footer className="bg-blue-600 text-white mt-16 py-8 rounded-2xl w-full  shadow-lg mb-8 items-center justify-center">
          <div className="container mx-auto flex justify-between px-6">
            <div className="w-2/5">
              <h3 className="font-bold text-xl mb-2">DoNation</h3>
              <p className="text-sm leading-relaxed text-gray-200">
                Satu Platform, Ribuan Kebaikan. Mulai Donasi Sekarang!
              </p>
            </div>
            <div className="w-3/5 flex justify-end space-x-16">
              {/* Donasi */}
              <div>
                <h4 className="font-bold text-base mb-2">Donasi</h4>
                <ul className="space-y-1 text-[13px] text-gray-200">
                  <li>Pendidikan</li>
                  <li>Sosial</li>
                  <li>Kesehatan</li>
                  <li>Bencana</li>
                </ul>
              </div>

              {/* Bantuan */}
              <div>
                <h4 className="font-bold text-base mb-2">Bantuan</h4>
                <ul className="space-y-1 text-[13px] text-gray-200">
                  <li>FAQ</li>
                  <li>Kebijakan Privasi</li>
                  <li>Aksesibilitas</li>
                  <li>Hubungi Kami</li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Home;
