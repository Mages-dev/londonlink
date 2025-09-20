// TypeScript type definitions
// Add type exports here as they are created

// Common types for the LondonLink project
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  level: "beginner" | "intermediate" | "advanced";
}

// Re-export Language type from translations config for consistency
export type { Language } from "@/translations/config";

export interface NavigationItem {
  href: string;
  label: {
    pt: string;
    en: string;
  };
}
