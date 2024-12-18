"use client";

import Image from "next/image";
import ProfileIcon from "@Images/profile-icon.png";

interface CompactCardProps {
  username: string;
  deskripsi: string;
  jumlah: number;
  createdAt: string;
}

const CompactCard: React.FC<CompactCardProps> = ({
  username,
  deskripsi,
  jumlah,
  createdAt,
}) => {
  const formattedTime = new Date(createdAt).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // Use 24-hour format
  });

  return (
    <div className="flex-shrink-0 w-[250px] h-[140px] bg-white border border-gray-200 rounded-xl shadow-md p-4 flex flex-col justify-between">
      {/* Top Section: Profile Icon, Username, and Time */}
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <Image
            src={ProfileIcon}
            alt="Profile Icon"
            width={32}
            height={32}
            className="rounded-full"
          />
          <div className="ml-3">
            <h3 className="font-semibold text-gray-800 text-xl truncate">
              {username}
            </h3>
          </div>
        </div>
        {/* Time */}
        <span className="text-xs text-gray-400">{formattedTime}</span>
      </div>

      {/* Middle Section: Description */}
      <p className="text-gray-500 italic text-xs truncate mt-2">
        "{deskripsi || "Semoga uangnya berkah ya"}"
      </p>

      {/* Bottom Section: Amount and Date */}
      <div className="flex justify-between items-center">
        <p className="text-gray-800 text-sm font-medium">
          Jumlah: <span className="font-bold">Rp{jumlah.toLocaleString()}</span>
        </p>
        <span className="text-xs text-gray-400">
          {new Date(createdAt).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "short",
            year: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
};

export default CompactCard;
