"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { ComponentType, ReactNode } from "react";
import {
    Camera,
    Martini,
    Utensils,
    Music2,
    PartyPopper,
    Heart,
    Glasses,
    Gem,
} from "lucide-react";

type TimelineEvent = {
    time: string;
    title: string;
    side: "left" | "right";
    icon: ComponentType<{ className?: string; size?: number }>;
};

const timelineEvents: TimelineEvent[] = [
    { time: "2:00 PM", title: "Wedding Ceremony", side: "right", icon: Gem },
    { time: "4:00 PM", title: "Snap & Snacks", side: "left", icon: Camera },
    { time: "5:15 PM", title: "Start of Reception Program", side: "right", icon: Heart },
    { time: "6:00 PM", title: "Dinner Time", side: "left", icon: Utensils },
    { time: "8:30 PM", title: "Send Off", side: "right", icon: Glasses },
];

export function GallerySection() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start 80%", "end 20%"],
    });
    const glowOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.2, 0.6, 0.7, 0.35]);
    const glowY = useTransform(scrollYProgress, [0, 1], [0, 420]);

    return (
        <section ref={sectionRef} id="timeline" className="relative overflow-hidden bg-[#f3f3f3] px-4 py-24 md:py-28">
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-multiply" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-burgundy/[0.03] via-transparent to-burgundy/[0.05]" />

            <div className="relative z-10 mx-auto max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center"
                >
                    <p
                        className="mb-3 text-xs font-semibold tracking-[0.35em] uppercase text-charcoal/60"
                        style={{ fontFamily: "var(--font-body)" }}
                    >
                        Daniel and Giada
                    </p>
                    <h2
                        className="text-5xl text-charcoal md:text-6xl"
                        style={{ fontFamily: "var(--font-display)", letterSpacing: "0.08em" }}
                    >
                        Wedding Timeline
                    </h2>
                </motion.div>

                <div className="relative mx-auto max-w-3xl pb-14">
                    <div className="absolute bottom-6 left-5 top-0 w-[2px] bg-charcoal/20 md:left-1/2 md:-translate-x-1/2" />
                    <motion.div
                        className="absolute left-5 top-0 z-[1] w-[3px] origin-top rounded-full bg-gradient-to-b from-burgundy/40 via-burgundy to-burgundy/40 shadow-[0_0_18px_rgba(114,47,55,0.35)] md:left-1/2 md:-translate-x-1/2"
                        style={{ scaleY: scrollYProgress, height: "calc(100% - 1.5rem)" }}
                    />
                    <motion.div
                        className="pointer-events-none absolute left-5 z-[2] h-20 w-20 -translate-x-1/2 rounded-full bg-burgundy/20 blur-2xl md:left-1/2"
                        style={{ opacity: glowOpacity, y: glowY }}
                    />

                    <div className="space-y-10 md:space-y-12">
                        {timelineEvents.map((item, index) => {
                            const Icon = item.icon;
                            const leftSide = item.side === "left";

                            return (
                                <motion.div
                                    key={`${item.time}-${item.title}`}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.45, delay: index * 0.06 }}
                                    whileHover={{ scale: 1.01 }}
                                    className="relative grid grid-cols-[40px_1fr] items-start gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-8"
                                >
                                    <div className={leftSide ? "hidden md:flex md:justify-end" : "hidden md:block"}>
                                        {leftSide && (
                                            <TimelineCard
                                                time={item.time}
                                                title={item.title}
                                                icon={<Icon size={22} />}
                                            />
                                        )}
                                    </div>

                                    <motion.div
                                        whileInView={{ boxShadow: "0 0 0 8px rgba(114,47,55,0.08)" }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.35, delay: index * 0.07 }}
                                        className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-burgundy/45 bg-[#f3f3f3]"
                                    >
                                        <span className="h-2.5 w-2.5 rounded-full bg-burgundy/80" />
                                    </motion.div>
                                    <div className={leftSide ? "hidden md:block" : "hidden md:flex"}>
                                        {!leftSide && (
                                            <TimelineCard
                                                time={item.time}
                                                title={item.title}
                                                icon={<Icon size={22} />}
                                            />
                                        )}
                                    </div>

                                    <div className="md:hidden">
                                        <TimelineCard
                                            time={item.time}
                                            title={item.title}
                                            icon={<Icon size={20} />}
                                        />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-center"
                >
                    <p
                        className="mb-3 text-4xl text-charcoal/75 md:text-5xl"
                        style={{ fontFamily: "var(--font-script)" }}
                    >
                        Thank You
                    </p>
                    <p
                        className="mx-auto max-w-3xl text-sm font-semibold tracking-[0.25em] uppercase text-charcoal/65 md:text-base"
                        style={{ fontFamily: "var(--font-body)" }}
                    >
                        We are grateful that you could be with us today.
                    </p>
                    <div className="mt-6 flex items-center justify-center gap-3 text-charcoal/55">
                        <Martini size={18} />
                        <Music2 size={18} />
                        <PartyPopper size={18} />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

type TimelineCardProps = {
    time: string;
    title: string;
    icon: ReactNode;
};

function TimelineCard({ time, title, icon }: TimelineCardProps) {
    return (
        <motion.div
            whileInView={{ opacity: [0.7, 1], y: [8, 0] }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="inline-flex w-full max-w-[390px] items-center gap-3 rounded-md border border-burgundy/15 bg-white/80 px-4 py-3 shadow-sm backdrop-blur-sm md:w-auto"
        >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-burgundy/10 text-burgundy/80">
                {icon}
            </div>
            <div>
                <p
                    className="text-[13px] font-bold tracking-[0.12em] uppercase text-charcoal"
                    style={{ fontFamily: "var(--font-body)" }}
                >
                    {time}
                </p>
                <p
                    className="text-[13px] tracking-[0.1em] uppercase text-charcoal/75 sm:whitespace-nowrap"
                    style={{ fontFamily: "var(--font-body)" }}
                >
                    {title}
                </p>
            </div>
        </motion.div>
    );
}
