// components/Competitions.jsx

"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import CompetitionTabs from "@/components/CompetitionTabs"; // We will create this next
import { Michroma } from "next/font/google";

const michroma = Michroma({ subsets: ["latin"], weight: "400" });

export default function Competitions() {
  // State for storing competitions, loading status, errors, and the search query
  const [allCompetitions, setAllCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch data when the component mounts
  useEffect(() => {
    const getCompetitions = async () => {
      try {
        setLoading(true);
        const url = `${process.env.NEXT_PUBLIC_API}/api/events/all?type=competitions`;
        const response = await axios.get(url);
        setAllCompetitions(response.data.events || []);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch competitions:", err);
        setError(err.message || "Failed to load competitions");
      } finally {
        setLoading(false);
      }
    };

    getCompetitions();
  }, []); // Empty dependency array ensures this runs only once

  // Filter competitions based on the search query in real-time
  const searchedCompetitions = allCompetitions.filter((event) =>
      event.heading.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Separate the *filtered* list into two categories and filter out full events
  const gpcEvents = searchedCompetitions.filter(
      (event) => event.committee === "GPC" && !event.isFull
  );
  const expoEvents = searchedCompetitions.filter(
      (event) => event.committee === "Expo" && !event.isFull
  );
  const roboEvents = searchedCompetitions.filter(
      (event) => event.committee === "Robo" && !event.isFull
  );
  const otherCompetitions = searchedCompetitions.filter(
      (event) => event.committee !== "GPC" && event.committee !== "Robo" && event.committee !== "Expo" && !event.isFull
  );

  // Loading state UI
  if (loading) {
    return (
        <div className="bg-white min-h-screen py-16 px-4 sm:px-8 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-gray-900 border-r-transparent"></div>
            <p className="mt-4 text-gray-600">Loading competitions...</p>
          </div>
        </div>
    );
  }

  // Error state UI
  if (error) {
    return (
        <div className="bg-white min-h-screen py-16 px-4 sm:px-8 flex items-center justify-center">
          <div className="text-center text-red-600">
            <p className="text-xl font-semibold">Error loading competitions</p>
            <p className="mt-2">{error}</p>
          </div>
        </div>
    );
  }

  return (
      <div className="bg-white min-h-screen py-8 sm:py-0 px-4 sm:px-8">
        {/* Heading and Search Bar Section */}
        <div className="mb-12">
          <Link
              href="/"
              className="font-['Open_Sans',sans-serif] text-sm font-medium text-gray-500 hover:text-black transition-colors"
          >
            ← Back to Home
          </Link>
          <div className="border-b border-gray-300 pb-4 mt-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <h1 className={`${michroma.className} pp-fragment text-3xl sm:text-5xl md:text-6xl text-center lg:text-left tracking-wide text-gray-900 uppercase`}>
                COMPETITIONS
              </h1>
              <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search For Competitions"
                  className="font-['Open_Sans',sans-serif] font-normal w-full rounded-full lg:max-w-lg p-4 border border-gray-300 shadow-sm focus:ring-gray-500 focus:border-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Conditional rendering for the tabs or a "not found" message */}
        {searchedCompetitions.length === 0 && !loading ? (
            <p className="text-center text-gray-600 text-lg mt-16">
              No competitions found matching your search.
            </p>
        ) : (
            <CompetitionTabs
                tathvaEvents={otherCompetitions}
                preTathvaEvents={gpcEvents}
                expoEvents={expoEvents}
                roboEvents={roboEvents}
            />
        )}
      </div>
  );
}