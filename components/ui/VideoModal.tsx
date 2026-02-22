"use client";

import { X } from "lucide-react";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface VideoModalProps {
    isOpen: boolean;
    onClose: () => void;
    videoSrc: string;
}

export function VideoModal({ isOpen, onClose, videoSrc }: VideoModalProps) {
    // Lock body scroll and pause BGM when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            // Dispatch event to pause background music
            window.dispatchEvent(new CustomEvent("pause-bgm"));
        } else {
            document.body.style.overflow = "unset";
            // Dispatch event to resume background music (if it was auto-paused)
            window.dispatchEvent(new CustomEvent("resume-bgm"));
        }
        return () => {
            document.body.style.overflow = "unset";
            // Make sure we resume if component unmounts while open
            if (isOpen) {
                window.dispatchEvent(new CustomEvent("resume-bgm"));
            }
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-8"
                    onClick={onClose}
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
                    >
                        <X size={32} />
                    </button>

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="relative w-full max-w-5xl aspect-video rounded-lg overflow-hidden shadow-2xl border border-wedding-gold/20"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <video
                            src={videoSrc}
                            className="w-full h-full object-contain bg-black"
                            controls
                            autoPlay
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
