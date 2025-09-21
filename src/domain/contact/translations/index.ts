// Contact section translations - Main index
// This file combines all language-specific translations

import { contactTranslationsEn } from "./en";
import { contactTranslationsPt } from "./pt";

// Combined translations object for backward compatibility
export const contactTranslations = {
  en: contactTranslationsEn,
  pt: contactTranslationsPt,
} as const;

// Export individual language translations for direct access
export { contactTranslationsEn } from "./en";
export { contactTranslationsPt } from "./pt";

// Type definitions
export type ContactTranslationKeys = keyof typeof contactTranslationsEn;
export type ContactTranslations = typeof contactTranslations;
