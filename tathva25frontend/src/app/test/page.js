import AlternatingSection from "../components/AlternatingSection";

// Sample data for the three sections
const sectionData = [
  {
    title: "INNOVATION",
    description:
      "Pushing the boundaries of technology and creativity. We build solutions that transform ideas into reality and shape the future.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80",
    gradientFrom: "#0a0a1a",
    gradientTo: "#1a0a2a",
    highlight: "Tech Forward",
  },
  {
    title: "COLLABORATION",
    description:
      "Working together to achieve extraordinary results. Our diverse team brings unique perspectives and expertise to create something amazing.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80",
    gradientFrom: "#1a1a0a",
    gradientTo: "#2a1a0a",
    highlight: "Team Spirit",
  },
  {
    title: "EXCELLENCE",
    description:
      "Committed to delivering the highest quality in everything we do. Excellence is not just a goal, it's our standard and our promise.",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80",
    gradientFrom: "#0a1a1a",
    gradientTo: "#0a2a2a",
    highlight: "Premium Quality",
  },
];

export default function DemoPage() {
  return <AlternatingSection sections={sectionData} />;
}
