// components/CompetitionTabs.jsx

"use client";

import React, { useState } from "react";
import Link from "next/link";
import Card from "@/components/Card"; // Assuming you reuse the same Card component

export default function CompetitionTabs({ tathvaEvents, preTathvaEvents }) {
  const [activeTab, setActiveTab] = useState("tathva");

  const renderCompetitionList = (competitions) => {
    if (competitions.length === 0) {
      return (
        <p className="text-center text-gray-500 mt-8">
          No competitions in this category.
        </p>
      );
    }
    return (
      <div className="flex flex-wrap justify-center gap-8 lg:gap-12 mt-8">
        {competitions.map((comp, index) => (
          <Link
            href={`/competitions/${comp.id}`}
            key={comp.id}
            className="block -mt-20 -mb-20 scale-75 hover:scale-80 sm:mt-0 sm:mb-0 transform sm:scale-100 sm:hover:scale-105 transition-transform duration-300"
          >
            {/* You can reuse your existing Card component or create a specific one */}
            <Card
              number={String(index + 1).padStart(2, "0")}
              imageUrl={comp.picture || "/images/card_01.png"}
              heading={comp.heading ?? "Untitled Competition"}
              description={comp.description ?? "No description available"}
              barcodeValue={String(comp.id).padStart(7, "0")}
              sideImageUrl="/images/misc.png"
            />
          </Link>
        ))}
      </div>
    );
  };

  return (
    <div>
      {/* Tab Navigation */}
      <div className="flex justify-center border-b border-gray-300">
        <button
          onClick={() => setActiveTab("tathva")}
          className={`px-6 py-3 text-lg font-medium transition-colors ${
            activeTab === "tathva"
              ? "border-b-2 border-gray-900 text-gray-900"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          Tathva Competitions
        </button>
        <button
          onClick={() => setActiveTab("pre-tathva")}
          className={`px-6 py-3 text-lg font-medium transition-colors ${
            activeTab === "pre-tathva"
              ? "border-b-2 border-gray-900 text-gray-900"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          GPC Events
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "tathva" && renderCompetitionList(tathvaEvents)}
        {activeTab === "pre-tathva" && renderCompetitionList(preTathvaEvents)}
      </div>
    </div>
  );
}
