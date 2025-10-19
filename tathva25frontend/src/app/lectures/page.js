"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Card2 from "@/components/Card2";
import Link from "next/link";

export default function WorkshopsPage() {
  const [workshops, setWorkshops] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const formatDate = (dateString) =>
    dateString
      ? new Date(dateString).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
          timeZone: "Asia/Kolkata",
        })
      : "TBA";

  console.log(process.env.NEXT_PUBLIC_API);
  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_API}/api/events/all?type=lectures`;
        const response = await axios.get(url);
        setWorkshops(response.data.events);
        setError(null);
      } catch (err) {
        console.error("Error fetching lectures:", err);
        setError(err.message || "Failed to load lectures");
      } finally {
      }
    };

    fetchWorkshops();
  }, []);

  // Search filtering
  const searchedWorkshops = workshops.filter((workshop) =>
    workshop.heading.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (error) {
    return (
      <div className="bg-white min-h-screen py-16 px-4 sm:px-8 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p className="text-xl font-semibold">Error loading lectures</p>
          <p className="mt-2">{error}</p>
        </div>
      </div>
    );
  }

  const filteredWorkshops = searchedWorkshops.filter((w) => !w.isFull);

  // Sort: real images first, dummy ones (ending with "-DUMMY.jpg") last
  const sortedWorkshops = [
    ...filteredWorkshops.filter(
      (w) => !w.picture?.trim().endsWith("-DUMMY.jpg")
    ),
    ...filteredWorkshops.filter((w) =>
      w.picture?.trim().endsWith("-DUMMY.jpg")
    ),
  ];

  return (
    <div className="bg-white min-h-screen py-4 sm:py-10 px-4 sm:px-8">
      {/* Heading and home */}
      <div className="mb-12">
        <Link
          href="/"
          className="text-sm font-medium text-gray-500 hover:text-black transition-colors"
        >
          ← Home
        </Link>

        <div className="mb-12 border-b border-gray-300 pb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Title */}
            <h1 className="pp-fragment text-4xl sm:text-5xl md:text-6xl text-center md:text-left tracking-wide text-gray-900 uppercase md:mt-3">
              LECTURES
            </h1>

            {/* Search Bar */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search For Lectures"
              className="w-full md:max-w-lg p-4 border border-gray-300 rounded-full shadow-sm focus:ring-gray-500 focus:border-gray-500"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto">
        {sortedWorkshops.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            No lectures found matching your search.
          </p>
        ) : (
          <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
            {sortedWorkshops.map((workshop, index) => {
              const {
                id,
                heading,
                description,
                price,
                datetime,
                time,
                venue,
                picture,
              } = workshop;

              // Generate barcode value based on workshop ID
              const barcodeValue = String(id).padStart(7, "0");

              // Format description with additional info
              const fullDescription = `${
                description ?? "No description available"
              } `;

              return (
                <Link
                  href={`/lectures/${id}`}
                  key={id}
                  className="block transform -mt-25 -mb-25 sm:mt-0 sm:mb-0 sm:scale:100 hover:scale-105 transition-transform duration-300"
                >
                  <div className="workshop-card-container">
                    <Card2
                      number={String(index + 1).padStart(2, "0")}
                      imageUrl={picture || "/images/card_01.png"}
                      heading={heading ?? "Untitled Workshop"}
                      description={fullDescription}
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
        .workshop-card-container {
          margin-bottom: 2rem;
          transition: all 0.3s ease;
        }

        .workshop-card-container:hover {
          filter: brightness(1.05);
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .workshop-card-container {
            transform: scale(0.85);
            margin-bottom: 1rem;
          }
        }

        @media (max-width: 480px) {
          .workshop-card-container {
            transform: scale(0.7);
            margin-bottom: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}
