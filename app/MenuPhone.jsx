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
  const [isAnimating, setIsAnimating] = useState(false); // Prevent multiple animations
  const bgTextRefs = useRef([]);
  const bottomTextRef = useRef(null);
  const circleItemRefs = useRef([]);
  const scrollingTextRef = useRef(null);
  const circleContainerRef = useRef(null);
  const ring2Ref = useRef(null);
  const ring3Ref = useRef(null);

  let length = menuItems.length;
  let cutangle = 360 / length;

  // Function to normalize angle to 0-360 range
  const normalizeAngle = (angle) => {
    angle = angle % 360;
    return angle < 0 ? angle + 360 : angle;
  };

  // Function to calculate which item should be selected based on current angle
  const calculateSelectedIndex = (currentRotation) => {
    // Normalize the rotation angle (add 90 to align with top position)
    let normalizedAngle = normalizeAngle(currentRotation + 90);

    // Calculate which segment this angle falls into
    const segmentIndex = normalizedAngle / cutangle;

    // Round to nearest integer and ensure it's within bounds
    let newIndex = Math.round(segmentIndex) % length;
    if (newIndex < 0) newIndex += length;

    // Since items are positioned clockwise but we want counter-clockwise selection
    newIndex = (length - newIndex) % length;

    return newIndex;
  };

  // Function to get the target rotation for a specific index
  const getTargetRotation = (index) => {
    return -90 - index * cutangle;
  };

  // Initialize mobile selection and set initial rotation (only on component mount)
  useEffect(() => {
    setFadedText(menuItems[0].name);
    setHoveredItem(menuItems[0]);

    // Set initial rotation to position first item at top
    const initialRotation = getTargetRotation(0);
    setCircleRotation(initialRotation);

    if (circleContainerRef.current) {
      gsap.set(circleContainerRef.current, {
        rotation: initialRotation,
        transformOrigin: "center center",
        force3D: true,
      });
    }

    // Set initial rotation for ring2 and ring3
    if (ring2Ref.current) {
      gsap.set(ring2Ref.current, {
        rotation: initialRotation,
        transformOrigin: "center center",
        force3D: true,
      });
    }
    if (ring3Ref.current) {
      gsap.set(ring3Ref.current, {
        rotation: initialRotation, // Start in sync with the button ring
        transformOrigin: "center center",
        force3D: true,
      });
    }
  }, []); // Empty dependency array - only run on mount

  // Touch gesture handling for mobile
  useEffect(() => {
    if (!circleContainerRef.current) return;

    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    let startTime = 0;
    let initialRotation = circleRotation;
    let currentRotation = circleRotation;

    const handleTouchStart = (e) => {
      // Always allow touch start to interrupt animations
      startX = e.touches[0].clientX;
      currentX = startX;
      isDragging = true;
      startTime = Date.now();

      // Get the actual current rotation from GSAP instead of stored state
      // This prevents glitches when starting from mid-animation positions
      const actualRotation = circleContainerRef.current
        ? gsap.getProperty(circleContainerRef.current, "rotation")
        : circleRotation;

      initialRotation = actualRotation;
      currentRotation = actualRotation;

      // Update our state to match the actual visual position
      setCircleRotation(actualRotation);

      // Stop any ongoing animations and reset animation state
      setIsAnimating(false);
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

      // Convert horizontal movement to rotation with better sensitivity
      // Use a more responsive calculation based on screen width
      const sensitivity = Math.min(200, window.innerWidth * 0.5);
      const rotationDelta = (deltaX / window.innerWidth) * sensitivity;
      currentRotation = initialRotation + rotationDelta;

      // Apply real-time rotation during drag with smooth updates
      requestAnimationFrame(() => {
        if (circleContainerRef.current) {
          gsap.set(circleContainerRef.current, {
            rotation: currentRotation,
            transformOrigin: "center center",
            force3D: true,
          });
        }
        if (ring2Ref.current) {
          gsap.set(ring2Ref.current, {
            rotation: currentRotation * 0.8, // Slightly different speed for depth
            transformOrigin: "center center",
            force3D: true,
          });
        }
        if (ring3Ref.current) {
          gsap.set(ring3Ref.current, {
            rotation: currentRotation, // Move in sync with the button ring
            transformOrigin: "center center",
            force3D: true,
          });
        }
      });

      // Calculate which item should be selected based on current angle
      const potentialIndex = calculateSelectedIndex(currentRotation);

      // Update visual feedback during drag but don't change selectedIndex until touch end
      // This prevents state conflicts
      if (
        potentialIndex !== selectedIndex &&
        potentialIndex >= 0 &&
        potentialIndex < length
      ) {
        setFadedText(menuItems[potentialIndex].name);
        setHoveredItem(menuItems[potentialIndex]);

        // Trigger scaling animation immediately when potential selection changes
        circleItemRefs.current.forEach((itemRef, index) => {
          if (itemRef) {
            if (index === potentialIndex) {
              // Scale up the potential selected item
              gsap.to(itemRef, {
                scale: 1.3,
                duration: 0.2,
                ease: "power2.out",
                transformOrigin: "center center",
              });
            } else {
              // Scale down other items
              gsap.to(itemRef, {
                scale: 1.0,
                duration: 0.2,
                ease: "power2.out",
                transformOrigin: "center center",
              });
            }
          }
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

      // Use the current rotation from the last touch move
      // This ensures continuity and prevents jumps
      const finalRotation = currentRotation;

      // Determine target index based on final rotation angle
      let targetIndex = calculateSelectedIndex(finalRotation);

      // Ensure targetIndex is valid
      if (targetIndex < 0 || targetIndex >= length) {
        targetIndex = selectedIndex; // Fallback to current selection
      }

      // Add momentum for fast swipes
      if (velocity > 0.5 && Math.abs(deltaX) > 50) {
        const momentumSteps = Math.min(2, Math.floor(velocity));
        if (deltaX > 0) {
          // Swipe right - go to previous items
          targetIndex = (targetIndex - momentumSteps + length) % length;
        } else {
          // Swipe left - go to next items
          targetIndex = (targetIndex + momentumSteps) % length;
        }
      }

      // Animate to the target position from current position
      animateToIndex(targetIndex);
    };
    const element = circleContainerRef.current;
    element.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    element.addEventListener("touchmove", handleTouchMove, { passive: false });
    element.addEventListener("touchend", handleTouchEnd, { passive: false });

    // Add mouse wheel support for desktop testing
    const handleWheel = (e) => {
      if (isAnimating) return;
      e.preventDefault();

      if (e.deltaY > 0) {
        rotateToNext();
      } else {
        rotateToPrevious();
      }
    };

    element.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    element.addEventListener("touchmove", handleTouchMove, { passive: false });
    element.addEventListener("touchend", handleTouchEnd, { passive: false });
    element.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchmove", handleTouchMove);
      element.removeEventListener("touchend", handleTouchEnd);
      element.removeEventListener("wheel", handleWheel);
    };
  }, []); // Remove dependencies to prevent recreating event listeners

  // Add haptic feedback for mobile devices
  const triggerHapticFeedback = () => {
    if ("vibrate" in navigator) {
      navigator.vibrate(10); // Short vibration
    }
  };

  // Safety mechanism to reset animation state if it gets stuck
  useEffect(() => {
    if (isAnimating) {
      const timeout = setTimeout(() => {
        setIsAnimating(false);
      }, 3000); // 3-second timeout

      return () => clearTimeout(timeout);
    }
  }, [isAnimating]);

  // Unified animation function for smooth transitions
  const animateToIndex = (targetIndex) => {
    if (isAnimating) {
      return;
    }

    // Ensure targetIndex is valid
    targetIndex = ((targetIndex % length) + length) % length;

    if (targetIndex === selectedIndex) {
      return;
    }
    setIsAnimating(true);
    const targetRotation = getTargetRotation(targetIndex);

    // Trigger haptic feedback on selection change
    triggerHapticFeedback();

    // Calculate the shortest rotation path from actual current position
    const actualCurrentRotation = circleContainerRef.current
      ? gsap.getProperty(circleContainerRef.current, "rotation")
      : circleRotation;

    let currentRot = actualCurrentRotation;
    let targetRot = targetRotation;

    // Find the shortest path
    let diff = targetRot - currentRot;

    // Normalize the difference to [-180, 180]
    while (diff > 180) diff -= 360;
    while (diff < -180) diff += 360;

    const finalRotation = currentRot + diff; // Update states immediately to prevent conflicts
    setSelectedIndex(targetIndex);
    setCircleRotation(finalRotation);
    setFadedText(menuItems[targetIndex].name);
    setHoveredItem(menuItems[targetIndex]);

    // Apply scaling animation for final selection
    circleItemRefs.current.forEach((itemRef, index) => {
      if (itemRef) {
        if (index === targetIndex) {
          // Scale up the selected item
          gsap.to(itemRef, {
            scale: 1.3,
            duration: 0.3,
            ease: "back.out(1.7)",
            transformOrigin: "center center",
          });
        } else {
          // Scale down non-selected items
          gsap.to(itemRef, {
            scale: 1.0,
            duration: 0.2,
            ease: "power2.out",
            transformOrigin: "center center",
          });
        }
      }
    });

    // Enhanced smooth rotation with spring animation
    if (circleContainerRef.current) {
      gsap.to(circleContainerRef.current, {
        rotation: finalRotation,
        duration: 0.6,
        ease: "power3.out",
        transformOrigin: "center center",
        force3D: true, // Enable hardware acceleration
        onComplete: () => {
          setIsAnimating(false);
          // Animation is complete - no additional state updates needed
        },
      });
    }

    // Rotate ring2 and ring3 with slightly different timing for layered effect
    if (ring2Ref.current) {
      gsap.to(ring2Ref.current, {
        rotation: finalRotation * 0.8,
        duration: 0.7,
        ease: "power3.out",
        transformOrigin: "center center",
        force3D: true,
      });
    }
    if (ring3Ref.current) {
      gsap.to(ring3Ref.current, {
        rotation: finalRotation, // Move in sync with the button ring
        duration: 0.6, // Same duration as the button ring for perfect sync
        ease: "power3.out",
        transformOrigin: "center center",
        force3D: true,
      });
    }
  };

  const rotateToNext = () => {
    const newIndex = (selectedIndex + 1) % length;
    animateToIndex(newIndex);
  };

  const rotateToPrevious = () => {
    const newIndex = selectedIndex === 0 ? length - 1 : selectedIndex - 1;
    animateToIndex(newIndex);
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
                  isSelected
                    ? "ring-4 ring-white ring-opacity-90 shadow-2xl z-10"
                    : "ring-2 ring-white ring-opacity-20"
                }`}
                style={{
                  left: `calc(50% + ${x}px - 40px)`,
                  top: `calc(50% + ${y}px - 40px)`,
                  transform: `rotate(${rotationAngle}deg)`,
                  filter: isSelected
                    ? "brightness(1.2) saturate(1.3)"
                    : "brightness(0.8) saturate(0.9)",
                }}
                onClick={() => handleCircleItemClick(i)}
              >
                <img
                  src={menuItems[i].img1}
                  alt={menuItems[i].name}
                  className="w-full h-full object-cover"
                />
                {isSelected && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile swipe indicator with current selection info */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm opacity-70 flex flex-col items-center gap-1">
        <div className="flex items-center gap-2">
          <span>←</span>
          <span>Swipe to navigate</span>
          <span>→</span>
        </div>
        <div className="text-xs opacity-50">
          {selectedIndex + 1} of {length}
        </div>
      </div>

      {fadedtext && (
        <div
          ref={bottomTextRef}
          className={`mt-4 ${alumniSans.className} font-[700] absolute text-4xl bottom-[50%]`}
          style={{ opacity: 0 }}
        >
          {fadedtext}
        </div>
      )}
    </>
  );
}
