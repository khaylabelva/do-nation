"use client";

const BackButton = () => {
  return (
    <button
      onClick={() => window.history.back()}
      className="text-blue-500 text-3xl mr-4"
    >
      ←
    </button>
  );
};

export default BackButton;
