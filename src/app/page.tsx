'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/layout/navbar';
import DonasiCard from '@/components/cards/DonasiCard'; // Import DonasiCard component

import HeroBanner from '@Images/hero-banner.png'; 

export default function campaign() {
  const [donations, setDonations] = useState<any[]>([]); // State to hold fetched data

  useEffect(() => {
    async function fetchDonations() {
      try {
        const response = await fetch('/api/donations'); // Fetch data from the API
        if (!response.ok) throw new Error('Failed to fetch donations');
        const data = await response.json();
        setDonations(data);
      } catch (error) {
        console.error('Error fetching donations:', error);
      }
    }
    fetchDonations();
  }, []);

  return (
    <div className="font-sans">
      <Navbar />

      {/* Hero Banner Section */}
      <div className="relative w-full mt-8 max-w-[1200px] mx-auto h-[360px] flex bg-blue-100 overflow-hidden rounded-2xl transition-transform duration-300 transform hover:scale-105">
        <Link href="/campaign" className="w-full h-full">
          <Image
            src={HeroBanner}
            alt="Hero Banner"
            layout="fill"
            className="cursor-pointer "
          />
        </Link>
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
            image: "/assets/icon-1.png", 
            title: "Hadirkan Dampak Nyata", 
            desc: "Sebarkan kebahagiaan melalui aksi donasi yang membawa perubahan besar. Jelaskan bagaimana setiap kontribusi dapat memberikan arti yang besar bagi sesama." 
          },
          { 
            image: "/assets/icon-2.png", 
            title: "Sebarkan Kebaikan Lebih Cepat", 
            desc: "Manfaatkan kekuatan media sosial dan jaringan online. Bagikan kampanye donasi Anda dengan mudah ke berbagai platform hanya dalam hitungan detik." 
          },
          { 
            image: "/assets/icon-3.png", 
            title: "Terhubung Hingga ke Penjuru Dunia", 
            desc: "Bangun jaringan solidaritas yang kuat untuk mendukung tujuan mulia Anda. Ajak lebih banyak orang untuk berpartisipasi bersama di komunitas lokal dan global." 
          },
        ].map((item, index) => (
          <div 
            key={index} 
            className="flex flex-col justify-end bg-white border-[0.2px] border-gray-500 rounded-2xl text-justify p-6 min-h-[300px] transition-transform duration-300 transform hover:scale-105"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {donations.length > 0 ? (
            donations.map((donation) => (
              <div className='transition-transform duration-300 transform hover:scale-105' key={donation.id}>
                <DonasiCard
                  key={donation.id}
                  id={donation.id}
                  judul={donation.judul}
                  foto={donation.foto}
                  deskripsi={donation.deskripsi}
                  penyelenggara={donation.penyelenggara}
                  targetDonasi={donation.targetDonasi}
                  progressDonasi={donation.progressDonasi}
                  batasWaktu={donation.batasWaktu}
                />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-3">
              Data donasi tidak tersedia saat ini.
            </p>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mt-10 px-16 py-14">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        <p className="text-gray-400 mt-2 mb-16">
          Kami di sini untuk membantu Anda memulai perjalanan kebaikan. Temukan jawabannya di sini!
        </p>
        <div className="max-w-full mx-auto divide-y divide-gray-200">
          {[
            {
              question: "Bagaimana Cara Saya Berdonasi?",
              answer: "Untuk berdonasi, Anda dapat mengunjungi halaman donasi kami, memilih jumlah yang ingin Anda sumbangkan, dan memilih metode pembayaran yang paling nyaman bagi Anda. Kami menerima berbagai metode pembayaran termasuk kartu kredit, transfer bank, dan e-wallet.",
            },
            {
              question: "Bisakah Saya Berdonasi untuk Mengenang Seseorang?",
              answer: "Tentu saja! Anda bisa membuat donasi dalam nama seseorang yang ingin Anda kenang. Kami menyediakan opsi untuk menambahkan nama atau pesan pribadi pada donasi tersebut, sehingga bisa menjadi bentuk penghormatan yang berarti.",
            },
            {
              question: "Bisakah Saya Mengatur Donasi Berkala?",
              answer: "Ya, Anda dapat mengatur donasi berkala untuk memastikan sumbangan Anda terus berlanjut sesuai dengan jadwal yang Anda pilih. Cukup pilih opsi ‘Donasi Berkala’ saat Anda melakukan donasi pertama, dan tentukan frekuensi yang Anda inginkan.",
            },
            {
              question: "Bagaimana Donasi Saya Akan Digunakan?",
              answer: "Donasi Anda akan digunakan untuk mendukung berbagai program amal yang kami jalankan, seperti membantu anak-anak kurang mampu, membangun fasilitas kesehatan, dan mendukung pendidikan. Setiap dana akan dipergunakan dengan transparansi penuh, dan kami memberikan laporan penggunaan dana kepada para donatur.",
            },
          ].map((faq, index) => (
            <details key={index} className="group py-4 cursor-pointer">
              {/* FAQ Summary */}
              <summary className="flex justify-between items-center text-lg font-semibold text-gray-800 hover:text-blue-500 transition">
                {faq.question}
                <span className="text-xl text-gray-400 group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>

              {/* FAQ Content */}
              <p className="mt-2 text-sm text-gray-500">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white mt-16 py-8 rounded-2xl w-11/12 mx-auto shadow-lg mb-8">
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
    </div>
  );
}
