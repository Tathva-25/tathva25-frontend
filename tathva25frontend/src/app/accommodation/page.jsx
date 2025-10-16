'use client'

import React, { useState } from 'react';

const AccommodationPage = () => {
  // Mock data for booked rooms - replace with actual API call later
  const [bookedRooms, setBookedRooms] = useState([
    {
      id: 1,
      roomNumber: 'A101',
      type: 'Double Sharing',
      checkIn: '2025-10-20',
      checkOut: '2025-10-23',
      status: 'Confirmed'
    },
    {
      id: 2,
      roomNumber: 'B205',
      type: 'Single Sharing',
      checkIn: '2025-10-21',
      checkOut: '2025-10-24',
      status: 'Pending'
    }
  ]);

  const handleBookingRequest = () => {
    // Implement booking request logic here
    console.log('Booking request initiated');
  };

  return (
    <div className="min-h-screen p-8 bg-white text-gray-800">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Accommodation</h1>

        {/* Booked Rooms Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Your Bookings</h2>
          
          {bookedRooms.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {bookedRooms.map((room) => (
                <div 
                  key={room.id}
                  className="bg-white rounded-lg p-6 border border-gray-200 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">Room {room.roomNumber}</h3>
                      <p className="text-gray-600">{room.type}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      room.status === 'Confirmed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {room.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Check-in:</span>
                      <span>{room.checkIn}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Check-out:</span>
                      <span>{room.checkOut}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-500">No bookings found</p>
            </div>
          )}
        </div>

        {/* Booking Request Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleBookingRequest}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg 
                     transition-all duration-300 ease-in-out transform hover:scale-105
                     shadow-lg hover:shadow-xl
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Request New Booking
          </button>
        </div>

        {/* Information Section */}
        <div className="mt-12 bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4">Important Information</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Bookings are subject to availability</li>
            <li>Check-in time: 2:00 PM</li>
            <li>Check-out time: 11:00 AM</li>
            <li>Please carry valid ID proof during check-in</li>
            <li>For any queries, contact: accommodation@tathva.org</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AccommodationPage;