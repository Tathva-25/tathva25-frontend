import Image from "next/image";
import React from "react";

const Proshow = () => {
  return (
    <div className="flex flex-col md:flex-row h-dvh justify-center items-center relative px-6 pl-10">
      {/* Coordinates text */}
      <div className="absolute hidden md:block top-10 left-20">
        11.3210°N <br />75.9320°E
      </div>
      <div className="absolute hidden md:block bottom-8 left-20">
        Be there <br />Feel it <br />Live it
      </div>

      {/* Image section */}
      <div className="md:w-[60%] flex justify-center relative">
        {/* Main Image */}
        <Image
          src="/images/proshow-main.png"
          alt="Proshow main"
          width={600}
          height={400}
          className="rounded-2xl object-contain max-w-[80%] md:max-w-[90%] h-auto"
          priority
        />

        {/* Text Image (overlayed and moves with main image) */}
        <div className="absolute inset-0 flex justify-center items-center">
          <Image
            src="/images/proshowText.png"
            alt="Proshow main text"
            width={400}
            height={400}
            className="rounded-2xl md:scale-[0.8] scale-[1.1] -mt-4 md:-mt-10 object-contain w-[60%] md:w-[70%] animate-slow-spin"
            priority
          />
        </div>
      </div>

      {/* Text content */}
      <div className="flex flex-col mt-6 md:mt-0 text-center md:text-left gap-6 md:w-[40%] p-6">
        <div className="text-3xl font-semibold mb-2">Heading</div>
        <div className="text-gray-700 leading-relaxed text-sm md:text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur,
          officia ipsam quia pariatur iusto debitis enim dolores modi, quod
          aspernatur maiores et nulla velit error natus tempora deleniti
          accusamus minus! Saepe consectetur asperiores exercitationem dolorem
          harum, dolores fugit accusamus porro quasi, voluptatum nihil aspernatur
          hic. Quis laboriosam fugiat magni asperiores iusto praesentium quia
          aliquam, optio eaque nulla quas. Voluptatum, autem?
        </div>
      </div>
    </div>
  );
};

export default Proshow;
