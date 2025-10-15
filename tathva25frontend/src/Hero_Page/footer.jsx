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

const customFont = localfont({
    src: '../../public/fonts/nippo.otf',
})

const YourComponent = () => {
    return (
        <footer
            className="relative flex flex-col bg-contain bg-no-repeat bg-center overflow-hidden"
            style={{ backgroundImage: `url(${Background.src})` }}
        >
            {/* Wrapper div to give real height */}
            <div className="relative w-full mx-auto py-[22vw]">
                {/* The 'py-[30vw]' ensures enough height for your absolute content */}

                {/* Scroll Stop Container */}
                <div className="absolute inset-0 overflow-hidden">

                    {/* Decoration Images */}
                    <div className="absolute right-[5%] top-[50%] transform -translate-x-[0vw] -translate-y-[50%] flex gap-4 sm:gap-6 lg:gap-8">
                        <Image src={Dec1} alt="Decoration 1" className="w-[3vw]" />
                    </div>
                    <div className="absolute right-[5%] top-[50%] transform -translate-x-[86vw] -translate-y-[50%] flex gap-4 sm:gap-6 lg:gap-8">
                        <Image src={Dec2} alt="Decoration 2" className="w-[3vw]" />
                    </div>

                    {/* Cards Container */}
                    <div className="absolute left-[50%] top-[50%] transform -translate-x-[50%] -translate-y-[50%] flex gap-4 sm:gap-6 lg:gap-8 w-[80vw]">

                        {/* Card 1 */}
                        <div className="w-[23vw] relative">
                            <Image
                                src={Card1}
                                alt="Card 1"
                                className="w-full h-auto object-contain drop-shadow-lg"
                                priority
                            />
                            <div className={`absolute bottom-[15%] left-1/2 transform -translate-x-[9vw] -translate-y-[2vw] w-[18vw] text-center ${customFont.className}`}>
                                <div className="text-white mb-[1vw] text-[1.5vw] font-medium drop-shadow-[_2px_4px_rgba(0,0,0,2)]">
                                    Stay in the loop
                                </div>
                                <div className="flex flex-col gap-[0.8vw]">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="w-[17vw] px-[0.8vw] py-[0.3vw] text-white bg-transparent border-b border-gray-300 text-[1vw] focus:outline-none focus:border-b-2 focus:border-blue-500 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                                    />
                                    <button className="w-[17vw] bg-gray-800 text-white py-[0.6vw] rounded-lg text-[1vw] font-medium hover:bg-gray-900 transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                                        Subscribe
                                    </button>
                                </div>
                                <div className="absolute inset-0 w-[10vw] -translate-y-[9vw] translate-x-[4vw] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                                    <img src={Tathvalogo.src} />
                                </div>
                                <div className="absolute inset-0 w-[6vw] -translate-x-[1vw] translate-y-[12vw] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                                    <img src={Rect.src} />
                                </div>
                            </div>
                        </div>

                        {/* Privacy & Terms Buttons */}
                        <div className="flex gap-8 text-white absolute inset-1 translate-y-[10vw] translate-x-[26vw]">
                            <button className="bg-transparent border border-2 h-[2.3vw] text-[1.2vw] w-[10vw] -translate-x-[5vw] translate-y-[13vw]">Privacy Policy</button>
                            <button className="bg-transparent border border-2 h-[2.3vw] text-[1.2vw] w-[10vw] -translate-x-[4vw] translate-y-[13vw]">Terms of Service</button>
                        </div>

                        {/* Card 2 */}
                        <div className="w-[45vw] relative">
                            <Image
                                src={Card2}
                                alt="Card 2"
                                className="w-full h-auto object-contain drop-shadow-lg"
                                priority
                            />
                            <div className={`absolute inset-0 translate-y-[2vw] translate-x-[27vw] text-[1.7vw] bg-gradient-to-r from-[#F1D233] to-[#806F17] bg-clip-text text-transparent ${customFont.className}`}>
                                [QUICK LINKS]
                            </div>
                            <div className={`absolute inset-0 text-white flex flex-row translate-x-[23vw] text-[1.6vw] translate-y-[6vw] gap-8 ${customFont.className}`}>
                                <div className="flex flex-col">
                                    <button className="hover:text-[#F1D233]">Home</button>
                                    <button className="hover:text-[#F1D233]">Lecures</button>
                                    <button className="hover:text-[#F1D233]">Events</button>
                                    <button className="hover:text-[#F1D233]" >Workshops</button>
                                </div>
                                <div className="flex flex-col">
                                    <button className="hover:text-[#F1D233]">Map</button>
                                    <button className="hover:text-[#F1D233]">Contact</button>
                                    <button className="hover:text-[#F1D233]">Team</button>
                                    <button className="hover:text-[#F1D233]">FAQs</button>
                                </div>
                            </div>
                            <div className="absolute inset-0 translate-x-[27vw] translate-y-[17vw] w-[10vw]">
                                <img src={Line.src} />
                            </div>
                            <div className={`absolute inset-0 translate-y-[18vw] translate-x-[28vw] text-[1.7vw] bg-gradient-to-r from-[#F1D233] to-[#806F17] bg-clip-text text-transparent ${customFont.className}`}>
                                [SOCIALS]
                            </div>
                            <div className="absolute inset-0 translate-y-[22vw] w-[2vw] translate-x-[24vw]">
                                <img src={Insta.src} />
                            </div>
                            <div className="absolute inset-0 translate-y-[22vw] w-[2vw] translate-x-[30vw]">
                                <img src={Fb.src} />
                            </div>
                            <div className="absolute inset-0 translate-y-[22vw] w-[2vw] translate-x-[36vw]">
                                <img src={Linkd.src} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

    );
};

export default YourComponent;