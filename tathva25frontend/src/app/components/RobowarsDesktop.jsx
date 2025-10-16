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

/*CONVERT ANY IMG TO IMAGE TAG*/
function ResponsiveImage({ src, alt, className = "" }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={0}
      height={0}
      sizes="100vw"
      className={`w-full h-auto object-cover ${className}`}
      style={{
        width: "100%",
        height: "auto",
      }}
    />
  );
}

function BarcodeImage({ src, alt }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={150}
      height={300}
      className="h-auto w-auto object-contain scale-125 md:scale-150 lg:scale-175"
    />
  );
}

function Loader() {
  return (
    <div className="absolute w-full flex justify-end pr-2 lg:pr-6 pt-16 lg:-translate-y-5 lg:translate-0 md:-top-10 md:-right-40 lg:top-auto lg:right-auto lg:pt-24 xl:pt-32 pb-4">
      <div className="flex scale-75 md:scale-75 lg:scale-100">
        <div className="loader-item opacity-0" style={{ animationDelay: "0s" }}>
          <ResponsiveImage
            src="/roboloader.png"
            alt="roboloader"
            className="md:w-6 md:h-10"
          />
        </div>
        <div
          className="-translate-x-5 loader-item opacity-0"
          style={{ animationDelay: "0.4s" }}
        >
          <ResponsiveImage
            src="/roboloader.png"
            alt="roboloader"
            className="w-8 h-8 md:w-10 md:h-10"
          />
        </div>
        <div
          className="loader-item opacity-0 -translate-x-10"
          style={{ animationDelay: "0.8s" }}
        >
          <ResponsiveImage
            src="/roboloader.png"
            alt="roboloader"
            className="w-8 h-8 md:w-10 md:h-10"
          />
        </div>
        <div
          className="loader-item opacity-0 -translate-x-15"
          style={{ animationDelay: "1.2s" }}
        >
          <ResponsiveImage
            src="/roboloader.png"
            alt="roboloader"
            className="w-8 h-8 md:w-10 md:h-10"
          />
        </div>
        <div
          className="loader-item opacity-0 -translate-x-20"
          style={{ animationDelay: "1.6s" }}
        >
          <ResponsiveImage
            src="/roboloader.png"
            alt="roboloader"
            className="w-8 h-8 md:w-10 md:h-10"
          />
        </div>
        <div
          className="loader-item opacity-0 -translate-x-25"
          style={{ animationDelay: "2.0s" }}
        >
          <ResponsiveImage
            src="/roboloader.png"
            alt="roboloader"
            className="w-8 h-8 md:w-10 md:h-10"
          />
        </div>
        <div
          className="loader-item opacity-0 -translate-x-30"
          style={{ animationDelay: "2.4s" }}
        >
          <ResponsiveImage
            src="/roboloader.png"
            alt="roboloader"
            className="w-8 h-8 md:w-10 md:h-10"
          />
        </div>
      </div>
    </div>
  );
}

function Line() {
  return (
    <div className="w-full flex justify-center">
      <div className="bg-black w-[80%] h-1 md:h-[4px]"></div>
    </div>
  );
}

function Picture() {
  return (
    <div className="w-full">
      <div className="w-full">
        <ResponsiveImage src="/robodesktop.png" alt="event-hero" />
      </div>
    </div>
  );
}

function Region() {
  return (
    <div className="w-full h-full px-4 md:px-8 lg:px-12 py-10 md:py-12 lg:py-15 xl:py-18">
      <div className="max-w-8xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-16 items-start">
          <div className="md:col-span-1 lg:col-span-2">
            <div className="space-y-4 md:space-y-6">
              {/* Date and Basic Info */}
              <div className="flex flex-wrap gap-2 md:gap-4 items-center">
                <div
                  className={`bg-black px-3 md:pr-20 py-2  ${schabo.className}`}
                >
                  <span className="text-white text-xl md:text-2xl lg:text-3xl xl:text-4xl tracking-wider">
                    OCT 26,27
                  </span>
                </div>

                <div className={`bg-black px-2 py-2 ${schabo.className}`}>
                  <span className="text-black text-xl md:text-2xl lg:text-3xl xl:text-4xl">
                    |
                  </span>
                </div>

                <div
                  className={`${spacemono.className} text-lg md:text-xl lg:text-2xl xl:text-3xl text-black`}
                >
                  <div className="flex flex-col">
                    <span>30 x 30 FT. ARENA</span>
                    <span>15KG \ 60KG</span>
                  </div>
                </div>
              </div>

              <div className={`text-black ${schabo.className}`}>
                <span className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl tracking-wider">
                  PRIZES WORTH INR 8 LAKH
                </span>
              </div>
            </div>
          </div>
          <div className="md:col-span-1 flex justify-center md:justify-end">
            <div className="flex flex-col items-center space-y-2 mt-8 md:mt-12 lg:mt-16 md:mr-20">
              <BarcodeImage src="/barcode.png" alt="event-code" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RobowarsDesktop({ link }) {
  return (
    <div className="min-h-screen bg-[url('/robobg.png')] bg-cover bg-center bg-no-repeat">
      <div className="w-full relative">
        <Loader />
        <Picture />
        <Region />
      </div>
    </div>
  );
}
