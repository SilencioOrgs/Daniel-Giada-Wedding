"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const sections = [
    { id: "home", label: "Home" },
    { id: "venue", label: "Venue" },
    { id: "dress-code", label: "Dress Code" },
    { id: "story", label: "Story" },
    { id: "entourage", label: "Entourage" },
    { id: "gallery", label: "Gallery" },
    { id: "gift-guide", label: "Gift Guide" },
    { id: "rsvp", label: "RSVP" },
];

export function SectionDots() {
    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight / 2;

            for (const section of sections) {
                const element = document.getElementById(section.id);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section.id);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Initial check

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-3">
            {sections.map((section) => (
                <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className="group relative flex items-center justify-end"
                    aria-label={`Go to ${section.label}`}
                >
                    {/* Label on hover */}
                    <span className="absolute right-6 px-2 py-1 bg-charcoal/90 text-silver-light text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-silver/20">
                        {section.label}
                    </span>

                    {/* Dot */}
                    <motion.div
                        className={`w-2.5 h-2.5 rounded-full border-2 transition-all duration-300 ${activeSection === section.id
                            ? "bg-burgundy border-burgundy scale-125"
                            : "bg-transparent border-silver/40 hover:border-silver"
                            }`}
                        animate={{
                            scale: activeSection === section.id ? 1.3 : 1,
                        }}
                        transition={{ duration: 0.2 }}
                    />
                </button>
            ))}
        </div>
    );
}
