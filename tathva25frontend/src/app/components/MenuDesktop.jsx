"use client";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Alumni_Sans } from "next/font/google";

const alumniSans = Alumni_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-alumni-sans",
});

export default function MenuDesktop({ menuItems, currentPath }) {
  // TEXT COLOR CONFIGURATION - Change these to modify the text colors
  const BG_TEXT_COLOR = "#ffffff44"; // Background scrolling text color
  const BOTTOM_TEXT_COLOR = "#ffffff"; // Bottom text color

  const [fadedtext, setFadedText] = useState("");
  const [hoveredItem, setHoveredItem] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null); // Track currently selected item
  const bgTextRefs = useRef([]);
  const bottomTextRef = useRef(null);
  const circleItemRefs = useRef([]);
  const centerImageRef = useRef(null);
  const scrollingTextRef = useRef(null);
  const scrollAnimationRef = useRef(null);

  let length = menuItems.length;
  let cutangle = 360 / length;

  // Initialize with current page selected based on pathname
  useEffect(() => {
    if (currentPath && menuItems.length > 0) {
      // Find the menu item that matches the current path
      const currentIndex = menuItems.findIndex(
        (item) => item.link === currentPath
      );

      if (currentIndex !== -1) {
        // Set the current page as selected
        setSelectedIndex(currentIndex);
        setFadedText(menuItems[currentIndex].name);
        setHoveredItem(menuItems[currentIndex]);

        // Set initial scaling for the current page item
        setTimeout(() => {
          if (circleItemRefs.current[currentIndex]) {
            gsap.set(circleItemRefs.current[currentIndex], {
              scale: 1.2,
            });
          }
        }, 100);
      } else {
        // Fallback to first item if current path doesn't match any menu item
        setSelectedIndex(0);
        setFadedText(menuItems[0].name);
        setHoveredItem(menuItems[0]);

        setTimeout(() => {
          if (circleItemRefs.current[0]) {
            gsap.set(circleItemRefs.current[0], {
              scale: 1.2,
            });
          }
        }, 100);
      }
    }
  }, [currentPath, menuItems]);

  useEffect(() => {
    if (fadedtext && scrollingTextRef.current) {
      // Kill any existing animations on these elements
      if (scrollAnimationRef.current) {
        scrollAnimationRef.current.kill();
      }
      gsap.killTweensOf("#bg-text");
      gsap.killTweensOf(scrollingTextRef.current);

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
      scrollAnimationRef.current = gsap.to(scrollingTextRef.current, {
        x: "0%",
        duration: 15,
        ease: "none",
        repeat: -1,
        paused: false,
      });
    }

    // Cleanup function to kill animations when component unmounts or fadedtext changes
    return () => {
      if (scrollAnimationRef.current) {
        scrollAnimationRef.current.kill();
      }
    };
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
          transform: "scale(0.2)",
          opacity: 1,
          imageRendering: "pixelated",
        })
          // Create interference/mixing phase
          .to(img, {
            filter: "blur(0px) contrast(1) saturate(1)",
            transform: "scale(1.05)",
            opacity: 0.55,
            duration: 0.08,
          })
          .to(img, {
            filter: "blur(0.3px) contrast(1000) saturate(100)",
            transform: "scale(0.75)",
            opacity: 0.9,
            duration: 0.1,
          })
          .to(img, {
            filter: "blur(0px) contrast(1.3) saturate(1.2)",
            transform: "scale(1)",
            opacity: 0.95,
            duration: 0.18,
            imageRendering: "pixelated",
          })
          // Final clear
          .to(img, {
            filter: "blur(0px) contrast(1) saturate(1)",
            transform: "scale(1)",
            opacity: 1,
            imageRendering: "auto",
            duration: 0.4,
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
          ease: "power2.inOut",
        });
      }
    }
  }, [hoveredItem]);

  const handleCircleItemHover = (index, isHovering) => {
    if (isHovering) {
      // Only update if hovering over a different item
      if (selectedIndex !== index) {
        // Update selection to the hovered item
        setSelectedIndex(index);
        setFadedText(menuItems[index].name);
        setHoveredItem(menuItems[index]);

        // Apply scaling to all items
        circleItemRefs.current.forEach((itemRef, i) => {
          if (itemRef) {
            gsap.to(itemRef, {
              scale: i === index ? 1.2 : 1,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        });
      }
    }
    // Note: When mouse leaves (isHovering = false), we don't change anything
    // The selection stays locked on the last hovered item
  };

  const handleCircleItemClick = (index) => {
    console.log(menuItems[index].name);
    window.location.href = menuItems[index].link;
  };

  return (
    <>
      <div
        id="bg-text"
        className="absolute overflow-hidden whitespace-nowrap w-full top-[22%] sm:top-[12%] md:top-[4%] lg:top-[0%] text-[90px] sm:text-[180px] md:text-[320px] lg:text-[420px]"
        style={{ color: BG_TEXT_COLOR }}
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
          <img src="ring2.png" className="scale-130 " alt="Rotating ring" />
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
            const radius = 150;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            const isSelected = selectedIndex === i;

            return (
              <div
                key={i}
                ref={(el) => (circleItemRefs.current[i] = el)}
                className={`absolute w-10 h-10 flex items-center justify-center cursor-pointer overflow-hidden `}
                style={{
                  left: `calc(50% + ${x}px - 20px)`,
                  top: `calc(50% + ${y}px - 20px)`,
                  // filter: isSelected
                  //   ? "brightness(1.2) saturate(1.2)"
                  //   : "brightness(0.9) saturate(0.8)",
                }}
                onMouseEnter={() => handleCircleItemHover(i, true)}
                onMouseLeave={() => handleCircleItemHover(i, false)}
                onClick={() => handleCircleItemClick(i)}
              >
                <img
                  src={menuItems[i].img1}
                  alt={menuItems[i].name}
                  className="-rotate-8"
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
          style={{ opacity: 0, color: BOTTOM_TEXT_COLOR }}
        >
          {fadedtext}
        </div>
      )}
    </>
  );
}
