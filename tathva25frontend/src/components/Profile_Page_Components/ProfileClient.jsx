"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaEdit, FaShare, FaCheck, FaUser, FaUsers, FaBed } from "react-icons/fa";
import {
    MdEvent,
    MdDateRange,
    MdAccessTime,
    MdDownload,
    MdHistory,
    MdPending,
    MdCheckCircle,
} from "react-icons/md";
import EditModal from "./EditModal";
import EventsModal from "./EventsModal";
import { useRouter } from "next/navigation";
import axios from "axios";
import jwtRequired from "@/axios/jwtRequired";

export default function ProfileClient({ user }) {
    // ...existing code...
    const [modalOpen, setModalOpen] = useState(false);
    const [eventsModalOpen, setEventsModalOpen] = useState(false);
    const [editField, setEditField] = useState("name");
    const [currentUser, setCurrentUser] = useState(user);
    const [copied, setCopied] = useState(false);
    const [allBookings, setAllBookings] = useState([]);
    const [confirmedBookings, setConfirmedBookings] = useState([]);
    const [accommodationBookings, setAccommodationBookings] = useState([]);
    const [activeTab, setActiveTab] = useState("confirmedReferrals"); // Default to match design
    const [referrals, setReferrals] = useState([]);
    const [confirmReferrals, setConfirmReferrals] = useState(0);
    const [pendingReferrals, setPendingReferrals] = useState([]);
    const [confirmedReferralsList, setConfirmedReferralsList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingField, setEditingField] = useState(null);
    const [tempValue, setTempValue] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchBookingsAndReferrals = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const token = localStorage.getItem("jwt");
                if (!token) throw new Error("Authentication token not found.");

                // fetch bookings
                const bookingsResp = await axios.get(
                    "https://api.tathva.org/api/booking/getbooking",
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                const data = bookingsResp.data;
                const fetchedBookings = data.bookings || [];

                setAllBookings(
                    fetchedBookings.filter((booking) => booking.status !== "TIMEOUT")
                );
                setConfirmedBookings(
                    fetchedBookings.filter((booking) => booking.status === "CONFIRMED")
                );

                // fetch referrals
                try {
                    const refResp = await axios.get(
                        "https://api.tathva.org/api/referrals/",
                        {
                            headers: { Authorization: `Bearer ${token}` },
                        }
                    );

                    const refData = refResp.data || {};
                    const allReferrals = refData.referrals || [];
                    const pending = allReferrals.filter(
                        (ref) => ref.status === "PENDING"
                    );
                    const confirmed = allReferrals.filter(
                        (ref) => ref.status === "CONFIRMED" || ref.status === "COMPLETED"
                    );

                    setReferrals(allReferrals);
                    setPendingReferrals(pending);
                    setConfirmedReferralsList(confirmed);
                    setConfirmReferrals(
                        typeof refData.confirmReferrals === "number"
                            ? refData.confirmReferrals
                            : confirmed.length
                    );

                    try {
                        const accomResp = await jwtRequired.get("https://api.tathva.org/api/accomodation/");
                        const confirmedBookings = (accomResp.data.roomBookings || []).filter(
                            (booking) => booking.status === "CONFIRMED"
                        );
                        setAccommodationBookings(confirmedBookings);
                    } catch (accomErr) {
                        console.error("Failed to fetch accommodation:", accomErr);
                    }

                } catch (refErr) {
                    console.error("Failed to fetch referrals:", refErr);
                }
            } catch (err) {
                const message =
                    err?.response?.data?.message || err.message || "Failed to fetch";
                setError(message);
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBookingsAndReferrals();
    }, []);

    const router = useRouter();

    const handleOpenModal = (tab) => {
        setActiveTab(tab);
        setEventsModalOpen(true);
    };

    const handleEdit = (field, currentValue) => {
        setEditingField(field);
        setTempValue(currentValue || "");
    };

    const handleCancelEdit = () => {
        setEditingField(null);
        setTempValue("");
    };

    const handleSaveEdit = async () => {
        if (!tempValue.trim()) {
            alert("Field cannot be empty");
            return;
        }

        let value = tempValue.trim();

        if (editingField === "phone_number") {
            const digitsOnly = value.replace(/\D/g, "");
            if (digitsOnly.length !== 10) {
                alert("Phone number must be exactly 10 digits.");
                return;
            }
            value = digitsOnly;
        }

        setIsSaving(true);
        try {
            const token = localStorage.getItem("jwt");
            if (!token) throw new Error("Authentication token not found.");

            const fieldMapping = {
                phone_number: "phone",
                college: "college",
                district: "district",
                referredByName: "referredById",
            };
            const apiFieldKey = fieldMapping[editingField] || editingField;

            const response = await axios.put(
                `https://api.tathva.org/api/users/`,
                { [apiFieldKey]: value },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = response.data;
            setCurrentUser({ ...currentUser, [editingField]: value });
            setEditingField(null);
            setTempValue("");
        } catch (error) {
            console.error("Error updating user:", error);
            alert("Failed to update. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDownloadTicket = (ticketUrl) => {
        if (ticketUrl) {
            window.open(ticketUrl, "_blank", "noopener,noreferrer");
        } else {
            alert("Ticket URL not available.");
        }
    };

    const getStatusBadge = (status, context = "default") => {
        const baseClasses = "text-xs font-bold uppercase px-2 py-1 rounded-full";
        switch (status) {
            case "CONFIRMED":
            case "COMPLETED":
                return <span className={`${baseClasses} bg-green-200 text-green-800`}>CONFIRMED</span>;
            case "PENDING":
                if (context === "booking") {
                    return <span className={`${baseClasses} bg-gray-200 text-gray-800`}>FAILED</span>;
                }
                return <span className={`${baseClasses} bg-yellow-200 text-yellow-800`}>PENDING</span>;
            default:
                return <span className={`${baseClasses} bg-gray-200 text-gray-800`}>{status}</span>;
        }
    };

    const handleCopyReferral = async () => {
        const referralLink = currentUser.tat_id;
        try {
            await navigator.clipboard.writeText(referralLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error("Failed to copy:", error);
            alert("Copy failed. Please copy manually.");
        }
    };

    const fields = [
        { key: "name", label: "Name", editable: true },
        { key: "tat_id", label: "Tathva Id", editable: false },
        { key: "phone_number", label: "Phone Number", editable: true },
        { key: "college", label: "College", editable: true },
        { key: "district", label: "District", editable: true },
        {
            key: "referredByName",
            label: "Referred By",
            editable: !currentUser.referredByName || currentUser.referredByName.trim() === "",
        },
        { key: "confReferral", label: "Confirmed Referrals", editable: false },
    ];

    const renderBookingList = (bookingsToRender) => {
        if (bookingsToRender.length > 0) {
            return (
                <div className="space-y-5">
                    {bookingsToRender.map((booking, index) => {
                        const eventDateTime = new Date(booking.event?.datetime);
                        const displayDate = eventDateTime.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
                        const displayTime = eventDateTime.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });

                        return (
                            <div key={booking.bookingUid} className="bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 hover:border-gray-300" style={{ animation: `slideUp 0.3s ease-out ${index * 100}ms backwards` }}>
                                <div className="flex flex-col lg:flex-row">
                                    <div className="relative w-full lg:w-64 xl:w-80 h-48 lg:h-auto flex-shrink-0 group overflow-hidden">
                                        <Image src={booking.event?.picture || "/placeholder.jpg"} alt={booking.event?.heading} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40"></div>
                                    </div>
                                    <div className="flex-1 p-6">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">
                                            {booking.event?.heading} {booking.event?.type} {getStatusBadge(booking?.status, "booking")}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-5 line-clamp-2 leading-relaxed">{booking.event?.description}</p>
                                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 mb-5">
                                            <div className="flex items-center bg-gray-50 rounded-lg p-3 border border-gray-200 hover:border-gray-300 transition-all duration-200 group">
                                                <div className="bg-black rounded-lg p-2 mr-3 group-hover:scale-110 transition-transform"><MdDateRange className="text-white" size={18} /></div>
                                                <div>
                                                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Date</p>
                                                    <p className="text-sm font-bold text-gray-900">{displayDate}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center bg-gray-50 rounded-lg p-3 border border-gray-200 hover:border-gray-300 transition-all duration-200 group">
                                                <div className="bg-black rounded-lg p-2 mr-3 group-hover:scale-110 transition-transform"><MdAccessTime className="text-white" size={18} /></div>
                                                <div>
                                                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Time</p>
                                                    <p className="text-sm font-bold text-gray-900">{displayTime}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <button onClick={() => handleDownloadTicket(booking.picture)} disabled={booking.status !== "CONFIRMED"} className="w-full bg-black hover:bg-zinc-800 text-white px-6 py-3 rounded-lg font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed">
                                            <MdDownload size={20} />
                                            {booking.status === "CONFIRMED" ? "Download Ticket" : "Failed"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            );
        }
        return (
            <div className="text-center py-20">
                <div className="bg-gray-100 rounded-full w-28 h-28 mx-auto flex items-center justify-center mb-5 border-2 border-gray-200">
                    <MdDateRange className="text-gray-700" size={40} />
                </div>
                <p className="text-gray-900 text-xl font-bold mb-2">{activeTab === "bookings" ? "No confirmed events yet" : "No booking history"}</p>
                <p className="text-gray-500 text-base">Start exploring and register for exciting events!</p>
            </div>
        );
    };

    const renderReferralsList = (referralsToRender, type) => {
        if (referralsToRender.length > 0) {
            return (
                <div className="space-y-5">
                    {referralsToRender.map((referral, index) => (
                        <div key={index} className="bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 hover:border-gray-300" style={{ animation: `slideUp 0.3s ease-out ${index * 100}ms backwards` }}>
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
                                        <FaUser className="text-gray-700" />
                                        {referral.referredUser.name} {getStatusBadge(referral.status, "referral")}
                                    </h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                                    <div className="flex items-center bg-gray-50 rounded-lg p-3 border border-gray-200 transition-all duration-200">
                                        <div>
                                            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Email</p>
                                            <p className="text-sm font-medium text-gray-900 truncate">{referral.referredUser.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center bg-gray-50 rounded-lg p-3 border border-gray-200 transition-all duration-200">
                                        <div>
                                            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Tathva ID</p>
                                            <p className="text-sm font-medium text-gray-900">{referral.referredUser.referral}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            );
        }
        // --- MODIFICATION: Empty state design updated ---
        return (
            <div className="text-center py-20 flex flex-col items-center justify-center h-full">
                <div className="bg-yellow-100 rounded-full w-24 h-24 mx-auto flex items-center justify-center mb-5">
                    <FaUsers className="text-yellow-600" size={48} />
                </div>
                <p className="text-gray-800 text-lg font-semibold mb-2">{type === "confirmed" ? "No confirmed referrals yet" : "No pending referrals"}</p>
                <p className="text-gray-500 text-sm max-w-xs mx-auto">Share your referral code with friends to earn rewards!</p>
            </div>
        );
    };

    const renderAccommodationList = (bookingsToRender) => {
        if (bookingsToRender.length > 0) {
            return (
                <div className="space-y-5">
                    {bookingsToRender.map((booking, index) => {
                        const formatDate = (dateString) => new Date(dateString).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
                        const foodChoices = [];
                        if (booking.foodDay24Veg > 0) foodChoices.push(`24th (Veg: ${booking.foodDay24Veg})`);
                        if (booking.foodDay24NonVeg > 0) foodChoices.push(`24th (Non-Veg: ${booking.foodDay24NonVeg})`);
                        if (booking.foodDay25Veg > 0) foodChoices.push(`25th (Veg: ${booking.foodDay25Veg})`);
                        if (booking.foodDay25NonVeg > 0) foodChoices.push(`25th (Non-Veg: ${booking.foodDay25NonVeg})`);
                        if (booking.foodDay26Veg > 0) foodChoices.push(`26th (Veg: ${booking.foodDay26Veg})`);
                        if (booking.foodDay26NonVeg > 0) foodChoices.push(`26th (Non-Veg: ${booking.foodDay26NonVeg})`);
                        const foodSummary = foodChoices.length > 0 ? foodChoices.join(", ") : "No food selected";

                        return (
                            <div key={booking.bookingUid} className="bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 hover:border-gray-300" style={{ animation: `slideUp 0.3s ease-out ${index * 100}ms backwards` }}>
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                                            Accommodation at {booking.room === "DORMG" ? "Dormitory (Girls)" : (booking.room === "DORMB" ? "Dormitory (Boys) " : (booking.room === "ROOM3" ? "3 Shared Room (Girls)" : "4 Shared Room (Boys)"))}
                                        </h3>
                                        {getStatusBadge(booking.status, "booking")}
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                                        <div className="flex items-center bg-gray-50 rounded-lg p-3 border border-gray-200">
                                            <div className="bg-black rounded-lg p-2 mr-3"><MdDateRange className="text-white" size={18} /></div>
                                            <div>
                                                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Check-in</p>
                                                <p className="text-sm font-medium text-gray-900">{formatDate(booking.startDate)}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center bg-gray-50 rounded-lg p-3 border border-gray-200">
                                            <div className="bg-black rounded-lg p-2 mr-3"><MdDateRange className="text-white" size={18} /></div>
                                            <div>
                                                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Check-out</p>
                                                <p className="text-sm font-medium text-gray-900">{formatDate(booking.endDate)}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center bg-gray-50 rounded-lg p-3 border border-gray-200">
                                            <div className="bg-black rounded-lg p-2 mr-3"><FaUser className="text-white" size={18} /></div>
                                            <div>
                                                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Gender</p>
                                                <p className="text-sm font-medium text-gray-900 capitalize">{booking.gender.toLowerCase()}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center bg-gray-50 rounded-lg p-3 border border-gray-200">
                                            <div className="bg-black rounded-lg p-2 mr-3"><MdEvent className="text-white" size={18} /></div>
                                            <div>
                                                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Food Choices</p>
                                                <p className="text-sm font-medium text-gray-900">{foodSummary}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={() => handleDownloadTicket(booking.picture)} disabled={booking.status !== "CONFIRMED"} className="w-full bg-black hover:bg-zinc-800 text-white px-6 py-3 rounded-lg font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed">
                                        <MdDownload size={20} />
                                        {booking.status === "CONFIRMED" ? "Download Food & Accommodation Ticket" : "Failed"}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            );
        }
        return (
            <div className="text-center py-20">
                <div className="bg-gray-100 rounded-full w-28 h-28 mx-auto flex items-center justify-center mb-5 border-2 border-gray-200"><FaBed className="text-gray-700" size={40} /></div>
                <p className="text-gray-900 text-xl font-bold mb-2">No accommodation booked</p>
                <p className="text-gray-500 text-base">You can book your stay through the accommodation page.</p>
            </div>
        );
    };

    const renderActiveContent = () => {
        if (isLoading) return <div className="text-center py-20">Loading...</div>;
        if (error) return <div className="text-center py-20 text-red-600">Error: {error}</div>;

        switch (activeTab) {
            case "bookings": return renderBookingList(confirmedBookings);
            case "history": return renderBookingList(allBookings);
            case "pendingReferrals": return renderReferralsList(pendingReferrals, "pending");
            case "confirmedReferrals": return renderReferralsList(confirmedReferralsList, "confirmed");
            case "accommodation": return renderAccommodationList(accommodationBookings);
            default: return renderBookingList(confirmedBookings);
        }
    };

    return (
        <>
            <div className="min-h-screen bg-white py-4 sm:py-8 px-3 sm:px-6 lg:px-10">
                <div className="mt-15 max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 lg:gap-12">
                    {/* Left Section */}
                    <div className="w-full lg:w-[42%] xl:w-[38%]">
                        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] overflow-hidden border border-gray-200">
                            {/* --- MODIFICATION START --- */}
                            <div className="flex flex-col items-center p-6 sm:p-8">
                                <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-yellow-300 bg-yellow-100 flex items-center justify-center shadow-md mb-4">
                                    {currentUser.picture ? (
                                        <Image src={currentUser.picture} alt="user_pfp" fill className="object-cover" />
                                    ) : (
                                        <FaUser className="text-yellow-600" size={60} />
                                    )}
                                </div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 text-center">
                                    {currentUser.name}
                                </h1>
                                <p className="text-gray-500 text-sm font-mono mb-4 text-center">
                                    ID: {currentUser.tat_id}
                                </p>
                                <div className="flex justify-center gap-3 w-full max-w-sm">
                                    <button onClick={handleCopyReferral} className={`${copied ? "bg-yellow-400 text-black" : "bg-yellow-300 hover:bg-yellow-400 text-black"} flex-1 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2`}>
                                        {copied ? <><FaCheck size={14} /> Copied!</> : <><FaShare size={14} /> Refer</>}
                                    </button>
                                    <button onClick={() => { localStorage.removeItem("jwt"); router.push("/"); }} className="flex-1 bg-gray-200 hover:bg-gray-300 text-black px-5 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2">
                                        Logout
                                    </button>
                                </div>
                            </div>
                            {/* --- MODIFICATION END --- */}
                            <div className="p-5 sm:p-6 lg:p-7">
                                <h2 className="text-lg font-bold text-gray-900 mb-5">Personal Information</h2>
                                <div className="space-y-3">
                                    {fields.map((field) => (
                                        <div key={field.key} className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs text-gray-500 font-medium mb-1 uppercase tracking-wide">{field.label}</p>
                                                    {editingField === field.key ? (
                                                        <div className="flex items-center gap-2">
                                                            <input type="text" inputMode={field.key === "phone_number" ? "numeric" : "text"} pattern={field.key === "phone_number" ? "[0-9]*" : undefined} value={tempValue} onChange={(e) => setTempValue(e.target.value)} className="flex-1 text-base font-semibold text-gray-900 border-b-2 border-black focus:outline-none bg-transparent" autoFocus disabled={isSaving}/>
                                                            <button onClick={handleSaveEdit} disabled={isSaving} className="p-2 rounded-lg bg-green-500 text-white"><FaCheck size={14} /></button>
                                                            <button onClick={handleCancelEdit} disabled={isSaving} className="p-2 rounded-lg bg-gray-600 text-white"><span>✕</span></button>
                                                        </div>
                                                    ) : (
                                                        <p className="text-base font-semibold text-gray-900 truncate">
                                                            {field.key === "confReferral" ? confirmReferrals : field.key === "referredByName" ? currentUser.referredByName || "" : currentUser[field.key]}
                                                        </p>
                                                    )}
                                                </div>
                                                {field.editable && editingField !== field.key && (
                                                    <button onClick={() => handleEdit(field.key, currentUser[field.key])} className="ml-3 p-2 rounded-lg bg-gray-200 hover:bg-black hover:text-white text-gray-600 transition-all"><FaEdit size={16} /></button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="w-full lg:hidden mt-6 grid grid-cols-2 gap-3">
                                    <button onClick={() => handleOpenModal("bookings")} className="bg-black hover:bg-zinc-800 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"><MdEvent size={20} />My Bookings</button>
                                    <button onClick={() => handleOpenModal("history")} className="bg-gray-200 hover:bg-gray-300 text-black py-3 rounded-xl font-semibold flex items-center justify-center gap-2"><MdHistory size={20} />History</button>
                                    <button onClick={() => handleOpenModal("confirmedReferrals")} className="bg-gray-200 hover:bg-gray-300 text-black py-3 rounded-xl font-semibold flex items-center justify-center gap-2"><MdCheckCircle size={20} />Confirmed</button>
                                    <button onClick={() => handleOpenModal("pendingReferrals")} className="bg-gray-200 hover:bg-gray-300 text-black py-3 rounded-xl font-semibold flex items-center justify-center gap-2"><MdPending size={20} />Pending</button>
                                    <button onClick={() => handleOpenModal("accommodation")} className="bg-gray-200 hover:bg-gray-300 text-black col-span-2 py-3 rounded-xl font-semibold flex items-center justify-center gap-2"><FaBed size={20} />Accommodation</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="hidden lg:flex flex-col w-full lg:w-[58%] xl:w-[62%]">
                        <div className="w-full bg-white rounded-t-2xl border border-b-0 border-gray-200 p-6">
                            <h2 className="text-2xl font-bold text-gray-900">
                                {activeTab === "bookings" ? "My Bookings" :
                                    activeTab === "history" ? "Booking History" :
                                        activeTab === "pendingReferrals" ? "Pending Referrals" :
                                            activeTab === "accommodation" ? "My Accommodation" :
                                                "Confirmed Referrals"}
                            </h2>
                            <p className="text-gray-500 text-sm mt-1">
                                {activeTab === "bookings" ? confirmedBookings.length :
                                    activeTab === "history" ? allBookings.length :
                                        activeTab === "pendingReferrals" ? pendingReferrals.length :
                                            activeTab === "accommodation" ? accommodationBookings.length :
                                                confirmedReferralsList.length}{" "}
                                {activeTab.includes("Referrals") ? "referral(s)" : "booking(s)"} Total
                            </p>
                        </div>
                        <div className="flex border-b border-gray-200 px-6 bg-white">
                            {["My Bookings", "History", "Confirmed Referrals", "Pending Referrals", "Accommodation"].map(tab => {
                                const tabKey = tab.replace(" ", "").charAt(0).toLowerCase() + tab.slice(1).replace(" ", "");
                                return (
                                    <button
                                        key={tabKey}
                                        onClick={() => setActiveTab(tabKey === "myBookings" ? "bookings" : tabKey)}
                                        className={`py-3 px-1 mr-6 text-sm font-semibold transition-all whitespace-nowrap ${
                                            (activeTab === tabKey || (activeTab === 'bookings' && tabKey === 'myBookings'))
                                                ? "text-yellow-500 border-b-2 border-yellow-500"
                                                : "text-gray-500 hover:text-black"
                                        }`}
                                    >
                                        {tab}
                                    </button>
                                );
                            })}
                        </div>
                        <div className="flex-1 bg-gray-50 rounded-b-2xl p-6 border border-t-0 border-gray-200 overflow-y-auto max-h-[70vh]">
                            {renderActiveContent()}
                        </div>
                    </div>
                    {/* --- MODIFICATION END --- */}

                </div>
            </div>

            <EditModal isOpen={modalOpen} onClose={() => setModalOpen(false)} field={editField} currentValue={currentUser[editField]} userId={currentUser.id} onSuccess={() => window.location.reload()} />
            <EventsModal isOpen={eventsModalOpen} onClose={() => setEventsModalOpen(false)} activeView={activeTab} setActiveView={setActiveTab} confirmedBookings={confirmedBookings} allBookings={allBookings} referrals={referrals} pendingReferrals={pendingReferrals} confirmedReferralsList={confirmedReferralsList} confirmReferrals={confirmReferrals} accommodationBookings={accommodationBookings} />

            <style jsx>{`
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </>
    );
}