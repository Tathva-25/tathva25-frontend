"use client";

import DotGrid from "@/components/DotGrid";
import React from "react";
import { Michroma } from 'next/font/google';
import Link from "next/link";

const michroma = Michroma({
  weight: '400',
  subsets: ['latin'],
});

export default function DotGridButton({
  text = "Experience It",
  dotColor = "#5227FF",
}) {
  return (
    <Link href={"/proshow"} className="relative  flex justify-end items-center min-w-[250px] min-h-[50px]">
      {/* DotGrid background */}
      <div className="absolute inset-0 bg-black -inset-x-10 -inset-y-2">
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
        className={`
          relative 
          ml-12
          pl-10 
          pr-5 
          py-2
          text-white 
          font-semibold 
          bg-transparent
          ${michroma.className}
          z-10 
          pointer-events-auto
        `}
      >
        {text}
      </button>
    </Link>
  );
}