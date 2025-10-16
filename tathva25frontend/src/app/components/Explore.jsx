"use client";
import { useState } from "react";

export default function Explore() {
const characters = [
  {
    id: 1,
    name: "TECHNICAL",
    surname: "WORKSHOPS",
    image:
      "https://wallpapers.com/images/hd/sukuna-animated-drawing-4k-mgvy4syzrxckjdd8.jpg",
    color: {
      primary: "#000000",
      accent: "#ffffff",
      bg: "#1a1a1a",
      glow: "rgba(255, 255, 255, 0.3)",
    },
    barcode: "||||||||||||",
    date: { d: "24", m: "10", y: "25" },
    school: "INNOVATE - BUILD - LEARN",
    subtitle:
      "Hands-on sessions led by experts, where you craft, code, and create the future.",
    status: "OPEN",
  },
  {
    id: 2,
    name: "THRILLING",
    surname: "COMPETITIONS",
image: "https://m.media-amazon.com/images/I/71Yd3+YYk2L.jpg",
    color: {
      primary: "#000000",
      accent: "#ffffff",
      bg: "#1a1a1a",
      glow: "rgba(255, 255, 255, 0.3)",
    },
    barcode: "||||||||||||",
    date: { d: "25", m: "10", y: "25" },
    school: "INNOVATE - COMPETE - CONQUER",
    subtitle:
      "Battle through tech, design, and innovation challenges to prove your mettle.",
    status: "ONGOING",
  },
  {
    id: 3,
    name: "INSIGHTFUL",
    surname: "LECTURES",
    image: "https://setlivewallpaper.com/wp-content/uploads/2023/11/Toji-Fushiguro-thumb.png",
    color: {
      primary: "#000000",
      accent: "#ffffff",
      bg: "#1a1a1a",
      glow: "rgba(255, 255, 255, 0.3)",
    },
    barcode: "||||||||||||",
    date: { d: "26", m: "10", y: "25" },
    school: "THINK - INSPIRE - INNOVATE",
    subtitle:
      "Engage with pioneers and visionaries who redefine the boundaries of possibility.",
    status: "UPCOMING",
  },
];


  return (
    <div className="w-full min-h-screen bg-[#0a0a0a] py-12 flex flex-col items-center justify-center gap-8">
      {characters.map((char, index) => (
        <div
          key={char.id}
          className="relative w-full h-[340px] rounded-[32px] overflow-hidden cursor-pointer"
          style={{
            background: char.color.bg,
            boxShadow: `0 10px 30px rgba(0, 0, 0, 0.5)`,
          }}
        >
          {/* Corner Decorations */}
          <div
            className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 opacity-60"
            style={{ borderColor: char.color.accent }}
          />
          <div
            className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 opacity-60"
            style={{ borderColor: char.color.accent }}
          />
          <div
            className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 opacity-60"
            style={{ borderColor: char.color.accent }}
          />
          <div
            className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 opacity-60"
            style={{ borderColor: char.color.accent }}
          />

          {/* Main Content Container */}
          <div className="relative w-full h-full flex items-center">
            {/* Background Image */}
            <div
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: `url(${char.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "brightness(0.9)",
              }}
            />
            {/* Dark Overlay */}
            <div
              className="absolute inset-0 z-[1]"
              style={
                {
                  // background: `linear-gradient(90deg, ${char.color.primary}dd 0%, ${char.color.primary}99 40%, transparent 70%)`,
                }
              }
            />

            {/* Left Side Content */}
            <div className="relative z-10 w-full h-full px-8 py-6">
              {/* Main Content Border - Wraps Everything */}
              <div
                className="relative w-full h-full p-4 flex flex-col justify-between"
                style={{
                  border: `2px solid ${char.color.accent}40`,
                  clipPath:
                    "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
                }}
              >
                {/* Corner accents */}
                <div
                  className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2"
                  style={{ borderColor: char.color.accent }}
                />
                <div
                  className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2"
                  style={{ borderColor: char.color.accent }}
                />
                <div
                  className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2"
                  style={{ borderColor: char.color.accent }}
                />
                <div
                  className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2"
                  style={{ borderColor: char.color.accent }}
                />

                {/* Top Section */}
                <div className="flex items-start justify-between">
                  {/* Layout 1 (Card 1): Top Left Content */}
                  {index === 0 && (
                    <>
                      <div>
                        {/* Japanese Title with dots */}
                        <div className="relative flex items-center gap-2 mb-2 p-2 pr-4">
                          {/* Sci-fi border corners */}
                          <div
                            className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2"
                            style={{ borderColor: char.color.accent }}
                          />
                          <div
                            className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2"
                            style={{ borderColor: char.color.accent }}
                          />
                          <div
                            className="absolute top-0 right-0 w-8 h-[2px]"
                            style={{
                              background: char.color.accent,
                              opacity: 0.5,
                            }}
                          />
                          <div
                            className="absolute bottom-0 right-0 w-8 h-[2px]"
                            style={{
                              background: char.color.accent,
                              opacity: 0.5,
                            }}
                          />

                          <div className="flex flex-col gap-1">
                            <div
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ background: char.color.accent }}
                            />
                            <div
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ background: char.color.accent }}
                            />
                            <div
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ background: char.color.accent }}
                            />
                            <div
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ background: char.color.accent }}
                            />
                          </div>
                          <div>
                            <div className="text-[10px] tracking-[0.15em] font-bold text-white/80 mb-0.5">
                              呪術廻戦
                            </div>
                            <div className="text-[9px] tracking-[0.2em] text-white/50 font-semibold">
                              JUJUTSU KAISEN
                            </div>
                          </div>
                        </div>

                        {/* Character Name Label */}
                        <div className="relative mt-3 mb-1 px-3 py-2 inline-block">
                          {/* Sci-fi border frame */}
                          <div
                            className="absolute top-0 left-0 w-2 h-2 border-l-2 border-t-2"
                            style={{ borderColor: char.color.accent }}
                          />
                          <div
                            className="absolute top-0 right-0 w-2 h-2 border-r-2 border-t-2"
                            style={{ borderColor: char.color.accent }}
                          />
                          <div
                            className="absolute bottom-0 left-0 w-2 h-2 border-l-2 border-b-2"
                            style={{ borderColor: char.color.accent }}
                          />
                          <div
                            className="absolute bottom-0 right-0 w-2 h-2 border-r-2 border-b-2"
                            style={{ borderColor: char.color.accent }}
                          />

                          {/* Angled cuts */}
                          <div
                            className="absolute top-0 left-2 w-3 h-[2px]"
                            style={{ background: char.color.accent }}
                          />
                          <div
                            className="absolute bottom-0 right-2 w-3 h-[2px]"
                            style={{ background: char.color.accent }}
                          />

                          <div
                            className="relative px-1"
                            style={{
                              background: "rgba(0, 0, 0, 0.6)",
                            }}
                          >
                            <div className="text-[10px] tracking-[0.1em] text-white/70 font-semibold">
                              {char.name} {char.surname}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Top Right Content - Stripe and Info Box */}
                      <div className="flex flex-col items-end gap-3">
                        {/* Decorative Stripes */}
                        <div className="flex gap-1">
                          {[...Array(7)].map((_, i) => (
                            <div
                              key={i}
                              className="w-2 h-16 transform -skew-x-12"
                              style={{
                                background:
                                  i % 2 === 0
                                    ? char.color.accent
                                    : "transparent",
                                opacity: 0.8,
                              }}
                            />
                          ))}
                        </div>

                        {/* Info Box Top Right */}
                        <div
                          className="relative p-3 backdrop-blur-sm"
                          style={{
                            background: "rgba(0, 0, 0, 0.6)",
                            maxWidth: "200px",
                            clipPath:
                              "polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)",
                          }}
                        >
                          {/* Sci-fi border corners */}
                          <div
                            className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2"
                            style={{ borderColor: char.color.accent }}
                          />
                          <div
                            className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2"
                            style={{ borderColor: char.color.accent }}
                          />
                          <div
                            className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2"
                            style={{ borderColor: char.color.accent }}
                          />

                          {/* Glowing accent lines */}
                          <div
                            className="absolute top-0 left-4 right-4 h-[2px]"
                            style={{
                              background: `linear-gradient(90deg, ${char.color.accent}, transparent)`,
                              opacity: 0.6,
                            }}
                          />
                          <div
                            className="absolute bottom-0 left-4 right-8 h-[2px]"
                            style={{
                              background: `linear-gradient(90deg, transparent, ${char.color.accent})`,
                              opacity: 0.6,
                            }}
                          />

                          <div
                            className="text-[9px] tracking-[0.1em] font-bold mb-1"
                            style={{ color: char.color.accent }}
                          >
                            JUJUTSU KAISEN
                          </div>
                          <div className="text-[7px] leading-[1.4] text-white/60 font-normal">
                            {char.school.substring(0, 60)}...
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Layout 2 (Card 2): Centered Content */}
                  {index === 1 && (
                    <>
                      <div className="flex flex-col items-center gap-3 mx-auto">
                        {/* Decorative Stripes - Top Center */}
                        <div className="flex gap-1">
                          {[...Array(7)].map((_, i) => (
                            <div
                              key={i}
                              className="w-2 h-16 transform -skew-x-12"
                              style={{
                                background:
                                  i % 2 === 0
                                    ? char.color.accent
                                    : "transparent",
                                opacity: 0.8,
                              }}
                            />
                          ))}
                        </div>

                        {/* Character Name Label - Centered */}
                        <div className="relative px-3 py-2 inline-block">
                          {/* Sci-fi border frame */}
                          <div
                            className="absolute top-0 left-0 w-2 h-2 border-l-2 border-t-2"
                            style={{ borderColor: char.color.accent }}
                          />
                          <div
                            className="absolute top-0 right-0 w-2 h-2 border-r-2 border-t-2"
                            style={{ borderColor: char.color.accent }}
                          />
                          <div
                            className="absolute bottom-0 left-0 w-2 h-2 border-l-2 border-b-2"
                            style={{ borderColor: char.color.accent }}
                          />
                          <div
                            className="absolute bottom-0 right-0 w-2 h-2 border-r-2 border-b-2"
                            style={{ borderColor: char.color.accent }}
                          />
                          <div
                            className="absolute top-0 left-2 w-3 h-[2px]"
                            style={{ background: char.color.accent }}
                          />
                          <div
                            className="absolute bottom-0 right-2 w-3 h-[2px]"
                            style={{ background: char.color.accent }}
                          />
                          <div
                            className="relative px-1"
                            style={{
                              background: "rgba(0, 0, 0, 0.6)",
                            }}
                          >
                            <div className="text-[10px] tracking-[0.1em] text-white/70 font-semibold">
                              {char.name} {char.surname}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Info Box - Top Right */}
                      <div
                        className="relative p-3 backdrop-blur-sm"
                        style={{
                          background: "rgba(0, 0, 0, 0.6)",
                          maxWidth: "200px",
                          clipPath:
                            "polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)",
                        }}
                      >
                        <div
                          className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2"
                          style={{ borderColor: char.color.accent }}
                        />
                        <div
                          className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2"
                          style={{ borderColor: char.color.accent }}
                        />
                        <div
                          className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2"
                          style={{ borderColor: char.color.accent }}
                        />
                        <div
                          className="absolute top-0 left-4 right-4 h-[2px]"
                          style={{
                            background: `linear-gradient(90deg, ${char.color.accent}, transparent)`,
                            opacity: 0.6,
                          }}
                        />
                        <div
                          className="absolute bottom-0 left-4 right-8 h-[2px]"
                          style={{
                            background: `linear-gradient(90deg, transparent, ${char.color.accent})`,
                            opacity: 0.6,
                          }}
                        />
                        <div
                          className="text-[9px] tracking-[0.1em] font-bold mb-1"
                          style={{ color: char.color.accent }}
                        >
                          JUJUTSU KAISEN
                        </div>
                        <div className="text-[7px] leading-[1.4] text-white/60 font-normal">
                          {char.school.substring(0, 60)}...
                        </div>
                      </div>
                    </>
                  )}

                  {/* Layout 3 (Card 3): Right-aligned Content */}
                  {index === 2 && (
                    <>
                      {/* Info Box - Top Left */}
                      <div
                        className="relative p-3 backdrop-blur-sm"
                        style={{
                          background: "rgba(0, 0, 0, 0.6)",
                          maxWidth: "200px",
                          clipPath:
                            "polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)",
                        }}
                      >
                        <div
                          className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2"
                          style={{ borderColor: char.color.accent }}
                        />
                        <div
                          className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2"
                          style={{ borderColor: char.color.accent }}
                        />
                        <div
                          className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2"
                          style={{ borderColor: char.color.accent }}
                        />
                        <div
                          className="absolute top-0 left-4 right-4 h-[2px]"
                          style={{
                            background: `linear-gradient(90deg, ${char.color.accent}, transparent)`,
                            opacity: 0.6,
                          }}
                        />
                        <div
                          className="absolute bottom-0 left-4 right-8 h-[2px]"
                          style={{
                            background: `linear-gradient(90deg, transparent, ${char.color.accent})`,
                            opacity: 0.6,
                          }}
                        />
                        <div
                          className="text-[9px] tracking-[0.1em] font-bold mb-1"
                          style={{ color: char.color.accent }}
                        >
                          JUJUTSU KAISEN
                        </div>
                        <div className="text-[7px] leading-[1.4] text-white/60 font-normal">
                          {char.school.substring(0, 60)}...
                        </div>
                      </div>

                      {/* Right Side Content */}
                      <div>
                        {/* Decorative Stripes */}
                        <div className="flex gap-1 justify-end mb-3">
                          {[...Array(7)].map((_, i) => (
                            <div
                              key={i}
                              className="w-2 h-16 transform -skew-x-12"
                              style={{
                                background:
                                  i % 2 === 0
                                    ? char.color.accent
                                    : "transparent",
                                opacity: 0.8,
                              }}
                            />
                          ))}
                        </div>

                        {/* Character Name Label */}
                        <div className="relative px-3 py-2 inline-block">
                          <div
                            className="absolute top-0 left-0 w-2 h-2 border-l-2 border-t-2"
                            style={{ borderColor: char.color.accent }}
                          />
                          <div
                            className="absolute top-0 right-0 w-2 h-2 border-r-2 border-t-2"
                            style={{ borderColor: char.color.accent }}
                          />
                          <div
                            className="absolute bottom-0 left-0 w-2 h-2 border-l-2 border-b-2"
                            style={{ borderColor: char.color.accent }}
                          />
                          <div
                            className="absolute bottom-0 right-0 w-2 h-2 border-r-2 border-b-2"
                            style={{ borderColor: char.color.accent }}
                          />
                          <div
                            className="absolute top-0 left-2 w-3 h-[2px]"
                            style={{ background: char.color.accent }}
                          />
                          <div
                            className="absolute bottom-0 right-2 w-3 h-[2px]"
                            style={{ background: char.color.accent }}
                          />
                          <div
                            className="relative px-1"
                            style={{
                              background: "rgba(0, 0, 0, 0.6)",
                            }}
                          >
                            <div className="text-[10px] tracking-[0.1em] text-white/70 font-semibold">
                              {char.name} {char.surname}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Bottom Section */}
                <div
                  className={`flex items-end ${
                    index === 1 ? "justify-center" : "justify-between"
                  }`}
                >
                  {/* Layout 1 (Card 1): Standard - Date Left, Name Right */}
                  {index === 0 && (
                    <>
                      <div>
                        <div
                          className="flex gap-3 text-[48px] font-black tracking-wider"
                          style={{ color: char.color.accent }}
                        >
                          <span>{char.date.d}</span>
                          <span>{char.date.m}</span>
                          <span>{char.date.y}</span>
                        </div>

                        {/* School Info with Globe */}
                        <div
                          className="relative flex items-center gap-2 p-2.5 mt-2 max-w-[400px]"
                          style={{
                            background: "rgba(0, 0, 0, 0.6)",
                            clipPath:
                              "polygon(8px 0, 100% 0, 100% 100%, 0 100%, 0 8px)",
                          }}
                        >
                          <div
                            className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2"
                            style={{ borderColor: char.color.accent }}
                          />
                          <div
                            className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2"
                            style={{ borderColor: char.color.accent }}
                          />
                          <div
                            className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2"
                            style={{ borderColor: char.color.accent }}
                          />
                          <div
                            className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2"
                            style={{ borderColor: char.color.accent }}
                          />
                          <div
                            className="absolute top-0 left-3 right-3 h-[2px]"
                            style={{
                              background: `linear-gradient(90deg, ${char.color.accent}, transparent, ${char.color.accent})`,
                              opacity: 0.4,
                            }}
                          />
                          <div
                            className="absolute bottom-0 left-3 right-3 h-[2px]"
                            style={{
                              background: `linear-gradient(90deg, transparent, ${char.color.accent}, transparent)`,
                              opacity: 0.4,
                            }}
                          />

                          <div
                            className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                            style={{
                              background: char.color.accent + "30",
                            }}
                          >
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke={char.color.accent}
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <line x1="2" y1="12" x2="22" y2="12" />
                              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[8px] leading-[1.3] text-white/80 font-semibold tracking-wide">
                              {char.school}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Right - Large Character Name */}
                      <div className="text-right max-w-[45%]">
                        <div className="text-[11px] tracking-[0.15em] text-white/40 font-medium mb-1">
                          {char.name}
                        </div>
                        <div
                          className="text-[56px] sm:text-[64px] md:text-[72px] leading-[0.85] font-black tracking-tight break-words"
                          style={{
                            color: "white",
                            fontFamily: "system-ui, -apple-system, sans-serif",
                            fontStyle: "italic",
                            letterSpacing: "-0.02em",
                            WebkitTextStroke: `1px ${char.color.accent}40`,
                          }}
                        >
                          {char.surname}
                        </div>

                        {/* Decorative stripes bottom right */}
                        <div className="flex gap-1 justify-end mt-2">
                          {[...Array(9)].map((_, i) => (
                            <div
                              key={i}
                              className="w-1.5 h-8 transform -skew-x-12"
                              style={{
                                background:
                                  i % 2 === 0
                                    ? char.color.accent
                                    : "transparent",
                                opacity: 0.6,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Layout 2 (Card 2): Centered - Name on top, Date and School below */}
                  {index === 1 && (
                    <div className="flex flex-col items-center gap-4">
                      {/* Large Character Name - Center */}
                      <div className="text-center">
                        <div className="text-[11px] tracking-[0.15em] text-white/40 font-medium mb-1">
                          {char.name}
                        </div>
                        <div
                          className="text-[56px] sm:text-[64px] md:text-[72px] leading-[0.85] font-black tracking-tight"
                          style={{
                            color: "white",
                            fontFamily: "system-ui, -apple-system, sans-serif",
                            fontStyle: "italic",
                            letterSpacing: "-0.02em",
                            WebkitTextStroke: `1px ${char.color.accent}40`,
                          }}
                        >
                          {char.surname}
                        </div>
                      </div>

                      {/* Date and School - Bottom Center */}
                      <div className="flex items-center gap-6">
                        <div
                          className="flex gap-3 text-[36px] font-black tracking-wider"
                          style={{ color: char.color.accent }}
                        >
                          <span>{char.date.d}</span>
                          <span>{char.date.m}</span>
                          <span>{char.date.y}</span>
                        </div>

                        <div
                          className="relative flex items-center gap-2 p-2.5 max-w-[300px]"
                          style={{
                            background: "rgba(0, 0, 0, 0.6)",
                            clipPath:
                              "polygon(8px 0, 100% 0, 100% 100%, 0 100%, 0 8px)",
                          }}
                        >
                          <div
                            className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2"
                            style={{ borderColor: char.color.accent }}
                          />
                          <div
                            className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2"
                            style={{ borderColor: char.color.accent }}
                          />
                          <div
                            className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2"
                            style={{ borderColor: char.color.accent }}
                          />
                          <div
                            className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2"
                            style={{ borderColor: char.color.accent }}
                          />
                          <div
                            className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                            style={{
                              background: char.color.accent + "30",
                            }}
                          >
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke={char.color.accent}
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <line x1="2" y1="12" x2="22" y2="12" />
                              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[8px] leading-[1.3] text-white/80 font-semibold tracking-wide">
                              {char.school}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Layout 3 (Card 3): Reversed - Name Left, Date and School Right */}
                  {index === 2 && (
                    <>
                      {/* Bottom Left - Large Character Name */}
                      <div className="text-left max-w-[45%]">
                        <div className="text-[11px] tracking-[0.15em] text-white/40 font-medium mb-1">
                          {char.name}
                        </div>
                        <div
                          className="text-[56px] sm:text-[64px] md:text-[72px] leading-[0.85] font-black tracking-tight break-words"
                          style={{
                            color: "white",
                            fontFamily: "system-ui, -apple-system, sans-serif",
                            fontStyle: "italic",
                            letterSpacing: "-0.02em",
                            WebkitTextStroke: `1px ${char.color.accent}40`,
                          }}
                        >
                          {char.surname}
                        </div>

                        {/* Decorative stripes bottom left */}
                        <div className="flex gap-1 justify-start mt-2">
                          {[...Array(9)].map((_, i) => (
                            <div
                              key={i}
                              className="w-1.5 h-8 transform -skew-x-12"
                              style={{
                                background:
                                  i % 2 === 0
                                    ? char.color.accent
                                    : "transparent",
                                opacity: 0.6,
                              }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Bottom Right - Date and School */}
                      <div className="text-right">
                        <div
                          className="flex gap-3 text-[48px] font-black tracking-wider justify-end"
                          style={{ color: char.color.accent }}
                        >
                          <span>{char.date.d}</span>
                          <span>{char.date.m}</span>
                          <span>{char.date.y}</span>
                        </div>

                        {/* School Info with Globe */}
                        <div
                          className="relative flex items-center gap-2 p-2.5 mt-2 max-w-[400px] ml-auto"
                          style={{
                            background: "rgba(0, 0, 0, 0.6)",
                            clipPath:
                              "polygon(8px 0, 100% 0, 100% 100%, 0 100%, 0 8px)",
                          }}
                        >
                          <div
                            className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2"
                            style={{ borderColor: char.color.accent }}
                          />
                          <div
                            className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2"
                            style={{ borderColor: char.color.accent }}
                          />
                          <div
                            className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2"
                            style={{ borderColor: char.color.accent }}
                          />
                          <div
                            className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2"
                            style={{ borderColor: char.color.accent }}
                          />
                          <div
                            className="absolute top-0 left-3 right-3 h-[2px]"
                            style={{
                              background: `linear-gradient(90deg, ${char.color.accent}, transparent, ${char.color.accent})`,
                              opacity: 0.4,
                            }}
                          />
                          <div
                            className="absolute bottom-0 left-3 right-3 h-[2px]"
                            style={{
                              background: `linear-gradient(90deg, transparent, ${char.color.accent}, transparent)`,
                              opacity: 0.4,
                            }}
                          />

                          <div
                            className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                            style={{
                              background: char.color.accent + "30",
                            }}
                          >
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke={char.color.accent}
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <line x1="2" y1="12" x2="22" y2="12" />
                              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[8px] leading-[1.3] text-white/80 font-semibold tracking-wide">
                              {char.school}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Scan Lines Effect */}
          <div
            className="absolute inset-0 pointer-events-none opacity-5"
            style={{
              background:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)",
            }}
          />

          {/* Status Indicator */}
          {/* <div className="absolute top-6 right-6 z-20">
            <div
              className="px-3 py-1 rounded-full text-[9px] font-bold tracking-wider backdrop-blur-sm"
              style={{
                background: `${char.color.accent}30`,
                border: `1px solid ${char.color.accent}`,
                color: char.color.accent,
              }}
            >
              {char.status}
            </div>
          </div> */}
        </div>
      ))}
    </div>
  );
}
