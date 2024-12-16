import React from "react";

interface DonationCardProps {
  title: string;
  totalDonation: string;
  daysLeft: number;
  imageSrc: string;
}

const DonationCard: React.FC<DonationCardProps> = ({ title, totalDonation, daysLeft, imageSrc }) => {
  return (
    <div className="bg-white rounded-2xl border w-80 cursor-pointer" style={{ overflow: "hidden" }}>
      {/* Tambahkan rounded di gambar */}
      <img
        src={imageSrc}
        alt={title}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <p className="text-gray-500 text-sm mb-1">Unity Foundation</p>
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "50%" }}></div>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <p>
            Total Donasi: <span className="font-semibold">Rp{totalDonation}</span>
          </p>
          <p>{daysLeft} days left</p>
        </div>
      </div>
    </div>
  );
};

export default DonationCard;
