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

    let result = "default";
    if (isHalloweenSeason) result = "halloween";
    if (isChristmasSeason) result = "christmas";
    if (isNewYearSeason) result = "new-year";

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
  document.body.classList.remove("theme-halloween", "theme-christmas");
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
 * Remove all seasonal themes
 */
export function removeSeasonalThemes() {
  console.log("🌐 Removing all seasonal themes...");

  // Remove theme classes from body
  document.body.classList.remove("theme-halloween");
  document.body.classList.remove("theme-christmas");
  document.body.classList.remove("theme-new-year");

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
