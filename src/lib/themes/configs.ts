import { ThemeConfig, CommemorativeTheme } from "@/types/theme";

// Halloween Theme Configuration
const halloweenTheme: ThemeConfig = {
  name: "halloween",
  displayName: {
    pt: "Halloween",
    en: "Halloween",
  },
  description: {
    pt: "Tema assombrado para o Halloween com cores laranja e roxo",
    en: "Spooky Halloween theme with orange and purple colors",
  },
  colors: {
    light: {
      background: "#fef7ed", // Orange-50
      foreground: "#1c1917", // Stone-900
      primary: "#ea580c", // Orange-600
      primaryDark: "#c2410c", // Orange-700
      primaryLight: "#fb923c", // Orange-400
      secondary: "#78716c", // Stone-500
      accent: "#7c2d12", // Red-900 (dark red for spooky effect)
      muted: "#fed7aa", // Orange-200
      border: "#fdba74", // Orange-300
      blueGradientStart: "#ea580c", // Orange-600
      blueGradientEnd: "#fb923c", // Orange-400
      special: "#a855f7", // Purple-500 (for magical effects)
      specialSecondary: "#1f2937", // Gray-800 (dark spooky)
      specialAccent: "#fbbf24", // Amber-400 (glowing effect)
    },
    dark: {
      background: "#0c0a09", // Stone-950
      foreground: "#fafaf9", // Stone-50
      primary: "#fb923c", // Orange-400
      primaryDark: "#ea580c", // Orange-600
      primaryLight: "#fed7aa", // Orange-200
      secondary: "#a8a29e", // Stone-400
      accent: "#dc2626", // Red-600
      muted: "#292524", // Stone-800
      border: "#57534e", // Stone-600
      blueGradientStart: "#7c2d12", // Red-900
      blueGradientEnd: "#ea580c", // Orange-600
      special: "#c084fc", // Purple-400 (brighter for dark mode)
      specialSecondary: "#111827", // Gray-900
      specialAccent: "#fcd34d", // Amber-300
    },
  },
  dateRange: {
    start: { month: 10, day: 24 }, // October 24th (1 week before Halloween)
    end: { month: 10, day: 31 }, // October 31st (Halloween day)
  },
  customClasses: [
    "halloween-glow",
    "halloween-float",
    "halloween-pulse",
    "halloween-shadow",
  ],
  icon: "🎃",
};

