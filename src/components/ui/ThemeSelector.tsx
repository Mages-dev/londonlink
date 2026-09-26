'use client';

import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { CommemorativeTheme } from '@/types/theme';
import { THEME_CONFIGS } from '@/lib/themes/configs';
import { Language } from '@/types';

interface ThemeSelectorProps {
  currentLanguage: Language;
  className?: string;
}

export default function ThemeSelector({ currentLanguage, className = '' }: ThemeSelectorProps) {
  const {
    commemorativeTheme,

    setCommemorativeTheme,
    resetToAutomatic,
    isThemeInSeason,
    manualOverride,
  } = useTheme();

  const [isOpen, setIsOpen] = useState(false);

  const availableThemes: CommemorativeTheme[] = [
    'default',
    'carnival',
    'valentine',
    'easter',
    'halloween',
    'christmas',
    'new-year',
  ];

  const handleThemeChange = (theme: CommemorativeTheme) => {
    setCommemorativeTheme(theme);
    setIsOpen(false);
  };

  const getCurrentThemeConfig = () => {
    return THEME_CONFIGS[commemorativeTheme];
  };

  const currentConfig = getCurrentThemeConfig();

  return (
    <div className={`relative ${className}`}>
      {/* Theme Selector Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 rounded-lg bg-gray-100 px-4 py-2 shadow-sm transition-all duration-200 hover:bg-gray-200 hover:shadow-md dark:bg-gray-800 dark:hover:bg-gray-700"
        aria-label={
          currentLanguage === 'pt'
            ? `${currentConfig.displayName.pt} — seletor de tema`
            : `${currentConfig.displayName.en} — theme selector`
        }
        aria-expanded={isOpen}
      >
        <span className="text-lg">{currentConfig.icon}</span>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {currentConfig.displayName[currentLanguage]}
        </span>
        <svg
          className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 z-50 mt-2 w-80 rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
          <div className="p-4">
            {/* Manual Override Status */}
            {manualOverride && (
              <div className="mb-4 rounded-lg border border-yellow-200 bg-yellow-50 p-3 dark:border-yellow-800 dark:bg-yellow-900/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                      {currentLanguage === 'pt' ? 'Modo Manual Ativo' : 'Manual Mode Active'}
                    </p>
                    <p className="text-xs text-yellow-600 dark:text-yellow-400">
                      {currentLanguage === 'pt'
                        ? 'Temas automáticos desabilitados'
                        : 'Automatic themes disabled'}
                    </p>
                  </div>
                  <button
                    onClick={resetToAutomatic}
                    className="rounded bg-yellow-600 px-2 py-1 text-xs text-white hover:bg-yellow-700"
                  >
                    {currentLanguage === 'pt' ? 'Auto' : 'Auto'}
                  </button>
                </div>
              </div>
            )}

            {/* Commemorative Theme Selection */}
            <div>
              <h3 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                {currentLanguage === 'pt' ? 'Tema Comemorativo' : 'Commemorative Theme'}
              </h3>
              <div className="space-y-2">
                {availableThemes.map((theme) => {
                  const config = THEME_CONFIGS[theme];
                  const inSeason = isThemeInSeason(theme);
                  const isActive = commemorativeTheme === theme;

                  return (
                    <button
                      key={theme}
                      onClick={() => handleThemeChange(theme)}
                      className={`flex w-full items-center justify-between rounded-lg p-3 transition-all duration-200 ${
                        isActive
                          ? 'border-2 border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-2 border-transparent bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{config.icon}</span>
                        <div className="text-left">
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {config.displayName[currentLanguage]}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {config.description[currentLanguage]}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        {isActive && <div className="h-2 w-2 rounded-full bg-blue-500"></div>}
                        {inSeason && theme !== 'default' && (
                          <span className="rounded-full bg-orange-100 px-2 py-1 text-xs text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
                            {currentLanguage === 'pt' ? 'Em temporada' : 'In season'}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overlay to close dropdown */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} aria-hidden="true" />
      )}
    </div>
  );
}
