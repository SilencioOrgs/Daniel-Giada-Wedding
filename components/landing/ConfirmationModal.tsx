"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart, MapPin, Clock, MessageSquareHeart } from "lucide-react";
import { Confetti } from "@/components/ui/Confetti";
import Link from "next/link";

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    formData: {
        name: string;
        email: string;
        guests: string;
        attending: string;
        message: string;
    };
    showConfetti: boolean;
}

export function ConfirmationModal({ isOpen, onClose, formData, showConfetti }: ConfirmationModalProps) {
    if (!isOpen) return null;

    const isAttending = formData.attending === "yes";

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {showConfetti && <Confetti />}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[150] flex items-center justify-center p-6"
                        onClick={onClose}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ duration: 0.3 }}
                            className="bg-wedding-cream border border-wedding-red/30 rounded-xl p-8 md:p-12 max-w-lg w-full max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="text-center mb-8">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                >
                                    <Heart
                                        className={`mx-auto mb-4 ${isAttending ? "text-burgundy" : "text-silver-dark"}`}
                                        size={48}
                                        fill="currentColor"
                                    />
                                </motion.div>
                                <h3
                                    className="text-burgundy text-3xl md:text-4xl mb-2"
                                    style={{ fontFamily: "var(--font-display)" }}
                                >
                                    {isAttending ? "See You There!" : "We'll Miss You!"}
                                </h3>
                                <p
                                    className="text-silver-dark text-sm"
                                    style={{ fontFamily: "var(--font-body)" }}
                                >
                                    {isAttending
                                        ? "Thank you for confirming your attendance!"
                                        : "Thank you for letting us know."}
                                </p>
                            </div>

                            {/* Event Details */}
                            {isAttending && (
                                <div className="bg-silver-light/20 rounded-lg p-6 mb-6 border border-silver/30">
                                    <h4
                                        className="text-burgundy text-xs tracking-[0.2em] uppercase mb-4"
                                        style={{ fontFamily: "var(--font-ornate)" }}
                                    >
                                        Event Details
                                    </h4>
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            <MapPin className="text-burgundy mt-0.5 flex-shrink-0" size={16} />
                                            <div>
                                                <p className="text-charcoal text-sm font-medium" style={{ fontFamily: "var(--font-body)" }}>
                                                    San Fernando De Dilao Parish Church
                                                </p>
                                                <p className="text-silver-dark text-xs" style={{ fontFamily: "var(--font-body)" }}>
                                                    Paco, Manila
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Clock className="text-burgundy mt-0.5 flex-shrink-0" size={16} />
                                            <div>
                                                <p className="text-charcoal text-sm font-medium" style={{ fontFamily: "var(--font-body)" }}>
                                                    May 16, 2026
                                                </p>
                                                <p className="text-silver-dark text-xs" style={{ fontFamily: "var(--font-body)" }}>
                                                    Ceremony: 2:00 PM • Reception: 4:30 PM
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* RSVP Summary */}
                            <div className="bg-silver-light/20 rounded-lg p-6 mb-8 border border-silver/30">
                                <h4
                                    className="text-burgundy text-xs tracking-[0.2em] uppercase mb-4"
                                    style={{ fontFamily: "var(--font-ornate)" }}
                                >
                                    Your RSVP
                                </h4>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-silver-dark text-sm" style={{ fontFamily: "var(--font-body)" }}>Name</span>
                                        <span className="text-charcoal text-sm font-medium" style={{ fontFamily: "var(--font-body)" }}>{formData.name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-silver-dark text-sm" style={{ fontFamily: "var(--font-body)" }}>Email</span>
                                        <span className="text-charcoal text-sm font-medium" style={{ fontFamily: "var(--font-body)" }}>{formData.email}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-silver-dark text-sm" style={{ fontFamily: "var(--font-body)" }}>Guests</span>
                                        <span className="text-charcoal text-sm font-medium" style={{ fontFamily: "var(--font-body)" }}>{formData.guests}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-silver-dark text-sm" style={{ fontFamily: "var(--font-body)" }}>Response</span>
                                        <span className={`text-sm font-medium ${isAttending ? "text-green-600" : "text-silver-dark"}`} style={{ fontFamily: "var(--font-body)" }}>
                                            {isAttending ? "Attending ✨" : "Not Attending"}
                                        </span>
                                    </div>
                                    {formData.message && (
                                        <div className="pt-2 mt-2 border-t border-silver/30">
                                            <span className="text-silver-dark text-sm block mb-1" style={{ fontFamily: "var(--font-body)" }}>Message</span>
                                            <p className="text-charcoal text-sm italic" style={{ fontFamily: "var(--font-body)" }}>
                                                &ldquo;{formData.message}&rdquo;
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Leave a Wish Button */}
                            <Link
                                href="/messages"
                                className="w-full flex items-center justify-center gap-2 bg-burgundy text-white py-4 text-xs tracking-[0.2em] uppercase font-semibold hover:bg-burgundy-dark transition-all duration-300 rounded-lg mb-3"
                                style={{ fontFamily: "var(--font-ornate)" }}
                            >
                                <MessageSquareHeart size={16} />
                                Leave a Wish for the Couple
                            </Link>

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="w-full border border-wedding-charcoal/30 text-wedding-charcoal py-3 text-xs tracking-[0.2em] uppercase font-semibold hover:bg-wedding-pearl transition-all duration-300 rounded-lg"
                                style={{ fontFamily: "var(--font-body)" }}
                            >
                                Close
                            </button>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
