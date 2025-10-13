'use client'
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CompetitionPage() {
  const scrollContainerRef = useRef(null);
  const cardRefs = useRef([]);

  const competitions = [
    {
      id: 1,
      title: 'World Marathon Championship',
      date: 'March 15, 2025',
      location: 'Tokyo, Japan',
      image: 'bg-gradient-to-br from-blue-500 to-blue-700',
      link: 'https://www.worldathleticsmarathon.com'
    },
    {
      id: 2,
      title: 'International Tennis Open',
      date: 'April 20-30, 2025',
      location: 'New York, USA',
      image: 'bg-gradient-to-br from-green-500 to-green-700',
      link: 'https://www.tennis-explorer.com'
    },
    {
      id: 3,
      title: 'FIFA World Cup Qualifier',
      date: 'May 10, 2025',
      location: 'Multiple Venues',
      image: 'bg-gradient-to-br from-yellow-500 to-red-600',
      link: 'https://www.fifa.com'
    },
    {
      id: 4,
      title: 'UCI Cycling Championship',
      date: 'June 1-15, 2025',
      location: 'Switzerland',
      image: 'bg-gradient-to-br from-purple-500 to-purple-700',
      link: 'https://www.uci.org'
    },
    {
      id: 5,
      title: 'Grand Slam Tennis',
      date: 'July 15-28, 2025',
      location: 'Wimbledon, UK',
      image: 'bg-gradient-to-br from-indigo-500 to-indigo-700',
      link: 'https://www.wimbledon.com'
    },
    {
      id: 6,
      title: 'Olympic Games 2025',
      date: 'August 1-20, 2025',
      location: 'Los Angeles, USA',
      image: 'bg-gradient-to-br from-red-500 to-orange-600',
      link: 'https://www.olympics.com'
    }
  ];

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const proxy = { x: 0 };
    const smoothness = 0.8;
    let rawProxyX = 0;
    const speed = Math.max(1, gsap.getProperty(container, 'scrollLeft')) ? 2 : 1;
    const maxScroll = container.scrollWidth - container.clientWidth;
    
    const setupAnimation = () => {
      let tl = gsap.timeline({ paused: true });
      tl.to(proxy, {
        x: (rawProxyX = gsap.utils.unitize(rawProxyX) || 0),
        duration: smoothness,
        ease: 'power4',
        overwrite: 'auto',
        onUpdate: () => {
          gsap.set(container, { scrollLeft: proxy.x }, true);
        }
      }, 0);
      return tl;
    };
    
    let tl = setupAnimation();

    gsap.set(container, { overscrollBehavior: 'none', touchAction: 'none' }, true);

    const handleWheel = (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        rawProxyX += e.deltaY * speed;
        rawProxyX = gsap.utils.clamp(0, maxScroll, rawProxyX);
        tl.kill();
        tl = setupAnimation();
        tl.play();
      }
    };

    const handleTouchStart = (e) => {
      const touch = e.touches[0];
      proxy.lastX = touch.clientX;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        const delta = proxy.lastX - touch.clientX;
        proxy.lastX = touch.clientX;
        rawProxyX += delta * 2;
        rawProxyX = gsap.utils.clamp(0, maxScroll, rawProxyX);
        tl.kill();
        tl = setupAnimation();
        tl.play();
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const handleCardClick = (link) => {
    window.open(link, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
      {/* Header */}
      <div className="relative z-10 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Upcoming Competitions
          </h1>
          <p className="text-gray-400 text-lg">
            Scroll horizontally to explore events. Click any card to learn more.
          </p>
        </div>
      </div>

      {/* Scroll Container */}
      <div
        ref={scrollContainerRef}
        className="relative h-screen flex items-center overflow-x-scroll overflow-y-hidden scroll-smooth"
        style={{
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <div className="flex gap-8 px-6 pb-8">
          {competitions.map((competition, index) => (
            <div
              key={competition.id}
              ref={(el) => (cardRefs.current[index] = el)}
              onClick={() => handleCardClick(competition.link)}
              className="relative flex-shrink-0 w-96 h-96 rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 hover:scale-105"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 ${competition.image} opacity-80`} />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition-all duration-300" />

              {/* Content */}
              <div className="relative h-full flex flex-col justify-between p-8 text-white">
                {/* Top Section */}
                <div>
                  <div className="inline-block px-4 py-2 bg-white bg-opacity-20 rounded-full mb-4 backdrop-blur-sm">
                    <span className="text-sm font-semibold">Event</span>
                  </div>
                  <h2 className="text-3xl font-bold mb-4 group-hover:text-blue-200 transition-colors">
                    {competition.title}
                  </h2>
                </div>

                {/* Bottom Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-gray-200">
                    <span className="text-sm font-semibold">📅</span>
                    <p className="text-sm">{competition.date}</p>
                  </div>
                  <div className="flex items-center gap-2 text-gray-200">
                    <span className="text-sm font-semibold">📍</span>
                    <p className="text-sm">{competition.location}</p>
                  </div>

                  {/* Click Indicator */}
                  <div className="flex items-center gap-2 pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm font-semibold text-blue-300">View Details →</span>
                  </div>
                </div>
              </div>

              {/* Border Glow */}
              <div className="absolute inset-0 rounded-2xl border border-white border-opacity-0 group-hover:border-opacity-30 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center text-gray-400 text-sm pointer-events-none">
        <p>↻ Scroll with mouse wheel or drag to navigate</p>
        <p>Click cards to view more information</p>
      </div>
    </div>
  );
}
CompetitionPage();