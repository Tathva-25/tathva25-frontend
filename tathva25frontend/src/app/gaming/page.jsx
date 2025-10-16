import Image from "next/image"
import localfont from "next/font/local"
import gaming_hero from "../../../public/images/gaming/gaming_hero.png"
import text_box_1 from "../../../public/images/gaming/text_box_1.png"
import text_box_2 from "../../../public/images/gaming/text_box_2.png"
import { JetBrains_Mono } from 'next/font/google'

const customFont = localfont({
    src: '../../../public/fonts/neoform.otf',
})

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

const GamePage = () => {
  return (
    <div className="bg-white flex flex-col sm:flex-row items-center justify-center relative overflow-hidden min-h-screen">
      {/* <Sidebar /> */}
        {/* Background NEXUS text with hexagons */}
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-center items-center overflow-hidden text-[7rem] leading-[0.9] sm:text-[12rem] md:text-[25rem] sm:leading-[0.9] sm:tracking-widest">
          {/* Add the new class here */}
          <div className={`text-effect-container ${customFont.className} font-bold whitespace-nowrap`}>
            <div>NEXUS</div>
            <div>NEXUS</div>
            <div className="lg:hidden">NEXUS</div>
            <div className="lg:hidden">NEXUS</div>
            <div className="lg:hidden">NEXUS</div>
            <div className="sm:hidden">NEXUS</div>
            <div className="sm:hidden">NEXUS</div>
            <div className="sm:hidden">NEXUS</div>
          </div>
        </div>
        {/* Bottom left hexagons - sm and up only */}
        <div className="hidden sm:block absolute left-0 bottom-0 pointer-events-none opacity-15">
          <svg width="300" height="300" viewBox="0 0 300 300" className="text-gray-400">
            <defs>
              <pattern id="hexPattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <polygon points="40,10 70,25 70,55 40,70 10,55 10,25" fill="none" stroke="currentColor" strokeWidth="2"/>
                <polygon points="40,10 70,25 70,55 40,70 10,55 10,25" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" transform="translate(40, 40)"/>
              </pattern>
            </defs>
            <rect width="300" height="300" fill="url(#hexPattern)"/>
          </svg>
        </div>

        {/* Top right hexagons - sm and up only */}
        <div className="hidden sm:block absolute right-0 top-0 pointer-events-none opacity-15">
          <svg width="300" height="300" viewBox="0 0 300 300" className="text-gray-400">
            <defs>
              <pattern id="hexPattern2" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <polygon points="40,10 70,25 70,55 40,70 10,55 10,25" fill="none" stroke="currentColor" strokeWidth="2"/>
                <polygon points="40,10 70,25 70,55 40,70 10,55 10,25" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" transform="translate(40, 40)"/>
              </pattern>
            </defs>
            <rect width="300" height="300" fill="url(#hexPattern2)"/>
          </svg>
        </div>

        <div className="sm:w-[60%] z-10 flex flex-col items-center sm:h-screen justify-center mx-auto"> 
            {/* mx-auto centers the 60% container horizontally on the page */}
            {/* flex-col stacks children vertically */}
            {/* items-center centers children (Image container and Text container) horizontally */}

            {/* Image Container: Added flex justify-center to horizontally center the Image inside this 100% width container */}
            <div className="sm:w-[100%] flex justify-center">
                <Image
                    src={gaming_hero}
                    width={500}
                    alt="Hero_Image"
                />
            </div>
        </div>

        <div className="sm:py-5 lg:px-10 lg:w-[40%] flex sm:justify-center sm:items-center relative z-10 ">
          <div className="relative w-full sm:h-screen flex items-center justify-center p-4 ">
            <Image
              src={text_box_1}
              // width={350}
              alt="textbox_1"
              className="sm:w-[30rem] lg:w-[30rem]"
            />
            <div className="absolute text-center">
              <div className={`${jetBrainsMono.className} text-gray-800 text-lg leading-relaxed font-mono mb-6`}>
                <p>Show off your skills and</p>
                <p>conquer the arena at <span className="text-red-800">Gaming</span></p>
                <p><span className="text-red-800">Conclave</span>, where only the</p>
                <p>best rise to the top</p>
              </div>
            </div>
            <div className="absolute translate-y-20">
              <div className="relative flex items-center justify-center gap-3">
                <Image
                  src={text_box_2}
                  alt="text_box_2"
                  className="w-[20rem]"
                  // width={300}
                />
                <p className="absolute text-[1rem]">LEARN MORE</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default GamePage