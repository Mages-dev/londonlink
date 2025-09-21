// Gallery section translations - Main index
// This file combines all language-specific translations

import { galleryTranslationsEn } from "./en";
import { galleryTranslationsPt } from "./pt";

// Combined translations object for backward compatibility
export const galleryTranslations = {
  en: galleryTranslationsEn,
  pt: galleryTranslationsPt,
} as const;

// Export individual language translations for direct access
export { galleryTranslationsEn } from "./en";
export { galleryTranslationsPt } from "./pt";

// Type definitions
export type GalleryTranslationKeys = keyof typeof galleryTranslationsEn;
export type GalleryTranslations = typeof galleryTranslations;
