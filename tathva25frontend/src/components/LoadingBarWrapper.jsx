"use client";

import { Suspense } from "react";
import LoadingBarInner from "./LoadingBarInner";

// Fallback loading component
function LoadingFallback() {
  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50" />
  );
}

// Wrapper component with Suspense boundary
export default function LoadingBar() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <LoadingBarInner />
    </Suspense>
  );
}
