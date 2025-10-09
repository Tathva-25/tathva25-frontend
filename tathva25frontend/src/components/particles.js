import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const DustParticleAnimation = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const particles = container.querySelectorAll('.particle');
    
    // Store random angles for each particle
    const angles = Array.from(particles).map(() => Math.random() * Math.PI * 2);
    
    // Animate particles outward and loop
    gsap.to(particles, {
      duration: 2,
      x: (i) => Math.cos(angles[i]) * 150,
      y: (i) => Math.sin(angles[i]) * 150,
      opacity: 0,
      ease: "power2.out",
      stagger: {
        amount: 0.3,
        from: "random"
      },
      repeat: -1,
      repeatDelay: 0.5,
      yoyo: false,
      onRepeat: function() {
        gsap.set(particles, { x: 0, y: 0, opacity: 0.6 });
      }
    });
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div ref={containerRef} className="relative w-96 h-96 flex items-center justify-center">
        {/* Generate 20 particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="particle absolute w-2 h-2 bg-gray-400 rounded-full"
            style={{ opacity: 0.6 }}
          />
        ))}
      </div>
    </div>
  );
};

export default Particles;