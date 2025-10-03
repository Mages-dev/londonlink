"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Language } from "@/types";
import {
  DEFAULT_LANGUAGE,
  isValidLanguage,
  detectBrowserLanguage,
} from "@/translations/config";

// Language Context Type
interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
}

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// Local storage key
const STORAGE_KEY = "londonlink-language";

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE);
  const [mounted, setMounted] = useState(false);

  // Initialize language from localStorage or browser preference
  useEffect(() => {
    setMounted(true);

    // Try to load saved language preference
    const savedLanguage = localStorage.getItem(STORAGE_KEY);

    if (savedLanguage && isValidLanguage(savedLanguage)) {
      // Use saved preference
      setLanguageState(savedLanguage);
    } else {
      // Detect browser language as fallback
      const browserLanguage = detectBrowserLanguage();
      setLanguageState(browserLanguage);
      // Save detected language
      localStorage.setItem(STORAGE_KEY, browserLanguage);
    }
  }, []);

  // Save language preference whenever it changes
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(STORAGE_KEY, language);
  }, [language, mounted]);

  // Set language with validation
  const setLanguage = (newLanguage: Language) => {
    if (isValidLanguage(newLanguage)) {
      setLanguageState(newLanguage);
    }
  };

  // Toggle between available languages
  const toggleLanguage = () => {
    const newLanguage: Language = language === "en" ? "pt" : "en";
    setLanguage(newLanguage);
  };

  const contextValue: LanguageContextType = {
    language,
    setLanguage,
    toggleLanguage,
  };

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <LanguageContext.Provider
        value={{
          language: DEFAULT_LANGUAGE,
          setLanguage: () => {},
          toggleLanguage: () => {},
        }}
      >
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use language context
export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

