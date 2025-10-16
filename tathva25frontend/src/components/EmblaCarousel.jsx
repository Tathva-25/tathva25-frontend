"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export function EmblaCarousel() {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "center", skipSnaps: false },
    [Autoplay({ delay: 4000 })]
  );

  const images = [
    "https://i.pinimg.com/736x/38/33/b6/3833b6183a77bbdda8a8d409a93440e9.jpg",
    "https://i.pinimg.com/736x/0c/65/6f/0c656f74d16fd690590ccd118c18318d.jpg",
    "https://i.pinimg.com/736x/e5/d8/cf/e5d8cfa6d1af922664473e56e25b7297.jpg",
    "https://i.pinimg.com/736x/8a/93/9c/8a939c2ac3b789ef605c48d0dcb0ac0f.jpg",
  ];

  return (
    <div
      className="relative w-full overflow-hidden flex justify-center items-center py-6"
      ref={emblaRef}
    >
      <div className="flex">
        {images.map((src, index) => (
          <div
            key={index}
            className="flex-[0_0_100%] flex justify-center items-center px-4"
          >
            <div
              className="
                relative
                aspect-square
                rounded-full
                overflow-hidden
                shadow-lg
                border-4 border-white
                w-[80vw]
                sm:w-[60vw]
                md:w-[40vw]
                lg:w-[25vw]
              "
            >
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
