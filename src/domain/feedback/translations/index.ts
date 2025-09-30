// Feedback section translations - Main index
// This file combines all language-specific translations

import { feedbackTranslationsEn } from "./en";
import { feedbackTranslationsPt } from "./pt";

// Combined translations object for backward compatibility
export const feedbackTranslations = {
  en: feedbackTranslationsEn,
  pt: feedbackTranslationsPt,
} as const;

// Export individual language translations for direct access
export { feedbackTranslationsEn } from "./en";
export { feedbackTranslationsPt } from "./pt";

// Type definitions
export type FeedbackTranslationKeys = keyof typeof feedbackTranslationsEn;
export type FeedbackTranslations = typeof feedbackTranslations;
