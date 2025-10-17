"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation"; // For getting current path in Next.js 13+ app directory
import MenuDesktop from "./MenuDesktop";
import MenuPhone from "./MenuPhone";

const menuItems = [
  {
    name: "LECTURES",
    link: "/lectures",
    img1: "/menu_icon1.png",
    img2: "/menu1.png",
  },
  {
    name: "CREDITS",
    link: "/credits",
    img1: "/menu_icon2.png",
    img2: "/menu2.png",
  },
  {
    name: "ROBOWARS",
    link: "/test",
    img1: "/menu_icon3.png",
    img2: "/menu3.png",
  },
  {
    name: "COMPETITIONS",
    link: "/competitions",
    img1: "/menu_icon4.png",
    img2: "/menu4.png",
  },
  {
    name: "EVENTS",
    link: "/events",
    img1: "/menu_icon5.png",
    img2: "/menu5.png",
  },
  {
    name: "SPONSORS",
    link: "/sponsors",
    img1: "/menu_icon6.png",
    img2: "/menu6.png",
  },
  {
    name: "CONTACT",
    link: "/contact",
    img1: "/menu_icon7.png",
    img2: "/menu7.png",
  },
  {
    name: "WORKSHOP",
    link: "/workshops",
    img1: "/menu_icon8.png",
    img2: "/menu8.png",
  },
  {
    name: "TEAM",
    link: "/team",
    img1: "/menu_icon9.png",
    img2: "/menu9.png",
  },
  {
    name: "HOME",
    link: "/",
    img1: "/menu_icon10.png",
    img2: "/menu10.png",
  },
  {
    name: "ACCOMODATION",
    link: "/accomodation",
    img1: "/menu_icon11.png",
    img2: "/menu11.png",
  },
  {
    name: "FAQS",
    link: "/character-demo",
    img1: "/menu_icon12.png",
    img2: "/menu12.png",
  },
];

export default function Menupage() {
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname(); // This gets the current path

  console.log("Current page:", pathname);

  // Mobile detection
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden backdrop-blur-lg">

      {isMobile ? (
        <MenuPhone menuItems={menuItems} currentPath={pathname} />
      ) : (
        <MenuDesktop menuItems={menuItems} currentPath={pathname} />
      )}
    </div>
  );
}
