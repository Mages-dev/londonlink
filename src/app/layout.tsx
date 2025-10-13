import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import "../lib/themes/carnival.css";
import "../lib/themes/valentine.css";
import "../lib/themes/easter.css";
import "../lib/themes/halloween.css";
import "../lib/themes/christmas.css";
import "../lib/themes/new-year.css";
import { ThemeProvider, LanguageProvider } from "@/contexts";
import { LanguageSync } from "@/components";

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
    <html lang="pt" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Language initialization script - must be in head for SEO/accessibility */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedLanguage = localStorage.getItem('londonlink-language');
                  var language = 'pt'; // default

                  if (savedLanguage === 'en' || savedLanguage === 'pt') {
                    language = savedLanguage;
                  } else {
                    // Detect browser language
                    var browserLang = navigator.language.split('-')[0];
                    if (browserLang === 'en' || browserLang === 'pt') {
                      language = browserLang;
                    }
                  }

                  document.documentElement.setAttribute('lang', language);
                } catch (e) {
                  console.error('Language initialization error:', e);
                }
              })();
            `,
          }}
        />
        {/* Theme initialization script - must be in head for no-flash */}
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
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YMZJ7KR3SG"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YMZJ7KR3SG');
          `}
        </Script>

        <ThemeProvider>
          <LanguageProvider>
            <LanguageSync />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
