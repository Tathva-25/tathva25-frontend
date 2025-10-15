'use client'

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const Proshow = () => {
  const images = ["/images/embla1.png", "/images/embla2.png", "/images/embla3.png"];
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

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

  // Calculate transform for each image based on its original index
  const getImageTransform = (imageIndex) => {
    // Convert scroll progress (0 to 1) to rotation steps (0 to 2)
    const rotationProgress = scrollProgress * 2; // 0 to 2 (two full rotations)
    
    // Calculate the visual position for this image
    // Each image cycles through: right(2) -> center(1) -> left(0) -> back to right(2)
    let position = ((2 - imageIndex) + rotationProgress) % 3;
    
    // Define positions
    const positions = {
      left: { x: -320, scale: 0.75, opacity: 0.6, z: 10 },
      center: { x: 0, scale: 1.1, opacity: 1, z: 30 },
      right: { x: 320, scale: 0.75, opacity: 0.6, z: 20 },
    };
    
    // Interpolate between positions based on where we are in the cycle
    let x, scale, opacity, z;
    
    if (position >= 0 && position < 1) {
      // Transitioning from left to right (wrapping around behind)
      const t = position;
      // Move from left, fade out, then fade back in on right
      if (t < 0.5) {
        // First half: fade out while moving right
        x = positions.left.x + 200 * (t * 2);
        scale = positions.left.scale - 0.3 * (t * 2);
        opacity = positions.left.opacity - 0.6 * (t * 2);
        z = 5;
      } else {
        // Second half: appear on right side
        const t2 = (t - 0.5) * 2;
        x = positions.right.x;
        scale = positions.right.scale - 0.3 * (1 - t2);
        opacity = 0 + positions.right.opacity * t2;
        z = 15;
      }
    } else if (position >= 1 && position < 2) {
      // Transitioning from right to center
      const t = position - 1;
      x = positions.right.x + (positions.center.x - positions.right.x) * t;
      scale = positions.right.scale + (positions.center.scale - positions.right.scale) * t;
      opacity = positions.right.opacity + (positions.center.opacity - positions.right.opacity) * t;
      z = 20 + Math.floor(t * 10);
    } else {
      // Transitioning from center to left
      const t = position - 2;
      x = positions.center.x + (positions.left.x - positions.center.x) * t;
      scale = positions.center.scale + (positions.left.scale - positions.center.scale) * t;
      opacity = positions.center.opacity + (positions.left.opacity - positions.center.opacity) * t;
      z = 30 - Math.floor(t * 20);
    }
    
    return {
      transform: `translateX(${x}px) scale(${scale})`,
      opacity: opacity,
      zIndex: z,
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
                  className="absolute transition-all duration-75 ease-linear"
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
                  Math.round(scrollProgress * 2) === index
                    ? "bg-blue-600 w-6"
                    : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Text content */}
        <div className="flex flex-col mt-6 md:mt-0 text-center md:text-left gap-6 md:w-[40%] p-6 z-30">
          <div className="text-3xl font-semibold mb-2">Heading</div>
          <div className="text-gray-700 leading-relaxed text-sm md:text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur,
            officia ipsam quia pariatur iusto debitis enim dolores modi, quod
            aspernatur maiores et nulla velit error natus tempora deleniti
            accusamus minus! Saepe consectetur asperiores exercitationem dolorem
            harum, dolores fugit accusamus porro quasi, voluptatum nihil aspernatur
            hic. Quis laboriosam fugiat magni asperiores iusto praesentium quia
            aliquam, optio eaque nulla quas. Voluptatum, autem?
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