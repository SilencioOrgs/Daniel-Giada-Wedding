"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    // Try to autoplay after user first interacts with the page
    useEffect(() => {
        const handleFirstInteraction = () => {
            if (!hasInteracted && audioRef.current) {
                setHasInteracted(true);
                audioRef.current.play()
                    .then(() => setIsPlaying(true))
                    .catch(() => setIsPlaying(false));
            }
        };

        // Listen for any user interaction
        window.addEventListener("click", handleFirstInteraction, { once: true });
        window.addEventListener("scroll", handleFirstInteraction, { once: true });
        window.addEventListener("touchstart", handleFirstInteraction, { once: true });

        return () => {
            window.removeEventListener("click", handleFirstInteraction);
            window.removeEventListener("scroll", handleFirstInteraction);
            window.removeEventListener("touchstart", handleFirstInteraction);
        };
    }, [hasInteracted]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play()
                    .then(() => setIsPlaying(true))
                    .catch(() => setIsPlaying(false));
            }
        }
    };

    // Listen for custom "pause-bgm" and "resume-bgm" events from VideoModal
    useEffect(() => {
        const handlePauseBgm = () => {
            if (audioRef.current && !audioRef.current.paused) {
                audioRef.current.pause();
                setIsPlaying(false);
                // Mark that we paused automatically so we can resume automatically
                sessionStorage.setItem("bgm-auto-paused", "true");
            }
        };

        const handleResumeBgm = () => {
            if (audioRef.current && sessionStorage.getItem("bgm-auto-paused") === "true") {
                audioRef.current.play().then(() => setIsPlaying(true)).catch(() => { });
                sessionStorage.removeItem("bgm-auto-paused");
            }
        };

        window.addEventListener("pause-bgm", handlePauseBgm);
        window.addEventListener("resume-bgm", handleResumeBgm);

        return () => {
            window.removeEventListener("pause-bgm", handlePauseBgm);
            window.removeEventListener("resume-bgm", handleResumeBgm);
        };
    }, []);

    // Soundwave bars animation
    const bars = [1, 2, 3, 4, 5];

    return (
        <>
            {/* Hidden Audio Element */}
            <audio
                ref={audioRef}
                src="/bgm_03.mp3"
                loop
                preload="auto"
            />

            {/* Music Control Button - Bottom Right */}
            <motion.button
                onClick={togglePlay}
                className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-charcoal/80 backdrop-blur-md border border-silver/30 rounded-full px-4 py-3 shadow-lg hover:bg-charcoal transition-colors group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={isPlaying ? "Pause music" : "Play music"}
            >
                {/* Soundwave Animation */}
                <div className="flex items-end gap-[3px] h-4">
                    {bars.map((bar, index) => (
                        <motion.div
                            key={bar}
                            className="w-[3px] bg-burgundy rounded-full"
                            animate={isPlaying ? {
                                height: ["8px", "16px", "10px", "14px", "8px"],
                            } : {
                                height: "4px",
                            }}
                            transition={isPlaying ? {
                                duration: 0.8,
                                repeat: Infinity,
                                delay: index * 0.1,
                                ease: "easeInOut",
                            } : {
                                duration: 0.3,
                            }}
                        />
                    ))}
                </div>

                {/* Play/Pause Text */}
                <span
                    className="text-silver-light text-xs tracking-wider uppercase hidden sm:block"
                    style={{ fontFamily: "var(--font-body)" }}
                >
                    {isPlaying ? "Playing" : "Play"}
                </span>
            </motion.button>
        </>
    );
}
