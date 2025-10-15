"use client";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Alumni_Sans } from "next/font/google";

const alumniSans = Alumni_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-alumni-sans",
});

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AlternatingSection({ sections }) {
  const [hoveredSection, setHoveredSection] = useState(null);
  const sectionRefs = useRef([]);

  useEffect(() => {
    sectionRefs.current.forEach((section, index) => {
      if (!section) return;

      const isEven = index % 2 === 0;
      const textEl = section.querySelector(".text-content");
      const imageEl = section.querySelector(".image-content");
      const titleEl = section.querySelector(".title-text");
      const descEl = section.querySelector(".desc-text");

      // Set initial states - start with everything hidden and below
      gsap.set(section, {
        opacity: 0,
        y: 100,
      });

      gsap.set(textEl, {
        opacity: 0,
      });

      gsap.set(titleEl, {
        x: isEven ? -100 : 100,
        opacity: 0,
      });

      gsap.set(descEl, {
        x: isEven ? -80 : 80,
        opacity: 0,
      });

      gsap.set(imageEl, {
        opacity: 0,
        scale: 0.7,
        x: isEven ? 100 : -100,
        rotateY: isEven ? 20 : -20,
      });

      // Calculate staggered delay based on index
      const staggerDelay = index * 0.3;

      // Animate the entire section first
      gsap.to(section, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: staggerDelay,
        ease: "power3.out",
        onStart: () => {
          // Then animate the contents
          gsap.to(textEl, {
            opacity: 1,
            duration: 0.6,
            delay: 0.2,
            ease: "power2.out",
          });

          // Animate title
          gsap.to(titleEl, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: 0.3,
            ease: "power3.out",
          });

          // Animate description with delay
          gsap.to(descEl, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: 0.5,
            ease: "power3.out",
          });

          // Animate image with 3D effect
          gsap.to(imageEl, {
            opacity: 1,
            scale: 1,
            x: 0,
            rotateY: 0,
            duration: 1.2,
            delay: 0.4,
            ease: "back.out(1.2)",
          });
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [sections]);

  return (
    <div className="w-full bg-white">
      {sections.map((section, index) => {
        const isEven = index % 2 === 0;
        const isHovered = hoveredSection === index;

        return (
          <div
            key={index}
            ref={(el) => (sectionRefs.current[index] = el)}
            className="h-[32vh] max-h-[1000px] relative cursor-pointer mx-4 my-2"
            onMouseEnter={() => setHoveredSection(index)}
            onMouseLeave={() => setHoveredSection(null)}
            style={{
              background: "#ffffff",
              overflow: isHovered ? "visible" : "hidden",
              zIndex: isHovered ? 100 : 1,
              // border: "px solid #FFD700",
              // borderRadius: "8px",
              // boxShadow: isHovered
              //   ? "0 8px 24px rgba(255,215,0,0.3), inset 0 0 0 1px rgba(255,215,0,0.2)"
              //   : "0 2px 8px rgba(255,215,0,0.15)",
            }}
          >
            {/* Inner border with top-right and bottom-left rounded corners */}
            <div
              className="absolute inset-[10px] sm:inset-[15px] md:inset-[20px] pointer-events-none z-[5]"
              style={{
                border: "2px sm:border-[2.5px] md:border-[3px] solid rgba(255, 215, 0, 1)",
                borderTopRightRadius: "30px",
                borderBottomLeftRadius: "30px",
              }}
            />

            {/* Animated background particles - removed for clean white background */}

            <div className="h-full flex items-center justify-center relative z-10 py-4">
              {/* Layout: Text Left, Image Right (for even indices) */}
              {isEven ? (
                <>
                  {/* Text Section - Left */}
                  <div className="w-1/2 h-full flex items-center justify-center px-3 lg:px-6 text-content">
                    <div className="max-w-lg">
                      <div className="title-text">
                        <h2
                          className={`${alumniSans.className} font-[700] text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-black mb-2 sm:mb-3 md:mb-4 leading-tight tracking-tight`}
                        >
                          {section.title}
                        </h2>
                      </div>
                      <div className="desc-text">
                        <p className="text-gray-700 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl leading-relaxed font-normal tracking-wide">
                          {section.description}
                        </p>
                        {/* {section.highlight && (
                          <div className="mt-3 inline-block px-4 py-2 bg-black/5 backdrop-blur-sm rounded-full">
                            <span className="text-black font-semibold text-sm md:text-base">
                              {section.highlight}
                            </span>
                          </div>
                        )} */}
                      </div>
                    </div>
                  </div>

                  {/* Image Section - Right */}
                  <div
                    className="w-1/2 h-full flex items-center justify-center p-3 image-content perspective-1000 relative"
                    style={{
                      zIndex: isHovered ? 50 : 1,
                    }}
                  >
                    <div
                      className="relative transition-all duration-700 ease-out"
                      style={{
                        transform: isHovered
                          ? "scale(1.4) rotateY(5deg) translateZ(15px)"
                          : "scale(1) rotateY(0deg) translateZ(0)",
                        filter: isHovered
                          ? "brightness(1.05) contrast(1.05)"
                          : "brightness(1) contrast(1)",
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <img
                        src={section.image}
                        alt={section.title}
                        className="relative max-h-[120px] sm:max-h-[150px] md:max-h-[180px] w-auto object-contain rounded-xl"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Image Section - Left */}
                  <div
                    className="w-1/2 h-full flex items-center justify-center p-3 image-content perspective-1000 relative"
                    style={{
                      zIndex: isHovered ? 50 : 1,
                    }}
                  >
                    <div
                      className="relative transition-all duration-700 ease-out"
                      style={{
                        transform: isHovered
                          ? "scale(1.4) rotateY(-5deg) translateZ(15px)"
                          : "scale(1) rotateY(0deg) translateZ(0)",
                        filter: isHovered
                          ? "brightness(1.05) contrast(1.05)"
                          : "brightness(1) contrast(1)",
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <img
                        src={section.image}
                        alt={section.title}
                        className="relative max-h-[120px] sm:max-h-[150px] md:max-h-[180px] w-auto object-contain rounded-xl"
                      />
                    </div>
                  </div>

                  {/* Text Section - Right */}
                  <div className="w-1/2 h-full flex items-center justify-center px-3 lg:px-6 text-content">
                    <div className="max-w-lg">
                      <div className="title-text">
                        <h2
                          className={`${alumniSans.className} font-[700] text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-black mb-2 sm:mb-3 md:mb-4 leading-tight tracking-tight`}
                        >
                          {section.title}
                        </h2>
                      </div>
                      <div className="desc-text">
                        <p className="text-gray-700 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl leading-relaxed font-normal tracking-wide">
                          {section.description}
                        </p>
                        {/* {section.highlight && (
                          <div className="mt-3 inline-block px-4 py-2 bg-black/5 backdrop-blur-sm rounded-full">
                            <span className="text-black  font-semibold text-sm md:text-base">
                              {section.highlight}
                            </span>
                          </div>
                        )} */}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
