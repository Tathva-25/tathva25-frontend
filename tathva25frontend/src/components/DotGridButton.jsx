"use client";

import DotGrid from "@/components/DotGrid";
import React from "react";

import { Michroma } from "next/font/google";
const michroma = Michroma({ subsets: ["latin"], weight: "400" });

export default function DotGridButton({
  text = "Experience It",
  dotColor = "#5227FF",
  min_width = 250,
  height = 70,
  width = 50,
}) {
  return (
    <div
      className="relative inline-block"
      style={{
        minWidth: `${min_width}px`,
        // width: `${width}px`,
      }}
    >
      {/* DotGrid background */}
      <div className="absolute inset-0 -inset-x-10 -inset-y-2 bg-black">
        <DotGrid
          dotSize={2.3}
          gap={5}
          baseColor="#524d06"
          activeColor="#ffee00"
          proximity={50}
        />
      </div>

      {/* Button foreground */}
      <button
        className={`relative px-5 py-2 text-white font-semibold bg-transparent z-10 pointer-events-auto ${michroma.className}`}
      >
        {text}
      </button>
    </div>
  );
}
