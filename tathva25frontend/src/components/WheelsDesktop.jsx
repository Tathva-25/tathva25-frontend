'use client';
import Barcode from "react-barcode";
import { Michroma } from 'next/font/google';

const michroma = Michroma({ subsets: ['latin'], weight: '400' });

export default function WheelsEvent() {
  return (
    <div
    
      className={michroma.className} 
      style={{
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
            bottom: "6%",
            left: "24%",
            width: "51%",
            height: "auto",
            zIndex: 5,
            pointerEvents: "none",
            userSelect: "none",
            transition: "all 0.4s ease",
          }}
        />

        <style jsx>{`
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
              style={{
                fontSize: "clamp(1rem, 3.5vw, 4rem)",
                fontWeight: 200,
                textTransform: "uppercase",
                letterSpacing: "0.1vw",
                marginBottom: "0.4vh",
              }}
            >
              OCTOBER 24
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
              style={{
                fontSize: "clamp(2rem, 8.5vw, 11rem)",
                fontWeight: 900,
                lineHeight: 0.8,
                textTransform: "uppercase",
                marginTop: "-1vh",
              }}
            >
              WHEELS
            </div>

            <div
              className="barcode-container"
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
                }}
              >
                <Barcode
                  value="WHEELS-2025"
                  height={38}
                  width={1.1}
                  background="transparent"
                  lineColor="#fff"
                  displayValue={false}
                />
              </div>

              <div
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
            <div>Prototype: 1981 DeLorean</div>
            <div>Status: Operational</div>
            <div>Power Source: Mr. Fusion™ Reactor</div>
            <div>Objective: Bend the continuum. Revisit the impossible.</div>
            <div>Function: Temporal displacement via flux synchronization</div>
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
              style={{
                fontSize: "clamp(2rem, 5.5vw, 6rem)",
                fontWeight: 200,
                textTransform: "uppercase",
                letterSpacing: "0.1vw",
                transform: "translateX(4%)",
                lineHeight: "0.9",
                whiteSpace: "nowrap",
              }}
            >
              TEMPORAL
            </div>

            <div
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
