/**
 * Version utilities for LondonLink
 * Hardcoded version to avoid build issues with package.json imports
 */

/**
 * Current application version
 * Update this when releasing new versions
 */
export const APP_VERSION = "2.1.2";

/**
 * Application name
 */
export const APP_NAME = "londonlink";

/**
 * Application description
 */
export const APP_DESCRIPTION =
  "English Learning Platform with Brazilian Portuguese Focus";

/**
 * Parse semantic version into components
 */
export function parseVersion(version: string = APP_VERSION) {
  const [major, minor, patch] = version.split(".").map(Number);
  return { major, minor, patch };
}

/**
 * Get formatted version string
 */
export function getVersionString(prefix: string = "v"): string {
  return `${prefix}${APP_VERSION}`;
}

/**
 * Get version with build date
 */
export function getVersionWithDate(): string {
  const buildDate = new Date().toISOString().split("T")[0];
  return `${APP_VERSION} (${buildDate})`;
}

/**
 * Check if version is production ready (>= 1.0.0)
 */
export function isProductionVersion(): boolean {
  const { major } = parseVersion();
  return major >= 1;
}

/**
 * Get version badge color based on version number
 */
export function getVersionBadgeColor(): string {
  const { major } = parseVersion();

  if (major === 0) return "yellow"; // Beta
  if (major === 1) return "green"; // Stable
  return "blue"; // Future versions
}

/**
 * Get version display info
 */
export function getVersionInfo() {
  const { major, minor, patch } = parseVersion();

  return {
    version: APP_VERSION,
    versionString: getVersionString(),
    major,
    minor,
    patch,
    isProduction: isProductionVersion(),
    badgeColor: getVersionBadgeColor(),
    name: APP_NAME,
    description: APP_DESCRIPTION,
  };
}
