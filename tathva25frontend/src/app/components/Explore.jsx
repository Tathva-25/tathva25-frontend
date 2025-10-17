'use client';

const EVENTS = [
  {
    id: 1,
    name: 'TECHNICAL',
    surname: 'WORKSHOPS',
    image: '/workshops.png',
    school: 'INNOVATE - BUILD - LEARN',
    subtitle:
      'Hands-on sessions led by experts, where you craft, code, and create the future.',
  },
  {
    id: 2,
    name: 'THRILLING',
    surname: 'COMPETITIONS',
    image: '/competitions.png',
    school: 'INNOVATE - COMPETE - CONQUER',
    subtitle:
      'Battle through tech, design, and innovation challenges to prove your mettle.',
  },
  {
    id: 3,
    name: 'INSIGHTFUL',
    surname: 'LECTURES',
    image: '/lecture.png',
    school: 'THINK - INSPIRE - INNOVATE',
    subtitle:
      'Engage with pioneers and visionaries who redefine the boundaries of possibility.',
  },
];

const ACCENT_COLOR = 'white';

const VerticalStripes = ({ count = 7, size = 'large' }) => {
  const heightClass = size === 'large' ? 'h-16' : 'h-8';
  const widthClass = size === 'large' ? 'w-2' : 'w-1.5';

  return (
    <div className="flex gap-1">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className={`${widthClass} ${heightClass} -skew-x-12 ${
            i % 2 === 0 ? 'bg-white/80' : 'bg-transparent'
          }`}
        />
      ))}
    </div>
  );
};

const LargeSurname = ({ name, surname }) => (
  <div>
    <div className="text-[11px] tracking-[0.15em] text-white/40 font-medium michroma mb-1">
      {name}
    </div>
    <div className="text-[56px] sm:text-[64px] md:text-[72px] leading-[0.85] font-black italic tracking-tight break-words text-white [text-shadow:_0_0_2px_rgba(255,255,255,0.25)]">
      {surname}
    </div>
  </div>
);

const SchoolInfo = ({ school }) => (
  <div>
    <div className="relative flex items-center gap-2 p-2.5 mt-2 max-w-[400px] bg-black/60 clip-polygon">
      <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center bg-white/20">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke={ACCENT_COLOR}
          strokeWidth="2"
          className="opacity-90"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[8px] leading-[1.3] text-white/80 font-semibold tracking-wide">
          {school}
        </div>
      </div>
    </div>
  </div>
);

const EventCard = ({ event, index }) => {
  const isFirst = index === 0;
  const isSecond = index === 1;
  const isThird = index === 2;

  return (
    <div className="relative w-full h-[30vh] overflow-hidden cursor-pointer bg-[#1a1a1a] shadow-lg group">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center brightness-90 transition-transform duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url('${event.image}')` }}
      ></div>

      {/* Overlay content */}
      <div className="relative z-10 w-full h-full py-6">
        <div className="relative w-full h-full p-4 flex flex-col justify-between border-2 border-white/25">
          {/* Layout variations */}
          <div
            className={`flex items-start ${
              isSecond
                ? 'justify-center'
                : isThird
                ? 'justify-between flex-row-reverse'
                : 'justify-between'
            }`}
          ></div>

          <div
            className={`flex items-end ${
              isSecond ? 'justify-center' : 'justify-between'
            }`}
          >
            {isFirst && (
              <>
                <SchoolInfo school={event.school} />
                <div className="text-right max-w-[45%]">
                  <LargeSurname name={event.name} surname={event.surname} />
                  <div className="flex gap-1 justify-end mt-2">
                    <VerticalStripes count={9} size="small" />
                  </div>
                </div>
              </>
            )}

            {isSecond && (
              <div className="flex flex-col items-center michroma gap-4">
                <LargeSurname name={event.name} surname={event.surname} />
              </div>
            )}

            {isThird && (
              <>
                <div className="text-left max-w-[45%]">
                  <LargeSurname name={event.name} surname={event.surname} />
                  <div className="flex gap-1 justify-start mt-2">
                    <VerticalStripes count={9} size="small" />
                  </div>
                </div>
                <SchoolInfo school={event.school} />
              </>
            )}
          </div>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-5 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.1)_2px,rgba(255,255,255,0.1)_4px)]" />
    </div>
  );
};

export default function Explore() {
  return (
    <div className="w-full min-h-screen bg-white  flex flex-col items-center michroma justify-center gap-4 px-4">
      {EVENTS.map((event, index) => (
        <EventCard key={event.id} event={event} index={index} />
      ))}
    </div>
  );
}
