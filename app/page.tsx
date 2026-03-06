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
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_45%),linear-gradient(135deg,rgba(128,0,32,0.75),rgba(43,43,43,0.92))]" />
            <motion.div
              className="relative w-full max-w-xl rounded-[2rem] border border-silver/25 bg-off-white/12 p-8 text-center backdrop-blur-xl shadow-2xl"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <p
                className="mb-3 text-sm uppercase tracking-[0.5em] text-silver-light"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Daniel & Giada
              </p>
              <h1
                className="mb-4 text-5xl text-white md:text-6xl"
                style={{ fontFamily: "var(--font-script)" }}
              >
                Open the Invitation
              </h1>
              <p
                className="mx-auto mb-8 max-w-md text-sm leading-7 text-off-white/85 md:text-base"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Enter the wedding website to begin the experience with music.
              </p>
              <motion.button
                onClick={handleEnterSite}
                className="inline-flex items-center justify-center rounded-full border border-silver/35 bg-white px-8 py-3 text-sm font-medium uppercase tracking-[0.35em] text-burgundy shadow-lg transition-colors hover:bg-silver-light"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{ fontFamily: "var(--font-body)" }}
              >
                Enter Site
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
