"use client";

import { useEffect } from "react";
import { useLanguage } from "@/contexts";

/**
 * LanguageSync Component
 * 
 * Synchronizes the HTML lang attribute with the current language state.
 * This ensures proper accessibility and SEO when users change the language.
 * 
 * Must be placed inside LanguageProvider to access the language context.
 */
export function LanguageSync() {
  const { language } = useLanguage();

  useEffect(() => {
    // Update the HTML lang attribute when language changes
    document.documentElement.setAttribute("lang", language);
  }, [language]);

  // This component doesn't render anything
  return null;
}

