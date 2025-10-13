"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation"; // For getting current path in Next.js 13+ app directory
import MenuDesktop from "./MenuDesktop";
import MenuPhone from "./MenuPhone";

const menuItems = [
  {
    name: "LECTURES",
    link: "/lectures",
    img1: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=100&h=100&fit=crop&crop=center",
    img2: "/menu1.png",
  },
  {
    name: "WORKSHOPS",
    link: "/workshops",
    img1: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop&crop=center",
    img2: "/menu2.png",
  },
  {
    name: "ROBOWARS",
    link: "/robowars",
    img1: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=100&h=100&fit=crop&crop=center",
    img2: "/menu3.png",
  },
  {
    name: "COMPETITIONS",
    link: "/competitions",
    img1: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=100&h=100&fit=crop&crop=center",
    img2: "/menu4.png",
  },
  {
    name: "EVENTS",
    link: "/events",
    img1: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=100&h=100&fit=crop&crop=center",
    img2: "/menu5.png",
  },
  {
    name: "SPONSORS",
    link: "/sponsors",
    img1: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop&crop=center",
    img2: "/menu6.png",
  },
  {
    name: "CONTACT",
    link: "/contact",
    img1: "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=100&h=100&fit=crop&crop=center",
    img2: "/menu7.png",
  },
  {
    name: "ABOUT",
    link: "/about",
    img1: "https://images.unsplash.com/photo-1552664688-cf412ec27db2?w=100&h=100&fit=crop&crop=center",
    img2: "/menu8.png",
  },
  {
    name: "TEAM",
    link: "/team",
    img1: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop&crop=center",
    img2: "/menu9.png",
  },
  {
    name: "GALLERY",
    link: "/gallery",
    img1: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=100&h=100&fit=crop&crop=center",
    img2: "/menu10.png",
  },
  {
    name: "BLOG",
    link: "/blog",
    img1: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=100&h=100&fit=crop&crop=center",
    img2: "/menu11.png",
  },
  {
    name: "FAQS",
    link: "/faqs",
    img1: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=100&h=100&fit=crop&crop=center",
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
    <div className="relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute z-2 top-[2%] right-[2%] w-full flex px-8 py-4 justify-end">
        <img src="logo.png" width={200} height={200} alt="Logo" />
      </div>

      {/* Conditionally render desktop or mobile component */}
      {isMobile ? (
        <MenuPhone menuItems={menuItems} currentPath={pathname} />
      ) : (
        <MenuDesktop menuItems={menuItems} currentPath={pathname} />
      )}
    </div>
  );
}
