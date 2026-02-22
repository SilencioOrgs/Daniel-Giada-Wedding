"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { WEDDING_DETAILS } from "@/lib/mockData";

export function Navigation() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { name: "Home", href: "#home" },
        { name: "Venue", href: "#venue" },
        { name: "Story", href: "#story" },
        { name: "Entourage", href: "#entourage" },
        { name: "Gallery", href: "#gallery" },
        { name: "RSVP", href: "#rsvp" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                    ? "bg-burgundy/95 backdrop-blur-md shadow-lg border-b border-silver/30"
                    : "bg-gradient-to-b from-burgundy/70 to-transparent border-b border-transparent"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* Desktop Left Links */}
                        <div className="hidden md:flex items-center space-x-10">
                            {navLinks.slice(0, 3).map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className={`text-xs tracking-[0.2em] uppercase transition-all duration-300 relative group ${isScrolled ? "text-silver hover:text-white" : "text-white/80 hover:text-white"
                                        }`}
                                    style={{ fontFamily: "var(--font-body)" }}
                                >
                                    {link.name}
                                    <motion.span
                                        className="absolute -bottom-1 left-0 right-0 h-[1px] bg-silver origin-left"
                                        initial={{ scaleX: 0 }}
                                        whileHover={{ scaleX: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </a>
                            ))}
                        </div>

                        {/* Logo - Monogram Image */}
                        <a
                            href="#home"
                            className="relative group px-4"
                        >
                            <div className="relative w-12 h-12 md:w-16 md:h-16">
                                {/* Use generic img tag for simplicity if next/image causes issues with static export, 
                                    but here next/image is preferred. Accessing public folder directly. */}
                                <img
                                    src="/Picture1.png"
                                    alt={WEDDING_DETAILS.couple.initials}
                                    className="object-contain w-full h-full drop-shadow-lg transition-all duration-500"
                                    style={{
                                        filter: isScrolled
                                            ? "brightness(0) invert(1) opacity(0.85)"
                                            : "none"
                                    }}
                                />
                            </div>
                        </a>

                        {/* Desktop Right Links */}
                        <div className="hidden md:flex items-center space-x-10">
                            {navLinks.slice(3).map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className={`text-xs tracking-[0.2em] uppercase transition-all duration-300 relative group ${isScrolled ? "text-silver hover:text-white" : "text-white/80 hover:text-white"
                                        }`}
                                    style={{ fontFamily: "var(--font-body)" }}
                                >
                                    {link.name}
                                    <motion.span
                                        className="absolute -bottom-1 left-0 right-0 h-[1px] bg-silver origin-left"
                                        initial={{ scaleX: 0 }}
                                        whileHover={{ scaleX: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </a>
                            ))}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className={`md:hidden p-2 rounded-full border transition-colors ${isScrolled
                                ? "text-silver border-silver/30 hover:bg-silver/10"
                                : "text-white border-white/30 hover:bg-white/10"
                                }`}
                            aria-label="Open menu"
                        >
                            <Menu size={20} />
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay - Modern Style */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-burgundy-dark"
                    >
                        {/* Silver Gradient Background */}
                        <div className="absolute inset-0 bg-gradient-to-b from-burgundy-dark to-black opacity-90" />

                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-burgundy rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-silver rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
                        </div>

                        {/* Close button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="absolute top-6 right-6 text-silver p-2 border border-silver/30 rounded-full hover:bg-silver/10 transition-colors z-20"
                            aria-label="Close menu"
                        >
                            <X size={24} />
                        </button>

                        {/* Monogram Image */}
                        <motion.div
                            className="relative w-32 h-32 mb-12 z-10"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                        >
                            <img
                                src="/Picture1.png"
                                alt={WEDDING_DETAILS.couple.initials}
                                className="object-contain w-full h-full drop-shadow-2xl"
                                style={{ filter: "brightness(0) invert(1) opacity(0.85)" }}
                            />
                        </motion.div>

                        {/* Navigation Links */}
                        <div className="relative z-10 flex flex-col items-center space-y-8">
                            {navLinks.map((link, index) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 + 0.2, duration: 0.4 }}
                                    className="text-silver-light text-xl tracking-[0.2em] uppercase hover:text-white transition-colors"
                                    style={{ fontFamily: "var(--font-body)" }}
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
