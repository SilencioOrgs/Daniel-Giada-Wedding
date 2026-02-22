"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { useEffect, useState } from "react";

interface GalleryLightboxProps {
    images: string[];
    currentIndex: number;
    isOpen: boolean;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
    onIndexChange: (index: number) => void;
}

export function GalleryLightbox({
    images,
    currentIndex,
    isOpen,
    onClose,
    onNext,
    onPrev,
    onIndexChange
}: GalleryLightboxProps) {
    const [isZoomed, setIsZoomed] = useState(false);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;

            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") onNext();
            if (e.key === "ArrowLeft") onPrev();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose, onNext, onPrev]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col"
                >
                    {/* Header Controls */}
                    <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-50">
                        <span className="text-silver text-sm tracking-widest font-mono">
                            {currentIndex + 1} / {images.length}
                        </span>

                        <div className="flex gap-4">
                            <button
                                onClick={() => setIsZoomed(!isZoomed)}
                                className="text-silver hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                            >
                                <ZoomIn size={20} />
                            </button>
                            <button
                                onClick={onClose}
                                className="text-silver hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                            >
                                <X size={24} />
                            </button>
                        </div>
                    </div>

                    {/* Main Image Container */}
                    <div className="flex-1 relative flex items-center justify-center overflow-hidden">
                        {/* Prev Button */}
                        <button
                            onClick={(e) => { e.stopPropagation(); onPrev(); }}
                            className="absolute left-4 z-40 p-3 rounded-full bg-black/20 hover:bg-black/50 text-white transition-all backdrop-blur-sm hidden md:block"
                        >
                            <ChevronLeft size={32} />
                        </button>

                        {/* Image */}
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: isZoomed ? 1.5 : 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="relative max-w-full max-h-full p-4 md:p-12 cursor-grab active:cursor-grabbing"
                            drag={isZoomed}
                            dragConstraints={{ left: -200, right: 200, top: -200, bottom: 200 }}
                        >
                            <img
                                src={images[currentIndex]}
                                alt={`Gallery ${currentIndex + 1}`}
                                className="max-h-[80vh] w-auto object-contain shadow-2xl rounded-sm select-none"
                                draggable={false}
                            />
                        </motion.div>

                        {/* Next Button */}
                        <button
                            onClick={(e) => { e.stopPropagation(); onNext(); }}
                            className="absolute right-4 z-40 p-3 rounded-full bg-black/20 hover:bg-black/50 text-white transition-all backdrop-blur-sm hidden md:block"
                        >
                            <ChevronRight size={32} />
                        </button>
                    </div>

                    {/* Thumbnail Navigation */}
                    <div className="h-20 bg-black/40 backdrop-blur-sm border-t border-white/10 p-2 overflow-x-auto flex gap-2 justify-center items-center">
                        {images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => onIndexChange(idx)}
                                className={`relative h-14 w-20 flex-shrink-0 overflow-hidden rounded-sm transition-all ${idx === currentIndex
                                        ? "ring-2 ring-burgundy opacity-100 scale-105"
                                        : "opacity-40 hover:opacity-70"
                                    }`}
                            >
                                <img
                                    src={img}
                                    alt={`Thumbnail ${idx}`}
                                    className="h-full w-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
