import type { Metadata } from "next";
import { Newsreader } from "next/font/google";
import Nav from "@/components/Nav";
import "../design/tokens.css";
import "./globals.css";

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
    "An AI-supported journaling practice where your inner parts speak in their own voice — helping you see, value, and integrate what lives inside you.",
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
    <html lang="en" data-room="product" className={newsreader.variable}>
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
