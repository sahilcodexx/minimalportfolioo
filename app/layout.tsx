import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeToggle from "@/components/theme-toggle";
import SocialDock from "@/components/social-dock";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sahil Singh — Design Engineer",
  description:
    "Portfolio of Sahil Singh — Design Engineer building immersive interfaces with React, TypeScript, Motion and GSAP, and full-stack apps with Node.js, Bun, PostgreSQL and MongoDB.",
};

const themeScript = `
(function() {
  try {
    var t = localStorage.getItem('theme');
    if (t === 'light') document.documentElement.classList.add('light');
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-full flex flex-col antialiased`}
      >
        {/* Theme toggle: fixed top right, on every page */}
        <div className="fixed right-5 top-5 z-50">
          <ThemeToggle />
        </div>

        {children}

        <SocialDock />
      </body>
    </html>
  );
}
