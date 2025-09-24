"use client";

import { useState } from "react";
import { HeaderWithTheme } from "@/components/layout";
import {
  HeroSection,
  AboutSection,
  GoalsSection,
  BooksSection,
  FeedbacksSection,
  GallerySection,
  ContactSection,
  Footer,
} from "@/domain/sections";
import { Language } from "@/types";
import { HalloweenEffects, ChristmasEffects } from "@/components/ui";
import ThemeDebug from "@/components/ui/ThemeDebug";

export default function Home() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("pt");

  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 dark:from-blue-900 dark:via-blue-800 dark:to-blue-700">
      <HeaderWithTheme
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
      />

      <HeroSection currentLanguage={currentLanguage} />
      <AboutSection currentLanguage={currentLanguage} />
      <GoalsSection currentLanguage={currentLanguage} />
      <BooksSection currentLanguage={currentLanguage} />
      <FeedbacksSection currentLanguage={currentLanguage} />
      <GallerySection currentLanguage={currentLanguage} />
      <ContactSection currentLanguage={currentLanguage} />
      <Footer />

      {/* Seasonal effects overlay */}
      <HalloweenEffects />
      <ChristmasEffects />

      {/* Debug info - only in development */}
      {process.env.NODE_ENV === "development" && <ThemeDebug />}
    </div>
  );
}
