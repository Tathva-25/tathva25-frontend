import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const DustParticleAnimation = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const particles = container.querySelectorAll('.particle');
    
    // Store random angles for each particle to create concentric circle effect
    const angles = Array.from(particles).map((_, i) => (i / particles.length) * Math.PI * 2);
    
    // Animate particles outward and loop
    gsap.to(particles, {
      duration: 3,
      x: (i) => Math.cos(angles[i]) * 200,
      y: (i) => Math.sin(angles[i]) * 200,
      opacity: 0,
      ease: "power2.out",
      stagger: {
        amount: 0.2,
        from: "start"
      },
      repeat: -1,
      repeatDelay: 0.8,
      yoyo: false,
      onRepeat: function() {
        gsap.set(particles, { x: 0, y: 0, opacity: 0.4 });
      }
    });
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
      <div ref={containerRef} className="relative w-full h-full flex items-center justify-center">
        {/* Generate 80 particles for concentric circles */}
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 bg-gray-400 rounded-full"
            style={{ opacity: 0.5, left: '50%', top: '50%' }}
          />
        ))}
      </div>
    </div>
  );
};

export default DustParticleAnimation;