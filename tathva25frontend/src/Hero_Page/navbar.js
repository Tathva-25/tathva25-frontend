'use client'
import Image from 'next/image';
import logo from '../../public/images/TATHVA25_LOGO.png'

export default function Navbar() {
  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo - Hidden on mobile, visible on desktop */}
        <div className="hidden md:block ml-auto mt-4">
          <Image
            src={logo.src}
            alt="Tathva Logo"
            width={100}
            height={100}
            className="h-14 w-auto transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>
    </nav>
  );
}