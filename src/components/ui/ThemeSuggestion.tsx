"use client";

import React, { useState, useEffect } from "react";
import { useThemeSuggestions } from "@/contexts/ThemeContext";
import { THEME_CONFIGS } from "@/lib/themes/configs";
import { Language } from "@/types";

interface ThemeSuggestionProps {
  currentLanguage: Language;
}

export default function ThemeSuggestion({
  currentLanguage,
}: ThemeSuggestionProps) {
  const {
    suggestedTheme,
    shouldShowSuggestion,
    acceptSuggestion,
    dismissSuggestion,
  } = useThemeSuggestions();

  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (shouldShowSuggestion) {
      // Delay showing the suggestion to avoid flash on page load
      const timer = setTimeout(() => {
        setIsVisible(true);
        setIsAnimating(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [shouldShowSuggestion]);

  const handleAccept = () => {
    setIsAnimating(false);
    setTimeout(() => {
      acceptSuggestion();
      setIsVisible(false);
    }, 300);
  };

  const handleDismiss = () => {
    setIsAnimating(false);
    setTimeout(() => {
      dismissSuggestion();
      setIsVisible(false);
    }, 300);
  };

  if (!isVisible || !suggestedTheme) {
    return null;
  }

  const themeConfig = THEME_CONFIGS[suggestedTheme];

  const messages = {
    pt: {
      title: `Que tal experimentar o tema ${themeConfig.displayName.pt}?`,
      description: themeConfig.description.pt,
      accept: "Ativar tema",
      dismiss: "Não, obrigado",
      seasonal: "Tema sazonal disponível!",
    },
    en: {
      title: `How about trying the ${themeConfig.displayName.en} theme?`,
      description: themeConfig.description.en,
      accept: "Activate theme",
      dismiss: "No, thanks",
      seasonal: "Seasonal theme available!",
    },
  };

  const currentMessages = messages[currentLanguage];

  return (
    <div className="fixed top-4 right-4 z-50">
      <div
        className={`max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 ${
          isAnimating
            ? "transform translate-x-0 opacity-100 scale-100"
            : "transform translate-x-full opacity-0 scale-95"
        }`}
      >
        {/* Header with seasonal indicator */}
        <div className="bg-gradient-to-r from-orange-400 to-purple-500 px-4 py-2">
          <div className="flex items-center space-x-2">
            <span className="text-lg">{themeConfig.icon}</span>
            <span className="text-white text-sm font-medium">
              {currentMessages.seasonal}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            {currentMessages.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {currentMessages.description}
          </p>

          {/* Preview colors */}
          <div className="flex space-x-2 mb-4">
            <div
              className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600"
              style={{ backgroundColor: themeConfig.colors.primary }}
              title="Primary color"
            />
            <div
              className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600"
              style={{ backgroundColor: themeConfig.colors.accent }}
              title="Accent color"
            />
            {themeConfig.colors.special && (
              <div
                className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600"
                style={{ backgroundColor: themeConfig.colors.special }}
                title="Special color"
              />
            )}
          </div>

          {/* Action buttons */}
          <div className="flex space-x-2">
            <button
              onClick={handleAccept}
              className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
            >
              {currentMessages.accept}
            </button>
            <button
              onClick={handleDismiss}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg transition-colors duration-200"
            >
              {currentMessages.dismiss}
            </button>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 p-1 text-white hover:bg-white/20 rounded-full transition-colors duration-200"
          aria-label={currentLanguage === "pt" ? "Fechar" : "Close"}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
