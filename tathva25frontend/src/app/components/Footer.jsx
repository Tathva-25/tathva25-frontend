import React from 'react';
import Image from 'next/image';
import { Michroma } from 'next/font/google';

// ---
// ASSET IMPORTS
// ---

// Desktop-specific assets
import Background from "../../../public/images/backgroundfooter.png"; // Your image_c16508.jpg
import Card1 from "../../../public/images/card1.png"; // Your image_c16564.png
import Card2 from "../../../public/images/card2.png"; // Your image_c1652a.jpg
import Line from "../../../public/images/line.png"; // Your image_c164cb.png
import TopHorizontalLine from "../../../public/images/footerline.png";

// Mobile-specific assets
import BackgroundMobile from "../../../public/images/backgroundmobile.png"; // Your new image_c15dc8.png
import CardMobile from "../../../public/images/cardMobile.png"; // Your new image_c15daa.png
import Arrow from "../../../public/images/arrow.png"; // From your mobile design screenshot

// Common assets
import Tathvalogo from "../../../public/images/tathvawhitelogo.png";
import Fb from "../../../public/images/facebook.png";
import Insta from "../../../public/images/instagram.png";
import Linkd from "../../../public/images/linkedin.png";

const michroma = Michroma({ subsets: ["latin"], weight: "400" });

// --- HELPER COMPONENTS (REUSABLE) ---

// Semantic link for navigation
const QuickLink = ({ href = "#", children, showArrow = false }) => (
    <a
        href={href}
        className={`flex items-center gap-2 ${michroma.className} text-[clamp(0.7rem,_1vw,_0.875rem)] hover:text-yellow-400 text-left text-white/90 transition-colors duration-200`}
    >
        {showArrow && (
            <img src={Arrow.src} alt="" className="w-4 h-4" />
        )}
        <span>{children}</span>
    </a>
);

const SocialIcon = ({ href = "#", src, alt }) => (
    <a href={href} target="_blank" rel="noopener noreferrer">
        <Image
            src={src}
            alt={alt}
            width={24}
            height={24}
            className="w-6 h-6 object-contain transition-transform hover:scale-110"
        />
    </a>
);

// --- DESKTOP FOOTER ---
// This remains unchanged from the previous version.

// --- DESKTOP FOOTER (FIXED) ---

// --- DESKTOP FOOTER (FIXED) ---

// --- DESKTOP FOOTER (FIXED) ---

