// Hero section translations - Main index
// This file combines all language-specific translations

import { heroTranslationsEn } from "./en";
import { heroTranslationsPt } from "./pt";

// Combined translations object for backward compatibility
export const heroTranslations = {
  en: heroTranslationsEn,
  pt: heroTranslationsPt,
} as const;

// Export individual language translations for direct access
export { heroTranslationsEn } from "./en";
export { heroTranslationsPt } from "./pt";

// Type definitions
export type HeroTranslationKeys = keyof typeof heroTranslationsEn;
export type HeroTranslations = typeof heroTranslations;
