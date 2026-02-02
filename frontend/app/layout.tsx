import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navigation from "@/components/Navigation";
import { ToastProvider } from "@/components/ui/Toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ASTRA | Autonomous Trading Terminal",
  description: "High-frequency policy-driven clearing terminal with ENS-stored safety charters",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-terminal-bg text-terminal-text min-h-screen`}
      >
        <Providers>
          <ToastProvider>
            <Navigation />
            <main className="pt-20 pb-12">
              {children}
            </main>
          </ToastProvider>
        </Providers>
      </body>
    </html>
  );
}
