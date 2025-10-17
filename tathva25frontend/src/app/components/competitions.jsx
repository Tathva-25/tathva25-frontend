"use client";

import React, { useState, useEffect, useRef } from "react";
import { Michroma } from "next/font/google";

// Michroma font configuration
const michroma = Michroma({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

// Central branding SVG component
const CentralSVG = () => (
  <svg
    width="210"
    height="86"
    viewBox="0 0 210 86"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.20505 57.1983L1 39.7815L18.4168 32.5764L92.6308 58.3375L134.784 40.8992L155.255 47.5072L158.283 54.8273L84.8298 85.2138L8.20505 57.1983Z"
      fill="black"
    />
    <path
      d="M54.1449 38.1936L51.2211 31.126L125.179 0.530609L202.204 28.0849L209.618 46.0065L191.444 53.5248L117.779 26.9456L74.6154 44.8016L54.1449 38.1936Z"
      fill="black"
    />
    <path
      d="M8.20505 57.1983L1 39.7815L18.4168 32.5764L92.6308 58.3375L134.784 40.8992L155.255 47.5072L158.283 54.8273L84.8298 85.2138L8.20505 57.1983Z"
      stroke="black"
      strokeWidth="0.543353"
    />
    <path
      d="M54.1449 38.1936L51.2211 31.126L125.179 0.530609L202.204 28.0849L209.618 46.0065L191.444 53.5248L117.779 26.9456L74.6154 44.8016L54.1449 38.1936Z"
      stroke="black"
      strokeWidth="0.543353"
    />
  </svg>
);

// Decorative image component for SVG - accepts a src prop for different images
const DecorativeImage = ({ src, x, y, width }) => (
  <image
    href={src}
    x={x}
    y={y}
    width={width}
    height="100"
    transform="translate(96, 19.2)" // Adjust offset as needed
  />
);

// Top SVG header with branding and decorative elements
const TopSvg = () => (
  <svg
    width="100vw"
    viewBox="0 0 1920 213"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      width: "100vw",
      height: "11.09375vw",
      display: "block",
      position: "relative",
      zIndex: 3,
    }}
  >
    {/* Branding layer */}
    <foreignObject x="0" y="0" width="1920" height="110">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          width: "100%",
          height: "110px",
          padding: "18px 30px 0 30px",
          zIndex: 10,
        }}
      >
        <img
          src="/images/barcode.png"
          width={80}
          height={40}
          alt="barcode left"
        />
        <div style={{ margin: "0 32px", flex: "none" }}>
          <CentralSVG />
        </div>
        <img
          src="//images/barcode.png"
          width={80}
          height={40}
          alt="barcode right"
        />
        <img
          src="/svg/tathva_logo.svg"
          alt="tathva logo"
          width={70}
          height={70}
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            zIndex: 12,
          }}
        />
      </div>
    </foreignObject>

    {/* Background paths */}
    <path
      d="M58.8283 105.332C21.9102 105.332 -3.59748 80.2419 0.41489 47.875V-50H1919V47.875C1913.5 75.6503 1903.27 105.332 1869.64 105.332H1644.72L1533.93 211H1456.05L1398.98 171.375H1284.84L1242.54 211H698.69L640.276 171.375H521.435L470.408 211H387.823L267.639 105.332H58.8283Z"
      fill="#fff"
    />
    <path
      d="M58.8283 105.332C21.9102 105.332 -3.59748 80.2419 0.41489 47.875V-50H1919V47.875C1913.5 75.6503 1903.27 105.332 1869.64 105.332H1644.72L1533.93 211H1456.05L1398.98 171.375H1284.84L1242.54 211H698.69L640.276 171.375H521.435L470.408 211H387.823L267.639 105.332H58.8283Z"
      stroke="url(#paint0_linear_2522_416)"
      strokeWidth="3"
    />
    <path
      d="M58.8283 105.332C21.9102 105.332 -3.59748 80.2419 0.41489 47.875V-50H1919V47.875C1913.5 75.6503 1903.27 105.332 1869.64 105.332H1644.72L1533.93 211H1456.05L1398.98 171.375H1284.84L1242.54 211H698.69L640.276 171.375H521.435L470.408 211H387.823L267.639 105.332H58.8283Z"
      stroke="black"
      strokeWidth="3"
    />

    {/* Decorative elements */}
    <DecorativeImage
      src="/images/competitions_design01.svg"
      x="308"
      y={100}
      width="4rem"
    />
    <DecorativeImage
      src="/images/competitions_design02.svg"
      x="800"
      y={70}
      width="12rem"
    />
    <DecorativeImage
      src="/images/competitions_design01.svg"
      x="1370"
      y={100}
      width="4rem"
    />
    <DecorativeImage
      src="/images/tathva_logo.svg"
      x="1650"
      y={-10}
      width="8rem"
    />

    {/* Gradient definition */}
    <defs>
      <linearGradient
        id="paint0_linear_2522_416"
        x1="960.208"
        y1="47.875"
        x2="960.208"
        y2="211"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#EBAB4D" />
        <stop offset="0.5" stopColor="white" />
        <stop offset="1" stopColor="#EBAB4D" />
      </linearGradient>
    </defs>
  </svg>
);

