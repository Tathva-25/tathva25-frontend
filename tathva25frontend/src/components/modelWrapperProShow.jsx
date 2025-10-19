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
    <div className="flex items-center justify-center">
      <button
        onClick={handleClick}
        className={`${mi.className} bg-[#3E3E3B] cursor-pointer rounded-xs text-[0.5rem] sm:text-[0.4rem] md:text-[0.5rem] lg:text-[0.65rem] hover:bg-black w-12 h-3 sm:w-16 sm:h-4 md:w-18 md:h-4 lg:w-23 lg:h-5 text-white`}
      >
        {isLoggedIn ? "BOOK" : "LOGIN"}
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
