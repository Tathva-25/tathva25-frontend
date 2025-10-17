import Image from "next/image";
import { Space_Mono } from "next/font/google";
import localFont from "next/font/local";
import Picture from "./Picture";

/*FONTS*/
const spacemono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});
const schabo = localFont({
  src: "../../../public/fonts/schabo.woff2",
});

function Loader() {
  return (
    <>
      <div className="absolute scale-80 sm:scale-100 -left-[45px] flex mt-10 ml-10 mr-30">
        <div
          className="loader-item-mob opacity-0"
          style={{ animationDelay: "0s" }}
        >
          <ImgtoImage src="/roboloader.png" alt="roboloader" />
        </div>
        <div
          className="loader-item-mob opacity-0"
          style={{ animationDelay: "0.4s" }}
        >
          <ImgtoImage src="/roboloader.png" alt="roboloader" />
        </div>
        <div
          className="loader-item-mob opacity-0"
          style={{ animationDelay: "0.8s" }}
        >
          <ImgtoImage src="/roboloader.png" alt="roboloader" />
        </div>
      </div>
    </>
  );
}

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
                  className={`bg-black px-2 pr-6 sm:pr-8 md:pr-12 lg:pr-24 py-1 ${schabo.className}`}
                >
                  <span className="text-white robopagetitle tracking-wider">
                    OCT 26,27
                  </span>
                </div>
                <div className={`bg-black py-1 ${schabo.className}`}>
                  <span className="robopagetitle">l</span>
                </div>

                <div
                  className={`${spacemono.className} text-[15px] sm:text-sm md:text-xl lg:text-2xl text-[400] flex flex-col`}
                >
                  <span>30 x 30 FT. ARENA</span>
                  <span>15KG \ 60KG</span>
                </div>
              </div>
            </div>
            <div className={`text-black ${schabo.className}`}>
              <span className="robopagetitle tracking-wider">
                PRIZES WORTH INR 8 LAKH
              </span>
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


export default function RobowarsPhone() {
  return (
    <>
      <div className="relative bg-[url('/robopagebg.png')] bg-cover">
        <Line />
        <Loader />
        <Picture imageSrc="/robomob2.png"/>
        <Region />
        <Line />
      </div>
    </>
  );
}
