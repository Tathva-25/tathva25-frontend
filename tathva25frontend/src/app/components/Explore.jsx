"use client";
import Link from "next/link";
import { Michroma } from "next/font/google";

const ACCENT_COLOR = "white";
const michroma = Michroma({ subsets: ["latin"], weight: "400" });

const VerticalStripes = ({ count = 7, size = "large" }) => {
  const heightClass = size === "large" ? "h-16" : "h-8";
  const widthClass = size === "large" ? "w-[3px]" : "w-[5px]";
  return (
    <div className="flex gap-1">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className={`${widthClass} ${heightClass} -skew-x-12 ${
            i % 2 === 0 ? "bg-white/80" : "bg-transparent"
          }`}
        />
      ))}
    </div>
  );
};

const LargeSurname = ({ name, surname }) => (
  <div className="text-center md:text-left">
    <div
      className={`${michroma.className} text-[8px] sm:text-[10px] md:text-[11px] tracking-[0.15em] text-white ml-2 font-medium mb-1`}
    >
      {name}
    </div>
    <div className="flex items-start justify-center md:justify-start gap-2">
      <div className="text-[28px] sm:text-[40px] md:text-[56px] lg:text-[64px] leading-[0.9] font-black italic tracking-tight break-words text-white [text-shadow:_0_0_2px_rgba(255,255,255,0.25)]">
        {surname}
      </div>
      <div className="transform -mt-1 md:-mt-2 transition duration-300 rotate-45 group-hover:-rotate-45 flex-shrink-0">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke={ACCENT_COLOR}
          strokeWidth="3"
          className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </div>
    </div>
  </div>
);

const SchoolInfo = ({ school }) => (
  <div className="text-center md:text-left">
    <div
      className={`${michroma.className} relative flex items-center justify-center md:justify-start gap-2 p-1 sm:p-2 mt-2 max-w-[400px] mx-auto md:mx-0`}
    >
      <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center ">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke={ACCENT_COLOR}
          strokeWidth="2"
          className="opacity-90 w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <div
          className={`${michroma.className} text-[6px] sm:text-[9px] md:text-[12px] leading-[1.3] text-white/80 font-semibold tracking-wide`}
        >
          {school}
        </div>
      </div>
    </div>
  </div>
);

const EventCard = ({ image, children, href }) => (
  <Link
    href={href}
    className="relative w-full h-[30vh] overflow-hidden cursor-pointer bg-[#1a1a1a] group"
  >
    <div
      className="absolute inset-0 bg-cover scale-104 bg-center brightness-90 transition-transform duration-500 group-hover:scale-106"
      style={{ backgroundImage: `url('${image}')` }}
    ></div>

    <div className="relative z-10 w-full h-full p-4 sm:p-6 flex items-center justify-center">
      {children}
    </div>

    <div className="absolute inset-0 pointer-events-none opacity-5 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.1)_2px,rgba(255,255,255,0.1)_4px)]" />
  </Link>
);

export default function Explore() {
  return (
    <div
      className={`w-full  bg-white flex flex-col items-center justify-center gap-4 md:px-4 md:py-8 ${michroma.className}`}
    >
      {/* 1. TECHNICAL WORKSHOPS */}
      <EventCard image="/workshops.png" href="/workshops">
        <div className="flex flex-col md:flex-row justify-between w-full items-end md:items-center text-center md:text-right">
          <SchoolInfo school="INNOVATE - BUILD - LEARN" />
          <div className="md:max-w-[60%] mx-auto md:mx-0">
            <LargeSurname name="TECHNICAL" surname="WORKSHOPS" />
            <div className="flex gap-1 justify-center md:justify-end mt-2">
              <VerticalStripes count={9} size="small" />
            </div>
          </div>
        </div>
      </EventCard>

      {/* 2. COMPETITIONS */}
      <EventCard image="/competitions.png" href="/competitions">
        <div className="flex flex-col md:flex-row justify-between w-full items-end md:items-center text-center md:text-left">
          <LargeSurname name="THRILLING" surname="COMPETITIONS" />
          <SchoolInfo school="INNOVATE - COMPETE - CONQUER" />
        </div>
      </EventCard>

      {/* 3. LECTURES */}
      <EventCard image="/lecture.png" href="/lectures">
        <div className="flex flex-col md:flex-row justify-between w-full items-end md:items-center text-center md:text-right">
          <SchoolInfo school="THINK - INSPIRE - INNOVATE" />
          <div className="md:max-w-[45%] mx-auto md:mx-0">
            <LargeSurname name="INSIGHTFUL" surname="LECTURES" />
            <div className="flex gap-1 justify-center md:justify-end mt-2">
              <VerticalStripes count={9} size="small" />
            </div>
          </div>
        </div>
      </EventCard>
    </div>
  );
}
