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
          className="h-auto w-full"
        />
      </div>
      <div className="flex flex-col w-full">
        <div className="titlebox w-full"
            style={{
            boxShadow: "0 8px 16px -8px rgba(0,0,0,0.2)"
          }}
        >
          <h1 className={`text-7xl  text-center w-full`}>
            {title}
          </h1>
          <p className={` mt-3 pl-[6rem]`}>
            {tagline}
          </p>
        </div>
        <div className="icons py-5 px-10">
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
        </div>
      </div>
    </div>
  )
}

export default Card