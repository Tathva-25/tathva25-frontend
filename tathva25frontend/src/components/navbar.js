'use client'

import logo from './assets/TATHVA25_LOGO.png'



export default function Navbar() {

  return (
    <nav
      className={` fixed top-0 left-0 w-full z-50 transition-all duration-300 `}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        <div className="ml-auto mt-4">
          <img
            src={logo.src}
            alt="Tathva Logo"
            className="h-14 w-auto transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>
    </nav>
  );
}