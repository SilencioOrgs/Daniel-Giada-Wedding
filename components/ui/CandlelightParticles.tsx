"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
    id: number;
    left: number;
    delay: number;
    duration: number;
    size: number;
}

export function CandlelightParticles({ count = 25 }: { count?: number }) {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        // Generate particles on client side only
        const newParticles = Array.from({ length: count }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 8,
            duration: 10 + Math.random() * 8,
            size: 2 + Math.random() * 4,
        }));
        setParticles(newParticles);
    }, [count]);

    if (particles.length === 0) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full"
                    style={{
                        left: `${particle.left}%`,
                        bottom: -20,
                        width: particle.size,
                        height: particle.size,
                        background: `radial-gradient(circle, rgba(212, 175, 55, 0.8), rgba(212, 175, 55, 0.2))`,
                        filter: "blur(1px)",
                    }}
                    animate={{
                        y: [0, -window.innerHeight - 50],
                        opacity: [0, 0.8, 0.6, 0],
                        scale: [0.5, 1, 0.8, 0.3],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        delay: particle.delay,
                        ease: "easeOut",
                    }}
                />
            ))}
        </div>
    );
}

// Candlelight glow spots for section backgrounds
export function CandleGlowSpots({ count = 8 }: { count?: number }) {
    const [spots, setSpots] = useState<Array<{ id: number; left: number; top: number; delay: number }>>([]);

    useEffect(() => {
        const newSpots = Array.from({ length: count }, (_, i) => ({
            id: i,
            left: (i % 4) * 25 + Math.random() * 10,
            top: Math.floor(i / 4) * 50 + Math.random() * 20,
            delay: Math.random() * 3,
        }));
        setSpots(newSpots);
    }, [count]);

    if (spots.length === 0) return null;

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {spots.map((spot) => (
                <motion.div
                    key={spot.id}
                    className="absolute w-32 h-32 rounded-full"
                    style={{
                        left: `${spot.left}%`,
                        top: `${spot.top}%`,
                        background: "radial-gradient(circle, rgba(212, 175, 55, 0.25), transparent 70%)",
                        filter: "blur(40px)",
                    }}
                    animate={{
                        opacity: [0.3, 0.6, 0.3],
                        scale: [1, 1.3, 1],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: spot.delay,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}
