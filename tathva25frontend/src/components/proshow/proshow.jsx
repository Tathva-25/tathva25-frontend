"use client";

import DotGridButton from "@/components/DotGridButton";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import localFont from "next/font/local";
import style from "./proshow.module.css";
import { Michroma } from "next/font/google";
import { keyframes } from "motion";
import { useRouter } from "next/navigation";
import Marquee from "@/app/components/Marquee";

const michroma = Michroma({ subsets: ["latin"], weight: "400" });

const akiraExpanded = localFont({
  src: "../../../public/fonts/Akira-Expanded.otf",
  variable: "--font-akira",
});

function ImgtoImage({ src, alt }) {
  return (
    <Image
      src={`${src}`}
      alt={`${alt}`}
      width={0}
      height={0}
      sizes="100vw"
      className="w-full h-auto object-cover"
      style={{
        width: "100%",
        height: "auto",
      }}
    />
  );
}

const Proshow = () => {
  const router = useRouter();
  const images = [
    "/images/mithoon.png",
    "/images/arivu.png",
    "/images/sa.png",
    "/images/mhr.png",
  ];
  const artists = [
    [
      "Mithoon",
      "A master of soulful melodies, Mithoon crafts compositions that blend classical richness with modern soundscapes. Each song resonates deeply, leaving a lasting emotional imprint on listeners, making him one of the most sought-after composers in contemporary Indian music.",
    ],
    [
      "Arivu",
      "Arivu’s music is a bold voice of identity, culture, and resistance. With lyrics rooted in truth and societal commentary, his performances inspire reflection and empowerment, bridging the gap between tradition and modern expression.",
    ],
    [
      "SA",
      "A rising figure in the Malayalam hip-hop scene, SA captivates audiences with his dynamic rap and lyrical precision. His collaborations are celebrated for their energy and authenticity, delivering impactful storytelling through rhythm and rhyme.",
    ],
    [
      "MHR",
      "Known for his innovative production and genre-blending beats, MHR pushes the boundaries of contemporary Malayalam music. His tracks combine EDM, hip-hop, and local influences, creating immersive audio experiences that resonate with audiences everywhere.",
    ],
  ];

  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartXRef = useRef(null);
  const touchDeltaXRef = useRef(0);
  const touchTimeoutRef = useRef(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    let intervalId;

    // keep a ref for paused state to avoid dependency issues
    const pausedRef = { current: paused };

    // small watcher to update the ref
    const pauseWatcher = setInterval(() => {
      pausedRef.current = paused;
    }, 100);

    if (!isMobile) {
      const script1 = document.createElement("script");
      script1.src =
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
      script1.async = true;

      const script2 = document.createElement("script");
      script2.src =
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js";
      script2.async = true;

      const script3 = document.createElement("script");
      script3.src =
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollToPlugin.min.js";
      script3.async = true;

      document.body.appendChild(script1);
      document.body.appendChild(script2);
      document.body.appendChild(script3);

      script3.onload = () => {
        const gsap = window.gsap;
        const ScrollTrigger = window.ScrollTrigger;
        const ScrollToPlugin = window.ScrollToPlugin;

        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

        const section = sectionRef.current;

        if (section) {
          ScrollTrigger.create({
            id: "proshow-pin",
            trigger: section,
            start: "top top",
            end: () => `+=${window.innerHeight * 1.15}`,
            pin: true,
            scrub: 1,
            onUpdate: (self) => {
              setScrollProgress(self.progress);
              const totalSteps = artists.length - 1;
              const rawIndex = self.progress * totalSteps;
              const snappedIndex = Math.round(rawIndex);
              setCurrentIndex(snappedIndex);
            },
          });
        }
      };
    }

    if (isMobile) {
      intervalId = setInterval(() => {
        if (!pausedRef.current) {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % artists.length);
        }
      }, 3000);
    }

    return () => {
      clearInterval(pauseWatcher);
      if (!isMobile) {
        document.body.removeChild(
          document.querySelector('script[src*="gsap.min.js"]')
        );
        document.body.removeChild(
          document.querySelector('script[src*="ScrollTrigger.min.js"]')
        );
        document.body.removeChild(
          document.querySelector('script[src*="ScrollToPlugin.min.js"]')
        );
        if (window.ScrollTrigger) {
          window.ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        }
      }
      if (intervalId) clearInterval(intervalId);
      if (touchTimeoutRef.current) clearTimeout(touchTimeoutRef.current);
    };
  }, []); // ✅ constant dependency array
  // MODIFICATION 3: This function now uses `currentIndex` directly
  const getImageTransform = (imageIndex) => {
    // The visual state is now driven by `currentIndex`, not calculated from scrollProgress.
    // This makes both scrolling and clicking update the visuals consistently.
    const rotationProgress = currentIndex;

    const positions = {
      0: { x: -320, scale: 0.75, opacity: 0.9, z: 10 }, // Left
      1: { x: 0, scale: 1.1, opacity: 1, z: 30 }, // Center
      2: { x: 320, scale: 0.75, opacity: 0.9, z: 20 }, // Right
      3: { x: 0, scale: 0.5, opacity: 0, z: 0 }, // Hidden
    };

    let position = (imageIndex - rotationProgress + 1 + 4) % 4;
    const pos = positions[position];

    if (!pos) {
      return { transform: "translateX(0px) scale(0.5)", opacity: 0, zIndex: 0 };
    }

    return {
      transform: `translateX(${pos.x}px) scale(${pos.scale})`,
      opacity: pos.opacity,
      zIndex: pos.z,
    };
  };

  // MODIFICATION 4: Add a click handler function
  const handleImageClick = (clickedIndex) => {
    setPaused(true); // pause auto rotation

    // If the clicked image is already in the center, do nothing.
    if (clickedIndex === currentIndex) return;

    const totalSteps = artists.length - 1;
    const targetProgress = clickedIndex / totalSteps;

    // Get the ScrollTrigger instance by its ID
    const st = window.ScrollTrigger?.getById("proshow-pin");
    const gsap = window.gsap;
    if (!st || !gsap) {
      setCurrentIndex(clickedIndex);
      return;
    }

    // ✅ Clamp between 1% and 99% to avoid hitting exact start/end
    const safeProgress = Math.min(Math.max(targetProgress, 0.01), 0.99);

    // ✅ Compute target scroll safely
    const targetScroll = st.start + (st.end - st.start) * safeProgress;

    // ✅ Smooth scroll to it
    gsap.to(window, {
      scrollTo: targetScroll,
      duration: 0.75,
      ease: "power2.inOut",
      onComplete: () => {
        setCurrentIndex(clickedIndex);
        setTimeout(() => setPaused(false), 8000); // optional
      },
    });
  };

  // Touch / swipe handlers for mobile
  const handleTouchStart = (e) => {
    const touch = e.touches ? e.touches[0] : e;
    touchStartXRef.current = touch.clientX;
    touchDeltaXRef.current = 0;
    setPaused(true);
    if (touchTimeoutRef.current) clearTimeout(touchTimeoutRef.current);
  };

  const handleTouchMove = (e) => {
    if (!touchStartXRef.current) return;
    const touch = e.touches ? e.touches[0] : e;
    touchDeltaXRef.current = touch.clientX - touchStartXRef.current;
  };

  const handleTouchEnd = () => {
    const delta = touchDeltaXRef.current;
    const threshold = 50; // px
    if (Math.abs(delta) > threshold) {
      if (delta < 0) {
        // swipe left -> next
        setCurrentIndex((p) => (p + 1) % artists.length);
      } else {
        // swipe right -> previous
        setCurrentIndex((p) => (p - 1 + artists.length) % artists.length);
      }
    }
    touchStartXRef.current = null;
    touchDeltaXRef.current = 0;
    // resume auto-rotation after a short delay
    touchTimeoutRef.current = setTimeout(() => setPaused(false), 3000);
  };

  return (
    <div ref={sectionRef} className="h-[110vh] relative overflow-hidden">
      {/* Background Image - Fixed positioning and responsiveness */}

      {/* <div className="absolute  inset-0 w-full h-full object-contain overflow-x-hidden -top-50 sm:top-auto">
        <Image
          src="/proshowbg.png"
          alt="proshowbg"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
          priority
          quality={100}
          unoptimized={false}
        />
      </div> */}

      <div className="flex flex-col md:flex-row h-[100vh] justify-center items-center relative top-16 md:top-2 px-6 pl-10">
        {/* Coordinates text */}
        <div
          className={`${michroma.className} absolute font-black l hidden md:block top-10 right-20 text-sm z-40`}
        >
          11.3210°N <br />
          75.9320°E
        </div>
        <div
          className={`${michroma.className} absolute font-black l hidden md:block top-10 left-20 text-sm z-40`}
        >
          <ImgtoImage src="/proshow-grid-1.png" alt="grid1" />
        </div>
        <div
          className={`${michroma.className} absolute font-bold hidden md:block bottom-8 left-20 text-sm z-40`}
        >
          Be there <br />
          Feel it <br />
          Live it
        </div>
        <div
          className={`${michroma.className} absolute font-bold hidden md:block bottom-8 right-20 md:scale-80 lg:scale-100 text-sm z-40`}
        >
          <ImgtoImage src="/proshow-grid-2.png" alt="grid2" />
        </div>

        {/* Image section */}
        <div className="md:w-[60%] scale-80 sm:scale-80 md:scale-80 flex justify-center relative z-30  ">
          {/* Main Image */}
          <Image
            src="/images/proshow-main.png"
            alt="Proshow main"
            width={600}
            height={400}
            className="rounded-2xl object-contain max-w-[80%] md:max-w-[90%] h-auto scale-125 md:scale-100 -translate-y-2 md:translate-y-0"
            priority
          />

          {/* Text Image (overlayed and moves with main image) */}
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none scale-135 md:scale-100 -translate-y-2 md:translate-y-0">
            <Image
              src="/images/proshowText.png"
              alt="Proshow main text"
              width={400}
              height={400}
              className={`rounded-2xl md:scale-[1.5] lg:scale-[1.2] sm:scale-[1.5] scale-[1.6] -mt-4 md:-mt-10 object-contain w-[45%]  animateSpin`}
            />
          </div>

          <style>
            {` 
              .animateSpin {
                animation: slowspin 15s linear infinite;
              }

              @keyframes slowspin {
                from {
                  transform:  rotate(0deg);
                }
                to {
                  transform:  rotate(360deg);
                }
              }
            `}
          </style>

          {/* Carousel */}
          <div className="absolute scale-[0.6] md:scale-100 top-3 md:bottom-57 bottom-15 sm:block z-120 mt-5 md:mt-[12rem] w-full max-w-[700px] h-[200px]">
            {/* <div
              className="absolute inset-0 rounded-2xl blur-2xl animate-pulse"
              style={{
                background:
                  "radial-gradient(ellipse 150% 120%, rgba(255, 244, 199, 1) 0%, rgba(251, 190, 36, 0.89) 30%, transparent 70%)",
                transform: "scale(1)",
                animation: "pulse 3s ease-in-out infinite",
              }}
            /> */}

            <div
              className="relative w-full h-full flex justify-center items-center scale-90 md:scale-100 "
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onPointerDown={(e) => {
                if (e.pointerType === "touch") handleTouchStart(e);
              }}
              onPointerMove={(e) => {
                if (e.pointerType === "touch") handleTouchMove(e);
              }}
              onPointerUp={(e) => {
                if (e.pointerType === "touch") handleTouchEnd(e);
              }}
            >
              {images.map((img, index) => (
                // MODIFICATION 5: Add onClick handler and cursor style
                <div
                  key={index}
                  className="absolute transition-all scale-95 duration-500 ease-out cursor-pointer"
                  style={getImageTransform(index)}
                  onClick={() => handleImageClick(index)}
                >
                  <Image
                    src={img}
                    alt={`Carousel image ${index + 1}`}
                    width={280}
                    height={170}
                    className="rounded-xl object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Text content */}
        <div className="flex flex-col mt-30 md:mt-0 text-center md:text-left gap-6 md:w-[40%] p-3 md:p-0 z-30 overflow-hidden">
          <div className="relative h-10 overflow-hidden">
            {artists.map((item, index) => (
              <div
                key={index}
                className="absolute w-full transition-all duration-500 ease-out"
                style={{
                  transform:
                    currentIndex === index
                      ? "translateY(0)"
                      : currentIndex > index
                      ? "translateY(-100%)"
                      : "translateY(100%)",
                  opacity: currentIndex === index ? 1 : 0,
                }}
              >
                <div className={`md:px-6 text-3xl ${akiraExpanded.className}`}>
                  {item[0]}
                </div>
              </div>
            ))}
          </div>
          <div className="relative min-h-[200px] mt-4 md:-mt-0 overflow-hidden">
            {artists.map((item, index) => (
              <div
                key={index}
                className={`${michroma.className} absolute w-full transition-all duration-500 ease-out`}
                style={{
                  transform:
                    currentIndex === index
                      ? "translateY(0)"
                      : currentIndex > index
                      ? "translateY(-100%)"
                      : "translateY(100%)",
                  opacity: currentIndex === index ? 1 : 0,
                }}
              >
                <div
                  className="leading-relaxed text-[12px] md:text-sm lg:text-md  md:px-6 "

                >
                  {item[1]}
                </div>
              </div>
            ))}
          </div>

          {/* Button - separately controlled for mobile */}
          <div
            className="flex justify-center md:ml-6 md:justify-start md:mt-50 lg:mt-0"
            onClick={() => router.push("/passes")}
          >
            <DotGridButton text="See more" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Proshow;
