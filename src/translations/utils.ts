// Translation utilities and helpers

import type { Language } from "./config";
import { SUPPORTED_LANGUAGES, isValidLanguage } from "./config";

/**
 * Get all available languages
 */
export function getAvailableLanguages(): readonly Language[] {
  return SUPPORTED_LANGUAGES;
}

/**
 * Validate if a language is supported
 */
export function validateLanguage(lang: string): lang is Language {
  return isValidLanguage(lang);
}

/**
 * Get fallback language (English)
 */
export function getFallbackLanguage(): Language {
  return "en";
}

/**
 * Get language with fallback
 * If the provided language is not supported, returns fallback
 */
export function getLanguageWithFallback(lang: string): Language {
  return validateLanguage(lang) ? lang : getFallbackLanguage();
}

/**
 * Template for creating new language files
 * This helps maintain consistency across domains
 */
export function generateLanguageTemplate(
  domain: string,
  language: Language,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  baseTranslations: Record<string, any>
): string {
  const capitalizedDomain = domain.charAt(0).toUpperCase() + domain.slice(1);
  const capitalizedLang = language.toUpperCase();

  return `// ${capitalizedDomain} section - ${getLanguageName(
    language
  )} translations

export const ${domain}Translations${
    capitalizedLang.charAt(0) + language.slice(1)
  } = ${JSON.stringify(baseTranslations, null, 2)} as const;`;
}

/**
 * Get human-readable language name
 */
function getLanguageName(language: Language): string {
  const names: Record<Language, string> = {
    en: "English",
    pt: "Portuguese",
  };
  return names[language] || language;
}

/**
 * Type helper to ensure translation keys consistency
 */
export type TranslationValidator<T> = {
  [K in keyof T]: T[K] extends object ? TranslationValidator<T[K]> : string;
};

/**
 * Helper to check if all required translation keys are present
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validateTranslationKeys<T extends Record<string, any>>(
  baseTranslation: T,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  targetTranslation: any
): targetTranslation is T {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function checkKeys(base: any, target: any, path = ""): boolean {
    if (typeof base !== typeof target) {
      console.warn(
        `Type mismatch at ${path}: expected ${typeof base}, got ${typeof target}`
      );
      return false;
    }

    if (typeof base === "object" && base !== null) {
      for (const key in base) {
        if (!(key in target)) {
          console.warn(`Missing key at ${path}.${key}`);
          return false;
        }
        if (!checkKeys(base[key], target[key], path ? `${path}.${key}` : key)) {
          return false;
        }
      }
    }

    return true;
  }

  return checkKeys(baseTranslation, targetTranslation);
}
