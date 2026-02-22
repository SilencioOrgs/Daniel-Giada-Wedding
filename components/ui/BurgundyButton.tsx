"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface BurgundyButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
    children: React.ReactNode;
    variant?: "solid" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    className?: string;
    isLoading?: boolean;
}

export const BurgundyButton = React.forwardRef<HTMLButtonElement, BurgundyButtonProps>(
    ({ children, variant = "solid", size = "md", className, isLoading, disabled, ...props }, ref) => {

        const variants = {
            solid: "bg-burgundy text-white hover:bg-burgundy-dark border border-transparent shadow-md hover:shadow-lg",
            outline: "bg-transparent text-burgundy border border-burgundy hover:bg-burgundy/5",
            ghost: "bg-transparent text-burgundy hover:bg-burgundy/10 border border-transparent",
        };

        const sizes = {
            sm: "px-4 py-2 text-xs",
            md: "px-6 py-3 text-sm",
            lg: "px-8 py-4 text-base",
        };

        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
                whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
                className={cn(
                    "inline-flex items-center justify-center rounded-lg font-medium tracking-wider uppercase transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-burgundy/50 disabled:opacity-50 disabled:cursor-not-allowed",
                    variants[variant],
                    sizes[size],
                    className
                )}
                disabled={disabled || isLoading}
                style={{ fontFamily: "var(--font-body)" }}
                {...props}
            >
                {isLoading ? (
                    <>
                        <svg
                            className="animate-spin -ml-1 mr-3 h-4 w-4 text-current"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                        Loading...
                    </>
                ) : (
                    children
                )}
            </motion.button>
        );
    }
);

BurgundyButton.displayName = "BurgundyButton";
