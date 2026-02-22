"use client";

import { motion } from "framer-motion";
import { Gift } from "lucide-react";
import Image from "next/image";

export function GiftGuideSection() {
    return (
        <>
            {/* Gradient transition into burgundy */}
            <div style={{ height: 120, background: "linear-gradient(to bottom, #F8F8F8 0%, rgba(128,0,32,0.05) 30%, rgba(128,0,32,0.15) 60%, #6B0D1F 100%)" }} />

            <section
                id="gift-guide"
                className="relative py-16 md:py-24 overflow-hidden text-off-white"
                style={{
                    background: "linear-gradient(165deg, #6B0D1F 0%, #800020 40%, #8B1538 70%, #6B0D1F 100%)",
                }}
            >
                {/* Background Texture */}
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
                {/* Subtle radial glow */}
                <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(255,255,255,0.06) 0%, transparent 70%)" }} />

                <div className="relative z-10 max-w-3xl mx-auto px-6">
                    {/* Section Header */}
                    <motion.div
                        className="text-center mb-12 md:mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <p
                            className="text-silver-light/70 text-xs tracking-[0.4em] uppercase mb-4"
                            style={{ fontFamily: "var(--font-body)" }}
                        >
                            Wedding Gifts
                        </p>
                        <h2
                            className="text-white text-4xl md:text-5xl lg:text-6xl mb-6"
                            style={{ fontFamily: "var(--font-display)" }}
                        >
                            Gift Guide
                        </h2>
                        {/* Horizontal line divider */}
                        <div className="w-24 h-px bg-silver/40 mx-auto mb-6" />
                        <p
                            className="text-silver-light/80 text-sm max-w-md mx-auto"
                            style={{ fontFamily: "var(--font-body)" }}
                        >
                            With all that we have we&apos;ve been truly blessed, your presence and prayers are all that we request. But if you desire to give nonetheless, a monetary gift is the one we humbly suggest.
                        </p>
                    </motion.div>

                    {/* Payment Methods Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* GoTyme */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-6 md:p-8 text-center shadow-lg hover:bg-white/15 transition-all duration-300"
                        >
                            <div className="h-12 mb-6 flex items-center justify-center">
                                <Image
                                    src="/gtlogo.png"
                                    alt="GoTyme Bank"
                                    width={260}
                                    height={64}
                                    className="h-full w-auto object-contain"
                                />
                            </div>

                            {/* QR Code */}
                            <div className="w-48 h-48 mx-auto mb-6 rounded-lg overflow-hidden">
                                <Image
                                    src="/gotymeqr.jpeg"
                                    alt="GoTyme Bank QR Code"
                                    width={400}
                                    height={400}
                                    className="w-full h-full rounded-lg object-cover"
                                />
                            </div>

                        </motion.div>

                        {/* Bank Transfer */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-6 md:p-8 text-center shadow-lg hover:bg-white/15 transition-all duration-300"
                        >
                            <div className="h-12 mb-6 flex items-center justify-center">
                                <Image
                                    src="/lblogo.png"
                                    alt="Landbank"
                                    width={260}
                                    height={64}
                                    className="h-full w-auto object-contain"
                                />
                            </div>

                            {/* QR Code */}
                            <div className="w-48 h-48 mx-auto mb-6 rounded-lg overflow-hidden">
                                <Image
                                    src="/landbankqr.jpeg"
                                    alt="Landbank QR Code"
                                    width={400}
                                    height={400}
                                    className="w-full h-full rounded-lg object-cover"
                                />
                            </div>

                        </motion.div>
                    </div>

                    {/* Bottom note */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="mt-16 text-center"
                    >
                        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm">
                            <Gift size={16} className="text-silver-light" />
                            <span className="text-silver-light/90 text-xs tracking-wider uppercase font-medium">
                                With love and gratitude — Daniel & Giada
                            </span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Gradient transition out of burgundy */}
            <div style={{ height: 120, background: "linear-gradient(to bottom, #6B0D1F 0%, rgba(128,0,32,0.15) 40%, rgba(128,0,32,0.05) 70%, #F8F8F8 100%)" }} />
        </>
    );
}
