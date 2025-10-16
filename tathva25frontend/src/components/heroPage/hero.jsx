// src/components/Hero.js

"use client";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import heroAvatar from "../../../public/images/avatar-body.png";
import wheel from "../../../public/images/wheel.png";
import Background from "../../../public/images/Background.png";
import localfont from "next/font/local";
import Lines from "./lines";
import Ripple from "./particles";

gsap.registerPlugin(ScrollTrigger);

const customFont = localfont({
  src: "../../../public/fonts/neoform.otf",
});

const SCRAMBLE_INTERVAL_MS = 40;
const SCRAMBLE_DURATION_MS = 900;
const REVEAL_INTERVAL_MS = 110;

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
    const textLength = targetText.length;

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

  // Intersection Observer for scroll into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            triggerGlitchEffect();
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the section is visible
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

  // Cleanup on unmount for text animation
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearInterval(timeoutRef.current);
    };
  }, []);

  // Spinning wheel animation
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
      <div className="mx-auto w-full">
        <div>
          <Image
            src={Background}
            className="absolute  md:w-[100vw] md:h-auto h-screen inset-0 object-cover  md:rotate-0  overflow-x-hidden"
            alt="Background"
            fill
            priority
            quality={90}
            sizes="100vw"
          />
        </div>

        <div className="flex flex-col items-center justify-between h-full gap-4">
          <div className="absolute inset-0 flex justify-center items-center mt-12">
            <Lines />
          </div>

          {/* TATHVA Text - Centered */}
          <div className="flex-1 flex items-center justify-center w-full ">
            <div className="w-full max-w-[90vw] md:max-w-5xl text-center ">
              <span
                className={`${
                  customFont.className
                } inline-block select-none transition-all duration-200 whitespace-nowrap text-[30px] md:text-[100px] ${
                  isAnimating ? "tracking-tighter" : ""
                }`}
              >
                {displayText}
              </span>
            </div>
          </div>

          {/* Hero Images Container - Positioned at bottom */}
          <div className="relative w-[90%] max-w-[100vw] md:max-w-md aspect-square ">
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none -mt-16">
              <Ripple />
            </div>
            <div className="w-full scale-240 pb-20 md:pb-40 max-w-[90vw] md:max-w-5xl text-center -mt-6">
              <span
                className={`${
                  customFont.className
                } inline-block select-none transition-all duration-200 whitespace-nowrap text-[30px] md:text-[100px] ${
                  isAnimating ? "tracking-tighter" : ""
                }`}
              >
                {displayText}
              </span>
            </div>

            <div className="THIS ONE!!">
              {/* Wheel - Bottom Layer */}
              <div className="absolute inset-0 -translate-y-5 flex items-center justify-center -mt-20 scale-110 ">
                <Image
                  ref={wheelRef}
                  src={wheel}
                  alt="wheel"
                  fill
                  className="w-full h-full  object-contain"
                  sizes="(max-width: 768px) 90vw, 500px"
                  priority
                />
              </div>

              {/* Avatar - Middle Layer */}
              <div className="absolute inset-0 flex items-center justify-center ">
                <Image
                  src={heroAvatar}
                  alt="Avatar"
                  className="w-full h-full object-contain scale-136"
                  fill
                  sizes="(max-width: 768px) 90vw, 500px"
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
