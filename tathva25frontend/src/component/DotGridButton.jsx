"use client";

import DotGrid from "@/components/DotGrid";
import React from "react";
// import DotGrid from "reactbits/animated/DotGrid";

export default function DotGridButton({
  text = "Experience It",
  dotColor = "#5227FF",
}) {
  return (
    <div className="relative inline-block">
      {/* DotGrid background */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <DotGrid
          dotSize={20}
          gap={12}
          baseColor='#0c0d0d'
          activeColor="#0c0d0d"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>

      {/* Button foreground */}
      <button
        className="
          relative 
          px-8 
          py-3 
          rounded-full 
          text-white 
          font-semibold 
          bg-transparent 
          border border-white 
          hover:scale-105 
          transition-transform 
          z-10 
          backdrop-blur-md
        "
      >
        {text}
      </button>
    </div>
  );
}
