"use client";

import Image from "next/image";
import React from "react";

export default function Loading() {
  return (
    <div className="loading-competitions">
      <div className="loading-inner">
        <div className="logo-wrap">
          <Image
            src="/images/TATHVA25_LOGO.png"
            alt="Tathva 25"
            width={120}
            height={120}
            priority
            className="logo"
          />
        </div>

        <div className="bar">
          <div className="prog" />
        </div>

        <div className="caption">Loading…</div>
      </div>

      <style jsx>{`
        .loading-competitions {
          position: fixed;
          inset: 0;
          display: grid;
          place-items: center;
          background: radial-gradient(120% 120% at 50% 50%, #fff7e6 0%, #fbf5e6 40%, #f7f2e7 100%);
          z-index: 50;
          animation: fadeIn 150ms ease-out;
        }

        .loading-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
        }

        .logo-wrap {
          width: 120px;
          height: 120px;
          display: grid;
          place-items: center;
          border-radius: 16px;
          background: radial-gradient(80% 80% at 50% 50%, rgba(250, 204, 21, 0.12), rgba(0, 0, 0, 0));
          box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);
          aspect-ratio: 1/1;
        }

        .logo {
          height: auto;
          width: 84px;
          filter: drop-shadow(0 4px 10px rgba(0,0,0,0.12));
          animation: pulse 1.2s ease-in-out infinite;
        }

        .bar {
          width: 240px;
          height: 3px;
          border-radius: 999px;
          overflow: hidden;
          background: rgba(0,0,0,0.08);
        }

        .prog {
          width: 40%;
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, rgba(250, 204, 21, 0.2), #fbbf24, rgba(250, 204, 21, 0.2));
          animation: shimmer 0.8s linear infinite;
        }

        .caption {
          font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
          font-size: 0.85rem;
          color: #6b7280;
          letter-spacing: 0.02em;
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-60%);
          }
          100% {
            transform: translateX(160%);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.04);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0 }
          to { opacity: 1 }
        }

        @media (max-width: 480px) {
          .logo-wrap { width: 96px; height: 96px; }
          .logo { width: 70px; }
          .bar { width: 200px; }
        }
      `}</style>
    </div>
  );
}
