import Image from "next/image";
import { Space_Mono } from "next/font/google";
import localFont from "next/font/local";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DotGridButton from "@/components/DotGridButton";

gsap.registerPlugin(ScrollTrigger);

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
  const loaderRef = useRef(null);

  useEffect(() => {
    const loaderItems = loaderRef.current.querySelectorAll(".loader-item");

    gsap.set(loaderItems, {
      opacity: 0,
      y: 20,
      scale: 0.5,
    });

    //tl => gsap.timeline(varsoptions)
    //tl.fromTo().to().to(). ...=> CHAINING OF ANIMATIONS?
    ScrollTrigger.create({
      trigger: loaderRef.current,
      start: "top 90%",
      onEnter: () => {
        const tl = gsap.timeline({ repeat: 0 });

        tl.fromTo(
          loaderItems,
          {
            opacity: 0,
            y: 20,
            scale: 0.5,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.4)",
            stagger: 0.12,
          }
        )
          .to(loaderItems, {
            y: -8,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.08,
          })
          .to(loaderItems, {
            y: 0,
            duration: 0.5,
            ease: "bounce.out",
            stagger: 0.08,
          })
          .to(
            loaderItems,
            {
              opacity: 0.3,
              scale: 0.9,
              duration: 0.6,
              ease: "power2.in",
              stagger: 0.08,
            },
            "+=0.3"
          )
          .to(loaderItems, {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
            stagger: 0.08,
          });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="absolute w-full flex justify-end pr-2 lg:pr-6 pt-16 lg:-translate-y-5 lg:translate-0 md:-top-10 md:-right-40 lg:top-auto lg:right-auto lg:pt-24 xl:pt-32 pb-4">
      <div ref={loaderRef} className="flex scale-75 md:scale-75 lg:scale-100">
        <div className="loader-item opacity-0">
          <ResponsiveImage
            src="/roboloader.png"
            alt="roboloader"
            className="md:w-6 md:h-10"
          />
        </div>
        <div className="-translate-x-5 loader-item opacity-0">
          <ResponsiveImage
            src="/roboloader.png"
            alt="roboloader"
            className="w-8 h-8 md:w-10 md:h-10"
          />
        </div>
        <div className="loader-item opacity-0 -translate-x-10">
          <ResponsiveImage
            src="/roboloader.png"
            alt="roboloader"
            className="w-8 h-8 md:w-10 md:h-10"
          />
        </div>
        <div className="loader-item opacity-0 -translate-x-15">
          <ResponsiveImage
            src="/roboloader.png"
            alt="roboloader"
            className="w-8 h-8 md:w-10 md:h-10"
          />
        </div>
        <div className="loader-item opacity-0 -translate-x-20">
          <ResponsiveImage
            src="/roboloader.png"
            alt="roboloader"
            className="w-8 h-8 md:w-10 md:h-10"
          />
        </div>
        <div className="loader-item opacity-0 -translate-x-25">
          <ResponsiveImage
            src="/roboloader.png"
            alt="roboloader"
            className="w-8 h-8 md:w-10 md:h-10"
          />
        </div>
        <div className="loader-item opacity-0 -translate-x-30">
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

function CircuitLines() {
  const linesRef = useRef(null);

  useEffect(() => {
    const paths = linesRef.current.querySelectorAll("path");

    gsap.set(paths, {
      strokeDasharray: 1000,
      strokeDashoffset: 1000,
      opacity: 0,
    });

    ScrollTrigger.create({
      trigger: linesRef.current,
      start: "top 60%",
      onEnter: () => {
        gsap.to(paths, {
          strokeDashoffset: 0,
          opacity: 0.3,
          duration: 3,
          repeat: -1,
          ease: "power2.inOut",
          stagger: {
            amount: 2,
            repeat: -1,
            repeatDelay: 1,
          },
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={linesRef} className="fixed inset-0 pointer-events-none z-0">
      <svg className="w-full h-full opacity-30">
        <defs>
          <linearGradient
            id="circuitGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#00ffff" stopOpacity="0" />
            <stop offset="50%" stopColor="#00ffff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#00ffff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,50 Q200,100 400,50 T800,50"
          stroke="url(#circuitGradient)"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M0,150 Q300,200 600,150 T1200,150"
          stroke="url(#circuitGradient)"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M200,300 Q500,350 800,300 T1400,300"
          stroke="url(#circuitGradient)"
          strokeWidth="1"
          fill="none"
        />
      </svg>
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
              <div className="flex flex-wrap gap-2 md:gap-4 items-center">
                <div
                  className={`bg-black px-3 md:pr-20 py-2  ${schabo.className}`}
                >
                  <span
                    className={`text-white text-xl md:text-2xl ${michroma.className} lg:text-3xl xl:text-4xl tracking-wider`}
                  >
                    OCT 24, 25
                  </span>
                </div>

                <div className={`bg-black px-2 py-2 ${schabo.className}`}>
                  <span className="text-black text-xl md:text-2xl lg:text-3xl xl:text-4xl">
                    |
                  </span>
                </div>

                <div
                  className={`${michroma.className} text-lg md:text-xl lg:text-2xl xl:text-3xl text-black`}
                >
                  <div className="flex flex-col">
                    <span>16 x 16 FT. ARENA</span>
                    <span>8KG \ 15KG</span>
                  </div>
                </div>
              </div>

              <div className={`text-black ${schabo.className}`}>
                <span
                  className={`text-2xl md:text-3xl lg:text-4xl  ${michroma.className} tracking-wider`}
                >
                  PRIZES WORTH INR 8 LAKH
                </span>
              </div>
            </div>
          </div>
          <div className="md:col-span-1 flex justify-center md:justify-end">
            <div className="flex flex-row items-center space-y-2 mt-8 md:mt-12 lg:mt-16 md:mr-20">
              {/* <div className="scale-90 relative right-32 top-1 ">
                <DotGridButton text="Learn More"/>
              </div> */}
              <BarcodeImage src="/barcode.png" alt="event-code" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RobowarsDesktop({ link }) {
  const containerRef = useRef(null);
  const loaderRef = useRef(null);
  const pictureRef = useRef(null);
  const regionRef = useRef(null);

  useEffect(() => {
    gsap.set([loaderRef.current, pictureRef.current, regionRef.current], {
      opacity: 0,
      y: 100,
      scale: 0.9,
    });

    ScrollTrigger.create({
      trigger: loaderRef.current,
      start: "top 100%",
      onEnter: () => {
        const tl = gsap.timeline({ repeat: 0 });
        tl.fromTo(
          loaderRef.current,
          {
            opacity: 1,
            y: 900,
            scale: 1,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.0,
            ease: "power3.out",
            delay: 0.1,
          }
        );
      },
    });

    ScrollTrigger.create({
      trigger: pictureRef.current,
      start: "top 100%",
      onEnter: () => {
        const tl = gsap.timeline({ repeat: 0 });
        tl.fromTo(
          pictureRef.current,
          {
            opacity: 1,
            y: 1200,
            scale: 1,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            delay: 0.4,
          }
        );
      },
    });

    ScrollTrigger.create({
      trigger: regionRef.current,
      start: "top 100%",
      once: true, //THIS IS HOW YOU RUN A GSAP ANIMATION ONLY ONCE ON SCROLL TRIGGER
      onEnter: () => {
        const tl = gsap.timeline({ repeat: 0 });
        tl.fromTo(
          regionRef.current,
          {
            opacity: 1,
            y: 400,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.8,
          }
        );
      },
    });

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 50%",
      onEnter: () => {
        const tl = gsap.timeline({ repeat: 0 });
        tl.to(containerRef.current, {
          backgroundSize: "105%",
          duration: 8,
          repeat: 0,
          yoyo: true,
          ease: "sine.inOut",
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{ backgroundSize: "100%" }}
    >
      <CircuitLines />

      <div className="w-full relative z-10">
        <div ref={loaderRef}>
          <Loader />
        </div>

        <div ref={pictureRef}>
          <Picture />
        </div>

        <div ref={regionRef}>
          <Region />
        </div>
      </div>
    </div>
  );
}
