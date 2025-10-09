"use client";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Alumni_Sans } from "next/font/google";
import Image from "next/image";

const alumniSans = Alumni_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-alumni-sans",
});

const menuItems = [
  {
    name: "LECTURES",
    link: "/lectures",
    img1: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=100&h=100&fit=crop&crop=center",
    img2: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=150&h=150&fit=crop&crop=center",
  },
  {
    name: "WORKSHOPS",
    link: "/workshops",
    img1: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop&crop=center",
    img2: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=150&h=150&fit=crop&crop=center",
  },
  {
    name: "ROBOWARS",
    link: "/robowars",
    img1: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=100&h=100&fit=crop&crop=center",
    img2: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=150&h=150&fit=crop&crop=center",
  },
  {
    name: "COMPETITIONS",
    link: "/competitions",
    img1: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=100&h=100&fit=crop&crop=center",
    img2: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=150&h=150&fit=crop&crop=center",
  },
  {
    name: "EVENTS",
    link: "/events",
    img1: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=100&h=100&fit=crop&crop=center",
    img2: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=150&h=150&fit=crop&crop=center",
  },
  {
    name: "SPONSORS",
    link: "/sponsors",
    img1: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop&crop=center",
    img2: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=center",
  },
  {
    name: "CONTACT",
    link: "/contact",
    img1: "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=100&h=100&fit=crop&crop=center",
    img2: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=150&h=150&fit=crop&crop=center",
  },
  {
    name: "ABOUT",
    link: "/about",
    img1: "https://images.unsplash.com/photo-1552664688-cf412ec27db2?w=100&h=100&fit=crop&crop=center",
    img2: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=150&h=150&fit=crop&crop=center",
  },
  {
    name: "TEAM",
    link: "/team",
    img1: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop&crop=center",
    img2: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=150&h=150&fit=crop&crop=center",
  },
  {
    name: "GALLERY",
    link: "/gallery",
    img1: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=100&h=100&fit=crop&crop=center",
    img2: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=150&h=150&fit=crop&crop=center",
  },
  {
    name: "BLOG",
    link: "/blog",
    img1: "https://images.unsplash.com/photo-1486312338219-ce68e2c6b013?w=100&h=100&fit=crop&crop=center",
    img2: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=150&h=150&fit=crop&crop=center",
  },
  {
    name: "FAQS",
    link: "/faqs",
    img1: "https://images.unsplash.com/photo-1603465228952-2bb7322bb0f8?w=100&h=100&fit=crop&crop=center",
    img2: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=150&h=150&fit=crop&crop=center",
  },
];

let length = menuItems.length;
let cutangle = 360 / length;

export default function Menupage() {
  const [fadedtext, setFadedText] = useState("");
  const [hoveredItem, setHoveredItem] = useState(null);
  const bgTextRefs = useRef([]);
  const bottomTextRef = useRef(null);
  const circleItemRefs = useRef([]);
  const centerImageRef = useRef(null);

  useEffect(() => {
    if (fadedtext && bgTextRefs.current.length > 0) {
      // Animate background text spans
      gsap.fromTo(
        bgTextRefs.current,
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.out",
        }
      );
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

  useEffect(() => {
    if (centerImageRef.current) {
      if (hoveredItem) {
        // Animate new image in from bottom
        gsap.fromTo(
          centerImageRef.current,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          }
        );
      } else {
        // Animate image out (fade up)
        gsap.to(centerImageRef.current, {
          opacity: 0,
          y: -50,
          duration: 0.3,
          ease: "power2.in",
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
  };

  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute z-2 top-[2%] right-[2%] w-full flex px-8 py-4 justify-end">
        <img src="logo.png" width={200} height={200} alt="Logo" />
      </div>

      <div
        id="bg-text"
        className="absolute flex gap-80 text-[#00000044] px-4
         top-[22%] sm:top-[12%] md:top-[4%] lg:top-[0%]
          text-[90px] sm:text-[180px] md:text-[320px] lg:text-[420px] 
          -left-30 sm:-left-40 md:-left-60 lg:-left-100"
      >
        {fadedtext &&
          Array.from({ length: 6 }).map((_, i) => (
            <span
              key={`${fadedtext}-${i}`}
              ref={(el) => (bgTextRefs.current[i] = el)}
              className={`${alumniSans.className} font-[700]`}
              style={{ opacity: 0 }}
            >
              {fadedtext}
            </span>
          ))}
      </div>

      {/*IMAGES*/}
      <div id="wheel1" className="absolute">
        <img src="ring5.svg" className="rotate scale-130" alt="Rotating ring" />
      </div>
      <div id="wheel1" className="absolute">
        <img src="ring1.svg" className="rotate scale-130" alt="Rotating ring" />
      </div>
      <div id="wheel1" className="absolute">
        <img src="ring2.svg" className="rotate scale-130" alt="Rotating ring" />
      </div>

      <div id="wheel1" className="absolute">
        <img src="ring3.svg" className=" scale-130" alt="Rotating ring" />
      </div>
      <div id="wheel1" className="absolute">
        <img src="ring4.svg" className="rotate scale-130" alt="Rotating ring" />
      </div>

      {/* Circle with 12 numbered divs */}

      <div className="absolute rotate-8 z-20 w-96 h-96 flex items-center justify-center">
        <div className="relative rounded-full w-full  h-full">
          {Array.from({ length }, (_, i) => {
            const angle = i * cutangle * (Math.PI / 180); // 30 degrees between each item
            const radius = 130; // Distance from center
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const rotationAngle = i * cutangle + 90; // Rotate each trapezium to point toward center

            return (
              <div
                key={i}
                ref={(el) => (circleItemRefs.current[i] = el)}
                className={`absolute w-20 h-20 flex items-center justify-center cursor-pointer shadow-lg overflow-hidden [clip-path:polygon(0%_0%,_100%_0%,_77%_61%,_23%_61%)]`}
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

        <div className="absolute z-30 flex items-center justify-center w-48 h-48 bg-black bg-opacity-20 rounded-full backdrop-blur-sm overflow-hidden border-4 border-white border-opacity-30">
          {hoveredItem && (
            <img
              ref={centerImageRef}
              src={hoveredItem.img2}
              alt={hoveredItem.name}
              className="w-full h-full object-cover"
              style={{ opacity: 0 }}
            />
          )}
        </div>
      </div>

      {fadedtext && (
        <div
          ref={bottomTextRef}
          className={`mt-4 ${alumniSans.className} font-[700] text-9xl absolute bottom-[5%]`}
          style={{ opacity: 0 }}
        >
          {fadedtext}
        </div>
      )}
    </div>
  );
}

// clip-path for trapezium
// useEffect for GSAP
