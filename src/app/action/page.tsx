import Navbar from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import Placeholder from '@Images/image-placeholder.png'; // Replace with the actual image path
import Image from 'next/image';
import ProgressBar from '@/components/ui/progressbar'; // Adjust the path as needed

const ActionPage = async () => {
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
              Donasi untuk Kebaikan sesama Manusia di Jatinangor
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

            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-6 mt-4 p-4 border border-neutral-300 rounded-xl">
              <div className="flex flex-row items-center justify-center gap-1">
                <div className="text-5xl">🌟</div>
                <div className="flex flex-col items-start">
                  <span className="text-lg md:text-xl font-bold">182</span>
                  <span className="text-sm text-neutral-500">Aksi Selesai</span>
                </div>
              </div>
              <div className="flex flex-row items-center justify-center gap-1">
                <div className="text-5xl">⏰</div>
                <div className="flex flex-col items-start">
                  <span className="text-lg md:text-xl font-bold">20</span>
                  <span className="text-sm text-neutral-500">Hari Tersisa</span>
                </div>
              </div>
              <div className="flex flex-row items-center justify-center gap-1">
                <div className="text-5xl">👤</div>
                <div className="flex flex-col items-start">
                  <span className="text-lg md:text-xl font-bold">70</span>
                  <span className="text-sm text-neutral-500">Partisipan</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col border rounded-xl border-neutral-300 p-4 gap-4">
              <div className="flex flex-1 flex-row gap-2">
                {/* Conversion Rate */}
                <div className="bg-blue-50 p-4 rounded-xl flex flex-row items-start gap-4">
                  <Image
                    src={Placeholder}
                    alt="Placeholder"
                    className="object-cover w-12 h-12 rounded-full"
                  />
                  <div className="flex flex-col">
                    <div className="text-black text-2xl font-bold">
                      Rp25.000
                    </div>
                    <p className="text-xs font-medium text-neutral-500">
                      Untuk setiap aksi yang selesai dilakukan
                    </p>
                  </div>
                </div>

                {/* Organizer Info */}
                <div className="bg-gray-100 p-4 rounded-xl flex flex-col flex-1 items-start font-semibold">
                  <div className="text-2xl ">Siti Kusmini</div>
                  <p className="text-xs font-medium text-neutral-500">
                    Penggalang Aksi
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <Button className="w-full bg-[#4C84F6] text-white py-3 rounded-full text-lg font-semibold transition-transform duration-300 transform hover:scale-105 hover:shadow-lg hover:bg-[#2C63D2]">
                Mulai Aksi
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionPage;
