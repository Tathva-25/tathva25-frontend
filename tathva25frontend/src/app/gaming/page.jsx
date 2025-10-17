'use client';

import Image from "next/image";
import localFont from "next/font/local";
import Sidebar from "@/components/sidebar";
import gaming_hero from "../../../public/images/gaming/gaming_hero.png";
import gaming_hero_mobile from "../../../public/images/gaming/gaming_hero_mobile.png";
import { Michroma, JetBrains_Mono } from "next/font/google";
import DotGridButton from "@/components/DotGridButton";
import effectStyles from "./gaming_styles.module.css";
import { Mic } from "lucide-react";
import Marquee from "../components/Marquee";

// FONT CONFIGS
export const integralCF = localFont({
  src: [
    {
      path: '../../../public/fonts/Integral-CF/Demo_Fonts/Fontspring-DEMO-integralcf-medium.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Integral-CF/Demo_Fonts/Fontspring-DEMO-integralcf-regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Integral-CF/Demo_Fonts/Fontspring-DEMO-integralcf-bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Integral-CF/Demo_Fonts/Fontspring-DEMO-integralcf-extrabold.otf',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-integral-cf',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const michroma = Michroma({ subsets: ["latin"], weight: "400" });

const GamePage = () => {
  return (
    <div className="relative w-full min-h-screen bg-white text-black">
      {/* 🔹 Top Marquee Banner */}
      <Marquee text={"// GAMING CONCLAVE AHEAD "} />

      {/* 🔹 Desktop Section */}
      <div className="hidden lg:flex relative min-h-screen overflow-hidden bg-white items-center justify-center">
        {/* BACKGROUND TEXT EFFECT */}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
          <div
            className={`${effectStyles.effectContainer} ${integralCF.className} font-bold flex flex-col items-center justify-center text-[15rem] leading-[0.9] tracking-widest`}
            style={{
              WebkitTextStroke: '2px black',
            }}
          >
            <div>NEXUS</div>
            <div>NEXUS</div>
            <div>NEXUS</div>
            <div>NEXUS</div>
          </div>
        </div>

        {/* HERO IMAGE */}
        <div className="absolute inset-0 flex justify-center items-center z-10">
          <Image
            src={gaming_hero}
            alt="Hero_Image"
            className="h-screen w-auto object-cover"
            priority
          />
        </div>

        {/* CONTENT SECTION */}
        <div className="z-20 relative flex flex-row items-center justify-between w-[80%] gap-10">
          {/* LEFT TEXT */}
          <div className="flex flex-col justify-center items-start gap-4">
            <div
              className={`${integralCF.className} text-[6vw] font-bold text-center w-[40vw]`}
            >
              GPC NEXUS
            </div>
            <div className="text-right mt-3">
              <DotGridButton text="Learn More" min_height={20} min_width={40} />
            </div>
          </div>

          {/* RIGHT DESCRIPTION */}
          <div
            className={`${michroma.className} text-xl leading-relaxed max-w-[25vw]`}
          >
            Show off your skills and conquer the arena at{" "}
            <span className="text-red-800">Gaming</span>
            <span className="text-red-800">Conclave</span>, where only the best
            rise to the top
          </div>
        </div>
      </div>

      {/* 🔹 Mobile Section */}
      <div className="lg:hidden relative bg-gradient-to-r from-white to-[#d8d8d1] h-screen flex flex-col justify-center overflow-hidden px-3">
        {/* BACKGROUND TEXT EFFECT */}
        <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none text-[25vw] leading-[1.1]">
          <div
            className={`${effectStyles.effectContainer} ${integralCF.className} font-extrabold flex flex-col justify-center items-center`}
            style={{
              WebkitTextStroke: '1px #8d705d',
            }}
          >
            <div>NEXUS</div>
            <div>NEXUS</div>
            <div>NEXUS</div>
            <div>NEXUS</div>
            <div>NEXUS</div>
            <div>NEXUS</div>
          </div>
        </div>

        {/* FOREGROUND CONTENT */}
        <div className="relative z-10 flex flex-col justify-center">
          <div className={`${michroma.className} text-xs translate-y-5`}>Tathva25</div>
          <div className={`text-[12vw] ${integralCF.className} font-bold`}>
            GPC NEXUS
          </div>
          <div className={`${michroma.className} leading-relaxed text-[2vw] w-[70%]`}>
            Show off your skills and conquer the arena at{" "}
            <span className="text-red-800">Gaming</span>
            <span className="text-red-800">Conclave</span>, where only the best
            rise to the top
          </div>
        </div>

        {/* MOBILE IMAGE */}
        <div className="relative z-10 w-full flex justify-center items-center -translate-y-10">
          <Image
            src={gaming_hero_mobile}
            alt="Hero_Image"
            priority
          />
        </div>

        {/* BUTTON */}
        <div className="absolute bottom-5 right-10 z-10">
          <DotGridButton text="Learn More" min_height={20} min_width={20} />
        </div>
      </div>
    </div>
  );
};

export default GamePage;
