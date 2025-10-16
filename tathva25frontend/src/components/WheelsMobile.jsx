'use client';
import Barcode from "react-barcode";
import { Michroma } from 'next/font/google';

const michroma = Michroma({ subsets: ['latin'], weight: '400' });

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

        {/* car
        <img
          src="/images/car.png"
          alt="Car"
          style={{
            position: "absolute",
            bottom: "5%", // bring car slightly up
            left: "50%",
            transform: "translateX(-50%) translateY(-40%) ", // center + zoom so front/back are offscreen
            width: "auto",
            height: "auto",
            minWidth: "150%", // ensures mid part visible, rest out
            objectFit: "contain",
            pointerEvents: "none",
            userSelect: "none",
            zIndex: 1,
          }}
        /> */}
      </div>

      {/* === MAIN CONTENT === */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
          width: "100%",
          padding: "1.5rem 1rem",
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
            paddingBottom: "0.1rem",
            borderBottom: "1px solid #fff",
            marginBottom: "0.1rem",
          }}
        >
          <div
            style={{
              fontSize: "clamp(3rem, 15.5vw, 11rem)",
              fontWeight: 10000000,
              textTransform: "uppercase",
              lineHeight: 1,
              marginBottom: "0.3rem",
            }}
          >
            WHEELS
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "90%",
              gap: "0rem",
              transform:"translateX(-7%)",
            }}
          >
            <div style={{ transform: "scale(0.55)" }}>
              <Barcode
                value="WHEELS-2025"
                height={35}
                width={1.2}
                background="transparent"
                lineColor="#fff"
                displayValue={false}
              />
            </div>
            <div
              style={{
                fontSize: "clamp(1.2rem, 6.5vw, 3.5rem)",
                fontWeight: 1000,
                textTransform: "uppercase",
                letterSpacing: "0.0em",
              }}
            >
              AUTOSHOW
            </div>
          </div>
        </div>

        {/* === YEAR (left aligned) === */}
        <div
          style={{
            width: "100%",
            fontFamily: "'Michroma', sans-serif",
            fontSize: "clamp(3rem, 14vw, 8rem)",
            textTransform: "uppercase",
            color: "transparent",
            transform:"translateY(-240%) translateX(-5%)",
            WebkitTextStroke: "2px #fff",
            textStroke: "2px #fff",
            lineHeight: 1,
            textAlign: "left",
            paddingLeft: "0.5rem",
            marginBottom: "0.5rem",
          }}
        >
          2025
        </div>

        {/* === DATE SECTION === */}
        <div
          style={{
            width: "100%",
            textAlign: "center",
            margin: "0.2rem 0 0.6rem 0",
          }}
        >
          <div
            style={{
              fontSize: "clamp(2rem, 9vw, 4rem)",
              fontWeight: 100,
               transform:"translateY(-500%) translateX(-9%)",
              textTransform: "uppercase",
              letterSpacing: "0.0em",
              lineHeight: 1.1,
            }}
          >
            October 26
          </div>
          <div
            style={{
              fontSize: "clamp(0.9rem, 3.5vw, 1.3rem)",
              fontWeight: 300,
              transform:"translateY(-920%) translateX(-18%)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginTop: "0.3rem",
            }}
          >
            Back to the Future
          </div>
        </div>

        {/* === FOOTER === */}
        <div
          style={{
            width: "100%",
            paddingTop: "1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.7rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              fontSize: "clamp(0.6rem, 3vw, 1rem)",
              textTransform: "uppercase",
              fontWeight: 300,
               transform:"translateY(-220%) translateX(-15%)",
              letterSpacing: "0.05em",
            }}
          >
            <div>Rally</div>
            <div>Car Reveals</div>
            <div>Stunts</div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              transform:"translateY(-120%)",
              fontSize: "clamp(2.0rem, 4vw, 4rem)",
              fontWeight: 300,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              lineHeight: "0.9",
              whiteSpace: "nowrap",
            }}
          >
            <span>Temporal</span>
            <span
              style={{
                fontSize: "clamp(1.1rem, 2vw, 1.8rem)",
                fontWeight: 200,
                letterSpacing: "0.2em",
              }}
            >
              Shift
            </span>
            
          </div>
          <div>
    <img
      src="/images/misc.png"
      alt="Misc"
      style={{
        height: "2rem", // adjust size as needed
        objectFit: "contain",
      }}
    />
  </div>
          
        </div>
      </div>
    </div>
  );
}
