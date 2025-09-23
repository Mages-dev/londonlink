"use client";

import { useState, useEffect } from "react";
import { Language } from "@/types";
import Header from "./Header";

interface HeaderWithThemeProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export default function HeaderWithTheme({
  currentLanguage,
  onLanguageChange,
}: HeaderWithThemeProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Render Header without theme features during SSR
  if (!mounted) {
    return (
      <Header
        currentLanguage={currentLanguage}
        onLanguageChange={onLanguageChange}
        disableThemeSelector={true}
      />
    );
  }

  // Render full Header with theme features after hydration
  return (
    <Header
      currentLanguage={currentLanguage}
      onLanguageChange={onLanguageChange}
      disableThemeSelector={false}
    />
  );
}
