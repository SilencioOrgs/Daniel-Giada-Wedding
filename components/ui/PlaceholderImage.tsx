import { Camera } from "lucide-react";

interface PlaceholderImageProps {
    className?: string;
    label?: string;
    variant?: "hero" | "venue" | "venue-ceremony" | "venue-reception" | "story" | "gallery" | "rsvp";
}

export function PlaceholderImage({ className = "", label = "Image", variant = "gallery" }: PlaceholderImageProps) {
    const gradients = {
        hero: "bg-charcoal",
        venue: "bg-gradient-to-br from-silver-light via-off-white to-platinum",
        "venue-ceremony": "bg-gradient-to-br from-silver-dark via-silver to-platinum",
        "venue-reception": "bg-gradient-to-bl from-burgundy-dark via-burgundy to-burgundy-light",
        story: "bg-gradient-to-br from-platinum via-silver-light to-off-white",
        gallery: "bg-gradient-to-br from-silver-light via-platinum to-silver",
        rsvp: "bg-gradient-to-br from-charcoal via-dark-gray to-medium-gray",
    };

    // Hero variant shows plain black/charcoal background without icon
    if (variant === "hero") {
        return (
            <div className={`bg-charcoal ${className}`} />
        );
    }

    return (
        <div className={`${gradients[variant] || gradients.gallery} flex items-center justify-center ${className} relative overflow-hidden group`}>
            <div className="absolute inset-0 opacity-10 bg-[url('/noise.png')] mix-blend-overlay" />
            <div className={`text-center opacity-50 ${variant === 'rsvp' || variant === 'venue-reception' ? 'text-silver' : 'text-charcoal'} z-10 transition-transform duration-500 group-hover:scale-110`}>
                <Camera className={`mx-auto mb-2 ${variant === 'rsvp' || variant === 'venue-reception' ? 'text-silver' : 'text-burgundy'}`} size={32} />
                <p className="text-xs tracking-widest uppercase font-semibold" style={{ fontFamily: "var(--font-body)" }}>
                    {label}
                </p>
            </div>
        </div>
    );
}
