import React from 'react';
import Card1 from "../../public/images/card1.png"
import Card2 from "../../public/images/card2.png"
import Card3 from "../../public/images/card3.png"
import Planet from "../../public/images/planet.png"
import Fact from "../../public/images/facts.png"
import localfont from 'next/font/local';
import cardMobile from "../../public/images/card-mobile.png";

const customFont = localfont({
    src: '../../public/fonts/quantico-r.ttf',
})

const Footer = () => {
    return (
        <footer className="flex flex-col rbg-tran text-white p-0 md:p-[1.302vw]" style={customFont.style}>
            <div className="flex flex-col items-center ml-0 md:ml-[3.906vw]">
                {/* ========================================= */}
                {/* 1. Mobile-Only View (Default up to 'md' breakpoint) */}
                {/* ========================================= */}
                <div className="relative w-screen md:hidden -ml-[1.302vw] -mr-[1.302vw]">
                    <img src={cardMobile.src} alt="Mobile Footer Card" className="w-screen h-auto" />
                    <div className="absolute top-0 left-0 flex flex-col items-center justify-space text-center translate-y-[7.813vw] pr-[1.302vw]">
                        <div className='flex justify-center-safe ml-[0.521vw]'>
                            <div className='top-[5.208vw] ml-[-0.521vw] translate-y-0'>
                                {/* Stay in the loop and email */}
                                <h3 className="text-[3vw] font-semibold mb-[0.781vw] translate-x-[9vw] translate-y-[28vw]">Stay in the loop</h3>
                                <p className="text-[2.7vw] mb-[1.042vw] translate-x-[2vw] translate-y-[29vw]">Email:</p>
                                {/* Simplified Email Input */}
                                <div className="">
                                    <input
                                        type="email"
                                        placeholder="enter email"
                                        className="w-[25vw] px-[0.521vw] py-[0.521vw] translate-x-[10vw] translate-y-[27vw] text-[2vw] bg-transparent border-b-[0.104vw] border-white text-white placeholder-gray-300 placeholder-opacity-70 focus:outline-none focus:border-gray-200 transition-colors"
                                    />
                                </div>
                                <button className=" translate-x-[10vw] rounded-md translate-y-[30vw] px-[3vw] w-[20vw] round-2 bg-white text-black hover:bg-[#D9B64D]">
                                    Subscribe
                                </button>
                            </div>
                            <div className="grid grid-cols-2 gap-x-[3vw] gap-y-[0.260vw]">
                                <a href="#" className="hover:text-[#D9B64D] transition-colors text-[1.8vw] text-white -translate-y-[1vw] translate-x-[1.7vw]">Home</a>
                                <a href="#" className="hover:text-[#D9B64D] transition-colors text-[1.8vw] text-white -translate-y-[1vw] translate-x-[1.7vw]">Events</a>
                                <a href="#" className="hover:text-[#D9B64D] transition-colors text-[1.8vw] text-white -translate-y-[1vw] translate-x-[1.7vw]">Workshops</a>
                                <a href="#" className="hover:text-[#D9B64D] transition-colors text-[1.8vw] text-white -translate-y-[1vw] translate-x-[1.7vw]">Lectures</a>
                                <a href="#" className="hover:text-[#D9B64D] transition-colors text-[1.8vw] text-white -translate-y-[1vw] translate-x-[1.7vw]">Sponsors</a>
                                <a href="#" className="hover:text-[#D9B64D] transition-colors text-[1.8vw] text-white -translate-y-[1vw] translate-x-[1.7vw]">About Us</a>
                                <a href="#" className="hover:text-[#D9B64D] transition-colors text-[1.8vw] text-white -translate-y-[1vw] translate-x-[1.7vw]">Team</a>
                                <a href="#" className="hover:text-[#D9B64D] transition-colors text-[1.8vw] text-white -translate-y-[1vw] translate-x-[1.7vw]">Contact</a>
                            </div>
                        </div>
                        <div className="mt-[1.042vw] text-[2.5vw] translate-y-[31vw] translate-x-[10vw]">
                            <a href="#" className="hover:text-gray-700 transition-colors mr-[0.521vw] ">Terms and Policy</a>|
                            <a href="#" className="hover:text-gray-700 transition-colors ml-[0.521vw]">Privacy Policy</a>
                        </div>
                    </div>
                </div>

                {/* ========================================= */}
                {/* 2. Desktop/Tablet View (Visible from 'md' breakpoint and up) */}
                {/* ========================================= */}
                <div className="hidden sm:flex flex-col w-full ml-3">
                    {/* Top Section with decorative elements (Card1 & Card2) */}
                    <div className="flex flex-row w-full justify-center ">
                        {/* Left Section - Newsletter (Card 1) */}
                        <div className="relative">
                            <div>
                                <img src={Card1.src} alt="Newsletter card" />
                            </div>
                            {/* Overlay text and input */}
                            <div className="absolute inset-0 flex flex-col items-center pt-[4.167vw] px-[6.25vw]">
                                {/* Planet Image */}
                                <div className="mb-[1.042vw]">
                                    <img src={Planet.src} alt="Planet" className="w-auto h-[10vw] object-contain" />
                                </div>
                                <div className="top-[1.042vw]">
                                    {/* Stay in loop text */}
                                    <h3 className="text-[1.458vw] font-semibold mb-[1.042vw]">Stay in loop:</h3>

                                    {/* Email input section */}
                                    <div className="w-full max-w-[15.625vw]">
                                        <div className="flex flex-col gap-[0.521vw]">
                                            <label className="text-[1.5vw] font-medium">Email:</label>
                                            <input
                                                type="email"
                                                placeholder="enter your email"
                                                className="w-full px-[0.521vw] py-[0.521vw] bg-transparent border-b-[0.104vw] border-white text-white placeholder-gray-300 placeholder-opacity-70 focus:outline-none focus:border-gray-200 text-[1vw] transition-colors"
                                            />
                                            <button className=" rounded-md -translate-y-[0vw] translate-x-[1vw] py-[0.7vw] px-[3vw] w-[10vw] round-2 bg-white text-black hover:bg-[#D9B64D]">
                                                Subscribe
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Section - Navigation (Card 2) */}
                        <div className="relative">
                            <div>
                                <img src={Card2.src} alt="Navigation card" />
                            </div>
                            {/* Navigation Links Overlay */}
                            <div className="absolute inset-[7.813vw] flex items-center justify-center px-[1.042vw] right-[1.042vw] mt-[5.208vw] bottom-[1.302vw]">
                                <div className="grid grid-cols-2 gap-x-[3vw] gap-y-[0.260vw]">
                                    <a href="#" className="hover:text-[#D9B64D] transition-colors text-[1.8vw] text-white -translate-y-[1vw] translate-x-[1.7vw]">Home</a>
                                    <a href="#" className="hover:text-[#D9B64D] transition-colors text-[1.8vw] text-white -translate-y-[1vw] translate-x-[1.7vw]">Events</a>
                                    <a href="#" className="hover:text-[#D9B64D] transition-colors text-[1.8vw] text-white -translate-y-[1vw] translate-x-[1.7vw]">Workshops</a>
                                    <a href="#" className="hover:text-[#D9B64D] transition-colors text-[1.8vw] text-white -translate-y-[1vw] translate-x-[1.7vw]">Lectures</a>
                                    <a href="#" className="hover:text-[#D9B64D] transition-colors text-[1.8vw] text-white -translate-y-[1vw] translate-x-[1.7vw]">Sponsors</a>
                                    <a href="#" className="hover:text-[#D9B64D] transition-colors text-[1.8vw] text-white -translate-y-[1vw] translate-x-[1.7vw]">About Us</a>
                                    <a href="#" className="hover:text-[#D9B64D] transition-colors text-[1.8vw] text-white -translate-y-[1vw] translate-x-[1.7vw]">Team</a>
                                    <a href="#" className="hover:text-[#D9B64D] transition-colors text-[1.8vw] text-white -translate-y-[1vw] translate-x-[1.7vw]">Contact</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar (Card 3) */}
                    {/* Bottom Bar (Card 3) */}
                    <div className="relative md:w-[92vw] lg:w-[92vw] flex justify-center"> {/* Changed from w-[90vw] to w-[67.708vw] */}
                        <div className="relative w-full">
                            <img src={Card3.src} alt="Bottom bar" className="w-full" />
                            {/* Overlay content */}
                            <div className="absolute inset-0 flex items-center justify-center px-[2.083vw] top-[2vw]">
                                <div className="w-full border-[0.104vw] border-white rounded grid grid-cols-[2fr_1fr_1fr_2fr] h-[4.167vw]">
                                    <div className="border-r border-white flex items-center justify-start px-[1.042vw]">
                                        <p className="text-white text-[0.729vw] whitespace-nowrap" style={customFont.style}>
                                            © Tathva™ 2025
                                        </p>
                                    </div>
                                    <div className="border-r border-white flex items-center justify-center px-[1.042vw]">
                                        <a href="#" className="hover:text-gray-700 transition-colors text-[0.625vw] text-white text-center" style={customFont.style}>Terms and Policy</a>
                                    </div>
                                    <div className="border-r border-white flex items-center justify-center px-[1.042vw]">
                                        <a href="#" className="hover:text-gray-700 transition-colors text-[0.625vw] text-white text-center" style={customFont.style}>Privacy Policy</a>
                                    </div>
                                    <div className="flex items-center justify-end px-[1.042vw]">
                                        <img src={Fact.src} alt="Tathva Logo" className="h-[2.604vw] w-auto object-contain" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;