'use client'

import React, { useState } from 'react';
import { FaBullhorn, FaCalendarAlt, FaClock } from "react-icons/fa";

const AnnouncementPage = () => {
  // Mock announcement data - replace with actual data from API
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: 'Robotics Workshop Registration Open',
      category: 'Workshop',
      date: '2025-10-17',
      time: '10:00 AM',
      venue: 'Central Auditorium',
      description: "Join us for an exciting robotics workshop where you'll learn about the latest in robotics technology. Limited seats available!",
      registrationLink: 'https://example.com/register'
    },
    {
      id: 2,
      title: 'Hackathon 2025 Announcement',
      category: 'Competition',
      date: '2025-10-20',
      time: '9:00 AM',
      venue: 'Tech Hub',
      description: '24-hour coding challenge with amazing prizes. Form your teams and get ready to innovate!',
      registrationLink: 'https://example.com/hackathon'
    },
    {
      id: 3,
      title: 'Technical Paper Presentation',
      category: 'Academic',
      date: '2025-10-18',
      time: '2:00 PM',
      venue: 'Seminar Hall',
      description: 'Present your research papers in front of industry experts. Best papers will be published in our journal.',
      registrationLink: 'https://example.com/papers'
    }
  ]);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Workshop', 'Competition', 'Academic', 'Cultural'];

  const filteredAnnouncements = selectedCategory === 'All'
    ? announcements
    : announcements.filter(announcement => announcement.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Announcements</h1>
          <p className="text-gray-600">Stay updated with the latest events and announcements from Tathva 2025</p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Announcements Grid */}
        <div className="grid grid-cols-1 gap-6">
          {filteredAnnouncements.map(announcement => (
            <div key={announcement.id} className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                    announcement.category === 'Workshop' ? 'bg-blue-100 text-blue-800' :
                    announcement.category === 'Competition' ? 'bg-green-100 text-green-800' :
                    announcement.category === 'Academic' ? 'bg-purple-100 text-purple-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {announcement.category}
                  </span>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">{announcement.title}</h2>
                </div>
                <FaBullhorn className="text-blue-600 text-xl" />
              </div>
              
              <p className="text-gray-600 mb-4">{announcement.description}</p>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-2 text-blue-600" />
                  {announcement.date}
                </div>
                <div className="flex items-center">
                  <FaClock className="mr-2 text-blue-600" />
                  {announcement.time}
                </div>
                <div className="flex items-center">
                  <span className="font-medium mr-2">Venue:</span>
                  {announcement.venue}
                </div>
              </div>

              <a
                href={announcement.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Register Now
              </a>
            </div>
          ))}
        </div>

        {/* No Announcements Message */}
        {filteredAnnouncements.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No announcements found for this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnnouncementPage;