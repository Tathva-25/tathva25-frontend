"use client";
import { useState, useEffect } from "react";
import Image from 'next/image';
import logo from '../../public/images/TATHVA25_LOGO.png';
import { Hero } from "@/Hero_Page/hero";
import Footer from "@/Hero_Page/footer";
import localfont from 'next/font/local';
import Menu from "@/Hero_Page/Menu"; // Import your Menu component

const someFont = localfont({
    src: '../../public/fonts/michroma.ttf',
    display: 'swap',
})

export default function Sidebar() {
    const items = [
        { num: 1, label: "Home" },
        { num: 2, label: "About" },
        { num: 3, label: "GPC" },
        { num: 4, label: "Robowars" },
        { num: 5, label: "Contact" },
    ];

    const [hovered, setHovered] = useState(null);
    const [scrollProgress, setScrollProgress] = useState({});
    const [activeSection, setActiveSection] = useState(1);
    const [expandedSection, setExpandedSection] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [overallProgress, setOverallProgress] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false); // State for menu overlay

    useEffect(() => {
        const handleScroll = () => {
            const sections = items.map((item) =>
                document.getElementById(`section-${item.num}`)
            );

            const windowHeight = window.innerHeight;
            const scrollTop = window.scrollY;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;

            // Calculate overall scroll progress
            const progress = (scrollTop / documentHeight) * 100;
            setOverallProgress(progress);

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

                const sectionCenter = sectionTop + sectionHeight / 2;
                const viewportCenter = scrollTop + windowHeight / 2;
                const distance = Math.abs(sectionCenter - viewportCenter);

                if (distance < minDistance) {
                    minDistance = distance;
                    closestSection = index + 1;
                }

                if (scrollTop >= sectionTop - windowHeight / 2 && scrollTop < sectionBottom) {
                    newActiveSection = index + 1;
                    const sectionScrolled = scrollTop - sectionTop + windowHeight / 2;
                    const progress = Math.min(Math.max((sectionScrolled / sectionHeight) * 100, 0), 100);
                    newProgress[index + 1] = progress;
                }
            });

            setActiveSection(newActiveSection);
            setExpandedSection(closestSection);
            setScrollProgress(newProgress);
        };

        // Only add scroll event listener if menu is not open
        if (!menuOpen) {
            window.addEventListener("scroll", handleScroll);
            handleScroll();
        }

        return () => window.removeEventListener("scroll", handleScroll);
    }, [menuOpen]);

    const scrollToSection = (num) => {
        const section = document.getElementById(`section-${num}`);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
            setMobileMenuOpen(false);
        }
    };

    // Handler for menu button click
    const handleMenuButtonClick = () => {
        setMenuOpen(true);
    };

    // Handler for closing menu
    const handleCloseMenu = () => {
        setMenuOpen(false);
    };

    return (
        <>
            {/* Menu Overlay */}
            {menuOpen && (
                <Menu onClose={handleCloseMenu} />
            )}

            {/* Desktop Sidebar */}
            <aside className={`fixed top-0 left-0 h-screen w-12 z-50 bg-transparent ${someFont.className} ${menuOpen ? 'hidden md:block' : 'hidden md:block'}`}>
                <div className="absolute inset-y-0 left-0 w-full pointer-events-none">
                    <div className="h-full border-l border-black/90" />
                    <div className="absolute inset-y-0 right-0 w-px border-r border-black/90" />
                </div>

                <div className="relative h-full flex flex-col justify-between items-center py-3">
                    {/* Menu Button at Top */}
                    <div className="mt-4">
                        <button
                            onClick={handleMenuButtonClick}
                            className="w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-black/5 rounded transition-colors duration-200"
                            aria-label="Menu"
                        >
                            <svg
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M3 12h18M3 6h18M3 18h18" />
                            </svg>
                        </button>
                    </div>

                    <div className="mt-16">
                        <div
                            className="text-[20px] whitespace-nowrap mt-10"
                            style={{
                                transform: "rotate(90deg)",
                                transformOrigin: "center",
                                letterSpacing: "0.45em",
                            }}
                        >
                            TATHVA 25;
                        </div>
                    </div>

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
                                    onClick={() => scrollToSection(item.num)}
                                    className={`group relative w-full border-t border-black/90 flex flex-col items-center justify-start overflow-hidden transition-all duration-300 ease-in-out cursor-pointer ${i === items.length - 1 ? "border-b border-black/90" : ""
                                        } ${isExpanded ? "bg-black/5" : ""}`}
                                    style={{
                                        maxHeight: isExpanded ? "150px" : "45px",
                                    }}
                                >
                                    <div
                                        className="absolute inset-0 bg-black transition-all duration-150 ease-out"
                                        style={{
                                            height: isActive ? `${progress}%` : "0%",
                                            opacity: isActive ? 0.85 : 0,
                                        }}
                                    />

                                    <div className="relative z-10 w-full flex flex-col items-center">
                                        <span
                                            className={`text-[16px] inline-block mt-[10px] transition-all duration-300 ${isActive && progress > 30 ? "text-white" : "text-black"}`}
                                            style={{ transform: "rotate(90deg)" }}
                                        >
                                            {String(item.num).padStart(2, "0")}/
                                        </span>

                                        <div className="w-full flex justify-center mt-2 mb-5">
                                            <div
                                                className={`text-[16px] whitespace-nowrap transition-all duration-300 ${isExpanded
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

            {/* Mobile Menu Bar */}
            <div className={`md:hidden fixed top-0 left-0 right-0 z-40 bg-white border-black ${someFont.className}`}>
                <div className="flex items-center justify-between px-4 py-3 border-b border-black">
                    {/* Logo - Smaller and positioned beside the menu */}
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 flex-shrink-0">
                            <Image
                                src={logo.src}
                                alt="Tathva Logo"
                                width={32}
                                height={32}
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div className="text-sm tracking-wider">
                            WELCOME (TATHVA 25);
                        </div>
                    </div>

                    {/* Menu Button */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="w-8 h-8 flex items-center justify-center"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? (
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M3 12h18M3 6h18M3 18h18" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Scroll Progress Bar - Mobile Only */}
                <div className="w-full h-1 border-0">
                    <div
                        className="bg-black h-full transition-all duration-150 ease-out"
                        style={{ width: `${overallProgress}%` }}
                    />
                </div>

                {/* Mobile Menu Dropdown */}
                <div
                    className={`bg-white overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? "max-h-screen" : "max-h-0"
                        }`}
                >
                    {items.map((item, i) => (
                        <button
                            key={item.num}
                            onClick={() => scrollToSection(item.num)}
                            className={`w-full text-left px-4 py-4 text-sm hover:bg-gray-50 transition-colors ${activeSection === item.num ? "bg-gray-100" : ""
                                }`}
                        >
                            {String(item.num).padStart(2, "0")}/ {item.label.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content Sections */}
            <div className={`md:ml-12 ${menuOpen ? 'blur-sm pointer-events-none' : ''}`}>
                {/* Hero Section */}
                <section id="section-1">
                    <Hero />
                </section>

                {/* About Section */}
                <section
                    id="section-2"
                    className=" bg-green-50"
                >
                    <div className="min-h-screen flex items-center justify-center text-center">
                        <h2 className="text-6xl font-bold mb-4">About</h2>
                        <p className="text-xl text-gray-600">Grand Prix Challenge</p>
                    </div>
                </section>

                {/* GPC Section */}
                <section
                    id="section-3"
                    className="min-h-screen flex items-center justify-center bg-blue-50"
                >
                    <div className="text-center">
                        <h2 className="text-6xl font-bold mb-4">GPC</h2>
                        <p className="text-xl text-gray-600">Grand Prix Challenge</p>
                    </div>
                </section>

                {/* Robowars Section */}
                <section
                    id="section-4"
                    className="min-h-screen flex items-center justify-center bg-red-50"
                >
                    <div className="text-center">
                        <h2 className="text-6xl font-bold mb-4">Robowars</h2>
                        <p className="text-xl text-gray-600">Battle of the Bots</p>
                    </div>
                </section>

                {/* Contact Section */}
                <section
                    id="section-5"
                    className="min-h-screen flex items-center justify-center bg-gray-100"
                >
                    <div className="text-center">
                        <h2 className="text-6xl font-bold mb-4">Contact</h2>
                        <p className="text-xl text-gray-600">Get in Touch</p>
                    </div>
                </section>
                <section>
                    <Footer />
                </section>
            </div>
        </>
    );
}