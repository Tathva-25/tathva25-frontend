"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import gsap from "gsap";

// A small component for the background star particles
const Particle = ({ i }) => {
  const size = Math.random() * 2 + 1;
  const duration = Math.random() * 5 + 5;
  const delay = Math.random() * -10;
  const x = Math.random() * 100;
  const y = Math.random() * 100;

  return (
    <div
      // Changed for light theme: Darker, more subtle particles
      className="absolute rounded-full bg-amber-400/30"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${x}%`,
        top: `${y}%`,
        animation: `float ${duration}s ease-in-out ${delay}s infinite`,
      }}
    />
  );
};

// Add `onComplete` to the props
export default function LoadingBar({ onComplete }) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const containerRef = useRef(null);
  const progressCircleRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    setLoading(true);

    const context = gsap.context(() => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      const path = progressCircleRef.current;
      const pathLength = path.getTotalLength();

      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
        opacity: 0,
      });

      const tl = gsap.timeline({
        onComplete: () => {
          // Call the onComplete prop when the timeline is done
          if (onComplete) {
            onComplete();
          }
          // The setLoading(false) can be removed from here
          // to let the exit animation finish smoothly.
        },
      });

      timelineRef.current = tl;

      tl.to(containerRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.inOut",
      })
        .fromTo(
          ".ring",
          {
            scale: 0.5,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.3"
        )
        .fromTo(
          ".logo",
          {
            scale: 0.8,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.8"
        )
        .fromTo(
          ".loading-char",
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.05,
            ease: "power2.out",
          },
          "-=0.5"
        )
        .fromTo(
          ".subtitle",
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.5,
          },
          "-=0.3"
        )
        .to(
          path,
          {
            opacity: 1,
            duration: 0.2,
          },
          "-=0.5"
        )
        .to(path, {
          strokeDashoffset: 0,
          duration: 2,
          ease: "power2.inOut",
        })
        // --- EXIT ANIMATION ---
        .to(".chronometer", {
          scale: 0.9,
          opacity: 0,
          duration: 0.6,
          ease: "power3.in",
        })
        .to(
          containerRef.current,
          {
            opacity: 0,
            duration: 0.5,
            ease: "power2.inOut",
            // Unmount the component after the fade-out is complete
            onComplete: () => {
              setLoading(false);
            },
          },
          "-=0.3"
        );
    }, containerRef);

    return () => context.revert();
    // Add onComplete to the dependency array
  }, [pathname, searchParams, onComplete]);

  if (!loading) return null;

  return (
    <div
      ref={containerRef}
      // Changed for light theme: New background color with immediate visibility
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-stone-50 opacity-0"
      style={{
        // Changed for light theme: A soft golden radial gradient
        backgroundImage:
          "radial-gradient(circle at center, rgba(217, 119, 6, 0.08), transparent 70%)",
      }}
    >
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <Particle key={i} />
        ))}
      </div>

      <div className="chronometer relative flex flex-col items-center gap-6">
        <div className="relative w-48 h-48 flex items-center justify-center">
          {/* Changed for light theme: Darker, more visible rings */}
          <div className="ring absolute inset-0 border border-amber-600/20 rounded-full animate-spin-slow" />
          <div className="ring absolute inset-[20%] border-t border-r border-amber-600/30 rounded-full animate-spin-medium" />
          <div className="ring absolute inset-[40%] border-b border-l border-amber-600/40 rounded-full animate-spin-fast" />

          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="47"
              // Changed for light theme: Faint track for the progress bar
              className="stroke-amber-900/10"
              strokeWidth="1"
              fill="none"
            />
            <circle
              ref={progressCircleRef}
              cx="50"
              cy="50"
              r="47"
              // Changed for light theme: Richer gold color for progress
              className="stroke-amber-600"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
              // Changed for light theme: Updated drop shadow color
              style={{ filter: "drop-shadow(0 0 6px #c27803)" }}
            />
          </svg>

          <div className="logo relative">
            <img
              src="/images/TATHVA25_LOGO.png"
              alt="TATHVA 25"
              className="w-24 h-auto filter drop-shadow-lg"
            />
          </div>
        </div>

        <div className="text-center">
          {/* Changed for light theme: Darker text for readability */}
          <h3 className="text-amber-900 text-lg font-light tracking-[0.3em] uppercase">
            {"LOADING".split("").map((char, i) => (
              <span key={i} className="loading-char inline-block">
                {char}
              </span>
            ))}
          </h3>
          {/* Changed for light theme: Darker text for readability */}
          <p className="subtitle text-amber-700 text-xs font-light tracking-widest mt-1">
            CHRONOGENESIS
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.7;
          }
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes spin-medium {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes spin-fast {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .animate-spin-medium {
          animation: spin-medium 6s linear infinite reverse;
        }
        .animate-spin-fast {
          animation: spin-fast 4s linear infinite;
        }
      `}</style>
    </div>
  );
}
