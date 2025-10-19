import Image from "next/image"
import { Michroma } from "next/font/google"
import ModalWrapper from "@/app/components/modelWrapper"
import BrochureButton from "@/components/DotGridButton" 
import Link from "next/link"
import localFont from "next/font/local"

const michroma = Michroma({ subsets: ["latin"], weight: "400" })
const nippo = localFont({src:"../../public/fonts/nippo.otf"})

// DATA FETCHING FUNCTION
async function getBrochure(id) {
  const url = `https://api.tiqr.events/participant/event/${id}`;
  // Added cache control for dynamic data
  const res = await fetch(url, { cache: 'no-store' }); 

  if (!res.ok) {
    console.log("Failed to fetch brochure:", res);
    return []; // Return empty array on failure
  }
  const data = await res.json();
  return data.gallery || []; // Ensure gallery exists
}


// MAIN COMPONENT (NOW ASYNC + RESPONSIVE)
export default async function CardDetails({ id, src, alt, title, tagline, date, time, venue, price, desc, bigDesc }) {

  const brochures = await getBrochure(id);
  const hasBigDesc = bigDesc && bigDesc.trim() !== ""

  const workshopData = {
    id: id,
    name: title,
    date: date,
    time: time,
    ticketId: null, 
    venue: venue,
    price: price, 
    description: desc,
    catchyPara: bigDesc,
    image: src,
    isTeamEvent: false, 
    teamSize: null 
  };

  return (
    // This outer div simulates the page padding and background
    <div className="w-full  sm:px-4">
      <div className={`${michroma.className} lg:scale-80 sm:-mt-15 w-full mx-auto max-w-7xl md:shadow-2xl flex flex-col lg:flex-row rounded-b-2xl lg:rounded-xl overflow-hidden`}>
        
        {/* Image Section */}
        <div className="relative lg:w-[45%] aspect-[3/4] min-h-0">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content Section */}
        <div className="flex flex-col items-center w-full lg:w-[55%]">
          {/* Title Section */}
          <div className="md:px-6 sm:px-8 lg:px-10 pt-6 md:pb-6 border-b border-gray-200  w-full">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-normal tracking-wide">
              {title}
            </h1>
            <p className="text-base sm:text-lg mt-3 text-gray-600">
              {tagline}
            </p>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 md:px-6 sm:px-8 lg:px-10 py-6 lg:py-8 w-full">
            <InfoItem icon="/images/calendar.svg" label="Date" value={date} />
            <InfoItem icon="/images/clock.svg" label="Time" value={time} />
            <InfoItem icon="/images/pin.svg" label="Venue" value={venue} />
            <InfoItem icon="/images/tag.svg" label="Price" value={`₹ ${price}`} />
          </div>

          {/* Description */}
          <div className="md:px-6 sm:px-8 lg:px-10 py-6 border-t border-gray-200 w-full">
            <div className="flex items-center gap-2 mb-3">
              <h2 className="font-bold text-xl lg:text-2xl">Description</h2>
            </div>
            {/* Corrected font scaling */}
            <p className="text-sm sm:text-base leading-relaxed text-gray-700">
              {desc}
            </p>

            {hasBigDesc && (
              <a
                href="#full-description"
                className="inline-block mt-4 text-sm font-medium text-gray-700 hover:text-black transition-colors underline"
              >
                View Full Description ↓
              </a>
            )}
          </div>

          {/* Policies */}
          <div className="md:px-6 sm:px-8 lg:px-10 py-4 space-y-3 w-full">
            <Policy title="Note" text="Ticket details are automatically taken from your profile. You can update them on the profile page." />
            <Policy title="Refund Policy" text="All tickets are non-refundable and non-transferable except in case of event cancellation or technical issues." />
          </div>

          {/* Button Container */}
          <div className="md:px-6 pt-4 pb-8 w-full flex justify-center gap-5">
            <div className="flex justify-center">
              {/* Removed restrictive className */}
              <ModalWrapper workshopData={workshopData} />
            </div>

            {(brochures && brochures.length !== 0) && (
              <Link href={`${brochures[0].gallery}`} target="_blank" rel="noopener noreferrer">
                <div className="flex justify-center">
                  <button className="bg-black rounded-xs text-white p-4 px-8 text-xs md:text-lg">View Brochure</button>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Full Description Section */}
      {hasBigDesc && (
        <div
          id="full-description"
          // Harmonized styling with the card
          className={`w-full max-w-5xl mx-auto lg:mt-12  ${michroma.className} sm:bg-white md:p-6 sm:p-8 md:border rounded-xl scroll-mt-20`}
        >
          <h2 className={`text-xl font-bold sm:text-2xl   mb-4 pb-3 border-b border-gray-200`}>
            About This Event
          </h2>
          <div className=" max-w-none">
            <p className={`text-sm sm:text-base  ${michroma.className} font-bold leading-relaxed text-gray-800 whitespace-pre-line break-words`}>
              {bigDesc}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}


function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      {/* Responsive icon size */}
      <Image src={icon} alt={label} width={24} height={24} className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 mt-0.5" />
      <div className="min-w-0">
        {/* Responsive label */}
        <p className="text-xs sm:text-sm text-gray-600 uppercase tracking-wider">{label}</p>
        {/* Corrected responsive font scaling */}
        <p className="font-bold text-sm sm:text-base break-words">{value}</p>
      </div>
    </div>
  )
}

function Policy({ title, text }) {
  return (
    // Corrected responsive font scaling
    <div className="text-xs sm:text-sm leading-relaxed">
      <span className="font-bold">{title}: </span>
      <span className="text-gray-700">{text}</span>
    </div>
  )
}