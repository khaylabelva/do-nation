import Navbar from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import Placeholder from '@Images/image-placeholder.png'; // Replace with the actual image path
import Image from 'next/image';
import ProgressBar from '@/components/ui/progressbar'; // Adjust the path as needed
import UnicefIcon from '@Images/unicef-logo.png'; // Gantilah dengan logo Unicef yang benar

const DonationPage = async () => {
  return (
    <div className="bg-neutral-50 min-h-screen flex flex-col overflow-hidden">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl gap-16">
          {/* Left Image Section */}
          <div className="w-full md:w-[50%] rounded-[60px] overflow-hidden">
            <Image
              src={Placeholder}
              alt="Enamel Pins"
              className="object-cover w-full h-auto"
              width={400}
              height={300}
            />
          </div>

          {/* Right Content Section */}
          <div className="w-full md:w-3/5 space-y-4">
            <h1 className="text-2xl md:text-4xl font-bold">
              Penjualan Enamel Pin SPARTA HMIF 2023
            </h1>
            <div>
              <div className="text-3xl md:text-3xl font-bold text-[#4C84F6]">
                Rp100.000.000
              </div>
              <p className="text-sm md:text-base text-neutral-400">
                Terkumpul dari Rp200.000.000
              </p>
            </div>

            {/* Progress Bar */}
            <ProgressBar value={50} />

            {/* Unicef Section */}
            <div className="flex items-center gap-4 mt-6 p-4 border border-neutral-300 rounded-xl shadow-sm">
              <Image
                src={UnicefIcon}
                alt="Unicef Indonesia"
                className="w-12 h-12 object-cover rounded-full"
                width={48}
                height={48}
              />
              <div>
                <span className="text-lg md:text-xl font-bold text-[#4C84F6]">
                  Unicef Indonesia
                </span>
              </div>
            </div>

            {/* Tentang Penggalang Dana */}
            <div className="border border-neutral-300 rounded-xl p-4 bg-white shadow-sm">
              <h2 className="font-bold text-lg md:text-xl mb-2">
                Tentang Penggalang Dana
              </h2>
              <p className="text-sm md:text-base text-neutral-600 leading-relaxed">
                Kita membutuhkan uang untuk merenovasi sekre menjadi tempat yang lebih
                cocok untuk belajar dan sharing bersama. Maka dari itu, dukung Khayla Belva
                menjadi Ketua Himpunan periode 2025/2026.
              </p>
            </div>

            {/* Action Button */}
            <Button className="w-full bg-[#4C84F6] text-white py-3 rounded-full text-lg font-semibold transition-transform duration-300 transform hover:scale-105 hover:shadow-lg hover:bg-[#2C63D2]">
              Donasi Sekarang
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationPage;
