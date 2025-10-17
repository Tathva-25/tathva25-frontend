"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import LoadingBar from "@/components/LoadingBar";

export default function ClientLayoutWrapper({ children }) {
  const pathname = usePathname();
  const [isLoaded, setIsLoaded] = useState(false);

  // Reset loading state on route change
  useEffect(() => {
    if (isLoaded) {
      setIsLoaded(false);
    }
  }, [pathname]);

  return (
    <>
      {/* The LoadingBar is always rendered on a route change.
        It will call setIsLoaded(true) when its animation is complete.
      */}
      <LoadingBar onComplete={() => setIsLoaded(true)} />

      {/* The main content is mounted but invisible until loading is complete.
        This prevents content flashing and ensures a smooth transition.
      */}
      <div
        className={`transition-opacity duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        {children}
      </div>
    </>
  );
}
