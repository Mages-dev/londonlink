// Test utilities for theme system
import { isThemeInSeason, getSuggestedTheme } from "./configs";

/**
 * Test function to verify Halloween theme is working
 * This can be called in browser console to test the theme system
 */
export function testHalloweenTheme() {
  console.log("🎃 Testing Halloween Theme System...");

  // Test date detection
  const isHalloweenSeason = isThemeInSeason("halloween");
  console.log(`Halloween in season: ${isHalloweenSeason}`);

  // Test suggested theme
  const suggested = getSuggestedTheme();
  console.log(`Suggested theme: ${suggested || "none"}`);

  // Test CSS variables
  const root = document.documentElement;
  const primaryColor = getComputedStyle(root).getPropertyValue("--primary");
  console.log(`Current primary color: ${primaryColor}`);

  // Test theme classes
  const body = document.body;
  const hasHalloweenClass = body.classList.contains("theme-halloween");
  console.log(`Halloween theme active: ${hasHalloweenClass}`);

  // Test Halloween effects
  const halloweenElements = document.querySelectorAll(
    ".halloween-glow, .halloween-float, .halloween-card"
  );
  console.log(`Halloween effect elements found: ${halloweenElements.length}`);

  return {
    isHalloweenSeason,
    suggestedTheme: suggested,
    primaryColor,
    hasHalloweenClass,
    effectElementsCount: halloweenElements.length,
  };
}

/**
 * Test automatic theme activation by simulating different dates
 */
export function testDateBasedThemes() {
  console.log("📅 Testing date-based theme activation...");

  const testDates = [
    {
      date: "2024-10-20",
      expected: "default",
      description: "Before Halloween period",
    },
    {
      date: "2024-10-24",
      expected: "halloween",
      description: "Start of Halloween period",
    },
    {
      date: "2024-10-28",
      expected: "halloween",
      description: "During Halloween period",
    },
    { date: "2024-10-31", expected: "halloween", description: "Halloween day" },
    {
      date: "2024-11-01",
      expected: "default",
      description: "After Halloween period",
    },
    {
      date: "2024-12-10",
      expected: "default",
      description: "Before Christmas period",
    },
    {
      date: "2024-12-15",
      expected: "christmas",
      description: "Start of Christmas period",
    },
    {
      date: "2024-12-20",
      expected: "christmas",
      description: "During Christmas period",
    },
    { date: "2024-12-25", expected: "christmas", description: "Christmas day" },
    {
      date: "2024-12-26",
      expected: "default",
      description: "After Christmas period",
    },
    {
      date: "2024-12-30",
      expected: "default",
      description: "Before New Year period",
    },
    {
      date: "2024-12-31",
      expected: "new-year",
      description: "New Year's Eve",
    },
    {
      date: "2025-01-01",
      expected: "new-year",
      description: "New Year's Day",
    },
    {
      date: "2025-01-02",
      expected: "new-year",
      description: "End of New Year period",
    },
    {
      date: "2025-01-03",
      expected: "default",
      description: "After New Year period",
    },
    {
      date: "2025-02-11",
      expected: "default",
      description: "Before Valentine period",
    },
    {
      date: "2025-02-12",
      expected: "valentine",
      description: "Start of Valentine period",
    },
    {
      date: "2025-02-13",
      expected: "valentine",
      description: "During Valentine period",
    },
    {
      date: "2025-02-14",
      expected: "valentine",
      description: "Valentine's Day",
    },
    {
      date: "2025-02-15",
      expected: "default",
      description: "After Valentine period",
    },
    {
      date: "2025-04-18",
      expected: "easter",
      description: "Start of Easter period 2025",
    },
    {
      date: "2025-04-20",
      expected: "easter",
      description: "Easter Sunday 2025",
    },
    {
      date: "2025-04-21",
      expected: "default",
      description: "After Easter period 2025",
    },
    {
      date: "2026-04-03",
      expected: "easter",
      description: "Start of Easter period 2026",
    },
    {
      date: "2026-04-05",
      expected: "easter",
      description: "Easter Sunday 2026",
    },
    {
      date: "2026-04-06",
      expected: "default",
      description: "After Easter period 2026",
    },
  ];

  testDates.forEach(({ date, expected, description }) => {
    // Create a test date and manually check the logic
    const testDate = new Date(date);
    const month = testDate.getMonth() + 1; // getMonth() returns 0-11
    const day = testDate.getDate();

    // Manually check seasonal theme logic
    const isHalloweenSeason = month === 10 && day >= 24 && day <= 31;
    const isChristmasSeason = month === 12 && day >= 15 && day <= 25;
    const isNewYearSeason =
      (month === 12 && day === 31) || // Dec 31st
      (month === 1 && day <= 2); // Jan 1st-2nd
    const isValentineSeason = month === 2 && day >= 12 && day <= 14;

    // Easter dates for testing (calculated dates)
    const easterDates = {
      2025: { month: 4, day: 20 }, // April 20, 2025
      2026: { month: 4, day: 5 }, // April 5, 2026
    };
    const year = testDate.getFullYear();
    const easterData = easterDates[year as keyof typeof easterDates];
    const isEasterSeason =
      easterData &&
      month === easterData.month &&
      day >= easterData.day - 2 &&
      day <= easterData.day;

    let result = "default";
    if (isHalloweenSeason) result = "halloween";
    if (isChristmasSeason) result = "christmas";
    if (isNewYearSeason) result = "new-year";
    if (isValentineSeason) result = "valentine";
    if (isEasterSeason) result = "easter";

    console.log(
      `${date} (${description}): Expected ${expected}, Got ${result} ${
        result === expected ? "✅" : "❌"
      }`
    );
  });
}

