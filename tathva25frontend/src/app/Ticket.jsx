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
    <div className="relative w-56 h-20 sm:w-96 sm:h-24 md:w-110 md:h-36 lg:w-130 lg:h-36">
      {/* Oversized Image */}
      <Image
        src="/plainticket.png"
        alt="ticket"
        width={800}
        height={800}
        className="scale-120 absolute"
      />

      {/* Inner content box */}
      <div className="w-56 h-20 sm:w-96 sm:h-34 md:w-110 md:h-40 lg:w-130 lg:h-45 z-10 relative flex gap-2 sm:gap-2 md:gap-3 lg:gap-10 items-center justify-center">
        <div className="flex flex-col flex-1 scale-120 p-2">
          <p
            className={`${anek.className} pl-2 sm:pl-8 md:pl-6 lg:pl-10 pt-1 sm:pt-1 md:pt-1 lg:pt-2 font-bold text-[#252527] text-xs sm:text-lg md:text-xl lg:text-2xl underline underline-offset-2 sm:underline-offset-2 md:underline-offset-2 lg:underline-offset-4 decoration-[#C8AD73] decoration-1`}
          >
            TATHVA 2025
          </p>
          <p
            className={`${osw.className} text-[#D2B078] text-[0.5rem] sm:text-[0.8rem] md:text-[1rem] lg:text-sm pl-2 sm:pl-8 md:pl-6 lg:pl-10`}
          >
            ADMIT ONE
          </p>
          <div className="flex ml-auto mb-1 sm:mb-1 md:mb-1.5 lg:mb-4 mr-1 sm:mr-12 md:mr-16 lg:mr-10">
            <Image
              src="/qr.png"
              alt="qr"
              width={50}
              height={50}
              className="size-6 sm:size-8 md:size-10 lg:size-12"
            />
          </div>
        </div>
        {/* <Image src="/verticalline.svg" alt="line" width={2} height={2} /> */}
        <div className="flex flex-col flex-1 items-start scale-120">
          <p
            className={`${anek.className} text-base sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#3E3E3B]`}
          >
            {`DAY ${day}`}
          </p>
          <p
            className={`${anek.className} text-xs sm:text-lg md:text-xl lg:text-xl font-bold text-[#3E3E3B]`}
          >
            {`OCT ${date} 2025`}
          </p>
          <p
            className={`${anek.className} text-[0.5rem] sm:text-[0.6rem] md:text-[0.8rem] lg:text-sm text-[#3E3E3B]`}
          >
            Proshow | Wheels | Conclave
          </p>
          <div className="flex items-center justify-between gap-2">
            <button
              className={`${osw.className} bg-[#3E3E3B] cursor-pointer sm:rounded-sm md:rounded-sm lg:rounded-[0.1rem] text-[0.5rem] sm:text-[0.5rem] md:text-[0.8rem] lg:text-sm w-12 h-3 sm:w-16 sm:h-4 md:w-18 md:h-6 lg:w-20 lg:h-5 text-white`}
            >
              BUY NOW
            </button>
            <button
              className={`${osw.className} bg-[#3E3E3B] cursor-pointer sm:rounded-sm md:rounded-sm lg:rounded-[0.1rem] text-[0.5rem] sm:text-[0.5rem] md:text-[0.8rem] lg:text-sm w-12 h-3 sm:w-16 sm:h-4 md:w-18 md:h-6 lg:w-20 lg:h-5 text-white`}
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
