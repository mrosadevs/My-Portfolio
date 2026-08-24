import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider, themeInitScript } from "@/components/ThemeProvider";
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
  metadataBase: new URL("https://www.mrosadev.online"),
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
    url: "https://www.mrosadev.online",
    siteName: "Manuel Rosales",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manuel Rosales | Software Engineer & Designer",
    description:
      "Portfolio of Manuel Rosales — Software Engineering student, designer, and developer.",
  },
};

export const viewport: Viewport = {
  // Both entries are sent so the browser chrome tracks whichever theme is
  // active, rather than being pinned to the old hard-coded dark value.
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#030014" },
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrains.variable}`}
      // The init script sets this before paint; suppress the mismatch
      // warning for the one attribute it owns.
      suppressHydrationWarning
    >
      <head>
        {/* Blocking on purpose: it must run before first paint, otherwise
            a light-mode visitor gets a dark flash on every navigation. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="font-sans antialiased noise">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
