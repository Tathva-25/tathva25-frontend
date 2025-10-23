"use client";

import { useState, useLayoutEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import LoadingBar from "@/components/LoadingBar";
import Sidebar from "./heroPage/sidebarv2";

export default function ClientLayoutWrapper({ children }) {
  const pathname = usePathname();
  const [isLoaded, setIsLoaded] = useState(false);
  const [softVisible, setSoftVisible] = useState(true);
  const isHome = pathname === "/";
  const ismap = pathname === "/nitcmap";

  // Reset gating on route changes (and on first mount) before paint to avoid flashes
  useLayoutEffect(() => {
    if (isHome) {
      setIsLoaded(false);
      setSoftVisible(true);
    } else {
      setIsLoaded(true);
      setSoftVisible(false);
      requestAnimationFrame(() => setSoftVisible(true));
    }
  }, [pathname, isHome]);

  const handleLoadingComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return ismap ? (
    <div>{children}</div>
  ) : (
    <>
      {/* Heavy animated loader only on landing page */}
      {isHome && <LoadingBar onComplete={handleLoadingComplete} />}

      {/* Sidebar visible on all pages except home */}
      {!isHome && <Sidebar />}

      {/* Page content with fade and loader gating */}
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
        <div className={`${!isHome ? "translate-y-13 sm:translate-x-7" : ""}`}>
          {children}
        </div>
      </div>
    </>
  );
}
