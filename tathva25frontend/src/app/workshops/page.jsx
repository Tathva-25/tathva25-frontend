"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@/components/Card";
import Link from "next/link";

export default function WorkshopsPage() {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [scale, setScale] = useState(1);

  const desktopColumnGap = 5; // vw
  const desktopRowGap = 3; // vw
  const tabletColumnGap = 8; // vw
  const tabletRowGap = 0; // vw
  const mobileGapPx = 20; // px

  const formatDate = (dateString) =>
    dateString
      ? new Date(dateString).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
          timeZone: "Asia/Kolkata",
        })
      : "TBA";

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        setLoading(true);
        const url = `${process.env.NEXT_PUBLIC_API}/api/events/all?type=workshops`;
        const response = await axios.get(url);
        setWorkshops(response.data.events);
        setError(null);
      } catch (err) {
        console.error("Error fetching workshops:", err);
        setError(err.message || "Failed to load workshops");
      } finally {
        setLoading(false);
      }
    };
    fetchWorkshops();
  }, []);

  useEffect(() => {
    function calcScale() {
      const width = window.innerWidth;
      let cardVW = 25; // desktop default
      if (width <= 500) cardVW = 85; // mobile breakpoint
      else if (width <= 1024) cardVW = 35; // tablet breakpoint

      const cardWidthPx = (width * cardVW) / 100;
      const scaleFactor = cardWidthPx / 411;
      setScale(scaleFactor);
    }

    calcScale();
    window.addEventListener("resize", calcScale);
    return () => window.removeEventListener("resize", calcScale);
  }, []);

  const searchedWorkshops = workshops.filter((workshop) =>
    workshop.heading.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredWorkshops = searchedWorkshops.filter((w) => !w.isFull);

  const sortedWorkshops = [
    ...filteredWorkshops.filter(
      (w) => !w.picture?.trim().endsWith("-DUMMY.jpg")
    ),
    ...filteredWorkshops.filter((w) => w.picture?.trim().endsWith("-DUMMY.jpg")),
  ];

  if (loading) {
    return (
      <div className="bg-white min-h-screen py-16 px-4 sm:px-8 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-gray-900 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading workshops...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white min-h-screen py-16 px-4 sm:px-8 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p className="text-xl font-semibold">Error loading workshops</p>
          <p className="mt-2">{error}</p>
        </div>
      </div>
    );
  }

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
              WORKSHOPS
            </h1>

            {/* Search Bar */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search For Workshops"
              className="w-full md:max-w-lg p-4 border border-gray-300 rounded-full shadow-sm focus:ring-gray-500 focus:border-gray-500"
            />
          </div>
        </div>
      </div>

      {sortedWorkshops.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          No workshops found matching your search.
        </p>
      ) : (
        <div className="container">
          {sortedWorkshops.map((workshop, index) => {
            const { id, heading, description, picture } = workshop;
            const barcodeValue = String(id).padStart(7, "0");
            const fullDescription = description ?? "No description available";

            return (
              <div
                className="card-wrapper"
                key={id}
                style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}
              >
                <Link href={`/workshops/${id}`}>
                  <Card
                    number={String(index + 1).padStart(2, "0")}
                    imageUrl={picture || "/images/card_01.png"}
                    heading={heading ?? "Untitled Workshop"}
                    description={fullDescription}
                    barcodeValue={barcodeValue}
                    sideImageUrl="/images/misc.png"
                  />
                </Link>
              </div>
            );
          })}
        </div>
      )}

      <style jsx>{`
        /* Box sizing */
        .container,
        .card-wrapper {
          box-sizing: border-box;
        }

        /* Desktop */
        .container {
          min-height: 100vh;
          background-color: #fff;
          display: grid;
          justify-content: center;
          align-content: center;
          max-width: 100vw;
          overflow-x: hidden;

          grid-template-columns: repeat(3, 25vw);
          column-gap: ${desktopColumnGap}vw;
          row-gap: ${desktopRowGap}vw;

          padding-left: 0;
          padding-right: 0;
        }

        .card-wrapper {
          width: 25vw;
          height: calc(25vw * 1.6);
          max-width: 100%;
          margin: 0;
          cursor: pointer;
        }

        /* Tablet */
        @media (min-width: 501px) and (max-width: 1024px) {
          .container {
            grid-template-columns: repeat(2, 35vw);
            column-gap: ${tabletColumnGap}vw;
            row-gap: ${tabletRowGap}vw;
            justify-content: center;
            padding-left: 0;
            padding-right: 0;
          }
          .card-wrapper {
            width: 35vw;
            height: calc(35vw * 1.7);
          }
        }

        /* Mobile */
        @media (max-width: 500px) {
          .container {
            grid-template-columns: 85vw;
            column-gap: ${mobileGapPx}px;
            row-gap: ${mobileGapPx}px;
            justify-content: center;
            padding-left: 0;
            padding-right: 0;
          }
          .card-wrapper {
            width: 85vw;
            height: calc(85vw * 1.6);
          }
        }
      `}</style>
    </div>
  );
}
