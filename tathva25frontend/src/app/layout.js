"use client";

import "./globals.css";
import SplashScreen from "@/components/SplashScreen";
import { useState, useEffect } from "react";

// export const metadata = {
//   title: "Tathva 25",
//   description: "Tathva"
// };

export default function RootLayout({ children }) {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <html lang="en">
      <head>
        <title>Tathva 25</title>
        <meta name="description" content="Tathva" />
      </head>
      <body>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
        {children}
      </body>
    </html>
  );
}
