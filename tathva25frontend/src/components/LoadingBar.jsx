"use client";

import { Suspense, useState, useEffect } from "react";
import LoadingBarInner from "./LoadingBarInner";

// Immediate fallback loading component that appears instantly
function LoadingFallback() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-amber-300 border-t-transparent rounded-full animate-spin" />
        <p className="text-amber-800 text-sm font-light tracking-widest">
          LOADING
        </p>
      </div>
    </div>
  );
}

// Main wrapper component with Suspense boundary for useSearchParams
export default function LoadingBar() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Show immediate loading screen until hydrated
  if (!isHydrated) {
    return <LoadingFallback />;
  }

  return (
    <Suspense fallback={<LoadingFallback />}>
      <LoadingBarInner />
    </Suspense>
  );
}
