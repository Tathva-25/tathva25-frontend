"use client";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Alumni_Sans } from "next/font/google";

const alumniSans = Alumni_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-alumni-sans",
});

export default function MenuPhone({ menuItems }) {
  const [fadedtext, setFadedText] = useState("");
  const [hoveredItem, setHoveredItem] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0); // For mobile selection
  const [circleRotation, setCircleRotation] = useState(0); // Current rotation angle
  const bgTextRefs = useRef([]);
  const bottomTextRef = useRef(null);
  const circleItemRefs = useRef([]);
  const scrollingTextRef = useRef(null);
  const circleContainerRef = useRef(null);
  const ring2Ref = useRef(null);
  const ring3Ref = useRef(null);

  let length = menuItems.length;
  let cutangle = 360 / length;

  // Initialize mobile selection and set initial rotation
  useEffect(() => {
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
  }, [selectedIndex]);

  // Touch gesture handling for mobile
  useEffect(() => {
    if (!circleContainerRef.current) return;

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
  }, [selectedIndex, circleRotation]);

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
        "#bg-text-mobile",
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

  const handleCircleItemClick = (index) => {
    console.log(menuItems[index].name);
    // Navigate to the clicked item
    window.location.href = menuItems[index].link;
  };

  return (
    <>
      <div
        id="bg-text-mobile"
        className="absolute text-[#00000044] overflow-hidden whitespace-nowrap w-full top-[15%] text-[120px]"
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
      <div className="absolute z-10 flex items-center justify-center bottom-0 translate-y-1/2 w-96 h-96 left-1/2 transform -translate-x-1/2 scale-75">
        <div className="absolute">
          <img
            src="ring1.svg"
            className="rotate scale-230"
            alt="Rotating ring"
          />
        </div>
        <div ref={ring2Ref} className="absolute">
          <img src="ring2.svg" className="scale-170" alt="Rotating ring" />
        </div>
        <div ref={ring3Ref} className="absolute">
          <img
            src="ring3.svg"
            className="scale-170 rotate-22"
            alt="Rotating ring"
          />
        </div>
      </div>

      {/* Circle with menu items */}
      <div className="absolute z-20 w-96 h-96 flex items-center justify-center bottom-0 translate-y-1/2">
        <div
          ref={circleContainerRef}
          className="relative rounded-full w-full h-full"
          style={{
            transform: `rotate(${circleRotation}deg)`,
          }}
        >
          {Array.from({ length }, (_, i) => {
            const angle = i * cutangle * (Math.PI / 180);
            const radius = 130;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const rotationAngle = i * cutangle + 90;

            // Determine if this item is the selected one (at top)
            const isSelected = i === selectedIndex;

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
                  transition: "transform 0.3s ease",
                }}
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
      </div>

      {/* Mobile swipe indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm opacity-70 flex items-center gap-2">
        <span>←</span>
        <span>Swipe to navigate</span>
        <span>→</span>
      </div>

      {fadedtext && (
        <div
          ref={bottomTextRef}
          className={`mt-4 ${alumniSans.className} font-[700] absolute text-4xl bottom-[25%]`}
          style={{ opacity: 0 }}
        >
          {fadedtext}
        </div>
      )}
    </>
  );
}
