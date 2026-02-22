import { LucideIcon } from "lucide-react";

interface IconBadgeProps {
    icon: LucideIcon;
    label: string;
    className?: string;
}

export function IconBadge({ icon: Icon, label, className = "" }: IconBadgeProps) {
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-burgundy flex items-center justify-center text-white shadow-lg shadow-burgundy/20">
                <Icon size={18} />
            </div>
            <span className="text-charcoal/80 font-medium text-sm md:text-base" style={{ fontFamily: "var(--font-body)" }}>
                {label}
            </span>
        </div>
    );
}
