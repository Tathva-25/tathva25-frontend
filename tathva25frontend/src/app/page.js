"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

// Dynamically import Card with SSR disabled
// Dynamically import Card with SSR disabled
const Card = dynamic(() => import("../components/Card"), { ssr: false });

export default function Page() {
  const [scale, setScale] = useState(1);

  // Separate variables for row and column gaps
  const desktopColumnGap = 5; // vw
  const desktopRowGap = 3; // vw

  const tabletColumnGap = 8; // vw
  const tabletRowGap = 0; // vw

  const mobileGapPx = 20; // fixed pixel gap for mobile

  useEffect(() => {
    function calcScale() {
      const width = window.innerWidth;
      let cardVW = 25; // desktop default
      if (width <= 500) cardVW = 85; // mobile breakpoint
      else if (width <= 1024) cardVW = 35; // tablet

      const cardWidthPx = (width * cardVW) / 100;
      const scaleFactor = cardWidthPx / 411;
      setScale(scaleFactor);
    }

    calcScale();
    window.addEventListener("resize", calcScale);
    return () => window.removeEventListener("resize", calcScale);
  }, []);

  return (
    <>
    </>
  );
}
