"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
    index: number;
}

function FAQItem({ question, answer, isOpen, onClick, index }: FAQItemProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="mb-3"
        >
            <button
                onClick={onClick}
                className={`w-full text-left p-4 md:p-5 rounded-lg border transition-all duration-300 flex justify-between items-center group backdrop-blur-sm ${isOpen
                    ? "bg-white/80 border-burgundy/20 shadow-md"
                    : "bg-white/40 border-white/50 hover:bg-white/60 hover:border-burgundy/10"
                    }`}
            >
                <span
                    className={`font-medium pr-4 transition-colors ${isOpen ? "text-burgundy" : "text-charcoal group-hover:text-burgundy"
                        }`}
                    style={{ fontFamily: "var(--font-body)" }}
                >
                    {question}
                </span>
                <ChevronDown
                    className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-burgundy" : "text-silver-dark/50"
                        }`}
                    size={20}
                />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="p-4 md:p-6 pt-2 text-dark-gray text-sm md:text-base leading-relaxed ml-2 md:ml-4 border-l-2 border-burgundy/10">
                            <p style={{ fontFamily: "var(--font-body)" }}>{answer}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: "What does RSVP mean?",
            answer: "RSVP is a request for your response, letting us know whether you will be able to attend our wedding."
        },
        {
            question: "How do I RSVP?",
            answer: "Please confirm your attendance by completing the RSVP form on this website. Kindly submit one response per invitation."
        },
        {
            question: "When should I RSVP?",
            answer: "We respectfully request that all responses be submitted on or before April 15, 2026."
        },
        {
            question: "May I bring a plus one?",
            answer: "Due to limited seating, we are only able to accommodate guests whose names appear on the invitation and RSVP form. Additional guests cannot be accommodated."
        },
        {
            question: "Are children invited?",
            answer: "Our celebration is planned with a limited guest list. The only kids attending the wedding are those whom we requested."
        },
        {
            question: "What if I am unable to attend?",
            answer: "While we will miss you, we kindly ask that you still submit an RSVP indicating that you are unable to attend."
        },
        {
            question: "What if I miss the RSVP deadline?",
            answer: "To finalize our arrangements, guests who have not responded by the deadline may be marked as unable to attend."
        },
        {
            question: "Can I update my RSVP after submitting?",
            answer: "If your plans change after submitting your response, please contact us as soon as possible so we can make the necessary adjustments."
        },
        {
            question: "Who can I contact for RSVP concerns?",
            answer: "For any questions regarding the RSVP, please contact Daniel or Giada at messenger."
        }
    ];

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faqs" className="relative py-16 md:py-24 overflow-hidden bg-off-white">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-tr from-silver-light/20 via-transparent to-silver-light/20" />

            <div className="relative z-10 max-w-3xl mx-auto px-6">
                <motion.div
                    className="text-center mb-12 md:mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <p
                        className="text-silver-dark text-xs tracking-[0.4em] uppercase mb-4"
                        style={{ fontFamily: "var(--font-body)" }}
                    >
                        Details
                    </p>
                    <h2
                        className="text-burgundy text-4xl md:text-5xl lg:text-6xl mb-6"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        Read Before You RSVP
                    </h2>
                    {/* Horizontal line divider */}
                    <div className="w-24 h-px bg-silver mx-auto" />
                </motion.div>

                <div className="space-y-2">
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === index}
                            onClick={() => toggleFAQ(index)}
                            index={index}
                        />
                    ))}
                </div>

                {/* Bottom note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="mt-16 text-center"
                >
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/50 border border-silver/30 backdrop-blur-sm">
                        <HelpCircle size={16} className="text-burgundy" />
                        <span className="text-silver-dark text-xs tracking-wider uppercase font-medium">Thank you for your cooperation</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
