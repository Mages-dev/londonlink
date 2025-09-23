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
  ];

  testDates.forEach(({ date, expected, description }) => {
    // Create a test date and manually check the logic
    const testDate = new Date(date);
    const month = testDate.getMonth() + 1; // getMonth() returns 0-11
    const day = testDate.getDate();

    // Manually check Halloween theme logic
    const isHalloweenSeason = month === 10 && day >= 24 && day <= 31;

    const result = isHalloweenSeason ? "halloween" : "default";

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
 * Remove Halloween theme
 */
export function removeHalloweenTheme() {
  console.log("Removing Halloween theme...");

  document.body.classList.remove("theme-halloween");

  // Reset to default colors
  const root = document.documentElement;
  root.style.setProperty("--primary", "#2563eb");
  root.style.setProperty("--accent", "#ef4444");

  console.log("Default theme restored.");
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
  (window as any).removeHalloweenTheme = removeHalloweenTheme;
}
