// src/components/Hero.js

'use client';
import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from 'gsap/all';
import Image from 'next/image';
import heroAvatar from '../../public/images/avatar-body.png';
import wheel from '../../public/images/wheel.svg'
import EyeIcon from '../../public/images/eye.svg'
import Background from '../../public/images/Background.png'
import localfont from 'next/font/local';
import Lines from './lines';
import Ripple from './particles';
import Avatar from '../../public/images/avatar.png';

gsap.registerPlugin(ScrollTrigger)

const customFont = localfont({
  src: '../../public/fonts/neoform.otf',
})

export const Hero=()=> {
  const [displayText, setDisplayText] = useState('TATHVA');
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);
  const wheelRef = useRef(null);
  const sectionRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  const targetText = 'TATHVA';
  const characters = 'ァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵ';

  const scrambleText = () => {
    return targetText
      .split('')
      .slice(0, 5)
      .map(() => characters[Math.floor(Math.random() * characters.length)])
      .join('');
  };

  const triggerGlitchEffect = () => {
    if (isAnimating || hasAnimatedRef.current) return;
    
    setIsAnimating(true);
    hasAnimatedRef.current = true;
    let iteration = 0;
    const maxIterations = 60;

    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(scrambleText());
      iteration++;

      if (iteration >= maxIterations) {
        clearInterval(intervalRef.current);
        
        let revealIndex = 0;
        const revealInterval = setInterval(() => {
          setDisplayText(() => {
            let result = '';
            for (let i = 0; i < targetText.length; i++) {
              if (i <= revealIndex) {
                result += targetText[i];
              } else {
                result += characters[Math.floor(Math.random() * characters.length)];
              }
            }
            return result;
          });
          
          revealIndex++;
          if (revealIndex >= targetText.length) {
            clearInterval(revealInterval);
            setDisplayText(targetText);
            setIsAnimating(false);
          }
        }, 100);
      }
    }, 30);
  };

  // Intersection Observer for scroll into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            triggerGlitchEffect();
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Cleanup on unmount for text animation
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Spinning wheel animation
  useEffect(() => {
    if (wheelRef.current) {
      gsap.to(wheelRef.current, {
        rotation: 360,
        duration: 20,
        ease: 'linear',
        repeat: -1,
      });
    }
  }, []);

  return (

    <section ref={sectionRef} className={`relative h-screen flex items-center justify-center px-5 py-8 pt-20 overflow-hidden`}>
      <div className="mx-auto w-full">
        
        <div>
          <Image
            src={Background.src}
            className='absolute w-[100vw] h-auto inset-0 object-cover overflow-x-hidden'
            alt="Background"
            width={100}
            height={100}
          />
        </div>

    
        <div className="flex flex-col items-center justify-between h-full gap-4">
          <div className="absolute inset-0 flex justify-center items-center mt-12">
            <Lines />
          </div>

          
          
          {/* TATHVA Text - Centered */}
          <div className="flex-1 flex items-center justify-center w-full ">
            <div className="w-full max-w-[90vw] md:max-w-5xl text-center ">
              <span
                className={`${customFont.className} inline-block select-none transition-all duration-200 whitespace-nowrap text-[30px] md:text-[100px] ${
                  isAnimating ? 'tracking-tighter' : ''
                }`}

              >
                {displayText}
              </span>
            </div>
          </div>
         
          
          {/* Hero Images Container - Positioned at bottom */}
          <div className="relative w-[90%] max-w-[100vw] md:max-w-md aspect-square mb-0 mt-19">
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
              <Ripple />
            </div>
            <div className="w-full scale-240 pb-20 md:pb-40 max-w-[90vw] md:max-w-5xl text-center">
              <span
                className={`${customFont.className} inline-block select-none transition-all duration-200 whitespace-nowrap text-[30px] md:text-[100px] ${
                  isAnimating ? 'tracking-tighter' : ''
                }`}
              >
                {displayText}
              </span>
            </div>
            
            <div className='THIS ONE!!'>
              {/* Wheel - Bottom Layer */}
              <div className="absolute inset-0 -translate-y-5 flex items-center justify-center ">
                <Image
                  ref={wheelRef} 
                  src={wheel.src}
                  alt="wheel"
                  fill 
                  className="w-[25vw] h-[25vw] max-w-none max-h-none object-contain"
                />
              </div>
              
              {/* Avatar - Middle Layer */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src={heroAvatar.src}
                  alt="Avatar"
                  className="w-full h-full object-contain"
                  fill
                  />
              </div>
              
             {/* Eye Icon - Top Layer */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image
                    src={EyeIcon.src}
                    alt="eye"
                    width={100}
                    height={100}
                    className="absolute left-[53%] top-[40%] -translate-x-1/2 -translate-y-1/2 w-[70%] h-auto object-contain"
                  />
                </div>
              </div>
            
            
              
              
              
              
            </div>
            
          </div>
          
        </div>
        <div 
          className="absolute bottom-0 w-full h-4"
          style={{
            background: 'linear-gradient(to bottom, rgba(243,240,232,1), rgba(246, 246, 238, 1))',
          }}
        ></div>
      </div>
      
      
    </section>
    
  );
}