"use client";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Alumni_Sans } from "next/font/google";

const alumniSans = Alumni_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-alumni-sans",
});

export default function MenuDesktop({ menuItems }) {
  const [fadedtext, setFadedText] = useState("");
  const [hoveredItem, setHoveredItem] = useState(null);
  const bgTextRefs = useRef([]);
  const bottomTextRef = useRef(null);
  const circleItemRefs = useRef([]);
  const centerImageRef = useRef(null);
  const scrollingTextRef = useRef(null);

  let length = menuItems.length;
  let cutangle = 360 / length;

  useEffect(() => {
    if (fadedtext && scrollingTextRef.current) {
      // Animate background text container fade in
      gsap.fromTo(
        "#bg-text",
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

      // Start the continuous scrolling animation (left to right)
      gsap.set(scrollingTextRef.current, { x: "-50%" });
      gsap.to(scrollingTextRef.current, {
        x: "0%",
        duration: 15,
        ease: "none",
        repeat: -1,
      });
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

  /*PIXELATED MIXING TRANSITION*/
  useEffect(() => {
    if (centerImageRef.current) {
      const img = centerImageRef.current;

      if (hoveredItem) {
        // Pixelated mixing effect using CSS filters
        const tl = gsap.timeline();

        // Start pixelated and blocky
        tl.set(img, {
          filter: "blur(0.5px) contrast(2) saturate(0.5)",
          transform: "scale(0.9)",
          opacity: 0.7,
          imageRendering: "pixelated",
        })
          // Create interference/mixing phase
          .to(img, {
            filter: "blur(0px) contrast(1.5) saturate(1.5)",
            transform: "scale(1.05)",
            opacity: 0.55,
            duration: 0.08,
          })
          .to(img, {
            filter: "blur(0.3px) contrast(1.8) saturate(0.8)",
            transform: "scale(0.95)",
            opacity: 0.9,
            duration: 0.08,
          })
          .to(img, {
            filter: "blur(0px) contrast(1.3) saturate(1.2)",
            transform: "scale(1.02)",
            opacity: 0.95,
            duration: 0.18,
          })
          // Final clear
          .to(img, {
            filter: "blur(0px) contrast(1) saturate(1)",
            transform: "scale(1)",
            opacity: 1,
            imageRendering: "auto",
            duration: 0.15,
            ease: "power2.out",
          });
      } else {
        // Glitch out with pixelation
        gsap.to(img, {
          filter: "blur(1px) contrast(0.5) saturate(0.3)",
          transform: "scale(0.8)",
          opacity: 0,
          imageRendering: "pixelated",
          duration: 0.2,
          ease: "power2.out",
        });
      }
    }
  }, [hoveredItem]);

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
      setFadedText(menuItems[index].name);
      setHoveredItem(menuItems[index]);
    } else {
      setFadedText("");
      setHoveredItem(null);
    }
  };

  const handleCircleItemClick = (index) => {
    console.log(menuItems[index].name);
    window.location.href = menuItems[index].link;
  };

  return (
    <>
      <div
        id="bg-text"
        className="absolute text-[#00000044] overflow-hidden whitespace-nowrap w-full top-[22%] sm:top-[12%] md:top-[4%] lg:top-[0%] text-[90px] sm:text-[180px] md:text-[320px] lg:text-[420px]"
      >
        {fadedtext && (
          <div
            ref={scrollingTextRef}
            className="flex gap-80"
            style={{ width: "200%" }}
          >
            {Array.from({ length: 24 }).map((_, i) => (
              <span
                key={`${fadedtext}-${i}`}
                ref={(el) => (bgTextRefs.current[i] = el)}
                className={`${alumniSans.className} font-[700] flex-shrink-0`}
                style={{ opacity: 1 }}
              >
                {fadedtext}
              </span>
            ))}
          </div>
        )}
      </div>

      {/*BACKGROUND RING IMAGES*/}
      <div className="absolute z-10 flex items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96">
        <div className="absolute">
          <img
            src="ring1.png"
            className="rotate scale-170"
            alt="Rotating ring"
          />
        </div>
        <div className="absolute">
          <img src="ring2.png" className="scale-130" alt="Rotating ring" />
        </div>
        <div className="absolute">
          <img src="ring3.png" className="scale-130" alt="Rotating ring" />
        </div>
      </div>

      {/* Circle with menu items */}
      <div className="absolute z-20 w-96 h-96 flex items-center justify-center rotate-8">
        <div className="relative rounded-full w-full h-full">
          {Array.from({ length }, (_, i) => {
            const angle = i * cutangle * (Math.PI / 180);
            const radius = 130;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const rotationAngle = i * cutangle + 90;

            return (
              <div
                key={i}
                ref={(el) => (circleItemRefs.current[i] = el)}
                className="absolute w-20 h-20 flex items-center justify-center cursor-pointer shadow-lg overflow-hidden [clip-path:polygon(0%_0%,_100%_0%,_77%_61%,_23%_61%)]"
                style={{
                  left: `calc(50% + ${x}px - 40px)`,
                  top: `calc(50% + ${y}px - 40px)`,
                  transform: `rotate(${rotationAngle}deg)`,
                }}
                onMouseEnter={() => handleCircleItemHover(i, true)}
                onMouseLeave={() => handleCircleItemHover(i, false)}
                onClick={() => handleCircleItemClick(i)}
              >
                <img
                  src={menuItems[i].img1}
                  alt={menuItems[i].name}
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}
        </div>

        {/* Center image - show on hover */}
        <div className="absolute z-30 flex items-center -rotate-8 justify-center w-56 h-56 bg-black bg-opacity-20 rounded-full backdrop-blur-sm overflow-hidden">
          {hoveredItem && (
            <img
              ref={centerImageRef}
              src={hoveredItem.img2}
              alt={hoveredItem.name}
              className="w-[90%] h-full object-contain"
              style={{
                opacity: 0,
              }}
            />
          )}
        </div>
      </div>

      {fadedtext && (
        <div
          ref={bottomTextRef}
          className={`mt-4 ${alumniSans.className} font-[700] absolute text-9xl -bottom-[1%]`}
          style={{ opacity: 0 }}
        >
          {fadedtext}
        </div>
      )}
    </>
  );
}
