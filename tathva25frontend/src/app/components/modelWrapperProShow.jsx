"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Modal from "./modelProshow";
import { Michroma } from "next/font/google";

const mi = Michroma({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export default function ModalWrapper({ eventId, ticketId, price }) {
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

    // 2. Determine if user is logged in AND if the token is expired
    const isLoggedIn = !!token;
    let tokenIsExpired = true; // Assume expired if no token

    if (token) {
      tokenIsExpired = isTokenExpired(token); // Call the function
    }

    // 3. Check the corrected condition
    if (!isLoggedIn || tokenIsExpired) {
      if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
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
    <div className="flex items-center justify-center">
      <button
        onClick={handleClick}
        className={`${mi.className} bg-[#3E3E3B] cursor-pointer rounded-xs text-[0.5rem] sm:text-[0.4rem] md:text-[0.5rem] lg:text-[0.65rem] hover:bg-black w-12 h-3 sm:w-16 sm:h-4 md:w-18 md:h-4 lg:w-23 lg:h-5 text-white`}
      >
        {isLoggedIn ? "BOOK" : "LOGIN "}
      </button>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        eventId={eventId}
        ticketId={ticketId}
        price={price}
      />
    </div>
  );
}
