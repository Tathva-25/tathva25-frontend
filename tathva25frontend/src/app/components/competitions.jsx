"use client";

import React, { useState, useEffect, useRef } from "react";
import { Michroma } from "next/font/google";
import Image from "next/image";
import Card from "../../components/Card";
import axios from "axios";
import Link from "next/link";

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
const TopSvg = ({ isAbsolute = false }) => (
  <svg
    width="100vw"
    viewBox="0 0 1920 213"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      width: "100vw",
      height: "11.99375vw",
      display: "block",
      position: isAbsolute ? "absolute" : "relative",
      top: isAbsolute ? 0 : undefined,
      left: isAbsolute ? 0 : undefined,
      zIndex: 3,
    }}
    className="-mt-2.5"
  >
    <svg
      width="1893"
      height="219"
      viewBox="0 0 1893 219"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M60.8283 112.332C23.9102 112.332 -1.59748 87.2419 2.41489 54.875V-43H1921V54.875C1915.5 82.6503 1905.27 112.332 1871.64 112.332C1838.02 112.332 1645 110 1645 110L1534 216H1443.5L1398.5 175.5H1286L1243.5 217H685L640 177H522.5L472 217H387.5L269.639 112.332H60.8283Z"
        fill="#FFF"
      />
      <path
        d="M60.8283 112.332C23.9102 112.332 -1.59748 87.2419 2.41489 54.875V-43H1921V54.875C1915.5 82.6503 1905.27 112.332 1871.64 112.332C1838.02 112.332 1645 110 1645 110L1534 216H1443.5L1398.5 175.5H1286L1243.5 217H685L640 177H522.5L472 217H387.5L269.639 112.332H60.8283Z"
        stroke="url(#paint0_linear_2522_416)"
        strokeWidth="3"
      />
      <path
        d="M60.8283 112.332C23.9102 112.332 -1.59748 87.2419 2.41489 54.875V-43H1921V54.875C1915.5 82.6503 1905.27 112.332 1871.64 112.332C1838.02 112.332 1645 110 1645 110L1534 216H1443.5L1398.5 175.5H1286L1243.5 217H685L640 177H522.5L472 217H387.5L269.639 112.332H60.8283Z"
        stroke="black"
        strokeWidth="3"
      />
      <defs>
        <linearGradient
          id="paint0_linear_2522_416"
          x1="962.208"
          y1="54.875"
          x2="962.208"
          y2="218"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EBAB4D" />
          <stop offset="0.5" stopColor="white" />
          <stop offset="1" stopColor="#EBAB4D" />
        </linearGradient>
      </defs>
    </svg>
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
      ></div>
    </foreignObject>

    {/* Background paths */}

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

