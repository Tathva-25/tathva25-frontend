"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import Ticket from "./Ticket";
import { Playfair_Display } from "next/font/google";
import { Anek_Malayalam } from "next/font/google";
import { Oswald } from "next/font/google";

const pd = Playfair_Display({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const anek = Anek_Malayalam({
  subsets: ["latin"],
  weight: ["400", "600", "200"],
  display: "swap",
});

const osw = Oswald({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

function Passes() {
  const [centerCard, setCenterCard] = useState(1);
  const cards = [0, 1, 2];
  const containerRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const rulerRef = useRef(null);

  const ticketData = [
    {
      day: 1,
      date: 24,
      price: 199,
    },
    {
      day: 2,
      date: 25,
      price: 249,
    },
    {
      day: 3,
      date: 26,
      price: 149,
    },
  ];

  useEffect(() => {
    gsap.set(".card-0", {
      x: "-120px",
      scale: 0.8,
      opacity: 0.6,
      zIndex: 5,
    });

    gsap.set(".card-1", {
      scale: 1,
      opacity: 1,
      zIndex: 10,
    });

    gsap.set(".card-2", {
      x: "120px",
      scale: 0.8,
      opacity: 0.6,
      zIndex: 5,
    });
  }, []);

  const moveToCenter = (clicked) => {
    if (clicked === centerCard) return;

    const positions = [
      { x: "-25%", scale: 0.8, opacity: 0.6, zIndex: 5 },
      { x: "0%", scale: 1, opacity: 1, zIndex: 10 },
      { x: "25%", scale: 0.8, opacity: 0.6, zIndex: 5 },
    ];

    let order = [...cards];
    while (order[1] !== clicked) {
      //as long as the card in the center is not the clicked card, keep carousing
      order.push(order.shift());
    }

    order.forEach((cardIndex, i) => {
      gsap.to(`.card-${cardIndex}`, {
        x: positions[i].x,
        scale: positions[i].scale,
        opacity: positions[i].opacity,
        zIndex: positions[i].zIndex,
        duration: 0.6,
        ease: "power2.inOut",
      });
    });

    const rulerShift = -clicked * -600;
    gsap.to(rulerRef.current, {
      x: rulerShift,
      duration: 0.6,
      ease: "power2.inOut",
    });

    setCenterCard(clicked);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const deltaX = touchEndX.current - touchStartX.current;
    if (Math.abs(deltaX) < 30) return;

    if (deltaX > 0) {
      const prev = (centerCard + cards.length - 1) % cards.length;
      moveToCenter(prev);
    } else {
      const next = (centerCard + 1) % cards.length;
      moveToCenter(next);
    }
  };

  return (
    <section
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="w-screen h-screen flex flex-col items-center justify-center bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      {/* top left text */}
      <div className="">
        <h1
          className={`${pd.className} text-4xl border-b-2 border-dashed z-20 relative mb-70`}
        >
          PASSES
        </h1>
      </div>
      {ticketData.map((ticket, i) => (
        <div
          key={i}
          className={`card card-${i} absolute cursor-pointer`}
          onClick={() => moveToCenter(i)}
        >
          <Ticket day={ticket.day} date={ticket.date} price={ticket.price} />
        </div>
      ))}
      {/* ruler
      <div className="relative w-[600px] mx-auto mt-64 overflow-hidden">
        <div ref={rulerRef} className="ruler-strip flex flex-nowrap">
          {[1, 2, 3].map((num) => (
            <div key={num} className="relative flex-shrink-0 w-[1000px]">
              <Image
                className="w-full object-contain"
                width={1000}
                height={500}
                src="/ruler.png"
                alt="ruler"
              />
              <span className={`${pd.className} absolute left-[4%] top-[35%]`}>
                DAY 1
              </span>
              <span className={`${pd.className} absolute left-[27%] top-[35%]`}>
                DAY 2
              </span>
              <span className={`${pd.className} absolute left-[50%] top-[35%]`}>
                DAY 3
              </span>
            </div>
          ))}
        </div>
      </div> */}
    </section>
  );
}

export default Passes;
