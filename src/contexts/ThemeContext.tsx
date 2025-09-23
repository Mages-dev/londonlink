"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  ThemeMode,
  CommemorativeTheme,
  ThemeContextType,
  ThemeColors,
} from "@/types/theme";
import {
  getThemeConfig,
  isThemeInSeason,
  getSuggestedTheme,
} from "@/lib/themes/configs";

// Create the context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Local storage keys
const STORAGE_KEYS = {
  MODE: "londonlink-theme-mode",
  COMMEMORATIVE: "londonlink-commemorative-theme",
} as const;

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mode, setModeState] = useState<ThemeMode>("auto");
  const [commemorativeTheme, setCommemorativeThemeState] =
    useState<CommemorativeTheme>("default");
  const [mounted, setMounted] = useState(false);
  const [manualOverride, setManualOverride] = useState(false);

  // Initialize theme from localStorage and system preferences
  useEffect(() => {
    setMounted(true);

    // Load saved preferences
    const savedMode = localStorage.getItem(STORAGE_KEYS.MODE) as ThemeMode;
    const savedCommemorative = localStorage.getItem(
      STORAGE_KEYS.COMMEMORATIVE
    ) as CommemorativeTheme;

    if (savedMode && ["light", "dark", "auto"].includes(savedMode)) {
      setModeState(savedMode);
    }

    // Check if user has manually overridden theme
    const savedOverride =
      localStorage.getItem("londonlink-manual-override") === "true";
    setManualOverride(savedOverride);

    if (savedOverride && savedCommemorative) {
      // User has manually set a theme, respect their choice
      setCommemorativeThemeState(savedCommemorative);
    } else {
      // Apply automatic theme based on current date
      const suggested = getSuggestedTheme();
      if (suggested) {
        // Automatically apply seasonal theme
        setCommemorativeThemeState(suggested);
      } else if (savedCommemorative && isThemeInSeason(savedCommemorative)) {
        // Keep saved theme only if it's still in season
        setCommemorativeThemeState(savedCommemorative);
      } else {
        // Reset to default if no seasonal theme and saved theme is out of season
        setCommemorativeThemeState("default");
      }
    }
  }, []);

  // Check for theme changes daily (only if not manually overridden)
  useEffect(() => {
    if (!mounted || manualOverride) return;

    const checkThemeDaily = () => {
      const suggested = getSuggestedTheme();
      const currentTheme = commemorativeTheme;

      // If there's a suggested theme and it's different from current
      if (suggested && suggested !== currentTheme) {
        setCommemorativeThemeState(suggested);
      }
      // If current theme is no longer in season, reset to default
      else if (currentTheme !== "default" && !isThemeInSeason(currentTheme)) {
        setCommemorativeThemeState("default");
      }
    };

    // Check immediately
    checkThemeDaily();

    // Set up daily check at midnight
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const msUntilMidnight = tomorrow.getTime() - now.getTime();

    const timeoutId = setTimeout(() => {
      checkThemeDaily();

      // Set up daily interval after first midnight check
      const intervalId = setInterval(checkThemeDaily, 24 * 60 * 60 * 1000); // 24 hours

      return () => clearInterval(intervalId);
    }, msUntilMidnight);

    return () => clearTimeout(timeoutId);
  }, [mounted, commemorativeTheme, manualOverride]);

  // Apply theme to document
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    const body = document.body;

    // Determine actual mode (resolve 'auto')
    const actualMode =
      mode === "auto"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : mode;

    // Remove existing theme classes
    root.classList.remove("light", "dark");
    body.classList.remove(
      "theme-default",
      "theme-halloween",
      "theme-christmas"
    );

    // Apply mode class
    root.classList.add(actualMode);

    // Apply commemorative theme class
    body.classList.add(`theme-${commemorativeTheme}`);

    // Apply CSS variables
    const config = getThemeConfig(commemorativeTheme);
    const colors = config.colors[actualMode];

    Object.entries(colors).forEach(([key, value]) => {
      if (value) {
        const cssVar = `--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
        root.style.setProperty(cssVar, value);
      }
    });

    // Save preferences
    localStorage.setItem(STORAGE_KEYS.MODE, mode);
    localStorage.setItem(STORAGE_KEYS.COMMEMORATIVE, commemorativeTheme);
  }, [mode, commemorativeTheme, mounted]);

  // Listen for system theme changes when in auto mode
  useEffect(() => {
    if (!mounted || mode !== "auto") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      // Trigger re-application of theme
      setModeState("auto");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [mode, mounted]);

  // Set mode with validation
  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
  };

  // Set commemorative theme with validation
  const setCommemorativeTheme = (theme: CommemorativeTheme) => {
    setCommemorativeThemeState(theme);
    // Mark as manual override when user explicitly changes theme
    setManualOverride(true);
    localStorage.setItem("londonlink-manual-override", "true");
  };

  // Reset to automatic theme management
  const resetToAutomatic = () => {
    setManualOverride(false);
    localStorage.removeItem("londonlink-manual-override");

    // Apply automatic theme based on current date
    const suggested = getSuggestedTheme();
    if (suggested) {
      setCommemorativeThemeState(suggested);
    } else {
      setCommemorativeThemeState("default");
    }
  };

  // Get current colors based on mode and commemorative theme
  const getCurrentColors = (): ThemeColors => {
    const config = getThemeConfig(commemorativeTheme);
    const actualMode =
      mode === "auto"
        ? typeof window !== "undefined" &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : mode;

    return config.colors[actualMode];
  };

  // Check if commemorative theme is active (not default)
  const isCommemorativeThemeActive = commemorativeTheme !== "default";

  // Get suggested theme for current date
  const suggestedTheme = getSuggestedTheme();

  const contextValue: ThemeContextType = {
    mode,
    commemorativeTheme,
    setMode,
    setCommemorativeTheme,
    resetToAutomatic,
    currentColors: getCurrentColors(),
    isCommemorativeThemeActive,
    suggestedTheme,
    manualOverride,
    getThemeConfig,
    isThemeInSeason,
  };

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <ThemeContext.Provider
        value={{
          mode: "auto",
          commemorativeTheme: "default",
          setMode: () => {},
          setCommemorativeTheme: () => {},
          resetToAutomatic: () => {},
          currentColors: {
            background: "#ffffff",
            foreground: "#171717",
            primary: "#2563eb",
            primaryDark: "#1d4ed8",
            primaryLight: "#3b82f6",
            secondary: "#64748b",
            accent: "#ef4444",
            muted: "#f8fafc",
            border: "#e2e8f0",
            blueGradientStart: "#1e40af",
            blueGradientEnd: "#3b82f6",
          },
          isCommemorativeThemeActive: false,
          suggestedTheme: undefined,
          manualOverride: false,
          getThemeConfig,
          isThemeInSeason,
        }}
      >
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use theme context
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

// Hook for theme-aware styling
export function useThemeColors() {
  const { currentColors } = useTheme();
  return currentColors;
}

// Hook to check if a specific commemorative theme is in season
export function useThemeSeason(theme: CommemorativeTheme) {
  return isThemeInSeason(theme);
}

// Hook to get theme suggestions
export function useThemeSuggestions() {
  const { suggestedTheme, commemorativeTheme, setCommemorativeTheme } =
    useTheme();

  const acceptSuggestion = () => {
    if (suggestedTheme) {
      setCommemorativeTheme(suggestedTheme);
    }
  };

  const dismissSuggestion = () => {
    // Store dismissal in localStorage to avoid showing again
    if (suggestedTheme) {
      localStorage.setItem(
        `dismissed-${suggestedTheme}-${new Date().getFullYear()}`,
        "true"
      );
    }
  };

  const isDismissed = suggestedTheme
    ? localStorage.getItem(
        `dismissed-${suggestedTheme}-${new Date().getFullYear()}`
      ) === "true"
    : false;

  const shouldShowSuggestion =
    suggestedTheme && suggestedTheme !== commemorativeTheme && !isDismissed;

  return {
    suggestedTheme,
    shouldShowSuggestion,
    acceptSuggestion,
    dismissSuggestion,
  };
}
