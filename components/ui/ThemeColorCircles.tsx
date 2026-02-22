"use client";

import { motion } from "framer-motion";

export function ThemeColorCircles() {
    const themeColors = [
        { name: "Neutral Pink", color: "#E8C4C4" },
        { name: "Champagne", color: "#F7E7CE" },
        { name: "Beige", color: "#D4C4A8" },
        { name: "Tan", color: "#C9A86C" },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
            className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-2"
        >
            <p
                className="text-wedding-champagne/60 text-[8px] tracking-[0.2em] uppercase mb-1 text-center"
                style={{ fontFamily: "var(--font-body)" }}
            >
                Theme
            </p>
            {themeColors.map((item, index) => (
                <motion.div
                    key={item.name}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 2 + index * 0.1, duration: 0.3 }}
                    className="group relative"
                >
                    <div
                        className="w-5 h-5 rounded-full border-2 border-white/30 shadow-lg cursor-pointer hover:scale-110 transition-transform"
                        style={{ backgroundColor: item.color }}
                    />
                    <span className="absolute right-8 top-1/2 -translate-y-1/2 bg-wedding-charcoal/90 text-wedding-ivory text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {item.name}
                    </span>
                </motion.div>
            ))}
        </motion.div>
    );
}
