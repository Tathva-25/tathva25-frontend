"use client";

import Image from "next/image";

export default function Loading() {
  return (
    <div className="app-loading">
      <div className="app-loading__inner">
        <div className="app-loading__glow" />
        <Image
          src="/images/TATHVA25_LOGO.png"
          alt="Tathva 25"
          width={120}
          height={120}
          priority
          className="app-loading__logo"
        />
      </div>

      <style jsx>{`
        .app-loading {
          position: fixed;
          inset: 0;
          display: grid;
          place-items: center;
          background: radial-gradient(
            120% 120% at 50% 50%,
            #fffaf0 0%,
            #fbf5e6 45%,
            #f6efe2 100%
          );
          z-index: 60;
          animation: fadeIn 120ms ease-out;
        }

        .app-loading__inner {
          position: relative;
          width: 140px;
          height: 140px;
          display: grid;
          place-items: center;
        }

        .app-loading__logo {
          filter: drop-shadow(0 6px 18px rgba(0, 0, 0, 0.12));
          animation: pulse 1.15s ease-in-out infinite;
        }

        .app-loading__glow {
          position: absolute;
          inset: 0;
          border-radius: 20px;
          background: radial-gradient(
            75% 75% at 50% 50%,
            rgba(251, 191, 36, 0.22),
            rgba(251, 191, 36, 0) 70%
          );
          filter: blur(10px);
          animation: glow 1.6s ease-in-out infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.04);
          }
        }

        @keyframes glow {
          0%,
          100% {
            opacity: 0.35;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @media (max-width: 480px) {
          .app-loading__inner {
            width: 110px;
            height: 110px;
          }
        }
      `}</style>
    </div>
  );
}
