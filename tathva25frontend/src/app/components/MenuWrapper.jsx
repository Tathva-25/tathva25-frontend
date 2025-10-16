"use client";

import { useState } from "react";
import Menupage from "./Menupage";
import { Menu, X } from "lucide-react";

export default function MenuWrapper({ children }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="fixed top-6 left-6 z-50 bg-white text-black p-3 rounded-full shadow-lg  transition-all duration-300"
        aria-label="Toggle menu"
      >
        {showMenu ? <X size={22} /> : <Menu size={22} />}
      </button>

      {showMenu && (
        <div className="fixed inset-0 z-40  ">
          <Menupage />
        </div>
      )}

      <main
        className={`relative z-10 transition-opacity  backdrop-blur-md duration-300 ${
          showMenu ? "opacity-20" : "opacity-100"
        }`}
      >
        {children}
      </main>
    </>
  );
}
