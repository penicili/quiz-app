import type { Metadata } from "next";
import { Lexend_Mega } from "next/font/google";
import "./globals.css";

const lexendMega = Lexend_Mega({
  subsets: ["latin"],
  variable: "--font-lexend",
});

export const metadata: Metadata = {
  title: "Quiz App",
  description: "Create and take quizzes.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={lexendMega.variable}>
      <body>
        <main className="min-h-screen bg-beige-2 px-6 py-12 text-ink md:px-12">
          <div className="mx-auto flex max-w-6xl flex-col gap-10">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
