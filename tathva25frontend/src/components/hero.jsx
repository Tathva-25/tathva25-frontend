// src/components/Hero.js
'use client';
import { gsap } from 'gsap';
import { useEffect,useRef } from 'react';
import { ScrollTrigger } from 'gsap/all';
import Image from 'next/image';
import heroAvatar from '../../public/images/avatar-body.png';
import wheel from '../../public/images/wheel.png'
import EyeIcon from '../../public/images/eye.svg'
import Background from '../../public/images/Background.png'
import number from '../../public/images/003.png'
import localfont from 'next/font/local';
import lines from '../../public/images/animation/Lines.svg'

gsap.registerPlugin(ScrollTrigger)

const customFont = localfont({
  src: '../../public/fonts/neoform.otf', // Next.js treats /public as root /
})
export const Hero=()=> {
  //Line Animations
  const svgRef =useRef([]);
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Target all lines or paths inside your SVG
    const lines = svg.querySelectorAll("line, path");

    // Set initial state
    gsap.set(lines, {
      strokeDasharray: 500,
      strokeDashoffset: 500,
      scaleX: 0.2,
      transformOrigin: "center center",
      opacity: 0.5,
    });

    // Animate on scroll
    gsap.to(lines, {
      strokeDashoffset: 0,
      scaleX: 1.2,
      opacity: 1,
      ease: "power2.out",
      stagger: 0.2,
      scrollTrigger: {
        trigger: svg,
        start: "top 85%",
        end: "bottom 20%",
        scrub: true,
      },
    });
  }, []);

  

  return (

    <section className={` min-h-screen flex items-center justify-center px-5 py-8 pt-20`}>
      

      <div className="max-w-7xl mx-auto w-full">
        
        <div>
          <img 
            src={Background.src}
            className='absolute w-[100vw] h-auto inset-0 object-cover overflow-x-hidden'/>
        </div>
        <div>
          <img
            src={number.src}
            alt='003'
            className=' absolute  ml-28 mt-19'
        />
        </div>
    
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="absolute inset-0 flex justify-center items-center">
        <img
          ref={svgRef}
          src={lines.src}
          alt="Animated Lines"
          className="w-[90vw] h-auto opacity-80"
        />
      </div>
          
          

          
          {/* Hero Images Container - All elements stacked perfectly */}
          <div className="relative  w-[90%] max-w-l md:max-w-md lg:max-w-l aspect-square">
            
                   
            
            <div className="w-full scale-240  pb-20 max-w-5xl md:max-w-5xl ">
              <span
                className={customFont.className}
                style={{
                  fontSize:'100px',
                  
                  
                }}>
                  TATHVA

              </span>

            </div>
            
            {/* Wheel - Bottom Layer */}
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src={wheel.src}
                alt="wheel"
                className="w-full h-full object-contain"
              />
            </div>
            
            {/* Avatar - Middle Layer */}
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src={heroAvatar.src}
                alt="Avatar"
                className="w-full h-full object-contain"
              />
            </div>
            
            {/* Eye Icon - Top Layer (centered on avatar's face) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full">
                <img
                  src={EyeIcon.src}
                  alt="eye"
                  className="absolute left-[53%] top-[40%] -translate-x-1/2 -translate-y-1/2 w-[70%] h-auto object-contain"
                />
              </div>
            </div>
            
          </div>
          
        </div>
      </div>
    </section>
  );
}