// Bottom SVG component with new shape, interactivity, and added barcodes (original state)
const BottomSvgWithText = ({ isMobile }) => {
  const [filledIndex, setFilledIndex] = useState(-1);
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  // isMobile state and useEffect have been removed from here and "lifted"
  // to the Competitions component.

  const scale = isMobile ? 1.2 : 0.9; // adjusted scale for better mobile responsiveness
  const foreignObjectHeight = isMobile ? 400 : 450; // responsive height
  const shapesDivMaxWidth = isMobile ? "90vw" : "1200px"; // increased mobile width
  const shapesDivMarginTop = isMobile ? "20px" : "20px"; // consistent margin

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
        height: isMobile ? "100vh" : "auto", // responsive height
        display: "block",
        position: "relative",
        zIndex: 2,
        minHeight: isMobile ? "600px" : "800px", // ensure minimum height
      }}
    >
      {/* Main background path - fill only, no stroke */}

      {/* Two barcode images near the top */}
      <DecorativeImage src="/barcode.png" x="438" y={30} width="6rem" />
      <DecorativeImage src="/barcode.png" x="1200" y={30} width="6rem" />

      {/* Top wavy border - white */}
      <svg
        width="1896"
        height="1431"
        viewBox="0 0 1896 1431"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M59.5183 3.50033C-18.0008 3.50108 5.27749 51.6445 5.27749 51.6445V423.77V1442.5H1921.79V423.77V44.2813C1921.79 44.2813 1935.76 3.50068 1868.88 3.50033C1802 3.49998 1648 2 1648 2L1537 108H1447L1402 67.5H1289L1246.5 108.5L688.5 109L643 69H525.5L474.5 109H390.5L271.5 3.50033C271.5 3.50033 137.037 3.49958 59.5183 3.50033Z"
          fill="white"
        />
        <path
          d="M59.5183 3.50033C-18.0008 3.50108 5.27749 51.6445 5.27749 51.6445V423.77V1442.5H1921.79V423.77V44.2813C1921.79 44.2813 1935.76 3.50068 1868.88 3.50033C1802 3.49998 1648 2 1648 2L1537 108H1447L1402 67.5H1289L1246.5 108.5L688.5 109L643 69H525.5L474.5 109H390.5L271.5 3.50033C271.5 3.50033 137.037 3.49958 59.5183 3.50033Z"
          stroke="url(#paint0_linear_2522_417)"
          strokeWidth="3"
        />
        <path
          d="M59.5183 3.50033C-18.0008 3.50108 5.27749 51.6445 5.27749 51.6445V423.77V1442.5H1921.79V423.77V44.2813C1921.79 44.2813 1935.76 3.50068 1868.88 3.50033C1802 3.49998 1648 2 1648 2L1537 108H1447L1402 67.5H1289L1246.5 108.5L688.5 109L643 69H525.5L474.5 109H390.5L271.5 3.50033C271.5 3.50033 137.037 3.49958 59.5183 3.50033Z"
          stroke="black"
          strokeWidth="3"
        />
        <defs>
          <linearGradient
            id="paint0_linear_2522_417"
            x1="963.531"
            y1="3.5"
            x2="963.531"
            y2="94.1242"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#EBAB4D" />
            <stop offset="0.5" stopColor="white" />
            <stop offset="1" stopColor="#EBAB4D" />
          </linearGradient>
        </defs>
      </svg>
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
          <div
            style={{
              display: isMobile ? "grid" : "flex",
              gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "unset",
              justifyItems: isMobile ? "center" : "flex-start",
              justifyContent: "center",
              alignItems: "center",
              gap: isMobile ? "8px" : "10px",
              marginTop: shapesDivMarginTop,
              width: "100%",
              maxWidth: shapesDivMaxWidth,
              padding: isMobile ? "0 10px" : "0", // add padding for mobile
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
  const [topAbsolute, setTopAbsolute] = useState(false);
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("ALL"); // This filter is from your original code
  const [svgHeight, setSvgHeight] = useState(0); // Track SVG height

  // State "lifted" from BottomSvgWithText
  const [isMobile, setIsMobile] = useState(false);
  const bottomSvgRef = useRef(null); // Ref for measuring SVG

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // 768px is md breakpoint

      // Measure SVG height for absolute positioning
      if (bottomSvgRef.current) {
        const rect = bottomSvgRef.current.getBoundingClientRect();
        setSvgHeight(rect.height);
      }
    };

    // Initial check
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset || 0;
      setTopAbsolute(y >= 375);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Updated useEffect to match your axios example pattern
  useEffect(() => {
    const getCompetitions = async () => {
      try {
        setLoading(true);
        const url = `${process.env.NEXT_PUBLIC_API}/api/events/all?type=competitions`;
        const response = await axios.get(url);

        // Make sure events exist and filter based on `isFull`
        const events = response.data?.events || [];
        const filteredEvents = events.filter((e) => e.isFull !== true);
        // or: events.filter(e => e.isFull) if you want only true

        setCompetitions(filteredEvents);
        console.log("Fetched competitions:", filteredEvents);

        setError(null);
      } catch (err) {
        console.error("Failed to fetch competitions:", err);
        setError(err.message || "Failed to load competitions");
      } finally {
        setLoading(false);
      }
    };

    getCompetitions();
  }, []);

  // Your original filter logic

  return (
    <div
      style={{
        width: "100vw",
        position: "relative",
        scrollBehavior: "smooth",
      }}
      className="ml-5"
    >
      {/* Background image */}
      <div className="top-0 left-0 w-full h-auto z-0">
        <Image
          width={1920}
          height={1080}
          src="/images/competitions_bg.png"
          alt="background"
          style={{
            width: "100vw",
            height: "auto",
            objectFit: "cover",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 1,
          }}
        />
        <h1
          style={{ WebkitTextStroke: "4px black" }}
          className="fixed top-75 left-1/2 -translate-x-1/2 text-9xl text-white font-extrabold drop-shadow-lg border-black px-6 py-2 z-10"
        >
          COMPETITIONS
        </h1>

        {/* Top header SVG */}
        <div
          style={{
            position: topAbsolute ? "absolute" : "fixed",
            top: topAbsolute ? "-100px" : "0px",
            left: 0,
            zIndex: 100,
          }}
          className={`${topAbsolute ? "ml-1" : "ml-5"} `}
        >
          <TopSvg />
        </div>
      </div>

      {/* Bottom SVG + Competitions wrapper */}
      <div className="relative" style={{ minHeight: "200vh" }}>
        {" "}
        {/* Ensure enough space for absolutely positioned cards */}
        {/* Bottom SVG */}
        <div
          className={`relative z-10 ${isMobile ? "mt-100" : "mt-120"}`}
          id="bottom-svg-container"
          ref={bottomSvgRef}
        >
          <BottomSvgWithText isMobile={isMobile} />
        </div>
        {/* Competitions grid - ABSOLUTELY POSITIONED BELOW BottomSvg */}
        <section
          style={{
            position: "absolute",
            top: isMobile ? "50vh" : "55vh", // Moved cards higher - reduced by 10vh
            left: "0",
            right: "0",
            zIndex: 20,
            padding: "0 16px",
            paddingTop: "2rem",
            width: "100%",
          }}
          className="bg-white"
        >
          {loading && (
            <div
              style={{ color: "#000", textAlign: "center", margin: "24px 0" }}
            >
              Loading competitions...
            </div>
          )}
          {error && (
            <div
              style={{
                color: "#b91c1c",
                textAlign: "center",
                margin: "24px 0",
              }}
            >
              {error}
            </div>
          )}
          {!loading && !error && (
            <div
              className={`gapx-20 justify-evenly flex flex-wrap ${
                isMobile ? "px-2 py-4" : "px-4 py-6"
              }`}
            >
              {competitions.map((item, idx) => {
                const {
                  id,
                  heading,
                  description,
                  price,
                  datetime,
                  time,
                  venue,
                  picture,
                } = item;

                // Generate barcode value based on workshop ID
                const barcodeValue = String(id).padStart(7, "0");

                // Format description with additional info
                const fullDescription = `${
                  description ?? "No description available"
                } `;

                return (
                  <Link
                    href={`/competitions/${id}`}
                    key={id}
                    className="block transform hover:scale-102 transition-transform duration-500"
                  >
                    <div className="mb-10">
                      <Card
                        number={String(idx + 1).padStart(2, "0")}
                        imageUrl={picture || "/images/card_01.png"}
                        heading={heading ?? "Untitled Workshop"}
                        description={fullDescription}
                        barcodeValue={barcodeValue}
                        sideImageUrl="/images/misc.png"
                      />
                    </div>
                  </Link>
                );
              })}
              {competitions.length === 0 && (
                <div
                  style={{
                    color: "#000",
                    textAlign: "center",
                    margin: "32px 0",
                  }}
                >
                  No competitions found for this filter.
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Competitions;
