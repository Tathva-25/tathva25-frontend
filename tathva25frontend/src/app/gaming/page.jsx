import Image from "next/image"
import localfont from "next/font/local"
import gaming_hero from "../../../public/images/gaming/gaming_hero_w_text.png"
import text_box_1 from "../../../public/images/gaming/text_box_1.png"
const customFont = localfont({
    src: '../../../public/fonts/neoform.otf',
})

const GamePage = () => {
  return (
    <div className="bg-white flex relative overflow-hidden">
        {/* Background NEXUS text */}
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

        <div className="pb-5 px-10 md:pl-40 w-[60%] relative z-10">
            <div className="md:w-[70%]">
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
        <div className="py-5 px-10 w-[40%] flex justify-center items-center relative z-10">
            <Image
                src={text_box_1}
                width={200}
            />
        </div>
    </div>
  )
}

export default GamePage