"use client";

import DotGridButton from "@/components/DotGridButton";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import localFont from "next/font/local";
import style from "./proshow.module.css";
import { Michroma } from "next/font/google";
import { keyframes } from "motion";
import { useRouter } from "next/navigation";


const michroma = Michroma({ subsets: ["latin"], weight: "400" });

const akiraExpanded = localFont({
  src: "../../../public/fonts/Akira-Expanded.otf",
  variable: "--font-akira",
});

// Placeholder for DotGridButton - replace with your actual component
// const DotGridButton = ({ text }) => (
//   <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
//     {text}
//   </button>
// );

const Proshow = () => {
  const router = useRouter();
  const images = [
    "/images/embla1.png",
    "/images/embla2.png",
    "/images/embla3.png",
     "/images/embla3.png",
  ];
 const artists = [
  [
    "Mithoon",
    "A master of soulful melodies, Mithoon crafts compositions that blend classical richness with modern soundscapes. Each song resonates deeply, leaving a lasting emotional imprint on listeners, making him one of the most sought-after composers in contemporary Indian music."
  ],
  [
    "Arivu",
    "Arivu’s music is a bold voice of identity, culture, and resistance. With lyrics rooted in truth and societal commentary, his performances inspire reflection and empowerment, bridging the gap between tradition and modern expression."
  ],
  [
    "SA",
    "A rising figure in the Malayalam hip-hop scene, SA captivates audiences with his dynamic rap and lyrical precision. His collaborations are celebrated for their energy and authenticity, delivering impactful storytelling through rhythm and rhyme."
  ],
  [
    "MHR",
    "Known for his innovative production and genre-blending beats, MHR pushes the boundaries of contemporary Malayalam music. His tracks combine EDM, hip-hop, and local influences, creating immersive audio experiences that resonate with audiences everywhere."
  ]
];


  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const script1 = document.createElement("script");
    script1.src =
      "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
    script1.async = true;

    const script2 = document.createElement("script");
    script2.src =
      "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js";
    script2.async = true;

    document.body.appendChild(script1);
    document.body.appendChild(script2);

    script2.onload = () => {
      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;

      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;

      if (section) {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * 1.15}`,
          //reduce the above to reduce the amount of scroll needed to trigger hori-scroll
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
            const rawIndex = self.progress * 2;
            const snappedIndex = Math.round(rawIndex);
            setCurrentIndex(snappedIndex % 3);
          },
        });
      }
    };

    return () => {
      if (document.body.contains(script1)) document.body.removeChild(script1);
      if (document.body.contains(script2)) document.body.removeChild(script2);
      if (window.ScrollTrigger) {
        window.ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      }
    };
  }, []);

  const getImageTransform = (imageIndex) => {
    const rotationProgress = Math.round(scrollProgress * 2);
    let position = (imageIndex - rotationProgress + 6) % 3;

    const positions = {
      0: { x: -320, scale: 0.75, opacity: 0.6, z: 10 },
      1: { x: 0, scale: 1.1, opacity: 1, z: 30 },
      2: { x: 320, scale: 0.75, opacity: 0.6, z: 20 },
    };

    const pos = positions[position];

    return {
      transform: `translateX(${pos.x}px) scale(${pos.scale})`,
      opacity: pos.opacity,
      zIndex: pos.z,
    };
  };

  return (
    <div
      ref={sectionRef}
      className="h-screen relative overflow-hidden"
    >
      <div>
                {/* <Image
                  src='/images/grain-bg.png'
                  className="absolute -mt-68 md:-mt-0 md:w-[100vw] md:h-auto  inset-0 object-cover md:rotate-0 overflow-x-hidden scale-110"
                  alt="Background-grain"
                  fill
                  priority
                  quality={90}
                  sizes="100vw"
                /> */}
        </div>

      <div className="flex flex-col md:flex-row h-full justify-center items-center relative px-6 pl-10">
        {/* Coordinates text */}
        <div className={`${michroma.className} absolute font-black l hidden md:block top-10 left-20 text-sm z-40`}>
          11.3210°N <br />
          75.9320°E
        </div>
        <div className={`${michroma.className} absolute font-bold hidden md:block bottom-8 left-20 text-sm z-40`}>
          Be there <br />
          Feel it <br />
          Live it
        </div>

        {/* Image section */}
        <div className="md:w-[60%] flex justify-center relative z-30 ">
          {/* Main Image */}
          <Image
            src="/images/proshow-main.png"
            alt="Proshow main"
            width={600}
            height={400}
            className="rounded-2xl object-contain max-w-[80%] md:max-w-[90%] h-auto scale-135 md:scale-100 -translate-y-2 md:translate-y-0"
            priority
          />

          {/* Text Image (overlayed and moves with main image) */}
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none scale-135 md:scale-100 -translate-y-2 md:translate-y-0">
            <Image
              src="/images/proshowText.png"
              alt="Proshow main text"
              width={400}
              height={400}
              className={`rounded-2xl md:scale-[1.05] lg:scale-[0.8] sm:scale-[1.1] scale-[1.1] -mt-4 md:-mt-10 object-contain w-[60%] md:w-[70%] animateSpin`}
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

          {/* Carousel - All 3 images rendered, positions calculated */}
          <div className="absolute scale-[0.6] md:scale-100 md:bottom-57 bottom-15 sm:block  md:mt-[12rem] w-full max-w-[700px] h-[200px]">
            <div className="absolute inset-0 rounded-2xl blur-2xl animate-pulse" 
              style={{ 
                background: 'radial-gradient(ellipse 150% 120%, rgba(255, 244, 199, 1) 0%, rgba(251, 190, 36, 0.89) 30%, transparent 70%)', 
                transform: 'scale(1)',
                animation: 'pulse 3s ease-in-out infinite'
              }} 
            />
            <div className="relative w-full h-full flex justify-center items-center scale-90 md:scale-100 ">
              {images.map((img, index) => (
                <div
                  key={index}
                  className="absolute transition-all duration-500 ease-out"
                  style={getImageTransform(index)}
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

          {/* Progress indicators */}
          {/* <div className="absolute bottom-[-190px] md:bottom-[-220px] left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? "bg-blue-600 w-6"
                    : "bg-gray-400"
                }`}
              />
            ))}
          </div> */}
        </div>

      {/* Text content */}
      <div className="flex flex-col mt-12 md:mt-0 text-center md:text-left gap-6 md:w-[40%] p-3 md:p-0 z-30 overflow-hidden">
        <div className="relative h-10 overflow-hidden">
          {artists.map((item, index) => (
            <div
              key={index}
              className="absolute w-full transition-all duration-500 ease-out"
              style={{
                transform: currentIndex === index 
                  ? 'translateY(0)' 
                  : currentIndex > index 
                    ? 'translateY(-100%)' 
                    : 'translateY(100%)',
                opacity: currentIndex === index ? 1 : 0,
              }}
            >
              <div className={`md:px-6 text-3xl ${akiraExpanded.className}`}>{item[0]}</div>
            </div>
          ))}
        </div>
        
        <div className="relative min-h-[200px] -mt-7 md:-mt-0 overflow-hidden">
          {artists.map((item, index) => (
            <div
              key={index}
              className={`${michroma.className} absolute w-full transition-all duration-500 ease-out`}
              style={{
                transform: currentIndex === index 
                  ? 'translateY(0)' 
                  : currentIndex > index 
                    ? 'translateY(-100%)' 
                    : 'translateY(100%)',
                opacity: currentIndex === index ? 1 : 0,
              }}
            >
              <div className="leading-relaxed text-sm md:px-6 ">
                {item[1]}
              </div>
            </div>
          ))}
        </div>

        {/* Button - separately controlled for mobile */}
        <div className="flex justify-center  md:ml-0 md:justify-start md:mt-8" onClick={()=>router.push('/passes')}>
          <DotGridButton text="Book Your Pass" />
        </div>
      </div>
      </div>
    </div>
  );
};

export default Proshow;
