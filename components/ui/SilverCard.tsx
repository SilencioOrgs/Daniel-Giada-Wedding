"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface SilverCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    variant?: "primary" | "secondary" | "minimal";
    className?: string;
    animate?: boolean;
}

export function SilverCard({
    children,
    variant = "primary",
    className = "",
    animate = true,
    ...props
}: SilverCardProps) {
    const variants = {
        primary: "frosted-glass border-2 border-silver/40 rounded-2xl p-8 shadow-lg relative overflow-hidden",
        secondary: "bg-white border border-silver/30 rounded-xl p-6 shadow-md relative",
        minimal: "bg-transparent border border-silver/20 rounded-lg p-4 relative"
    };

    const content = (
        <div className={`${variants[variant]} ${className}`} {...props}>
            {/* Metallic Shine Effect for Primary Variant */}
            {variant === "primary" && (
                <div className="absolute inset-0 metallic-shine pointer-events-none opacity-50" />
            )}

            <div className="relative z-10">
                {children}
            </div>
        </div>
    );

    if (!animate) return content;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
        >
            {content}
        </motion.div>
    );
}
