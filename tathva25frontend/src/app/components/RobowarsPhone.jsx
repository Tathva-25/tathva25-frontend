import Image from "next/image";
import { Space_Mono, Michroma } from "next/font/google";
import localFont from "next/font/local";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const michroma = Michroma({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-michroma",
});

function Loader() {
  const loaderRef = useRef(null);

  useEffect(() => {
    const loaderItems = loaderRef.current.querySelectorAll(".loader-item-mob");

    gsap.set(loaderItems, {
      opacity: 0,
      y: 20,
      scale: 0.5,
    });

    ScrollTrigger.create({
      trigger: loaderRef.current,
      start: "top 90%",
      onEnter: () => {
        const tl = gsap.timeline({ repeat: -1 });

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
            y: -16,
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
    <>
      <div className="absolute scale-70 top-10 sm:scale-80 -right-10 flex mt-16 mr-4">
        <div ref={loaderRef} className="flex">
          <div className="loader-item-mob opacity-0">
            <ImgtoImage src="/roboloader.png" alt="roboloader" />
          </div>
          <div className="-translate-x-5 loader-item-mob opacity-0">
            <ImgtoImage src="/roboloader.png" alt="roboloader" />
          </div>
          <div className="loader-item-mob opacity-0 -translate-x-10">
            <ImgtoImage src="/roboloader.png" alt="roboloader" />
          </div>
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
                  className={`bg-black px-2 pr-6 sm:pr-8 md:pr-12 lg:pr-24 py-1 ${michroma.className}`}
                >
                  <span className="text-white robopagetitle tracking-wider">
                    OCT 26,27
                  </span>
                </div>
                <div className={`bg-black py-1 ${michroma.className}`}>
                  <span className="robopagetitle">l</span>
                </div>

                <div
                  className={`${michroma.className} text-[15px] sm:text-sm md:text-xl lg:text-2xl text-[400] flex flex-col`}
                >
                  <span>30 x 30 FT. ARENA</span>
                  <span>15KG \ 60KG</span>
                </div>
              </div>
            </div>
            <div className={`text-black ${michroma.className}`}>
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
      once: true,
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
    <>
      <div
        ref={containerRef}
        className="relative bg-[url('/robopagebg.png')] bg-cover"
        style={{ backgroundSize: "100%" }}
      >
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
    </>
  );
}
