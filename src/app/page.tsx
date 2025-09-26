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
import { WhatsAppFloat } from "@/components";
import { Language } from "@/types";
import {
  CarnivalEffects,
  ValentineEffects,
  EasterEffects,
  HalloweenEffects,
  ChristmasEffects,
  NewYearEffects,
} from "@/components/ui";
import ThemeDebug from "@/components/ui/ThemeDebug";

export default function Home() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("pt");

  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language);
  };

  return (
    <div className="min-h-screen flex flex-col section-bg-hero">
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
      <CarnivalEffects />
      <ValentineEffects />
      <EasterEffects />
      <HalloweenEffects />
      <ChristmasEffects />
      <NewYearEffects />

      {/* WhatsApp Float Button */}
      <WhatsAppFloat currentLanguage={currentLanguage} />

      {/* Debug info - only in development */}
      {process.env.NODE_ENV === "development" && <ThemeDebug />}
    </div>
  );
}
