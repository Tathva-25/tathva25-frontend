"use client";

import { useState, useLayoutEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import LoadingBar from "@/components/LoadingBar";

export default function ClientLayoutWrapper({ children }) {
  const pathname = usePathname();
  const [isLoaded, setIsLoaded] = useState(false);
  const [softVisible, setSoftVisible] = useState(true); // for non-home subtle fade-in
  const isHome = pathname === "/";

  // Reset gating on route changes (and on first mount) before paint to avoid flashes
  useLayoutEffect(() => {
    // Gate only on landing page; everywhere else show immediately
    if (isHome) {
      setIsLoaded(false);
      setSoftVisible(true);
    } else {
      setIsLoaded(true);
      // trigger a tiny fade-in on route change for non-home
      setSoftVisible(false);
      requestAnimationFrame(() => setSoftVisible(true));
    }
  }, [pathname, isHome]);

  const handleLoadingComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      {/* Heavy animated loader only on landing page */}
      {isHome && <LoadingBar onComplete={handleLoadingComplete} />}

      {/* Gate content only on landing page; elsewhere show immediately */}
      <div
        className={`transition-opacity ${
          isHome ? "duration-500" : "duration-300"
        } ${
          isHome
            ? isLoaded
              ? "opacity-100"
              : "opacity-0"
            : softVisible
            ? "opacity-100"
            : "opacity-0"
        }`}
        style={{
          pointerEvents: isHome ? (isLoaded ? "auto" : "none") : "auto",
        }}
      >
        {children}
      </div>
    </>
  );
}
