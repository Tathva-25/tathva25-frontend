"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Alumni_Sans } from "next/font/google";

const alumniSans = Alumni_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-alumni-sans",
});

const imglinks = [];
const links = [];
const names = ["LECTURES", "WORKSHOPS", "ROBOWARS"];

export default function Menupage() {
  const [fadedtext, setFadedText] = useState("");
  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute z-2 top-[2%] right-[2%] w-full flex px-8 py-4 justify-end">
        <img src="logo.png" width={200} height={200} alt="Logo" />
      </div>

      <div
        id="bg-text"
        className="absolute flex gap-20 sm:gap-50 md:gap-60 lg:gap-80 text-[#00000044] px-4
         top-[15%] sm:top-[12%] md:top-[4%] lg:top-[0%]
          text-[100px] sm:text-[140px] md:text-[180px] lg:text-[220px] 
          -left-60 sm:-left-40 md:-left-60 lg:-left-100"
      >
        {/* THIS IS WHERE I USED FRAMER-MOTION..*/
        /* INITIAL => ANIMATION ENTRY
           EXIT => ANIMATION EXIT 
        */}
        <AnimatePresence mode="wait">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.span
              key={`${fadedtext}-${i}`}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{
                duration: 0.5,
                delay: i * 0.05,
              }}
              className={`${alumniSans.className} font-[700]`}
            >
              {fadedtext}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      <div id="wheel" className="absolute">
        <img
          src="ring.png"
          width={400}
          height={400}
          className="rotate sm:scale-105 md:scale-110 z-2 lg:scale-130"
          alt="Rotating ring"
        />
      </div>
      <button
        className="cursor-pointer z-3 bg-amber-500"
        onClick={() => {
          setFadedText(names[Math.floor(Math.random() * names.length)]);
        }}
      >
        change
      </button>

      <div
        className={`mt-4 ${alumniSans.className} -z-2 font-[700] text-9xl absolute bottom-[5%]`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${fadedtext}`}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{
              duration: 0.5,
            }}
          >
            {fadedtext}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
