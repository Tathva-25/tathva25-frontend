'use client'

import React, { useState } from 'react';
import { IoMdCopy } from "react-icons/io";
import { FaUser, FaGift, FaMoneyBillWave } from "react-icons/fa";

const ReferralPage = () => {
  // Mock user data - replace with actual user data
  const [userData, setUserData] = useState({
    username: 'johndoe',
    referralCode: 'JOHN2025',
    referralCount: 5,
    totalEarnings: 500,
    pendingEarnings: 100,
    rewardPerReferral: 100
  });

  const [showCopiedAlert, setShowCopiedAlert] = useState(false);

  const handleCopyReferralCode = () => {
    navigator.clipboard.writeText(userData.referralCode);
    setShowCopiedAlert(true);
    setTimeout(() => setShowCopiedAlert(false), 2000);
  };

  // Mock referral history - replace with actual data from API
  const referralHistory = [
    { id: 1, name: 'Alice Smith', date: '2025-10-15', status: 'Completed' },
    { id: 2, name: 'Bob Johnson', date: '2025-10-14', status: 'Pending' },
    { id: 3, name: 'Carol White', date: '2025-10-13', status: 'Completed' },
  ];

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Referral Program</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-md">
            <div className="flex items-center mb-4">
              <FaUser className="text-blue-600 text-xl mr-2" />
              <h3 className="text-lg font-semibold">Total Referrals</h3>
            </div>
            <p className="text-3xl font-bold text-gray-800">{userData.referralCount}</p>
            <p className="text-sm text-gray-600 mt-2">People you've referred</p>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-md">
            <div className="flex items-center mb-4">
              <FaMoneyBillWave className="text-green-600 text-xl mr-2" />
              <h3 className="text-lg font-semibold">Total Earnings</h3>
            </div>
            <p className="text-3xl font-bold text-gray-800">₹{userData.totalEarnings}</p>
            <p className="text-sm text-gray-600 mt-2">₹{userData.pendingEarnings} pending</p>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-md">
            <div className="flex items-center mb-4">
              <FaGift className="text-purple-600 text-xl mr-2" />
              <h3 className="text-lg font-semibold">Reward per Referral</h3>
            </div>
            <p className="text-3xl font-bold text-gray-800">₹{userData.rewardPerReferral}</p>
            <p className="text-sm text-gray-600 mt-2">For each successful referral</p>
          </div>
        </div>

        {/* Referral Code Section */}
        <div className="bg-gray-50 rounded-lg p-8 border border-gray-200 mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Referral Code</h2>
          <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200">
            <span className="text-xl font-mono font-semibold text-gray-700">{userData.referralCode}</span>
            <button
              onClick={handleCopyReferralCode}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <IoMdCopy className="mr-2" />
              Copy Code
            </button>
          </div>
          {showCopiedAlert && (
            <div className="mt-2 text-green-600 text-sm">
              Referral code copied to clipboard!
            </div>
          )}
          <p className="mt-4 text-gray-600">
            Share this code with your friends and earn rewards when they sign up!
          </p>
        </div>

        {/* How It Works Section */}
        <div className="bg-white rounded-lg p-8 border border-gray-200 mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-semibold">1</span>
              </div>
              <h3 className="font-semibold mb-2">Share Your Code</h3>
              <p className="text-gray-600">Share your unique referral code with friends</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-semibold">2</span>
              </div>
              <h3 className="font-semibold mb-2">Friends Register</h3>
              <p className="text-gray-600">They register using your referral code</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-semibold">3</span>
              </div>
              <h3 className="font-semibold mb-2">Earn Rewards</h3>
              <p className="text-gray-600">Get rewards for each successful referral</p>
            </div>
          </div>
        </div>

        {/* Referral History */}
        <div className="bg-white rounded-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Referral History</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {referralHistory.map((referral) => (
                  <tr key={referral.id} className="border-b border-gray-100">
                    <td className="py-3 px-4 text-gray-800">{referral.name}</td>
                    <td className="py-3 px-4 text-gray-600">{referral.date}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        referral.status === 'Completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {referral.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralPage;
