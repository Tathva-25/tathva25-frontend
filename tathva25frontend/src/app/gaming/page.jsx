import Image from "next/image"
import localfont from "next/font/local"
import gaming_hero from "../../../public/images/gaming/gaming_hero_w_text.png"
import text_box_1 from "../../../public/images/gaming/text_box_1.png"
import text_box_2 from "../../../public/images/gaming/text_box_2.png"
import Navbar from "@/components/navbar"
import Sidebar from "@/components/sidebar"

const customFont = localfont({
    src: '../../../public/fonts/neoform.otf',
})

const GamePage = () => {
  return (
    <div className="bg-white flex flex-col sm:flex-row relative overflow-hidden">
      {/* <Sidebar /> */}
        {/* Background NEXUS text with hexagons */}
        <div className="absolute inset-0 pointer-events-none opacity-10 flex flex-col justify-center items-center overflow-hidden">
          <div className={`${customFont.className} text-black font-bold whitespace-nowrap`} style={{fontSize: '20rem', lineHeight: '0.9'}}>
            NEXUS
          </div>
          <div className={`${customFont.className} text-black font-bold whitespace-nowrap`} style={{fontSize: '20rem', lineHeight: '0.9'}}>
            NEXUS
          </div>
          <div className={`${customFont.className} text-black font-bold whitespace-nowrap`} style={{fontSize: '20rem', lineHeight: '0.9'}}>
            NEXUS
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

        <div className="sm:pb-5 px-10 sm:pl-40 sm:w-[60%] relative z-10 ">
            <div className="sm:w-[70%]">
                <Image
                    src={gaming_hero}
                    width={400}
                    alt="Hero_Image"
                />
                
            </div>
            <div className="hero">
                <div className={`MainTitle ${customFont.className} text-[#550d0d] text-7xl flex flex-col items-center md:w-[70%]`}>
                    <p>Gaming</p>
                    <p>Conclave</p>
                </div>
            </div>
            <div className="desc"></div>
        </div>
        <div className="sm:py-5 px-10 sm:w-[40%] flex sm:justify-center sm:items-center relative z-10">
          <div className="relative w-full sm:h-screen flex items-center justify-center p-4">
            <Image
              src={text_box_1}
              width={400}
            />
            <div className="absolute text-center">
              <p className="text-gray-800 text-lg leading-relaxed font-mono mb-6">
                <p>Show off your skills and</p>
                <p>conquer the arena at <span className="text-red-800">Gaming</span></p>
                <p><span className="text-red-800">Conclave</span>, where only the</p>
                <p>best rise to the top</p>
              </p>
            </div>
            <div className="absolute translate-y-18">
              <div className="relative flex items-center justify-center gap-3">
                <Image
                  src={text_box_2}

                  // width={300}
                />
                <p className="absolute">LEARN MORE</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default GamePage