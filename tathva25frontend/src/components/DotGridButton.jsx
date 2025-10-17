"use client";

import DotGrid from "@/components/DotGrid";
import React from "react";
import { Michroma } from 'next/font/google';

const michroma = Michroma({
    weight: '400',
    subsets: ['latin'],
});

export default function DotGridButton({
                                          text = "Experience It",
                                          dotColor = "#5227FF",
                                          min_width = 250,
                                          min_height = 50,
                                      }) {
    return (
        <div
            className="relative inline-block group rounded-lg"
            style={{ minWidth: `${min_width}px`, minHeight: `${min_height}px` }}
        >
            {/* Outer glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 via-yellow-400/20 to-yellow-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />

            {/* Border frame */}
            <div className="absolute inset-0 border-2 border-yellow-400/30 group-hover:border-yellow-400/60 transition-colors duration-300 rounded-lg">
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-yellow-400 -translate-x-0.5 -translate-y-0.5" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-yellow-400 translate-x-0.5 -translate-y-0.5" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-yellow-400 -translate-x-0.5 translate-y-0.5" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-yellow-400 translate-x-0.5 translate-y-0.5" />
            </div>

            {/* DotGrid background */}
            <div className="absolute inset-0 bg-black overflow-hidden rounded-lg">
                <DotGrid
                    dotSize={2.3}
                    gap={5}
                    baseColor="#524d06"
                    activeColor="#ffee00"
                    proximity={50}
                />

                {/* Gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40" />
            </div>

            {/* Animated scan line effect */}
            <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-scan-line" />
            </div>

            {/* Button foreground */}
            <button
                className={`
          relative 
          w-full
          h-full
          px-10
          py-3
          text-white 
          font-semibold 
          bg-transparent
          ${michroma.className}
          z-10 
          pointer-events-auto
          text-center
          tracking-wider
          uppercase
          text-sm
          transition-all
          duration-300
          group-hover:text-yellow-400
          group-hover:tracking-widest
          group-hover:scale-[1.02]
        `}
            >
                <span className="relative z-10">{text}</span>

                {/* Inner shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
            </button>

            <style jsx>{`
                @keyframes scan-line {
                    0% {
                        transform: translateY(-100%);
                    }
                    100% {
                        transform: translateY(300%);
                    }
                }

                .animate-scan-line {
                    animation: scan-line 2s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}
