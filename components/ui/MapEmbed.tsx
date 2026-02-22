"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, MapPin } from "lucide-react";

interface MapEmbedProps {
    isOpen: boolean;
    onClose: () => void;
    mapLink: string; // The Google Maps link
    locationName: string;
    address: string;
}

export function MapEmbed({ isOpen, onClose, mapLink, locationName, address }: MapEmbedProps) {
    // Extract coordinates or query from the map link if possible, or just use an embed URL manually constructed
    // For simplicity in this demo, we'll use a generic embed or the exact link if provided as embed src
    // A real implementation might parse the link or require an embed ID. 
    // We will use a placeholder embed or a search query embed.

    // Constructing a search embed URL (requires API key usually, but plain embed works for query)
    const embedUrl = `https://www.google.com/maps?q=${encodeURIComponent(locationName + " " + address)}&output=embed`;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[60] flex items-end md:items-center justify-center p-0 md:p-4 bg-charcoal/60 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="w-full md:w-[800px] h-[80vh] md:h-[600px] bg-white rounded-t-2xl md:rounded-2xl shadow-2xl overflow-hidden flex flex-col relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="p-4 bg-burgundy text-white flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <MapPin size={20} />
                                <h3 className="font-display text-lg tracking-wide">{locationName}</h3>
                            </div>
                            <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Map Iframe */}
                        <div className="flex-1 bg-silver-light relative">
                            <iframe
                                title={`Map to ${locationName}`}
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                style={{ border: 0 }}
                                src={embedUrl}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />

                            {/* Loading State Overlay (behind iframe, visible while loading) */}
                            <div className="absolute inset-0 flex items-center justify-center -z-10 text-silver-dark font-body">
                                Loading Map...
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="p-4 bg-off-white border-t border-silver-light flex justify-between items-center">
                            <p className="text-sm text-charcoal/70 truncate max-w-[60%] font-body">
                                {address}
                            </p>
                            <a
                                href={mapLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-burgundy text-white rounded-md text-sm hover:bg-burgundy-dark transition-colors font-body"
                            >
                                <span className="hidden sm:inline">Open in</span> Google Maps
                                <ExternalLink size={16} />
                            </a>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
