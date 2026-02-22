"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, MessageSquareHeart } from "lucide-react";
import { submitMessage } from "@/app/actions";

interface MessageModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function MessageModal({ isOpen, onClose }: MessageModalProps) {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFeedback(null);

        const formData = new FormData();
        formData.append("name", name);
        formData.append("message", message);

        const result = await submitMessage(formData);

        if (result.success) {
            setFeedback({ type: "success", text: result.message });
            setName("");
            setMessage("");
            setTimeout(() => {
                onClose();
                setFeedback(null);
            }, 2000);
        } else {
            setFeedback({ type: "error", text: result.message });
        }

        setIsSubmitting(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                    style={{ backdropFilter: "blur(8px)" }}
                    onClick={onClose}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-wedding-black/80" />

                    {/* Sticky Note Modal */}
                    <motion.div
                        initial={{ scale: 0.8, rotate: -5, opacity: 0 }}
                        animate={{ scale: 1, rotate: 2, opacity: 1 }}
                        exit={{ scale: 0.8, rotate: 5, opacity: 0 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-md"
                    >
                        {/* Sticky Note Design */}
                        <div
                            className="relative p-6 pt-10"
                            style={{
                                background: "linear-gradient(135deg, #FFF8DC 0%, #F5DEB3 50%, #FAEBD7 100%)",
                                boxShadow: "0 8px 32px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.2)",
                                transform: "rotate(1deg)",
                            }}
                        >
                            {/* Tape effect on top */}
                            <div
                                className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-8"
                                style={{
                                    background: "linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.3) 100%)",
                                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                                }}
                            />

                            {/* Close button */}
                            <button
                                onClick={onClose}
                                className="absolute top-2 right-2 text-wedding-burgundy/60 hover:text-wedding-burgundy transition-colors"
                            >
                                <X size={20} />
                            </button>

                            {/* Header */}
                            <div className="text-center mb-6">
                                <MessageSquareHeart className="mx-auto text-wedding-burgundy mb-2" size={32} />
                                <h3
                                    className="text-wedding-burgundy text-xl"
                                    style={{ fontFamily: "var(--font-display)" }}
                                >
                                    Leave a Wish
                                </h3>
                                <p
                                    className="text-wedding-burgundy/70 text-sm mt-1"
                                    style={{ fontFamily: "var(--font-body)" }}
                                >
                                    Share your blessings for the couple
                                </p>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Your name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full px-4 py-3 bg-white/50 border-b-2 border-wedding-burgundy/30 focus:border-wedding-burgundy outline-none text-wedding-burgundy placeholder:text-wedding-burgundy/40 transition-colors"
                                        style={{ fontFamily: "var(--font-body)" }}
                                        required
                                    />
                                </div>
                                <div>
                                    <textarea
                                        placeholder="Write your message..."
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        rows={4}
                                        className="w-full px-4 py-3 bg-white/50 border-b-2 border-wedding-burgundy/30 focus:border-wedding-burgundy outline-none text-wedding-burgundy placeholder:text-wedding-burgundy/40 transition-colors resize-none"
                                        style={{ fontFamily: "var(--font-body)" }}
                                        required
                                    />
                                </div>

                                {/* Feedback */}
                                {feedback && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`text-center text-sm ${feedback.type === "success" ? "text-green-700" : "text-red-700"
                                            }`}
                                        style={{ fontFamily: "var(--font-body)" }}
                                    >
                                        {feedback.text}
                                    </motion.p>
                                )}

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full flex items-center justify-center gap-2 bg-wedding-burgundy hover:bg-wedding-burgundy-dark text-wedding-gold py-3 px-6 transition-colors disabled:opacity-50"
                                    style={{ fontFamily: "var(--font-body)" }}
                                >
                                    <Send size={16} />
                                    {isSubmitting ? "Sending..." : "Post Message"}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
