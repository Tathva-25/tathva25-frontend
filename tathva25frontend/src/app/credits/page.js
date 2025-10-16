"use client";
import { useState } from "react";
import TiltedCard from "../components/TiltedCard";
import { Alumni_Sans } from "next/font/google";

const alumniSans = Alumni_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-alumni-sans",
});

// Sample credits data organized by teams with subgroups
const creditsData = {
  council: [
    {
      groupTitle: "Core Council",
      members: [
        {
          name: "John Doe",
          role: "Festival Chairperson",
          image: "https://i.pravatar.cc/300?img=1",
        },
        {
          name: "Jane Smith",
          role: "Vice Chairperson",
          image: "https://i.pravatar.cc/300?img=5",
        },
        {
          name: "Robert Johnson",
          role: "General Secretary",
          image: "https://i.pravatar.cc/300?img=3",
        },
        {
          name: "Maria Garcia",
          role: "Joint Secretary",
          image: "https://i.pravatar.cc/300?img=10",
        },
      ],
    },
    {
      groupTitle: "Coordinators",
      members: [
        {
          name: "Michael Chen",
          role: "Technical Coordinator",
          image: "https://i.pravatar.cc/300?img=8",
        },
        {
          name: "Sarah Williams",
          role: "Events Coordinator",
          image: "https://i.pravatar.cc/300?img=9",
        },
        {
          name: "David Brown",
          role: "Logistics Coordinator",
          image: "https://i.pravatar.cc/300?img=13",
        },
        {
          name: "Emily Davis",
          role: "Finance Coordinator",
          image: "https://i.pravatar.cc/300?img=20",
        },
      ],
    },
  ],
  committee: [
    {
      groupTitle: "Technical Committee",
      members: [
        {
          name: "Alex Thompson",
          role: "Technical Head",
          image: "https://i.pravatar.cc/300?img=15",
        },
        {
          name: "Lisa Anderson",
          role: "Workshop Lead",
          image: "https://i.pravatar.cc/300?img=25",
        },
        {
          name: "Tom Martinez",
          role: "Competition Lead",
          image: "https://i.pravatar.cc/300?img=51",
        },
        {
          name: "Rachel Green",
          role: "Innovation Lead",
          image: "https://i.pravatar.cc/300?img=27",
        },
      ],
    },
    {
      groupTitle: "Cultural Committee",
      members: [
        {
          name: "James Wilson",
          role: "Cultural Head",
          image: "https://i.pravatar.cc/300?img=33",
        },
        {
          name: "Anna Taylor",
          role: "Music Lead",
          image: "https://i.pravatar.cc/300?img=16",
        },
        {
          name: "Kevin Lee",
          role: "Dance Lead",
          image: "https://i.pravatar.cc/300?img=59",
        },
        {
          name: "Sophie Martin",
          role: "Drama Lead",
          image: "https://i.pravatar.cc/300?img=45",
        },
      ],
    },
    {
      groupTitle: "Media & Publicity",
      members: [
        {
          name: "Chris Evans",
          role: "Media Head",
          image: "https://i.pravatar.cc/300?img=22",
        },
        {
          name: "Nina Patel",
          role: "Social Media Manager",
          image: "https://i.pravatar.cc/300?img=28",
        },
        {
          name: "Daniel Kim",
          role: "Photography Lead",
          image: "https://i.pravatar.cc/300?img=31",
        },
        {
          name: "Olivia Brown",
          role: "Videography Lead",
          image: "https://i.pravatar.cc/300?img=35",
        },
      ],
    },
  ],
  webteam: [
    {
      groupTitle: "UI/UX Design",
      members: [
        {
          name: "Mike Johnson",
          role: "UI/UX Lead",
          image: "https://i.pravatar.cc/300?img=12",
        },
        {
          name: "Jessica White",
          role: "UI Designer",
          image: "https://i.pravatar.cc/300?img=24",
        },
        {
          name: "Ryan Cooper",
          role: "UX Researcher",
          image: "https://i.pravatar.cc/300?img=41",
        },
        {
          name: "Emma Wilson",
          role: "Graphic Designer",
          image: "https://i.pravatar.cc/300?img=47",
        },
      ],
    },
    {
      groupTitle: "Frontend Development",
      members: [
        {
          name: "David Brown",
          role: "Frontend Lead",
          image: "https://i.pravatar.cc/300?img=13",
        },
        {
          name: "Sophia Lee",
          role: "React Developer",
          image: "https://i.pravatar.cc/300?img=38",
        },
        {
          name: "Lucas Miller",
          role: "Frontend Developer",
          image: "https://i.pravatar.cc/300?img=52",
        },
        {
          name: "Mia Anderson",
          role: "Frontend Developer",
          image: "https://i.pravatar.cc/300?img=44",
        },
      ],
    },
    {
      groupTitle: "Backend Development",
      members: [
        {
          name: "Sarah Williams",
          role: "Backend Lead",
          image: "https://i.pravatar.cc/300?img=9",
        },
        {
          name: "Tom Martinez",
          role: "API Developer",
          image: "https://i.pravatar.cc/300?img=51",
        },
        {
          name: "Kevin Lee",
          role: "Database Admin",
          image: "https://i.pravatar.cc/300?img=59",
        },
        {
          name: "Chris Wilson",
          role: "DevOps Engineer",
          image: "https://i.pravatar.cc/300?img=33",
        },
      ],
    },
  ],
};

