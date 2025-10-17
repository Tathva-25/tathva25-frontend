"use client";

import { useEffect, useState, useRef } from "react";
import localFont from "next/font/local";
import gsap from "gsap";
import Ticket from "./Ticket";
import TicketMobile from "./TicketMobile";
import { Inter } from "next/font/google";
import { Michroma } from "next/font/google";
import { Arrow } from "./Arrow";

const mi = Michroma({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const fontspring = localFont({
  src: "../../public/fonts/fontspring.otf",
});

const neoform = localFont({
  src: "../../public/fonts/neoform.otf",
});

function Passes() {
  const [isMobile, setIsMobile] = useState(false);
  const [centerCard, setCenterCard] = useState(1);
  const cards = [0, 1, 2];
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", () =>
      setIsMobile(window.innerWidth < 640)
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

  const leftArrowRefs = useRef([]);
  const rightArrowRefs = useRef([]);

  // Add this function to trigger the wave animation
  const triggerArrowWave = (direction) => {
    const refs =
      direction === "left" ? leftArrowRefs.current : rightArrowRefs.current;

    const orderedRefs = direction === "left" ? [...refs].reverse() : refs;

    orderedRefs.forEach((ref, index) => {
      if (ref) {
        setTimeout(() => {
          ref.animate();
        }, index * 150); // 150ms delay between each arrow
      }
    });
  };

  const moveToCenter = (clicked) => {
    if (clicked === centerCard) return;

    let direction;

    if (centerCard === 0 && clicked === 2) {
      // Going from day 1 to day 3 = going backwards (left)
      direction = "left";
    } else if (centerCard === 2 && clicked === 0) {
      // Going from day 3 to day 1 = going forward (right)
      direction = "right";
    } else if (clicked < centerCard) {
      // Normal backward movement
      direction = "left";
    } else {
      // Normal forward movement
      direction = "right";
    }

    triggerArrowWave(direction);

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
      className="w-full min-h-screen flex flex-col items-center justify-center bg-no-repeat bg-cover bg-center overflow-hidden"
      // style={{ backgroundImage: "url('/bg.png')" }}
    >
      {/* <div style={{ backgroundImage: "url('/bg.png')" }}></div> */}
      {/* sidebar */}
      {/* <Image
        src="/sideborder.png"
        alt="sidebar"
        width={30}
        height={100}
        className={`${isMobile ? "hidden" : ""} absolute h-screen left-0 z-10`}
      /> */}

      {/* top left text */}
      <div className="">
        <h1
          className={`${
            fontspring.className
          } text-6xl font-bold z-20 relative ${isMobile ? "mb-96" : "mb-56"}`}
        >
          PASSES
        </h1>
      </div>
      {ticketData.map((ticket, i) => (
        <div
          key={i}
          className={`card card-${i} absolute cursor-pointer`}
          onClick={() => moveToCenter(i)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
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

      {/* bottom bar */}
      <div className="w-screen h-[80px] sm:h-[110px] md:h-[130px] lg:h-[160px] top-20 relative flex items-center justify-between px-4 sm:px-8 md:px-12 lg:px-16">
        {/* LEFT SECTION */}
        <div className="flex items-center ">
          {/* LEFT ARROWS */}
          <div
            onClick={() => {
              const prev = (centerCard + cards.length - 1) % cards.length;
              moveToCenter(prev);
            }}
            onTouchStart={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
            className="flex gap-0 cursor-pointer size-30 sm:size-40 md:size-50 lg:size-60 xl:size-80 2xl:size-90 items-center origin-left"
          >
            <Arrow
              direction={"left"}
              ref={(el) => (leftArrowRefs.current[0] = el)}
            />
            <Arrow
              direction={"left"}
              ref={(el) => (leftArrowRefs.current[1] = el)}
            />
            <Arrow
              direction={"left"}
              ref={(el) => (leftArrowRefs.current[2] = el)}
            />
          </div>

          {/* PREV TEXT */}
          <span
            className={`${mi.className} cursor-pointer hover:scale-110 transition text-[0.55rem] sm:text-base md:text-lg lg:text-xl xl:text-2xl whitespace-nowrap`}
            onClick={() => {
              const prev = (centerCard + cards.length - 1) % cards.length;
              moveToCenter(prev);
            }}
            onTouchStart={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
          >
            PREV
          </span>
        </div>

        {/* CENTER - DAY NUMBER */}
        <span
          className={`${neoform.className} text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl absolute left-1/2 -translate-x-1/2`}
        >
          {String(ticketData[centerCard].day).padStart(2, "0")}
        </span>

        {/* RIGHT SECTION */}
        <div className="flex items-center ">
          {/* NEXT TEXT */}
          <span
            className={`${mi.className} cursor-pointer hover:scale-110 transition text-[0.55rem] sm:text-base md:text-lg lg:text-xl xl:text-2xl whitespace-nowrap`}
            onClick={() => {
              const next = (centerCard + 1) % cards.length;
              moveToCenter(next);
            }}
            onTouchStart={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
          >
            NEXT
          </span>

          {/* RIGHT ARROWS */}
          <div
            onClick={() => {
              const next = (centerCard + 1) % cards.length;
              moveToCenter(next);
            }}
            onTouchStart={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
            className="flex gap-0 cursor-pointer size-30 sm:size-40 md:size-50 lg:size-60 xl:size-80 2xl:size-90 items-center justify-end"
          >
            <Arrow
              direction={"right"}
              ref={(el) => (rightArrowRefs.current[0] = el)}
            />
            <Arrow
              direction={"right"}
              ref={(el) => (rightArrowRefs.current[1] = el)}
            />
            <Arrow
              direction={"right"}
              ref={(el) => (rightArrowRefs.current[2] = el)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Passes;
