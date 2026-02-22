"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface OrnateFrameProps {
    children: ReactNode;
    variant?: "primary" | "secondary" | "minimal";
    className?: string;
    animate?: boolean;
}

export function OrnateFrame({
    children,
    variant = "primary",
    className = "",
    animate = true
}: OrnateFrameProps) {
    const variants = {
        primary: {
            border: "border-2 border-wedding-gold",
            bg: "bg-wedding-burgundy-dark/20",
            padding: "p-8 md:p-12",
            corners: true,
        },
        secondary: {
            border: "border border-wedding-gold/60",
            bg: "bg-wedding-maroon/30",
            padding: "p-6 md:p-8",
            corners: true,
        },
        minimal: {
            border: "border border-wedding-gold/40",
            bg: "bg-transparent",
            padding: "p-4 md:p-6",
            corners: false,
        },
    };

    const style = variants[variant];

    const CornerFlourish = ({ position }: { position: string }) => {
        const rotations: Record<string, string> = {
            "top-left": "rotate-0",
            "top-right": "rotate-90",
            "bottom-right": "rotate-180",
            "bottom-left": "-rotate-90",
        };

        const positions: Record<string, string> = {
            "top-left": "-top-3 -left-3",
            "top-right": "-top-3 -right-3",
            "bottom-right": "-bottom-3 -right-3",
            "bottom-left": "-bottom-3 -left-3",
        };

        return (
            <motion.svg
                className={`absolute w-8 h-8 text-wedding-gold ${positions[position]} ${rotations[position]}`}
                viewBox="0 0 32 32"
                initial={animate ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                {/* Corner flourish design */}
                <path
                    d="M4 4 Q12 2 16 4 Q20 6 24 4 L24 8 Q20 12 24 16 L20 16 Q16 12 16 8 Q12 8 8 12 L8 8 Q6 6 4 4"
                    fill="currentColor"
                    opacity="0.9"
                />
                <circle cx="6" cy="6" r="2" fill="currentColor" />
            </motion.svg>
        );
    };

    return (
        <motion.div
            className={`relative ${className}`}
            initial={animate ? { opacity: 0, y: 20 } : {}}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
        >
            {/* Main frame */}
            <div className={`relative ${style.border} ${style.bg} ${style.padding} rounded-lg backdrop-blur-sm ${className.includes('h-full') ? 'h-full' : ''}`}>
                {/* Top and bottom decorative lines */}
                <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-wedding-gold/60 to-transparent" />
                <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-wedding-gold/60 to-transparent" />

                {/* Corner flourishes */}
                {style.corners && (
                    <>
                        <CornerFlourish position="top-left" />
                        <CornerFlourish position="top-right" />
                        <CornerFlourish position="bottom-left" />
                        <CornerFlourish position="bottom-right" />
                    </>
                )}

                {/* Inner glow effect */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-wedding-gold/5 via-transparent to-wedding-gold/5 pointer-events-none" />

                {/* Content */}
                <div className="relative z-10">
                    {children}
                </div>
            </div>
        </motion.div>
    );
}

// Decorative divider component
export function OrnateDecorator({ className = "" }: { className?: string }) {
    return (
        <div className={`flex items-center justify-center gap-4 ${className}`}>
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-wedding-gold/60" />
            <svg className="w-6 h-6 text-wedding-gold" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L14 8L20 8L15 12L17 18L12 14L7 18L9 12L4 8L10 8L12 2Z" opacity="0.8" />
            </svg>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-wedding-gold/60" />
        </div>
    );
}

// Horizontal scroll divider
export function FloralScroll({ className = "" }: { className?: string }) {
    return (
        <svg className={`text-wedding-gold ${className}`} viewBox="0 0 200 24" fill="currentColor">
            {/* Left scroll */}
            <path d="M10 12 Q20 6 40 12 T70 12" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
            <circle cx="10" cy="12" r="2" opacity="0.6" />

            {/* Center ornament */}
            <path d="M90 8 L100 4 L110 8 L100 12 Z" opacity="0.8" />
            <circle cx="100" cy="12" r="3" opacity="0.9" />
            <path d="M90 16 L100 20 L110 16 L100 12 Z" opacity="0.8" />

            {/* Right scroll */}
            <path d="M130 12 Q150 6 160 12 T190 12" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
            <circle cx="190" cy="12" r="2" opacity="0.6" />
        </svg>
    );
}
