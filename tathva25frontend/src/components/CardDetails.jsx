import Image from "next/image";
import { Michroma } from "next/font/google";
import DotGridButton from "./DotGridButton";

const michroma = Michroma({ subsets: ["latin"], weight: "400" });

const CardDetails = ({src, alt, title, tagline, date, time, venue, price, desc, big_desc}) => {
  return (
    <div className={`${michroma.className} w-full max-w-7xl shadow-2xl flex flex-col lg:flex-row rounded-b-2xl lg:rounded-xl bg-white overflow-x-hidden`}>
      {/* Image Section - 3:4 ratio */}
      <div className="relative lg:w-[45%] aspect-[3/4] min-h-0 lg:mt-0">
        <Image src={src} alt={alt} fill className="" priority />
      </div>

      {/* Content Section */}
      <div className="flex flex-col items-center w-full lg:w-[55%]">
        {/* Title Section */}
        <div className="px-6 lg:px-10 py-3 pb-6 border-b border-gray-200 text-center">
          <h1 className="text-3xl lg:text-5xl font-normal tracking-wide">
            {title}
          </h1>
          <p className="text-base lg:text-lg mt-3 text-gray-600">{tagline}</p>
        </div>

        {/* Info Icons Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-6 lg:px-10 py-6 lg:py-8">
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
              <p className="font-bold text-lg lg:text-base break-words">
                {date}
              </p>
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
              <p className="font-bold text-lg lg:text-base break-words">
                {venue}
              </p>
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
        <div className="px-6 lg:px-10 py-6 border-t border-gray-200">
          <h2 className="font-bold text-xl lg:text-2xl mb-3">Description</h2>
          <p className="text-lg lg:text-base leading-relaxed text-gray-700">
            {desc}
          </p>
        </div>

        {/* Policies Section */}
        <div className="px-6 lg:px-10 py-4 space-y-3">
          <div className="text-xs lg:text-lg leading-relaxed">
            <span className="font-bold">Note: </span>
            <span className="text-gray-700">
              Ticket details are automatically taken from your profile. You can
              update them on the profile page.
            </span>
          </div>
          <div className="text-xs lg:text-lg leading-relaxed">
            <span className="font-bold">Refund Policy: </span>
            <span className="text-gray-700">
              All tickets are non-refundable and non-transferable except in the
              case of event cancellation or technical issues.
            </span>
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
    </div>
  );
};

export default CardDetails;
