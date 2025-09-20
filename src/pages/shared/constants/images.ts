// Shared images used across multiple sections
export const SHARED_IMAGES = {
  logos: {
    main: "/assets/images/shared/logos/logo.svg",
    white: "/assets/images/shared/logos/logo.svg", // Using same PNG for now
    dark: "/assets/images/shared/logos/logo.svg", // Using same PNG for now
    favicon: "/assets/images/shared/logos/favicon.ico",
  },
  icons: {
    ukFlag: "/icons/uk.svg",
    brFlag: "/icons/br.svg",
    // Other icons can be added here when available
  },
  backgrounds: {
    pattern: "/assets/images/shared/backgrounds/pattern.svg",
    noise: "/assets/images/shared/backgrounds/noise.png",
    gradient: "/assets/images/shared/backgrounds/main-gradient.jpg",
  },
} as const;

export const SHARED_IMAGE_ALTS = {
  logos: {
    main: "LondonLink logo",
    white: "LondonLink logo in white",
    dark: "LondonLink logo in dark theme",
    favicon: "LondonLink favicon",
  },
  icons: {
    ukFlag: "United Kingdom flag",
    brFlag: "Brazil flag",
    // Other icon alt texts can be added here when available
  },
} as const;
