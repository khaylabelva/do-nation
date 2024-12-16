'use client';

import React from 'react';
import Logo from '@Images/logo.png';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname(); // Get the current path

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Donation', path: '/homepage' },
    { name: 'History', path: '/history' },
  ];

  return (
    <div className="flex justify-between items-center p-6 px-12 bg-white">
      <div className="flex flex-row items-center gap-6">
        {/* Logo navigates to '/' */}
        <Image
          src={Logo}
          alt="Logo"
          width="136"
          height="200"
          className="cursor-pointer"
          onClick={() => router.push('/')}
        />

        <h1 className="text-2xl text-neutral-300 font-normal">|</h1>

        {/* Navigation Links */}
        <div className="flex flex-row text-xl font-semibold items-center gap-8 ml-2">
          {navLinks.map((link) => (
            <h1
              key={link.name}
              onClick={() => router.push(link.path)}
              className={`cursor-pointer bg-transparent transition-transform duration-300 transform hover:scale-105 ${
                pathname === link.path
                  ? 'text-blue-500 underline decoration-blue-500 underline-offset-4'
                  : 'text-gray-800'
              }`}
            >
              {link.name}
            </h1>
          ))}
        </div>
      </div>

      {/* Masuk Button */}
      <Button
        className="bg-[#4C84F6] font-semibold text-white text-xl px-6 py-2 rounded-xl"
        onClick={() => router.push('/auth')}
      >
        Masuk
      </Button>
    </div>
  );
};

export default Navbar;
