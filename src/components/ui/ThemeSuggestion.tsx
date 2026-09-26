'use client';

import React, { useState, useEffect } from 'react';
import { useThemeSuggestions } from '@/contexts/ThemeContext';
import { THEME_CONFIGS } from '@/lib/themes/configs';
import { Language } from '@/types';

interface ThemeSuggestionProps {
  currentLanguage: Language;
}

export default function ThemeSuggestion({ currentLanguage }: ThemeSuggestionProps) {
  const { suggestedTheme, shouldShowSuggestion, acceptSuggestion, dismissSuggestion } =
    useThemeSuggestions();

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
      accept: 'Ativar tema',
      dismiss: 'Não, obrigado',
      seasonal: 'Tema sazonal disponível!',
    },
    en: {
      title: `How about trying the ${themeConfig.displayName.en} theme?`,
      description: themeConfig.description.en,
      accept: 'Activate theme',
      dismiss: 'No, thanks',
      seasonal: 'Seasonal theme available!',
    },
  };

  const currentMessages = messages[currentLanguage];

  return (
    <div className="fixed top-4 right-4 z-50">
      <div
        className={`max-w-sm overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg transition-all duration-300 dark:border-gray-700 dark:bg-gray-800 ${
          isAnimating
            ? 'translate-x-0 scale-100 transform opacity-100'
            : 'translate-x-full scale-95 transform opacity-0'
        }`}
      >
        {/* Header with seasonal indicator */}
        <div className="bg-linear-to-r from-orange-400 to-purple-500 px-4 py-2">
          <div className="flex items-center space-x-2">
            <span className="text-lg">{themeConfig.icon}</span>
            <span className="text-sm font-medium text-white">{currentMessages.seasonal}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
            {currentMessages.title}
          </h3>
          <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
            {currentMessages.description}
          </p>

          {/* Preview colors */}
          <div className="mb-4 flex space-x-2">
            <div
              className="h-6 w-6 rounded-full border-2 border-gray-300 dark:border-gray-600"
              style={{ backgroundColor: themeConfig.colors.dark.primary }}
              title="Primary color"
            />
            <div
              className="h-6 w-6 rounded-full border-2 border-gray-300 dark:border-gray-600"
              style={{ backgroundColor: themeConfig.colors.dark.accent }}
              title="Accent color"
            />
            {themeConfig.colors.dark.special && (
              <div
                className="h-6 w-6 rounded-full border-2 border-gray-300 dark:border-gray-600"
                style={{ backgroundColor: themeConfig.colors.dark.special }}
                title="Special color"
              />
            )}
          </div>

          {/* Action buttons */}
          <div className="flex space-x-2">
            <button
              onClick={handleAccept}
              className="flex-1 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-600"
            >
              {currentMessages.accept}
            </button>
            <button
              onClick={handleDismiss}
              className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              {currentMessages.dismiss}
            </button>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 rounded-full p-1 text-white transition-colors duration-200 hover:bg-white/20"
          aria-label={currentLanguage === 'pt' ? 'Fechar' : 'Close'}
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
