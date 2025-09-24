"use client";

import React, { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { CommemorativeTheme, ThemeMode } from "@/types/theme";
import { THEME_CONFIGS } from "@/lib/themes/configs";
import { Language } from "@/types";

interface ThemeSelectorProps {
  currentLanguage: Language;
  className?: string;
}

export default function ThemeSelector({
  currentLanguage,
  className = "",
}: ThemeSelectorProps) {
  const {
    mode,
    commemorativeTheme,
    setMode,
    setCommemorativeTheme,
    resetToAutomatic,
    isThemeInSeason,
    manualOverride,
  } = useTheme();

  const [isOpen, setIsOpen] = useState(false);

  const modeLabels = {
    light: { pt: "Claro", en: "Light" },
    dark: { pt: "Escuro", en: "Dark" },
    auto: { pt: "Automático", en: "Auto" },
  };

  const availableThemes: CommemorativeTheme[] = [
    "default",
    "halloween",
    "christmas",
    "new-year",
  ];

  const handleModeChange = (newMode: ThemeMode) => {
    setMode(newMode);
  };

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
        className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 shadow-sm hover:shadow-md"
        aria-label={
          currentLanguage === "pt" ? "Seletor de tema" : "Theme selector"
        }
        aria-expanded={isOpen}
      >
        <span className="text-lg">{currentConfig.icon}</span>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {currentConfig.displayName[currentLanguage]}
        </span>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
          <div className="p-4">
            {/* Manual Override Status */}
            {manualOverride && (
              <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                      {currentLanguage === "pt"
                        ? "Modo Manual Ativo"
                        : "Manual Mode Active"}
                    </p>
                    <p className="text-xs text-yellow-600 dark:text-yellow-400">
                      {currentLanguage === "pt"
                        ? "Temas automáticos desabilitados"
                        : "Automatic themes disabled"}
                    </p>
                  </div>
                  <button
                    onClick={resetToAutomatic}
                    className="text-xs px-2 py-1 bg-yellow-600 hover:bg-yellow-700 text-white rounded"
                  >
                    {currentLanguage === "pt" ? "Auto" : "Auto"}
                  </button>
                </div>
              </div>
            )}
            {/* Mode Selection */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {currentLanguage === "pt" ? "Modo" : "Mode"}
              </h3>
              <div className="flex space-x-2">
                {(["light", "dark", "auto"] as ThemeMode[]).map(
                  (modeOption) => (
                    <button
                      key={modeOption}
                      onClick={() => handleModeChange(modeOption)}
                      className={`px-3 py-1 text-xs rounded-md transition-all duration-200 ${
                        mode === modeOption
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                    >
                      {modeLabels[modeOption][currentLanguage]}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Commemorative Theme Selection */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {currentLanguage === "pt"
                  ? "Tema Comemorativo"
                  : "Commemorative Theme"}
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
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500"
                          : "bg-gray-50 dark:bg-gray-700 border-2 border-transparent hover:bg-gray-100 dark:hover:bg-gray-600"
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
                        {isActive && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                        {inSeason && theme !== "default" && (
                          <span className="text-xs px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full">
                            {currentLanguage === "pt"
                              ? "Em temporada"
                              : "In season"}
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
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
