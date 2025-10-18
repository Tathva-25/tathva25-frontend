"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Modal from "./model";
import { Michroma } from "next/font/google";

const mi = Michroma({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export default function ModalWrapper({ id, ticket_id, price }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    setIsLoggedIn(!!token);
  }, []);

  const handleClick = () => {
    if (!isLoggedIn) {
      router.push("/");
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={handleClick}
        className={`${mi.className} bg-[#3E3E3B] cursor-pointer rounded-xs text-[0.5rem] sm:text-[0.4rem] md:text-[0.5rem] lg:text-[0.65rem] w-20 h-6 sm:w-24 sm:h-6 md:w-28 md:h-7 lg:w-32 lg:h-8 text-white transition-transform hover:scale-105 duration-200`}
      >
        {isLoggedIn ? "REGISTER" : "LOGIN TO REGISTER"}
      </button>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        id={id}
        ticket_id={ticket_id}
        price={price}
      />
    </div>
  );
}
