import Image from "next/image";
import { Space_Mono } from "next/font/google";
import localFont from "next/font/local";

/*FONTS*/
const spacemono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});
const schabo = localFont({
  src: "../../../public/fonts/schabo.woff2",
});

/*Direct img tag to next Image tag converter..*/
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

/*Barcode component with actual size*/
function BarcodeImage({ src, alt }) {
  return (
    <Image
      src={`${src}`}
      alt={`${alt}`}
      width={100}
      height={200}
      className="h-auto w-auto object-contain"
    />
  );
}

function Loader() {
  return (
    <>
      <div className="absolute top-20 -left-40 flex scale-75 md:scale-50 lg:scale-75 lg:-left-5 xl:scale-100">
        <div className="loader-item opacity-0" style={{ animationDelay: "0s" }}>
          <ImgtoImage src="/roboloader.png" alt="roboloader" />
        </div>
        <div
          className="loader-item opacity-0"
          style={{ animationDelay: "0.4s" }}
        >
          <ImgtoImage src="/roboloader.png" alt="roboloader" />
        </div>
        <div
          className="loader-item opacity-0"
          style={{ animationDelay: "0.8s" }}
        >
          <ImgtoImage src="/roboloader.png" alt="roboloader" />
        </div>
        <div
          className="loader-item opacity-0"
          style={{ animationDelay: "1.2s" }}
        >
          <ImgtoImage src="/roboloader.png" alt="roboloader" />
        </div>
        <div
          className="loader-item opacity-0"
          style={{ animationDelay: "1.6s" }}
        >
          <ImgtoImage src="/roboloader.png" alt="roboloader" />
        </div>
        <div className="loader-item opacity-0" style={{ animationDelay: "2s" }}>
          <ImgtoImage src="/roboloader.png" alt="roboloader" />
        </div>
        <div
          className="loader-item opacity-0"
          style={{ animationDelay: "2.4s" }}
        >
          <ImgtoImage src="/roboloader.png" alt="roboloader" />
        </div>
      </div>
    </>
  );
}

/*LINES*/
function Line() {
  return (
    <>
      <div className="flex justify-center mx-2 my-6 items-center">
        <div className="bg-black w-[80%] h-[4px]"></div>
      </div>
    </>
  );
}

/*TEXTS*/
function Region() {
  return (
    <>
      <div className="mt-5 py-4">
        <div className="flex justify-between items-center px-4 sm:px-8 md:px-12 lg:px-20">
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
        <div></div>
      </div>
    </>
  );
}

/*Main pic*/
function Picture() {
  return (
    <div className="w-full">
      <div className="w-full">
        <ImgtoImage src="/robowars.png" alt="robowars" />
      </div>
    </div>
  );
}

export default function RobowarsDesktop() {
  return (
    <>
      <div className="relative bg-[url('/robopagebg.png')] bg-cover">
        <Line />
        <Loader />
        <Picture />
        <Region />
        <Line />
      </div>
    </>
  );
}