// Interactive shape component for bottom section
const InteractiveShape = ({
  shape,
  index,
  filledIndex,
  hoveredIndex,
  onHover,
  onFill,
  scale,
}) => {
  return (
    <svg
      width={shape.width * scale}
      height={50 * scale}
      viewBox={shape.viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: hoveredIndex === index ? `scale(1.05)` : "scale(1)",
        transition: "transform 0.2s ease",
        cursor: "pointer",
      }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(-1)}
      onClick={() => onFill(index)}
    >
      <path
        d={shape.path}
        fill={filledIndex === index ? "black" : "none"}
        stroke="black"
        strokeWidth="2.64882"
      />
      <text
        x={shape.textX}
        y="25"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="Michroma"
        fontSize="25.685"
        fontWeight="400"
        fontStyle="normal"
        fill={filledIndex === index ? "white" : "#000"}
      >
        {shape.text}
      </text>
    </svg>
  );
};

// Bottom SVG component with new shape, interactivity, and added barcodes
const BottomSvgWithText = () => {
  const [filledIndex, setFilledIndex] = useState(-1);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scale = isMobile ? 1.4 : 0.9; // increased scale for mobile
  const foreignObjectHeight = isMobile ? 450 : 300;
  const shapesDivMaxWidth = isMobile ? "80vw" : "1200px";
  const shapesDivMarginTop = isMobile ? "30px" : "20px";

  const shapes = [
    {
      width: 384,
      viewBox: "0 0 384 50",
      path: "M338.456 1.32422L380.238 48.1201H2.95898L44.7402 1.32422H338.456Z",
      textX: 192,
      text: "ROBOWARS",
    },
    {
      width: 384,
      viewBox: "0 0 384 50",
      path: "M380.733 1.32422L338.95 48.1201H45.2344L3.45215 1.32422H380.733Z",
      textX: 192,
      text: "GPC",
    },
    {
      width: 341,
      viewBox: "0 0 341 50",
      path: "M337.08 1.32422L295.297 48.1201H3.94727L45.7285 1.32422H337.08Z",
      textX: 170.5,
      text: "SINGING",
    },
    {
      width: 384,
      viewBox: "0 0 384 50",
      path: "M339.26 1.32422L381.042 48.1201H3.7627L45.5439 1.32422H339.26Z",
      textX: 192,
      text: "DANCING",
    },
  ];

  return (
    <svg
      width="100vw"
      viewBox="0 0 1916 1430"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: "100vw",
        height: "83.8vw",
        display: "block",
        position: "relative",
        zIndex: 2,
      }}
    >
      {/* Main background path - fill only, no stroke */}
      <path
        d="M1913.5 1428.5V41C1913.5 41 1922 1.99999 1879 2H1641.5L1533.5 110H1456L1398.5 68H1283.5L1243.5 110H697L638 68H523L470 110H386.5L264 3.49998H41.4998C-7.50001 0.500005 2.49979 46.5 2.49979 46.5V1428.5H1913.5Z"
        fill="white"
        stroke="none"
      />

      {/* Two barcode images near the top */}
      <DecorativeImage src="/barcode.png" x="438" y={30} width="6rem" />
      <DecorativeImage src="/barcode.png" x="1200" y={30} width="6rem" />

      {/* Top wavy border - white */}
      <path
        d="M1913.5 41C1913.5 41 1922 1.99999 1879 2H1641.5L1533.5 110H1456L1398.5 68H1283.5L1243.5 110H697L638 68H523L470 110H386.5L264 3.49998H41.4998C-7.50001 0.500005 2.49979 46.5 2.49979 46.5"
        stroke="white"
        strokeWidth="3"
        fill="none"
      />

      {/* Left side border - black */}
      <line
        x1="2.49979"
        y1="46.5"
        x2="2.49979"
        y2="1428.5"
        stroke="black"
        strokeWidth="3"
      />

      {/* Right side border - black */}
      <line
        x1="1913.5"
        y1="41"
        x2="1913.5"
        y2="1428.5"
        stroke="black"
        strokeWidth="3"
      />

      {/* Bottom border - white */}
      <line
        x1="2.49979"
        y1="1428.5"
        x2="1913.5"
        y2="1428.5"
        stroke="white"
        strokeWidth="3"
      />

      {/* Text and interactive shapes */}
      <foreignObject x="0" y="90" width="100%" height={foreignObjectHeight}>
        <div
          className={michroma.className}
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Montserrat', sans-serif",
            overflow: "visible",
          }}
        >
          <h1
            style={{
              color: "#000",
              fontSize: isMobile ? "220px" : "176.804px", // increased font size for mobile
              fontStyle: "normal",
              lineHeight: "normal",
              textAlign: "center",
              width: "100%",
              margin: 0,
            }}
          >
            COMPETITIONS
          </h1>
          <div
            style={{
              display: isMobile ? "grid" : "flex",
              gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "unset",
              justifyItems: isMobile ? "center" : "flex-start",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              marginTop: shapesDivMarginTop,
              width: "100%",
              maxWidth: shapesDivMaxWidth,
            }}
          >
            {shapes.map((shape, index) => (
              <InteractiveShape
                key={index}
                shape={shape}
                index={index}
                filledIndex={filledIndex}
                hoveredIndex={hoveredIndex}
                onHover={setHoveredIndex}
                onFill={setFilledIndex}
                scale={scale}
              />
            ))}
          </div>
        </div>
      </foreignObject>
    </svg>
  );
};

