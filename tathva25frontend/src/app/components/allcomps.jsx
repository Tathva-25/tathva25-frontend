// components/AllCompetitions.js
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@/components/Card"; // Assuming Card component is in @/components/Card
import Link from "next/link";

export default function AllCompetitions() {
  const [competitions, setCompetitions] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        // Fetch competitions instead of workshops
        const url = `${process.env.NEXT_PUBLIC_API}/api/events/all?type=competitions`;
        const response = await axios.get(url);
        setCompetitions(response.data.events || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching competitions:", err);
        setError(err.message || "Failed to load competitions");
      }
    };

    fetchCompetitions();
  }, []);

  // Search filtering
  const searchedCompetitions = competitions.filter((competition) =>
    competition.heading.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
  
  // Sort competitions: real images first, dummy ones last
  const sortedCompetitions = [
    ...searchedCompetitions.filter(
      (c) => !c.picture?.trim().endsWith("-DUMMY.jpg")
    ),
    ...searchedCompetitions.filter((c) =>
      c.picture?.trim().endsWith("-DUMMY.jpg")
    ),
  ];

  return (
    <div className="bg-white min-h-screen py-4 sm:py-10 px-4 sm:px-8">
      {/* Search Bar and Heading */}
      <div className="mb-12 border-b border-gray-300 pb-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search For Competitions"
            className="w-full md:max-w-lg p-4 border border-gray-300 rounded-full shadow-sm focus:ring-gray-500 focus:border-gray-500"
          />
        </div>
      </div>

      {/* Competitions Grid */}
      <div className="mx-auto">
        {sortedCompetitions.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            No competitions found.
          </p>
        ) : (
          <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
            {sortedCompetitions.map((competition, index) => {
              const { id, heading, description, picture } = competition;
              const barcodeValue = String(id).padStart(7, "0");

              return (
                <Link
                  href={`/competitions/${id}`} // Link to the specific competition page
                  key={id}
                  className="block transform hover:scale-105 transition-transform duration-300"
                >
                  <div className="competition-card-container">
                    <Card
                      number={String(index + 1).padStart(2, "0")}
                      imageUrl={picture || "/images/card_01.png"}
                      heading={heading ?? "Untitled Competition"}
                      description={description || "No description available."}
                      barcodeValue={barcodeValue}
                      sideImageUrl="/images/misc.png"
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      <style jsx>{`
        .competition-card-container {
          margin-bottom: 2rem;
          transition: all 0.3s ease;
        }
        .competition-card-container:hover {
          filter: brightness(1.05);
        }
      `}</style>
    </div>
  );
}