import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../lib/themes/carnival.css";
import "../lib/themes/valentine.css";
import "../lib/themes/easter.css";
import "../lib/themes/halloween.css";
import "../lib/themes/christmas.css";
import "../lib/themes/new-year.css";
import { ThemeProvider } from "@/contexts";

// Import test utilities in development
if (process.env.NODE_ENV === "development") {
  import("../lib/themes/test-theme");
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LondonLink - English Learning Platform",
  description:
    "Learn English with LondonLink - A comprehensive English learning platform with Brazilian Portuguese focus. Improve your English skills with our interactive courses, books, and personalized learning experience.",
  keywords: [
    "English learning",
    "Portuguese",
    "Language courses",
    "Online education",
    "LondonLink",
  ],
  authors: [{ name: "LondonLink Team" }],
  creator: "LondonLink",
  publisher: "LondonLink",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://londonlink.com"),
  openGraph: {
    title: "LondonLink - English Learning Platform",
    description:
      "Learn English with LondonLink - A comprehensive English learning platform with Brazilian Portuguese focus.",
    url: "https://londonlink.com",
    siteName: "LondonLink",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LondonLink - English Learning Platform",
    description:
      "Learn English with LondonLink - A comprehensive English learning platform with Brazilian Portuguese focus.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var mode = localStorage.getItem('londonlink-theme-mode') || 'auto';
                  var theme = 'dark';

                  if (mode === 'auto') {
                    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  } else if (mode === 'light' || mode === 'dark') {
                    theme = mode;
                  }

                  document.documentElement.classList.remove('light', 'dark');
                  document.documentElement.classList.add(theme);
                } catch (e) {
                  console.error('Theme initialization error:', e);
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
