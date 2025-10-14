'use client'
'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

// EASILY MODIFIABLE COMPETITIONS DATA
// Change images, titles, dates, links, and colors here
const COMPETITIONS_DATA = [
  {
    id: 1,
    title: 'Fortnite Season 5',
    subtitle: 'Chapter 3',
    date: 'March 15, 2025',
    location: 'Global',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=600&fit=crop',
    link: 'https://www.fortnite.com',
    accentColor: 'from-cyan-500 to-blue-600'
  },
  {
    id: 2,
    title: 'Gaming Pro League',
    subtitle: 'Championship',
    date: 'April 20-30, 2025',
    location: 'Las Vegas',
    image: 'https://images.unsplash.com/photo-1538481143235-c8f91553dc11?w=500&h=600&fit=crop',
    link: 'https://www.gamingleague.com',
    accentColor: 'from-yellow-500 to-orange-600'
  },
  {
    id: 3,
    title: 'Esports World Cup',
    subtitle: 'Final Round',
    date: 'May 10, 2025',
    location: 'Dubai',
    image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=500&h=600&fit=crop',
    link: 'https://www.esportsworldcup.com',
    accentColor: 'from-red-500 to-pink-600'
  },
  {
    id: 4,
    title: 'Battle Royale Masters',
    subtitle: 'Invitational',
    date: 'June 1-15, 2025',
    location: 'Seoul',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=500&h=600&fit=crop',
    link: 'https://www.brm-tournament.com',
    accentColor: 'from-purple-500 to-indigo-600'
  },
  {
    id: 5,
    title: 'FPS Championship',
    subtitle: 'World Finals',
    date: 'July 15-28, 2025',
    location: 'Tokyo',
    image: 'https://images.unsplash.com/photo-1559056169-641ef2588fd3?w=500&h=600&fit=crop',
    link: 'https://www.fpsworlds.com',
    accentColor: 'from-green-500 to-emerald-600'
  },
  {
    id: 6,
    title: 'Streamer Battle Royale',
    subtitle: 'Celebrity Cup',
    date: 'August 1-20, 2025',
    location: 'Miami',
    image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=500&h=600&fit=crop',
    link: 'https://www.streamercup.com',
    accentColor: 'from-rose-500 to-red-600'
  }
];

// REUSABLE COMPETITION CARD COMPONENT
const CompetitionCard = ({ competition, onClick }) => {
  return (
    <div
      onClick={() => onClick(competition.link)}
      className="relative flex-shrink-0 w-80 h-96 cursor-pointer group"
    >
      {/* Card Container */}
      <div className="relative w-full h-full transition-transform duration-500 transform group-hover:scale-105">
        
        {/* Main Card Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${competition.accentColor} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
        
        {/* Dark Overlay Base */}
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-2xl" />

        {/* Image Container - Pops out on hover */}
        <div className="absolute inset-0 p-4 rounded-2xl overflow-hidden">
          <img 
            src={competition.image} 
            alt={competition.title}
            className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-500"
          />
          {/* Image Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-xl" />
        </div>

        {/* Content Section - Slides up on hover */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 rounded-2xl">
          
          {/* Badge */}
          <div className="mb-4 inline-flex items-center gap-2 w-fit">
            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${competition.accentColor}`} />
            <span className="text-xs font-bold text-white uppercase tracking-wider">Featured Event</span>
          </div>

          {/* Title & Subtitle */}
          <div className="mb-3">
            <p className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
              {competition.subtitle}
            </p>
            <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text transition-all duration-300"
                style={{
                  backgroundImage: `linear-gradient(135deg, #fff, #888)`,
                }}>
              {competition.title}
            </h3>
          </div>

          {/* Date & Location - Hidden until hover */}
          <div className="space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:translate-y-0 translate-y-4">
            <div className="flex items-center gap-2 text-sm text-gray-200">
              <span>📅</span>
              <p>{competition.date}</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-200">
              <span>📍</span>
              <p>{competition.location}</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-4 pt-4 border-t border-white border-opacity-0 group-hover:border-opacity-20 transition-all duration-300">
            <p className="text-sm font-semibold text-blue-300 group-hover:text-white transition-colors duration-300">
              View Details →
            </p>
          </div>
        </div>

        {/* Border Glow */}
        <div className="absolute inset-0 rounded-2xl border border-white border-opacity-0 group-hover:border-opacity-30 transition-all duration-300 shadow-lg group-hover:shadow-2xl" />
      </div>
    </div>
  );
};

// MAIN COMPETITION PAGE COMPONENT
export default function CompetitionPage() {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let proxy = { x: 0 },
      smoothness = 0.8,
      rawProxyX = 0,
      maxScroll = container.scrollWidth - container.clientWidth,
      setupAnimation = () => {
        let tl = gsap.timeline({ paused: true });
        tl.to(proxy, {
          x: rawProxyX,
          duration: smoothness,
          ease: 'power4',
          overwrite: 'auto',
          onUpdate: () => {
            gsap.set(container, { scrollLeft: proxy.x });
          }
        }, 0);
        return tl;
      };

    let tl = setupAnimation();

    const handleWheel = (e) => {
      if (e.deltaY !== 0) {
        // Check if reached end of horizontal scroll
        const isAtEnd = rawProxyX >= maxScroll - 10;
        
        if (isAtEnd) {
          // Allow vertical scrolling when at end
          return;
        }
        
        e.preventDefault();
        rawProxyX += e.deltaY;
        rawProxyX = gsap.utils.clamp(0, maxScroll, rawProxyX);
        tl.kill();
        tl = setupAnimation();
        tl.play();
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  const handleCardClick = (link) => {
    window.open(link, '_blank');
  };

  return (
    <div className="bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      {/* HEADER SECTION */}
      <div className="relative z-10 px-6 py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-black text-white mb-4 leading-tight">
            Upcoming <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Events</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Scroll down to explore competitions. Click any card to learn more and register.
          </p>
        </div>
      </div>

      {/* HORIZONTAL SCROLL CONTAINER */}
      <div
        ref={scrollContainerRef}
        className="relative w-full h-screen flex items-center overflow-x-scroll overflow-y-hidden"
        style={{
          scrollBehavior: 'auto',
          WebkitOverflowScrolling: 'auto'
        }}
      >
        {/* Cards Wrapper */}
        <div className="flex gap-8 px-6 pb-8 min-w-max">
          {COMPETITIONS_DATA.map((competition) => (
            <CompetitionCard 
              key={competition.id}
              competition={competition}
              onClick={handleCardClick}
            />
          ))}
        </div>
      </div>

      
    </div>
  );
}