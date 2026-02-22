"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface Sparkle {
    id: number;
    left: number;
    top: number;
    delay: number;
    duration: number;
    size: number;
}

export function SparkleEffect({ count = 40 }: { count?: number }) {
    const sparkles = useMemo<Sparkle[]>(() => {
        const seeded = (seed: number) => {
            const x = Math.sin(seed) * 10000;
            return x - Math.floor(x);
        };

        return Array.from({ length: count }, (_, i) => ({
                id: i,
                left: seeded(i * 17.13 + 1) * 100,
                top: seeded(i * 29.87 + 2) * 100,
                delay: seeded(i * 13.11 + 3) * 5,
                duration: 2 + seeded(i * 31.07 + 4) * 3,
                size: 2 + seeded(i * 19.61 + 5) * 3,
            }));
    }, [count]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
            {sparkles.map((s) => (
                <motion.div
                    key={s.id}
                    className="absolute rounded-full"
                    style={{
                        left: `${s.left}%`,
                        top: `${s.top}%`,
                        width: s.size,
                        height: s.size,
                        backgroundColor: "#C0C0C0",
                        border: "1px solid rgba(105, 105, 105, 0.5)",
                        boxShadow: `0 0 ${s.size * 2}px ${s.size}px rgba(120,120,120,0.45), 0 0 ${s.size}px rgba(255,255,255,0.9) inset`,
                    }}
                    animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
                    transition={{
                        duration: s.duration,
                        repeat: Infinity,
                        delay: s.delay,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}
