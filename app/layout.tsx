import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans, Inter } from "next/font/google";
import Navbar from "@/components/layout/navbar";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
});

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta-sans",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Quiz App",
  description: "Create and take quizzes.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${jakartaSans.variable} ${inter.variable}`}
    >
      <body>
        <Navbar />
        <main className="min-h-screen w-screen text-ink">
          <div className="flex flex-col w-full gap-10">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
