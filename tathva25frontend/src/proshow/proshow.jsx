'use client'

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const Proshow = () => {
  const images = ["/images/embla1.png", "/images/embla2.png", "/images/embla3.png"];
  const desc=[["Arivu","cfyuhgvhuhgvhijhbv bhijhbvbhuhvhuhvvhuhvvhuhbvbhihvhuhv vhuhvhuhvhuhvhujhvbhuhvhuhvuh"],["Shilpa Rao", "b bhjijhbjihjiujhgvfdftyuhjbvcxsdrtyuikjnbvcdrty ujn cdftyujn cftyujnbvfrtyujnbvftyhnb cftyujn cf"], ["Fejo", "hguijhngfdtyukjm cfyuikm vcfgyujkm cfgyujkmn bvfgtyuikm"]];
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const script1 = document.createElement('script');
    script1.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
    script1.async = true;

    const script2 = document.createElement('script');
    script2.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
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
          start: 'top top',
          end: () => `+=${window.innerHeight * 3.5}`,
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
            // Snap to nearest position
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
        window.ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
    };
  }, []);

  // Calculate transform for each image based on snapped positions
  const getImageTransform = (imageIndex) => {
    // Use snapped progress instead of continuous
    const rotationProgress = Math.round(scrollProgress * 2);
    
    // Calculate the visual position for this image (inverted direction: left -> center -> right)
    let position = ((imageIndex) - rotationProgress + 6) % 3;
    
    // Define positions
    const positions = {
      0: { x: -320, scale: 0.75, opacity: 0.6, z: 10 }, // left
      1: { x: 0, scale: 1.1, opacity: 1, z: 30 },        // center
      2: { x: 320, scale: 0.75, opacity: 0.6, z: 20 },   // right
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
      <div className="flex flex-col md:flex-row h-full justify-center items-center relative px-6 pl-10">
        {/* Coordinates text */}
        <div className="absolute hidden md:block top-10 left-20 text-sm z-40">
          11.3210°N <br />75.9320°E
        </div>
        <div className="absolute hidden md:block bottom-8 left-20 text-sm z-40">
          Be there <br />Feel it <br />Live it
        </div>

        {/* Image section */}
        <div className="md:w-[60%] flex justify-center relative z-30">
          {/* Main Image */}
          <Image
            src="/images/proshow-main.png"
            alt="Proshow main"
            width={600}
            height={400}
            className="rounded-2xl object-contain max-w-[80%] md:max-w-[90%] h-auto"
            priority
          />

          {/* Text Image (overlayed and moves with main image) */}
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
            <Image
              src="/images/proshowText.png"
              alt="Proshow main text"
              width={400}
              height={400}
              className="rounded-2xl md:scale-[1.05] lg:scale-[0.8] sm:scale-[1.1] scale-[1.1] -mt-4 md:-mt-10 object-contain w-[60%] md:w-[70%] animate-slow-spin"
              priority
            />
          </div>

          {/* Carousel - All 3 images rendered, positions calculated */}
          <div className="absolute hidden sm:block mt-[12rem] w-full max-w-[700px] h-[200px]">
            <div className="relative w-full h-full flex justify-center items-center">
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
          <div className="absolute bottom-[-190px] md:bottom-[-220px] left-1/2 -translate-x-1/2 flex gap-2">
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
          </div>
        </div>

        {/* Text content */}
        <div className="flex flex-col mt-6 md:mt-0 text-center md:text-left gap-6 md:w-[40%] p-6 z-30 overflow-hidden">
          <div className="relative h-12 overflow-hidden">
            {desc.map((item, index) => (
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
                <div className="text-3xl font-semibold">{item[0]}</div>
              </div>
            ))}
          </div>
          
          <div className="relative min-h-[200px] overflow-hidden">
            {desc.map((item, index) => (
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
                <div className="text-gray-700 leading-relaxed text-sm md:text-base">
                  {item[1]}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes slow-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-slow-spin {
          animation: slow-spin 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Proshow;