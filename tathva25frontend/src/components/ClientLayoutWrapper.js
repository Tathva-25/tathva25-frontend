"use client";

import { useState, useLayoutEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import LoadingBar from "@/components/LoadingBar";

export default function ClientLayoutWrapper({ children }) {
  const pathname = usePathname();
  const [isLoaded, setIsLoaded] = useState(false);

  // Reset gating on route changes (and on first mount) before paint to avoid flashes
  useLayoutEffect(() => {
    setIsLoaded(false);
  }, [pathname]);

  const handleLoadingComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      {/* Main loading overlay; calls onComplete when finished */}
      <LoadingBar onComplete={handleLoadingComplete} />

      {/* Hide content until loader completes to avoid pre-visibility */}
      <div
        className={`transition-opacity duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ pointerEvents: isLoaded ? "auto" : "none" }}
      >
        {children}
      </div>
    </>
  );
}
