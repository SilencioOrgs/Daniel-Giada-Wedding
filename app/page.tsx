"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/ui/Navigation";
import { HeroSection } from "@/components/landing/HeroSection";
import { VenueSection } from "@/components/landing/VenueSection";
import { DressCodeSection } from "@/components/landing/DressCodeSection";
import { StorySection } from "@/components/landing/StorySection";
import { GallerySection } from "@/components/landing/GallerySection";
import { EntourageSection } from "@/components/landing/EntourageSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { GiftGuideSection } from "@/components/landing/GiftGuideSection";
import { RSVPSection } from "@/components/landing/RSVPSection";
import { Footer } from "@/components/landing/Footer";
import { SectionDots } from "@/components/ui/SectionDots";
import { MusicPlayer } from "@/components/ui/MusicPlayer";

const SparkleEffect = dynamic(
  () => import("@/components/ui/SparkleEffect").then((mod) => mod.SparkleEffect),
  { ssr: false }
);

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    document.body.style.overflow = hasEntered ? "" : "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [hasEntered]);

  const handleEnterSite = () => {
    window.dispatchEvent(new Event("start-bgm"));
    setHasEntered(true);
  };

  return (
    <main className="bg-off-white min-h-screen text-charcoal selection:bg-silver/30">
      <AnimatePresence>
        {!hasEntered && (
          <motion.div
            key="entry-overlay"
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-charcoal/70 px-6"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.45, ease: "easeOut" } }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.24),transparent_38%),linear-gradient(135deg,rgba(91,8,28,0.88),rgba(43,43,43,0.94))]" />
            <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.08)_45%,transparent_100%)]" />
            <motion.div
              className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-silver/20 bg-white/10 px-7 py-10 text-center backdrop-blur-xl shadow-2xl md:px-12 md:py-14"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-silver/60 to-transparent" />
              <div className="pointer-events-none absolute inset-x-10 bottom-0 h-px bg-gradient-to-r from-transparent via-silver/40 to-transparent" />
              <p
                className="mb-4 text-[11px] uppercase tracking-[0.55em] text-silver-light md:text-xs"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Welcome To Our Wedding
              </p>
              <div className="mb-5 flex items-center justify-center gap-4">
                <div className="h-px w-12 bg-silver/45" />
                <span
                  className="text-xs uppercase tracking-[0.35em] text-off-white/80"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Daniel & Giada
                </span>
                <div className="h-px w-12 bg-silver/45" />
              </div>
              <h1
                className="mb-3 text-5xl leading-none text-white md:text-7xl"
                style={{ fontFamily: "var(--font-script)" }}
              >
                You Are Invited
              </h1>
              <p
                className="mx-auto mb-3 max-w-xl text-lg text-silver-light md:text-xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Join us in celebrating our love, laughter, and forever.
              </p>
              <p
                className="mx-auto mb-8 max-w-lg text-sm leading-7 text-off-white/85 md:mb-10 md:text-base"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Let the music pull you in-
                <br />
                our wedding story starts with a song and seat reserved especially for you.
              </p>
              <div className="mb-8 flex items-center justify-center gap-3 md:mb-10">
                <div className="h-px w-10 bg-burgundy-light/70" />
                <p
                  className="text-xs uppercase tracking-[0.4em] text-off-white/75 md:text-sm"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  May 16, 2026
                </p>
                <div className="h-px w-10 bg-burgundy-light/70" />
              </div>
              <motion.button
                onClick={handleEnterSite}
                className="inline-flex items-center justify-center rounded-full border border-silver/35 bg-white px-8 py-3 text-sm font-medium uppercase tracking-[0.35em] text-burgundy shadow-lg transition-colors hover:bg-silver-light"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{ fontFamily: "var(--font-body)" }}
              >
                Enter Our Wedding
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <SparkleEffect />
      <Navigation />
      <SectionDots />
      <MusicPlayer />
      <HeroSection />
      <VenueSection />
      <DressCodeSection />
      <StorySection />
      <GallerySection />
      <EntourageSection />
      <FAQSection />
      <GiftGuideSection />
      <RSVPSection />
      <Footer />
    </main>
  );
}
