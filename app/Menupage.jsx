"use client";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Alumni_Sans } from "next/font/google";

const alumniSans = Alumni_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-alumni-sans",
});

const imglinks = [];
const links = [];
const names = [
  "LECTURES",
  "WORKSHOPS",
  "ROBOWARS",
  "COMPETITIONS",
  "EVENTS",
  "SPONSORS",
  "CONTACT",
  "ABOUT",
  "TEAM",
  "GALLERY",
  "BLOG",
  "FAQS",
];

export default function Menupage() {
  const [fadedtext, setFadedText] = useState("");
  const bgTextRefs = useRef([]);
  const bottomTextRef = useRef(null);
  const circleItemRefs = useRef([]);

  useEffect(() => {
    if (fadedtext && bgTextRefs.current.length > 0) {
      // Animate background text spans
      gsap.fromTo(
        bgTextRefs.current,
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.out",
        }
      );
    }
  }, [fadedtext]);

  useEffect(() => {
    if (fadedtext && bottomTextRef.current) {
      // Animate bottom text
      gsap.fromTo(
        bottomTextRef.current,
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        }
      );
    }
  }, [fadedtext]);

  const handleCircleItemHover = (index, isHovering) => {
    if (circleItemRefs.current[index]) {
      gsap.to(circleItemRefs.current[index], {
        scale: isHovering ? 1.2 : 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    // Show the corresponding name in the background when hovering
    if (isHovering) {
      setFadedText(names[index]);
    } else {
      setFadedText("");
    }
  };

  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute z-2 top-[2%] right-[2%] w-full flex px-8 py-4 justify-end">
        <img src="logo.png" width={200} height={200} alt="Logo" />
      </div>

      <div
        id="bg-text"
        className="absolute flex gap-80 text-[#00000044] px-4
         top-[22%] sm:top-[12%] md:top-[4%] lg:top-[0%]
          text-[90px] sm:text-[180px] md:text-[320px] lg:text-[420px] 
          -left-30 sm:-left-40 md:-left-60 lg:-left-100"
      >
        {/* Background text animated with GSAP */}
        {fadedtext &&
          Array.from({ length: 6 }).map((_, i) => (
            <span
              key={`${fadedtext}-${i}`}
              ref={(el) => (bgTextRefs.current[i] = el)}
              className={`${alumniSans.className} font-[700]`}
              style={{ opacity: 0 }}
            >
              {fadedtext}
            </span>
          ))}
      </div>

      <div id="wheel" className="absolute">
        <img
          src="ring.png"
          width={400}
          height={400}
          className="rotate scale-130"
          alt="Rotating ring"
        />
      </div>

      {/* Circle with 12 numbered divs */}
      <div className="absolute z-20 w-96 h-96 flex items-center justify-center">
        <div className="relative w-full h-full">
          {Array.from({ length: 12 }, (_, i) => {
            const angle = i * 30 * (Math.PI / 180); // 30 degrees between each item
            const radius = 150; // Distance from center
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <div
                key={i}
                ref={(el) => (circleItemRefs.current[i] = el)}
                className={`absolute w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold cursor-pointer shadow-lg ${alumniSans.className}`}
                style={{
                  left: `calc(50% + ${x}px - 24px)`, // 24px = half of width/height
                  top: `calc(50% + ${y}px - 24px)`,
                  transform: "translate(0, 0)", // Reset any transforms
                }}
                onMouseEnter={() => handleCircleItemHover(i, true)}
                onMouseLeave={() => handleCircleItemHover(i, false)}
              >
                {i + 1}
              </div>
            );
          })}
        </div>

        {/* Center text display - always visible */}
        <div className="absolute z-30 flex items-center justify-center w-48 h-48 bg-black bg-opacity-20 rounded-full backdrop-blur-sm">
          {fadedtext && (
            <div
              className={`${alumniSans.className} font-[700] text-white text-center text-sm px-2`}
            >
              {fadedtext}
            </div>
          )}
        </div>
      </div>
      <button
        className="cursor-pointer z-10 bg-amber-500"
        onClick={() => {
          setFadedText(names[Math.floor(Math.random() * names.length)]);
        }}
      >
        change
      </button>

      {fadedtext && (
        <div
          ref={bottomTextRef}
          className={`mt-4 ${alumniSans.className} font-[700] text-9xl absolute bottom-[5%]`}
          style={{ opacity: 0 }}
        >
          {fadedtext}
        </div>
      )}
    </div>
  );
}
