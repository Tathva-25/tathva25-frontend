"use client";
import Barcode from "react-barcode";
import { Michroma } from "next/font/google";
import { useEffect, useState } from "react";
import TextType from "./TextType";

const michroma = Michroma({ subsets: ["latin"], weight: "400" });

export default function WheelsEvent() {
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    // Random glitch effect
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 5000);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div
      className={michroma.className} // ✅ Apply Michroma font globally
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#000",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        fontFamily: "'Michroma', sans-serif", // ✅ fallback for safety
        position: "relative",
      }}
    >
      {/* === BACKGROUND CONTAINER === */}
      <div
        className="background-container"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <img
          src="/images/background2.png"
          alt="Background"
          className="background-image"
          style={{
            width: "100%",
            height: "100%",
            // top: "-10px",
            objectFit: "cover",
            objectPosition: "center",
            position: "absolute",
            inset: 0,
            zIndex: 0,
            transition: "filter 0.4s ease, transform 0.4s ease",
          }}
        />

        <img
          src="/images/car.png"
          alt="DeLorean Car"
          className="car-overlay"
          style={{
            position: "absolute",
            bottom: "12%",
            left: "24%",
            width: "51%",
            height: "auto",
            zIndex: 5,
            pointerEvents: "none",
            userSelect: "none",
            transition: "all 0.4s ease",
          }}
        />

        <style>{`
          @keyframes glitch {
            0%,
            100% {
              transform: translate(0);
              clip-path: inset(0 0 0 0);
            }
            10% {
              transform: translate(-3px, 0);
              clip-path: inset(10% 0 85% 0);
            }
            20% {
              transform: translate(3px, 0);
              clip-path: inset(80% 0 10% 0);
            }
            30% {
              transform: translate(-2px, 0);
              clip-path: inset(50% 0 30% 0);
            }
            40% {
              transform: translate(2px, 0);
              clip-path: inset(20% 0 60% 0);
            }
            50% {
              transform: translate(0);
              clip-path: inset(0 0 0 0);
            }
          }

          @keyframes shake {
            0%,
            100% {
              transform: translate(0, 0) rotate(0deg);
            }
            10% {
              transform: translate(-0.5px, -0.5px) rotate(-0.1deg);
            }
            20% {
              transform: translate(0.5px, 0.3px) rotate(0.1deg);
            }
            30% {
              transform: translate(-0.3px, 0.5px) rotate(-0.08deg);
            }
            40% {
              transform: translate(0.5px, -0.3px) rotate(0.08deg);
            }
            50% {
              transform: translate(-0.5px, 0.3px) rotate(-0.05deg);
            }
            60% {
              transform: translate(0.3px, -0.5px) rotate(0.05deg);
            }
            70% {
              transform: translate(-0.3px, -0.3px) rotate(-0.1deg);
            }
            80% {
              transform: translate(0.5px, 0.5px) rotate(0.1deg);
            }
            90% {
              transform: translate(-0.3px, 0.3px) rotate(-0.05deg);
            }
          }

          @keyframes neonGlow {
            0%,
            100% {
              text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px #00ffff,
                0 0 30px #00ffff, 0 0 40px #00ffff;
            }
            50% {
              text-shadow: 0 0 2px #fff, 0 0 5px #fff, 0 0 10px #00ffff,
                0 0 15px #00ffff, 0 0 20px #00ffff;
            }
          }

          @keyframes flicker {
            0%,
            19%,
            21%,
            23%,
            25%,
            54%,
            56%,
            100% {
              opacity: 1;
            }
            20%,
            24%,
            55% {
              opacity: 0.4;
            }
          }

          @keyframes slideInLeft {
            from {
              transform: translateX(-100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }

          @keyframes slideInRight {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }

          @keyframes scanline {
            0% {
              transform: translateY(-100%);
            }
            100% {
              transform: translateY(100vh);
            }
          }

          .cyber-text {
            animation: neonGlow 2s ease-in-out infinite;
          }

          .glitch-text {
            position: relative;
          }

          .glitch-wheels {
            animation: glitch 0.5s infinite;
            display: inline-block;
          }

          .shake-text {
            animation: shake 0.5s infinite;
            display: inline-block;
          }

          .flicker-text {
            animation: flicker 3s linear infinite;
          }

          .slide-in-left {
            animation: slideInLeft 1s ease-out;
          }

          .slide-in-right {
            animation: slideInRight 1s ease-out;
          }

          .scanline-container {
            position: relative;
            overflow: hidden;
          }

          .scanline-container::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(
              transparent,
              rgba(0, 255, 255, 0.8),
              transparent
            );
            animation: scanline 4s linear infinite;
            pointer-events: none;
            z-index: 10;
          }

          @media (max-width: 768px) {
            .background-image {
              filter: blur(8px) brightness(0.8);
              transform: scale(1.15);
            }

            .car-overlay {
              width: 90%;
              left: 5%;
              bottom: 8%;
            }

            .background-container {
              overflow: hidden;
            }

            .top-grid {
              display: flex !important;
              flex-direction: column !important;
              align-items: center !important;
              justify-content: flex-start !important;
              height: auto !important;
              gap: 1.5rem;
              padding-top: 2rem;
            }

            .top-grid > div {
              border: none !important;
              text-align: center !important;
              width: 90% !important;
              padding: 0 !important;
            }

            .top-grid .barcode-container {
              justify-content: center !important;
              gap: 1rem;
            }

            .top-grid h1,
            .top-grid h2 {
              text-align: center;
            }

            .footer-text {
              font-size: 3vw !important;
            }
          }

          @media (min-width: 769px) and (max-width: 1024px) {
            .background-image {
              filter: blur(3px) brightness(0.9);
              transform: scale(1.05);
            }

            .car-overlay {
              width: 60%;
              left: 20%;
              bottom: 4%;
            }
          }

          @media (min-width: 1025px) {
            .background-image {
              filter: none;
              transform: none;
            }

            .car-overlay {
              width: 51%;
              left: 24%;
              bottom: 6%;
            }
          }
        `}</style>
      </div>

      {/* === MAIN CONTENT === */}
      <div
        style={{
          width: "100vw",
          height: "98vh",
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflowX: "hidden",
        }}
      >
        {/* === TOP GRID === */}
        <div
          className="top-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "40% 60%",
            gridTemplateRows: "50% 50%",
            width: "100%",
            height: "55%",
            boxSizing: "border-box",
          }}
        >
          {/* === TOP LEFT === */}
          <div
            className="slide-in-left"
            style={{
              borderRight: "0.05vw solid #fff",
              borderBottom: "0.05vw solid #fff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              paddingLeft: "1vw",
              boxSizing: "border-box",
              overflow: "hidden",
            }}
          >
            <div
              // className="cyber-text"
              style={{
                fontSize: "clamp(1rem, 4vw, 4rem)",
                fontWeight: 200,
                textTransform: "uppercase",
                letterSpacing: "0.1vw",
                marginBottom: "0.4vh",
              }}
            >
              OCTOBER 26
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5vw",
                whiteSpace: "nowrap",
                transform: "translateY(-25%)",
              }}
            >
              <div
                style={{
                  fontSize: "clamp(0.6rem, 1.2vw, 1.5rem)",
                  fontWeight: 100,
                  letterSpacing: "0.05vw",
                }}
              >
                BACK TO THE FUTURE
              </div>
              <img
                src="/images/dotwave.png"
                alt="Dotwave"
                style={{
                  width: "3vw",
                  height: "auto",
                  minWidth: "20px",
                  maxWidth: "40px",
                  objectFit: "contain",
                }}
              />
            </div>
          </div>

          {/* === TOP RIGHT === */}
          <div
            className="scanline-container"
            style={{
              borderBottom: "0.05vw solid #fff",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              justifyContent: "flex-start",
              paddingTop: "1vh",
              paddingRight: "1vw",
              boxSizing: "border-box",
              overflow: "hidden",
            }}
          >
            <div
              className="glitch-wheels slide-in-right"
              style={{
                fontFamily: "sans-serif",
                fontSize: "clamp(2rem, 12vw, 11rem)",
                fontWeight: 900,
                lineHeight: 0.6,
                textTransform: "uppercase",
                // marginTop: "-1vh",
              }}
            >
              WHEELS
            </div>

            <div
              className="barcode-container slide-in-right"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10vw",
                marginTop: "5vh",
                flexWrap: "nowrap",
              }}
            >
              <div
                style={{
                  transform: "scale(0.9)",
                  maxWidth: "40%",
                  marginRight: "-3vw",
                }}
              >
                <Barcode
                  value="WHEELS-2025"
                  height={38}
                  width={2.1}
                  background="transparent"
                  lineColor="#fff"
                  displayValue={false}
                />
              </div>

              <div
                className="flicker-text"
                style={{
                  fontSize: "clamp(1rem, 3vw, 5rem)",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "0.08vw",
                  whiteSpace: "nowrap",
                }}
              >
                AUTOSHOW
              </div>
            </div>
          </div>

          {/* === BOTTOM LEFT === */}
          <div
            style={{
              borderRight: "0.05vw solid #fff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              paddingLeft: "1vw",
              boxSizing: "border-box",
              fontSize: "clamp(0.6rem, 0.9vw, 1rem)",
              lineHeight: "1.6",
              overflow: "hidden",
            }}
          >
            <TextType
              text={["Prototype: 1981 DeLorean"]}
              typingSpeed={75}
              pauseDuration={1500}
              cursorCharacter="_"
              loop={false}
              showCursor={false}
            />
            <TextType
              text={["Status: Operational"]}
              typingSpeed={75}
              pauseDuration={1500}
              cursorCharacter="_"
              loop={false}
              showCursor={false}
            />
            <TextType
              text={["Power Source: Mr. Fusion™ Reactor"]}
              typingSpeed={75}
              pauseDuration={1500}
              cursorCharacter="_"
              loop={false}
              showCursor={false}
            />
            <TextType
              text={["Objective: Bend the continuum. Revisit the impossible."]}
              typingSpeed={75}
              pauseDuration={1500}
              cursorCharacter="_"
              loop={false}
              showCursor={false}
            />
            <TextType
              text={[
                "Function: Temporal displacement via flux synchronization",
              ]}
              typingSpeed={95}
              pauseDuration={500}
              cursorCharacter="_"
              loop={false}
              showCursor={false}
            />
            {/* <div>Prototype: 1981 DeLorean</div> */}
            {/* <div>Status: Operational</div> */}
            {/* <div>Power Source: Mr. Fusion™ Reactor</div> */}
            {/* <div>Objective: Bend the continuum. Revisit the impossible.</div> */}
            {/* <div>Function: Temporal displacement via flux synchronization</div> */}
          </div>

          {/* === BOTTOM RIGHT === */}
          <div
            style={{
              display: "flex",
              alignItems: "left",
              justifyContent: "left",
              boxSizing: "border-box",
              overflow: "hidden",
            }}
          >
            <div
              className="shake-text"
              style={{
                fontFamily: "'Michroma', sans-serif",
                fontSize: "clamp(2rem, 7vw, 8rem)",
                fontWeight: 200,
                textTransform: "uppercase",
                letterSpacing: "0.5vw",
                lineHeight: "0.9",
                paddingLeft: "4%",
                whiteSpace: "nowrap",
                color: "transparent",
                WebkitTextStroke: "2px #fff",
                textStroke: "2px #fff",
              }}
            >
              2025
            </div>
          </div>
        </div>

        {/* === FOOTER === */}
        <div
          className="footer-text"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "stretch",
            borderTop: "0.1vw solid #fff",
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          {/* LEFT COLUMN */}
          <div
            style={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "flex-start",
              borderRight: "0.1vw solid #fff",
              boxSizing: "border-box",
              paddingLeft: "0vw",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "60%",
                textTransform: "uppercase",
                fontSize: "clamp(0.7rem, 1.1vw, 1.3rem)",
                fontWeight: 100,
                transform: "translateX(8%)",
                marginBottom: "1.5vh",
                whiteSpace: "nowrap",
              }}
            >
              <div>RALLY</div>
              <div>CAR REVEALS</div>
              <div>STUNTS</div>
            </div>

            <div
              // className="cyber-text"
              style={{
                fontSize: "clamp(2rem, 5.5vw, 6rem)",
                fontWeight: 200,
                textTransform: "uppercase",
                letterSpacing: "0.1vw",
                transform: "translateX(8%)",
                lineHeight: "0.9",
                whiteSpace: "nowrap",
              }}
            >
              TEMPORAL
            </div>

            <div
              className="flicker-text"
              style={{
                alignSelf: "flex-end",
                fontSize: "clamp(1rem, 1.8vw, 2rem)",
                fontWeight: 100,
                textTransform: "uppercase",
                letterSpacing: "0.2vw",
                marginRight: "2vw",
                marginTop: "0.5vh",
              }}
            >
              SHIFT
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div
            style={{
              width: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              boxSizing: "border-box",
              paddingRight: "0%",
              paddingBottom: "0%",
              overflow: "hidden",
            }}
          >
            <img
              src="/images/design.png"
              alt="Design"
              style={{
                width: "8vw",
                height: "auto",
                maxWidth: "100px",
                minWidth: "35px",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
