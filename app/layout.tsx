import type { Metadata } from "next";
import { Great_Vibes, Playfair_Display, Cinzel, Inter } from "next/font/google";
import "./globals.css";

const greatVibes = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cinzel = Cinzel({
  variable: "--font-ornate",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Daniel & Giada | May 16, 2026",
  description: "Join us in celebrating our love. We can't wait to share this special day with you.",
  openGraph: {
    title: "Daniel & Giada | Wedding Celebration",
    description: "Join us in celebrating our love. May 16, 2026.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${greatVibes.variable} ${playfairDisplay.variable} ${cinzel.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
