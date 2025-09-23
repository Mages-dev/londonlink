"use client";

import { useTheme } from "@/contexts/ThemeContext";

export default function ThemeDebug() {
  const {
    commemorativeTheme,
    mode,
    isCommemorativeThemeActive,
    manualOverride,
  } = useTheme();

  return (
    <div className="fixed bottom-4 left-4 bg-black/80 text-white p-2 rounded text-xs z-50">
      <div>Theme: {commemorativeTheme}</div>
      <div>Mode: {mode}</div>
      <div>Active: {isCommemorativeThemeActive ? "Yes" : "No"}</div>
      <div>Manual: {manualOverride ? "Yes" : "No"}</div>
    </div>
  );
}
