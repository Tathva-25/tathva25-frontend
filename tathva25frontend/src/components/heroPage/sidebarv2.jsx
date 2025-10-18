"use client";
import { useState, useEffect } from "react";
import ResponsiveLayout from "../Wheels";
import Proshow from "@/components/proshow/proshow";
import Image from "next/image";
import Explore from "@/app/components/Explore";
import Expo from "../Expo";
import Marquee from "@/app/components/Marquee";
import Robowars from "@/app/components/Robowars";
import MenuWrapper from "../MenuWrapper";
import GamePage from "@/app/gaming/page";
import { Hero } from "./hero";
import { useRouter } from "next/navigation";
import localfont from "next/font/local";
import YourComponent from "@/app/components/Footer";

const someFont = localfont({
  src: "../../../public/fonts/michroma.ttf",
  display: "swap", // Add this for better loading
});

export default function Sidebar() {

  const [hovered, setHovered] = useState(null);
  const [scrollProgress, setScrollProgress] = useState({});
  const [activeSection, setActiveSection] = useState(1);
  const [expandedSection, setExpandedSection] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // Check for JWT in localStorage
    const jwt = localStorage.getItem("jwt") || localStorage.getItem("token");
    setIsLoggedIn(!!jwt);
  }, []);

  const handleGoogleSignIn = () => {
    window.location.href =
      "https://accounts.google.com/o/oauth2/auth?client_id=783776933631-jdor6jdgf8qvmmbbj4hrtt9con1no8ue.apps.googleusercontent.com&redirect_uri=https://api.tathva.org/api/auth/callback&response_type=code&scope=openid%20email%20profile&prompt=consent";
  };

  const handleVisitDashboard = () => {
    router.push("/profile");
  };

  const handleMenuButtonClick = () => {
    setMenuOpen((prev) => !prev);
  };


  return (
    <>
      {/* Desktop Sidebar */}
 <aside
  className={`hidden md:block fixed z-[1000] h-screen items-center border-r  w-12  ${someFont.className}`}
>
  <button
    onClick={() => setMenuOpen((prev) => !prev)}
    className="mt-4 ml-2 w-8 h-8 flex items-center justify-center rounded transition-colors duration-200"
    aria-label="Toggle menu"
  >
    {menuOpen ? (
      // Close Icon (X)
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M6 18L18 6M6 6l12 12" />
      </svg>
    ) : (
      // Hamburger Icon (Menu)
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M3 12h18M3 6h18M3 18h18" />
      </svg>
    )}
  </button>

  <div
    className="mt-25 text-[15px] whitespace-nowrap"
    style={{
      transform: "rotate(90deg)",
      transformOrigin: "center",
      letterSpacing: "0.45em",
    }}
  >
    TATHVA 25;
  </div>
</aside>


      {/* Mobile Menu Bar */}
      <div
        className={`md:hidden  z-[500] bg-white border-black ${someFont.className}`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-black">
          {/* Logo - Smaller and positioned beside the menu */}
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 flex-shrink-0">
              <Image
                src="/images/TATHVA25_LOGO.png"
                alt="Tathva Logo"
                width={32}
                height={32}
                className="w-full h-full object-contain"
              />
            </div>
          </div>


            <div className="flex gap-2 text-sm">
          {isLoggedIn ? (
            <button
              onClick={handleVisitDashboard}
              className={`${someFont.className} font-light z-30`}
            >
              Profile
            </button>
          ) : (
            <button
              onClick={handleGoogleSignIn}
              className={`${someFont.className}  font-light z-30`}
            >
              LOGIN
            </button>
          )}

          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="w-6 h-6 flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 12h18M3 6h18M3 18h18" />
                </svg>
              )}
            </button>
          </div>
          </div>
        </div>

        {/* Scroll Progress Bar - Mobile Only */}
        <div className="w-full h-1 border-0">
          <div
            className="bg-black h-full transition-all duration-150 ease-out"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>

      {menuOpen && (
        <div className="absolute z-[100] bg-black/90 flex items-center justify-center">
          <MenuWrapper onClose={() => setMenuOpen(false)} />
        </div>
      )}


    </>
  );
}
