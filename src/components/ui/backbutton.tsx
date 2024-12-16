"use client";

import { ArrowLeft } from "lucide-react"; // Import the ArrowLeft icon

const BackButton = () => {
  return (
    <button
      onClick={() => window.history.back()}
      className="flex items-center text-blue-500 text-md font-medium"
    >
      <ArrowLeft size={20} className="mr-1" /> {/* Icon with size and spacing */}
      Kembali
    </button>
  );
};

export default BackButton;
