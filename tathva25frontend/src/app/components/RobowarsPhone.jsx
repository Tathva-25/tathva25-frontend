import Image from "next/image";
import { Space_Mono } from "next/font/google";
import localFont from "next/font/local";
import DotGridButton from "@/components/DotGridButton";

/*FONTS*/
const spacemono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});
const schabo = localFont({
  src: "../../../public/fonts/schabo.woff2",
});

const michroma = localFont({
  src: "../../../public/fonts/michroma.ttf",
});


function Line() {
  return (
    <>
      <div className="flex justify-center mx-2 my-6 items-center">
        <div className="bg-black w-[80%] h-[4px]"></div>
      </div>
    </>
  );
}

function ImgtoImage({ src, alt }) {
  return (
    <Image
      src={`${src}`}
      alt={`${alt}`}
      width={0}
      height={0}
      sizes="100vw"
      className="w-full h-auto object-cover"
      style={{
        width: "100%",
        height: "auto",
      }}
    />
  );
}

function Region() {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-5">
        <div className="flex w-full h-full justify-between items-center px-4 sm:px-8 md:px-12 lg:px-20">
          <div className="flex flex-col gap-3 sm:gap-4 md:gap-6">
            <div>
              <div className="flex gap-2 sm:gap-3 md:gap-5 lg:gap-10 flex-wrap items-center">
                <div
                  className={`bg-black m-2 mt-8 px-2 pr-6 sm:pr-8 md:pr-12 lg:pr-24 py-1 ${schabo.className} w-[80vw] text-left`}
                >
                  <span className={`text-white ${michroma.className} robopagetitle tracking-widest`}>
                    OCT 24, 25
                  </span>
                </div>
                <div className={`bg-black py-1 ${schabo.className} relative top-1 `}>
                  <span className="robopagetitle">l</span>
                </div>
                <span className={`${michroma.className} relative left-2.5`}>
                  PRIZES WORTH INR 8 LAKH
                </span>
                
              </div>
            </div>
            <div className={`text-black ${schabo.className} flex items-center justify-around`}>
              <div
                  className={`${spacemono.className} text-[15px] sm:text-sm md:text-xl lg:text-2xl text-[400] flex flex-col items-center`}
                >
                  <span>30 x 30 FT. ARENA</span>
                  <span>15KG \ 60KG</span>
                </div>
              <div className="scale-60 relative left-4">
                <DotGridButton text="Learn More"/>
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-full h-full">
          <ImgtoImage src="/barcode.png" alt="barcode" />
        </div>
      </div>
    </>
  );
}

function Picture() {
  return (
    <div className="w-full">
      <div className="w-full">
        <ImgtoImage src="/robomob2.png" alt="robowars" />
      </div>
    </div>
  );
}

export default function RobowarsPhone() {
  return (
    <>
      <div className="relative ">
        <Picture />
        <Region />
      </div>
    </>
  );
}
