import { Lora } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

// Lora Font Setup
const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${lora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-serif">
            <Navbar />

          <main className="flex-1">
            {children}
          </main>
      </body>
    </html>
  );
}
