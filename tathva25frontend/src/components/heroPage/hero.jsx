// src/components/Hero.js

"use client";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import heroAvatar from "../../../public/images/avatar-body.png";
import wheel from "../../../public/images/wheel.png";
import Background from "../../../public/images/Background-new.png";
import localfont from "next/font/local";
import logo from "../../../public/images/tathvawhitelogo.png";
import Marquee from "@/app/components/Marquee";

gsap.registerPlugin(ScrollTrigger);
const customFont = localfont({
  src: "../../../public/fonts/neoform.otf",
});
const newfont = localfont({
  src: "../../../public/fonts/Michroma.ttf",
});
const SCRAMBLE_INTERVAL_MS = 40;
const SCRAMBLE_DURATION_MS = 5000;
const REVEAL_INTERVAL_MS = 100;

export const Hero = () => {
  const [displayText, setDisplayText] = useState("TATHVA");
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);
  const wheelRef = useRef(null);
  const sectionRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  const targetText = "TATHVA";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const getRandomChar = () =>
    characters[Math.floor(Math.random() * characters.length)] || "";

  const generateRandomString = (length) =>
    Array.from({ length }, () => getRandomChar()).join("");

  const triggerGlitchEffect = () => {
    if (isAnimating || hasAnimatedRef.current) return;

    setIsAnimating(true);
    hasAnimatedRef.current = true;
    const textLength = targetText.length + 2;

    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearInterval(timeoutRef.current);

    let elapsed = 0;
    setDisplayText(generateRandomString(textLength));

    intervalRef.current = setInterval(() => {
      elapsed += SCRAMBLE_INTERVAL_MS;
      setDisplayText(generateRandomString(textLength));

      if (elapsed >= SCRAMBLE_DURATION_MS) {
        clearInterval(intervalRef.current);

        const revealedChars = targetText.split("");
        const workingChars = generateRandomString(textLength).split("");
        let revealIndex = 0;

        timeoutRef.current = setInterval(() => {
          if (revealIndex < textLength) {
            workingChars[revealIndex] = revealedChars[revealIndex];
          }

          for (let i = revealIndex + 1; i < textLength; i++) {
            workingChars[i] = getRandomChar();
          }

          setDisplayText(workingChars.join(""));
          revealIndex++;

          if (revealIndex >= textLength) {
            clearInterval(timeoutRef.current);
            setDisplayText(targetText);
            setIsAnimating(false);
          }
        }, REVEAL_INTERVAL_MS);
      }
    }, SCRAMBLE_INTERVAL_MS);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            triggerGlitchEffect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearInterval(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (wheelRef.current) {
      gsap.to(wheelRef.current, {
        rotation: 360,
        duration: 20,
        ease: "linear",
        repeat: -1,
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative h-screen flex items-center justify-center px-5 py-8 pt-20 overflow-hidden`}
    >
      {/* ✅ Top-right Logo */}
  <Image
    src={logo}
    alt="Tathva Logo"
    width={100}
    height={100}
    className="absolute top-6 right-6 md:top-6 md:right-4 w-16 md:w-14 h-auto z-30 transition-transform duration-300 hover:scale-105"
    priority
    quality={90}
  />
  {/* ✅ Login Button (left of logo) */}
  <button
    className={`${newfont.className} absolute top-6 right-24 md:t op-8 md:right-20  text-white  px-4 py-2 rounded-full hover:bg-black transition-all duration-300 z-30`}
  >
    LOGIN
  </button>
      <div className="mx-auto w-full h-full">
        {/* Background Image */}
        <div>
          <Image
            src={Background}
            className="absolute md:w-[100vw] md:h-auto h-screen inset-0 object-cover md:rotate-0 overflow-x-hidden scale-110"
            alt="Background"
            fill
            priority
            quality={90}
            sizes="100vw"
          />
        </div>

        {/* Grid Overlay */}
        
    <div className="absolute inset-0 z-10">
      <div className="relative w-full h-full">
        {/* SOUTH INDIA'S BIGGEST FEST - Absolute positioned at top */}
        <div className="absolute  top-90 right-14 md:top-8 md:left-0 md:right-0 md:text-center z-20 px-4">
          <span className={`${newfont.className} text-xs md:text-sm font-semibold text-white`}>
            /// SOUTH INDIA'S BIGGEST TECH FEST
          </span>
        </div>
        
        
        

        {/* Grid System */}
        <div className="flex flex-col h-full w-full">
          {/* Row 1 - Top row - 15% height */}
          <div className="flex flex-nowrap" style={{ height: "15%" }}>
            {/* Side columns - hidden on mobile */}
            <div
              className="hidden md:flex items-center justify-center"
              style={{
                flex: "0.35",
                border: "0.5px solid rgba(255, 255, 255, 0.3)",
                flexShrink: 0,
                minWidth: 0,
              }}
            ></div>
            
            {/* Main columns - always 6 visible */}
            <div
              className="flex-1 flex items-center justify-center"
              style={{ 
                border: "0.5px solid rgba(255, 255, 255, 0.3)",
                flexShrink: 0,
                minWidth: 0,
              }}
            ></div>
            <div
              className="flex-1 flex items-center justify-center"
              style={{ 
                border: "0.5px solid rgba(255, 255, 255, 0.3)",
                flexShrink: 0,
                minWidth: 0,
              }}
            ></div>
            <div
              className="flex-1 flex items-center justify-center"
              style={{ 
                border: "0.5px solid rgba(255, 255, 255, 0.3)",
                flexShrink: 0,
                minWidth: 0,
              }}
            ></div>
            <div
              className="flex-1 flex items-center justify-center"
              style={{ 
                border: "0.5px solid rgba(255, 255, 255, 0.3)",
                flexShrink: 0,
                minWidth: 0,
              }}
            ></div>
            <div
              className="flex-1 flex items-center justify-center"
              style={{ 
                border: "0.5px solid rgba(255, 255, 255, 0.3)",
                flexShrink: 0,
                minWidth: 0,
              }}
            ></div>
            <div
              className="flex-1 flex items-center justify-center"
              style={{ 
                border: "0.5px solid rgba(255, 255, 255, 0.3)",
                flexShrink: 0,
                minWidth: 0,
              }}
            ></div>
            
            {/* Side columns - hidden on mobile */}
            <div
              className="hidden md:flex items-center justify-center"
              style={{
                flex: "0.35",
                border: "0.5px solid rgba(255, 255, 255, 0.3)",
                flexShrink: 0,
                minWidth: 0,
              }}
            ></div>
          </div>

          {/* Row 2 - Middle row - 25% on mobile, 35% on desktop */}
          <div 
            className="flex flex-nowrap md:hidden" 
            style={{ height: "10%" }} /* Mobile: 25% height */
          >
            <div
              className="hidden md:flex items-center justify-center"
              style={{
                flex: "0.35",
                border: "0.5px solid rgba(255, 255, 255, 0.3)",
                flexShrink: 0,
                minWidth: 0,
              }}
            ></div>
            
            {/* 6 columns - always visible */}
            <div
              className="flex-1 flex items-center justify-center"
              style={{ 
                border: "0.5px solid rgba(255, 255, 255, 0.3)",
                flexShrink: 0,
                minWidth: 0,
              }}
            ></div>
            <div
              className="flex-1 flex items-center justify-center"
              style={{ 
                border: "0.5px solid rgba(255, 255, 255, 0.3)",
                flexShrink: 0,
                minWidth: 0,
              }}
            ></div>
            <div
              className="flex-1 flex items-center justify-center"
              style={{ 
                border: "0.5px solid rgba(255, 255, 255, 0.3)",
                flexShrink: 0,
                minWidth: 0,
              }}
            ></div>
            <div
              className="flex-1 flex items-center justify-center"
              style={{ 
                border: "0.5px solid rgba(255, 255, 255, 0.3)",
                flexShrink: 0,
                minWidth: 0,
              }}
            ></div>
            <div
              className="flex-1 flex items-center justify-center"
              style={{ 
                border: "0.5px solid rgba(255, 255, 255, 0.3)",
                flexShrink: 0,
                minWidth: 0,
              }}
            ></div>
            <div
              className="flex-1 flex items-center justify-center"
              style={{ 
                border: "0.5px solid rgba(255, 255, 255, 0.3)",
                flexShrink: 0,
                minWidth: 0,
              }}
            ></div>
            
            <div
              className="hidden md:flex items-center justify-center"
              style={{
                flex: "0.35",
                border: "0.5px solid rgba(255, 255, 255, 0.3)",
                flexShrink: 0,
                minWidth: 0,
              }}
            ></div>
          </div>

          {/* Row 2 - Desktop version - 35% height */}
          <div 
            className="hidden md:flex flex-nowrap" 
            style={{ height: "35%" }} /* Desktop: 35% height (original) */
          >
            <div
              className="flex items-center justify-center"
              style={{
                flex: "0.35",
                border: "0.5px solid rgba(255, 255, 255, 0.3)",
                flexShrink: 0,
                minWidth: 0,
              }}
            ></div>
            
            {/* 6 columns - always visible */}
            <div
              className="flex-1 flex items-center justify-center"
              style={{ 
                border: "0.5px solid rgba(255, 255, 255, 0.3)",
                flexShrink: 0,
                minWidth: 0,
              }}
            ></div>
            <div
              className="flex-1 flex items-center justify-center"
              style={{ 
                border: "0.5px solid rgba(255, 255, 255, 0.3)",
                flexShrink: 0,
                minWidth: 0,
              }}
            ></div>
            <div
              className="flex-1 flex items-center justify-center"
              style={{ 
                border: "0.5px solid rgba(255, 255, 255, 0.3)",
                flexShrink: 0,
                minWidth: 0,
              }}
            ></div>
            <div
              className="flex-1 flex items-center justify-center"
              style={{ 
                border: "0.5px solid rgba(255, 255, 255, 0.3)",
                flexShrink: 0,
                minWidth: 0,
              }}
            ></div>
            <div
              className="flex-1 flex items-center justify-center"
              style={{ 
                border: "0.5px solid rgba(255, 255, 255, 0.3)",
                flexShrink: 0,
                minWidth: 0,
              }}
            ></div>
            <div
              className="flex-1 flex items-center justify-center"
              style={{ 
                border: "0.5px solid rgba(255, 255, 255, 0.3)",
                flexShrink: 0,
                minWidth: 0,
              }}
            ></div>
            
            <div
              className="flex items-center justify-center"
              style={{
                flex: "0.35",
                border: "0.5px solid rgba(255, 255, 255, 0.3)",
                flexShrink: 0,
                minWidth: 0,
              }}
            ></div>
          </div>

          {/* Row 3 - Bottom row with date - 60% on mobile, 50% on desktop */}
          <div 
            className="flex flex-nowrap md:hidden" 
            style={{ height: "70%" }} /* Mobile: 60% height */
          >
            <div
              className="hidden md:flex items-center justify-center"
              style={{
                flex: "0.35",
                border: "0.5px solid rgba(255, 255, 255, 0.3)",
                flexShrink: 0,
                minWidth: 0,
              }}
            ></div>
            
            {/* Date column */}
            <div
              className="flex-1 flex items-center justify-center"
              style={{ 
                border: "0.5px solid rgba(255, 255, 255, 0.3)",
                flexShrink: 0,
                minWidth: 0,
              }}
            >
            </div>
            
            {/* Remaining 5 columns - always visible */}
            <div
              className="flex-1 flex items-center justify-center"
              style={{ 
                border: "0.5px solid rgba(255, 255, 255, 0.3)",
                flexShrink: 0,
                minWidth: 0,
              }}
            ></div>
            <div
              className="flex-1 flex items-center justify-center"
              style={{ 
                border: "0.5px solid rgba(255, 255, 255, 0.3)",
                flexShrink: 0,
                minWidth: 0,
              }}
            ></div>
            <div
              className="flex-1 flex items-center justify-center"
              style={{ 
                border: "0.5px solid rgba(255, 255, 255, 0.3)",
                flexShrink: 0,
                minWidth: 0,
              }}
            ></div>
            <div
              className="flex-1 flex items-center justify-center"
              style={{ 
                border: "0.5px solid rgba(255, 255, 255, 0.3)",
                flexShrink: 0,
                minWidth: 0,
              }}
            ></div>
            <div
              className="flex-1 flex items-center justify-center"
              style={{ 
                border: "0.5px solid rgba(255, 255, 255, 0.3)",
                flexShrink: 0,
                minWidth: 0,
              }}
            ></div>
            
            <div
              className="hidden md:flex items-center justify-center"
              style={{
                flex: "0.35",
                border: "0.5px solid rgba(255, 255, 255, 0.3)",
                flexShrink: 0,
                minWidth: 0,
              }}
            ></div>
          </div>

          {/* Row 3 - Desktop version - 50% height */}
          <div 
            className="hidden md:flex flex-nowrap" 
            style={{ height: "50%" }} /* Desktop: 50% height (original) */
          >
            <div
              className="flex items-center justify-center"
              style={{
                flex: "0.35",
                border: "0.5px solid rgba(255, 255, 255, 0.3)",
                flexShrink: 0,
                minWidth: 0,
              }}
            ></div>
            
            {/* Date column */}
            <div
              className="flex-1 flex items-center justify-center"
              style={{ 
                border: "0.5px solid rgba(255, 255, 255, 0.3)",
                flexShrink: 0,
                minWidth: 0,
              }}
            >
            </div>
            
            {/* Remaining 5 columns - always visible */}
            <div
              className="flex-1 flex items-center justify-center"
              style={{ 
                border: "0.5px solid rgba(255, 255, 255, 0.3)",
                flexShrink: 0,
                minWidth: 0,
              }}
            ></div>
            <div
              className="flex-1 flex items-center justify-center"
              style={{ 
                border: "0.5px solid rgba(255, 255, 255, 0.3)",
                flexShrink: 0,
                minWidth: 0,
              }}
            ></div>
            <div
              className="flex-1 flex items-center justify-center"
              style={{ 
                border: "0.5px solid rgba(255, 255, 255, 0.3)",
                flexShrink: 0,
                minWidth: 0,
              }}
            ></div>
            <div
              className="flex-1 flex items-center justify-center"
              style={{ 
                border: "0.5px solid rgba(255, 255, 255, 0.3)",
                flexShrink: 0,
                minWidth: 0,
              }}
            ></div>
            <div
              className="flex-1 flex items-center justify-center"
              style={{ 
                border: "0.5px solid rgba(255, 255, 255, 0.3)",
                flexShrink: 0,
                minWidth: 0,
              }}
            ></div>
            
            <div
              className="flex items-center justify-center"
              style={{
                flex: "0.35",
                border: "0.5px solid rgba(255, 255, 255, 0.3)",
                flexShrink: 0,
                minWidth: 0,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>


        {/* Original Content - TATHVA and Images */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-between h-full gap-4">
          {/* TATHVA Text - Centered */}
          <div className="flex-1 flex items-center justify-center w-full relative">
            {/* Date positioned to the left of TATHVA */}
            <div className="absolute top-1/2 transform translate-y-4 md:left-32 md:-translate-y-4">
              <span className={`${newfont.className}  text-lg md:text-2xl text-white drop-shadow-lg`}>
                OCTOBER 23, 24, 25
              </span>
            </div>
            {/* Year positioned to the right and below TATHVA */}
            <div className="absolute right md:right-30 top-1/2 transform translate-y-10 md:translate-y-59">
              <span className={`${newfont.className} text-lg md:text-2xl text-white drop-shadow-lg`}>
                2025
              </span>
            </div>
          </div>

          {/* Hero Images Container - Positioned at bottom */}
          <div className="relative w-[90%] max-w-[100vw] md:max-w-md aspect-square ">
            <div className="w-full scale-260 pb-110 md:pb-40 max-w-[90vw] md:max-w-7xl text-center ml-1  md:-ml-10">
              <span
                className={`
              ${customFont.className}
                inline-block select-none transition-all duration-200 whitespace-nowrap 
                text-[34px] md:text-[100px] tracking-widest   mt-2 md:mt-0
                ${isAnimating ? "tracking-[0.001em]" : ""} text-white
                `}
              >
                {displayText}
              </span>
            </div>

            <div>
              {/* Wheel - Bottom Layer */}
              <div className="absolute inset-0 -translate-y-5 flex items-center justify-center sm:-mt-30 scale-120 -mt-110 ml-1 md:ml-0 ">
                <Image
                  ref={wheelRef}
                  src={wheel}
                  alt="wheel"
                  fill
                  className="w-full h-full object-contain mt-34 md:mt-0"
                  sizes="(max-width: 768px) 90vw, 500px"
                  priority
                />
              </div>

              {/* Avatar - Middle Layer */}
              <div className="absolute inset-0 flex items-center justify-center hidden md:block">
                <Image
                  src={heroAvatar}
                  alt="Avatar"
                  className="w-full h-full object-contain scale-150 -mt-5"
                  fill
                  sizes="(max-width: 768px) 90vw, 500px"
                  priority
                />
              </div>
              <div className="absolute inset-0 block sm:hidden flex items-center justify-center">
                <Image 
                  src='/images/avatar-2.png'
                  className="w-full scale-115 mt-40"
                  width={100}
                  height={100}
                  alt="Avatar Mobile"
                  priority
                  
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};