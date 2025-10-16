"use client";
import Barcode from "react-barcode";
import { Michroma } from "next/font/google";

const michroma = Michroma({ subsets: ["latin"], weight: "400" });

export default function WheelsEventMobile() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",

        backgroundColor: "#000",
        color: "#fff",
        fontFamily: "'Michroma', sans-serif",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
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
         
          20% {
            transform: translate(0.5px, 0.3px) rotate(0.1deg);
          }
         
          40% {
            transform: translate(0.5px, -0.3px) rotate(0.08deg);
          }
         
          60% {
            transform: translate(0.3px, -0.5px) rotate(0.05deg);
          }
         
          80% {
            transform: translate(0.5px, 0.5px) rotate(0.1deg);
          }
          90% {
            transform: translate(-0.3px, 0.3px) rotate(-0.05deg);
          }
        }

        .glitch-wheels {
          animation: glitch 0.5s infinite;
          display: inline-block;
        }

        .shake-text {
          animation: shake 1s infinite;
          display: inline-block;
        }
      `}</style>
      {/* === BACKGROUND LAYER (car + bg) === */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        {/* background */}
        <img
          src="/images/background3.png"
          alt="Background"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.8)",
          }}
        />

        {/* car */}
        {/* <img
          src="/images/car.png"
          alt="Car"
          style={{
            position: "absolute",
            bottom: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            height: "auto",
            maxHeight: "50%",
            objectFit: "contain",
            pointerEvents: "none",
            userSelect: "none",
            zIndex: 1,
          }}
        /> */}
      </div>

      {/* === MAIN CONTENT === */}
      <div
        className="px-2 py-2"
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
          width: "100%",
          //padding: "clamp(1rem, 3vh, 2rem) clamp(0.75rem, 4vw, 1.5rem)",
          boxSizing: "border-box",
        }}
      >
        {/* === TOP SECTION === */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            paddingBottom: "clamp(0.5rem, 2vh, 1rem)",
            borderBottom: "1px solid #fff",
            flex: "0 0 auto",
          }}
        >
          <div
            className="glitch-wheels"
            style={{
              fontFamily: "sans-serif",
              fontSize: "clamp(2.5rem, 20vw, 11rem)",
              fontWeight: 900,
              letterSpacing: "0.00em",
              textTransform: "uppercase",
              lineHeight: 0.9,
              marginBottom: "clamp(0.3rem, 1vh, 0.5rem)",
            }}
          >
            WHEELS
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              gap: "0rem",
              marginTop: "clamp(0.2rem, 1vh, 0.5rem)",
            }}
          >
            <div style={{ transform: "scale(0.8)", transformOrigin: "center" }}>
              <Barcode
                value="WHEELS-2025"
                height={35}
                width={1}
                background="transparent"
                lineColor="#fff"
                displayValue={false}
              />
            </div>
            <div
              style={{
                fontFamily: "sans-serif",
                fontSize: "clamp(1rem, 8vw, 3.5rem)",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.0em",
              }}
            >
              AUTOSHOW
            </div>
          </div>
        </div>

        {/* === MIDDLE CONTENT SECTION === */}
        <div
          style={{
            width: "100%",
            flex: "1 1 auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: "clamp(0.5rem, 2vh, 1rem)",
            paddingTop: "clamp(1rem, 3vh, 2rem)",
          }}
        >
          {/* === YEAR (left aligned) === */}
          <div
            className="shake-text"
            style={{
              width: "100%",
              fontFamily: "'Michroma', sans-serif",
              fontSize: "clamp(3rem, 14vw, 8rem)",
              textTransform: "uppercase",
              color: "transparent",
              WebkitTextStroke: "2px #fff",
              textStroke: "2px #fff",
              lineHeight: 0.9,
              textAlign: "left",
              paddingLeft: "0",
            }}
          >
            2025
          </div>

          {/* === DATE SECTION === */}
          <div
            style={{
              width: "100%",
              textAlign: "left",
              paddingTop: "clamp(0.5rem, 2vh, 1rem)",
            }}
          >
            <div
              style={{
                fontSize: "clamp(2rem, 9vw, 4rem)",
                fontWeight: 100,
                textTransform: "uppercase",
                letterSpacing: "0.0em",
                lineHeight: 1.1,
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span>OCTOBER 26</span>
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ fontSize: "0.6em" }}
              >
                <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
                <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
                <circle cx="12" cy="20" r="1"></circle>
              </svg>
            </div>
            <div
              style={{
                fontSize: "clamp(0.8rem, 3.5vw, 1.3rem)",
                fontWeight: 300,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginTop: "clamp(0.3rem, 1vh, 0.6rem)",
              }}
            >
              Back to the Future
            </div>
          </div>
        </div>

        {/* === FOOTER === */}
        <div
          style={{
            width: "100%",
            paddingBottom: "clamp(1rem, 2vh, 1.5rem)",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-end",
            gap: "clamp(0.5rem, 1.5vh, 1rem)",
            flex: "0 0 auto",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              flexWrap: "wrap",
              paddingLeft: "10px",
              gap: "clamp(0.8rem, 4vw, 1.5rem)",
              fontSize: "clamp(0.7rem, 3vw, 1rem)",
              textTransform: "uppercase",
              fontWeight: 300,
              letterSpacing: "0.05em",
            }}
          >
            <div>RALLY</div>
            <div>CAR REVEALS</div>
            <div>STUNTS</div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "flex-start",
              gap: "clamp(0.5rem, 2vw, 1rem)",
              fontSize: "clamp(1.8rem, 6vw, 4rem)",
              fontWeight: 300,
              paddingLeft: "8px",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              lineHeight: "1",
            }}
          >
            <span>TEMPORAL</span>
            <span
              style={{
                fontSize: "clamp(1.2rem, 3.5vw, 1.8rem)",
                fontWeight: 200,
                letterSpacing: "0.2em",
              }}
            >
              SHIFT
            </span>
          </div>

          {/* Bottom icons row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              marginTop: "clamp(0.5rem, 1vh, 1rem)",
            }}
          >
            {/* Left side - CE and FCC marks */}
            <div
              // style={{
              //   display: "flex",
              //   alignItems: "center",
              //   gap: "clamp(1rem, 4vw, 2rem)",
              //   fontSize: "clamp(1rem, 4vw, 1.5rem)",
              //   fontWeight: "bold",
              // }}
              className="w-full flex justify-between px-3 "
            >
              <div
                style={{
                  border: "2px solid #fff",
                  borderRadius: "4px",
                  padding: "0.1em 0.3em",
                  fontSize: "clamp(0.8rem, 3vw, 1.2rem)",
                }}
              >
                CE
              </div>
              <div style={{ fontSize: "clamp(0.6rem, 2vw, 0.8rem)" }}>✦</div>
              <div style={{ fontSize: "clamp(0.6rem, 2vw, 0.8rem)" }}>✦</div>
              <div style={{ fontSize: "clamp(0.6rem, 2vw, 0.8rem)" }}>✦</div>
              <div
                style={{
                  border: "2px solid #fff",
                  borderRadius: "4px",
                  padding: "0.1em 0.3em",
                  fontSize: "clamp(0.8rem, 3vw, 1.2rem)",
                }}
              >
                FCC
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
