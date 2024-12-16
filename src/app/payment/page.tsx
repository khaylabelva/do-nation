"use client";
import React, { useState } from "react";

type PaymentMethod = {
  id: number;
  name: string;
  image: string;
};

const PaymentPage = () => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod | null>(null);

  const paymentMethods: PaymentMethod[] = [
    { id: 1, name: "QRIS", image: "./qris.png" },
    { id: 2, name: "GoPay", image: "./gopay.png" },
    { id: 3, name: "BCA", image: "./bca.png" },
    { id: 4, name: "Mandiri", image: "./mandiri.png" },
  ];

  const togglePaymentModal = () => {
    setIsPaymentModalOpen(!isPaymentModalOpen);
  };

  const handlePaymentSelection = (method: PaymentMethod) => {
    setSelectedPaymentMethod(method);
    setIsPaymentModalOpen(false);
  };

  return (
    <div className="font-sans h-screen overflow-hidden flex items-start justify-center pt-4 bg-white">
      <div className="container mx-auto px-4 py-4 md:px-1 md:py-6">
        {/* Header */}
        <div className="flex items-center mb-7">
          <button className="text-blue-500 text-3xl mr-4">←</button>
          <h1 className="text-3xl font-bold">Donasi Banjir Bandang di Palu</h1>
          <span className="ml-auto text-gray-500 text-lg">Unity Foundation</span>
        </div>

        {/* Isi Nominal Donasi */}
        <div className="border border-gray-200 rounded-2xl bg-white p-4 mb-6 shadow-sm">
          <h2 className="font-semibold text-xl mb-2">Isi Nominal Donasi:</h2>
          <div className="flex items-center bg-blue-50 rounded-2xl p-3 justify-between">
            <div className="flex items-center justify-center bg-blue-600 text-white rounded-full w-9 h-9 text-lg ml-4 font-bold">
              Rp
            </div>
            <div>
              <input
                type="text"
                defaultValue="100.000"
                className="ml-4 text-black font-bold text-2xl bg-transparent border-none outline-none w-[130px]"
              />
            </div>
          </div>
        </div>

        {/* Dua Kolom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Kolom Kiri */}
          <div className="flex flex-col gap-4">
            {/* Informasi Donatur */}
            <div className="border border-gray-200 rounded-2xl bg-white p-5 shadow-sm flex flex-col">
              <h3 className="font-semibold text-xl mb-2">Siti Kusmini</h3>
              <p className="text-gray-400 text-base mb-2">sitikusmini@mail.com</p>
              {/* Toggle Switch */}
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-600">
                  Sembunyikan nama saya (donasi sebagai anonim)
                </label>
                <label className="relative inline-block w-12 h-6">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-12 h-6 bg-gray-300 peer-checked:bg-blue-600 rounded-full transition-all"></div>
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-6"></div>
                </label>
              </div>
            </div>

            {/* Pilih Metode Pembayaran */}
            <div className="border border-gray-200 rounded-2xl bg-white p-5 shadow-sm flex justify-between items-center">
              <h3 className="font-semibold text-xl">Pilih Metode Pembayaran</h3>
              <button
                className={`text-sm font-semibold flex items-center gap-2 ${selectedPaymentMethod ? 'bg-white' : 'bg-blue-500'} ${selectedPaymentMethod ? 'text-gray-800' : 'text-white'} px-7 py-1 rounded-full`}
                onClick={togglePaymentModal}
              >
                {selectedPaymentMethod ? (
                  <>
                    <img
                      src={selectedPaymentMethod.image}
                      alt={selectedPaymentMethod.name}
                      className="w-5 h-5 object-contain"
                    />
                    <span className="font-medium">
                      {selectedPaymentMethod.name}
                    </span>
                  </>
                ) : (
                  "Pilih"
                )}
              </button>
            </div>
          </div>

          {/* Kolom Kanan */}
          <div className="border border-gray-200 rounded-2xl bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-xl mb-3">
              Sertakan doa dan dukungan (opsional)
            </h3>
            <textarea
              className="w-full h-[130px] p-3 rounded-lg border border-gray-200 text-[12px]"
              placeholder="Tulis doa untuk penggalang dana atau dirimu agar bisa diamini oleh orang baik lainnya."
              maxLength={300}
            />
          </div>
        </div>

        {/* Total Donasi dan Tombol Submit */}
        <div className="flex items-center justify-between mt-6 gap-4">
          {/* Kotak Total Donasi */}
          <div className="flex items-center justify-between border border-gray-200 rounded-2xl bg-white p-5 shadow-sm h-14 w-[500px]">
            <div className="flex items-center bg-blue-100 text-blue-600 rounded-full p-2 text-2xl">
              <img src="/image-1.png" alt="icon" className="w-7 h-7" />
            </div>
            <div className="flex-1 text-left ml-4">
              <p className="text-gray-500 text-[14px]">Total Donasi</p>
            </div>
            <div className="text-blue-600 font-bold text-[24px]">Rp100.000</div>
          </div>
          <button className="bg-blue-600 text-white h-14 px-12 rounded-2xl text-xl font-semibold hover:bg-blue-700 flex-grow">
            Lanjut Pembayaran
          </button>
        </div>
      </div>

      {/* Pop-up Metode Pembayaran */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 shadow-lg w-[90%] max-w-md relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={togglePaymentModal}
            >
              ✖
            </button>
            <h3 className="font-bold text-xl mb-6 text-center">Pilih Metode Pembayaran</h3>
            <ul className="space-y-4">
              {paymentMethods.map((method) => (
                <li
                  key={method.id}
                  className="flex items-center gap-4 border-b pb-6 cursor-pointer "
                  onClick={() => handlePaymentSelection(method)}
                >
                  <img
                    src={method.image}
                    alt={method.name}
                    className="w-10 h-10 rounded object-contain"
                  />
                  <span className="font-medium text-gray-800">{method.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;