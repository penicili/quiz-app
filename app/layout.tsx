import type { Metadata } from "next";
import { Lexend_Mega } from "next/font/google";
import "./globals.css";

const lexendMega = Lexend_Mega({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Quiz App",
  description: "Create and take quizzes.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={lexendMega.variable}>
      <body>{children}</body>
    </html>
  );
}
