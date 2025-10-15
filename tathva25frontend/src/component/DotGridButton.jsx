"use client";

import DotGrid from "@/components/DotGrid";
import React from "react";

export default function DotGridButton({
  text = "Experience It",
  dotColor = "#5227FF",
}) {
  return (
    <div className="relative inline-block min-w-[250px] min-h-[50px]">
      {/* DotGrid background */}
      <div className="absolute inset-0 bg-black -inset-x-10 -inset-y-2">
        <DotGrid
          dotSize={2}
          gap={5}
          baseColor="#524d06"
          activeColor="#c4b702"
          proximity={50}
        />
      </div>

      {/* Button foreground */}
      <button
        className="
          relative 
          px-10 
          py-2
          text-white 
          font-semibold 
          bg-transparent
          z-10 
          pointer-events-auto
        "
      >
        {text}
      </button>
    </div>
  );
}