import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Euro Rotary Event 2025 | The Pinnacle of Endurance",
  description:
    "Join the elite at the most exclusive rotary event of the year. Register now.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        suppressHydrationWarning
        className={cn(
          inter.variable,
          playfair.variable,
          "bg-luxury-black text-luxury-ivory antialiased font-sans",
        )}
      >
        {children}
      </body>
    </html>
  );
}
