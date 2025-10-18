"use client";
import { useState, useEffect, useMemo } from "react";
import DotGridButton from "@/components/DotGridButton";
import localfont from 'next/font/local';


const someFont = localfont({
    src: '../../public/fonts/michroma.ttf',
    display: 'swap',
})

export default function Expo() {
    const borderThickness = 20;

    const [metrics, setMetrics] = useState({
        h: 0,
        rowHeight: 0,
        colWidth: 0,
        numCols: 0,
        sideMargin: 0,
        vw: 0,
    });

    // Define breakpoints for a 3-tier responsive design
    const tabletBreakpoint = 768;
    const desktopBreakpoint = 1024;

    // Determine the current device type based on viewport width
    const isTablet = metrics.vw >= tabletBreakpoint && metrics.vw < desktopBreakpoint;
    const isDesktop = metrics.vw >= desktopBreakpoint;
    const isMobile = metrics.vw < tabletBreakpoint;

    const desktopSelectedCoords = useMemo(() => {
        const centralCol = Math.floor((metrics.numCols + 1) / 2);
        return [
            [1, centralCol],
            [2, centralCol],
            [2, centralCol - 1],
            [3, centralCol - 1],
            [3, centralCol - 2],
            [4, centralCol - 2],
            [4, centralCol - 3],
            [5, centralCol],
            [4, centralCol],
            [4, centralCol + 1],
            [3, centralCol + 1],
            [3, centralCol + 2],
        ];
    }, [metrics.numCols]);

    const mobileSelectedCoords = useMemo(() => {
        const n = metrics.numCols || 1;
        return [
            [2, n],
            ...Array.from({ length: n }, (_, i) => [3, i + 1]),
            [4, 1],
            ...Array.from({ length: n - 1 }, (_, i) => [5, i + 2]),
            [6, 1],
            [6, 2],
        ];
    }, [metrics.numCols]);

    const selectedCoords = isDesktop
        ? desktopSelectedCoords
        : mobileSelectedCoords;

    // Row count can also be responsive
    const rowCount = isDesktop ? 5 : 7;

    useEffect(() => {
        function update() {
            const vh = window.innerHeight;
            const vw = window.innerWidth;
            const h = vh - 2 * borderThickness;
            const rowHeight = h / rowCount;
            const numCols = Math.max(1, Math.floor(vw / rowHeight));
            const colWidth = rowHeight;
            const remainingSpace = vw - numCols * colWidth;
            const sideMargin = remainingSpace / 2;
            setMetrics({ h, rowHeight, colWidth, numCols, sideMargin, vw });
        }
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, [rowCount]); // isDesktop dependency is implicitly handled by rowCount

    function isSelected(row, col) {
        return selectedCoords.some(([r, c]) => r === row && c === col);
    }

    const { h, rowHeight, colWidth, numCols, sideMargin } = metrics;

    const centralRow = Math.ceil(rowCount / 2);
    const centralCol = Math.ceil(numCols / 2);

    const plusBarLength = rowHeight / 3.5;
    const plusBarThickness = 3;

    const tiles = [];
    for (let r = 0; r < rowCount; r++) {
        for (let c = 0; c < numCols; c++) {
            const row1 = r + 1;
            const col1 = c + 1;
            const showPlus = row1 === centralRow && col1 === centralCol;

            const borderTop = r === 0 ? "1px solid #888" : "none";
            const borderLeft = "1px solid #888";
            const borderRight = c === numCols - 1 ? "1px solid #888" : "none";
            const borderBottom = "1px solid #888";
            const background = isSelected(row1, col1) ? "transparent" : "#fff";
            const backdropFilter = isSelected(row1, col1) ? "none" : "blur(4px)";

            tiles.push(
                <div
                    key={`${r}-${c}`}
                    className="absolute flex items-center justify-center transition-all hover:bg-white/30 rounded-lg"
                    style={{
                        width: `${colWidth}px`,
                        height: `${rowHeight}px`,
                        left: `${sideMargin + c * colWidth}px`,
                        top: `${borderThickness + r * rowHeight}px`,
                        borderTop,
                        borderRight,
                        borderBottom,
                        borderLeft,
                        background,
                        backdropFilter,
                        position: "absolute",
                    }}
                >
                    {showPlus && (
                        <>
                            {/* Vertical bar */}
                            <div
                                style={{
                                    position: "absolute",
                                    width: `${plusBarThickness}px`,
                                    height: `${plusBarLength}px`,
                                    background: "#292929",
                                    left: "50%",
                                    top: `calc(50% - ${plusBarLength / 2}px)`,
                                    transform: "translateX(-50%)",
                                    borderRadius: "2px",
                                    zIndex: 30,
                                }}
                            />
                            {/* Horizontal bar */}
                            <div
                                style={{
                                    position: "absolute",
                                    width: `${plusBarLength}px`,
                                    height: `${plusBarThickness}px`,
                                    background: "#292929",
                                    top: "50%",
                                    left: `calc(50% - ${plusBarLength / 2}px)`,
                                    transform: "translateY(-50%)",
                                    borderRadius: "2px",
                                    zIndex: 30,
                                }}
                            />
                        </>
                    )}
                </div>
            );
        }
    }

    // **NEW**: Create a dynamic style object for the button
    const getButtonStyle = () => {
        const baseStyle = {
            position: "absolute",
            opacity: 1,
            zIndex: 20,
            cursor: "pointer",
        };

        if (isDesktop) {
            return {
                ...baseStyle,
                width: colWidth * 0.75,
                height: colWidth * 0.25,
                top: colWidth * 4.5,
                left: colWidth * 0.6,
                scale: 1,
            };
        } else if (isTablet) {
            // For "in-between" devices, position on the left
            return {
                ...baseStyle,
                width: colWidth * 0.75,
                height: colWidth * 0.25,
                bottom: colWidth * 0.7,
                left: colWidth * 1.2, // Use `left` instead of `right`
                scale: 0.9,
            };
        } else { // Mobile
            return {
                ...baseStyle,
                width: colWidth * 0.5,
                height: colWidth * 0.2,
                top: colWidth * 5.5,
                right: colWidth * 0.8,
                scale: 0.75,
            };
        }
    };


    return (
        <section
            className="relative w-full h-screen overflow-x-hidden"
            style={{
                backgroundImage: "url('/images/expo_bg.png')",
                backgroundSize: "auto 100%",
                backgroundPosition: "center",
            }}
        >
            {/* Top white border */}
            <div
                style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: "100%",
                    height: `${borderThickness}px`,
                    background: "#fff",
                    zIndex: 10,
                }}
            />
            {/* Bottom white border */}
            <div
                style={{
                    position: "absolute",
                    left: 0,
                    top: `calc(100vh - ${borderThickness}px)`,
                    width: "100%",
                    height: `${borderThickness}px`,
                    background: "#fff",
                    zIndex: 10,
                }}
            />

            {/* Pseudo tiles on the left */}
            {Array.from({ length: rowCount }, (_, row) => (
                <div
                    key={"left-" + row}
                    style={{
                        position: "absolute",
                        top: borderThickness + row * rowHeight,
                        left: 0,
                        height: rowHeight,
                        width: sideMargin,
                        background: "#fff",
                        borderTop: row === 0 ? "1px solid #888" : "none",
                        borderBottom: "1px solid #888",
                        boxSizing: "border-box",
                        zIndex: 15,
                    }}
                />
            ))}

            {/* Pseudo tiles on the right */}
            {Array.from({ length: rowCount }, (_, row) => (
                <div
                    key={"right-" + row}
                    style={{
                        position: "absolute",
                        top: borderThickness + row * rowHeight,
                        left: sideMargin + numCols * colWidth,
                        height: rowHeight,
                        width: sideMargin,
                        background: "#fff",
                        borderTop: row === 0 ? "1px solid #888" : "none",
                        borderBottom: "1px solid #888",
                        boxSizing: "border-box",
                        zIndex: 15,
                    }}
                />
            ))}

            {/* H1 */}
            <h1
                style={{
                    position: "absolute",
                    top: isMobile ? colWidth * 0.48 : colWidth * 0.38,
                    left: isMobile ? colWidth * 0.6 : colWidth * 0.75,
                    margin: 0,
                    fontFamily: "SCHABO, sans-serif",
                    fontWeight: 400,
                    fontStyle: "normal",
                    fontSize: isMobile ? "5rem" : `${colWidth * 0.85}px`,
                    lineHeight: isMobile ? "5rem" : `${colWidth * 0.85}px`,
                    letterSpacing: "4%",
                    verticalAlign: "middle",
                    color: "#000",
                    zIndex: 50,
                    whiteSpace: "normal",
                    maxHeight: isMobile ? "12rem" : colWidth * 2,
                    overflow: "hidden",
                    userSelect: "none",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
                dangerouslySetInnerHTML={{ __html: "INTERFACE<br/>EXPO" }}
            />

            {/* Paragraph 1 - desktop and tablet */}
            {(isDesktop || isTablet) && (
                <p className={`${someFont.className}`}
                   style={{
                       position: "absolute",
                       top: colWidth * 0.25,
                       left: (centralCol + 0.5) * colWidth,
                       right: colWidth * 0.75,
                       maxHeight: 21 * 9 + "px",
                       overflow: "hidden",
                       fontWeight: 500,
                       fontStyle: "normal",
                       fontSize: "19px",
                       lineHeight: "21px",
                       letterSpacing: "2%",
                       verticalAlign: "middle",
                       color: "#000",
                       margin: 0,
                       zIndex: 50,
                       userSelect: "none",
                   }}
                >
                    National Institute of Technology, Calicut, presents Tathva Interface -
                    Asia&apos;s largest student-run Tech Startup Expo. We at the Tathva
                    Interface aim to provide a platform for all-entrepreneurs, established
                    companies, start-ups.
                </p>
            )}

            {/* Paragraph 2 */}
            <p className={`${someFont.className}`}
               style={{
                   position: "absolute",
                   fontWeight: 500,
                   fontStyle: "normal",
                   fontSize: isMobile ? "16px" : "19px",
                   lineHeight: isMobile ? "13px" : "21px",
                   letterSpacing: "2%",
                   verticalAlign: "middle",
                   color: "#000",
                   margin: 0,
                   zIndex: 50,
                   bottom: isMobile ? "auto" : colWidth * 1.35,
                   right: isMobile ? colWidth * 0.35 : colWidth * 0.9,
                   left: isMobile ? colWidth * 0.45 : (centralCol + 1.5) * colWidth,
                   top: isMobile ? borderThickness + 6 * rowHeight + colWidth * 0.25 : "auto",
                   textAlign: "left",
                   maxWidth: isMobile ? "80%" : 400,
                   padding: isMobile ? "0 10px" : 0,
                   maxHeight: 21 * 4 + "px",
                   userSelect: "none",
               }}
            >
                Tathva&apos;22 Interface is all about technology, the trending, the
                innovations, the age-old, and many more.
            </p>

            {/* Button */}
            <div style={getButtonStyle()}>
                <DotGridButton
                    text="Learn More"
                    min_width={isMobile ? colWidth * 0.5 : colWidth * 1.5}
                />
            </div>

            {/* Actual grid tiles */}
            <div className="absolute top-0 left-0 w-full h-full" style={{ zIndex: 15 }}>
                {tiles}
            </div>
        </section>
    );
}