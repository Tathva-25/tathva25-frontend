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
          <div className="absolute inset-0 pointer-events-none flex flex-col justify-center items-center text-[25rem] leading-[0.9] tracking-widest">
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

          <div className="z-10 flex flex-col items-center h-screen justify-center translate-x-40"> 
              {/* mx-auto centers the 60% container horizontally on the page */}
              {/* flex-col stacks children vertically */}
              {/* items-center centers children (Image container and Text container) horizontally */}

              {/* Image Container: Added flex justify-center to horizontally center the Image inside this 100% width container */}
              <div className="h-screen">
                  <Image
                      src={gaming_hero}
                      // width={500}
                      alt="Hero_Image"
                      className="h-screen w-auto object-cover"
                      priority
                  />
              </div>
          </div>

          <div className="px-10 flex justify-center items-center relative z-10">
            <div className="mr-15">
              <div className={`${integralCF.className} text-[6vw] font-bold w-[40vw] text-center`}>
                GPC NEXUS
              </div>
              <div className="text-right -translate-x-17 mt-3">
                <DotGridButton text="Learn More" min_height={20} min_width={40}/>
              </div>
            </div>  
            <div className={`${michroma.className} text-2xs text-xl leading-relaxed mb-6 mr-15 max-w-[25vw]`}>
              Show off your skills and
              conquer the arena at <span className="text-red-800">Gaming</span>
              <span className="text-red-800">Conclave</span>, where only the
              best rise to the top
            </div>
          </div>
      </div>

      {/* Phone Componenet */}
      <div className="lg:hidden bg-gradient-to-r from-white to-[#d8d8d1] h-screen relative overflow-hidden flex flex-col justify-center px-3">
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-center items-center text-[25vw] leading-[1.1] ">
          {/* Add the new class here */}
          <div className={`${effectStyles.effectContainer} ${integralCF.className} font-extrabold flex flex-col justify-between items-center`}
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
          </div>
        </div>
        <div className="textbox relative z-10">
            <div className={`${michroma.className} text-xs my-0 translate-y-5`}>Tathva25</div>
            <div className={`text-[12vw] ${integralCF.className} font-bold`}>GPC NEXUS</div>
            <div className={`${michroma.className} leading-relaxed text-[2vw] w-[70%]`}>
              Show off your skills and
              conquer the arena at <span className="text-red-800">Gaming</span>
              <span className="text-red-800">Conclave</span>, where only the
              best rise to the top
            </div>
        </div>
        <div className="relative z-10 w-full -translate-y-10 flex justify-center items-center">
          <Image
              src={gaming_hero_mobile}
              // width={500}
              alt="Hero_Image"
              className=""
              priority
          />
        </div>
        <div className="text-right absolute bottom-5 right-13">
          <DotGridButton text="Learn More" min_height={20} min_width={20}/>
        </div>
      </div>
    </div>
  )
}

export default GamePage