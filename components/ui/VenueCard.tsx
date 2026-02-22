"use client";

import { motion, AnimatePresence } from "framer-motion";
import { IconBadge } from "@/components/ui/IconBadge";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { Clock, Calendar, Map, X, Info } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

interface VenueCardProps {
    type: "ceremony" | "reception";
    venue: {
        name: string;
        address: string;
        time: string;
        mapLink: string;
        presiders?: string[];
    };
    date: string;
}

const RECEPTION_IMAGES = [
    { src: "/Patio De Manila.png", alt: "Patio De Manila" },
    { src: "/patiodemanila.jpeg", alt: "Patio De Manila Interior" },
    { src: "/patiodemanila.jpg", alt: "Patio De Manila Venue" },
];

export function VenueCard({ type, venue, date }: VenueCardProps) {
    const [isMapOpen, setIsMapOpen] = useState(false);
    const [lightboxImage, setLightboxImage] = useState<string | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    return (
        <>
            <motion.div
                className="relative h-full min-h-[500px] md:min-h-[800px] flex flex-col group overflow-hidden"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                {/* Background Image */}
                <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-105">
                    {type === "ceremony" ? (
                        <Image
                            src="/church.png"
                            alt="San Fernando De Dilao Parish Church"
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                    ) : (
                        <div className="w-full h-full grid grid-cols-2 grid-rows-2">
                            {/* First image takes full left column */}
                            <div
                                className="row-span-2 relative cursor-pointer overflow-hidden"
                                onClick={() => setLightboxImage(RECEPTION_IMAGES[0].src)}
                            >
                                <Image
                                    src={RECEPTION_IMAGES[0].src}
                                    alt={RECEPTION_IMAGES[0].alt}
                                    fill
                                    className="object-cover hover:scale-110 transition-transform duration-500"
                                    sizes="(max-width: 1024px) 50vw, 25vw"
                                />
                            </div>
                            {/* Second image top right */}
                            <div
                                className="relative cursor-pointer overflow-hidden"
                                onClick={() => setLightboxImage(RECEPTION_IMAGES[1].src)}
                            >
                                <Image
                                    src={RECEPTION_IMAGES[1].src}
                                    alt={RECEPTION_IMAGES[1].alt}
                                    fill
                                    className="object-cover hover:scale-110 transition-transform duration-500"
                                    sizes="(max-width: 1024px) 50vw, 25vw"
                                />
                            </div>
                            {/* Third image bottom right */}
                            <div
                                className="relative cursor-pointer overflow-hidden"
                                onClick={() => setLightboxImage(RECEPTION_IMAGES[2].src)}
                            >
                                <Image
                                    src={RECEPTION_IMAGES[2].src}
                                    alt={RECEPTION_IMAGES[2].alt}
                                    fill
                                    className="object-cover hover:scale-110 transition-transform duration-500"
                                    sizes="(max-width: 1024px) 50vw, 25vw"
                                />
                            </div>
                        </div>
                    )}
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent" />
                </div>

                {/* Content Container */}
                <div className="relative z-10 flex-1 flex flex-col justify-end p-6 md:p-12">

                    {/* Header Badge */}
                    <div className="self-start mb-auto pt-8">
                        <span className="bg-burgundy text-white px-4 py-1.5 rounded-full text-xs tracking-[0.2em] uppercase font-semibold shadow-lg">
                            {type === "ceremony" ? "The Vows" : "The Celebration"}
                        </span>
                    </div>

                    {/* View Details Button */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex justify-center"
                    >
                        <button
                            onClick={() => setIsDetailsOpen(true)}
                            className="px-8 py-3 bg-white/15 backdrop-blur-md border border-white/30 text-white rounded-full transition-all hover:bg-white/25 shadow-lg hover:shadow-xl flex items-center gap-2 group/btn"
                        >
                            <Info size={18} />
                            <span className="uppercase tracking-widest text-xs font-bold">View Details</span>
                        </button>
                    </motion.div>
                </div>
            </motion.div>

            <MapEmbed
                isOpen={isMapOpen}
                onClose={() => setIsMapOpen(false)}
                mapLink={venue.mapLink}
                locationName={venue.name}
                address={venue.address}
            />

            {/* Glassmorphism Details Popup */}
            <AnimatePresence>
                {isDetailsOpen && (
                    <motion.div
                        className="fixed inset-0 z-[9998] bg-black/60 flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsDetailsOpen(false)}
                    >
                        <motion.div
                            className="relative w-full max-w-md bg-white/20 backdrop-blur-2xl border border-white/30 rounded-2xl p-8 shadow-2xl"
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="absolute top-3 right-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-1.5 transition-colors"
                                onClick={() => setIsDetailsOpen(false)}
                            >
                                <X size={18} />
                            </button>

                            <div className="text-center mb-6">
                                <span className="bg-burgundy text-white px-3 py-1 rounded-full text-[10px] tracking-[0.2em] uppercase font-semibold">
                                    {type === "ceremony" ? "The Vows" : "The Celebration"}
                                </span>
                            </div>

                            <h3 className="text-2xl md:text-3xl text-white mb-2 font-display text-center">
                                {venue.name}
                            </h3>
                            <p className="text-white/70 mb-6 font-body text-sm text-center border-b border-white/20 pb-4">
                                {venue.address}
                            </p>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-3 text-white">
                                    <div className="w-8 h-8 rounded-full bg-burgundy/80 flex items-center justify-center flex-shrink-0">
                                        <Clock size={14} />
                                    </div>
                                    <span className="text-sm font-body">{venue.time}</span>
                                </div>
                                <div className="flex items-center gap-3 text-white">
                                    <div className="w-8 h-8 rounded-full bg-burgundy/80 flex items-center justify-center flex-shrink-0">
                                        <Calendar size={14} />
                                    </div>
                                    <span className="text-sm font-body">{date}</span>
                                </div>
                            </div>

                            {type === "ceremony" && venue.presiders && (
                                <div className="mb-6">
                                    <p className="text-xs uppercase tracking-widest text-white/60 mb-2 font-semibold">Officiated By</p>
                                    <ul className="space-y-1">
                                        {venue.presiders.map((presider, idx) => (
                                            <li key={idx} className="text-sm text-white/80 font-body italic">
                                                {presider}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <button
                                onClick={() => {
                                    setIsDetailsOpen(false);
                                    setIsMapOpen(true);
                                }}
                                className="w-full py-3 bg-burgundy hover:bg-burgundy-dark text-white rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                            >
                                <Map size={18} />
                                <span className="uppercase tracking-widest text-xs font-bold">View Location</span>
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Lightbox Modal for Reception Images */}
            <AnimatePresence>
                {lightboxImage && (
                    <motion.div
                        className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setLightboxImage(null)}
                    >
                        <button
                            className="absolute top-4 right-4 text-white/80 hover:text-white z-10 bg-black/40 rounded-full p-2"
                            onClick={() => setLightboxImage(null)}
                        >
                            <X size={24} />
                        </button>
                        <motion.div
                            className="relative w-full max-w-3xl max-h-[85vh] aspect-auto"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={lightboxImage}
                                alt="Venue photo"
                                width={1200}
                                height={800}
                                className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
