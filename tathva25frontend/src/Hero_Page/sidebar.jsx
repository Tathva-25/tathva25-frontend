"use client";
import { useState, useEffect } from "react";
import { Hero } from "@/Hero_Page/hero";


export default function Sidebar() {
    const items = [
        { num: 1, label: "Main" },
        { num: 2, label: "GPC" },
        { num: 3, label: "Robowars" },
        { num: 4, label: "Gallery" },
        { num: 5, label: "Contact" },
    ];

    const [hovered, setHovered] = useState(null);
    const [scrollProgress, setScrollProgress] = useState({});
    const [activeSection, setActiveSection] = useState(1);
    const [expandedSection, setExpandedSection] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            const sections = items.map((item) =>
                document.getElementById(`section-${item.num}`)
            );

            const windowHeight = window.innerHeight;
            const scrollTop = window.scrollY;

            let newProgress = {};
            let newActiveSection = 1;
            let closestSection = 1;
            let minDistance = Infinity;

            sections.forEach((section, index) => {
                if (!section) return;

                const rect = section.getBoundingClientRect();
                const sectionTop = scrollTop + rect.top;
                const sectionHeight = rect.height;
                const sectionBottom = sectionTop + sectionHeight;

                // Calculate distance from center of viewport
                const sectionCenter = sectionTop + sectionHeight / 2;
                const viewportCenter = scrollTop + windowHeight / 2;
                const distance = Math.abs(sectionCenter - viewportCenter);

                // Find closest section to viewport center
                if (distance < minDistance) {
                    minDistance = distance;
                    closestSection = index + 1;
                }

                // Check if section is in viewport
                if (scrollTop >= sectionTop - windowHeight / 2 && scrollTop < sectionBottom) {
                    newActiveSection = index + 1;

                    // Calculate progress within this section
                    const sectionScrolled = scrollTop - sectionTop + windowHeight / 2;
                    const progress = Math.min(Math.max((sectionScrolled / sectionHeight) * 100, 0), 100);
                    newProgress[index + 1] = progress;
                }
            });

            setActiveSection(newActiveSection);
            setExpandedSection(closestSection);
            setScrollProgress(newProgress);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <aside className="fixed top-0 left-0 h-screen w-12 z-50 bg-transparent">
                {/* outer borders */}
                <div className="absolute inset-y-0 left-0 w-full pointer-events-none">
                    <div className="h-full border-l border-black/90" />
                    <div className="absolute inset-y-0 right-0 w-px border-r border-black/90" />
                </div>

                {/* content */}
                <div className="relative h-full flex flex-col justify-between items-center py-3">
                    {/* rotated title */}
                    <div className="mt-16">
                        <div
                            className="font-mono text-[20px] whitespace-nowrap mt-35"
                            style={{
                                transform: "rotate(90deg)",
                                transformOrigin: "center",
                                letterSpacing: "0.45em",
                            }}
                        >
                            Welcome (TATHVA 25);
                        </div>
                    </div>

                    {/* numbered boxes */}
                    <div className="w-full">
                        {items.map((item, i) => {
                            const progress = scrollProgress[item.num] || 0;
                            const isActive = activeSection === item.num;
                            const isExpanded = expandedSection === item.num || hovered === item.num;

                            return (
                                <div
                                    key={item.num}
                                    onMouseEnter={() => setHovered(item.num)}
                                    onMouseLeave={() => setHovered(null)}
                                    className={`group relative w-full border-t border-black/90 flex flex-col items-center justify-start overflow-hidden transition-all duration-300 ease-in-out ${i === items.length - 1 ? "border-b border-black/90" : ""
                                        } ${isExpanded ? "bg-black/5" : ""}`}
                                    style={{
                                        maxHeight: isExpanded ? "140px" : "36px",
                                    }}
                                >
                                    {/* Progress fill */}
                                    <div
                                        className="absolute inset-0 bg-black transition-all duration-150 ease-out"
                                        style={{
                                            height: isActive ? `${progress}%` : "0%",
                                            opacity: isActive ? 0.85 : 0,
                                        }}
                                    />

                                    {/* Content */}
                                    <div className="relative z-10 w-full flex flex-col items-center">
                                        {/* number - rotated */}
                                        <span
                                            className={`font-mono text-[20px] inline-block mt-1 transition-all duration-300 ${isActive && progress > 30 ? "text-white" : "text-black"
                                                }`}
                                            style={{ transform: "rotate(90deg)" }}
                                        >
                                            {String(item.num).padStart(2, "0")}/
                                        </span>

                                        {/* label below number - vertical */}
                                        <div className="w-full flex justify-center mt-2 mb-5">
                                            <div
                                                className={`font-mono text-[16px] whitespace-nowrap transition-all duration-300 ${isExpanded
                                                    ? "opacity-100 translate-y-0"
                                                    : "opacity-0 -translate-y-2"
                                                    }`}
                                                style={{
                                                    writingMode: "vertical-rl",
                                                    textOrientation: "mixed",
                                                }}
                                            >
                                                {item.label.split("").map((letter, idx) => {
                                                    const letterHeight = 100 / item.label.length;
                                                    const letterPosition = (idx * letterHeight) + (letterHeight / 2);
                                                    const isCovered = isActive && progress > letterPosition;

                                                    return (
                                                        <span
                                                            key={idx}
                                                            className="transition-colors duration-150"
                                                            style={{
                                                                color: isCovered ? "white" : "black",
                                                            }}
                                                        >
                                                            {letter}
                                                        </span>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </aside>

            {/* Main content sections */}
            <div className="ml-12">
                {/* Hero Section */}
                <section id="section-1" className="min-h-screen">
                    <Hero />
                </section>

                {/* GPC Section */}
                <section id="section-2" className="min-h-screen flex items-center justify-center bg-gray-50">
                    <div className="text-center">
                        <h2 className="text-6xl font-bold mb-4">GPC</h2>
                        <p className="text-xl text-gray-600">GPC Section - Add your GPC component here</p>
                        {/* <GPC /> */}
                    </div>
                </section>

                {/* Robowars Section */}
                <section id="section-3" className="min-h-screen flex items-center justify-center bg-gray-100">
                    <div className="text-center">
                        <h2 className="text-6xl font-bold mb-4">Robowars</h2>
                        <p className="text-xl text-gray-600">Robowars Section - Add your Robowars component here</p>
                        {/* <Robowars /> */}
                    </div>
                </section>

                {/* Gallery Section */}
                <section id="section-4" className="min-h-screen flex items-center justify-center bg-gray-50">
                    <div className="text-center">
                        <h2 className="text-6xl font-bold mb-4">Gallery</h2>
                        <p className="text-xl text-gray-600">Gallery Section</p>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="section-5" className="min-h-screen flex items-center justify-center bg-gray-100">
                    <div className="text-center">
                        <h2 className="text-6xl font-bold mb-4">Contact</h2>
                        <p className="text-xl text-gray-600">Contact Section</p>
                    </div>
                </section>

                {/* Footer Section */}
                <section id="section-footer" className="min-h-screen flex items-center justify-center bg-black text-white">
                    <div className="text-center">
                        <h2 className="text-6xl font-bold mb-4">Footer</h2>
                        <p className="text-xl text-gray-400">Footer Section</p>
                    </div>
                </section>
            </div>
        </>
    );
}