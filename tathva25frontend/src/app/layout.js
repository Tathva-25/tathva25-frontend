import "./globals.css";
// Import the new wrapper component
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/next";
export const metadata = {
  // === Basic Metadata ===
  title: {
    default: "Tathva '25 | Annual Techno-Management Fest of NIT Calicut",
    template: "%s | Tathva '25", // Appends "| Tathva '25" to child page titles
  },
  description:
    "Experience innovation at Tathva '25, the official techno-management festival of NIT Calicut. Join us for 3 days of exciting competitions, hands-on workshops, inspiring lectures, and unforgettable pro-shows.",

  // === SEO Keywords ===
  keywords: [
    "Tathva '25",
    "Tathva",
    "NIT Calicut",
    "NITC",
    "National Institute of Technology Calicut",
    "Tech Fest",
    "Techno-Management Fest",
    "Calicut Events",
    "Kerala Tech Fest",
    "College Fest",
    "Workshops",
    "Competitions",
  ],

  // === Social Media / Open Graph (OG) ===
  openGraph: {
    title: "Tathva '25 - NIT Calicut",
    description:
      "The official annual techno-management fest of NIT Calicut is back! Explore events, workshops, and more.",
    url: "https://tatqhva.org", // <<< REPLACE with your actual domain
    siteName: "Tathva '25",
    images: [
      {
        url: "https://tathva.org/og-image.png", // <<< REPLACE with a link to your preview image
        width: 1200,
        height: 630,
        alt: "Tathva '25 Logo and Theme",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // === Twitter Card ===
  twitter: {
    card: "summary_large_image",
    title: "Tathva '25 | Annual Techno-Management Fest of NIT Calicut",
    description:
      "Join us for Tathva '25 at NIT Calicut! Competitions, workshops, pro-shows, and more.",
    images: ["https://tathva.org/twitter-image.png"], // <<< REPLACE with a link to your Twitter preview image
    // creator: "@TathvaNITCn",
  },

  // === Other Metadata ===
  manifest: "/site.webmanifest",
  robots: "index, follow",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative overflow-x-hidden">
        <Toaster />
        <Analytics />
        {/* Use the wrapper to manage loading state and content visibility */}
        <ClientLayoutWrapper>
          {children}
          <div id="modal-root"></div>
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}
