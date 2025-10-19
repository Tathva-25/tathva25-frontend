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

            return;
    }
    setIsModalOpen(true);
  };

  return (
    <div>
        <button
          onClick={handleClick}
          className={`
         
            ${michroma.className}
          bg-black rounded-xs text-white p-4 px- text-xs md:text-lg
          `}
        >
          <span className="relative z-10">
            {isLoggedIn ? "Register" : "Login to Register"}
          </span>

          {/* Shiny scan line */}
          <div className="" />
        </button>
      

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        workshopData={workshopData}
      />
    </div>
  );
}
