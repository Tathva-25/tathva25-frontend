import React from 'react';
import Image from 'next/image';
import { Michroma } from 'next/font/google';

// ---
// ASSET IMPORTS
// ---

// Desktop-specific assets
import Background from "../../../public/images/backgroundfooter.png";
import Card1 from "../../../public/images/card1.png";
import Card2 from "../../../public/images/card2.png";
import Line from "../../../public/images/line.png";

// Mobile-specific assets
import CardMobile from "../../../public/images/cardMobile.png";
import Arrow from "../../../public/images/arrow.png";

// Common assets
import Tathvalogo from "../../../public/images/tathvawhitelogo.png";
import Fb from "../../../public/images/facebook.png";
import Insta from "../../../public/images/instagram.png";
import Linkd from "../../../public/images/linkedin.png";

const michroma = Michroma({ subsets: ["latin"], weight: "400" });

// --- HELPER COMPONENTS (REUSABLE) ---

import { HiArrowNarrowRight } from "react-icons/hi"; 

const QuickLink = ({ href = "#", children, showArrow = false }) => (
  <a
    href={href}
    className={`flex items-center gap-2 ${michroma.className} text-[clamp(0.7rem,_1vw,_0.875rem)] hover:text-yellow-400 text-left text-white/90 transition-colors duration-200`}
  >
    {showArrow && (
      <HiArrowNarrowRight className="w-4 h-4   -rotate-45 transition-transform duration-200 group-hover:translate-x-1" />
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
const DesktopFooter = () => (
    <footer
        className={`hidden lg:block relative w-full ${michroma.className} text-white `}
        style={{
            backgroundImage: `url(${Background.src})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'bottom',
        }}
    >
        <div className="relative w-full max-w-screen-xl mx-auto px-8 py-16">
            <div className="flex flex-row gap-8">
                {/* === Left Card === */}
                <div className="w-1/3 relative">
                    <Image
                        src={Card1}
                        alt="Card 1"
                        className="w-full h-auto"
                        priority
                    />
                    <div className="absolute inset-0 px-[20%] py-[15%] flex flex-col justify-between">
                        <div>
                            <Image src={Tathvalogo} alt="Tathva Logo" width={80} height={80} />
                            <h3 className="text-[clamp(1rem,_1.5vw,_1.25rem)] mt-1">Stay Informed</h3>
                        </div>
                        <div className="text-[clamp(0.7rem,_1vw,_0.875rem)]">
                            <span className="text-yellow-400">[CONTACT]</span>
                            <p>EMAIL: support@tathva.org</p>
                        </div>
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
                    <Image
                        src={Card2}
                        alt="Card 2"
                        className="w-full h-auto"
                        priority
                    />
                    <div className="absolute top-[15%] bottom-[15%] left-[50%] right-[10%] flex flex-col justify-between">
                        <div>
                            <h4 className="text-[clamp(0.9rem,_1.2vw,_1.125rem)] text-yellow-400 mb-4">[QUICK LINKS]</h4>
                            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                                <QuickLink href="/">Home</QuickLink>
                                <QuickLink>Map</QuickLink>
                                <QuickLink href="/lectures">Lectures</QuickLink>
                                <QuickLink href="/passes">Passes</QuickLink>
                                <QuickLink href="/announcements">Announcements</QuickLink>
                                <QuickLink>Team</QuickLink>
                                <QuickLink href="/workshops">Workshops</QuickLink>
                                <QuickLink href="/profile">Profile</QuickLink>
                                <QuickLink href="/accomodation">Accomodation</QuickLink>
                            </div>
                        </div>
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
const MobileFooter = () => (
    <footer
        className={`lg:hidden relative w-full ${michroma.className} text-white flex justify-center py-12`}
        style={{
            backgroundImage: `url(${Background.src})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
        }}
    >
        <div className="relative w-[90vw] max-w-sm">
            <Image
                src={CardMobile}
                alt="Mobile Footer Frame"
                width={400}
                height={600}
                className="w-full h-auto"
                priority
            />

            <div className="absolute inset-0 p-8 flex flex-col justify-between">
                {/* Top: Quick Links */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                    <QuickLink href="/" showArrow>Home</QuickLink>
                    <QuickLink showArrow>Map</QuickLink>
                    <QuickLink href="/lectures" showArrow>Lectures</QuickLink>
                    <QuickLink href="/passes" showArrow>Passes</QuickLink>
                    <QuickLink showArrow>Team</QuickLink>
                    <QuickLink href="/workshops" showArrow>Workshops</QuickLink>
                    <QuickLink href="/profile" showArrow>Profile</QuickLink>
                    <QuickLink href="/accomodation" showArrow>Accomodation</QuickLink>
                </div>

                {/* Middle: Contact & Logo */}
                <div className="flex justify-between items-center my-4">
                    <div className="flex-1">
                        <span className="text-yellow-400 text-base">[CONTACT]</span>
                        <p className="mt-1 text-sm">EMAIL: support@tathva.org</p>
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