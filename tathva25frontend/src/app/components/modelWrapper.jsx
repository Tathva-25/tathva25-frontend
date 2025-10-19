"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Modal from "./model";
import DotGrid from "@/components/DotGrid";
import { Michroma } from "next/font/google";

const michroma = Michroma({
  weight: "400",
  subsets: ["latin"],
});

export default function ModalWrapper({ workshopData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    setIsLoggedIn(!!token);
  }, []);

  const isTokenExpired = (token) => {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);
        return payload.exp < currentTime;
    } catch (error) {
        console.error("Error decoding token:", error);
        return true; // Assume expired if there's an error
    }
};

  const handleClick = () => {
    if (!isLoggedIn || isTokenExpired) {

                if (typeof window !== "undefined") {
                setTimeout(() => {
                    window.location.href =  "https://accounts.google.com/o/oauth2/auth?client_id=783776933631-jdor6jdgf8qvmmbbj4hrtt9con1no8ue.apps.googleusercontent.com&redirect_uri=https://api.tathva.org/api/auth/callback&response_type=code&scope=openid%20email%20profile&prompt=consent";
                }, 1000);
            }
    }
    setIsModalOpen(true);
  };

  return (
    <div className="flex">
      {/* Fancy glowing DotGrid button */}
      <div
        className="relative inline-block group"
        style={{ minWidth: "220px", minHeight: "50px" }}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 via-yellow-400/20 to-yellow-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* DotGrid background */}
        <div className="absolute inset-0 bg-black overflow-hidden">
          <DotGrid
            dotSize={2.3}
            gap={5}
            baseColor="#524d06"
            activeColor="#ffee00"
            proximity={50}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40" />
        </div>

        {/* Button Foreground */}
        <button
          onClick={handleClick}
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
          `}
        >
          <span className="relative z-10">
            {isLoggedIn ? "Register" : "Login to Register"}
          </span>

          {/* Shiny scan line */}
          <div className="" />
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

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        workshopData={workshopData}
      />
    </div>
  );
}
