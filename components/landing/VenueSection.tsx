"use client";

import { motion } from "framer-motion";
import { VenueCard } from "@/components/ui/VenueCard";
import { WEDDING_DETAILS } from "@/lib/mockData";
import { MapPin } from "lucide-react";

export function VenueSection() {
    return (
        <section id="venue" className="relative py-20 px-4 md:px-8 overflow-hidden bg-platinum">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />

            {/* Geometric Background Shapes */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-white to-transparent opacity-50" />
            <div className="absolute -left-20 top-40 w-96 h-96 bg-burgundy/5 rounded-full blur-3xl" />
            <div className="absolute -right-20 bottom-40 w-96 h-96 bg-silver/10 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center mb-16 md:mb-24"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="flex items-center justify-center gap-2 mb-4 text-burgundy/60">
                        <MapPin size={16} />
                        <span className="text-xs tracking-[0.4em] uppercase font-semibold" style={{ fontFamily: "var(--font-body)" }}>
                            The Locations
                        </span>
                        <MapPin size={16} />
                    </div>

                    <h2
                        className="text-burgundy text-4xl md:text-5xl lg:text-6xl mb-6"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        Ceremony & Reception
                    </h2>

                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-burgundy/30 to-transparent mx-auto" />
                </motion.div>

                {/* Split Screen Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Ceremony */}
                    <VenueCard
                        type="ceremony"
                        venue={WEDDING_DETAILS.venue.ceremony}
                        date={WEDDING_DETAILS.date.full}
                    />

                    {/* Reception */}
                    <VenueCard
                        type="reception"
                        venue={WEDDING_DETAILS.venue.reception}
                        date={WEDDING_DETAILS.date.full}
                    />
                </div>
            </div>
        </section>
    );
}
