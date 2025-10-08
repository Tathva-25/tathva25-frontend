// src/components/Hero.js
'use client'
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import heroAvatar from '../../public/images/avatar-body.png';
import wheel from '../../public/images/wheel.png'
import EyeIcon from '../../public/images/eye.svg'
import Background from '../../public/images/Background.png'
import number from '../../public/images/003.png'
import localfont from 'next/font/local'

const customFont = localfont({
  src: '../../public/fonts/neoform.otf',
})

export const Hero = () => {
  const [displayText, setDisplayText] = useState('TATHVA');
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  const targetText = 'TATHVA';
  const characters = 'ァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶ';

  const scrambleText = () => {
    return targetText
      .split('')
      .slice(0, 5)
      .map(() => characters[Math.floor(Math.random() * characters.length)])
      .join('');
  };

  const handleMouseEnter = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    let iteration = 0;
    const maxIterations = 60; // Number of scramble iterations

    // Clear any existing intervals/timeouts
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // Scramble effect
    intervalRef.current = setInterval(() => {
      setDisplayText(scrambleText());
      iteration++;

      if (iteration >= maxIterations) {
        clearInterval(intervalRef.current);
        
        // Gradually reveal correct letters starting from index 0
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

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <section className={`relative min-h-screen flex items-center justify-center px-5 py-8 pt-20 overflow-hidden`}>
      <div className="mx-auto w-full">
        <div>
          <img 
            src={Background.src}
            className='absolute w-[100vw] h-auto inset-0 object-cover overflow-x-hidden'
            alt="Background"
          />
        </div>
        <div>
          <img
            src={number.src}
            alt='003'
            className='absolute ml-15 mt-19'
          />
        </div>
    
        <div className="flex flex-col items-center justify-center gap-4">
          {/* Hero Images Container */}
          <div className="relative w-[90%] max-w-[100vw] md:max-w-md aspect-square">
            <div className="w-full scale-240 pb-20 max-w-[90vw] md:max-w-5xl  text-center ml-5 ">
              <span
                className={`${customFont.className} cursor-pointer inline-block select-none transition-all duration-200 whitespace-nowrap text-[30px] md:text-[100px] ${
                  isAnimating ? ' tracking-tighter' : ''
                }`}
                onMouseEnter={handleMouseEnter}
              >
                {displayText}
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
            
            {/* Eye Icon - Top Layer */}
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