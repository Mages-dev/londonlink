'use client';

import { useTheme } from '@/contexts/ThemeContext';

export default function ThemeDebug() {
  const { commemorativeTheme, mode, isCommemorativeThemeActive, manualOverride } = useTheme();

  return (
    <div className="fixed bottom-4 left-4 z-50 rounded bg-black/80 p-2 text-xs text-white">
      <div>Theme: {commemorativeTheme}</div>
      <div>Mode: {mode}</div>
      <div>Active: {isCommemorativeThemeActive ? 'Yes' : 'No'}</div>
      <div>Manual: {manualOverride ? 'Yes' : 'No'}</div>
    </div>
  );
}
