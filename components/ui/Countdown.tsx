"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { WEDDING_DETAILS } from "@/lib/mockData";

export function Countdown() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        // Use the date from mockData, defaulting to a specific time if not present
        const weddingDateStr = `${WEDDING_DETAILS.date.month} ${WEDDING_DETAILS.date.day}, ${WEDDING_DETAILS.date.year} 14:00:00`;
        const weddingDate = new Date(weddingDateStr).getTime();

        const updateCountdown = () => {
            const now = new Date().getTime();
            const difference = weddingDate - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000),
                });
            }
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);
        return () => clearInterval(interval);
    }, []);

    const timeUnits = [
        { label: "Days", value: timeLeft.days },
        { label: "Hours", value: timeLeft.hours },
        { label: "Minutes", value: timeLeft.minutes },
        { label: "Seconds", value: timeLeft.seconds },
    ];

    return (
        <div className="flex gap-4 md:gap-8 mt-8">
            {timeUnits.map((unit, index) => (
                <motion.div
                    key={unit.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                    className="text-center"
                >
                    <motion.div
                        key={unit.value}
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-burgundy text-3xl md:text-5xl lg:text-6xl font-light drop-shadow-sm"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        {String(unit.value).padStart(2, "0")}
                    </motion.div>
                    <p
                        className="text-charcoal/80 text-[10px] md:text-xs tracking-[0.2em] uppercase mt-2"
                        style={{ fontFamily: "var(--font-body)" }}
                    >
                        {unit.label}
                    </p>
                </motion.div>
            ))}
        </div>
    );
}
