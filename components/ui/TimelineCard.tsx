"use client";

import { motion, AnimatePresence } from "framer-motion";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Heart, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface TimelineCardProps {
    story: {
        id: number;
        year: string;
        title: string;
        subtitle: string;
        excerpt: string;
        fullText: string;
        image: string;
        position: string;
    };
    index: number;
}

export function TimelineCard({ story, index }: TimelineCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, x: isEven ? -50 : 50, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`flex flex-col md:flex-row items-center gap-8 mb-16 md:mb-24 relative ${isEven ? "md:flex-row" : "md:flex-row-reverse"
                }`}
        >
            {/* Timeline Connector (Mobile only - Desktop uses central line) */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-silver-light md:hidden -z-10" />

            {/* Date Marker - Desktop */}
            <div className={`hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border-2 border-burgundy bg-off-white items-center justify-center z-10 shadow-lg`}>
                <span className="text-burgundy font-bold text-xs">{story.year}</span>
            </div>

            {/* Image Side */}
            <div className="w-full md:w-[calc(50%-24px)] pl-12 md:pl-0">
                <div className="relative group overflow-hidden rounded-lg shadow-xl aspect-[4/3]">
                    <div className="absolute inset-0 bg-burgundy/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                    <PlaceholderImage
                        variant="story"
                        label={story.year}
                        className="w-full h-full transform transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Floating Heart Icon */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                        className="absolute top-4 right-4 z-20 bg-white/80 backdrop-blur-sm p-2 rounded-full text-burgundy shadow-sm"
                    >
                        <Heart size={16} fill="currentColor" />
                    </motion.div>
                </div>
            </div>

            {/* Content Side */}
            <div className="w-full md:w-[calc(50%-24px)] pl-12 md:pl-0">
                <div
                    className={`bg-white/40 backdrop-blur-md border border-white/60 p-6 md:p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group ${isExpanded ? "ring-1 ring-burgundy/30" : ""
                        }`}
                >
                    {/* Decorative Background */}
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                        <Heart size={120} />
                    </div>

                    <div className="relative z-10">
                        <span className="inline-block md:hidden text-burgundy font-bold text-sm mb-2 px-3 py-1 bg-burgundy/10 rounded-full">
                            {story.year}
                        </span>

                        <h3 className="text-xl md:text-2xl text-burgundy mb-2" style={{ fontFamily: "var(--font-display)" }}>
                            {story.title}
                        </h3>

                        <p className="text-silver-dark italic text-sm mb-4" style={{ fontFamily: "var(--font-body)" }}>
                            {story.subtitle}
                        </p>

                        <div className="h-px w-12 bg-silver mb-4" />

                        <div className="text-charcoal/80 text-sm md:text-base leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
                            <AnimatePresence>
                                {!isExpanded ? (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        {story.excerpt}
                                    </motion.p>
                                ) : (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        {story.fullText}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>

                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="flex items-center gap-2 text-burgundy text-xs uppercase tracking-widest hover:text-burgundy-light transition-colors group/btn"
                        >
                            {isExpanded ? (
                                <>
                                    Read Less <ChevronUp size={14} className="group-hover/btn:-translate-y-1 transition-transform" />
                                </>
                            ) : (
                                <>
                                    Read More <ChevronDown size={14} className="group-hover/btn:translate-y-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
