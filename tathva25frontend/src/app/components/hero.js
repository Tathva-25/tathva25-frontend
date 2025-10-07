// src/components/Hero.js
import Image from 'next/image';
import heroAvatar from './assets/avatar-body.png';
import wheel from './assets/wheel.png';
import tathva from './assets/TATHVA.png';
import EyeIcon from './assets/eye.png';
import Background from './assets/background.svg'
import number from './assets/003.png'


export const Hero=()=> {
  return (
    <section className={` min-h-screen flex items-center justify-center px-5 py-8 pt-20`}>
      

      <div className="max-w-7xl mx-auto w-full">
        <div>
          <img 
            src={Background.src}
            className='absolute w-auto h-auto'/>
            
        </div>
        <div>
          <img
            src={number.src}
            alt='003'
            className=' absolute '
        />
        </div>
    
        <div className="flex flex-col items-center justify-center gap-4">
          
          

          
          {/* Hero Images Container - All elements stacked perfectly */}
          <div className="relative  w-[90%] max-w-l md:max-w-md lg:max-w-l aspect-square">
            <div className="w-full scale-240  pb-20 max-w-5xl md:max-w-5xl">
            <img
              src={tathva.src}
              alt="TATHVA"
              className="w-full h-auto object-contain brightness-0 "
            />
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