"use client";

import React, { useState, useEffect } from "react";

export default function Loading() {
  const [showLoading, setShowLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Ensure the loading screen shows for at least 5 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 4500);

    const hideTimer = setTimeout(() => {
      setShowLoading(false);
    }, 5000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  // Always render the loading screen regardless of Next.js loading state
  if (!showLoading) {
    return null;
  }
  return (
    <div className={`loading-container ${fadeOut ? "fade-out" : ""}`}>
      {/* Background with subtle animation */}
      <div className="loading-background">
        <div className="bg-animation"></div>
      </div>

      {/* Main loading content */}
      <div className="loading-content">
        {/* Logo with pulse animation */}
        <div className="logo-container">
          <img
            src="/images/TATHVA25_LOGO.png"
            alt="TATHVA 25"
            className="logo"
            draggable={false}
          />
          <div className="logo-glow"></div>
        </div>

        {/* Loading text with typewriter effect */}
        <div className="loading-text">
          <h1 className="main-text">TATHVA</h1>
          <h2 className="sub-text">25</h2>
          <p className="tagline">Loading Experience...</p>
        </div>

        {/* Animated loading bar */}
        <div className="loading-bar-container">
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
          <div className="loading-dots">
            <span className="dot dot-1"></span>
            <span className="dot dot-2"></span>
            <span className="dot dot-3"></span>
          </div>
        </div>

        {/* Animated particles */}
        <div className="particles">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>
          <div className="particle particle-5"></div>
        </div>
      </div>

      <style jsx>{`
        .loading-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          overflow: hidden;
          z-index: 9999;
          opacity: 1;
          transition: opacity 0.5s ease-out;
        }

        .loading-container.fade-out {
          opacity: 0;
        }

        .loading-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.1;
        }

        .bg-animation {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            45deg,
            transparent 30%,
            rgba(255, 255, 255, 0.1) 50%,
            transparent 70%
          );
          animation: backgroundSweep 3s linear infinite;
        }

        .loading-content {
          text-align: center;
          position: relative;
          z-index: 2;
        }

        .logo-container {
          position: relative;
          margin-bottom: 2rem;
          display: inline-block;
        }

        .logo {
          height: 120px;
          width: auto;
          animation: logoPulse 2s ease-in-out infinite;
          filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.2));
        }

        .logo-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 150px;
          height: 150px;
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.3) 0%,
            transparent 70%
          );
          border-radius: 50%;
          animation: glowPulse 2s ease-in-out infinite;
        }

        .loading-text {
          margin-bottom: 3rem;
        }

        .main-text {
          font-family: "Zen Dots", sans-serif;
          font-size: 4rem;
          font-weight: 700;
          color: #2d3748;
          margin: 0;
          letter-spacing: 0.2em;
          animation: textSlideIn 1s ease-out;
        }

        .sub-text {
          font-family: "Zen Dots", sans-serif;
          font-size: 2.5rem;
          font-weight: 400;
          color: #4a5568;
          margin: 0;
          letter-spacing: 0.1em;
          animation: textSlideIn 1s ease-out 0.2s both;
        }

        .tagline {
          font-family: "Open Sans", sans-serif;
          font-size: 1.2rem;
          color: #718096;
          margin-top: 1rem;
          animation: textFadeIn 1s ease-out 0.4s both;
        }

        .loading-bar-container {
          margin-bottom: 2rem;
        }

        .loading-bar {
          width: 300px;
          height: 4px;
          background-color: rgba(45, 55, 72, 0.1);
          border-radius: 2px;
          margin: 0 auto 1rem auto;
          overflow: hidden;
        }

        .loading-progress {
          height: 100%;
          background: linear-gradient(
            90deg,
            #667eea 0%,
            #764ba2 50%,
            #667eea 100%
          );
          border-radius: 2px;
          animation: progressBar 2s ease-in-out infinite;
        }

        .loading-dots {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
        }

        .dot {
          width: 8px;
          height: 8px;
          background-color: #4a5568;
          border-radius: 50%;
          animation: dotPulse 1.5s ease-in-out infinite;
        }

        .dot-2 {
          animation-delay: 0.2s;
        }

        .dot-3 {
          animation-delay: 0.4s;
        }

        .particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          background-color: rgba(102, 126, 234, 0.3);
          border-radius: 50%;
          animation: particleFloat 4s ease-in-out infinite;
        }

        .particle-1 {
          width: 6px;
          height: 6px;
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }

        .particle-2 {
          width: 8px;
          height: 8px;
          top: 60%;
          left: 80%;
          animation-delay: 1s;
        }

        .particle-3 {
          width: 4px;
          height: 4px;
          top: 80%;
          left: 20%;
          animation-delay: 2s;
        }

        .particle-4 {
          width: 10px;
          height: 10px;
          top: 30%;
          left: 90%;
          animation-delay: 0.5s;
        }

        .particle-5 {
          width: 5px;
          height: 5px;
          top: 70%;
          left: 5%;
          animation-delay: 1.5s;
        }

        /* Animations */
        @keyframes logoPulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes glowPulse {
          0%,
          100% {
            opacity: 0.3;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.6;
            transform: translate(-50%, -50%) scale(1.1);
          }
        }

        @keyframes textSlideIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes textFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes progressBar {
          0% {
            width: 0%;
            transform: translateX(-100px);
          }
          50% {
            width: 100%;
            transform: translateX(0);
          }
          100% {
            width: 100%;
            transform: translateX(100px);
          }
        }

        @keyframes dotPulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
          }
        }

        @keyframes particleFloat {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 0.8;
          }
        }

        @keyframes backgroundSweep {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .logo {
            height: 80px;
          }

          .main-text {
            font-size: 2.5rem;
          }

          .sub-text {
            font-size: 1.8rem;
          }

          .tagline {
            font-size: 1rem;
          }

          .loading-bar {
            width: 250px;
          }
        }

        @media (max-width: 480px) {
          .logo {
            height: 60px;
          }

          .main-text {
            font-size: 2rem;
          }

          .sub-text {
            font-size: 1.4rem;
          }

          .loading-bar {
            width: 200px;
          }
        }
      `}</style>
    </div>
  );
}