// Default Theme Configuration
const defaultTheme: ThemeConfig = {
  name: "default",
  displayName: {
    pt: "Padrão",
    en: "Default",
  },
  description: {
    pt: "Tema padrão do LondonLink com cores azuis",
    en: "Default LondonLink theme with blue colors",
  },
  colors: {
    light: {
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
    dark: {
      background: "#0f172a",
      foreground: "#f1f5f9",
      primary: "#3b82f6",
      primaryDark: "#2563eb",
      primaryLight: "#60a5fa",
      secondary: "#64748b",
      accent: "#ef4444",
      muted: "#1e293b",
      border: "#334155",
      blueGradientStart: "#1e40af",
      blueGradientEnd: "#3b82f6",
    },
  },
  icon: "🌐",
};

// Christmas Theme Configuration
const christmasTheme: ThemeConfig = {
  name: "christmas",
  displayName: {
    pt: "Natal",
    en: "Christmas",
  },
  description: {
    pt: "Tema festivo de Natal com cores vermelhas e verdes",
    en: "Festive Christmas theme with red and green colors",
  },
  colors: {
    light: {
      background: "#fef2f2",
      foreground: "#1f2937",
      primary: "#dc2626",
      primaryDark: "#b91c1c",
      primaryLight: "#f87171",
      secondary: "#6b7280",
      accent: "#059669",
      muted: "#fee2e2",
      border: "#fca5a5",
      blueGradientStart: "#dc2626",
      blueGradientEnd: "#059669",
      special: "#fbbf24",
      specialSecondary: "#065f46",
      specialAccent: "#fcd34d",
    },
    dark: {
      background: "#0f1419",
      foreground: "#f9fafb",
      primary: "#f87171",
      primaryDark: "#dc2626",
      primaryLight: "#fca5a5",
      secondary: "#9ca3af",
      accent: "#10b981",
      muted: "#374151",
      border: "#6b7280",
      blueGradientStart: "#7f1d1d",
      blueGradientEnd: "#065f46",
      special: "#fcd34d",
      specialSecondary: "#064e3b",
      specialAccent: "#fbbf24",
    },
  },
  dateRange: {
    start: { month: 12, day: 15 }, // December 15th (10 days before Christmas)
    end: { month: 12, day: 25 }, // December 25th (Christmas day)
  },
  customClasses: ["christmas-sparkle", "christmas-snow", "christmas-glow"],
  icon: "🎄",
};

// New Year Theme Configuration
const newYearTheme: ThemeConfig = {
  name: "new-year",
  displayName: {
    pt: "Ano Novo",
    en: "New Year",
  },
  description: {
    pt: "Tema festivo de Ano Novo com cores douradas e prateadas",
    en: "Festive New Year theme with gold and silver colors",
  },
  colors: {
    light: {
      background: "#ffffff",
      foreground: "#171717",
      primary: "#d97706", // Amber/Gold
      primaryDark: "#b45309",
      primaryLight: "#f59e0b",
      secondary: "#6b7280",
      accent: "#6366f1", // Indigo/Purple
      muted: "#fef3c7",
      border: "#fbbf24",
      blueGradientStart: "#d97706",
      blueGradientEnd: "#6366f1",
      special: "#eab308", // Gold
      specialSecondary: "#4338ca",
      specialAccent: "#f3f4f6", // Silver
    },
    dark: {
      background: "#0c0a09",
      foreground: "#fafaf9",
      primary: "#f59e0b",
      primaryDark: "#d97706",
      primaryLight: "#fbbf24",
      secondary: "#9ca3af",
      accent: "#8b5cf6",
      muted: "#451a03",
      border: "#78716c",
      blueGradientStart: "#92400e",
      blueGradientEnd: "#5b21b6",
      special: "#fbbf24",
      specialSecondary: "#3730a3",
      specialAccent: "#e5e7eb",
    },
  },
  dateRange: {
    start: { month: 12, day: 31 }, // December 31st (New Year's Eve)
    end: { month: 1, day: 2 }, // January 2nd (day after New Year)
  },
  customClasses: ["newyear-sparkle", "newyear-fireworks", "newyear-glow"],
  icon: "🎆",
};

// Theme configurations map
export const THEME_CONFIGS: Record<CommemorativeTheme, ThemeConfig> = {
  default: defaultTheme,
  halloween: halloweenTheme,
  christmas: christmasTheme,
  "new-year": newYearTheme,
  valentine: defaultTheme, // Placeholder
  easter: defaultTheme, // Placeholder
};

// Helper function to get theme config
export const getThemeConfig = (theme: CommemorativeTheme): ThemeConfig => {
  return THEME_CONFIGS[theme] || THEME_CONFIGS.default;
};

// Helper function to check if a theme is in season
export const isThemeInSeason = (theme: CommemorativeTheme): boolean => {
  const config = getThemeConfig(theme);
  if (!config.dateRange) return false;

  const now = new Date();
  const currentMonth = now.getMonth() + 1; // getMonth() returns 0-11
  const currentDay = now.getDate();

  const { start, end } = config.dateRange;

  // Handle year-crossing date ranges (e.g., Christmas to New Year)
  if (start.month > end.month) {
    return (
      (currentMonth === start.month && currentDay >= start.day) ||
      (currentMonth === end.month && currentDay <= end.day) ||
      currentMonth > start.month ||
      currentMonth < end.month
    );
  }

  // Handle same-year date ranges
  if (currentMonth === start.month && currentMonth === end.month) {
    return currentDay >= start.day && currentDay <= end.day;
  }

  return (
    (currentMonth === start.month && currentDay >= start.day) ||
    (currentMonth === end.month && currentDay <= end.day) ||
    (currentMonth > start.month && currentMonth < end.month)
  );
};

// Get currently suggested theme based on date
export const getSuggestedTheme = (): CommemorativeTheme | undefined => {
  const themes: CommemorativeTheme[] = ["halloween", "christmas"];

  for (const theme of themes) {
    if (isThemeInSeason(theme)) {
      return theme;
    }
  }

  return undefined;
};
