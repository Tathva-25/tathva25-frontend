"use client";
import Image from "next/image";
import logo from "../../../public/images/TATHVA25_LOGO.png";

export default function Navbar() {
  return (
    <nav
      className={` fixed top-0 left-0 w-full z-50 transition-all duration-300 `}
    >
      <div className="mr-5   flex justify-between items-center">
        <div className="ml-auto mt-4">
          <Image
            src={logo}
            alt="Tathva Logo"
            width={100}
            height={100}
            className="h-10 mt-2 w-auto transition-transform duration-300 hover:scale-105"
            priority
            quality={90}
          />
        </div>
      </div>
    </nav>
  );
}
