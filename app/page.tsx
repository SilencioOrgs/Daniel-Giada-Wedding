"use client";

import dynamic from "next/dynamic";
import { Navigation } from "@/components/ui/Navigation";
import { HeroSection } from "@/components/landing/HeroSection";
import { VenueSection } from "@/components/landing/VenueSection";
import { DressCodeSection } from "@/components/landing/DressCodeSection";
import { StorySection } from "@/components/landing/StorySection";
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
  return (
    <main className="bg-off-white min-h-screen text-charcoal selection:bg-silver/30">
      <SparkleEffect />
      <Navigation />
      <SectionDots />
      <MusicPlayer />
      <HeroSection />
      <VenueSection />
      <DressCodeSection />
      <StorySection />
      <EntourageSection />
      <FAQSection />
      <GiftGuideSection />
      <RSVPSection />
      <Footer />
    </main>
  );
}
