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
import frank from "../../../public/images/franklin.png";

const someFont = localfont({
  src: "../../../public/fonts/michroma.ttf",
  display: "swap", // Add this for better loading
});

export default function Sidebar() {
  const items = [
    { num: 1, label: "Home" },
    { num: 2, label: "Explore" },
    { num: 3, label: "RoboWars" },
    { num: 4, label: "Proshow" },
    { num: 5, label: "Wheels" },
    { num: 6, label: "Expo" },
    { num: 7, label: "GPC" },
  ];

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

  useEffect(() => {
    const handleScroll = () => {
      const sections = items.map((item) =>
        document.getElementById(`section-${item.num}`)
      );

      const windowHeight = window.innerHeight;
      const scrollTop = window.scrollY;
      const documentHeight =
        document.documentElement.scrollHeight - windowHeight;

      // Calculate overall scroll progress
      const progress = (scrollTop / documentHeight) * 100;
      setOverallProgress(progress);

      let newProgress = {};
      let newActiveSection = 1;
      let closestSection = 1;
      let minDistance = Infinity;

      sections.forEach((section, index) => {
        if (!section) return;

        const rect = section.getBoundingClientRect();
        const sectionTop = scrollTop + rect.top;
        const sectionHeight = rect.height;
        const sectionBottom = sectionTop + sectionHeight;

        const sectionCenter = sectionTop + sectionHeight / 2;
        const viewportCenter = scrollTop + windowHeight / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestSection = index + 1;
        }

        if (
          scrollTop >= sectionTop - windowHeight / 2 &&
          scrollTop < sectionBottom
        ) {
          newActiveSection = index + 1;
          const sectionScrolled = scrollTop - sectionTop + windowHeight / 2;
          const progress = Math.min(
            Math.max((sectionScrolled / sectionHeight) * 100, 0),
            100
          );
          newProgress[index + 1] = progress;
        }
      });

      setActiveSection(newActiveSection);
      setExpandedSection(closestSection);
      setScrollProgress(newProgress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (num) => {
    const section = document.getElementById(`section-${num}`);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:block fixed top-0 left-0 h-screen w-9 z-[3000] bg-transparent ${someFont.className}`}
      >
        <div className="absolute inset-y-0 left-0 w-full pointer-events-none">
          <div className="h-full border-l border-black/90" />
          <div className="absolute inset-y-0 right-0 w-px border-r border-black/90" />
        </div>

        <div className="relative h-full flex flex-col justify-between items-center py-3">
          {/* Menu Button at Top */}
          <div className="mt-4">
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="w-8 h-8 flex items-center justify-center /5 rounded transition-colors duration-200"
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
          </div>

          <div className="">
            <div
              className="text-[15px] whitespace-nowrap "
              style={{
                transform: "rotate(90deg)",
                transformOrigin: "center",
                letterSpacing: "0.45em",
              }}
            >
              TATHVA 25
            </div>
          </div>

          <div className="w-full">
            {items.map((item, i) => {
              const progress = scrollProgress[item.num] || 0;
              const isActive = activeSection === item.num;
              const isExpanded =
                expandedSection === item.num || hovered === item.num;

              return (
                <div
                  key={item.num}
                  onMouseEnter={() => setHovered(item.num)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => scrollToSection(item.num)}
                  className={`group relative w-full border-t border-black/90 flex flex-col items-center justify-start overflow-hidden font-light ease-in-out cursor-pointer ${
                    i === items.length - 1 ? "border-b border-black/90" : ""
                  } ${isExpanded ? "bg-black/5" : ""}`}
                  style={{
                    maxHeight: isExpanded ? "150px" : "45px",
                  }}
                >
                  <div
                    className="absolute inset-0 bg-black transition-all duration-150 ease-out"
                    style={{
                      height: isActive ? `${progress}%` : "0%",
                      opacity: isActive ? 0.85 : 0,
                    }}
                  />

                  <div className="relative z-10 w-full flex flex-col items-center">
                    <span
                      className={`text-[13px] inline-block mt-[10px] font-light ${
                        isActive && progress > 30 ? "text-white" : "text-black"
                      }`}
                      style={{ transform: "rotate(90deg)" }}
                    >
                      {String(item.num).padStart(2, "0")}/
                    </span>

                    <div className="w-full flex justify-center mt-2 mb-5">
                      <div
                        className={`text-[13px] whitespace-nowrap font-light ${
                          isExpanded
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 -translate-y-2"
                        }`}
                        style={{
                          writingMode: "vertical-rl",
                          textOrientation: "mixed",
                        }}
                      >
                        {item.label.split("").map((letter, idx) => {
                          const letterHeight = 100 / item.label.length;
                          const letterPosition =
                            idx * letterHeight + letterHeight / 2;
                          const isCovered =
                            isActive && progress > letterPosition;

                          return (
                            <span
                              key={idx}
                              className="transition-colors duration-150"
                              style={{
                                color: isCovered ? "white" : "black",
                              }}
                            >
                              {letter}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </aside>

      {/* Mobile Menu Bar */}
      <div
        className={`md:hidden  top-0 left-0 right-0 fixed z-[500] bg-white border-black ${someFont.className}`}
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
            <div className="md:hidden w-32 h-10 flex-shrink-0">
              <Image
                  src={frank}
                  alt="Franklin Logo"
                  width={100}
                  height={100}
                  className=" h-auto relative bottom-7 transition-transform duration-300 hover:scale-105"
                  priority
                  quality={90}
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

      <div className="md:ml-9">
        <section id="section-1">
          <Hero />
          <div className="md:hidden"><Marquee text={"///SCROLL TO CONTINUE"}/></div>
        </section>

        <section id="section-2">
          <Explore />
        </section>

        <section id="section-3">
          <Robowars />
        </section>

        <section id="section-4">
          <Proshow />
        </section>

        <section id="section-5">
          <ResponsiveLayout />
        </section>

        <section id="section-6">
          <Expo />
        </section>
        <section id="section-7">
          <GamePage />
        </section>

        <section id={`section-footer`}>
          <YourComponent />
        </section>
      </div>
    </>
  );
}
