import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import { PostsProvider } from "@/context/PostsContext";
import "./globals.css";
import { Toaster } from "react-hot-toast";

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
      <body className="min-h-full bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-50 transition-colors duration-200">
        
        {/* Professional, branded toast notifications container */}
        <Toaster 
          position="top-center" 
          toastOptions={{
            duration: 3000,
            style: {
              background: '#334155', // Slate-700
              color: '#fff',
              borderRadius: '12px',
              fontSize: '14px',
              padding: '12px 16px',
            },
            success: {
              style: {
                background: '#7c3aed', // Purple-600
                color: '#fff',
              },
              iconTheme: {
                primary: '#fff',
                secondary: '#7c3aed',
              },
            },
          }}
        />
        
        {/* Wrap your application inside the provider wrapper */}
        <PostsProvider>
          <div className="flex flex-col min-h-screen w-full">
            
            {/* TOP FIXED NAVIGATION BAR */}
            <Navbar />

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 w-full">
              <div className="max-w-4xl mx-auto p-4 md:p-8">
                {children}
              </div>
            </main>

          </div>
        </PostsProvider>
      </body>
    </html>
  );
}