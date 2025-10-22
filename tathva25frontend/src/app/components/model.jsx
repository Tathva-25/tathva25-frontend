"use client";
import RegisterButton from "./RegisterButton";
import {useEffect, useState} from "react";
import jwtRequired from "@/axios/jwtRequired";

export default function Modal({
                                isOpen,
                                onClose,
                                workshopData,
                                title = "Checkout Summary",
                              }) {
  if (!isOpen) return null;

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await jwtRequired.get("/api/users");

        const userRaw = res.data;

        const formattedUser = {
          id: userRaw.id,
          name: userRaw.name,
          tat_id: userRaw.referral,
          phone_number: userRaw.phone,
          email: userRaw.email
        };

        setUser(formattedUser);
      } catch (err) {
        console.error("Error fetching user:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  console.log("price: " , workshopData)

  console.log(workshopData.price);
  const basePrice = Number(workshopData.price/100) || 0;

  const platformFeePercent = 2.0;
  const gstPercent = 18;

  const platformFee = (platformFeePercent / 100) * basePrice;
  const gst = (gstPercent / 100) * platformFee;
  const total = basePrice + platformFee + gst;

  console.log(basePrice, platformFee);

  // 💰 Proper INR formatter
  const formatINR = (num) =>
      new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 2,
      }).format(num);

  return (
      <div className="fixed inset-0 rounded-3xl bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-xl relative max-h-[90vh] overflow-y-auto">
          {/* Close Button */}
          <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-lg"
          >
            ✕
          </button>

          {/* Title */}
          <h2 className="text-xl font-semibold mb-4">{title}</h2>

          {/* Booking Details Section */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Booking Details</h3>
            {loading ? (
                <div className="text-sm text-gray-500">Loading user details...</div>
            ) : user ? (
                <div className="space-y-2 text-sm bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">{user.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-medium">{user.phone_number}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium break-words">{user.email}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 pt-2 border-t border-gray-200">
                    Name and phone can be edited in your profile page
                  </p>
                </div>
            ) : (
                <div className="text-sm text-red-500">Failed to load user details</div>
            )}
          </div>

          {/* Billing Breakdown */}
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Workshop </span>
              <span className="font-medium">{workshopData.name}</span>
            </div>

            <div className="border-b pb-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>Workshop Price</span>
                <span>{formatINR(basePrice)}</span>
              </div>
              <div className="flex justify-between">
                <span>Platform Fee ({platformFeePercent}%)</span>
                <span>{formatINR(platformFee)}</span>
              </div>
              <div className="flex justify-between">
                <span>GST on Platform Fee ({gstPercent}%)</span>
                <span>{formatINR(gst)}</span>
              </div>
            </div>

            <div className="flex justify-between text-lg font-semibold text-gray-900">
              <span>Total</span>
              <span>{formatINR(total)}</span>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <RegisterButton
                  id={workshopData.id}
                  ticketId={workshopData.ticketId}
              />
            </div>
          </div>
        </div>
      </div>
  );
}