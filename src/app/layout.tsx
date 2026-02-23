import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Manuel Rosales | Software Engineer & Designer",
  description:
    "Portfolio of Manuel Rosales — Software Engineering student, designer, and developer. Building beautiful digital experiences with code and creativity.",
  keywords: [
    "Manuel Rosales",
    "Software Engineer",
    "Web Developer",
    "Designer",
    "Portfolio",
    "React",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "Manuel Rosales" }],
  openGraph: {
    title: "Manuel Rosales | Software Engineer & Designer",
    description:
      "Portfolio of Manuel Rosales — Software Engineering student, designer, and developer.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="font-sans antialiased noise">{children}</body>
    </html>
  );
}