const DesktopFooter = () => (
    <footer
        className={`hidden lg:block relative w-full ${michroma.className} text-white mt-24`}
        style={{
            backgroundImage: `url(${Background.src})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'bottom', // <-- FIX: Aligned background to the bottom
        }}
    >
        {/* Container to center content */}
        <div className="relative w-full max-w-screen-xl mx-auto px-8 py-16">

            {/* TopHorizontalLine component removed as requested */}

            {/* Main flex container for the two cards (pt-16 removed) */}
            <div className="flex flex-row gap-8">

                {/* === Left Card === */}
                <div className="w-1/3 relative">
                    {/* 1. Base Image */}
                    <Image
                        src={Card1}
                        alt="Card 1"
                        className="w-full h-auto"
                        priority
                    />
                    {/* 2. Absolute Content Overlay */}
                    <div className="absolute inset-0 px-[20%] py-[15%] flex flex-col justify-between">

                        {/* Block 1: Logo + Form */}
                        <div>
                            <Image src={Tathvalogo} alt="Tathva Logo" width={80} height={80} />
                            <h3 className="text-[clamp(1rem,_1.5vw,_1.25rem)] mt-6 mb-2">Stay Informed</h3>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-transparent border-b border-white/50 w-full pb-2 outline-none placeholder:text-white/50 text-[clamp(0.7rem,_1vw,_0.875rem)]"
                            />
                        </div>

                        {/* Block 2: Contact Info */}
                        <div className="text-[clamp(0.7rem,_1vw,_0.875rem)]">
                            <span className="text-yellow-400">[CONTACT]</span>
                            <p>EMAIL: tathva2025@gmail.com</p>
                            <p>PHONE: +91 88888 88888</p>
                        </div>

                        {/* Block 3: Copyright */}
                        <div>
                            <div className="text-white/70 text-[clamp(0.7rem,_1vw,_0.875rem)]">
                                <p>© TATHVA 2025</p>
                                <div className="h-6"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* === Right Card === */}
                <div className="w-2/3 relative">
                    {/* 1. Base Image */}
                    <Image
                        src={Card2}
                        alt="Card 2"
                        className="w-full h-auto"
                        priority
                    />
                    {/* 2. Absolute Content Overlay */}
                    <div className="absolute top-[15%] bottom-[15%] left-[50%] right-[10%] flex flex-col justify-between">

                        {/* Top Block */}
                        <div>
                            <h4 className="text-[clamp(0.9rem,_1.2vw,_1.125rem)] text-yellow-400 mb-4">[QUICK LINKS]</h4>
                            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                                <QuickLink>Home</QuickLink>
                                <QuickLink>Map</QuickLink>
                                <QuickLink>Lectures</QuickLink>
                                <QuickLink>Contact</QuickLink>
                                <QuickLink>Events</QuickLink>
                                <QuickLink>Team</QuickLink>
                                <QuickLink>Workshops</QuickLink>
                                <QuickLink>FAQs</QuickLink>
                            </div>
                        </div>

                        {/* Bottom Block */}
                        <div>
                            <div className="w-full max-w-[200px] my-6">
                                <Image
                                    src={Line}
                                    alt="Divider"
                                    width={200}
                                    height={2}
                                    className="w-full h-auto"
                                />
                            </div>
                            <h4 className="text-[clamp(0.9rem,_1.2vw,_1.125rem)] text-yellow-400 mb-4 mt-8">[SOCIALS]</h4>
                            <div className="flex gap-8">
                                <SocialIcon src={Insta.src} alt="Instagram" />
                                <SocialIcon src={Fb.src} alt="Facebook" />
                                <SocialIcon src={Linkd.src} alt="LinkedIn" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* === Legal Links (Center Bottom) === */}
            <div className="flex justify-center gap-4 mt-12">
                <a href="#" className="border border-white/50 px-6 py-2 text-[clamp(0.75rem,_1vw,_0.875rem)] hover:bg-white/10 transition">
                    Privacy Policy
                </a>
                <a href="#" className="border border-white/50 px-6 py-2 text-[clamp(0.75rem,_1vw,_0.875rem)] hover:bg-white/10 transition">
                    Terms of Service
                </a>
            </div>
        </div>
    </footer>
);
// --- MOBILE FOOTER (UPDATED) ---
// Now uses your newly uploaded background and card images.

const MobileFooter = () => (
    <footer
        className={`lg:hidden relative w-full ${michroma.className} text-white flex justify-center py-12`}
        style={{
            backgroundImage: `url(${Background.src})`,
            backgroundRepeat: 'no-repeat', // <-- FIX 2: Changed from 'repeat'
            backgroundSize: 'cover',       // <-- FIX 2: Added 'cover'
        }}
    >
        {/* Relative container for the mobile card */}
        <div className="relative w-[90vw] max-w-sm">
            {/* 1. The Frame Image (Base Layer) */}
            <Image
                src={CardMobile} // <-- UPDATED
                alt="Mobile Footer Frame"
                width={400} // Use the image's natural width
                height={600} // Use the image's natural height
                className="w-full h-auto"
                priority
            />

            {/* 2. The Content Overlay (Flex Layer) */}
            <div className="absolute inset-0 p-8 flex flex-col justify-between">

                {/* Top: Quick Links */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                    <QuickLink showArrow>Home</QuickLink>
                    <QuickLink showArrow>Map</QuickLink>
                    <QuickLink showArrow>Lectures</QuickLink>
                    <QuickLink showArrow>Contact</QuickLink>
                    <QuickLink showArrow>Events</QuickLink>
                    <QuickLink showArrow>Team</QuickLink>
                    <QuickLink showArrow>Workshops</QuickLink>
                    <QuickLink showArrow>FAQs</QuickLink>
                </div>

                {/* Middle: Form & Logo */}
                <div className="flex justify-between items-center my-4">
                    <div className="flex-1">
                        <h3 className="text-base mb-2">Stay in the loop</h3>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="bg-transparent border-b border-white/50 w-full pb-1 text-sm outline-none placeholder:text-white/50"
                        />
                    </div>
                    <div className="w-16 ml-4">
                        <Image src={Tathvalogo} alt="Tathva Logo" width={64} height={64} />
                    </div>
                </div>

                {/* Bottom: Legal Links */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <a href="#" className="flex-1 text-center border border-white/50 px-4 py-2 text-xs rounded-lg hover:bg-white/10 transition">
                        Privacy Policy
                    </a>
                    <a href="#" className="flex-1 text-center border border-white/50 px-4 py-2 text-xs rounded-lg hover:bg-white/10 transition">
                        Terms of Service
                    </a>
                </div>
            </div>
        </div>
    </footer>
);


// --- Main Component Export ---
const YourComponent = () => {
    return (
        <>
            <DesktopFooter />
            <MobileFooter />
        </>
    );
};

export default YourComponent;