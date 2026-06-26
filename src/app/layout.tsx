import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar"; // Imports your custom top navbar
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SocialHub",
  description: "Next.js App Router Technical Evaluation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 transition-colors duration-200">
        <div className="flex flex-col min-h-screen w-full">
          
          {/* TOP FIXED NAVIGATION BAR */}
          <Navbar />

          {/* MAIN CONTENT AREA */}
          {/* Removed the left margin (md:ml-64) so it centers beautifully under the top nav */}
          <main className="flex-1 w-full">
            <div className="max-w-4xl mx-auto p-4 md:p-8">
              {children}
            </div>
          </main>

        </div>
      </body>
    </html>
  );
}