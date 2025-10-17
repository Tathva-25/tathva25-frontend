'use client';
import { Michroma } from "next/font/google";
const michroma = Michroma({ subsets: ["latin"], weight: "400" });

export default function Marquee({ text }) {
  return (
    <div
      className={`${michroma.className} w-full overflow-hidden border-t-2 border-b-2 border-black bg-white`}
    >
      <div className="whitespace-nowrap animate-marquee py-2 flex">
        {/* Repeat text multiple times for seamless scroll */}
        {[...Array(10)].map((_, i) => (
          <span
            key={i}
            className="text-black text-xl mx-6"
          >
            {text}
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          display: inline-flex;
          animation: marquee 15s linear infinite;
          width: max-content;
        }
      `}</style>
    </div>
  );
}
