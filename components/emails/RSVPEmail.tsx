import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Preview,
    Section,
    Text,
    Column,
    Row,
} from "@react-email/components";

interface RSVPEmailProps {
    fullName: string;
    attending: boolean;
    guestCount: number;
}

export default function RSVPEmail({
    fullName = "Guest",
    attending = true,
    guestCount = 1,
    baseUrl = "",
}: RSVPEmailProps & { baseUrl?: string }) {
    const previewText = attending
        ? `Thank you for confirming your attendance, ${fullName}!`
        : `We'll miss you, ${fullName}. Thank you for letting us know.`;

    const firstName = fullName.split(" ")[0];

    return (
        <Html>
            <Head>
                <style>
                    {`
                        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap');
                        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&display=swap');
                    `}
                </style>
            </Head>
            <Preview>{previewText}</Preview>
            <Body style={main}>
                <Container style={container}>
                    {/* Elegant Gold Header Bar */}
                    <Section style={headerBar}>
                        <Img
                            src={`${baseUrl}/Picture1.png`}
                            alt="Daniel & Giada"
                            width="80"
                            height="80"
                            style={{ margin: "0 auto", objectFit: "contain" }}
                        />
                    </Section>

                    {/* Main Content Area */}
                    <Section style={contentArea}>
                        {/* Decorative Element */}
                        <Text style={decorativeElement}>
                            ─────── ✦ ───────
                        </Text>

                        {/* Title */}
                        <Heading style={heading}>
                            {attending ? "We're Thrilled!" : "Thank You"}
                        </Heading>

                        <Text style={subHeading}>
                            {attending
                                ? "Your presence means the world to us"
                                : "For letting us know"}
                        </Text>

                        {/* Personalized Greeting */}
                        <Text style={greeting}>
                            Dear {firstName},
                        </Text>

                        {/* Status Card */}
                        <Section style={statusCard}>
                            <Text style={statusIcon}>
                                {attending ? "💒" : "💌"}
                            </Text>
                            <Text style={statusText}>
                                {attending
                                    ? "Joyfully Attending"
                                    : "Regretfully Unable to Attend"}
                            </Text>
                            {attending && (
                                <Text style={guestCountText}>
                                    {guestCount} {guestCount === 1 ? "Guest" : "Guests"} Reserved
                                </Text>
                            )}
                        </Section>

                        {/* Message */}
                        <Text style={message}>
                            {attending
                                ? "Your confirmation fills our hearts with joy. We can't wait to share our special day with you and create beautiful memories together."
                                : "While we'll miss your presence, we truly appreciate you taking the time to let us know. You'll be in our hearts on our special day."}
                        </Text>

                        {/* Event Details - Only show if attending */}
                        {attending && (
                            <>
                                <Hr style={sectionDivider} />

                                <Text style={sectionTitle}>SAVE THE DATE</Text>

                                {/* Date Feature */}
                                <Section style={dateFeature}>
                                    <Text style={dateDay}>MAY</Text>
                                    <Text style={dateNumber}>16</Text>
                                    <Text style={dateYear}>2026</Text>
                                </Section>

                                {/* Ceremony & Reception */}
                                <Row style={eventsRow}>
                                    <Column style={eventColumn}>
                                        <Text style={eventIcon}>⛪</Text>
                                        <Text style={eventType}>CEREMONY</Text>
                                        <Text style={eventTime}>2:00 PM</Text>
                                        <Text style={eventVenue}>
                                            San Fernando De Dilao
                                        </Text>
                                        <Text style={eventAddress}>
                                            Parish Church, Manila
                                        </Text>
                                    </Column>
                                    <Column style={eventColumn}>
                                        <Text style={eventIcon}>🥂</Text>
                                        <Text style={eventType}>RECEPTION</Text>
                                        <Text style={eventTime}>4:30 PM</Text>
                                        <Text style={eventVenue}>Patio De Manila</Text>
                                        <Text style={eventAddress}>
                                            Malate, Manila
                                        </Text>
                                    </Column>
                                </Row>

                                <Hr style={sectionDivider} />

                                {/* Hashtag */}
                                <Text style={hashtagTitle}>
                                    SHARE YOUR MOMENTS
                                </Text>
                                <Section style={hashtagContainer}>
                                    <Text style={hashtag}>
                                        #OriDANIELlyDestinedToGIADA
                                    </Text>
                                </Section>
                            </>
                        )}

                        {/* Closing */}
                        <Section style={closingSection}>
                            <Text style={decorativeElement}>
                                ─────── ✦ ───────
                            </Text>
                            <Text style={closingText}>With love and excitement,</Text>
                            <Text style={signature}>
                                Daniel & Giada
                            </Text>
                        </Section>
                    </Section>

                    {/* Footer */}
                    <Section style={footer}>
                        <Text style={footerText}>
                            May 16, 2026 • Manila, Philippines
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
}

// ============================================================================
// STYLES - Silver Gray & Burgundy Theme
// ============================================================================

const main = {
    backgroundColor: "#F5F5F5",
    fontFamily: "'Playfair Display', Georgia, serif",
    padding: "40px 20px",
};

const container = {
    backgroundColor: "#FFFFFF",
    borderRadius: "12px",
    margin: "0 auto",
    maxWidth: "600px",
    overflow: "hidden" as const,
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
};

const headerBar = {
    backgroundColor: "#800020", // Burgundy
    padding: "32px 40px",
    textAlign: "center" as const,
};

const headerMonogram = {
    color: "#FFFFFF",
    fontFamily: "'Great Vibes', cursive",
    fontSize: "42px",
    fontWeight: "400",
    letterSpacing: "4px",
    margin: "0",
};

const contentArea = {
    backgroundColor: "#FFFFFF",
    padding: "48px 40px",
};

const decorativeElement = {
    color: "#C0C0C0", // Silver
    fontSize: "16px",
    letterSpacing: "4px",
    margin: "0 0 24px",
    textAlign: "center" as const,
};

const heading = {
    color: "#800020", // Burgundy
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "40px",
    fontWeight: "600",
    lineHeight: "1.2",
    margin: "0 0 12px",
    textAlign: "center" as const,
};

const subHeading = {
    color: "#A8A8A8", // Silver dark
    fontSize: "18px",
    fontStyle: "italic" as const,
    margin: "0 0 40px",
    textAlign: "center" as const,
};

const greeting = {
    color: "#2B2B2B", // Charcoal
    fontSize: "22px",
    margin: "0 0 32px",
    textAlign: "center" as const,
};

const statusCard = {
    backgroundColor: "#F8F8F8", // Off-white
    border: "2px solid #C0C0C0", // Silver
    borderRadius: "12px",
    margin: "0 0 40px",
    padding: "40px 32px",
    textAlign: "center" as const,
};

const statusIcon = {
    fontSize: "48px",
    margin: "0 0 16px",
};

const statusText = {
    fontWeight: "600",
    margin: "0 0 8px",
};

const guestCountText = {
    color: "#FFFFFF",
    fontSize: "16px",
    margin: "0",
    opacity: 0.8,
};

const message = {
    color: "#FFFFFF",
    fontSize: "16px",
    lineHeight: "1.8",
    margin: "0 0 32px",
    textAlign: "center" as const,
    opacity: 0.9,
};

const sectionDivider = {
    borderColor: "#C9A962",
    borderStyle: "solid" as const,
    borderWidth: "1px 0 0 0",
    margin: "32px 0",
    opacity: 0.3,
};

const sectionTitle = {
    color: "#C9A962",
    fontSize: "12px",
    letterSpacing: "4px",
    margin: "0 0 24px",
    textAlign: "center" as const,
};

const dateFeature = {
    textAlign: "center" as const,
    margin: "0 0 32px",
};

const dateDay = {
    color: "#C9A962",
    fontSize: "14px",
    letterSpacing: "4px",
    margin: "0",
};

const dateNumber = {
    color: "#C9A962",
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "72px",
    fontWeight: "700",
    lineHeight: "1",
    margin: "0",
};

const dateYear = {
    color: "#C9A962",
    fontSize: "18px",
    letterSpacing: "8px",
    margin: "0",
};

const eventsRow = {
    margin: "0 0 8px",
};

const eventColumn = {
    padding: "0 8px",
    textAlign: "center" as const,
    verticalAlign: "top" as const,
    width: "50%",
};

const eventIcon = {
    fontSize: "24px",
    margin: "0 0 8px",
};

const eventType = {
    color: "#C9A962",
    fontSize: "11px",
    letterSpacing: "3px",
    margin: "0 0 4px",
};

const eventTime = {
    color: "#FFFFFF",
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "20px",
    fontWeight: "600",
    margin: "0 0 8px",
};

const eventVenue = {
    color: "#FFFFFF",
    fontSize: "14px",
    margin: "0",
    opacity: 0.9,
};

const eventAddress = {
    color: "#FFFFFF",
    fontSize: "12px",
    margin: "4px 0 0",
    opacity: 0.6,
};

const hashtagTitle = {
    color: "#C9A962",
    fontSize: "11px",
    letterSpacing: "3px",
    margin: "0 0 16px",
    textAlign: "center" as const,
};

const hashtagContainer = {
    textAlign: "center" as const,
    margin: "0 0 32px",
};

const hashtag = {
    color: "#FFFFFF",
    fontSize: "14px",
    fontStyle: "italic" as const,
    margin: "4px 0",
    opacity: 0.8,
};

const closingSection = {
    textAlign: "center" as const,
};

const closingText = {
    color: "#FFFFFF",
    fontSize: "14px",
    fontStyle: "italic" as const,
    margin: "24px 0 8px",
    opacity: 0.7,
};

const signature = {
    color: "#C9A962",
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "28px",
    fontWeight: "500",
    margin: "0",
};

const footer = {
    backgroundColor: "#C9A962",
    padding: "16px 32px",
    textAlign: "center" as const,
};

const footerText = {
    color: "#0A0A0A",
    fontSize: "12px",
    letterSpacing: "2px",
    margin: "0",
};
