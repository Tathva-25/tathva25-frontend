"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import Ticket from "./Ticket";
import TicketMobile from "./TicketMobile";
import { Playfair_Display, Inter, Oswald } from "next/font/google";
import { Michroma } from "next/font/google";

const osw = Oswald({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const mi = Michroma({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "900"],
  display: "swap",
});

function Passes() {
  const [isMobile, setIsMobile] = useState(false);
  const [centerCard, setCenterCard] = useState(1);
  const cards = [0, 1, 2];
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const rulerRef = useRef(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 700);
    window.addEventListener("resize", () =>
      setIsMobile(window.innerWidth < 700)
    );
    return () => window.removeEventListener("resize");
  }, []);

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
    gsap.set([".card-0", ".card-1", ".card-2"], {
      clearProps: "all",
    });

    gsap.set(".card-0", {
      x: `${isMobile ? "-170%" : "-35%"}`,
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
      x: `${isMobile ? "170%" : "35%"}`,
      scale: 0.8,
      opacity: 0.6,
      zIndex: 5,
    });

    setCenterCard(1);
  }, [isMobile]);

  const moveToCenter = (clicked) => {
    if (clicked === centerCard) return;

    const positions = [
      {
        x: `${isMobile ? "-170%" : "-35%"}`,
        scale: 0.8,
        opacity: 0.6,
        zIndex: 5,
      },
      { x: "0%", scale: 1, opacity: 1, zIndex: 10 },
      {
        x: `${isMobile ? "170%" : "35%"}`,
        scale: 0.8,
        opacity: 0.6,
        zIndex: 5,
      },
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
      className="w-full min-h-screen flex flex-col items-center justify-center bg-no-repeat bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      {/* sidebar */}
      <Image
        src="/sideborder.png"
        alt="sidebar"
        width={30}
        height={100}
        className={`${isMobile ? "hidden" : ""} absolute h-screen left-0 z-10`}
      />

      {/* top left text */}
      <div className="">
        <h1
          className={`${inter.className} text-6xl font-bold z-20 relative ${
            isMobile ? "mb-96" : "mb-56"
          }`}
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
          {isMobile ? (
            <TicketMobile
              day={ticket.day}
              date={ticket.date}
              price={ticket.price}
            />
          ) : (
            <Ticket day={ticket.day} date={ticket.date} price={ticket.price} />
          )}
        </div>
      ))}

      {/* arrows  */}
      <div className="w-screen h-[80px] sm:h-[110px] md:h-[130px] lg:h-[160px] top-20 relative overflow-x-hidden">
        <Image
          src="/arrows2.svg"
          alt="arrow"
          width={10}
          height={10}
          className="rotate-180 absolute left-0 top-[20%] z-0 w-30 h-auto sm:w-42 md:w-48 lg:w-56 xl:w-72 2xl:w-80"
        />

        <span
          className={`${mi.className} cursor-pointer absolute top-[35%] sm:top-[32%] lg:top-[33%] xl:top-[38%] 2xl:top-[42%] left-[32%] md:left-[25%] hover:scale-110 transition text-[0.5rem] sm:text-lg md:text-xl lg:text-2xl`}
          onClick={() => {
            const prev = (centerCard + cards.length - 1) % cards.length;
            moveToCenter(prev);
          }}
          onTouchEnd={(e) => e.stopPropagation()}
        >
          PREV
        </span>

        {/* <Image
          src="/bordersvg.svg"
          alt="arrow"
          width={10}
          height={10}
          className="rotate-180 absolute lg:w-6 left-[45%] bottom-[32%] lg:bottom-[16%]"
        />
        <Image
          src="/bordersvg.svg"
          alt="arrow"
          width={10}
          height={10}
          className="rotate-90 absolute lg:w-6 right-[46.5%] bottom-[32%] lg:bottom-[16%]"
        /> */}

        <span
          className={`${mi.className} cursor-pointer absolute top-[35%] sm:top-[32%] lg:top-[33%] xl:top-[38%] 2xl:top-[42%] right-[32%] md:right-[25%] hover:scale-110 transition text-[0.5rem] sm:text-lg md:text-xl lg:text-2xl`}
          onClick={() => {
            const next = (centerCard + 1) % cards.length;
            moveToCenter(next);
          }}
          onTouchEnd={(e) => e.stopPropagation()}
        >
          NEXT
        </span>

        {/* <Image
          src="/bordersvg.svg"
          alt="arrow"
          width={10}
          height={10}
          className="rotate-270 absolute  lg:w-6 left-[45%] top-[25%]"
        />
        <Image
          src="/bordersvg.svg"
          alt="arrow"
          width={10}
          height={10}
          className="rotate-0 absolute  lg:w-6 right-[46.5%] top-[25%]"
        /> */}

        <span
          className={`${osw.className} absolute top-[27%] lg:top-[29%] xl:top-[30%] 2xl:top-[33%] right-[49%] sm:right-[49%] lg:right-[48.5%] xl:right-[48.8%] 2xl:right-[48.7%] text-md sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl`}
        >
          {String(ticketData[centerCard].day).padStart(2, "0")}
        </span>

        <Image
          src="/arrows2.svg"
          alt="arrow"
          width={10}
          height={10}
          className="absolute right-0 top-[20%] origin-right w-30 h-auto sm:w-42 md:w-48 lg:w-56 xl:w-72 2xl:w-80"
        />
      </div>
    </section>
  );
}

export default Passes;
