'use client'

import Image from "next/image"
import { Michroma } from "next/font/google"
import DotGridButton from "./DotGridButton"
import { useState } from "react"

const michroma = Michroma({ subsets: ["latin"], weight: "400" })

const CardDetails = ({src, alt, title, tagline, date, time, venue, price, desc, bigDesc }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Determine if there is content for the popup
  const hasBigDesc = bigDesc && bigDesc.trim() !== "";

  return (
    <div className={`${michroma.className} scale-80 w-full max-w-7xl shadow-2xl flex flex-col lg:flex-row rounded-b-2xl lg:rounded-xl bg-white overflow-x-hidden`}>
      {/* Image Section - 3:4 ratio */}
      <div className="relative lg:w-[45%] aspect-[3/4] min-h-0 mt-[69vh] lg:mt-0">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover" // Added object-cover to ensure image fills correctly
          priority
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col items-center w-full lg:w-[55%]">
        {/* Title Section */}
        <div className="px-6 lg:px-10 py-3 pb-6 border-b border-gray-200 text-center w-full">
          <h1 className="text-3xl lg:text-5xl font-normal tracking-wide">
            {title}
          </h1>
          <p className="text-base lg:text-lg mt-3 text-gray-600">
            {tagline}
          </p>
        </div>

        {/* Info Icons Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-6 lg:px-10 py-6 lg:py-8 w-full">
          <div className="flex items-start gap-3">
            <Image
              src="/images/calendar.svg"
              alt="calendar"
              width={24}
              height={24}
              className="w-6 h-6 flex-shrink-0"
            />
            <div className="min-w-0">
              <p className="text-lg text-gray-600">Date</p>
              <p className="font-bold text-lg lg:text-base break-words">{date}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Image
              src="/images/clock.svg"
              alt="clock"
              width={24}
              height={24}
              className="w-6 h-6 flex-shrink-0"
            />
            <div className="min-w-0">
              <p className="text-lg text-gray-600">Time</p>
              <p className="font-bold text-lg lg:text-base">{time}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Image
              src="/images/pin.svg"
              alt="pin"
              width={24}
              height={24}
              className="w-6 h-6 flex-shrink-0"
            />
            <div className="min-w-0">
              <p className="text-lg text-gray-600">Venue</p>
              <p className="font-bold text-lg lg:text-base break-words">{venue}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Image
              src="/images/tag.svg"
              alt="tag"
              width={24}
              height={24}
              className="w-6 h-6 flex-shrink-0"
            />
            <div className="min-w-0">
              <p className="text-lg text-gray-600">Price</p>
              <p className="font-bold text-lg lg:text-base">₹ {price}</p>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="px-6 lg:px-10 py-6 border-t border-gray-200 w-full">
          <div className="flex items-center gap-2 mb-3">
            <h2 className="font-bold text-xl lg:text-2xl">Description</h2>
            <button
              onClick={() => setIsPopupOpen(true)}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              disabled={!hasBigDesc} // <-- BUTTON IS DISABLED HERE
              className="transition-transform duration-300 flex hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded p-1 disabled:opacity-30 disabled:cursor-not-allowed disabled:scale-100"
              aria-label="View full description"
            >
              <span>See more</span>
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className={`transition-transform duration-300 ${isHovered && hasBigDesc ? 'rotate-[0deg]' : 'rotate-90'}`}
              >
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </button>
          </div>
          <p className="text-lg lg:text-base leading-relaxed text-gray-700">
            {desc}
          </p>
        </div>

        {/* Policies Section */}
        <div className="px-6 lg:px-10 py-4 space-y-3 w-full">
          <div className="text-xs lg:text-lg leading-relaxed">
            <span className="font-bold">Note: </span>
            <span className="text-gray-700">Ticket details are automatically taken from your profile. You can update them on the profile page.</span>
          </div>
          <div className="text-xs lg:text-lg leading-relaxed">
            <span className="font-bold">Refund Policy: </span>
            <span className="text-gray-700">All tickets are non-refundable and non-transferable except in the case of event cancellation or technical issues.</span>
          </div>
        </div>

        {/* Register Button */}
        <div className="px-6 lg:px-15 pt-4 pb-6 w-full flex justify-center gap-25">
          <div className="flex justify-center">
            <DotGridButton text="Register Now" min_width={50} className="max-w-[20px] lg:max-w-[50px]"/>
          </div>
          <div className="flex justify-center">
            <DotGridButton text="Display Brochure" min_width={50} className="max-w-[20px] lg:max-w-[50px]" />
          </div>
        </div>
      </div>

      {/* Full Description Popup */}
      {isPopupOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setIsPopupOpen(false)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 lg:px-10 py-4 flex items-center justify-between">
              <h2 className="font-bold text-2xl lg:text-3xl">Details</h2>
              <button
                onClick={() => setIsPopupOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors p-2 hover:bg-gray-100 rounded-full"
                aria-label="Close popup"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="px-6 lg:px-10 py-6 overflow-y-auto">
              <div className="text-base lg:text-lg leading-relaxed text-gray-700 whitespace-pre-wrap">
                {/* --- CONTENT IS NOW CONDITIONAL --- */}
                {hasBigDesc ? (
                  bigDesc
                ) : (
                  <p className="italic text-gray-500">No further details to be shown.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CardDetails