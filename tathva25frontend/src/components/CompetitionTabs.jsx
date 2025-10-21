// components/CompetitionTabs.jsx

"use client";

import React, { useState } from "react";
import Link from "next/link";
import Card from "@/components/Card"; // Assuming you reuse the same Card component
import { Michroma } from "next/font/google";

const michroma = Michroma({ subsets: ["latin"], weight: "400" });

export default function CompetitionTabs({ tathvaEvents, preTathvaEvents, expoEvents, roboEvents, }) {
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
        <div className="flex justify-center border-b border-gray-300 overflow-x-auto">
          <div className="flex min-w-max">
            <button
                onClick={() => setActiveTab("tathva")}
                className={`px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base lg:text-lg ${michroma.className} font-medium transition-colors whitespace-nowrap ${
                    activeTab === "tathva"
                        ? "border-b-2 border-gray-900 text-gray-900"
                        : "text-gray-500 hover:text-gray-800"
                }`}
            >
              General
            </button>
            <button
                onClick={() => setActiveTab("pre-tathva")}
                className={`px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base lg:text-lg ${michroma.className} font-medium transition-colors whitespace-nowrap ${
                    activeTab === "pre-tathva"
                        ? "border-b-2 border-gray-900 text-gray-900"
                        : "text-gray-500 hover:text-gray-800"
                }`}
            >
              GPC
            </button>
            <button
                onClick={() => setActiveTab("expo")}
                className={`px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base lg:text-lg ${michroma.className} font-medium transition-colors whitespace-nowrap ${
                    activeTab === "expo"
                        ? "border-b-2 border-gray-900 text-gray-900"
                        : "text-gray-500 hover:text-gray-800"
                }`}
            >
              Expo
            </button>
            <button
                onClick={() => setActiveTab("robo")}
                className={`px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base lg:text-lg ${michroma.className} font-medium transition-colors whitespace-nowrap ${
                    activeTab === "robo"
                        ? "border-b-2 border-gray-900 text-gray-900"
                        : "text-gray-500 hover:text-gray-800"
                }`}
            >
              Robo
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "tathva" && renderCompetitionList(tathvaEvents)}
          {activeTab === "pre-tathva" && renderCompetitionList(preTathvaEvents)}
          {activeTab === "expo" && renderCompetitionList(expoEvents)}
          {activeTab === "robo" && renderCompetitionList(roboEvents)}
        </div>
      </div>
  );
}