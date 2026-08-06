import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { TopNavBar } from "@/components/layout/top-nav-bar";
import { Footer } from "@/components/layout/footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KB GARAGE - Precision Engineering for Your Passion",
  description: "Experience the ultimate in automotive care, tuning, ceramic coating, and precision engineering for vehicles that demand the best.",
  keywords: ["KB Garage", "Car Detailing", "Performance Tuning", "Ceramic Coating", "PPF", "Auto Service"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className={`${montserrat.variable} ${inter.variable} min-h-screen flex flex-col font-sans bg-background text-on-surface`}>
        <TopNavBar />
        <main className="flex-grow pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
