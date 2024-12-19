'use client';

import React, { useEffect, useState } from 'react';
import Logo from '@Images/logo.png';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import ProfileIcon from '@Images/profile-icon.png';
import { logOut } from '@/app/api/auth/signout/route';

interface User {
  id: string;
  username: string;
  email: string;
}

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState<User | null>(null);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Donation', path: '/campaign' },
    { name: 'Leaderboard', path: '/leaderboard' },
    { name: 'History', path: '/history', requiresLogin: true }, // Requires login
  ];

  // Fetch user session on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/user');
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error('Failed to fetch user session', error);
      }
    };

    fetchUser();
  }, []);

  const isDonationActive = pathname.includes('/donation') || pathname.includes('/action') || pathname === '/campaign';

  const handleNavClick = (path: string, requiresLogin: boolean) => {
    if (!user && requiresLogin) {
      toast.error('Kamu harus login terlebih dahulu!');
      return;
    }
    router.push(path);
  };

  return (
    <div className="flex justify-between items-center p-6 px-12 bg-white">
      <div className="flex flex-row items-center gap-6">
        {/* Logo navigates to '/' */}
        <Image
          src={Logo}
          alt="Logo"
          width={136}
          height={200}
          className="cursor-pointer"
          onClick={() => router.push('/')}
        />

        <h1 className="text-2xl text-neutral-300 font-normal">|</h1>

        {/* Navigation Links */}
        <div className="flex flex-row text-xl font-semibold items-center gap-8 ml-2">
          {navLinks.map((link) => {
            const isActive =
              (link.path === '/' && pathname === '/') ||
              (link.path === '/leaderboard' && pathname === '/leaderboard') ||
              (link.path === '/campaign' && isDonationActive) ||
              (link.path === '/history' && pathname === '/history');

            return (
              <div
                key={link.name}
                onClick={() => handleNavClick(link.path, link.requiresLogin || false)}
                className="relative cursor-pointer transition-transform duration-300 transform group"
              >
                <h1
                  className={`transition-colors ${
                    isActive ? 'text-blue-500' : 'text-gray-800'
                  }`}
                >
                  {link.name}
                </h1>
                {/* Garis bawah */}
                <span
                  className={`absolute left-0 bottom-[-2px] h-[2px] bg-blue-500 transition-all duration-300 ease-in-out ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                ></span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Conditional User Info and Button */}
      <div className="flex items-center gap-8">
        {user && (
          <div className="flex items-center gap-2 text-gray-800 font-medium">
            <Image
              src={ProfileIcon}
              alt="Profile Icon"
              width={36}
              height={36}
              className="rounded-full"
            />
            <span className="text-xl ml-2">{user.username}</span>
          </div>
        )}

        {user ? (
          <Button
            className="bg-red-500 font-semibold text-white text-xl px-6 py-2 rounded-xl hover:bg-red-600"
            onClick={() => {
              logOut();
              setUser(null); // Clear user state
            }}
          >
            Keluar
          </Button>
        ) : (
          <Button
            className="bg-[#4C84F6] font-semibold text-white text-xl px-6 py-2 rounded-xl hover:bg-blue-600"
            onClick={() => router.push('/auth')}
          >
            Masuk
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
