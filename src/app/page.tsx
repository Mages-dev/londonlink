'use client';

import { HeaderWithTheme, Footer } from '@/layout';
import {
  HeroSection,
  AboutSection,
  GoalsSection,
  BooksSection,
  FeedbackAlternatingSection,
  GallerySection,
  ContactSection,
} from '@/domain/sections';
import { WhatsAppFloat } from '@/components';
import {
  CarnivalEffects,
  ValentineEffects,
  EasterEffects,
  HalloweenEffects,
  ChristmasEffects,
  NewYearEffects,
} from '@/components/ui';
import ThemeDebug from '@/components/ui/ThemeDebug';
import { useLanguage } from '@/contexts';

export default function Home() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="section-bg-hero flex min-h-screen flex-col">
      <HeaderWithTheme currentLanguage={language} onLanguageChange={setLanguage} />

      <main id="main-content" className="flex flex-1 flex-col">
        <HeroSection currentLanguage={language} />
        <AboutSection currentLanguage={language} />
        <GoalsSection currentLanguage={language} />
        <BooksSection currentLanguage={language} />
        <FeedbackAlternatingSection currentLanguage={language} />
        <GallerySection currentLanguage={language} />
        <ContactSection currentLanguage={language} />
      </main>
      <Footer />

      {/* Seasonal effects overlay */}
      <CarnivalEffects />
      <ValentineEffects />
      <EasterEffects />
      <HalloweenEffects />
      <ChristmasEffects />
      <NewYearEffects />

      {/* WhatsApp Float Button */}
      <WhatsAppFloat currentLanguage={language} />

      {/* Debug info - only in development */}
      {process.env.NODE_ENV === 'development' && <ThemeDebug />}
    </div>
  );
}
