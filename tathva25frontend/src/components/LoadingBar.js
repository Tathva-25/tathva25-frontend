"use client";

import { useState, useLayoutEffect, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

// Background particles with stable, client-only random values
const Particle = () => {
  const sizeRef = useRef(Math.random() * 2 + 1);
  const durationRef = useRef(Math.random() * 5 + 5);
  const delayRef = useRef(Math.random() * -10);
  const xRef = useRef(Math.random() * 100);
  const yRef = useRef(Math.random() * 100);

  return (
    <div
      className="absolute rounded-full bg-amber-400/30"
      style={{
        width: `${sizeRef.current}px`,
        height: `${sizeRef.current}px`,
        left: `${xRef.current}%`,
        top: `${yRef.current}%`,
        animation: `float ${durationRef.current}s ease-in-out ${delayRef.current}s infinite`,
      }}
    />
  );
};

export default function LoadingBar({ onComplete }) {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const containerRef = useRef(null);
  const progressCircleRef = useRef(null);
  const timelineRef = useRef(null);
  const cleanupRef = useRef(null);

  // Ensure particles are rendered only on client to avoid hydration mismatch
  useEffect(() => setMounted(true), []);

  // Start animation before paint and guard for ref availability
  useLayoutEffect(() => {
    setLoading(true);

    let isActive = true;

    const setup = () => {
      if (!isActive) return;
      const container = containerRef.current;
      const path = progressCircleRef.current;
      if (!container || !path) {
        requestAnimationFrame(setup);
        return;
      }

      const context = gsap.context(() => {
        if (timelineRef.current) {
          timelineRef.current.kill();
          timelineRef.current = null;
        }

        const pathLength = path.getTotalLength();

        // Initialize progress stroke hidden and reset dash
        gsap.set(path, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
          opacity: 0,
        });

        const tl = gsap.timeline();
        timelineRef.current = tl;

        tl.fromTo(
          ".ring",
          { scale: 0.5, opacity: 0 },
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
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.8, ease: "power3.out" },
            "-=0.8"
          )
          .fromTo(
            ".loading-char",
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.05, ease: "power2.out" },
            "-=0.5"
          )
          .fromTo(
            ".subtitle",
            { opacity: 0 },
            { opacity: 1, duration: 0.5 },
            "-=0.3"
          )
          .to(path, { opacity: 1, duration: 0.2 }, "-=0.5")
          .to(path, { strokeDashoffset: 0, duration: 2, ease: "power2.inOut" })
          // Reveal content before exit
          .call(() => {
            if (onComplete) onComplete();
          })
          .to({}, { duration: 0.3 })
          // Exit animation
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
              onComplete: () => setLoading(false),
            },
            "-=0.3"
          );
      }, containerRef);

      cleanupRef.current = () => context.revert();
    };

    setup();

    return () => {
      isActive = false;
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, [pathname, onComplete]);

  if (!loading) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-stone-50"
      style={{
        backgroundImage:
          "radial-gradient(circle at center, rgba(217, 119, 6, 0.08), transparent 70%)",
        opacity: 1,
      }}
    >
      <div
        className="absolute inset-0 overflow-hidden"
        suppressHydrationWarning
      >
        {mounted && [...Array(50)].map((_, i) => <Particle key={i} />)}
      </div>

      <div className="chronometer relative flex flex-col items-center gap-6">
        <div className="relative w-48 h-48 flex items-center justify-center">
          <div
            className="ring absolute inset-0 border border-amber-600/20 rounded-full animate-spin-slow"
            style={{ opacity: 0, transform: "scale(0.5)" }}
          />
          <div
            className="ring absolute inset-[20%] border-t border-r border-amber-600/30 rounded-full animate-spin-medium"
            style={{ opacity: 0, transform: "scale(0.5)" }}
          />
          <div
            className="ring absolute inset-[40%] border-b border-l border-amber-600/40 rounded-full animate-spin-fast"
            style={{ opacity: 0, transform: "scale(0.5)" }}
          />

          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="47"
              className="stroke-amber-900/10"
              strokeWidth="1"
              fill="none"
            />
            <circle
              ref={progressCircleRef}
              cx="50"
              cy="50"
              r="47"
              className="stroke-amber-600"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
              style={{ filter: "drop-shadow(0 0 6px #c27803)", opacity: 0 }}
            />
          </svg>

          <div
            className="logo relative"
            style={{ opacity: 0, transform: "scale(0.8)" }}
          >
            <img
              src="/images/TATHVA25_LOGO.png"
              alt="TATHVA 25"
              className="w-24 h-auto filter drop-shadow-lg"
            />
          </div>
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
