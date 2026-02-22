"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Send, Loader2, CheckCircle, X, Heart, AlertCircle, ChevronDown, User, MessageCircle } from "lucide-react";
import Link from "next/link";
import { searchGuests, submitRSVP, checkRSVPStatus } from "@/app/actions";
import { SilverCard } from "@/components/ui/SilverCard";
import { ConfirmationModal } from "./ConfirmationModal";

type Guest = { id: string; name: string; maxGuests: number; role: string; rsvpSubmitted: boolean };

export function RSVPSection() {
    // Search state
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [searchResults, setSearchResults] = useState<Guest[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [foundGuest, setFoundGuest] = useState<Guest | null>(null);
    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        guests: "1",
        attending: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    // Modal state
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [lastSubmittedData, setLastSubmittedData] = useState<any>(null);

    // Status check state
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [statusEmail, setStatusEmail] = useState("");
    const [isCheckingStatus, setIsCheckingStatus] = useState(false);
    const [statusResult, setStatusResult] = useState<any>(null);
    const [statusError, setStatusError] = useState<string | null>(null);
    const [showAnsweredModal, setShowAnsweredModal] = useState(false);
    const [answeredGuest, setAnsweredGuest] = useState<Guest | null>(null);

    // Handle outside click to close dropdown
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Realtime search effect
    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            setShowDropdown(false);
            return;
        }

        // Debounce search
        if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

        setIsSearching(true);
        searchTimeoutRef.current = setTimeout(async () => {
            try {
                const result = await searchGuests(searchQuery);
                if (result.success && result.guests) {
                    setSearchResults(result.guests);
                    setShowDropdown(true);
                }
            } catch (error) {
                console.error("Search failed", error);
            } finally {
                setIsSearching(false);
            }
        }, 300);

        return () => {
            if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
        };
    }, [searchQuery]);

    const handleSelectGuest = (guest: Guest) => {
        if (guest.rsvpSubmitted) {
            setAnsweredGuest(guest);
            setShowAnsweredModal(true);
            setSearchQuery("");
            setShowDropdown(false);
            return;
        }

        setFoundGuest(guest);
        setFormData(prev => ({
            ...prev,
            name: guest.name,
            guests: "1",
        }));
        setSearchQuery("");
        setShowDropdown(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const data = new FormData();
            data.append("fullName", formData.name);
            data.append("email", formData.email);
            data.append("guestCount", formData.guests);
            data.append("attending", formData.attending);

            const result = await submitRSVP(data);

            if (result.success) {
                setLastSubmittedData({ ...formData });

                if (formData.attending === "yes") {
                    setShowConfetti(true);
                    setTimeout(() => setShowConfetti(false), 4000);
                }
                setShowConfirmModal(true);
                setFoundGuest(null);
                setSearchQuery("");
                setFormData({
                    name: "",
                    email: "",
                    guests: "1",
                    attending: "",
                });
            } else {
                setSubmitError(result.message);
            }
        } catch (error) {
            setSubmitError("An unexpected error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCheckStatus = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsCheckingStatus(true);
        setStatusResult(null);
        setStatusError(null);

        try {
            const result = await checkRSVPStatus(statusEmail);
            if (result.success && result.data) {
                setStatusResult(result.data);
            } else {
                setStatusError(result.error || "No RSVP found.");
            }
        } catch (error) {
            setStatusError("An error occurred. Please try again.");
        } finally {
            setIsCheckingStatus(false);
        }
    };

    const guestOptions = foundGuest
        ? Array.from({ length: foundGuest.maxGuests }, (_, i) => i + 1)
        : [1];

    return (
        <>
            {lastSubmittedData && (
                <ConfirmationModal
                    isOpen={showConfirmModal}
                    onClose={() => setShowConfirmModal(false)}
                    formData={lastSubmittedData}
                    showConfetti={showConfetti}
                />
            )}

            {/* Status Check Modal */}
            <AnimatePresence>
                {showStatusModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/80 backdrop-blur-sm"
                        onClick={() => setShowStatusModal(false)}
                    >
                        <SilverCard className="w-full max-w-md" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                            <button
                                onClick={() => setShowStatusModal(false)}
                                className="absolute top-4 right-4 text-silver-dark hover:text-burgundy transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <h3 className="text-burgundy text-2xl mb-6 text-center font-display">
                                Check Your RSVP
                            </h3>

                            {!statusResult ? (
                                <form onSubmit={handleCheckStatus} className="space-y-4">
                                    <div>
                                        <label className="block text-silver-dark text-xs tracking-[0.2em] uppercase mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            value={statusEmail}
                                            onChange={(e) => setStatusEmail(e.target.value)}
                                            placeholder="your.email@example.com"
                                            className="w-full bg-transparent border border-silver/30 rounded-lg py-3 px-4 text-charcoal focus:border-burgundy focus:outline-none transition-colors"
                                            required
                                        />
                                    </div>

                                    {statusError && (
                                        <div className="flex items-center gap-2 text-red-500 text-xs bg-red-50 p-3 rounded-lg border border-red-100">
                                            <AlertCircle size={14} />
                                            {statusError}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isCheckingStatus}
                                        className="w-full bg-burgundy text-white py-3 rounded-lg font-bold uppercase tracking-wider text-sm hover:bg-burgundy-dark transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {isCheckingStatus ? (
                                            <>
                                                <Loader2 className="animate-spin" size={16} />
                                                Checking...
                                            </>
                                        ) : (
                                            "Check Status"
                                        )}
                                    </button>
                                </form>
                            ) : (
                                <div className="text-center space-y-6">
                                    <div className="flex flex-col items-center gap-2">
                                        <CheckCircle className="text-green-600" size={48} />
                                        <h4 className="text-xl text-burgundy">
                                            Found your RSVP!
                                        </h4>
                                    </div>

                                    <div className="bg-silver-light/30 rounded-lg p-4 border border-silver/30 space-y-3 text-left">
                                        <div className="flex justify-between items-center">
                                            <span className="text-silver-dark text-sm">Name:</span>
                                            <span className="text-charcoal font-medium">{statusResult.name}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-silver-dark text-sm">Status:</span>
                                            <span className={`font-bold px-3 py-1 rounded text-xs uppercase ${statusResult.attending
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                                }`}>
                                                {statusResult.attending ? "✓ Attending" : "✗ Declined"}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-silver-dark text-sm">Guests:</span>
                                            <span className="text-charcoal font-medium">{statusResult.guestCount}</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => {
                                            setStatusResult(null);
                                            setStatusEmail("");
                                            setShowStatusModal(false);
                                        }}
                                        className="text-silver-dark text-xs hover:text-burgundy transition-colors"
                                    >
                                        Close
                                    </button>
                                </div>
                            )}
                        </SilverCard>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Already Answered Modal */}
            <AnimatePresence>
                {showAnsweredModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/80 backdrop-blur-sm"
                        onClick={() => setShowAnsweredModal(false)}
                    >
                        <SilverCard className="w-full max-w-md" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                            <button
                                onClick={() => setShowAnsweredModal(false)}
                                className="absolute top-4 right-4 text-silver-dark hover:text-burgundy transition-colors"
                                aria-label="Close already answered modal"
                            >
                                <X size={20} />
                            </button>

                            <div className="text-center space-y-4">
                                <CheckCircle className="mx-auto text-green-600" size={46} />
                                <h3 className="text-burgundy text-2xl font-display">Already Answered</h3>
                                <p className="text-charcoal text-sm leading-relaxed">
                                    {answeredGuest?.name} has already submitted an RSVP.
                                </p>
                                <p className="text-silver-dark text-sm">
                                    If you need help, you can send a message to the couple.
                                </p>

                                <div className="pt-2 flex flex-col gap-3">
                                    <Link
                                        href="/messages"
                                        className="w-full inline-flex items-center justify-center gap-2 bg-burgundy text-white py-3 rounded-lg font-bold uppercase tracking-wider text-xs hover:bg-burgundy-dark transition-colors"
                                    >
                                        <MessageCircle size={16} />
                                        Send Message to the Couple
                                    </Link>
                                    <button
                                        onClick={() => setShowAnsweredModal(false)}
                                        className="w-full text-silver-dark text-xs hover:text-burgundy transition-colors"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </SilverCard>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main RSVP Section */}
            <section
                id="rsvp"
                className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden"
            >
                {/* Background */}
                <div className="absolute inset-0 bg-off-white" />
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />

                <motion.div
                    className="relative z-10 w-full max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Header */}
                    <div className="text-center mb-12">
                        <p className="text-silver-dark text-xs tracking-[0.4em] uppercase mb-4" style={{ fontFamily: "var(--font-body)" }}>
                            Join Us
                        </p>
                        <h2 className="text-burgundy text-5xl md:text-6xl mb-6" style={{ fontFamily: "var(--font-display)" }}>
                            RSVP
                        </h2>
                        <div className="flex items-center justify-center gap-4 mb-8">
                            <div className="h-px w-16 bg-silver" />
                            <div className="w-2 h-2 bg-silver rotate-45" />
                            <div className="h-px w-16 bg-silver" />
                        </div>
                        <p className="text-charcoal text-lg mb-4">
                            Please confirm your attendance on or before April 15, 2026
                        </p>
                    </div>

                    {/* Search Box — burgundy card */}
                    {!foundGuest && (
                        <SilverCard className="mb-8 overflow-visible z-20 !bg-burgundy border-burgundy-light shadow-2xl">
                            <div className="space-y-4" ref={dropdownRef}>
                                <div className="text-center space-y-2">
                                    <label className="block text-white text-sm font-medium">
                                        Search for your name to RSVP
                                    </label>
                                    <p className="text-xs text-rose-200 italic">
                                        NOTE: Only searchable names are invited. Seats are limited only to confirmed guests. We hope to see you there!
                                    </p>
                                </div>

                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={20} />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Start typing your name..."
                                        className="w-full bg-white/10 border-2 border-silver/20 rounded-lg py-4 pl-12 pr-4 text-white placeholder:text-silver/40 focus:border-white/60 focus:outline-none transition-colors text-lg"
                                        autoComplete="off"
                                    />
                                    {isSearching && (
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                            <Loader2 className="animate-spin text-white" size={20} />
                                        </div>
                                    )}

                                    {/* Dropdown Results */}
                                    <AnimatePresence>
                                        {showDropdown && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-silver/20 max-h-60 overflow-y-auto z-50 py-2"
                                            >
                                                {searchResults.length > 0 ? (
                                                    searchResults.map((guest) => (
                                                        <button
                                                            key={guest.id}
                                                            onClick={() => handleSelectGuest(guest)}
                                                            className="w-full px-4 py-3 text-left hover:bg-burgundy/5 flex items-center justify-between transition-colors group"
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <User size={16} className="text-silver-dark group-hover:text-burgundy" />
                                                                <div>
                                                                    <span className="block font-medium text-charcoal group-hover:text-burgundy">
                                                                        {guest.name}
                                                                    </span>
                                                                    {guest.rsvpSubmitted && (
                                                                        <span className="text-[10px] text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                                                                            RSVP Submitted
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="text-xs text-silver-dark">
                                                                {guest.maxGuests} seat{guest.maxGuests > 1 ? "s" : ""}
                                                            </div>
                                                        </button>
                                                    ))
                                                ) : (
                                                    <div className="px-4 py-3 text-center text-silver-dark text-sm">
                                                        <p>Name not found?</p>
                                                        <a href="#" className="text-burgundy font-medium hover:underline block mt-1">
                                                            Contact the Couple
                                                        </a>
                                                    </div>
                                                )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </SilverCard>
                    )}

                    {/* Guest Found — burgundy RSVP Form */}
                    {foundGuest && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                        >
                            <SilverCard className="mb-6 !bg-burgundy border-burgundy-light shadow-2xl">
                                <div className="flex items-start justify-between mb-6">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <CheckCircle className="text-emerald-400" size={24} />
                                            <h3 className="text-white text-2xl font-display">
                                                Welcome, {foundGuest.name.split(" ")[0]}!
                                            </h3>
                                        </div>
                                        <p className="text-silver/80 text-sm">
                                            Role: {foundGuest.role}
                                        </p>
                                        <p className="text-silver/80 text-sm mt-1">
                                            Seats allocated: <span className="font-bold text-white">{foundGuest.maxGuests}</span>
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setFoundGuest(null);
                                            setSearchQuery("");
                                            setFormData({
                                                name: "",
                                                email: "",
                                                guests: "1",
                                                attending: "",
                                            });
                                        }}
                                        className="text-silver/60 hover:text-white transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Email */}
                                    <div>
                                        <label className="block text-silver/80 text-xs tracking-[0.2em] uppercase mb-2" style={{ fontFamily: "var(--font-body)" }}>
                                            Email Address <span className="text-white">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-white/10 border-2 border-silver/20 rounded-lg py-3 px-4 text-white placeholder:text-silver/40 focus:border-white/60 focus:outline-none transition-colors"
                                            placeholder="your.email@example.com"
                                        />
                                    </div>

                                    {/* Number of Guests */}
                                    <div>
                                        <label className="block text-silver/80 text-xs tracking-[0.2em] uppercase mb-2" style={{ fontFamily: "var(--font-body)" }}>
                                            Number of Guests
                                        </label>
                                        <select
                                            value={formData.guests}
                                            onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                                            className="w-full bg-white/10 border-2 border-silver/20 rounded-lg py-3 px-4 text-white focus:border-white/60 focus:outline-none transition-colors cursor-pointer [&>option]:text-charcoal"
                                        >
                                            {guestOptions.map((num) => (
                                                <option key={num} value={num.toString()}>
                                                    {num === 1 ? "1 Guest (Just me)" : `${num} Guests`}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Attendance */}
                                    <div>
                                        <label className="block text-silver/80 text-xs tracking-[0.2em] uppercase mb-4" style={{ fontFamily: "var(--font-body)" }}>
                                            Will You Attend? <span className="text-white">*</span>
                                        </label>
                                        <div className="grid grid-cols-2 gap-4">
                                            <label
                                                className={`flex items-center justify-center gap-2 p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.attending === "yes"
                                                    ? "border-emerald-400 bg-emerald-400/20"
                                                    : "border-silver/20 hover:border-silver/50"
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="attending"
                                                    value="yes"
                                                    checked={formData.attending === "yes"}
                                                    onChange={(e) => setFormData({ ...formData, attending: e.target.value })}
                                                    className="sr-only"
                                                    required
                                                />
                                                <Heart
                                                    className={formData.attending === "yes" ? "text-emerald-400" : "text-silver/40"}
                                                    size={20}
                                                    fill={formData.attending === "yes" ? "currentColor" : "none"}
                                                />
                                                <span className={`text-sm font-semibold ${formData.attending === "yes" ? "text-emerald-100" : "text-silver"}`}>
                                                    Yes, I&apos;ll attend
                                                </span>
                                            </label>

                                            <label
                                                className={`flex items-center justify-center gap-2 p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.attending === "no"
                                                    ? "border-rose-300 bg-rose-400/20"
                                                    : "border-silver/20 hover:border-silver/50"
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="attending"
                                                    value="no"
                                                    checked={formData.attending === "no"}
                                                    onChange={(e) => setFormData({ ...formData, attending: e.target.value })}
                                                    className="sr-only"
                                                />
                                                <X className={formData.attending === "no" ? "text-rose-300" : "text-silver/40"} size={20} />
                                                <span className={`text-sm font-semibold ${formData.attending === "no" ? "text-rose-100" : "text-silver"}`}>
                                                    Can&apos;t make it
                                                </span>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Error */}
                                    {submitError && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="bg-red-500/20 border border-red-400/50 rounded-lg p-3"
                                        >
                                            <p className="text-red-200 text-sm text-center">{submitError}</p>
                                        </motion.div>
                                    )}

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`w-full bg-white text-burgundy py-4 rounded-lg font-bold uppercase tracking-wider text-sm transition-all flex items-center justify-center gap-2 shadow-xl ${isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-silver hover:shadow-2xl"
                                            }`}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="animate-spin" size={18} />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send size={18} />
                                                Submit RSVP
                                            </>
                                        )}
                                    </button>
                                </form>
                            </SilverCard>
                        </motion.div>
                    )}

                    {/* Check Status Link */}
                    <div className="text-center">
                        <button
                            onClick={() => setShowStatusModal(true)}
                            className="text-silver-dark text-sm hover:text-burgundy transition-colors underline underline-offset-4"
                        >
                            Already responded? Check your status
                        </button>
                    </div>
                </motion.div>
            </section>
        </>
    );
}
