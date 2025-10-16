"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import Ticket from "./Ticket";
import TicketMobile from "./TicketMobile";
import { Playfair_Display, Inter, Oswald } from "next/font/google";
import { Michroma } from "next/font/google";
import { Arrow } from "./Arrow";

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

      {/* bottom bar  */}
      <div className="w-screen h-[80px] bg-green-200 sm:h-[110px] md:h-[130px] lg:h-[160px] top-20 relative overflow-x-hidden">
        {/* <Image
          src="/arrows2.svg"
          alt="arrow"
          width={10}
          height={10}
          className="rotate-180 absolute left-0 top-[20%] z-0 w-30 h-auto sm:w-42 md:w-48 lg:w-56 xl:w-72 2xl:w-80"
        /> */}

        <div className="flex absolute bg-red-300 gap-3 right-[25%] sm:right-[75%] md:right-[75%] -top-[8%] sm:top-[10%] z-0 w-full h-fit scale-50 sm:scale-80 md:scale-90 sm:w-42 md:w-48 lg:w-56 xl:w-72 2xl:w-80">
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

        <div className="flex absolute bg-red-300 gap-3 left-[25%] sm:left-[75%] md:left-[75%] -top-[8%] sm:top-[10%] z-0 w-full h-fit scale-50 sm:scale-80 md:scale-90 sm:w-42 md:w-48 lg:w-56 xl:w-72 2xl:w-80">
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

        <span
          className={`${mi.className} cursor-pointer absolute top-[35%] sm:top-[32%] lg:top-[33%] xl:top-[38%] 2xl:top-[42%] left-[36%] md:left-[25%] hover:scale-110 transition text-[0.5rem] sm:text-lg md:text-xl lg:text-2xl`}
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
          className={`${mi.className} cursor-pointer absolute top-[35%] sm:top-[32%] lg:top-[33%] xl:top-[38%] 2xl:top-[42%] right-[36%] md:right-[25%] hover:scale-110 transition text-[0.5rem] sm:text-lg md:text-xl lg:text-2xl`}
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
          className={`${osw.className} absolute top-[27%] lg:top-[29%] xl:top-[30%] 2xl:top-[33%] right-[48.5%] sm:right-[49%] lg:right-[48.5%] xl:right-[48.8%] 2xl:right-[48.7%] text-md sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl`}
        >
          {String(ticketData[centerCard].day).padStart(2, "0")}
        </span>

        {/* <Image
          src="/arrows2.svg"
          alt="arrow"
          width={10}
          height={10}
          className="absolute right-0 top-[20%] origin-right w-30 h-auto sm:w-42 md:w-48 lg:w-56 xl:w-72 2xl:w-80"
        /> */}
      </div>
    </section>
  );
}

export default Passes;
