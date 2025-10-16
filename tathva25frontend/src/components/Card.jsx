import Image from "next/image"
import { Michroma } from "next/font/google"

const michroma = Michroma({ subsets: ["latin"], weight: "400" })

const Card = ({src, title, tagline, date, time, venue, price, desc, }) => {
  return (
    <div className={`${michroma.className} lg:w-[80%] shadow-2xl flex rounded-xl`}>
      <div className="lg:w-[45%]">
        <Image
          src={src}
          width={200}
          height={200}
          className="h-full w-auto"
        />
      </div>
      <div className="flex flex-col w-full py-5 items-center">
        <div className="titlebox w-full"
            style={{
            boxShadow: "0 8px 16px -8px rgba(0,0,0,0.2)"
          }}
        >
          <h1 className={`text-7xl  text-center w-full`}>
            {title}
          </h1>
          <p className={` my-5 pl-[6rem]`}>
            {tagline}
          </p>
        </div>
        <div className="icons py-5 grid grid-cols-2 sm:grid-cols-4 gap-5 sm:translate-x-10">
          <div className="icon1 flex gap-2">
            <Image
              src="/images/calendar.svg"
              width={20}
              height={20}
              className="w-[2rem]"
            />
            <div>
              <p>Date:</p>
              <p className="font-bold">{date}</p>
            </div>
          </div>
          <div className="icon1 flex gap-2">
            <Image
              src="/images/clock.svg"
              width={20}
              height={20}
              className="w-[2rem]"
            />
            <div>
              <p>Time:</p>
              <p className="font-bold">{time}</p>
            </div>
          </div>
          <div className="icon1 flex gap-2">
            <Image
              src="/images/pin.svg"
              width={20}
              height={20}
              className="w-[2rem]"
            />
            <div>
              <p>Venue:</p>
              <p className="font-bold">{venue}</p>
            </div>
          </div>
          <div className="icon1 flex gap-2">
            <Image
              src="/images/tag.svg"
              width={20}
              height={20}
              className="w-[2rem]"
            />
            <div>
              <p>Price:</p>
              <p className="font-bold">₹ {price}</p>
            </div>
          </div>
        </div>
        <div className="descBox px-10 py-5"
          style={{
            boxShadow: "0 -8px 16px -8px rgba(0,0,0,0.2)"
          }}
        >
          <h1 className="font-bold text-2xl">Description</h1>
          <p className="text-xl font-[100] tracking-wide leading-8">
            {desc}
          </p>
        </div>
        <div className="h-[2px] bg-[#D4B255] w-[90%]"></div>
        <div className="policies w-[90%] PY-5">
          <div className="text-lg">
            <span className="font-bold">Note : </span> Ticket details are automatically taken from your profile. You can update them on the profile page.
          </div>
          <div className="text-lg mt-3">
            <span className="font-bold">Refund Policy : </span> All tickets are non-refundable and non-transferable except in the case of event cancellation or technical issues..
          </div>
        </div>
        <button className="px-3 py-3 shadow-lg text-3xl mt-5">
          Register Now
        </button>
      </div>
    </div>
  )
}

export default Card