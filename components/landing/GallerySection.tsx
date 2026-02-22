"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GalleryLightbox } from "@/components/ui/GalleryLightbox";
import { Heart, ImageIcon, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImage {
    id: number;
    src: string;
    caption?: string;
    likes: number;
}

export function GallerySection() {
    // Gallery images
    const initialImages: GalleryImage[] = [
        // Pre-wedding
        { id: 1, src: "/photos/image0/IMG_2860.webp", caption: "Sweet Beginnings", likes: 0 },
        { id: 2, src: "/photos/image0/IMG_2971.webp", caption: "Hand in Hand", likes: 0 },
        { id: 3, src: "/photos/image0/IMG_2651.webp", caption: "Laughter & Love", likes: 0 },
        { id: 4, src: "/photos/image0/IMG_2549.webp", caption: "Casual Strolls", likes: 0 },
        { id: 5, src: "/photos/image0/IMG_2330.webp", caption: "Just Us", likes: 0 },
        { id: 6, src: "/photos/image0/IMG_2254.webp", caption: "Quiet Moments", likes: 0 },

        // Ceremony
        { id: 7, src: "https://placehold.co/800x1200/8B4049/FFF?text=Walking+Down+the+Aisle", caption: "Walking Down the Aisle", likes: 0 },
        { id: 8, src: "https://placehold.co/800x600/8B4049/FFF?text=The+Vows", caption: "The Vows", likes: 0 },
        { id: 9, src: "https://placehold.co/800x1000/8B4049/FFF?text=Altarside", caption: "Altarside", likes: 0 },
        { id: 10, src: "https://placehold.co/800x800/8B4049/FFF?text=First+Kiss", caption: "First Kiss", likes: 0 },
        { id: 11, src: "https://placehold.co/800x1200/8B4049/FFF?text=Just+Married", caption: "Just Married", likes: 0 },
        { id: 12, src: "https://placehold.co/800x600/8B4049/FFF?text=Confetti+Rain", caption: "Confetti Rain", likes: 0 },
        { id: 13, src: "https://placehold.co/800x1000/8B4049/FFF?text=Family+Blessings", caption: "Family Blessings", likes: 0 },

        // Reception
        { id: 14, src: "https://placehold.co/800x800/8B4049/FFF?text=First+Dance", caption: "First Dance", likes: 0 },
        { id: 15, src: "https://placehold.co/800x1200/8B4049/FFF?text=Party+Time", caption: "Party Time", likes: 0 },
        { id: 16, src: "https://placehold.co/800x600/8B4049/FFF?text=Cake+Cutting", caption: "Cake Cutting", likes: 0 },
        { id: 17, src: "https://placehold.co/800x1000/8B4049/FFF?text=Toasts", caption: "Toasts", likes: 0 },
        { id: 18, src: "https://placehold.co/800x800/8B4049/FFF?text=Evening+Lights", caption: "Evening Lights", likes: 0 },
        { id: 19, src: "https://placehold.co/800x1200/8B4049/FFF?text=Celebration", caption: "Celebration", likes: 0 },
        { id: 20, src: "https://placehold.co/800x600/8B4049/FFF?text=Sparkler+Exit", caption: "Sparkler Exit", likes: 0 },
    ];

    const [images, setImages] = useState<GalleryImage[]>(initialImages);
    const [likedImages, setLikedImages] = useState<Set<number>>(new Set());
    const [currentIndex, setCurrentIndex] = useState(0);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const [direction, setDirection] = useState(0);

    // Auto-play carousel
    useEffect(() => {
        const timer = setInterval(() => {
            handleNext();
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(timer);
    }, [currentIndex]);

    const handleLike = (imageId: number, e: React.MouseEvent) => {
        e.stopPropagation();

        setImages(prevImages =>
            prevImages.map(img =>
                img.id === imageId
                    ? { ...img, likes: likedImages.has(imageId) ? img.likes - 1 : img.likes + 1 }
                    : img
            )
        );

        setLikedImages(prev => {
            const newSet = new Set(prev);
            if (newSet.has(imageId)) {
                newSet.delete(imageId);
            } else {
                newSet.add(imageId);
            }
            return newSet;
        });

        // TODO: When Supabase is integrated, call API here to persist like
        // await supabase.from('image_likes').upsert({ image_id: imageId, ... })
    };

    const handleNext = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const handlePrev = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const goToSlide = (index: number) => {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
    };

    // Get visible images for the carousel (current + 2 on each side)
    const getVisibleImages = () => {
        const visible = [];
        for (let i = -2; i <= 2; i++) {
            const index = (currentIndex + i + images.length) % images.length;
            visible.push({ ...images[index], offset: i });
        }
        return visible;
    };

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.5,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.5,
        }),
    };

    const currentImage = images[currentIndex];
    const isLiked = likedImages.has(currentImage.id);

    return (
        <section id="gallery" className="relative py-24 px-4 overflow-hidden bg-gradient-to-b from-off-white to-white">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
            <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white to-transparent" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-2 mb-4 text-burgundy/80">
                        <ImageIcon size={18} />
                        <span className="text-xs tracking-[0.4em] uppercase font-semibold" style={{ fontFamily: "var(--font-body)" }}>
                            Captured Moments
                        </span>
                    </div>
                    <h2
                        className="text-burgundy text-5xl md:text-6xl mb-4"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        Our Gallery
                    </h2>
                    <p className="text-silver-dark text-sm tracking-wide max-w-2xl mx-auto">
                        {images.length} beautiful moments • Click to view larger
                    </p>
                </motion.div>

                {/* Carousel Container */}
                <div className="relative">
                    {/* Main Carousel */}
                    <div className="relative h-[500px] md:h-[600px] mb-8 flex items-center justify-center perspective-1000">
                        {/* Side Images (Background) */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            {getVisibleImages().map((image, idx) => {
                                if (image.offset === 0) return null; // Skip center image

                                const isLeft = image.offset < 0;
                                const distance = Math.abs(image.offset);
                                const translateX = image.offset * 280; // Spacing between images
                                const scale = 1 - (distance * 0.2);
                                const opacity = 1 - (distance * 0.3);
                                const zIndex = 10 - distance;

                                return (
                                    <motion.div
                                        key={`${image.id}-${idx}`}
                                        className="absolute w-64 md:w-80 h-80 md:h-96 cursor-pointer"
                                        style={{
                                            zIndex,
                                        }}
                                        initial={false}
                                        animate={{
                                            x: translateX,
                                            scale,
                                            opacity,
                                        }}
                                        transition={{
                                            duration: 0.5,
                                            ease: "easeInOut",
                                        }}
                                        onClick={() => goToSlide((currentIndex + image.offset + images.length) % images.length)}
                                    >
                                        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl border-4 border-white/50">
                                            <img
                                                src={image.src}
                                                alt={image.caption || "Gallery Image"}
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-black/20" />
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Center Image (Main Focus) */}
                        <AnimatePresence initial={false} custom={direction} mode="wait">
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.3 },
                                    scale: { duration: 0.3 },
                                }}
                                className="relative w-80 md:w-[500px] h-96 md:h-[500px] cursor-pointer z-20"
                                onClick={() => setLightboxIndex(currentIndex)}
                            >
                                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border-8 border-white group">
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-burgundy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                                    <img
                                        src={currentImage.src}
                                        alt={currentImage.caption || "Gallery Image"}
                                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                                    />

                                    {/* Caption */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                                        <p className="text-white text-xl md:text-2xl font-display tracking-wide text-center">
                                            {currentImage.caption}
                                        </p>
                                    </div>

                                    {/* Like Button & Counter */}
                                    <div className="absolute top-4 right-4 z-30 flex flex-col items-center gap-2">
                                        <motion.button
                                            onClick={(e) => handleLike(currentImage.id, e)}
                                            whileHover={{ scale: 1.2 }}
                                            whileTap={{ scale: 0.9 }}
                                            className={`p-3 rounded-full backdrop-blur-md transition-all duration-300 ${isLiked
                                                    ? "bg-burgundy text-white shadow-lg"
                                                    : "bg-white/30 text-white hover:bg-white/40"
                                                }`}
                                        >
                                            <Heart
                                                size={22}
                                                fill={isLiked ? "currentColor" : "none"}
                                                className="transition-all duration-300"
                                            />
                                        </motion.button>

                                        {/* Like Counter */}
                                        {currentImage.likes > 0 && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="bg-burgundy text-white text-sm font-bold px-3 py-1 rounded-full shadow-md"
                                            >
                                                {currentImage.likes}
                                            </motion.div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Arrows */}
                        <motion.button
                            onClick={handlePrev}
                            whileHover={{ scale: 1.1, x: -5 }}
                            whileTap={{ scale: 0.9 }}
                            className="absolute left-4 md:left-8 z-30 p-4 rounded-full bg-white/90 backdrop-blur-md text-burgundy shadow-xl hover:bg-burgundy hover:text-white transition-all duration-300"
                        >
                            <ChevronLeft size={28} />
                        </motion.button>

                        <motion.button
                            onClick={handleNext}
                            whileHover={{ scale: 1.1, x: 5 }}
                            whileTap={{ scale: 0.9 }}
                            className="absolute right-4 md:right-8 z-30 p-4 rounded-full bg-white/90 backdrop-blur-md text-burgundy shadow-xl hover:bg-burgundy hover:text-white transition-all duration-300"
                        >
                            <ChevronRight size={28} />
                        </motion.button>
                    </div>

                    {/* Pagination Dots */}
                    <div className="flex items-center justify-center gap-2 mt-8">
                        {images.map((_, index) => (
                            <motion.button
                                key={index}
                                onClick={() => goToSlide(index)}
                                whileHover={{ scale: 1.3 }}
                                whileTap={{ scale: 0.9 }}
                                className={`transition-all duration-300 rounded-full ${index === currentIndex
                                        ? "w-12 h-3 bg-burgundy"
                                        : "w-3 h-3 bg-silver/40 hover:bg-burgundy/50"
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Image Counter */}
                    <div className="text-center mt-6">
                        <p className="text-burgundy/60 text-sm tracking-wider">
                            {currentIndex + 1} / {images.length}
                        </p>
                    </div>
                </div>
            </div>

            <GalleryLightbox
                images={images.map(img => img.src)}
                currentIndex={lightboxIndex ?? 0}
                isOpen={lightboxIndex !== null}
                onClose={() => setLightboxIndex(null)}
                onNext={() => setLightboxIndex((prev) => prev !== null ? (prev + 1) % images.length : 0)}
                onPrev={() => setLightboxIndex((prev) => prev !== null ? (prev - 1 + images.length) % images.length : 0)}
                onIndexChange={setLightboxIndex}
            />
        </section>
    );
}
