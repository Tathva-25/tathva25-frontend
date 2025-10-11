import gsap from "gsap";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import { Anek_Malayalam } from "next/font/google";
import { Oswald } from "next/font/google";

const pd = Playfair_Display({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const anek = Anek_Malayalam({
  subsets: ["latin"],
  weight: ["400", "600", "200"],
  display: "swap",
});

const osw = Oswald({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

function Ticket({ day, date, price }) {
  return (
    <div className="relative w-56 h-20 sm:w-56 sm:h-20 md:w-72 md:h-25 lg:w-100 lg:h-36">
      {/* Oversized Image */}
      <Image
        src="/plainticket.png"
        alt="ticket"
        width={800}
        height={800}
        className="scale-120 absolute"
      />

      {/* Inner content box */}
      <div className="w-56 h-20 sm:w-56 sm:h-20 md:w-72 md:h-25 lg:w-98.5 lg:h-36 z-10 relative flex gap-2 sm:gap-2 md:gap-3 lg:gap-10 items-center justify-center">
        <div className="flex flex-col flex-1">
          <p
            className={`${anek.className} pl-2 sm:pl-2 md:pl-3 lg:pl-10 pt-1 sm:pt-1 md:pt-1 lg:pt-2 font-bold text-[#252527] text-xs sm:text-xs md:text-sm lg:text-xl underline underline-offset-2 sm:underline-offset-2 md:underline-offset-2 lg:underline-offset-4 decoration-[#C8AD73] decoration-1`}
          >
            TATHVA 2025
          </p>
          <p
            className={`${osw.className} text-[#D2B078] text-[0.5rem] sm:text-[0.55rem] md:text-[0.6rem] lg:text-sm pl-2 sm:pl-2 md:pl-3 lg:pl-10`}
          >
            ADMIT ONE
          </p>
          <div className="flex ml-auto mb-1 sm:mb-1 md:mb-1.5 lg:mb-4 mr-1 sm:mr-0.5 md:mr-1 lg:mr-2">
            <Image
              src="/qr.png"
              alt="qr"
              width={50}
              height={50}
              className="w-6 h-6 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-12 lg:h-12"
            />
          </div>
        </div>
        {/* <Image src="/verticalline.svg" alt="line" width={2} height={2} /> */}
        <div className="flex flex-col flex-1 items-start">
          <p
            className={`${anek.className} text-base sm:text-base md:text-lg lg:text-4xl font-bold text-[#3E3E3B]`}
          >
            {`DAY ${day}`}
          </p>
          <p
            className={`${anek.className} text-xs sm:text-xs md:text-xs lg:text-xl font-bold text-[#3E3E3B]`}
          >
            {`OCT ${date} 2025`}
          </p>
          <p
            className={`${anek.className} text-[0.5rem] sm:text-[0.5rem] md:text-[0.55rem] lg:text-sm text-[#3E3E3B]`}
          >
            Proshow | Wheels | Conclave
          </p>
          <div className="flex items-center justify-around gap-1 sm:gap-0.5 md:gap-1 lg:gap-2">
            <button
              className={`${osw.className} bg-[#3E3E3B] text-[0.5rem] sm:text-[0.5rem] md:text-[0.55rem] lg:text-sm w-12 h-3 sm:w-11 sm:h-3 md:w-12 md:h-3.5 lg:w-20 lg:h-5 text-white`}
            >
              BUY NOW
            </button>
            <button
              className={`${osw.className} bg-[#3E3E3B] text-[0.5rem] sm:text-[0.5rem] md:text-[0.55rem] lg:text-sm w-12 h-3 sm:w-11 sm:h-3 md:w-12 md:h-3.5 lg:w-20 lg:h-5 text-white`}
            >
              {`Rs ${price}/-`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ticket;
