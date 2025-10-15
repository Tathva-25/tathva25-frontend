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
      <div></div>
    </>
  );
}

function Picture() {
  return (
    <div className="w-full">
      <div className="w-full">
        <ImgtoImage src="/robomob.png" alt="robowars" />
      </div>
    </div>
  );
}

export default function RobowarsPhone() {
  return (
    <>
      <div className="relative bg-[url('/robopagebg.png')] bg-amber-200 bg-cover">
        <Line />
        <Loader />
        <Picture />
        <Region />
        <Line />
      </div>
    </>
  );
}
