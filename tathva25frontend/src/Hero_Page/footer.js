import React from 'react';
import Card1 from "../../public/images/card1.png";
import Card2 from "../../public/images/card2.png";
import Background from "../../public/images/background.png";
import Dec1 from "../../public/images/dec1.png";
import Dec2 from "../../public/images/dec2.png";
import Line from "../../public/images/line.png";
import Fb from "../../public/images/facebook.png";
import Insta from "../../public/images/instagram.png";
import Linkd from "../../public/images/linkedin.png";
import Rect from "../../public/images/rect.png";
import Tathvalogo from "../../public/images/tathvawhitelogo.png";
import Image from 'next/image';
import localfont from 'next/font/local';
import Arrow from "../../public/images/arrow.png";

import BackgroundMobile from "../../public/images/backgroundmobile.png";
import CardMobile from "../../public/images/cardMobile.png";

const customFont = localfont({
    src: '../../public/fonts/nippo.otf',
})

const YourComponent = () => {
    return (
        <>
            {/* Desktop Version */}
            <footer
                className="hidden md:flex relative flex-col bg-cover bg-no-repeat bg-center overflow-hidden"
                style={{ backgroundImage: `url(${Background.src})` }}
            >
                {/* Wrapper div to give real height */}
                <div className="relative w-full mx-auto py-[22vw]">
                    {/* The 'py-[30vw]' ensures enough height for your absolute content */}

                    {/* Scroll Stop Container */}
                    <div className="absolute inset-0 overflow-hidden">

                        {/* Decoration Images */}
                        {/* Decoration Elements (hidden on mobile) */}
                        <div className="hidden md:block absolute right-4 top-1/4">
                            <Image src={Dec1} alt="Decoration 1" className="w-8" />
                        </div>
                        <div className="hidden md:block absolute left-4 bottom-1/4">
                            <Image src={Dec2} alt="Decoration 2" className="w-8" />
                        </div>


                        {/* Cards Container */}
                        <div className="absolute left-[50%] top-[50%] transform -translate-x-[50%] -translate-y-[50%] flex gap-4 sm:gap-6 lg:gap-8 w-[80vw]">

                            {/* Card 1 */}
                            <div className="w-[26vw] relative">
                                <Image
                                    src={Card1}
                                    alt="Card 1"
                                    className="w-full h-auto object-contain drop-shadow-lg"
                                    priority
                                />
                                <div className={`absolute bottom-[15%] left-1/2 transform -translate-x-[9vw] -translate-y-[2vw] w-[18vw] text-center ${customFont.className}`}>
                                    <div className="text-white mb-[1vw] text-[1.7vw] font-medium drop-shadow-[0_0_4px_rgba(0,0,0,1)]">
                                        Any queries? Contact us!
                                    </div>
                                    <div className="flex flex-col text-white items-start -translate-x-[0.5vw] w-[22vw] text-[1.3vw] gap-[0.8vw]">
                                        <div className="drop-shadow-[0_0_4px_rgba(0,0,0,1)]">EMAIL:  tathva2025@gmail.com</div>
                                        <div className="drop-shadow-[0_0_4px_rgba(0,0,0,1)]">PHONE:  +91 55555 55555</div>
                                    </div>
                                    <div className="absolute inset-0 w-[10vw] -translate-y-[10.6vw] translate-x-[4vw] drop-shadow-[0_0_8px_rgba(0,0,0,1)]">
                                        <img src={Tathvalogo.src} />
                                    </div>
                                    <div className="absolute inset-0 w-[10vw] text-[1vw] text-white translate-x-[5vw] translate-y-[14.5vw] drop-shadow-[0_0_4px_rgba(0,0,0,1)]">
                                        © TATHVA 2025
                                    </div>
                                </div>
                            </div>

                            {/* Privacy & Terms Buttons */}
                            <div className="flex gap-8 text-white absolute inset-1 translate-y-[10vw] translate-x-[26vw]">
                                <button className="bg-black border-2 h-[2.3vw] text-[1.2vw] w-[12vw] -translate-x-[2vw] translate-y-[16vw]">Privacy Policy</button>
                                <button className="bg-black border-2 hover:border-gray-900 h-[2.3vw] text-[1.2vw] w-[12vw] -translate-x-[3vw] translate-y-[16vw]">Terms of Service</button>
                            </div>

                            {/* Card 2 */}
                            <div className="w-[50vw] relative">
                                <Image
                                    src={Card2}
                                    alt="Card 2"
                                    className="w-full h-auto object-contain drop-shadow-lg"
                                    priority
                                />
                                <div className={`absolute inset-0 translate-y-[2vw] translate-x-[29vw] text-[1.7vw] bg-gradient-to-r from-[#F1D233] to-[#806F17] bg-clip-text text-transparent ${customFont.className}`}>
                                    [QUICK LINKS]
                                </div>
                                <div className={`absolute inset-0 text-white flex flex-row translate-x-[25vw] text-[1.6vw] translate-y-[6vw] gap-8 ${customFont.className}`}>
                                    <div className="flex flex-col">
                                        <button className="hover:text-[#F1D233] transition-colors duration-200 ease-in-out">Home</button>
                                        <button className="hover:text-[#F1D233] transition-colors duration-200 ease-in-out">Lecures</button>
                                        <button className="hover:text-[#F1D233] transition-colors duration-200 ease-in-out">Events</button>
                                        <button className="hover:text-[#F1D233] transition-colors duration-200 ease-in-out">Workshops</button>
                                    </div>
                                    <div className="flex flex-col">
                                        <button className="hover:text-[#F1D233] transition-colors duration-200 ease-in-out">Map</button>
                                        <button className="hover:text-[#F1D233] transition-colors duration-200 ease-in-out">Contact</button>
                                        <button className="hover:text-[#F1D233] transition-colors duration-200 ease-in-out">Team</button>
                                        <button className="hover:text-[#F1D233] transition-colors duration-200 ease-in-out">FAQs</button>
                                    </div>
                                </div>
                                <div className="absolute inset-0 translate-x-[30vw] translate-y-[17.5vw] w-[10vw]">
                                    <img src={Line.src} />
                                </div>
                                <div className={`absolute inset-0 translate-y-[19vw] translate-x-[31vw] text-[1.7vw] bg-gradient-to-r from-[#F1D233] to-[#806F17] bg-clip-text text-transparent ${customFont.className}`}>
                                    [SOCIALS]
                                </div>
                                <div className="absolute inset-0 translate-y-[23vw] w-[2vw] translate-x-[27vw]">
                                    <img src={Insta.src} />
                                </div>
                                <div className="absolute inset-0 translate-y-[23vw] w-[2vw] translate-x-[33vw]">
                                    <img src={Fb.src} />
                                </div>
                                <div className="absolute inset-0 translate-y-[23vw] w-[2vw] translate-x-[39vw]">
                                    <img src={Linkd.src} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>


            {/* Mobile Version */}
            <footer className="md:hidden relative flex flex-col bg-cover bg-no-repeat bg-center overflow-hidden">
                {/* Background */}
                <div
                    className="absolute inset-0 bg-cover w-full top-[13%] h-full z-0 bg-no-repeat"
                    style={{ backgroundImage: `url(${BackgroundMobile.src})` }}
                />

                {/* Main Content Container */}
                <div className="relative z-10 w-full mt-[5vw] px-6 py-[5vw] flex flex-col items-center justify-center">

                    {/* Mobile Card */}
                    <div className="w-[80vw] max-w-md -translate-y-[5.5vw] trelative">
                        <Image
                            src={CardMobile}
                            alt="Mobile Card"
                            className="w-full h-auto object-cover drop-shadow-lg"
                            priority
                        />

                        {/* Content Overlay */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-8">

                            {/* Logo */}
                            <div className="w-[14vw] mb-4 translate-x-[19vw] translate-y-[40vw] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                                <Image src={Tathvalogo} alt="Tathva Logo" />
                            </div>
                            <div className="flex flex-col relative text-white font-bold  text-[3.3vw] -translate-x-[10vw] translate-y-[25vw]">
                                <span>Any queries?</span>
                                <span>Contact <span className="font-extrabold">+91 55555555</span></span>
                            </div>

                            {/*Quick links*/}
                            <div className={`relative inset-0 text-white flex flex-row translate-x-[2vw] text-[3.3vw] -translate-y-[27vw] gap-8 ${customFont.className}`}>
                                <div className="flex flex-col gap-4">
                                    <button className="hover:text-[#F1D233] flex gap-3"><img src={Arrow.src} className="w-[4vw] h-[4vw] translate-y-[2vw]" />Home</button>
                                    <button className="hover:text-[#F1D233] flex gap-3"><img src={Arrow.src} className="w-[4vw] h-[4vw] translate-y-[2vw]" />Lecures</button>
                                    <button className="hover:text-[#F1D233] flex gap-3"><img src={Arrow.src} className="w-[4vw] h-[4vw] translate-y-[2vw]" />Events</button>
                                    <button className="hover:text-[#F1D233] flex gap-3"><img src={Arrow.src} className="w-[4vw] h-[4vw] translate-y-[2vw]" />Workshops</button>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <button className="hover:text-[#F1D233] flex gap-3 "><img src={Arrow.src} className="w-[4vw] h-[4vw] translate-y-[2vw]" />Map</button>
                                    <button className="hover:text-[#F1D233] flex gap-3"><img src={Arrow.src} className="w-[4vw] h-[4vw] translate-y-[2vw]" /> Contact</button>
                                    <button className="hover:text-[#F1D233] flex gap-3 "><img src={Arrow.src} className="w-[4vw] h-[4vw] translate-y-[2vw]" />Team</button>
                                    <button className="hover:text-[#F1D233] flex gap-3"><img src={Arrow.src} className="w-[4vw] h-[4vw] translate-y-[2vw]" />FAQs</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Privacy & Terms Buttons */}
                    <div className="flex gap-4 text-white mt-[-7vw] translate-y-[3vw]">
                        <button className="bg-transparent border border-2 px-4 py-1 text-xs rounded">
                            Privacy Policy
                        </button>
                        <button className="bg-transparent border border-2 px-4 py-1 text-xs rounded">
                            Terms of Service
                        </button>
                    </div>

                    {/* Decoration Elements */}
                    <div className="absolute right-4 top-1/4">
                        <Image src={Dec1} alt="Decoration 1" className="w-[5vw]" />
                    </div>
                    <div className="absolute left-4 bottom-1/4">
                        <Image src={Dec2} alt="Decoration 2" className="w-[5vw]" />
                    </div>
                </div>
            </footer>
        </>
    );
};

export default YourComponent;