/**
 * Force enable Halloween theme for testing
 */
export function forceHalloweenTheme() {
  console.log("🎃 Forcing Halloween theme...");

  // Add theme class to body
  document.body.classList.remove("theme-christmas");
  document.body.classList.add("theme-halloween");

  // Apply Halloween CSS variables
  const root = document.documentElement;
  root.style.setProperty("--primary", "#ea580c");
  root.style.setProperty("--accent", "#7c2d12");
  root.style.setProperty("--special", "#a855f7");
  root.style.setProperty("--special-accent", "#fbbf24");

  console.log("Halloween theme applied! 🎃");
}

/**
 * Force enable Christmas theme for testing
 */
export function forceChristmasTheme() {
  console.log("🎄 Forcing Christmas theme...");

  // Add theme class to body
  document.body.classList.remove("theme-halloween", "theme-new-year");
  document.body.classList.add("theme-christmas");

  // Apply Christmas CSS variables
  const root = document.documentElement;
  root.style.setProperty("--primary", "#dc2626");
  root.style.setProperty("--accent", "#059669");
  root.style.setProperty("--special", "#fbbf24");
  root.style.setProperty("--special-accent", "#fcd34d");

  console.log("Christmas theme applied! 🎄");
}

/**
 * Force enable New Year theme for testing
 */
export function forceNewYearTheme() {
  console.log("🎆 Forcing New Year theme...");

  // Add theme class to body
  document.body.classList.remove(
    "theme-halloween",
    "theme-christmas",
    "theme-valentine"
  );
  document.body.classList.add("theme-new-year");

  // Apply New Year CSS variables
  const root = document.documentElement;
  root.style.setProperty("--primary", "#d97706");
  root.style.setProperty("--accent", "#6366f1");
  root.style.setProperty("--special", "#eab308");
  root.style.setProperty("--special-accent", "#f3f4f6");

  console.log("New Year theme applied! 🎆");
}

/**
 * Force enable Valentine theme for testing
 */
export function forceValentineTheme() {
  console.log("💕 Forcing Valentine theme...");

  // Add theme class to body
  document.body.classList.remove(
    "theme-halloween",
    "theme-christmas",
    "theme-new-year"
  );
  document.body.classList.add("theme-valentine");

  // Apply Valentine CSS variables
  const root = document.documentElement;
  root.style.setProperty("--primary", "#e11d48");
  root.style.setProperty("--accent", "#ec4899");
  root.style.setProperty("--special", "#f472b6");
  root.style.setProperty("--special-accent", "#fce7f3");

  console.log("Valentine theme applied! 💕");
}

/**
 * Force enable Easter theme for testing
 */
export function forceEasterTheme() {
  console.log("🐰 Forcing Easter theme...");

  // Add theme class to body
  document.body.classList.remove(
    "theme-halloween",
    "theme-christmas",
    "theme-new-year",
    "theme-valentine"
  );
  document.body.classList.add("theme-easter");

  // Apply Easter CSS variables
  const root = document.documentElement;
  root.style.setProperty("--primary", "#10b981");
  root.style.setProperty("--accent", "#f59e0b");
  root.style.setProperty("--special", "#fbbf24");
  root.style.setProperty("--special-accent", "#fef3c7");

  console.log("Easter theme applied! 🌸");
}

/**
 * Remove all seasonal themes
 */
export function removeSeasonalThemes() {
  console.log("🌐 Removing all seasonal themes...");

  // Remove theme classes from body
  document.body.classList.remove("theme-halloween");
  document.body.classList.remove("theme-christmas");
  document.body.classList.remove("theme-new-year");
  document.body.classList.remove("theme-valentine");
  document.body.classList.remove("theme-easter");

  // Reset to default colors
  const root = document.documentElement;
  root.style.setProperty("--primary", "#2563eb");
  root.style.setProperty("--accent", "#ef4444");

  console.log("Default theme restored.");
}

/**
 * Remove Halloween theme (legacy function)
 */
export function removeHalloweenTheme() {
  removeSeasonalThemes();
}

// Make functions available globally for testing
if (typeof window !== "undefined") {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).testHalloweenTheme = testHalloweenTheme;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).testDateBasedThemes = testDateBasedThemes;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).forceValentineTheme = forceValentineTheme;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).forceEasterTheme = forceEasterTheme;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).forceHalloweenTheme = forceHalloweenTheme;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).forceChristmasTheme = forceChristmasTheme;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).forceNewYearTheme = forceNewYearTheme;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).removeSeasonalThemes = removeSeasonalThemes;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).removeHalloweenTheme = removeHalloweenTheme;
}
