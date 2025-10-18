import Image from "next/image";
import { Michroma } from "next/font/google";
import localFont from "next/font/local";

const mi = Michroma({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const fontspring = localFont({
  src: "../../public/fonts/fontspring.otf",
});

export default function TicketMobile({ day, date, price }) {
  // Dynamic event text
  const eventText =
    day === 1 ? "Wheels | Robowars | Conclave" : "Proshow | Events | Conclave";

  return (
    <div className="relative w-20 h-56 sm:w-20 sm:h-56">
      {/* Background */}
      <Image
        src="/newbg.png"
        alt="ticket"
        fill
        className="absolute rotate-90 object-cover rounded-md opacity-95"
      />

      {/* Inner content */}
      <div className="relative z-10 flex flex-col justify-between items-center h-full py-2">
        {/* Top section */}
        <div className="flex flex-col items-center">
          <p
            className={`${mi.className} font-bold text-[#252527] text-[0.7rem]`}
          >
            TATHVA
          </p>
          <p
            className={`${mi.className} font-bold text-[#252527] text-[0.7rem] border-b border-[#C8AD73] w-full text-center leading-tight`}
          >
            2025
          </p>
          <p
            className={`${mi.className} text-[#D2B078] text-[0.45rem] mt-2`}
          >
            ADMIT ONE
          </p>
          <Image
            src="/qr.png"
            alt="QR"
            width={40}
            height={40}
            className="mt-2"
          />
        </div>

        {/* Middle section */}
        <div className="flex flex-col items-center">
          <p
            className={`${fontspring.className} text-lg font-bold text-[#3E3E3B]`}
          >
            {`DAY ${day}`}
          </p>
          <p
            className={`${mi.className} text-xs font-bold text-[#3E3E3B]`}
          >
            {`OCT ${date} 2025`}
          </p>
          <p
            className={`${mi.className} text-[0.3rem] text-center text-[#3E3E3B] mt-1`}
          >
            {eventText}
          </p>
        </div>

        {/* Bottom section */}
        <div className="flex flex-col items-center gap-1 mt-1">
          <button
            className={`${mi.className} bg-[#3E3E3B] rounded-sm text-white text-[0.35rem] w-14 h-4 flex items-center justify-center`}
          >
            BUY NOW
          </button>
          <button
            className={`${mi.className} bg-[#3E3E3B] rounded-sm text-white text-[0.35rem] w-14 h-4 flex items-center justify-center`}
          >
            {`Rs ${price}/-`}
          </button>
        </div>
      </div>
    </div>
  );
}
