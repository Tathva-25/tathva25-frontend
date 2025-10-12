import React from 'react';
import Card1 from "../../public/images/card1.png"
import Card2 from "../../public/images/card2.png"
import Card3 from "../../public/images/card3.png"
import Planet from "../../public/images/planet.png"
import Fact from "../../public/images/facts.png"
import localfont from 'next/font/local';

const customFont = localfont({
    src: '../../public/fonts/quantico-r.ttf',
})

const Footer = () => {
    return (
        <footer className="bg-white text-white ml-15 sm:p-5" style={customFont.style}>
            {/* Main Footer Content */}
            <div className="flex flex-col items-center">
                {/* Top Section with decorative elements */}
                <div className="flex flex-row">
                    {/* Left Section - Newsletter */}
                    <div className="relative">
                        <div>
                            <img src={Card1.src} alt="Newsletter card" />
                        </div>
                        {/* Overlay text and input */}
                        <div className="absolute inset-0 flex flex-col items-center pt-8 px-12">
                            {/* Overlay text and input */}
                            <div className="absolute inset-0 flex flex-col items-center pt-8 px-12">
                                {/* Planet Image */}
                                <div className="mb-4">
                                    <img src={Planet.src} alt="Planet" className="w:auto md:h-20 lg:h-40 xl:h-60 object-contain" />
                                </div>
                                <div className="md:top-[20%] lg:top-[5%]">
                                    {/* Stay in loop text */}
                                    <h3 className="md: text-xl lg:text-2xl font-semibold mb-4">Stay in loop:</h3>

                                    {/* Email input section */}
                                    <div className="w-full max-w-sm">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-sm font-medium">Email:</label>
                                            <input
                                                type="email"
                                                placeholder="enter your email"
                                                className="w-full px-2 py-2 bg-transparent border-b-2 border-white text-white placeholder-gray-300 placeholder-opacity-70 focus:outline-none focus:border-gray-200 transition-colors"
                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    {/* Right Section - Navigation */}
                    <div className="relative">
                        <div>
                            <img src={Card2.src} alt="Navigation card" />
                        </div>
                        {/* Navigation Links Overlay */}
                        <div className="absolute inset-30 flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 right-[4%] md:top-[20%] lg:top-[5%]">
                            <div className="grid grid-cols-2 gap-x-4 sm:gap-x-6 md:gap-x-8 lg:gap-x-10 gap-y-1 sm:gap-y-3 md:gap-y-1">
                                <a href="#" className="hover:text-gray-700 transition-colors text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl text-white">Home</a>
                                <a href="#" className="hover:text-gray-700 transition-colors text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl text-white">Events</a>
                                <a href="#" className="hover:text-gray-700 transition-colors text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl text-white">Workshops</a>
                                <a href="#" className="hover:text-gray-700 transition-colors text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl text-white">Lectures</a>
                                <a href="#" className="hover:text-gray-700 transition-colors text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl text-white">Sponsors</a>
                                <a href="#" className="hover:text-gray-700 transition-colors text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl text-white">About Us</a>
                                <a href="#" className="hover:text-gray-700 transition-colors text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl text-white">Team</a>
                                <a href="#" className="hover:text-gray-700 transition-colors text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl text-white">Contact</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative w-full max-w-[1600] sm:p-2 flex justify-center mt-[-50px] sm:mt-[-100px] md:mt-[-120px] lg:mt-[-200px] xl:mt-[-250px]">
                    <div className="relative w-full">
                        <img src={Card3.src} alt="Bottom bar" className="w-full" />
                        {/* Overlay content */}
                        <div className="absolute inset-0 flex items-center justify-center px-8 top-[30%]">
                            <div className="w-full border-2 border-white rounded grid grid-cols-[2fr_1fr_1fr_2fr] h-16">
                                <div className="border-r border-white flex items-center justify-start px-4">
                                    <p className="text-white text-sm lg:text-xl whitespace-nowrap" style={customFont.style}>
                                        © Tathva™ 2025
                                    </p>
                                </div>
                                <div className="border-r border-white flex items-center justify-center px-4">
                                    <a href="#" className="hover:text-gray-700 transition-colors text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl text-white text-center" style={customFont.style}>Terms and Policy</a>
                                </div>
                                <div className="border-r border-white flex items-center justify-center px-4">

                                    <a href="#" className="hover:text-gray-700 transition-colors text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl text-white text-center" style={customFont.style}>Privacy Policy</a>
                                </div>
                                <div className="flex items-center justify-end px-4">
                                    <img src={Fact.src} alt="Tathva Logo" className="md:h-10 lg:h-15 w-auto object-contain" />
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