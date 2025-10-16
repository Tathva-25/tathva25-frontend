"use client";
import WheelsEvent from "./WheelsDesktop";
import WheelsEventMobile from "./WheelsMobile";
import GridTransition from "./GridTransition";

import { useState, useEffect } from "react";

export default function ResponsiveLayout({
  DesktopComponent,
  MobileComponent,
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return isMobile ? (
    <WheelsEventMobile />
  ) : (
    <GridTransition duration={1500}>
      <WheelsEvent />
    </GridTransition>
  );
}
