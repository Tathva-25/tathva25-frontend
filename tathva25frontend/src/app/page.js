"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

// Dynamically import Card with SSR disabled
// Dynamically import Card with SSR disabled
const Card = dynamic(() => import("./components/Card"), { ssr: false });

export default function Page() {
  const [scale, setScale] = useState(1);

  // Separate variables for row and column gaps
  const desktopColumnGap = 5; // vw
  const desktopRowGap = 3; // vw

  const tabletColumnGap = 8; // vw
  const tabletRowGap = 0; // vw

  const mobileGapPx = 20; // fixed pixel gap for mobile

  useEffect(() => {
    function calcScale() {
      const width = window.innerWidth;
      let cardVW = 25; // desktop default
      if (width <= 500) cardVW = 85; // mobile breakpoint
      else if (width <= 1024) cardVW = 35; // tablet

      const cardWidthPx = (width * cardVW) / 100;
      const scaleFactor = cardWidthPx / 411;
      setScale(scaleFactor);
    }

    calcScale();
    window.addEventListener("resize", calcScale);
    return () => window.removeEventListener("resize", calcScale);
  }, []);

  return (
    <>
      <div className="container">
        <div
          className="card-wrapper"
          style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}
        >
          <Card
            number="01"
            imageUrl="/images/card_01.png"
            heading="ROBOWARS 8KG"
            description="Engage in fierce 8kg battle bot combats—design for destruction! Scan QR to register!"
            barcodeValue="0029202"
          />
        </div>
        <div
          className="card-wrapper"
          style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}
        >
          <Card
            number="02"
            imageUrl="/images/card_01.png"
            heading="BOT STACLE RACE"
            description="Navigate obstacles with speedy bot—test stability and speed! Prize pool ₹30,000. Fee ₹300. Scan QR to register!"
            barcodeValue="0029202"
          />
        </div>
        <div
          className="card-wrapper"
          style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}
        >
          <Card
            number="02"
            imageUrl="/images/card_01.png"
            heading="BOT STACLE RACE"
            description="Navigate obstacles with speedy bot—test stability and speed! Prize pool ₹30,000. Fee ₹300. Scan QR to register!"
            barcodeValue="0029202"
          />
        </div><div
          className="card-wrapper"
          style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}
        >
          <Card
            number="02"
            imageUrl="/images/card_01.png"
            heading="BOT STACLE RACE"
            description="Navigate obstacles with speedy bot—test stability and speed! Prize pool ₹30,000. Fee ₹300. Scan QR to register!"
            barcodeValue="0029202"
          />
        </div><div
          className="card-wrapper"
          style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}
        >
          <Card
            number="02"
            imageUrl="/images/card_01.png"
            heading="BOT STACLE RACE"
            description="Navigate obstacles with speedy bot—test stability and speed! Prize pool ₹30,000. Fee ₹300. Scan QR to register!"
            barcodeValue="0029202"
          />
        </div><div
          className="card-wrapper"
          style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}
        >
          <Card
            number="02"
            imageUrl="/images/card_01.png"
            heading="BOT STACLE RACE"
            description="Navigate obstacles with speedy bot—test stability and speed! Prize pool ₹30,000. Fee ₹300. Scan QR to register!"
            barcodeValue="0029202"
          />
        </div><div
          className="card-wrapper"
          style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}
        >
          <Card
            number="02"
            imageUrl="/images/card_01.png"
            heading="BOT STACLE RACE"
            description="Navigate obstacles with speedy bot—test stability and speed! Prize pool ₹30,000. Fee ₹300. Scan QR to register!"
            barcodeValue="0029202"
          />
        </div>
        <div
          className="card-wrapper"
          style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}
        >
          <Card
            number="03"
            imageUrl="/images/card_01.png"
            heading="TRACERCON"
            description="Build line-tracing bot for complex paths—precision and velocity! Prize pool ₹15,000. Fee ₹150. Scan QR to register!"
            barcodeValue="0029202"
          />
        </div>
      </div>

      <style jsx>{`
        /* Box sizing */
        .container,
        .card-wrapper {
          box-sizing: border-box;
        }

        /* Desktop */
        .container {
          min-height: 100vh;
          background-color: #f3f3f3;
          display: grid;
          justify-items: center;
          align-content: center;
          max-width: 100vw;
          overflow-x: hidden;

          grid-template-columns: repeat(3, 25vw);
          padding-left: 7.5vw;
          padding-right: 7.5vw;
          column-gap: ${desktopColumnGap}vw;
          row-gap: ${desktopRowGap}vw;
        }

        .card-wrapper {
          width: 25vw;
          aspect-ratio: 4 / 3;
          max-width: 100%;
          margin: 0; 
          /* Scale applied inline */
        }

        /* Tablet */
        @media (min-width: 501px) and (max-width: 1024px) {
          .container {
            grid-template-columns: repeat(2, 35vw);
            padding-left: 10vw;
            padding-right: 10vw;
            column-gap: ${tabletColumnGap}vw;
            row-gap: ${tabletRowGap}vw;
          }
          .card-wrapper {
            width: 35vw;
          }
        }

        /* Mobile */
        @media (max-width: 500px) {
          .container {
            grid-template-columns: 85vw;
            padding-left: ${mobileGapPx}px;
            padding-right: ${mobileGapPx}px;
            column-gap: ${mobileGapPx}px;
            row-gap: ${mobileGapPx}px; /* Fixed pixel row-gap for consistent spacing */
          }
          .card-wrapper {
            width: 85vw;
          }
        }
      `}</style>
    </>
  );
}
