import type { Metadata, Viewport } from "next";
import { Bebas_Neue, DM_Sans, Orbitron } from "next/font/google";
import "./globals.css";

const landingDisplay = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-landing-display",
});

const landingSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-landing-sans",
});

const megaWordmark = Orbitron({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-mega-wordmark",
});

export const metadata: Metadata = {
  title: "Multi-Category Catalog",
  description: "Browse cars, bikes, phones, computers — dynamic specs per item.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${landingDisplay.variable} ${landingSans.variable} ${megaWordmark.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
