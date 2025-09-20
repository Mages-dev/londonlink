// Translation configuration and utilities

export const SUPPORTED_LANGUAGES = ["en", "pt"] as const;
export type Language = (typeof SUPPORTED_LANGUAGES)[number];

export const DEFAULT_LANGUAGE: Language = "en";

// Language metadata
export const LANGUAGE_CONFIG = {
  en: {
    name: "English",
    nativeName: "English",
    flag: "🇺🇸",
    direction: "ltr" as const,
  },
  pt: {
    name: "Portuguese",
    nativeName: "Português",
    flag: "🇧🇷",
    direction: "ltr" as const,
  },
} as const;

// Helper functions
export function isValidLanguage(lang: string): lang is Language {
  return SUPPORTED_LANGUAGES.includes(lang as Language);
}

export function getLanguageConfig(language: Language) {
  return LANGUAGE_CONFIG[language];
}

export function getDefaultLanguage(): Language {
  return DEFAULT_LANGUAGE;
}

// Future: Browser language detection
export function detectBrowserLanguage(): Language {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;

  const browserLang = navigator.language.split("-")[0];
  return isValidLanguage(browserLang) ? browserLang : DEFAULT_LANGUAGE;
}
