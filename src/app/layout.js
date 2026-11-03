import { Lora } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { ToastProvider } from "@/providers/ToastProvider";

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
        <ThemeProvider>
          <ToastProvider>
            <Navbar />

            <main className="flex-1">{children}</main>

            <Footer />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
