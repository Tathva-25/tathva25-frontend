import Image from "next/image"
import localFont from "next/font/local"
import Sidebar from "@/components/sidebar"
import gaming_hero from "../../../public/images/gaming/gaming_hero.png"
import gaming_hero_mobile from "../../../public/images/gaming/gaming_hero_mobile.png"
import { Michroma } from "next/font/google"
import DotGridButton from "@/components/DotGridButton"
import { JetBrains_Mono } from 'next/font/google'
import effectStyles from "./gaming_styles.module.css"
import { Mic } from "lucide-react"
import Link from "next/link"

export const integralCF = localFont({
  // The files you're pointing to are relative to the project root
  src: [
    {
      path: '../../../public/fonts/Integral-CF/Demo_Fonts/Fontspring-DEMO-integralcf-medium.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Integral-CF/Demo_Fonts/Fontspring-DEMO-integralcf-regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Integral-CF/Demo_Fonts/Fontspring-DEMO-integralcf-bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Integral-CF/Demo_Fonts/Fontspring-DEMO-integralcf-extrabold.otf',
      weight: '800',
      style: 'normal',
    }
    // Add other weights/styles as needed
  ],
  variable: '--font-integral-cf', // Optional: for using with CSS variables
});

const jetBrainsMono = JetBrains_Mono({
  // Specify which subsets you need to load (latin is the default)
  subsets: ['latin'],
  
  // This is a Variable Font, so we don't need to specify weights.
  // It loads all weights by default, but you can limit them if needed:
  // weight: ['400', '700'], 

  // Optional: Define a CSS variable for Tailwind CSS or custom CSS
  variable: '--font-mono', 

  // Optional: Font display strategy
  display: 'swap', 
})

const michroma = Michroma({ subsets: ["latin"], weight: "400" })

const GamePage = () => {
  return (
    
    <div>
      <div className="hidden overflow-hidden lg:flex bg-white flex-row items-center justify-center relative overflow-x-hidden min-h-screen">
        {/* <Sidebar/> */}
        {/* <Sidebar /> */}
          {/* Background NEXUS text with hexagons */}
          <div className="absolute inset-0 pointer-events-none flex flex-col justify-center items-center text-[20rem] leading-[0.9] tracking-widest">
            {/* Add the new class here */}
            <div className={`${effectStyles.effectContainer} ${integralCF.className} font-bold h-full flex flex-col justify-between items-center pb-10`}
              style={{
                WebkitTextStroke: '2px black', 
              }}
            >
              <div>NEXUS</div>
              <div>NEXUS</div>
            </div>
          </div>

          <div className="z-10 flex flex-col items-center h-screen justify-center "> 
              {/* mx-auto centers the 60% container horizontally on the page */}
              {/* flex-col stacks children vertically */}
              {/* items-center centers children (Image container and Text container) horizontally */}

              {/* Image Container: Added flex justify-center to horizontally center the Image inside this 100% width container */}
              <div className="h-screen translate-x-20 md:translaate-x-0">
                  <Image
                      src={gaming_hero}
                      // width={500}
                      alt="Hero_Image"
                      className="h-screen w-auto object-cover"
                      priority
                  />
              </div>
          </div>

          <div className="px-10 flex  mt-14 -mr-20 justify-center items-center relative z-10">
            <div className="mr-15 ">
              <div className={`${integralCF.className} text-5xl  -mt-3 font-bold w-[20vw] text-center`}>
                GPC NEXUS
              </div>
              <div className="text-right  mt-6 mr-10">
                <DotGridButton text="Learn More"  min_width={40} height={30} width={200}/>
              </div>
            </div>  
            <div className={`${michroma.className} text-center text-xl mt-8 mb-6 mr-15  w-[400px]`}>
              Show off your skills and
              conquer the arena at <span className="text-red-800">Gaming</span>
              <span className="text-red-800">Conclave</span>, where only the
              best rise to the top
            </div>
          </div>
      </div>

      {/* Phone Componenet */}
<div className="lg:hidden bg-gradient-to-r from-white to-[#d8d8d1] min-h-screen relative overflow-hidden flex flex-col px-3 py-6">
  {/* Background NEXUS text - reduced size for mobile */}
  <div className="mt-10 absolute inset-0 pointer-events-none flex flex-col justify-center items-center text-[20vw] leading-[1.1] opacity-30">
    <div className={`${effectStyles.effectContainer} ${integralCF.className} font-extrabold flex tracking-[0.2em] flex-col justify-between items-center ml-5`}
      style={{
        WebkitTextStroke: '1px #8d705d', 
      }}
    >
      <div>NEXUS</div>
      <div>NEXUS</div>
      <div>NEXUS</div>
      <div>NEXUS</div>
      <div>NEXUS</div>
      <div>NEXUS</div>
      <div>NEXUS</div>
      <div>NEXUS</div>
    </div>
  </div>

  {/* Content Container */}
  <div className="relative z-10 flex flex-col sm:gap-4">
    {/* Text Box */}
    <div className="textbox">
      <div className={`text-5xl ${integralCF.className} font-bold mb-3`}>GPC NEXUS</div>
      <div className={`${michroma.className} leading-relaxed text-sm `}>
        Show off your skills and
        conquer the arena at <span className="text-red-800">Gaming Conclave</span>, where only the
        best rise to the top
      </div>
    </div>

    {/* Image Container */}
    <div className="w-full flex justify-center sm:py-4">
      <Image
        src={gaming_hero_mobile}
        alt="Hero_Image"
        className="w-full h-auto max-w-sm object-contain"
        priority
      />
    </div>

    {/* Button */}
    <Link href="/competitions">
    <div className="flex justify-center mt-">
      <DotGridButton text="Learn More" min_height={20} min_width={20}/>
         </div>
      </Link>
 
  </div>
</div>
    </div>
  )
}

export default GamePage