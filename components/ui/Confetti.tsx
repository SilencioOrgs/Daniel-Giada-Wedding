"use client";

import { motion } from "framer-motion";

export function Confetti() {
    const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 2 + Math.random() * 2,
        color: ["#D4AF6F", "#F7E7CE", "#E8D5D0", "#D4D9D0", "#C5A572"][Math.floor(Math.random() * 5)],
    }));

    return (
        <div className="fixed inset-0 pointer-events-none z-[200] overflow-hidden">
            {confettiPieces.map((piece) => (
                <motion.div
                    key={piece.id}
                    initial={{ y: -20, x: `${piece.left}vw`, opacity: 1, rotate: 0 }}
                    animate={{
                        y: "110vh",
                        rotate: 360 + Math.random() * 360,
                        opacity: [1, 1, 0],
                    }}
                    transition={{
                        duration: piece.duration,
                        delay: piece.delay,
                        ease: "linear",
                    }}
                    className="absolute w-3 h-3"
                    style={{
                        backgroundColor: piece.color,
                        borderRadius: Math.random() > 0.5 ? "50%" : "0%",
                    }}
                />
            ))}
        </div>
    );
}
