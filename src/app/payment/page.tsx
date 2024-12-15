"use client";
import React from "react";

const PaymentPage = () => {
  return (
    <div className="font-sans h-screen overflow-hidden flex items-center justify-center">
      <div className="container mx-auto px-2 py-4 md:px-4 md:py-6">
        {/* Header */}
        <div className="flex items-center mb-4">
          <button className="text-blue-500 text-2xl mr-4">←</button>
          <h1 className="text-3xl font-bold">Donasi Banjir Bandang di Palu</h1>
          <span className="ml-auto text-gray-400 text-base">
            Unity Foundation
          </span>
        </div>

        {/* Isi Nominal Donasi */}
        <div className="border border-gray-200 rounded-lg bg-white p-4 mb-4 shadow-sm">
          <h2 className="font-semibold text-xl mb-3">Isi Nominal Donasi:</h2>
          <div className="flex items-center bg-blue-50 rounded-lg p-3">
            <div className="flex items-center justify-center bg-blue-600 text-white rounded-full w-12 h-12 text-lg font-bold">
              Rp
            </div>
            <input
              type="text"
              defaultValue="100.000"
              className="ml-4 text-black font-bold text-2xl bg-transparent border-none outline-none w-full"
            />
          </div>
        </div>

        {/* Dua Kolom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Kolom Kiri */}
          <div className="flex flex-col gap-3">
            {/* Informasi Donatur */}
            <div className="border border-gray-200 rounded-lg bg-white p-4 shadow-sm">
              <h3 className="font-semibold text-xl mb-1">Siti Kusmini</h3>
              <p className="text-gray-400 text-sm mb-3">
                sitikusmini mail.com
              </p>
              <label className="flex items-center text-sm">
                <input type="checkbox" className="mr-2" />
                Sembunyikan nama saya (donasi sebagai anonim)
              </label>
            </div>

            {/* Pilih Metode Pembayaran */}
            <div className="border border-gray-200 rounded-lg bg-white p-4 shadow-sm">
              <h3 className="font-semibold text-xl mb-3">
                Pilih Metode Pembayaran
              </h3>
              <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 text-base font-semibold">
                Pilih
              </button>
            </div>
          </div>

          {/* Kolom Kanan */}
          <div className="border border-gray-200 rounded-lg bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-xl mb-3">
              Sertakan doa dan dukungan (opsional)
            </h3>
            <textarea
              className="w-full h-32 p-3 rounded-lg border border-gray-200 text-base"
              placeholder="Tulis doa untuk penggalang dana..."
              maxLength={300}
            />
          </div>
        </div>

        {/* Total Donasi dan Tombol Submit */}
        <div className="flex items-center justify-between border border-gray-200 rounded-lg bg-white p-4 mt-4 shadow-sm">
          <div className="flex items-center">
            <div className="bg-blue-100 text-blue-600 rounded-full p-3 mr-3 text-2xl">
              💙
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Donasi</p>
              <p className="text-blue-600 font-bold text-2xl">Rp100.000</p>
            </div>
          </div>
          <button className="bg-blue-600 text-white py-2 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700">
            Lanjut Pembayaran
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;