const teamCategories = [
  { id: "council", label: "Council" },
  { id: "committee", label: "Committee" },
  { id: "webteam", label: "Web Team" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("council");

  const getActiveTeamData = () => {
    return creditsData[activeTab] || creditsData.council;
  };

  const getActiveTitle = () => {
    const activeCategory = teamCategories.find((cat) => cat.id === activeTab);
    return activeCategory ? activeCategory.label.toUpperCase() : "COUNCIL";
  };

  return (
    <div className="min-h-screen bg-white text-black py-12 px-4 sm:px-6 lg:px-8">
      {/* Aesthetic Header Section */}
      <div className="relative mb-20 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <div className="w-96 h-96 bg-yellow-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative text-center">
          {/* Subtitle */}
          <p className="text-sm sm:text-base tracking-[0.3em] text-gray-600 mb-4 uppercase">
            Meet The Team
          </p>

          {/* Main Title */}
          <h1
            className={`${alumniSans.className} font-[900] text-6xl sm:text-7xl md:text-8xl lg:text-9xl mb-6`}
          >
            CREDITS
          </h1>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="w-20 h-px bg-gradient-to-r from-transparent to-yellow-600"></div>
            <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
            <div className="w-20 h-px bg-gradient-to-l from-transparent to-yellow-600"></div>
          </div>

          {/* Description */}
          <p className="text-gray-700 text-sm sm:text-base mt-6 max-w-2xl mx-auto">
            Celebrating the talented individuals who brought this project to
            life
          </p>
        </div>
      </div>

      {/* Tab Selector */}
      <div className="max-w-2xl mx-auto mb-16 flex justify-center">
        <div className="inline-flex rounded-full bg-black p-1 shadow-lg">
          {teamCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`px-8 py-3 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 ${
                activeTab === category.id
                  ? "bg-white text-black"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
              style={{
                minWidth: "140px",
              }}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Active Team Section */}
      <div className="max-w-7xl mx-auto mb-20">
        {getActiveTeamData().map((group, groupIndex) => (
          <div key={`${activeTab}-group-${groupIndex}`} className="mb-16">
            {/* Group Title */}
            <h2
              className={`${alumniSans.className} font-[600] text-4xl sm:text-5xl md:text-6xl mb-10 text-center transition-all duration-300`}
              style={{
                background: "linear-gradient(135deg, #000000 0%, #FFD700 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {group.groupTitle.toUpperCase()}
            </h2>

            {/* Group Members Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 place-items-center">
              {group.members.map((person, personIndex) => (
                <TiltedCard
                  key={`${activeTab}-${groupIndex}-${personIndex}`}
                  imageSrc={person.image}
                  altText={`${person.name} - ${person.role}`}
                  captionText={person.name}
                  containerHeight="280px"
                  containerWidth="280px"
                  imageHeight="280px"
                  imageWidth="280px"
                  rotateAmplitude={12}
                  scaleOnHover={1.1}
                  showMobileWarning={false}
                  showTooltip={false}
                  displayOverlayContent={true}
                  overlayContent={
                    <div className="text-center p-4">
                      <p className="font-bold text-lg text-white">
                        {person.name}
                      </p>
                      <p className="text-sm text-gray-300">{person.role}</p>
                    </div>
                  }
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
