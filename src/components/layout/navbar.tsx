'use client'

import React from 'react';
import Logo from '@Images/logo.png';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/auth');
  };

  return (
    <div className="flex justify-between items-center p-6 px-12 bg-white">
      <div className="flex flex-row items-center gap-6">
        <Image src={Logo} alt="Logo" width="136" height="200" />

        <h1 className="text-2xl text-neutral-300 font-normal">|</h1>
        <div className="flex flex-row text-xl font-semibold items-center gap-8 ml-2">
          <h1>Home</h1>
          <h1>Donation</h1>
          <h1>FAQ</h1>
        </div>
      </div>
      <Button
        className="bg-[#4C84F6] font-semibold text-white text-xl px-6 py-2 rounded-xl"
        onClick={handleLoginClick}
      >
        Masuk
      </Button>
    </div>
  );
};

export default Navbar;