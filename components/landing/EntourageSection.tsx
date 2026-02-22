"use client";

import { motion } from "framer-motion";
import { Cross } from "lucide-react";
import { SilverCard } from "@/components/ui/SilverCard";
import { ENTOURAGE } from "@/lib/mockData";

export function EntourageSection() {
    return (
        <section id="entourage" className="relative py-20 px-4 md:px-8 overflow-hidden bg-off-white">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-silver-light/20 to-transparent" />
            <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-silver-light/20 to-transparent" />

            <div className="relative z-10 max-w-6xl mx-auto">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                >
                    <p
                        className="text-silver-dark text-xs tracking-[0.4em] uppercase mb-4"
                        style={{ fontFamily: "var(--font-body)" }}
                    >
                        The Wedding Party
                    </p>
                    <h2
                        className="text-burgundy text-4xl md:text-5xl lg:text-6xl mb-6"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        Entourage
                    </h2>
                    {/* Geometric Divider */}
                    <div className="flex items-center justify-center gap-4">
                        <div className="h-px w-16 bg-silver" />
                        <div className="w-2 h-2 bg-silver rotate-45 transform" />
                        <div className="h-px w-16 bg-silver" />
                    </div>
                </motion.div>

                <div className="space-y-16">
                    {/* Parents */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <SilverCard className="h-full text-center">
                                <h3 className="text-burgundy text-xl mb-6 font-semibold uppercase tracking-widest border-b border-silver/30 pb-4">
                                    Groom&apos;s Parents
                                </h3>
                                <div className="space-y-2">
                                    {ENTOURAGE.groomsParents.map((parent, i) => (
                                        <p key={i} className="text-charcoal text-lg font-medium">{parent}</p>
                                    ))}
                                </div>
                            </SilverCard>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <SilverCard className="h-full text-center">
                                <h3 className="text-burgundy text-xl mb-6 font-semibold uppercase tracking-widest border-b border-silver/30 pb-4">
                                    Bride&apos;s Parents
                                </h3>
                                <div className="space-y-2">
                                    {ENTOURAGE.bridesParents.map((parent, i) => (
                                        <p key={i} className="text-charcoal text-lg font-medium flex items-center justify-center gap-1">
                                            {parent.replace(" †", "")}
                                            {parent.includes("†") && <Cross size={12} className="text-charcoal" />}
                                        </p>
                                    ))}
                                </div>
                            </SilverCard>
                        </motion.div>
                    </div>

                    {/* Principal Sponsors */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-burgundy text-2xl mb-8 text-center font-display">Principal Sponsors</h3>
                        <SilverCard>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                                {ENTOURAGE.principalSponsors.map((pair, index) => (
                                    <div key={index} className="flex flex-col md:flex-row justify-between items-center border-b border-silver/20 last:border-0 md:last:border-b md:nth-last-2:border-0 pb-4 md:pb-2">
                                        <span className="text-charcoal text-center md:text-left font-medium">{pair.male}</span>
                                        <span className="text-silver-dark mx-2 hidden md:inline">&</span>
                                        <span className="text-charcoal text-center md:text-right font-medium">{pair.female}</span>
                                    </div>
                                ))}
                            </div>
                        </SilverCard>
                    </motion.div>

                    {/* Best Man & Maid/Matron of Honor */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="md:col-span-1"
                        >
                            <SilverCard className="text-center h-full flex flex-col justify-center">
                                <h4 className="text-burgundy text-sm font-bold uppercase tracking-widest mb-2">Best Man</h4>
                                <p className="text-charcoal text-lg font-medium">{ENTOURAGE.bestMan}</p>
                            </SilverCard>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="md:col-span-1"
                        >
                            <SilverCard className="text-center h-full flex flex-col justify-center">
                                <h4 className="text-burgundy text-sm font-bold uppercase tracking-widest mb-2">Maid of Honor</h4>
                                <p className="text-charcoal text-lg font-medium">{ENTOURAGE.maidOfHonor}</p>
                            </SilverCard>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="md:col-span-1"
                        >
                            <SilverCard className="text-center h-full flex flex-col justify-center">
                                <h4 className="text-burgundy text-sm font-bold uppercase tracking-widest mb-2">Matron of Honor</h4>
                                <p className="text-charcoal text-lg font-medium">{ENTOURAGE.matronOfHonor}</p>
                            </SilverCard>
                        </motion.div>
                    </div>

                    {/* Secondary Sponsors */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-burgundy text-2xl mb-8 text-center font-display">Secondary Sponsors</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Candle */}
                            <SilverCard className="text-center">
                                <h4 className="text-silver-dark text-xs uppercase tracking-[0.2em] mb-4">Candle</h4>
                                <p className="text-charcoal mb-1">{ENTOURAGE.secondarySponsors.candle.male}</p>
                                <p className="text-charcoal">{ENTOURAGE.secondarySponsors.candle.female}</p>
                            </SilverCard>
                            {/* Veil */}
                            <SilverCard className="text-center">
                                <h4 className="text-silver-dark text-xs uppercase tracking-[0.2em] mb-4">Veil</h4>
                                <p className="text-charcoal mb-1">{ENTOURAGE.secondarySponsors.veil.male}</p>
                                <p className="text-charcoal">{ENTOURAGE.secondarySponsors.veil.female}</p>
                            </SilverCard>
                            {/* Cord */}
                            <SilverCard className="text-center">
                                <h4 className="text-silver-dark text-xs uppercase tracking-[0.2em] mb-4">Cord</h4>
                                <p className="text-charcoal mb-1">{ENTOURAGE.secondarySponsors.cord.male}</p>
                                <p className="text-charcoal">{ENTOURAGE.secondarySponsors.cord.female}</p>
                            </SilverCard>
                        </div>
                    </motion.div>

                    {/* Groomsmen & Bridesmaids */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <SilverCard className="h-full text-center">
                                <h3 className="text-burgundy text-xl mb-6 font-semibold uppercase tracking-widest border-b border-silver/30 pb-4">
                                    Groomsmen
                                </h3>
                                <div className="space-y-3">
                                    {ENTOURAGE.groomsmen.map((groomsman, i) => (
                                        <p key={i} className="text-charcoal text-lg">{groomsman}</p>
                                    ))}
                                </div>
                            </SilverCard>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <SilverCard className="h-full text-center">
                                <h3 className="text-burgundy text-xl mb-6 font-semibold uppercase tracking-widest border-b border-silver/30 pb-4">
                                    Bridesmaids
                                </h3>
                                <div className="space-y-3">
                                    {ENTOURAGE.bridesmaids.map((bridesmaid, i) => (
                                        <p key={i} className="text-charcoal text-lg">{bridesmaid}</p>
                                    ))}
                                </div>
                            </SilverCard>
                        </motion.div>
                    </div>

                    {/* Little Ones */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl mx-auto"
                    >
                        <h3 className="text-burgundy text-2xl mb-8 text-center font-display">Bearers & Flower Children</h3>

                        {/* Bearers - Full Width on Top */}
                        <SilverCard className="mb-6">
                            <h4 className="text-burgundy text-sm font-semibold uppercase tracking-widest mb-6 text-center">Bearers</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-silver/20 pb-4 md:pb-0 md:pr-6">
                                    <span className="text-silver-dark text-xs uppercase tracking-wider mb-2">Ring</span>
                                    <span className="text-charcoal font-medium text-center">{ENTOURAGE.bearers.ring}</span>
                                </div>
                                <div className="flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-silver/20 pb-4 md:pb-0 md:pr-6">
                                    <span className="text-silver-dark text-xs uppercase tracking-wider mb-2">Bible</span>
                                    <span className="text-charcoal font-medium text-center">{ENTOURAGE.bearers.bible}</span>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <span className="text-silver-dark text-xs uppercase tracking-wider mb-2">Coin</span>
                                    <span className="text-charcoal font-medium text-center">{ENTOURAGE.bearers.coin}</span>
                                </div>
                            </div>
                        </SilverCard>

                        {/* Flower Girls and Ladies - Side by Side Below */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <SilverCard className="h-full">
                                <h4 className="text-burgundy text-sm font-semibold uppercase tracking-widest mb-4 text-center">Flower Girls</h4>
                                <div className="space-y-2 text-center">
                                    {ENTOURAGE.flowerGirls.map((girl, i) => (
                                        <p key={`girl-${i}`} className="text-charcoal">{girl}</p>
                                    ))}
                                </div>
                            </SilverCard>

                            <SilverCard className="h-full">
                                <h4 className="text-burgundy text-sm font-semibold uppercase tracking-widest mb-4 text-center">Flower Ladies</h4>
                                <div className="space-y-2 text-center">
                                    {ENTOURAGE.flowerLadies.map((lady, i) => (
                                        <p key={`lady-${i}`} className="text-charcoal">{lady}</p>
                                    ))}
                                </div>
                            </SilverCard>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
