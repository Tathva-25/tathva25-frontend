"use client";

import { useEffect, useState, useRef } from "react";
import localFont from "next/font/local";
import gsap from "gsap";
import Ticket from "../Ticket";
import TicketMobile from "../TicketMobile";
import { Michroma } from "next/font/google";
import { Arrow } from "../Arrow";

const mi = Michroma({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const fontspring = localFont({
  src: "../../../public/fonts/fontspring.otf",
});

const neoform = localFont({
  src: "../../../public/fonts/neoform.otf",
});

function Page() {
  const [isMobile, setIsMobile] = useState(false);
  const [centerCard, setCenterCard] = useState(1);
  const cards = [0, 1, 2];
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const ticketData = [
    {
      day: 1,
      date: 24,
      price: 799,
      events: ["Wheels", "Robowars", "Conclave"],
    },
    {
      day: 2,
      date: 25,
      price: 799,
      events: ["Proshow","Robowars", "Conclave"],
    },
    {
      day: 3,
      date: 26,
      price: 1399,
      events: ["Proshow","Events", "Conclave"],
    },
  ];

  // initial gsap setup
  useEffect(() => {
    gsap.set([".card-0", ".card-1", ".card-2"], { clearProps: "all" });

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

  const triggerArrowWave = (direction) => {
    const refs =
      direction === "left" ? leftArrowRefs.current : rightArrowRefs.current;

    const orderedRefs = direction === "left" ? [...refs].reverse() : refs;

    orderedRefs.forEach((ref, index) => {
      if (ref) {
        setTimeout(() => {
          ref.animate();
        }, index * 150);
      }
    });
  };

  const moveToCenter = (clicked) => {
    if (clicked === centerCard) return;

    let direction;

    if (centerCard === 0 && clicked === 2) {
      direction = "left";
    } else if (centerCard === 2 && clicked === 0) {
      direction = "right";
    } else if (clicked < centerCard) {
      direction = "left";
    } else {
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
    <section className="w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Heading */}
      <div>
        <h1
          className={`${fontspring.className} text-6xl font-bold z-20 relative ${
            isMobile ? "mb-96" : "mb-56"
          }`}
        >
          PASSES
        </h1>
      </div>

      {/* TICKETS */}
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
              events={ticket.events}
            />
          ) : (
            <Ticket
              day={ticket.day}
              date={ticket.date}
              price={ticket.price}
              events={ticket.events}
            />
          )}
        </div>
      ))}

      {/* Bottom navigation */}
      <div className="w-screen h-[80px] sm:h-[110px] md:h-[130px] lg:h-[160px] top-20 relative flex items-center justify-between px-4 sm:px-8 md:px-12 lg:px-16">
        {/* LEFT */}
        <div className="flex items-center ">
          <div
            onClick={() => {
              const prev = (centerCard + cards.length - 1) % cards.length;
              moveToCenter(prev);
            }}
            className="flex gap-0 cursor-pointer items-center"
          >
            <Arrow
              direction="left"
              ref={(el) => (leftArrowRefs.current[0] = el)}
            />
            <Arrow
              direction="left"
              ref={(el) => (leftArrowRefs.current[1] = el)}
            />
            <Arrow
              direction="left"
              ref={(el) => (leftArrowRefs.current[2] = el)}
            />
          </div>

          {!isMobile && (
            <span
              className={`${mi.className} cursor-pointer hover:scale-110 transition text-base md:text-lg lg:text-xl whitespace-nowrap`}
              onClick={() => {
                const prev = (centerCard + cards.length - 1) % cards.length;
                moveToCenter(prev);
              }}
            >
              PREV
            </span>
          )}
        </div>

        {/* CENTER NUMBER */}
        <span
          className={`${neoform.className} text-xl sm:text-3xl md:text-4xl lg:text-5xl absolute left-1/2 -translate-x-1/2`}
        >
          {String(ticketData[centerCard].day).padStart(2, "0")}
        </span>

        {/* RIGHT */}
        <div className="flex items-center">
          {!isMobile && (
            <span
              className={`${mi.className} cursor-pointer hover:scale-110 transition text-base md:text-lg lg:text-xl whitespace-nowrap`}
              onClick={() => {
                const next = (centerCard + 1) % cards.length;
                moveToCenter(next);
              }}
            >
              NEXT
            </span>
          )}

          <div
            onClick={() => {
              const next = (centerCard + 1) % cards.length;
              moveToCenter(next);
            }}
            className="flex gap-0 cursor-pointer items-center justify-end"
          >
            <Arrow
              direction="right"
              ref={(el) => (rightArrowRefs.current[0] = el)}
            />
            <Arrow
              direction="right"
              ref={(el) => (rightArrowRefs.current[1] = el)}
            />
            <Arrow
              direction="right"
              ref={(el) => (rightArrowRefs.current[2] = el)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page;
