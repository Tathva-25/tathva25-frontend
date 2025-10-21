"use client";

import { useState, useEffect } from "react";
import RobowarsDesktop from "./RobowarsDesktop";
import RobowarsPhone from "./RobowarsPhone";
import RB1 from "./RobowarsDesktop";
import Marquee from "./Marquee";

export default function Robowars({ link }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check initial screen size
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener("resize", checkScreenSize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <>
     <Marquee text={"///ROBOWARS"}/>
      {isMobile ? (
        <RobowarsPhone link={link} />
      ) : (
        <RobowarsDesktop link={link} />
      )}
    </>
  );
}
