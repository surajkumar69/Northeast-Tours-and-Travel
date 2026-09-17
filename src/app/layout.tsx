import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { SplashScreen } from "@/components/ui/SplashScreen";
import { StickyBottomBar } from "@/components/ui/StickyBottomBar";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Majestic Northeast Tours and Travel | The Soul of Incredible Northeast",
  description: "Discover mist-covered mountains, living root bridges, crystal-clear rivers and the untouched beauty of Northeast India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-dark-900 text-stone-200 pb-16`}>
        <SplashScreen />
        {children}
        <StickyBottomBar />
      </body>
    </html>
  );
}
