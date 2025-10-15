import TiltedCard from "../components/TiltedCard";
import { Alumni_Sans } from "next/font/google";

const alumniSans = Alumni_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-alumni-sans",
});

// Sample credits data
const creditsData = [
  {
    name: "John Doe",
    role: "Project Lead",
    image: "https://i.pravatar.cc/300?img=1",
  },
  {
    name: "Jane Smith",
    role: "Lead Developer",
    image: "https://i.pravatar.cc/300?img=5",
  },
  {
    name: "Mike Johnson",
    role: "UI/UX Designer",
    image: "https://i.pravatar.cc/300?img=12",
  },
  {
    name: "Sarah Williams",
    role: "Backend Developer",
    image: "https://i.pravatar.cc/300?img=9",
  },
  {
    name: "David Brown",
    role: "Frontend Developer",
    image: "https://i.pravatar.cc/300?img=13",
  },
  {
    name: "Emily Davis",
    role: "Content Writer",
    image: "https://i.pravatar.cc/300?img=20",
  },
  {
    name: "Chris Wilson",
    role: "Marketing Manager",
    image: "https://i.pravatar.cc/300?img=33",
  },
  {
    name: "Lisa Anderson",
    role: "Graphic Designer",
    image: "https://i.pravatar.cc/300?img=25",
  },
  {
    name: "Tom Martinez",
    role: "DevOps Engineer",
    image: "https://i.pravatar.cc/300?img=51",
  },
  {
    name: "Anna Taylor",
    role: "QA Tester",
    image: "https://i.pravatar.cc/300?img=16",
  },
  {
    name: "Kevin Lee",
    role: "Data Analyst",
    image: "https://i.pravatar.cc/300?img=59",
  },
  {
    name: "Rachel Green",
    role: "Social Media Manager",
    image: "https://i.pravatar.cc/300?img=27",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <h1
        className={`${alumniSans.className} font-[700] text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-center mb-16 text-white`}
      >
        CREDITS
      </h1>

      {/* Grid of Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 place-items-center">
        {creditsData.map((person, index) => (
          <TiltedCard
            key={index}
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
            showTooltip={true}
            displayOverlayContent={true}
            overlayContent={
              <div className="text-center p-4">
                <p className="font-bold text-lg text-white">{person.name}</p>
                <p className="text-sm text-gray-300">{person.role}</p>
              </div>
            }
          />
        ))}
      </div>
    </div>
  );
}
