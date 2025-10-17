'use client';
import WheelsEvent from './WheelsDesktop';
import WheelsEventMobile from './WheelsMobile';

import { useState, useEffect } from 'react';

export default function ResponsiveLayout({ DesktopComponent, MobileComponent }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return isMobile ? <WheelsEventMobile/> : <WheelsEvent/>;
}
