import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";

import "./index.css";
import "./lib/themes/carnival.css";
import "./lib/themes/valentine.css";
import "./lib/themes/easter.css";
import "./lib/themes/halloween.css";
import "./lib/themes/christmas.css";
import "./lib/themes/new-year.css";

import { ThemeProvider, LanguageProvider } from "@/contexts";
import { LanguageSync } from "@/components";
import App from "./App";

if (import.meta.env.DEV) {
  import("./lib/themes/test-theme");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <LanguageSync />
        <App />
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>
);
