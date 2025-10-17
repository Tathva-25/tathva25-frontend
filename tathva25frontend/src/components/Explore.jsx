"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { HiArrowNarrowRight } from "react-icons/hi"; // Big white arrow

export default function Explore() {
  const router = useRouter();

  const characters = [
    {
      id: 1,
      name: "TECHNICAL",
      surname: "WORKSHOPS",
      route: "/workshops", // new route
      image:
        "https://wallpapers.com/images/hd/sukuna-animated-drawing-4k-mgvy4syzrxckjdd8.jpg",
      color: { primary: "#000", accent: "#fff", bg: "#1a1a1a", glow: "rgba(255,255,255,0.3)" },
      date: { d: "24", m: "10", y: "25" },
      school: "INNOVATE - BUILD - LEARN",
    },
    {
      id: 2,
      name: "THRILLING",
      surname: "COMPETITIONS",
      route: "/competitions",
      image: "https://m.media-amazon.com/images/I/71Yd3+YYk2L.jpg",
      color: { primary: "#000", accent: "#fff", bg: "#1a1a1a", glow: "rgba(255,255,255,0.3)" },
      date: { d: "25", m: "10", y: "25" },
      school: "INNOVATE - COMPETE - CONQUER",
    },
    {
      id: 3,
      name: "INSIGHTFUL",
      surname: "LECTURES",
      route: "/lectures",
      image: "https://setlivewallpaper.com/wp-content/uploads/2023/11/Toji-Fushiguro-thumb.png",
      color: { primary: "#000", accent: "#fff", bg: "#1a1a1a", glow: "rgba(255,255,255,0.3)" },
      date: { d: "26", m: "10", y: "25" },
      school: "THINK - INSPIRE - INNOVATE",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#0a0a0a] py-12 flex flex-col items-center justify-center gap-8 px-4 md:px-12">
      {characters.map((char, index) => (
        <div
          key={char.id}
          className="relative w-full max-w-4xl h-[340px] md:h-[380px] rounded-[32px] overflow-hidden cursor-pointer flex flex-col md:flex-row"
          style={{ background: char.color.bg, boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}
          onClick={() => router.push(char.route)}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 z-0 transition-transform duration-300 ease-out hover:scale-110"
            style={{
              backgroundImage: `url(${char.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "brightness(0.9)",
            }}
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 z-[1] bg-black/30" />

          {/* Content */}
          <div className="relative z-10 flex flex-col md:flex-row w-full h-full p-6 md:p-8 gap-4 md:gap-12 items-center md:items-start">
            {/* Left Section */}
            <div className="flex-1 flex flex-col justify-between h-full">
              {/* Top Title + Arrow */}
              <div className="flex items-center gap-4 md:gap-6">
                <div className="text-white text-xl md:text-3xl font-bold tracking-wide flex items-center gap-2">
                  {char.surname}
                  <HiArrowNarrowRight className="text-white w-6 h-6 md:w-8 md:h-8 transition-transform duration-200 hover:translate-x-2" />
                </div>
              </div>

              {/* Date */}
              <div className="mt-4 text-white text-lg md:text-2xl font-bold tracking-wider flex gap-2">
                <span>{char.date.d}</span>
                <span>{char.date.m}</span>
                <span>{char.date.y}</span>
              </div>

              {/* School Info */}
              <div className="mt-2 p-2 md:p-3 bg-black/60 text-white text-xs md:text-sm font-semibold max-w-[90%] md:max-w-[400px] rounded-md">
                {char.school}
              </div>
            </div>

            {/* Right Section - Large Name */}
            <div className="flex-1 flex flex-col justify-end items-end md:items-end w-full h-full text-right">
              <div className="text-white/40 text-2xl md:text-4xl font-medium mb-1">{char.name}</div>
              <div
                className="text-5xl md:text-7xl font-black italic leading-[0.85] tracking-tight"
                style={{ WebkitTextStroke: `1px ${char.color.accent}40` }}
              >
                {char.surname}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}