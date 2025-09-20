// Goals section translations - Main index
// This file combines all language-specific translations

import { goalsTranslationsEn } from "./en";
import { goalsTranslationsPt } from "./pt";

// Combined translations object for backward compatibility
export const goalsTranslations = {
  en: goalsTranslationsEn,
  pt: goalsTranslationsPt,
} as const;

// Export individual language translations for direct access
export { goalsTranslationsEn } from "./en";
export { goalsTranslationsPt } from "./pt";

// Type definitions
export type GoalsTranslationKeys = keyof typeof goalsTranslationsEn;
export type GoalsTranslations = typeof goalsTranslations;
