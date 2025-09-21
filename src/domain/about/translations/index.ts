// About section translations - Main index
// This file combines all language-specific translations

import { aboutTranslationsEn } from "./en";
import { aboutTranslationsPt } from "./pt";

// Combined translations object for backward compatibility
export const aboutTranslations = {
  en: aboutTranslationsEn,
  pt: aboutTranslationsPt,
} as const;

// Export individual language translations for direct access
export { aboutTranslationsEn } from "./en";
export { aboutTranslationsPt } from "./pt";

// Type definitions
export type AboutTranslationKeys = keyof typeof aboutTranslationsEn;
export type AboutTranslations = typeof aboutTranslations;
