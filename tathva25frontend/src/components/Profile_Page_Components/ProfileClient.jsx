"use client";

import {useState, useEffect, useRef} from "react";
import Image from "next/image";
import Link from "next/link";
import { FaEdit, FaShare, FaCheck, FaUser, FaUsers, FaBed } from "react-icons/fa";
import { Plus_Jakarta_Sans } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: "400" })

import {
    MdEvent,
    MdDateRange,
    MdAccessTime,
    MdDownload,
    MdHistory,
    MdPending,
    MdCheckCircle,
    MdInfoOutline,
    MdArrowBack,
    MdExpandMore
} from "react-icons/md";
import EditModal from "./EditModal";
import { useRouter } from "next/navigation";
import axios from "axios";
import jwtRequired from "@/axios/jwtRequired";

export default function ProfileClient({ user }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [editField, setEditField] = useState("name");
    const [currentUser, setCurrentUser] = useState(user);
    const [copied, setCopied] = useState(false);
    const [allBookings, setAllBookings] = useState([]);
    const [confirmedBookings, setConfirmedBookings] = useState([]);
    const [accommodationBookings, setAccommodationBookings] = useState([]);
    const [activeTab, setActiveTab] = useState("bookings");
    const [confirmReferrals, setConfirmReferrals] = useState(0);
    const [pendingReferrals, setPendingReferrals] = useState([]);
    const [confirmedReferralsList, setConfirmedReferralsList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingField, setEditingField] = useState(null);
    const [tempValue, setTempValue] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [isMobileNavSticky, setIsMobileNavSticky] = useState(false);
    const [openMobileSection, setOpenMobileSection] = useState('info');
    const navRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (navRef.current) {
                const { top } = navRef.current.getBoundingClientRect();
                setIsMobileNavSticky(top <= 0);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const fetchBookingsAndReferrals = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const token = localStorage.getItem("jwt");
                if (!token) throw new Error("Authentication token not found.");
                const bookingsResp = await axios.get("https://api.tathva.org/api/booking/getbooking", { headers: { Authorization: `Bearer ${token}` } });
                const fetchedBookings = bookingsResp.data.bookings || [];
                setAllBookings(fetchedBookings.filter((booking) => booking.status !== "TIMEOUT"));
                setConfirmedBookings(fetchedBookings.filter((booking) => booking.status === "CONFIRMED"));
                try {
                    const refResp = await axios.get("https://api.tathva.org/api/referrals/", { headers: { Authorization: `Bearer ${token}` } });
                    const refData = refResp.data || {};
                    const allReferrals = refData.referrals || [];
                    const pending = allReferrals.filter((ref) => ref.status === "PENDING");
                    const confirmed = allReferrals.filter((ref) => ref.status === "CONFIRMED" || ref.status === "COMPLETED");
                    setPendingReferrals(pending);
                    setConfirmedReferralsList(confirmed);
                    setConfirmReferrals(typeof refData.confirmReferrals === "number" ? refData.confirmReferrals : confirmed.length);
                    try {
                        const accomResp = await jwtRequired.get("https://api.tathva.org/api/accomodation/");
                        setAccommodationBookings((accomResp.data.roomBookings || []).filter((booking) => booking.status === "CONFIRMED"));
                    } catch (accomErr) { console.error("Failed to fetch accommodation:", accomErr); }
                } catch (refErr) { console.error("Failed to fetch referrals:", refErr); }
            } catch (err) {
                const message = err?.response?.data?.message || err.message || "Failed to fetch";
                setError(message);
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBookingsAndReferrals();
    }, []);

    const router = useRouter();

    const handleEdit = (field, currentValue) => {
        setEditingField(field);
        setTempValue(currentValue || "");
    };

    const handleCancelEdit = () => {
        setEditingField(null);
        setTempValue("");
    };

    const handleSaveEdit = async () => {
        if (!tempValue.trim()) return alert("Field cannot be empty");
        let value = tempValue.trim();
        if (editingField === "phone_number") {
            const digitsOnly = value.replace(/\D/g, "");
            if (digitsOnly.length !== 10) return alert("Phone number must be exactly 10 digits.");
            value = digitsOnly;
        }
        setIsSaving(true);
        try {
            const token = localStorage.getItem("jwt");
            if (!token) throw new Error("Authentication token not found.");
            const fieldMapping = { phone_number: "phone", college: "college", district: "district", referredByName: "referredById" };
            const apiFieldKey = fieldMapping[editingField] || editingField;
            await axios.put(`https://api.tathva.org/api/users/`, { [apiFieldKey]: value }, { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } });
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
        if (ticketUrl) window.open(ticketUrl, "_blank", "noopener,noreferrer");
        else alert("Ticket URL not available.");
    };

    const getStatusBadge = (status, context = "default") => {
        const base = "text-xs font-bold uppercase px-2 py-1 rounded-full";
        switch (status) {
            case "CONFIRMED": case "COMPLETED": return <span className={`${base} bg-green-200 text-green-800`}>CONFIRMED</span>;
            case "PENDING": return context === "booking" ? <span className={`${base} bg-gray-200 text-gray-800`}>FAILED</span> : <span className={`${base} bg-yellow-200 text-yellow-800`}>PENDING</span>;
            default: return <span className={`${base} bg-gray-200 text-gray-800`}>{status}</span>;
        }
    };

    const handleCopyReferral = async () => {
        try {
            await navigator.clipboard.writeText(currentUser.tat_id);
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
        { key: "referredByName", label: "Referred By", editable: !currentUser.referredByName || currentUser.referredByName.trim() === "" },
    ];

    const renderBookingList = (bookingsToRender) => {
        if (!bookingsToRender || bookingsToRender.length === 0) return <div className="text-center py-10"><div className="bg-yellow-100 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-4"><MdEvent className="text-yellow-600" size={36} /></div><p className="text-gray-800 text-lg font-semibold mb-2">{activeTab === "bookings" ? "No confirmed events yet" : "No booking history"}</p><p className="text-gray-500 text-sm max-w-xs mx-auto">Start exploring and register for exciting events!</p></div>;
        return <div className="space-y-5">{bookingsToRender.map((booking) => { const dt = new Date(booking.event?.datetime); const d = dt.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }); const t = dt.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }); return <div key={booking.bookingUid} className="bg-white rounded-xl overflow-hidden hover:-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-200"><div className="flex flex-col lg:flex-row"><div className="relative w-full lg:w-48 h-32 lg:h-auto flex-shrink-0 group overflow-hidden bg-gray-100"><Image src={booking.event?.picture || "/placeholder.jpg"} alt={booking.event?.heading} fill className="object-cover group-hover:scale-110 transition-transform duration-500" /><div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40"></div></div><div className="flex-1 p-4"><h3 className="text-lg font-bold text-gray-900 mb-2 tracking-tight flex items-center gap-2">{booking.event?.heading} {getStatusBadge(booking?.status, "booking")}</h3><p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">{booking.event?.description}</p><div className="flex items-center gap-4 text-gray-700 text-sm mb-4"><div className="flex items-center gap-1"><MdDateRange size={16} className="text-yellow-500" /><span>{d}</span></div><div className="flex items-center gap-1"><MdAccessTime size={16} className="text-yellow-500" /><span>{t}</span></div></div><button onClick={() => handleDownloadTicket(booking.picture)} disabled={booking.status !== "CONFIRMED"} className="text-sm bg-black hover:bg-zinc-800 text-white px-4 py-2 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"><MdDownload size={16} />{booking.status === "CONFIRMED" ? "Download Ticket" : "Failed"}</button></div></div></div>; })}</div>;
    };
    const renderReferralsList = (referralsToRender, type) => {
        if (!referralsToRender || referralsToRender.length === 0) return <div className="text-center py-10 flex flex-col items-center justify-center h-full"><div className="bg-yellow-100 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-4"><FaUsers className="text-yellow-600" size={36} /></div><p className="text-gray-800 text-lg font-semibold mb-2">{type === "confirmed" ? "No confirmed referrals yet" : "No pending referrals"}</p><p className="text-gray-500 text-sm max-w-xs mx-auto">Share your referral code with friends to earn rewards!</p></div>;
        return <div className="space-y-5">{referralsToRender.map((referral, index) => <div key={index} className="bg-white rounded-xl overflow-hidden hover:-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-200"><div className="p-4"><div className="flex items-center justify-between mb-3"><h3 className="text-lg font-bold text-gray-900 tracking-tight flex items-center gap-2"><FaUser className="text-yellow-500" />{referral.referredUser.name}</h3>{getStatusBadge(referral.status, "referral")}</div><div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm"><div className="flex items-center gap-2 text-gray-700"><MdInfoOutline className="text-yellow-500" size={16}/><p className="font-medium truncate">{referral.referredUser.email}</p></div><div className="flex items-center gap-2 text-gray-700"><MdInfoOutline className="text-yellow-500" size={16}/><p className="font-medium">{referral.referredUser.referral}</p></div></div></div></div>)}</div>;
    };
    const renderAccommodationList = (bookingsToRender) => {
        if (!bookingsToRender || bookingsToRender.length === 0) return <div className="text-center py-10"><div className="bg-yellow-100 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-4"><FaBed className="text-yellow-600" size={36} /></div><p className="text-gray-800 text-lg font-semibold mb-2">No accommodation booked</p><p className="text-gray-500 text-sm max-w-xs mx-auto">You can book your stay through the accommodation page.</p></div>;
        return <div className="space-y-5">{bookingsToRender.map((booking) => { const f = (d) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }); const s = [booking.foodDay24Veg > 0 && `24th (Veg: ${booking.foodDay24Veg})`, booking.foodDay24NonVeg > 0 && `24th (Non-Veg: ${booking.foodDay24NonVeg})`, booking.foodDay25Veg > 0 && `25th (Veg: ${booking.foodDay25Veg})`, booking.foodDay25NonVeg > 0 && `25th (Non-Veg: ${booking.foodDay25NonVeg})`, booking.foodDay26Veg > 0 && `26th (Veg: ${booking.foodDay26Veg})`, booking.foodDay26NonVeg > 0 && `26th (Non-Veg: ${booking.foodDay26NonVeg})`].filter(Boolean).join(", ") || "No food selected"; return <div key={booking.bookingUid} className="bg-white rounded-xl overflow-hidden hover:-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-200"><div className="p-4"><div className="flex items-start justify-between mb-3"><h3 className="text-lg font-bold text-gray-900 tracking-tight">Accommodation at {booking.room === "DORMG" ? "Dormitory (Girls)" : booking.room === "DORMB" ? "Dormitory (Boys) " : booking.room === "ROOM3" ? "3 Shared Room (Girls)" : "4 Shared Room (Boys)"}</h3>{getStatusBadge(booking.status, "booking")}</div><div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm mb-4"><div className="flex items-center gap-2 text-gray-700"><MdDateRange className="text-yellow-500" size={16} /><span>Check-in: {f(booking.startDate)}</span></div><div className="flex items-center gap-2 text-gray-700"><MdDateRange className="text-yellow-500" size={16} /><span>Check-out: {f(booking.endDate)}</span></div><div className="flex items-center gap-2 text-gray-700"><FaUser className="text-yellow-500" size={16} /><span className="capitalize">{booking.gender.toLowerCase()}</span></div><div className="flex items-center gap-2 text-gray-700"><MdEvent className="text-yellow-500" size={16} /><span className="text-sm line-clamp-1">{s}</span></div></div><button onClick={() => handleDownloadTicket(booking.picture)} disabled={booking.status !== "CONFIRMED"} className="text-sm w-full bg-black hover:bg-zinc-800 text-white px-4 py-2 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"><MdDownload size={16} />{booking.status === "CONFIRMED" ? "Download Ticket" : "Failed"}</button></div></div>; })}</div>;
    };
    const renderPersonalInfo = () => <div className="space-y-4">{fields.map((field) => <div key={field.key} className="bg-gray-50 border border-gray-200 rounded-xl p-4"><div className="flex items-center justify-between"><div className="flex-1 min-w-0"><p className="text-xs text-gray-500 font-medium mb-1 uppercase tracking-wide">{field.label}</p>{editingField === field.key ? <div className="flex items-center gap-2"><input type="text" inputMode={field.key === "phone_number" ? "numeric" : "text"} pattern={field.key === "phone_number" ? "[0-9]*" : undefined} value={tempValue} onChange={(e) => setTempValue(e.target.value)} className="flex-1 text-base font-semibold text-gray-900 border-b-2 border-yellow-500 focus:outline-none bg-transparent" autoFocus disabled={isSaving}/><button onClick={handleSaveEdit} disabled={isSaving} className="p-2 rounded-lg bg-green-500 text-white"><FaCheck size={14} /></button><button onClick={handleCancelEdit} disabled={isSaving} className="p-2 rounded-lg bg-gray-600 text-white"><span>✕</span></button></div> : <p className="text-base font-semibold text-gray-900 truncate">{field.key === "referredByName" ? currentUser.referredByName || "" : currentUser[field.key]}</p>}</div>{field.editable && editingField !== field.key && <button onClick={() => handleEdit(field.key, currentUser[field.key])} className="ml-3 p-2 rounded-lg bg-gray-200 hover:bg-yellow-500 hover:text-black text-gray-600 transition-all"><FaEdit size={16} /></button>}</div></div>)}</div>;
    const renderActions = () => <div className="space-y-4"><button onClick={handleCopyReferral} className={`w-full ${copied ? "bg-green-500" : "bg-yellow-500 hover:bg-yellow-600"} text-black py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all duration-300 -lg`}>{copied ? <><FaCheck size={16} /> Copied!</> : <><FaShare size={16} /> Refer a Friend</>}</button><button onClick={() => { localStorage.removeItem("jwt"); router.push("/"); }} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold transition-colors duration-200 py-3 rounded-lg flex items-center justify-center gap-2">Logout</button></div>;

    const renderActiveContent = () => {
        if (isLoading) return <div className="text-center py-20">Loading...</div>;
        if (error) return <div className="text-center py-20 text-red-600">Error: {error}</div>;

        switch (activeTab) {
            case "bookings": return renderBookingList(confirmedBookings);
            case "history": return renderBookingList(allBookings);
            case "referrals": return renderReferralsList(confirmedReferralsList, "confirmed");
            case "pendingReferrals": return renderReferralsList(pendingReferrals, "pending");
            case "accommodation": return renderAccommodationList(accommodationBookings);
            case "personalInfo":
                return (
                    <div className="flex flex-col gap-8">
                        {/* --- MODIFICATION: Added `hidden md:block` --- */}
                        {/* This now hides the Actions on mobile, shows them on tablet, and hides them again on desktop */}
                        <div className="hidden md:block xl:hidden">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Actions</h2>
                            {renderActions()}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Personal Information</h2>
                            {renderPersonalInfo()}
                        </div>
                    </div>
                );
            default: return renderBookingList(confirmedBookings);
        }
    };
    const getTabTitle = () => ({ bookings: "My Bookings", history: "Booking History", referrals: "Confirmed Referrals", pendingReferrals: "Pending Referrals", accommodation: "My Accommodation", personalInfo: "My Info" }[activeTab] || "Dashboard");
    const getTabCount = () => {
        switch (activeTab) {
            case "bookings": return confirmedBookings.length;
            case "history": return allBookings.length;
            case "referrals": return confirmedReferralsList.length;
            case "pendingReferrals": return pendingReferrals.length;
            case "accommodation": return accommodationBookings.length;
            // --- MODIFICATION: Return null to hide the count ---
            case "personalInfo": return null;
            default: return 0;
        }
    };
    return (
        <>
            {/* ======================================================================================= */}
            {/* 1. DESKTOP LAYOUT (xl screens and up) */}
            {/* ======================================================================================= */}
            <div className={` ${jakarta.className} min-h-screen bg-gray-100 p-8 hidden xl:flex flex-col gap-8 font-sans   `}>
                <div className="flex-1 flex gap-8">
                    <div className="w-84 flex flex-col gap-8 flex-shrink-0">
                        <aside className="bg-black text-white p-6 flex flex-col -2xl rounded-2xl">
                            <div>
                                <div className="flex flex-col items-center mb-10">
                                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-yellow-500 bg-gray-800 flex items-center justify-center mb-3"><Image src={currentUser.picture} alt="user_pfp" fill className="object-cover" /></div>
                                    <h3 className="text-xl font-semibold text-white mb-1">{currentUser.name}</h3>
                                    <p className="text-gray-400 text-sm font-mono">{currentUser.tat_id}</p>
                                </div>
                                <nav className="space-y-4">
                                    {[{ key: "bookings", label: "My Bookings", icon: MdEvent }, { key: "history", label: "Booking History", icon: MdHistory }, { key: "referrals", label: "Referrals", icon: FaUsers }, { key: "accommodation", label: "Accommodation", icon: FaBed }].map((item) => <button key={item.key} onClick={() => setActiveTab(item.key)} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left transition-all duration-200 ${activeTab === item.key ? "bg-yellow-500 text-black font-bold -md" : "text-gray-300 hover:bg-gray-800 hover:text-white"}`}><item.icon size={20} className={activeTab === item.key ? "text-black" : "text-yellow-500"} />{item.label}</button>)}
                                </nav>
                            </div>
                        </aside>
                        <div className="bg-white p-6 rounded-2xl -lg border border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Overview</h2>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 flex flex-col items-center justify-center"><FaUsers className="text-yellow-500 mb-3" size={32}/><p className="text-3xl font-bold text-gray-900">{confirmReferrals}</p><p className="text-sm text-gray-500 mt-1">Confirmed Referrals</p></div>
                                {confirmedBookings.length > 0 && <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 flex flex-col items-center justify-center"><MdEvent className="text-yellow-500 mb-3" size={32}/><p className="text-3xl font-bold text-gray-900">{confirmedBookings.length}</p><p className="text-sm text-gray-500 mt-1">Confirmed Bookings</p></div>}
                            </div>
                        </div>
                    </div>
                    <main className="flex-1 flex flex-col bg-white rounded-2xl -lg overflow-hidden border border-gray-200 min-w-[450px]">
                        <div className="p-8 pb-0 border-b border-gray-200"><h2 className="text-3xl font-extrabold text-gray-900 mb-2">{getTabTitle()}</h2>{/* --- MODIFICATION: Conditional rendering for subtitle --- */}
                            {getTabCount() !== null && (
                                <p className="text-gray-600 text-md">{getTabCount()} item(s) found</p>
                            )}

                            {/* ... rest of the main content header ... */}
                            {(activeTab === "referrals" || activeTab === "pendingReferrals") && <div className="flex mt-6 space-x-6"><button onClick={() => setActiveTab("referrals")} className={`py-3 px-1 text-sm font-semibold transition-all duration-200 ${activeTab === "referrals" ? "text-yellow-500 border-b-2 border-yellow-500" : "text-gray-500 hover:text-black"}`}>Confirmed</button><button onClick={() => setActiveTab("pendingReferrals")} className={`py-3 px-1 text-sm font-semibold transition-all duration-200 ${activeTab === "pendingReferrals" ? "text-yellow-500 border-b-2 border-yellow-500" : "text-gray-500 hover:text-black"}`}>Pending</button></div>}
                        </div>
                        <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">{renderActiveContent()}</div>
                    </main>
                    <aside className="w-96 flex flex-col gap-8 flex-shrink-0 overflow-hidden">
                        <div className="bg-white p-6 rounded-2xl -lg border border-gray-200"><h2 className="text-xl font-bold text-gray-900 mb-6">Actions</h2>{renderActions()}</div>
                        <div className="bg-white p-6 rounded-2xl -lg border border-gray-200"><h2 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h2>{renderPersonalInfo()}</div>
                    </aside>
                </div>
            </div>

            {/* ======================================================================================= */}
            {/* 2. TABLET LAYOUT (md to xl screens) */}
            {/* ======================================================================================= */}
            <div className="min-h-screen bg-gray-100 p-8 hidden md:flex xl:hidden flex-col gap-8 font-sans">
                <div className="flex-1 flex gap-8">
                    <div className="w-72 flex flex-col gap-8 flex-shrink-0">
                        <aside className="bg-black text-white p-6 flex flex-col -2xl rounded-2xl">
                            <div>
                                <div className="mb-10 text-3xl font-extrabold text-yellow-500 tracking-wider">TATHVA</div>
                                <div className="flex flex-col items-center mb-10"><div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-yellow-500 bg-gray-800 flex items-center justify-center mb-3"><Image src={currentUser.picture} alt="user_pfp" fill className="object-cover" /></div><h3 className="text-xl font-semibold text-white mb-1">{currentUser.name}</h3><p className="text-gray-400 text-sm font-mono">{currentUser.tat_id}</p></div>
                                <nav className="space-y-4">
                                    {[{ key: "bookings", label: "My Bookings", icon: MdEvent }, { key: "history", label: "Booking History", icon: MdHistory }, { key: "referrals", label: "Referrals", icon: FaUsers }, { key: "accommodation", label: "Accommodation", icon: FaBed }, {key: "personalInfo", label: "My Info", icon: MdInfoOutline}].map((item) => <button key={item.key} onClick={() => setActiveTab(item.key)} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left transition-all duration-200 ${activeTab === item.key ? "bg-yellow-500 text-black font-bold -md" : "text-gray-300 hover:bg-gray-800 hover:text-white"}`}><item.icon size={20} className={activeTab === item.key ? "text-black" : "text-yellow-500"} />{item.label}</button>)}
                                </nav>
                            </div>
                        </aside>
                        <div className="bg-white p-6 rounded-2xl -lg border border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Overview</h2>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 flex flex-col items-center justify-center"><FaUsers className="text-yellow-500 mb-3" size={32}/><p className="text-3xl font-bold text-gray-900">{confirmReferrals}</p><p className="text-sm text-gray-500 mt-1">Confirmed Referrals</p></div>
                                {confirmedBookings.length > 0 && <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 flex flex-col items-center justify-center"><MdEvent className="text-yellow-500 mb-3" size={32}/><p className="text-3xl font-bold text-gray-900">{confirmedBookings.length}</p><p className="text-sm text-gray-500 mt-1">Confirmed Bookings</p></div>}
                            </div>
                        </div>
                    </div>
                    <main className="flex-1 flex flex-col bg-white rounded-2xl -lg overflow-hidden border border-gray-200 min-w-[400px]">
                        <div className="p-8 pb-0 border-b border-gray-200">
                            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">{getTabTitle()}</h2>
                            {/* --- MODIFICATION: Conditional rendering for subtitle --- */}
                            {getTabCount() !== null && (
                                <p className="text-gray-600 text-md">{getTabCount()} item(s) found</p>
                            )}
                            {(activeTab === "referrals" || activeTab === "pendingReferrals") && <div className="flex mt-6 space-x-6"><button onClick={() => setActiveTab("referrals")} className={`py-3 px-1 text-sm font-semibold transition-all duration-200 ${activeTab === "referrals" ? "text-yellow-500 border-b-2 border-yellow-500" : "text-gray-500 hover:text-black"}`}>Confirmed</button><button onClick={() => setActiveTab("pendingReferrals")} className={`py-3 px-1 text-sm font-semibold transition-all duration-200 ${activeTab === "pendingReferrals" ? "text-yellow-500 border-b-2 border-yellow-500" : "text-gray-500 hover:text-black"}`}>Pending</button></div>}
                        </div>
                        <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">{renderActiveContent()}</div>
                    </main>
                </div>
            </div>

            {/* ======================================================================================= */}
            {/* 3. MOBILE LAYOUT (screens smaller than md) */}
            {/* ======================================================================================= */}
            <div className="md:hidden min-h-screen bg-gray-100 font-sans">
                <div className="bg-black text-white p-6 -lg">
                    <div className="flex items-center gap-4"><div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-yellow-500 bg-gray-800 flex-shrink-0"><Image src={currentUser.picture} alt="user_pfp" fill className="object-cover" /></div><div><h1 className="text-xl font-bold text-white">{currentUser.name}</h1><p className="text-sm font-mono text-gray-400">{currentUser.tat_id}</p></div></div>
                    <div className="flex gap-3 mt-4"><button onClick={handleCopyReferral} className={`flex-1 ${copied ? "bg-green-500" : "bg-yellow-500 hover:bg-yellow-600"} text-black py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all`}>{copied ? <><FaCheck size={14} /> Copied!</> : <><FaShare size={14} /> Refer</>}</button><button onClick={() => { localStorage.removeItem("jwt"); router.push("/"); }} className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all">Logout</button></div>
                </div>
                <nav ref={navRef} className={`sticky top-0 z-20 bg-white -md ${isMobileNavSticky ? '-lg' : ''}`}>
                    <div className="flex justify-around border-b border-gray-200">
                        {[{ key: "bookings", label: "Bookings", icon: MdEvent }, { key: "referrals", label: "Referrals", icon: FaUsers }, { key: "accommodation", label: "Stay", icon: FaBed }, { key: "info", label: "My Info", icon: MdInfoOutline }].map(item => <button key={item.key} onClick={() => setActiveTab(item.key)} className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs font-semibold transition-colors ${activeTab === item.key ? 'text-yellow-600 border-b-2 border-yellow-600' : 'text-gray-500'}`}><item.icon size={20} /><span>{item.label}</span></button>)}
                    </div>
                </nav>
                <div className="p-4">
                    {/* --- MODIFICATION: Conditional rendering for subtitle --- */}
                    {activeTab !== 'info' && (
                        <div className="mb-4">
                            <h2 className="text-2xl font-bold text-gray-900">{getTabTitle()}</h2>
                            {getTabCount() !== null && (
                                <p className="text-sm text-gray-500">{getTabCount()} item(s) found</p>
                            )}
                        </div>
                    )}
                    {activeTab !== 'info' && renderActiveContent()}
                    {activeTab === 'info' && <div className="space-y-4">
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                            <button onClick={() => setOpenMobileSection(openMobileSection === 'info' ? null : 'info')} className="w-full flex justify-between items-center p-4 text-left"><h2 className="font-bold text-gray-900">Personal Information</h2><MdExpandMore className={`transform transition-transform duration-300 ${openMobileSection === 'info' ? 'rotate-180' : ''}`} size={24} /></button>
                            {openMobileSection === 'info' && <div className="p-4 border-t border-gray-200">{renderPersonalInfo()}</div>}
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                            <button onClick={() => setOpenMobileSection(openMobileSection === 'overview' ? null : 'overview')} className="w-full flex justify-between items-center p-4 text-left"><h2 className="font-bold text-gray-900">Quick Overview</h2><MdExpandMore className={`transform transition-transform duration-300 ${openMobileSection === 'overview' ? 'rotate-180' : ''}`} size={24} /></button>
                            {openMobileSection === 'overview' && <div className="p-4 border-t border-gray-200 space-y-4">
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex items-center gap-4"><FaUsers className="text-yellow-500" size={24}/><div><p className="text-2xl font-bold text-gray-900">{confirmReferrals}</p><p className="text-sm text-gray-500">Confirmed Referrals</p></div></div>
                                {confirmedBookings.length > 0 && <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex items-center gap-4"><MdEvent className="text-yellow-500" size={24}/><div><p className="text-2xl font-bold text-gray-900">{confirmedBookings.length}</p><p className="text-sm text-gray-500">Confirmed Bookings</p></div></div>}
                            </div>}
                        </div>
                    </div>}
                </div>
            </div>

            <EditModal isOpen={modalOpen} onClose={() => setModalOpen(false)} field={editField} currentValue={currentUser[editField]} userId={currentUser.id} onSuccess={() => window.location.reload()} />
            <style jsx>{`

                .custom-scrollbar::-webkit-scrollbar {

                    width: 8px;

                }

                .custom-scrollbar::-webkit-scrollbar-track {

                    background: #f1f1f1;

                    border-radius: 10px;

                }

                .custom-scrollbar::-webkit-scrollbar-thumb {

                    background: #888;

                    border-radius: 10px;

                }

                .custom-scrollbar::-webkit-scrollbar-thumb:hover {

                    background: #555;

                }

            `}</style>
        </>
    );
}

