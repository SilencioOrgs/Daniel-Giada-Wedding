"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquareHeart, ArrowLeft, PenLine } from "lucide-react";
import Link from "next/link";
import { MessageModal } from "./MessageModal";

interface Message {
    id: string;
    name: string;
    message: string;
    created_at: string;
}

interface MessageBoardProps {
    messages: Message[];
}

// Sticky note colors for variety
const stickyColors = [
    { bg: "linear-gradient(135deg, #FFF8DC 0%, #F5DEB3 50%, #FAEBD7 100%)", text: "#722F37" },
    { bg: "linear-gradient(135deg, #FFE4E1 0%, #F5D6D0 50%, #FAE0DB 100%)", text: "#722F37" },
    { bg: "linear-gradient(135deg, #E0F0E8 0%, #D0E8D0 50%, #E5F0E0 100%)", text: "#2F4F4F" },
    { bg: "linear-gradient(135deg, #E8E0F0 0%, #DCD0E8 50%, #EAE5F0 100%)", text: "#483D8B" },
    { bg: "linear-gradient(135deg, #FFF5E6 0%, #FFE8CC 50%, #FFF0DC 100%)", text: "#8B4513" },
];

// Random rotations for natural look
const rotations = [-3, -2, -1, 0, 1, 2, 3];

export function MessageBoard({ messages }: MessageBoardProps) {
    const [showMessageModal, setShowMessageModal] = useState(false);

    return (
        <>
            <MessageModal isOpen={showMessageModal} onClose={() => setShowMessageModal(false)} />

            <main className="min-h-screen bg-wedding-black relative overflow-hidden">
                {/* Cork board texture background */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: "linear-gradient(135deg, #2a2018 0%, #1a1410 50%, #2a2018 100%)",
                    }}
                />
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    }}
                />

                {/* Header Section */}
                <div className="relative z-10 pt-8 pb-6 px-4">
                    {/* Back button */}
                    <div className="max-w-6xl mx-auto mb-6">
                        <Link
                            href="/#rsvp"
                            className="inline-flex items-center gap-2 text-wedding-gold/60 hover:text-wedding-gold transition-colors text-sm"
                            style={{ fontFamily: "var(--font-body)" }}
                        >
                            <ArrowLeft size={16} />
                            Back to Home
                        </Link>
                    </div>

                    {/* Couple Photo and Title */}
                    <div className="text-center">
                        {/* Couple Photo */}
                        <motion.div
                            className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-wedding-gold/40 shadow-2xl"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <img
                                src="/photos/image0/IMG_2728.webp"
                                alt="Carl & Shania"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <p
                                className="text-wedding-burgundy text-xs tracking-[0.3em] uppercase mb-2"
                                style={{ fontFamily: "var(--font-ornate)" }}
                            >
                                Well Wishes For
                            </p>
                            <h1
                                className="text-wedding-gold text-4xl md:text-5xl lg:text-6xl mb-4"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                Carl & Shania
                            </h1>
                            <div className="w-16 h-[1px] bg-wedding-burgundy mx-auto mb-6" />
                            <p
                                className="text-wedding-pearl/70 text-sm max-w-md mx-auto"
                                style={{ fontFamily: "var(--font-body)" }}
                            >
                                Messages from our beloved family and friends
                            </p>
                        </motion.div>

                        {/* Add Message Button */}
                        <motion.div
                            className="mt-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <button
                                onClick={() => setShowMessageModal(true)}
                                className="inline-flex items-center gap-2 bg-wedding-burgundy hover:bg-wedding-burgundy-dark text-wedding-gold px-6 py-3 rounded-lg text-sm tracking-[0.1em] uppercase transition-colors"
                                style={{ fontFamily: "var(--font-body)" }}
                            >
                                <PenLine size={16} />
                                Add Your Wish
                            </button>
                        </motion.div>
                    </div>
                </div>

                {/* Messages Grid / Bulletin Board */}
                <div className="relative z-10 max-w-6xl mx-auto px-4 pb-16">
                    {messages.length === 0 ? (
                        <motion.div
                            className="text-center py-16"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <MessageSquareHeart className="mx-auto text-wedding-gold/30 mb-4" size={64} />
                            <p
                                className="text-wedding-pearl/50 text-lg"
                                style={{ fontFamily: "var(--font-body)" }}
                            >
                                No messages yet. Be the first to leave a wish!
                            </p>
                        </motion.div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {messages.map((msg, index) => {
                                const colorScheme = stickyColors[index % stickyColors.length];
                                const rotation = rotations[index % rotations.length];

                                return (
                                    <motion.div
                                        key={msg.id}
                                        className="relative"
                                        initial={{ opacity: 0, y: 30, rotate: rotation * 2 }}
                                        animate={{ opacity: 1, y: 0, rotate: rotation }}
                                        transition={{
                                            delay: index * 0.05,
                                            type: "spring",
                                            stiffness: 100
                                        }}
                                        whileHover={{
                                            scale: 1.05,
                                            rotate: 0,
                                            zIndex: 10,
                                            transition: { duration: 0.2 }
                                        }}
                                    >
                                        {/* Sticky Note */}
                                        <div
                                            className="p-5 min-h-[160px] flex flex-col justify-between shadow-lg cursor-pointer"
                                            style={{
                                                background: colorScheme.bg,
                                                boxShadow: "0 4px 20px rgba(0,0,0,0.3), 0 2px 6px rgba(0,0,0,0.2)",
                                            }}
                                        >
                                            {/* Tape effect */}
                                            <div
                                                className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-6"
                                                style={{
                                                    background: "linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.2) 100%)",
                                                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                                                }}
                                            />

                                            {/* Message content */}
                                            <p
                                                className="text-sm leading-relaxed mb-4 italic"
                                                style={{
                                                    fontFamily: "var(--font-body)",
                                                    color: colorScheme.text,
                                                }}
                                            >
                                                &ldquo;{msg.message}&rdquo;
                                            </p>

                                            {/* Name */}
                                            <p
                                                className="text-right text-sm font-semibold"
                                                style={{
                                                    fontFamily: "var(--font-display)",
                                                    color: colorScheme.text,
                                                }}
                                            >
                                                — {msg.name}
                                            </p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Decorative pins/thumbtacks scattered around */}
                <div className="absolute top-20 left-10 w-4 h-4 rounded-full bg-gradient-to-br from-red-500 to-red-700 shadow-lg hidden md:block" />
                <div className="absolute top-40 right-20 w-4 h-4 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-lg hidden md:block" />
                <div className="absolute bottom-40 left-1/4 w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg hidden md:block" />
                <div className="absolute bottom-60 right-1/3 w-4 h-4 rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-lg hidden md:block" />
            </main>
        </>
    );
}
