// Theme types for LondonLink

export type ThemeMode = "light" | "dark" | "auto";

export type CommemorativeTheme =
  | "default"
  | "halloween"
  | "christmas"
  | "new-year"
  | "valentine"
  | "easter";

export interface ThemeColors {
  // Base colors
  background: string;
  foreground: string;

  // Brand colors
  primary: string;
  primaryDark: string;
  primaryLight: string;
  secondary: string;
  accent: string;
  muted: string;
  border: string;

  // Gradient colors
  blueGradientStart: string;
  blueGradientEnd: string;

  // Commemorative specific colors
  special?: string;
  specialSecondary?: string;
  specialAccent?: string;
}

export interface ThemeConfig {
  name: CommemorativeTheme;
  displayName: {
    pt: string;
    en: string;
  };
  description: {
    pt: string;
    en: string;
  };
  colors: {
    light: ThemeColors;
    dark: ThemeColors;
  };
  // Date range when theme should be suggested
  dateRange?: {
    start: { month: number; day: number };
    end: { month: number; day: number };
  };
  // Custom CSS classes for special effects
  customClasses?: string[];
  // Emoji or icon for the theme selector
  icon?: string;
}

export interface ThemeContextType {
  // Current theme settings
  mode: ThemeMode;
  commemorativeTheme: CommemorativeTheme;

  // Theme actions
  setMode: (mode: ThemeMode) => void;
  setCommemorativeTheme: (theme: CommemorativeTheme) => void;
  resetToAutomatic: () => void;

  // Computed values
  currentColors: ThemeColors;
  isCommemorativeThemeActive: boolean;
  suggestedTheme?: CommemorativeTheme;
  manualOverride: boolean;

  // Utility functions
  getThemeConfig: (theme: CommemorativeTheme) => ThemeConfig;
  isThemeInSeason: (theme: CommemorativeTheme) => boolean;
}

// Theme transition animations
export type ThemeTransition = "fade" | "slide" | "scale" | "none";

export interface ThemeTransitionConfig {
  type: ThemeTransition;
  duration: number; // in milliseconds
  easing: string;
}
