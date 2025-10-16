import Image from "next/image"
import localFont from "next/font/local"
import Sidebar from "@/components/sidebar"
import gaming_hero from "../../../public/images/gaming/gaming_hero.png"
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
    <div className="bg-white flex flex-col-reverse sm:flex-row items-center justify-center relative">
      {/* <Sidebar/> */}
      {/* <Sidebar /> */}
        {/* Background NEXUS text with hexagons */}
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-center items-center text-[7rem] leading-[0.9] sm:text-[12rem] md:text-[25rem] sm:leading-[0.9] sm:tracking-widest">
          {/* Add the new class here */}
          <div className={`${effectStyles.effectContainer} ${integralCF.className} font-bold h-full flex flex-col justify-center sm:justify-between items-center pb-10`}
            style={{
              WebkitTextStroke: '2px black', 
            }}
          >
            <div>NEXUS</div>
            <div>NEXUS</div>
            <div className="sm:hidden">NEXUS</div>
            <div className="sm:hidden">NEXUS</div>
            <div className="sm:hidden">NEXUS</div>
            <div className="sm:hidden">NEXUS</div>
          </div>
        </div>

        <div className="z-10 flex flex-col items-center sm:h-screen justify-center sm:translate-x-40"> 
            {/* mx-auto centers the 60% container horizontally on the page */}
            {/* flex-col stacks children vertically */}
            {/* items-center centers children (Image container and Text container) horizontally */}

            {/* Image Container: Added flex justify-center to horizontally center the Image inside this 100% width container */}
            <div className="sm:h-screen flex justify-center">
                <Image
                    src={gaming_hero}
                    // width={500}
                    alt="Hero_Image"
                    className="sm:h-screen w-auto object-cover"
                />
            </div>
        </div>

        <div className="sm:px-10 flex flex-col sm:flex-row justify-center sm:items-center relative z-10">
          <div className="sm:mr-15">
            <div className={`${integralCF.className} text-xg sm:text-8xl font-bold text-left sm:w-[40rem]`}>
              GPC NEXUS
            </div>
            <div className="absolute sm:static bottom-0 left-0 sm:text-right sm:-translate-x-17 mt-3">
              <DotGridButton text="Learn More" min_height={20} min_width={40}/>
            </div>
          </div>  
          <div className={`${michroma.className} text-2xs sm:text-xl leading-relaxed mb-6 sm:mr-15 sm:max-w-[25vw]`}>
            Show off your skills and
            conquer the arena at <span className="text-red-800">Gaming</span>
            <span className="text-red-800">Conclave</span>, where only the
            best rise to the top
          </div>
        </div>
    </div>
  )
}

export default GamePage