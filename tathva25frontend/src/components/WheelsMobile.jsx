'use client';
import Barcode from "react-barcode";
import { Michroma } from 'next/font/google';

const michroma = Michroma({ subsets: ['latin'], weight: '400' });

export default function WheelsEventMobile() {
  return (
    <div
      className={`${michroma.className} w-screen h-screen bg-black text-white overflow-hidden relative flex flex-col items-center justify-start`}
    >
      {/* === BACKGROUND LAYER (car + bg) === */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* background */}
        <img
          src="/images/background3.png"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover brightness-[.8]"
        />
        {/* car image (remains commented) */}
      </div>

      {/* === MAIN CONTENT === */}
      <div className="relative z-20 flex flex-col justify-between items-center h-full w-full py-6 px-4 box-border">

        {/* === TOP SECTION === */}
        <div className="w-full flex flex-col items-center justify-center text-center pb-[0.1rem] border-b border-white mb-[0.1rem]">
          <div className="text-[clamp(3rem,15.5vw,11rem)] font-black uppercase leading-none mb-[0.3rem]">
            WHEELS
          </div>
          <div className="flex justify-center items-center w-[90%] gap-0 -translate-x-[7%]">
            <div className="scale-55">
              <Barcode
                value="WHEELS-2025"
                height={35}
                width={1.2}
                background="transparent"
                lineColor="#fff"
                displayValue={false}
              />
            </div>
            <div className="text-[clamp(1.2rem,6.5vw,3.5rem)] font-bold uppercase tracking-normal">
              AUTOSHOW
            </div>
          </div>
        </div>

        {/* === YEAR (left aligned) === */}
        {/* NOTE: Tailwind CSS doesn't have a default utility for `text-stroke`.
          Arbitrary properties are used here for cross-browser compatibility.
        */}
        <div className="w-full text-[clamp(3rem,14vw,8rem)] uppercase text-transparent -translate-y-[150%] -translate-x-[5%] [text-stroke:2px_#fff] [-webkit-text-stroke:2px_#fff] leading-none text-left pl-2 mb-2">
          2025
        </div>

        {/* === DATE SECTION === */}
        <div className="w-full text-center mt-[0.2rem] mb-[0.6rem]">
          <div className="text-[clamp(2rem,9vw,4rem)] mb-3 font-thin -translate-y-[400%] -translate-x-[9%] uppercase tracking-normal leading-[1.1]">
            October 24
          </div>
          <div className="text-[clamp(0.9rem,3.5vw,1.3rem)] font-light -translate-y-[700%] -translate-x-[18%] tracking-[0.1em] uppercase mt-[0.3rem]">
            Back to the Future
          </div>
        </div>

        {/* === FOOTER === */}
        <div className="w-full pt-4 flex flex-col items-center justify-center gap-[0.7rem]">
          <div className="flex justify-center gap-4 scale-90 text-[clamp(0.6rem,3vw,1rem)] uppercase font-light -translate-y-[220%] -translate-x-[15%] tracking-[0.05em]">
            <div>Rally</div>
            <div>Car Reveals</div>
            <div>Stunts</div>
          </div>

          <div className="flex items-center scale-90 justify-center gap-4 -translate-y-[120%] text-[clamp(2.0rem,4vw,4rem)] font-light uppercase tracking-[0.1em] leading-[0.9] whitespace-nowrap">
            <span>Temporal</span>
            <span className="text-[clamp(1.1rem,2vw,1.8rem)] font-extralight tracking-[0.2em]">
              Shift
            </span>
          </div>
          
          <div>
            <img
              src="/images/misc.png"
              alt="Misc"
              className="h-8 object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}