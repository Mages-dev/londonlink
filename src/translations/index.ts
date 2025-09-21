// Central translations index
// This file exports all domain-specific translations for easy access

// Import translations from domains
import { heroTranslations } from "@/domain/hero/translations";
import { aboutTranslations } from "@/domain/about/translations";
import { galleryTranslations } from "@/domain/gallery/translations";
import { contactTranslations } from "@/domain/contact/translations";

// Import types and config
import type { Language } from "@/translations/config";

// Re-export everything for external use
export { heroTranslations } from "@/domain/hero/translations";
export { aboutTranslations } from "@/domain/about/translations";
export { galleryTranslations } from "@/domain/gallery/translations";
export { contactTranslations } from "@/domain/contact/translations";

// Future domain translations can be added here:
// export { booksTranslations } from "@/pages/books/translations";

// Re-export types and config
export type { Language } from "@/translations/config";
export { SUPPORTED_LANGUAGES, LANGUAGE_CONFIG } from "@/translations/config";

// Helper function to get translations for a specific language
export function getTranslations(language: Language) {
  return {
    hero: heroTranslations[language],
    about: aboutTranslations[language],
    gallery: galleryTranslations[language],
    contact: contactTranslations[language],
    // Future domains will be added here
  };
}

// Type for the complete translation structure
export type Translations = ReturnType<typeof getTranslations>;
