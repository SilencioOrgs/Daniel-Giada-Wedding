"use client";

import { motion, useAnimationFrame, AnimatePresence } from "framer-motion";
import { Heart, Grid3X3, X } from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

// Our Story photos with captions
const ourStoryPhotos = [
    { id: 1, src: "/ourstory/Friends.webp", caption: "Friends" },
    { id: 2, src: "/ourstory/First Date 2022.webp", caption: "First Date 2022" },
    { id: 3, src: "/ourstory/Bake date.webp", caption: "Bake Date" },
    { id: 4, src: "/ourstory/More dates.webp", caption: "More Dates" },
    { id: 5, src: "/ourstory/First Trip.webp", caption: "First Trip" },
    { id: 6, src: "/ourstory/Another trip.webp", caption: "Another Trip" },
    { id: 7, src: "/ourstory/Proposal 2024.webp", caption: "Proposal 2024" },
    { id: 8, src: "/ourstory/Wedding attendees hh.webp", caption: "Wedding Attendees" },
];

const TOTAL_PHOTOS = ourStoryPhotos.length;

export function StorySection() {
    const [xPosition, setXPosition] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const [showGrid, setShowGrid] = useState(false);
    const [likes, setLikes] = useState<Record<number, number>>({});
    const [likedByMe, setLikedByMe] = useState<Record<number, boolean>>({});
    const [likingId, setLikingId] = useState<number | null>(null);
    const [isPaused, setIsPaused] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState<typeof ourStoryPhotos[0] | null>(null);

    // Calculate total width for seamless looping
    const cardWidth = 358; // ~350px card + 8px gap
    const totalWidth = ourStoryPhotos.length * cardWidth;

    // Auto-scroll animation
    useAnimationFrame(() => {
        if (isPaused || showGrid || selectedPhoto) return;
        const speed = 0.5;
        setXPosition((prev) => {
            const newPos = prev - speed;
            if (newPos < -totalWidth) return 0;
            return newPos;
        });
    });

    // Load likes from Supabase
    const fetchLikes = useCallback(async () => {
        try {
            const { data, error } = await supabase
                .from("photo_likes")
                .select("photo_id, like_count");

            if (!error && data) {
                const likesMap: Record<number, number> = {};
                data.forEach((row: { photo_id: number; like_count: number }) => {
                    likesMap[row.photo_id] = row.like_count;
                });
                setLikes(likesMap);
            }
        } catch (err) {
            console.error("Failed to fetch likes:", err);
        }
    }, []);

    // Load "liked by me" from localStorage
    useEffect(() => {
        fetchLikes();
        try {
            const stored = localStorage.getItem("photo_likes_mine");
            if (stored) setLikedByMe(JSON.parse(stored));
        } catch { }
    }, [fetchLikes]);

    const handleLike = async (photoId: number) => {
        if (likingId !== null) return;
        setLikingId(photoId);

        const alreadyLiked = likedByMe[photoId];
        const increment = alreadyLiked ? -1 : 1;

        setLikes((prev) => ({
            ...prev,
            [photoId]: Math.max(0, (prev[photoId] || 0) + increment),
        }));
        const newLikedByMe = { ...likedByMe, [photoId]: !alreadyLiked };
        setLikedByMe(newLikedByMe);
        localStorage.setItem("photo_likes_mine", JSON.stringify(newLikedByMe));

        try {
            const { data: existing } = await supabase
                .from("photo_likes")
                .select("photo_id, like_count")
                .eq("photo_id", photoId)
                .single();

            if (existing) {
                await supabase
                    .from("photo_likes")
                    .update({ like_count: Math.max(0, existing.like_count + increment) })
                    .eq("photo_id", photoId);
            } else if (!alreadyLiked) {
                await supabase
                    .from("photo_likes")
                    .insert({ photo_id: photoId, like_count: 1 });
            }
        } catch (err) {
            console.error("Like error:", err);
        } finally {
            setLikingId(null);
        }
    };

    // Shared card render with real images
    const renderPhotoCard = (item: typeof ourStoryPhotos[0], keyPrefix: string, className: string) => (
        <div
            key={`${keyPrefix}-${item.id}`}
            className={`${className} group cursor-pointer`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onClick={() => setSelectedPhoto(item)}
        >
            <div className="relative h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80 hover:border-white hover:shadow-burgundy/30 transition-all duration-500 hover:scale-[1.02]">
                {/* Actual Image */}
                <Image
                    src={item.src}
                    alt={item.caption}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 280px, 350px"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p
                        className="text-white text-sm md:text-base font-semibold tracking-wide drop-shadow-lg"
                        style={{ fontFamily: "var(--font-body)" }}
                    >
                        {item.caption}
                    </p>
                </div>

                {/* Like Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleLike(item.id);
                    }}
                    className="absolute top-4 right-4 flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-md hover:bg-white transition-all duration-200 hover:scale-110 group/like z-10"
                >
                    <Heart
                        size={16}
                        className={`transition-colors duration-200 ${likedByMe[item.id]
                            ? "text-burgundy fill-burgundy"
                            : "text-burgundy/50 group-hover/like:text-burgundy"
                            }`}
                        fill={likedByMe[item.id] ? "currentColor" : "none"}
                    />
                    <span
                        className="text-xs font-semibold text-burgundy tabular-nums"
                        style={{ fontFamily: "var(--font-body)" }}
                    >
                        {likes[item.id] || 0}
                    </span>
                </button>
            </div>
        </div>
    );

    return (
        <>
            <section id="story" className="relative py-24 overflow-hidden bg-gradient-to-b from-white via-off-white to-white" ref={containerRef}>
                {/* Background Texture */}
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />

                {/* Floating Background Elements */}
                <div className="absolute top-20 left-10 w-64 h-64 bg-burgundy/5 rounded-full blur-3xl -z-10 animate-pulse" />
                <div className="absolute bottom-40 right-10 w-96 h-96 bg-silver/10 rounded-full blur-3xl -z-10" />

                <div className="relative z-10">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16 px-4"
                    >
                        <div className="flex items-center justify-center gap-2 mb-4 text-burgundy/80">
                            <Heart size={18} fill="currentColor" />
                            <span className="text-xs tracking-[0.4em] uppercase font-semibold" style={{ fontFamily: "var(--font-body)" }}>
                                Our Journey
                            </span>
                            <Heart size={18} fill="currentColor" />
                        </div>
                        <h2
                            className="text-burgundy text-5xl md:text-6xl lg:text-7xl mb-6"
                            style={{ fontFamily: "var(--font-display)" }}
                        >
                            Love Story
                        </h2>
                        <p className="max-w-2xl mx-auto text-charcoal/80 text-lg md:text-xl font-light italic" style={{ fontFamily: "var(--font-body)" }}>
                            &quot;I&apos;m gonna love you when our hair is turnin&apos; gray. We&apos;ll have a cardboard box of photos of the life we&apos;ve made.&quot;
                        </p>
                    </motion.div>

                    {/* Auto-Scrolling Horizontal Carousel */}
                    <div className="relative h-[400px] md:h-[500px] overflow-hidden">
                        <motion.div
                            style={{ x: xPosition }}
                            className="flex gap-6 md:gap-8 absolute left-0 h-full items-center"
                        >
                            {ourStoryPhotos.map((item) =>
                                renderPhotoCard(item, "first", "flex-shrink-0 w-[280px] md:w-[350px] h-[320px] md:h-[400px]")
                            )}
                            {ourStoryPhotos.map((item) =>
                                renderPhotoCard(item, "second", "flex-shrink-0 w-[280px] md:w-[350px] h-[320px] md:h-[400px]")
                            )}
                            {ourStoryPhotos.map((item) =>
                                renderPhotoCard(item, "third", "flex-shrink-0 w-[280px] md:w-[350px] h-[320px] md:h-[400px]")
                            )}
                        </motion.div>

                        {/* Gradient Fade on Edges */}
                        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/50 to-transparent pointer-events-none z-10" />
                        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/50 to-transparent pointer-events-none z-10" />
                    </div>

                    {/* View All + Ornament */}
                    <div className="flex flex-col items-center mt-12 gap-6">
                        {/* View All Button */}
                        <motion.button
                            onClick={() => setShowGrid(true)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-3 px-8 py-3.5 rounded-full border-2 border-burgundy/30 bg-white/60 backdrop-blur-sm text-burgundy hover:bg-burgundy hover:text-white hover:border-burgundy transition-all duration-300 shadow-sm hover:shadow-lg group"
                        >
                            <Grid3X3 size={18} className="group-hover:rotate-90 transition-transform duration-300" />
                            <span className="text-sm font-semibold tracking-wider uppercase" style={{ fontFamily: "var(--font-body)" }}>
                                View All Photos
                            </span>
                        </motion.button>

                        {/* Bottom Ornament */}
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="bg-burgundy text-white p-6 rounded-full shadow-2xl"
                        >
                            <Heart size={32} fill="currentColor" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Grid View Modal */}
            <AnimatePresence>
                {showGrid && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-charcoal/90 backdrop-blur-md overflow-y-auto"
                    >
                        {/* Header */}
                        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-silver/30 px-6 py-4">
                            <div className="max-w-7xl mx-auto flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Heart size={20} className="text-burgundy" fill="currentColor" />
                                    <h3
                                        className="text-burgundy text-2xl"
                                        style={{ fontFamily: "var(--font-display)" }}
                                    >
                                        Our Story
                                    </h3>
                                    <span className="text-silver-dark text-sm ml-2">
                                        {TOTAL_PHOTOS} photos
                                    </span>
                                </div>
                                <button
                                    onClick={() => setShowGrid(false)}
                                    className="flex items-center gap-2 text-charcoal hover:text-burgundy transition-colors p-2 rounded-lg hover:bg-burgundy/5"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                        </div>

                        {/* Grid */}
                        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
                            <motion.div
                                initial="hidden"
                                animate="show"
                                variants={{
                                    hidden: {},
                                    show: { transition: { staggerChildren: 0.06 } },
                                }}
                                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6"
                            >
                                {ourStoryPhotos.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        variants={{
                                            hidden: { opacity: 0, y: 20, scale: 0.9 },
                                            show: { opacity: 1, y: 0, scale: 1 },
                                        }}
                                    >
                                        {renderPhotoCard(item, "grid", "w-full aspect-[3/4]")}
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedPhoto && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-lg flex items-center justify-center p-4"
                        onClick={() => setSelectedPhoto(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative max-w-4xl max-h-[85vh] w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative w-full h-[70vh] rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src={selectedPhoto.src}
                                    alt={selectedPhoto.caption}
                                    fill
                                    className="object-contain bg-black"
                                    sizes="(max-width: 768px) 100vw, 80vw"
                                    priority
                                />
                            </div>
                            <div className="text-center mt-4">
                                <p
                                    className="text-white text-lg font-semibold tracking-wide"
                                    style={{ fontFamily: "var(--font-body)" }}
                                >
                                    {selectedPhoto.caption}
                                </p>
                            </div>
                            <button
                                onClick={() => setSelectedPhoto(null)}
                                className="absolute -top-2 -right-2 bg-white/90 text-charcoal hover:bg-white hover:text-burgundy p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                            >
                                <X size={20} />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
