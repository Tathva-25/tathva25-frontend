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

function TicketMobile({ day, date, price }) {
  return (
    <div className="relative w-20 h-56 sm:w-20 sm:h-56 md:w-25 md:h-72 lg:w-36 lg:h-130">
      {/* Oversized Image */}
      <Image
        src="/plainticket.png"
        alt="ticket"
        width={800}
        height={800}
        className="scale-500 absolute rotate-90 right-0.5 top-25"
      />

      {/* Inner content box */}
      <div className="scale-130 w-20 h-56 sm:w-20 sm:h-56 md:w-25 md:h-72 lg:w-45 lg:h-130 z-10 relative flex flex-col gap-2 sm:gap-2 md:gap-3 lg:gap-10 items-center justify-center">
        <div className="flex flex-col flex-1 p-2 items-center w-full">
          <p
            className={`${anek.className} pt-1 sm:pt-1 md:pt-1 lg:pt-2 font-bold text-[#252527] text-xs sm:text-xs md:text-sm lg:text-2xl`}
          >
            TATHVA
          </p>
          <p
            className={`${anek.className} text-center pb-1 sm:pb-1 md:pb-1 lg:pb-2 font-bold text-[#252527] text-xs sm:text-xs md:text-sm lg:text-2xl border-b-1 w-full border-[#C8AD73]`}
          >
            2025
          </p>
          <p
            className={`${osw.className} text-[#D2B078] text-[0.5rem] sm:text-[0.55rem] md:text-[0.6rem] lg:text-sm mt-2`}
          >
            ADMIT ONE
          </p>
          <div className="w-full flex justify-center mt-2">
            <Image
              src="/qr.png"
              alt="qr"
              width={50}
              height={50}
              className="w-8 h-8 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-12 lg:h-12 mx-auto"
            />
          </div>
        </div>
        {/* <Image src="/verticalline.svg" alt="line" width={2} height={2} /> */}
        <p
          className={`${anek.className} text-lg sm:text-lg md:text-2 lg:text-4xl font-bold text-[#3E3E3B]`}
        >
          {`DAY ${day}`}
        </p>
        <p
          className={`${anek.className} text-xs sm:text-xs md:text-xs lg:text-xl font-bold text-[#3E3E3B]`}
        >
          {`OCT ${date} 2025`}
        </p>
        <p
          className={`${anek.className} text-[0.3rem] sm:text-[0.3rem] md:text-[0.55rem] lg:text-sm text-[#3E3E3B]`}
        >
          Proshow | Wheels | Conclave
        </p>
        <div className="flex flex-col items-center justify-around gap-1">
          <button
            className={`${osw.className} flex justify-center items-center rounded-sm px-2 py-1 bg-[#3E3E3B] text-[0.5rem] w-14 h-4 text-white`}
          >
            BUY NOW
          </button>
          <button
            className={`${osw.className} flex justify-center items-center rounded-sm px-2 py-1 bg-[#3E3E3B] text-[0.5rem] w-14 h-4 text-white`}
          >
            {`Rs ${price}/-`}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TicketMobile;
