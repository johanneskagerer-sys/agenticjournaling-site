import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://agenticjournaling.com"),
  title: {
    default: "agenticjournaling — Journal · Listen · Integrate",
    template: "%s | agenticjournaling",
  },
  description:
    "Journal · Listen · Integrate. Where your inner parts have agency — they listen along with what you journal, speak in their own voice, and help you to see, value and integrate what lives inside you.",
  openGraph: {
    siteName: "agenticjournaling",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable}`}>
      <body>{children}</body>
    </html>
  );
}
