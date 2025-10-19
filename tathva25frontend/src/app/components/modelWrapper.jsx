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
      const payload = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp < currentTime;
    } catch (error) {
      console.error("Error decoding token:", error);
      return true; // Assume expired if there's an error
    }
  };

  const handleClick = () => {
    // 1. Get the token from localStorage on every click
    const token = localStorage.getItem("jwt");
    console.log(token)

    // 2. Determine if user is logged in AND if the token is expired
    const isLoggedIn = !!token;
    let tokenIsExpired = true; // Assume expired if no token

    if (token) {
      tokenIsExpired = isTokenExpired(token); // Call the function
    }

    // 3. Check the corrected condition
    if (!isLoggedIn || tokenIsExpired) {
      if (typeof window !== "undefined") {
        setTimeout(() => {
          window.location.href =
            "https://accounts.google.com/o/oauth2/auth?client_id=783776933631-jdor6jdgf8qvmmbbj4hrtt9con1no8ue.apps.googleusercontent.com&redirect_uri=https://api.tathva.org/api/auth/callback&response_type=code&scope=openid%20email%20profile&prompt=consent";
        }, 1000);
      }
      return; // Stop execution
    }

    // 4. If the code reaches here, the user is logged in AND the token is valid
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
