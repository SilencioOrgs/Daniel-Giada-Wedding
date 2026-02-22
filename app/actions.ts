"use server";

import { supabase } from "@/lib/supabase";
import { sendEmail } from "@/lib/nodemailer";
import { render } from "@react-email/components";
import RSVPEmail from "@/components/emails/RSVPEmail";

// ============================================
// TYPES
// ============================================

export interface Guest {
    id: string;
    name: string;
    max_guests: number;
    status: "pending" | "confirmed" | "declined";
}

interface GuestSearchResult {
    success: boolean;
    guests?: { id: string; name: string; maxGuests: number; role: string; rsvpSubmitted: boolean }[];
    error?: string;
}

interface SubmitRSVPResult {
    success: boolean;
    message: string;
}

interface GuestStatusData {
    success: boolean;
    data?: {
        name: string;
        email: string;
        attending: boolean;
        guestCount: number;
    };
    error?: string;
}

// ============================================
// ACTIONS
// ============================================

export async function searchGuests(query: string): Promise<GuestSearchResult> {
    try {
        if (!query || !query.trim()) {
            return {
                success: false,
                guests: [],
            };
        }

        const searchTerm = query.trim().toLowerCase();

        // Search by name (case-insensitive, partial match) -> limit for dropdown
        const { data: guests, error } = await supabase
            .from("guests")
            .select("id, name, max_guests, status, rsvp_submitted_at")
            .ilike("name", `%${searchTerm}%`)
            .order("name")
            .limit(10); // Limit results for dropdown

        if (error) {
            console.error("Supabase search error:", error);
            return {
                success: false,
                error: "An error occurred during search.",
            };
        }

        return {
            success: true,
            guests: (guests || []).map(g => ({
                id: g.id,
                name: g.name,
                maxGuests: g.max_guests,
                role: "Guest",
                rsvpSubmitted: !!g.rsvp_submitted_at
            })),
        };

    } catch (error) {
        console.error("Search Guest Error:", error);
        return {
            success: false,
            error: "An unexpected error occurred.",
        };
    }
}

export async function submitRSVP(formData: FormData): Promise<SubmitRSVPResult> {
    try {
        const fullName = formData.get("fullName") as string;
        const email = formData.get("email") as string;
        const guestCount = parseInt(formData.get("guestCount") as string) || 1;
        const attending = formData.get("attending") === "yes";
        // Message removed per request

        if (!fullName || !email) {
            return { success: false, message: "Missing required fields." };
        }

        const cleanEmail = email.trim().toLowerCase();
        const cleanName = fullName.trim();

        // Find the guest by name
        const { data: guests, error: findError } = await supabase
            .from("guests")
            .select("id")
            .ilike("name", cleanName)
            .limit(1);

        if (findError || !guests || guests.length === 0) {
            return {
                success: false,
                message: "Guest not found. Please search for your name first.",
            };
        }

        const guest = guests[0];

        // Allow re-submissions by always updating the latest RSVP details.
        const { error: updateError } = await supabase
            .from("guests")
            .update({
                email: cleanEmail,
                attending,
                guest_count: guestCount,
                status: attending ? "confirmed" : "declined",
                rsvp_submitted_at: new Date().toISOString(),
            })
            .eq("id", guest.id);

        if (updateError) {
            console.error("Supabase update error:", updateError);
            return {
                success: false,
                message: "Failed to submit RSVP. Please try again.",
            };
        }

        console.log("New RSVP Received:", { cleanName, cleanEmail, attending, guestCount });

        // Send Confirmation Email
        try {
            const emailHtml = await render(
                RSVPEmail({
                    fullName: cleanName,
                    attending,
                    guestCount,
                })
            );

            await sendEmail({
                to: cleanEmail,
                subject: attending
                    ? "🎉 Your RSVP is Confirmed! | Daniel & Giada"
                    : "Thank You for Your Response | Daniel & Giada",
                html: emailHtml,
            });
        } catch (emailError) {
            console.error("Email sending failed:", emailError);
            // Don't fail the RSVP if email fails
        }

        return {
            success: true,
            message: attending
                ? "Thank you! Your attendance has been confirmed."
                : "Thank you for letting us know. We'll miss you!",
        };

    } catch (error) {
        console.error("Submit RSVP Error:", error);
        return {
            success: false,
            message: "An unexpected error occurred. Please try again.",
        };
    }
}

export async function checkRSVPStatus(email: string): Promise<GuestStatusData> {
    try {
        if (!email || !email.trim()) {
            return {
                success: false,
                error: "Please enter your email.",
            };
        }

        const cleanEmail = email.trim().toLowerCase();

        const { data: guests, error } = await supabase
            .from("guests")
            .select("name, email, attending, guest_count")
            .eq("email", cleanEmail)
            .not("rsvp_submitted_at", "is", null)
            .limit(1);

        if (error || !guests || guests.length === 0) {
            return {
                success: false,
                error: "No RSVP found for this email.",
            };
        }

        const guest = guests[0];

        return {
            success: true,
            data: {
                name: guest.name,
                email: guest.email,
                attending: guest.attending,
                guestCount: guest.guest_count,
            },
        };

    } catch (error) {
        console.error("Check Status Error:", error);
        return {
            success: false,
            error: "An unexpected error occurred.",
        };
    }
}

// ============================================
// MESSAGE BOARD ACTIONS
// ============================================

interface Message {
    id: string;
    name: string;
    message: string;
    created_at: string;
}

export async function getMessages(): Promise<{ messages: Message[] }> {
    const { data, error } = await supabase
        .from("messages")
        .select("id, name, message, created_at")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Failed to fetch messages:", error);
        return { messages: [] };
    }

    return { messages: data || [] };
}

export async function submitMessage(formData: FormData): Promise<{ success: boolean; message: string }> {
    try {
        const name = formData.get("name") as string;
        const message = formData.get("message") as string;

        if (!name || !message) {
            return { success: false, message: "Name and message are required." };
        }

        const { error } = await supabase
            .from("messages")
            .insert({
                name: name.trim(),
                message: message.trim(),
            });

        if (error) {
            console.error("Failed to post message:", error);
            return { success: false, message: "Failed to post message." };
        }

        return { success: true, message: "Message posted successfully!" };
    } catch (error) {
        console.error("Submit Message Error:", error);
        return { success: false, message: "Failed to post message." };
    }
}
