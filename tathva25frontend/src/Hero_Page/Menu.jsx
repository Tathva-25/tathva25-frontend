"use client";
import { useEffect } from "react";

export default function Menu({ onClose }) {
    // Prevent background scroll when menu is open
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);

    const menuSections = [
        {
            title: "Events",
            items: [
                "Technical Events",
                "Workshops",
                "Exhibitions",
                "Lectures",
                "Competitions"
            ]
        },
        {
            title: "Information",
            items: [
                "Schedule",
                "Venues",
                "Map",
                "Accommodation",
                "Transport"
            ]
        },
        {
            title: "Connect",
            items: [
                "Sponsors",
                "Partners",
                "Team",
                "Volunteer",
                "Contact"
            ]
        },
        {
            title: "Media",
            items: [
                "Gallery",
                "Videos",
                "News",
                "Social Media",
                "Press Kit"
            ]
        }
    ];

    return (
        <div className="fixed inset-0 z-50 bg-white">
            {/* Header */}
            <div className="border-b border-black">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="text-2xl font-bold tracking-widest">TATHVA 25</div>
                    <button
                        onClick={onClose}
                        className="w-12 h-12 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 rounded-full border border-black"
                        aria-label="Close menu"
                    >
                        <svg
                            className="w-6 h-6"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Main Menu Content */}
            <div className="container mx-auto px-6 py-12 h-[calc(100vh-80px)] overflow-y-auto">
                {/* Welcome Section */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                        WELCOME TO
                        <br />
                        <span className="text-gray-800">TATHVA 25</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        India's largest techno-management festival presented by NIT Calicut
                    </p>
                </div>

                {/* Menu Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    {menuSections.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="group">
                            <h3 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-black group-hover:border-blue-500 transition-colors duration-300">
                                {section.title}
                            </h3>
                            <ul className="space-y-3">
                                {section.items.map((item, itemIndex) => (
                                    <li key={itemIndex}>
                                        <button className="text-lg hover:text-blue-600 hover:translate-x-2 transition-all duration-200 w-full text-left py-2">
                                            {item}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Quick Links */}
                <div className="border-t border-gray-300 pt-12">
                    <h3 className="text-2xl font-bold mb-8 text-center">Quick Links</h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        {[
                            "Register Now",
                            "Download App",
                            "Get Merchandise",
                            "FAQ",
                            "Live Updates"
                        ].map((link, index) => (
                            <button
                                key={index}
                                className="px-6 py-3 border-2 border-black bg-black text-white hover:bg-white hover:text-black transition-all duration-300 font-semibold"
                            >
                                {link}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Footer Info */}
                <div className="mt-16 text-center text-gray-600">
                    <p className="text-sm">
                        October 2024 • NIT Calicut Campus • Kozhikode, Kerala
                    </p>
                    <div className="flex justify-center space-x-6 mt-4">
                        {["Instagram", "Twitter", "Facebook", "LinkedIn", "YouTube"].map((social, index) => (
                            <button
                                key={index}
                                className="text-sm hover:text-black transition-colors duration-200"
                            >
                                {social}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Background Pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-5">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500" />
            </div>
        </div>
    );
}