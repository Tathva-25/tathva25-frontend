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
    img1: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=100&h=100&fit=crop&crop=center",
    img2: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=150&h=150&fit=crop&crop=center",
  },
  {
    name: "FAQS",
    link: "/faqs",
    img1: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=100&h=100&fit=crop&crop=center",
    img2: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=150&h=150&fit=crop&crop=center",
  },
];

let length = menuItems.length;
let cutangle = 360 / length;

export default function Menupage() {
  const [fadedtext, setFadedText] = useState("");
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0); // For mobile selection
  const [circleRotation, setCircleRotation] = useState(0); // Current rotation angle
  const bgTextRefs = useRef([]);
  const bottomTextRef = useRef(null);
  const circleItemRefs = useRef([]);
  const centerImageRef = useRef(null);
  const scrollingTextRef = useRef(null);
  const circleContainerRef = useRef(null);
  const ring2Ref = useRef(null);
  const ring3Ref = useRef(null);

  // Mobile detection
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Initialize mobile selection and set initial rotation
  useEffect(() => {
    if (isMobile) {
      setFadedText(menuItems[selectedIndex].name);
      setHoveredItem(menuItems[selectedIndex]);

      // Set initial rotation to position first item at top
      // Since items start at 0 degrees (right side), we need -90 degrees to move first item to top
      const initialRotation = -90 - selectedIndex * cutangle;
      setCircleRotation(initialRotation);

      if (circleContainerRef.current) {
        gsap.set(circleContainerRef.current, {
          rotation: initialRotation,
        });
      }

      // Set initial rotation for ring2 and ring3
      if (ring2Ref.current) {
        gsap.set(ring2Ref.current, {
          rotation: initialRotation,
        });
      }
      if (ring3Ref.current) {
        gsap.set(ring3Ref.current, {
          rotation: initialRotation,
        });
      }
    } else {
      // Clear mobile state when switching to desktop
      if (fadedtext && !hoveredItem) {
        setFadedText("");
      }
    }
  }, [isMobile, selectedIndex]);

  // Touch gesture handling for mobile
  useEffect(() => {
    if (!isMobile || !circleContainerRef.current) return;

    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    let startTime = 0;
    let initialRotation = circleRotation;

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
      currentX = startX;
      isDragging = true;
      startTime = Date.now();
      initialRotation = circleRotation;

      // Stop any ongoing animations
      if (circleContainerRef.current) {
        gsap.killTweensOf(circleContainerRef.current);
      }
      if (ring2Ref.current) {
        gsap.killTweensOf(ring2Ref.current);
      }
      if (ring3Ref.current) {
        gsap.killTweensOf(ring3Ref.current);
      }
    };

    const handleTouchMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();

      currentX = e.touches[0].clientX;
      const deltaX = currentX - startX;

      // Convert horizontal movement to rotation (more sensitive)
      const rotationDelta = (deltaX / window.innerWidth) * 180;
      const newRotation = initialRotation + rotationDelta;

      // Apply real-time rotation during drag
      if (circleContainerRef.current) {
        gsap.set(circleContainerRef.current, {
          rotation: newRotation,
        });
      }
      if (ring2Ref.current) {
        gsap.set(ring2Ref.current, {
          rotation: newRotation,
        });
      }
      if (ring3Ref.current) {
        gsap.set(ring3Ref.current, {
          rotation: newRotation,
        });
      }
    };

    const handleTouchEnd = (e) => {
      if (!isDragging) return;
      isDragging = false;

      const endX = e.changedTouches[0].clientX;
      const deltaX = endX - startX;
      const deltaTime = Date.now() - startTime;
      const velocity = Math.abs(deltaX) / deltaTime;

      // Lower threshold and consider velocity for more responsive swiping
      const threshold = 30;
      const velocityThreshold = 0.5;

      if (Math.abs(deltaX) > threshold || velocity > velocityThreshold) {
        if (deltaX > 0) {
          // Swipe right - rotate counter-clockwise (previous item)
          rotateToPrevious();
        } else {
          // Swipe left - rotate clockwise (next item)
          rotateToNext();
        }
      } else {
        // Snap back to current selection if swipe wasn't significant enough
        const targetRotation = -90 - selectedIndex * cutangle;
        setCircleRotation(targetRotation);

        if (circleContainerRef.current) {
          gsap.to(circleContainerRef.current, {
            rotation: targetRotation,
            duration: 0.4,
            ease: "back.out(1.7)",
          });
        }
        if (ring2Ref.current) {
          gsap.to(ring2Ref.current, {
            rotation: targetRotation,
            duration: 0.4,
            ease: "back.out(1.7)",
          });
        }
        if (ring3Ref.current) {
          gsap.to(ring3Ref.current, {
            rotation: targetRotation,
            duration: 0.4,
            ease: "back.out(1.7)",
          });
        }
      }
    };

    const element = circleContainerRef.current;
    element.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    element.addEventListener("touchmove", handleTouchMove, { passive: false });
    element.addEventListener("touchend", handleTouchEnd, { passive: false });

    return () => {
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchmove", handleTouchMove);
      element.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isMobile, selectedIndex, circleRotation]);

  const rotateToNext = () => {
    const newIndex = (selectedIndex + 1) % length;
    // Calculate rotation to keep the selected item at the top
    const newRotation = -90 - newIndex * cutangle;
    setSelectedIndex(newIndex);
    setCircleRotation(newRotation);

    // Enhanced smooth rotation with spring animation
    if (circleContainerRef.current) {
      gsap.to(circleContainerRef.current, {
        rotation: newRotation,
        duration: 0.7,
        ease: "back.out(1.7)",
      });
    }

    // Rotate ring2 and ring3 with slightly different timing for layered effect
    if (ring2Ref.current) {
      gsap.to(ring2Ref.current, {
        rotation: newRotation,
        duration: 0.8,
        ease: "power3.out",
      });
    }
    if (ring3Ref.current) {
      gsap.to(ring3Ref.current, {
        rotation: newRotation,
        duration: 0.9,
        ease: "power3.out",
      });
    }
  };

  const rotateToPrevious = () => {
    const newIndex = selectedIndex === 0 ? length - 1 : selectedIndex - 1;
    // Calculate rotation to keep the selected item at the top
    const newRotation = -90 - newIndex * cutangle;
    setSelectedIndex(newIndex);
    setCircleRotation(newRotation);

    // Enhanced smooth rotation with spring animation
    if (circleContainerRef.current) {
      gsap.to(circleContainerRef.current, {
        rotation: newRotation,
        duration: 0.7,
        ease: "back.out(1.7)",
      });
    }

    // Rotate ring2 and ring3 with slightly different timing for layered effect
    if (ring2Ref.current) {
      gsap.to(ring2Ref.current, {
        rotation: newRotation,
        duration: 0.8,
        ease: "power3.out",
      });
    }
    if (ring3Ref.current) {
      gsap.to(ring3Ref.current, {
        rotation: newRotation,
        duration: 0.9,
        ease: "power3.out",
      });
    }
  };
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
    // Only handle hover on desktop
    if (isMobile) return;

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
    // On mobile, navigate to the clicked item
    if (isMobile) {
      window.location.href = menuItems[index].link;
    }
  };

  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute z-2 top-[2%] right-[2%] w-full flex px-8 py-4 justify-end">
        <img src="logo.png" width={200} height={200} alt="Logo" />
      </div>

      <div
        id="bg-text"
        className={`absolute text-[#00000044] overflow-hidden whitespace-nowrap w-full ${
          isMobile
            ? "top-[15%] text-[120px]"
            : "top-[22%] sm:top-[12%] md:top-[4%] lg:top-[0%] text-[90px] sm:text-[180px] md:text-[320px] lg:text-[420px]"
        }`}
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
      <div
        className={`absolute z-10 flex items-center justify-center ${
          isMobile
            ? "bottom-0 translate-y-1/2 w-96 h-96 left-1/2 transform -translate-x-1/2 scale-75" // Mobile: positioned at bottom with smaller scale
            : "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96" // Desktop: centered
        }`}
      >
        {/* <div className="absolute">
          <img src="ring5.svg" className="rotate scale-130" alt="Rotating ring" />
        </div> */}
        <div className="absolute">
          <img
            src="ring1.svg"
            className={`rotate ${isMobile ? "scale-230" : "scale-170"}`}
            alt="Rotating ring"
          />
        </div>
        <div ref={ring2Ref} className="absolute">
          <img
            src="ring2.svg"
            className={isMobile ? "scale-170" : "scale-130 "}
            alt="Rotating ring"
          />
        </div>
        <div ref={ring3Ref} className="absolute">
          <img
            src="ring3.svg"
            className={isMobile ? "scale-170 rotate-22" : "scale-130"}
            alt="Rotating ring"
          />
        </div>
        {/* <div className="absolute">
          <img src="ring4.svg" className="rotate scale-130" alt="Rotating ring" />
        </div> */}
      </div>

      {/* Circle with menu items */}
      <div
        className={`absolute z-20 w-96 h-96 flex items-center justify-center ${
          isMobile
            ? "bottom-0 translate-y-1/2" // Mobile: half-circle at bottom
            : "rotate-8" // Desktop: centered with rotation
        }`}
      >
        <div
          ref={circleContainerRef}
          className="relative rounded-full w-full h-full"
          style={{
            transform: isMobile ? `rotate(${circleRotation}deg)` : undefined,
          }}
        >
          {Array.from({ length }, (_, i) => {
            const angle = i * cutangle * (Math.PI / 180);
            const radius = 130;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const rotationAngle = i * cutangle + 90;

            // For mobile, determine if this item is the selected one (at top)
            const isSelected = isMobile && i === selectedIndex;

            return (
              <div
                key={i}
                ref={(el) => (circleItemRefs.current[i] = el)}
                className={`absolute w-20 h-20 flex items-center justify-center cursor-pointer shadow-lg overflow-hidden [clip-path:polygon(0%_0%,_100%_0%,_77%_61%,_23%_61%)] ${
                  isSelected ? "ring-4 ring-white ring-opacity-70" : ""
                }`}
                style={{
                  left: `calc(50% + ${x}px - 40px)`,
                  top: `calc(50% + ${y}px - 40px)`,
                  transform: `rotate(${rotationAngle}deg) ${
                    isSelected ? "scale(1.2)" : ""
                  }`,
                  transition: isMobile ? "transform 0.3s ease" : undefined,
                }}
                onMouseEnter={() => !isMobile && handleCircleItemHover(i, true)}
                onMouseLeave={() =>
                  !isMobile && handleCircleItemHover(i, false)
                }
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

        {/* Center image - show on desktop hover or mobile selection */}
        <div
          className={`absolute z-30 flex items-center justify-center w-56 h-56 bg-black bg-opacity-20 rounded-full backdrop-blur-sm overflow-hidden ${
            isMobile ? "hidden" : ""
          }`}
        >
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

      {/* Mobile swipe indicator */}
      {isMobile && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm opacity-70 flex items-center gap-2">
          <span>←</span>
          <span>Swipe to navigate</span>
          <span>→</span>
        </div>
      )}

      {fadedtext && (
        <div
          ref={bottomTextRef}
          className={`mt-4 ${alumniSans.className} font-[700] absolute ${
            isMobile ? "text-4xl bottom-[25%]" : "text-9xl bottom-[5%]"
          }`}
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
