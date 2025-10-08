'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
const Lines = () => {
    const svgRef = useRef(null);

    useEffect(() => {
        const svg = svgRef.current;
        if (!svg) return;

        // Get all path elements
        const paths = svg.querySelectorAll('path');

        // Set initial state - paths are invisible (stroke-dasharray technique)
        paths.forEach(path => {
            const length = path.getTotalLength();
            path.style.strokeDasharray = length;
            path.style.strokeDashoffset = length;
            path.style.opacity = '1';
        });

        // Create automatic animation on page load
        gsap.to(paths, {
            strokeDashoffset: 0,
            duration: 2,
            ease: 'power2.out',
            stagger: 0.1,
            delay: 0.5
        });

    }, []);

    return (
        <div className="w-full h-full flex items-center justify-center">
            <svg
                ref={svgRef}
                viewBox="0 0 1724 1117"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full max-w-[95vw] max-h-[95vh] md:max-w-[90vw] md:max-h-[90vh]"
                preserveAspectRatio="xMidYMid meet"
            >
                {/* All paths - responsive stroke widths */}
               <path d="M862 558.5C859.357 273.783 913.029 142.425 1140.05 -24.215" stroke="black" strokeOpacity="0.7" strokeWidth="5" />
                    <path d="M862 558.5C1027.5 257 1119 126.5 1398 30" stroke="black" strokeOpacity="0.7" strokeWidth="5" />
                    <path d="M862 558.5C1027.5 257 1523.5 374.5 1560 152.5" stroke="black" strokeOpacity="0.7" strokeWidth="5" />
                    <path d="M862 558.5C1157 558.5 1450 231.5 1673 390" stroke="black" strokeOpacity="0.7" strokeWidth="5" />
                    <path d="M862 558.5C1157 558.5 1384.5 719 1431 973.5" stroke="black" strokeOpacity="0.7" strokeWidth="5" />
                    <path d="M862 558.5C521.5 458.498 352 236.998 -42 121.998" stroke="black" strokeOpacity="0.7" strokeWidth="5" />
                    <path d="M862 558.5C510.5 614.998 552 765.498 609 965" stroke="black" strokeOpacity="0.7" strokeWidth="5" />
                    <path d="M862 558.5C510.5 614.998 601.5 1176 -62.5 767.998" stroke="black" strokeOpacity="0.7" strokeWidth="5" />
                    <path d="M862 558.5C666.5 726.998 779 814.498 582 981.5" stroke="black" strokeOpacity="0.7" strokeWidth="5" />
                    <path d="M862 558.5C710.5 729.498 896.5 814.498 606.5 965" stroke="black" strokeOpacity="0.7" strokeWidth="5" />
                    <path d="M862 558.5C862 604.164 916.5 817.5 891.5 970.5" stroke="black" strokeOpacity="0.7" strokeWidth="5" />
                    <path d="M862 558.5C992.5 647.5 1113 853 1140 973.5" stroke="black" strokeOpacity="0.7" strokeWidth="5" />
                    <path d="M862 558.5C713 349.498 300 -12.002 92 -124.002" stroke="black" strokeOpacity="0.7" strokeWidth="5" />

                {/* Starting dot - larger on mobile */}
                <circle
                    cx="862"
                    cy="558.5"
                    className="r-[5px] md:r-[3px] lg:r-[3px]"
                    fill="black"
                />
            </svg>
        </div>
    );
};

export default Lines;
