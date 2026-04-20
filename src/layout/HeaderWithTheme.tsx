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
  return (
    <Header
      currentLanguage={currentLanguage}
      onLanguageChange={onLanguageChange}
      disableThemeSelector={false}
    />
  );
}
