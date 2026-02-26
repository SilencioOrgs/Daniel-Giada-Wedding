"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquareHeart, ArrowLeft, PenLine } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
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

const stickyColors = [
    { bg: "linear-gradient(135deg, #FFF8DC 0%, #F5DEB3 50%, #FAEBD7 100%)", text: "#722F37" },
    { bg: "linear-gradient(135deg, #FFE4E1 0%, #F5D6D0 50%, #FAE0DB 100%)", text: "#722F37" },
    { bg: "linear-gradient(135deg, #E0F0E8 0%, #D0E8D0 50%, #E5F0E0 100%)", text: "#2F4F4F" },
    { bg: "linear-gradient(135deg, #E8E0F0 0%, #DCD0E8 50%, #EAE5F0 100%)", text: "#483D8B" },
    { bg: "linear-gradient(135deg, #FFF5E6 0%, #FFE8CC 50%, #FFF0DC 100%)", text: "#8B4513" },
];

const rotations = [-3, -2, -1, 0, 1, 2, 3];
const coupleName = "Dniel & Giada";
const heroImage = "/ourstory/Proposal 2024.webp";
const boardBackground = "/ourstory/More dates.webp";

export function MessageBoard({ messages }: MessageBoardProps) {
    const [showMessageModal, setShowMessageModal] = useState(false);

    return (
        <>
            <MessageModal isOpen={showMessageModal} onClose={() => setShowMessageModal(false)} />

            <main className="relative min-h-screen overflow-hidden bg-[#120d0b]">
                <Image
                    src={boardBackground}
                    alt="Memory board background"
                    fill
                    priority
                    className="object-cover opacity-25"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#1d1410]/95 via-[#130f0c]/90 to-[#120d0b]/95" />
                <div
                    className="absolute inset-0 opacity-[0.12]"
                    style={{
                        backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
                    }}
                />

                <div className="relative z-10 px-4 pb-6 pt-8">
                    <div className="mx-auto mb-6 max-w-6xl">
                        <Link
                            href="/#rsvp"
                            className="inline-flex items-center gap-2 text-wedding-gold/60 transition-colors hover:text-wedding-gold text-sm"
                            style={{ fontFamily: "var(--font-body)" }}
                        >
                            <ArrowLeft size={16} />
                            Back to Home
                        </Link>
                    </div>

                    <div className="text-center">
                        <motion.div
                            className="relative mx-auto mb-6 h-32 w-32 overflow-hidden rounded-full border-4 border-white/30 shadow-2xl md:h-40 md:w-40"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Image src={heroImage} alt={coupleName} fill className="object-cover" sizes="160px" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <p
                                className="mb-2 text-xs uppercase tracking-[0.3em] text-wedding-burgundy"
                                style={{ fontFamily: "var(--font-ornate)" }}
                            >
                                Well Wishes For
                            </p>
                            <h1
                                className="mb-4 text-4xl text-[#ece7e1] md:text-5xl lg:text-6xl"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                {coupleName}
                            </h1>
                            <div className="mx-auto mb-6 h-[1px] w-16 bg-wedding-burgundy" />
                            <p className="mx-auto max-w-md text-sm text-white/75" style={{ fontFamily: "var(--font-body)" }}>
                                Messages from our beloved family and friends
                            </p>
                        </motion.div>

                        <motion.div
                            className="mt-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <button
                                onClick={() => setShowMessageModal(true)}
                                className="inline-flex items-center gap-2 rounded-lg bg-[#8f1428] px-6 py-3 text-sm uppercase tracking-[0.1em] text-[#f7e8cf] shadow-lg transition-colors hover:bg-[#a01831]"
                                style={{ fontFamily: "var(--font-body)" }}
                            >
                                <PenLine size={16} />
                                Add Your Wish
                            </button>
                        </motion.div>
                    </div>
                </div>

                <div className="relative z-10 mx-auto max-w-6xl px-4 pb-16">
                    {messages.length === 0 ? (
                        <motion.div className="py-16 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <MessageSquareHeart className="mx-auto mb-4 text-wedding-gold/30" size={64} />
                            <p className="text-lg text-white/60" style={{ fontFamily: "var(--font-body)" }}>
                                No messages yet. Be the first to leave a wish!
                            </p>
                        </motion.div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {messages.map((msg, index) => {
                                const colorScheme = stickyColors[index % stickyColors.length];
                                const rotation = rotations[index % rotations.length];

                                return (
                                    <motion.div
                                        key={msg.id}
                                        className="relative"
                                        initial={{ opacity: 0, y: 30, rotate: rotation * 2 }}
                                        animate={{ opacity: 1, y: 0, rotate: rotation }}
                                        transition={{ delay: index * 0.05, type: "spring", stiffness: 100 }}
                                        whileHover={{
                                            scale: 1.05,
                                            rotate: 0,
                                            zIndex: 10,
                                            transition: { duration: 0.2 },
                                        }}
                                    >
                                        <div
                                            className="min-h-[160px] cursor-pointer rounded-[2px] p-5 shadow-lg"
                                            style={{
                                                background: colorScheme.bg,
                                                boxShadow: "0 4px 20px rgba(0,0,0,0.3), 0 2px 6px rgba(0,0,0,0.2)",
                                            }}
                                        >
                                            <div
                                                className="absolute -top-2 left-1/2 h-6 w-12 -translate-x-1/2"
                                                style={{
                                                    background:
                                                        "linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.2) 100%)",
                                                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                                                }}
                                            />

                                            <p
                                                className="mb-4 leading-relaxed italic text-sm"
                                                style={{ fontFamily: "var(--font-body)", color: colorScheme.text }}
                                            >
                                                &ldquo;{msg.message}&rdquo;
                                            </p>

                                            <p
                                                className="text-right text-sm font-semibold"
                                                style={{ fontFamily: "var(--font-display)", color: colorScheme.text }}
                                            >
                                                - {msg.name}
                                            </p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </div>

                <div className="absolute left-10 top-20 hidden h-4 w-4 rounded-full bg-gradient-to-br from-red-500 to-red-700 shadow-lg md:block" />
                <div className="absolute right-20 top-40 hidden h-4 w-4 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-lg md:block" />
                <div className="absolute bottom-40 left-1/4 hidden h-4 w-4 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg md:block" />
                <div className="absolute bottom-60 right-1/3 hidden h-4 w-4 rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-lg md:block" />
            </main>
        </>
    );
}

