// Feedbacks section translations - Main index
// This file combines all language-specific translations

import { feedbacksTranslationsEn } from "./en";
import { feedbacksTranslationsPt } from "./pt";

// Combined translations object for backward compatibility
export const feedbacksTranslations = {
  en: feedbacksTranslationsEn,
  pt: feedbacksTranslationsPt,
} as const;

// Export individual language translations for direct access
export { feedbacksTranslationsEn } from "./en";
export { feedbacksTranslationsPt } from "./pt";

// Type definitions
export type FeedbacksTranslationKeys = keyof typeof feedbacksTranslationsEn;
export type FeedbacksTranslations = typeof feedbacksTranslations;
