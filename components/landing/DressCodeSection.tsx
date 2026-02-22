"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SilverCard } from "@/components/ui/SilverCard";
import { DRESS_CODE } from "@/lib/mockData";
import { X, Image as ImageIcon } from "lucide-react";

export function DressCodeSection() {
    const [showGuide, setShowGuide] = useState(false);

    const palette = [
        "#E8E8E8", // Light gray
        "#D3D3D3", // Silver light
        "#C0C0C0", // Silver
        "#A8A8A8", // Silver dark
        "#909090"  // Steel
    ];

    return (
        <section className="relative py-20 px-4 md:px-8 overflow-hidden bg-white/50">
            {/* Light Silver Gradient Background */}
            <div className="absolute inset-0 silver-gradient opacity-30" />

            <div className="relative z-10 max-w-5xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                    className="mb-12"
                >
                    <p
                        className="text-silver-dark text-xs tracking-[0.4em] uppercase mb-4"
                        style={{ fontFamily: "var(--font-body)" }}
                    >
                        Attire Guide
                    </p>
                    <h2
                        className="text-burgundy text-4xl md:text-5xl mb-6"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        Dress Code
                    </h2>
                    {/* Geometric Divider */}
                    <div className="flex items-center justify-center gap-4 mb-8">
                        <div className="h-px w-16 bg-silver" />
                        <div className="w-2 h-2 bg-silver rotate-45 transform" />
                        <div className="h-px w-16 bg-silver" />
                    </div>

                    {/* View Guide Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowGuide(true)}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-burgundy text-white text-xs tracking-[0.2em] uppercase rounded-full hover:bg-burgundy-dark transition-colors shadow-lg"
                        style={{ fontFamily: "var(--font-body)" }}
                    >
                        <ImageIcon size={16} />
                        View Visual Guide
                    </motion.button>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {/* Principal Sponsors */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <SilverCard className="h-full text-left">
                            <h3 className="text-burgundy text-xl mb-6 font-semibold border-b border-silver/30 pb-2">
                                Principal Sponsors
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <span className="text-silver-dark font-medium uppercase text-xs tracking-wider block mb-1">
                                        Gentlemen
                                    </span>
                                    <p className="text-charcoal text-sm">{DRESS_CODE.principalSponsors.gentlemen}</p>
                                </div>
                                <div>
                                    <span className="text-silver-dark font-medium uppercase text-xs tracking-wider block mb-1">
                                        Ladies
                                    </span>
                                    <p className="text-charcoal text-sm">{DRESS_CODE.principalSponsors.ladies}</p>
                                </div>
                            </div>
                        </SilverCard>
                    </motion.div>

                    {/* Guests */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <SilverCard className="h-full text-left">
                            <h3 className="text-burgundy text-xl mb-6 font-semibold border-b border-silver/30 pb-2">
                                Guests
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <span className="text-silver-dark font-medium uppercase text-xs tracking-wider block mb-1">
                                        Gentlemen
                                    </span>
                                    <p className="text-charcoal text-sm">{DRESS_CODE.guests.gentlemen}</p>
                                </div>
                                <div>
                                    <span className="text-silver-dark font-medium uppercase text-xs tracking-wider block mb-1">
                                        Ladies
                                    </span>
                                    <p className="text-charcoal text-sm">{DRESS_CODE.guests.ladies}</p>
                                </div>
                            </div>
                        </SilverCard>
                    </motion.div>
                </div>

                {/* Color Palette */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mb-12"
                >
                    <p className="text-silver-dark text-sm mb-6 font-medium">Color Palette: Silver Gray Spectrum</p>
                    <div className="flex justify-center gap-4 flex-wrap">
                        {palette.map((color, i) => (
                            <div
                                key={i}
                                className="group relative"
                            >
                                <div
                                    className="w-12 h-12 rounded-full border-2 border-white shadow-md transform transition-transform group-hover:scale-110"
                                    style={{ backgroundColor: color }}
                                />
                                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-silver-dark opacity-0 group-hover:opacity-100 transition-opacity">
                                    {color}
                                </span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="text-burgundy font-medium text-sm border-t border-silver/30 pt-8 inline-block px-12"
                >
                    {DRESS_CODE.note}
                </motion.p>
            </div>

            {/* Visual Guide Modal */}
            <AnimatePresence>
                {showGuide && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
                        onClick={() => setShowGuide(false)}
                    >
                        <button
                            onClick={() => setShowGuide(false)}
                            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors p-2"
                        >
                            <X size={32} />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-4xl max-h-[90vh] w-full bg-white rounded-lg overflow-hidden shadow-2xl"
                            onClick={(e: React.MouseEvent) => e.stopPropagation()}
                        >
                            <div className="overflow-auto max-h-[85vh] p-2">
                                <img
                                    src="/outfit.png"
                                    alt="Wedding Dress Code Guide"
                                    className="w-full h-auto object-contain"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
