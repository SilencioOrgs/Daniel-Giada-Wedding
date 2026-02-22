import { render } from "@react-email/components";
import RSVPEmail from "@/components/emails/RSVPEmail";
import { NextResponse } from "next/server";

export async function GET() {
    const emailHtml = await render(
        RSVPEmail({
            fullName: "John Marie F. Nepomuceno",
            attending: true,
            guestCount: 1,
            baseUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        })
    );

    return new NextResponse(emailHtml, {
        headers: {
            "Content-Type": "text/html",
        },
    });
}