// Main Competitions component with scroll animation fix
const Competitions = () => {
  const topHeightVw = 11.09375; // number values for calculations
  const bottomHeightVw = 83.8;
  const gapVw = 16.875;
  const scrollThresholdVw = 30; // threshold after which both move
  const containerRef = useRef(null);

  const [bottomTranslateY, setBottomTranslateY] = useState(0);
  const [topTranslateY, setTopTranslateY] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const scrollProgressPx = Math.max(0, -rect.top);

      const vwToPx = (vw) => (vw / 100) * window.innerWidth;
      const thresholdPx = vwToPx(scrollThresholdVw);

      if (scrollProgressPx < thresholdPx) {
        // Bottom moves up only, top stays
        setBottomTranslateY(-scrollProgressPx);
        setTopTranslateY(0);
      } else {
        // Bottom fixed at max upward, top moves up
        const extraScroll = scrollProgressPx - thresholdPx;
        setBottomTranslateY(-thresholdPx);
        setTopTranslateY(-extraScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100vw",
        height: `calc(${topHeightVw}vw + ${gapVw}vw + ${bottomHeightVw}vw)`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background image */}
      <img
        src="/images/competitions_bg.png"
        alt="background"
        style={{
          width: "100vw",
          height: "auto",
          objectFit: "cover",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
        }}
      />

      {/* Top SVG overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          zIndex: 2,
          pointerEvents: "none",
          transform: `translateY(${topTranslateY}px)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <TopSvg />
      </div>

      {/* Bottom SVG overlay */}
      <div
        style={{
          position: "absolute",
          top: `calc(${topHeightVw}vw + ${gapVw}vw)`,
          left: 0,
          width: "100vw",
          zIndex: 2,
          transform: `translateY(${bottomTranslateY}px)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <BottomSvgWithText />
      </div>
    </div>
  );
};

export default Competitions;
