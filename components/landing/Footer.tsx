"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-charcoal py-12 md:py-16 border-t border-silver/10">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <p
                    className="text-silver text-3xl md:text-4xl mb-4"
                    style={{ fontFamily: "var(--font-display)" }}
                >
                    D <span className="text-burgundy">&</span> G
                </p>
                <p
                    className="text-silver-dark text-xs tracking-[0.2em] uppercase"
                    style={{ fontFamily: "var(--font-body)" }}
                >
                    May 16, 2026
                </p>
                <p
                    className="text-medium-gray text-xs mt-6 flex items-center justify-center gap-2"
                    style={{ fontFamily: "var(--font-body)" }}
                >
                    Made with <Heart className="text-burgundy" size={12} fill="currentColor" /> for our special day
                </p>
            </div>
        </footer>
    );
}
