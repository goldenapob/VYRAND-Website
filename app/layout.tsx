import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "VYRAND — Extreme Sport Simulators in Andorra",
  description:
    "Leave the risk, live the rush. Book wingsuit, ski jump, MTB, climbing and buggy simulator experiences in Andorra. From 70€ per person.",
  openGraph: {
    title: "VYRAND — Leave the risk, live the rush.",
    description:
      "Extreme sport simulator experiences in Andorra. Groups of 2–6. Book now.",
    siteName: "VYRAND",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
