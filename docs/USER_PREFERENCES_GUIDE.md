# 🎯 User Preferences Persistence Guide

## Overview

LondonLink automatically saves user preferences (theme and language) using browser `localStorage`. This means users don't need to reconfigure their preferences on each visit.

## 🌓 Theme Persistence

### What Gets Saved

1. **Theme Mode** (Dark/Light/Auto)
2. **Commemorative Theme** (Halloween, Christmas, etc.)
3. **Manual Override** (If user manually selected a theme)

### How It Works

```
First Visit:
1. User visits site
2. System detects browser preference (dark/light)
3. Checks for seasonal themes
4. Applies appropriate theme

User Changes Theme:
1. User clicks theme toggle
2. New theme applied immediately
3. Preference saved to localStorage
4. Theme persists on next visit

Next Visit:
1. User returns to site
2. System loads saved preference
3. Theme applied before page renders
4. No flash of wrong theme
```

### Storage Details

**Storage Keys:**
- `londonlink-theme-mode`: "light" | "dark" | "auto"
- `londonlink-commemorative-theme`: "default" | "halloween" | "christmas" | etc.
- `londonlink-manual-override`: "true" | null

**Example localStorage:**
```json
{
  "londonlink-theme-mode": "dark",
  "londonlink-commemorative-theme": "christmas",
  "londonlink-manual-override": "true"
}
```

### Automatic vs Manual Themes

#### Automatic Mode (Default)
- System automatically applies seasonal themes
- Changes at midnight when new season starts
- User sees relevant themes without action

#### Manual Override
- User explicitly selects a theme
- System respects user choice
- Seasonal auto-switching disabled
- User can reset to automatic anytime

### Code Example

```tsx
import { useTheme } from "@/contexts";

function ThemeToggle() {
  const { mode, setMode, resetToAutomatic } = useTheme();

  return (
    <div>
      {/* Toggle between light/dark */}
      <button onClick={() => setMode(mode === "dark" ? "light" : "dark")}>
        {mode === "dark" ? "☀️ Light" : "🌙 Dark"}
      </button>

      {/* Reset to automatic */}
      <button onClick={resetToAutomatic}>
        🔄 Auto
      </button>
    </div>
  );
}
```

---

## 🌐 Language Persistence

### What Gets Saved

1. **Selected Language** (Portuguese or English)

### How It Works

```
First Visit:
1. User visits site
2. System detects browser language
3. If browser is Portuguese → Use PT
4. If browser is English → Use EN
5. Otherwise → Default to PT (Brazilian audience)

User Changes Language:
1. User clicks language toggle
2. New language applied immediately
3. All text updates to new language
4. Preference saved to localStorage
5. Language persists on next visit

Next Visit:
1. User returns to site
2. System loads saved language
3. Site displays in preferred language
4. No need to change again
```

### Storage Details

**Storage Key:**
- `londonlink-language`: "pt" | "en"

**Example localStorage:**
```json
{
  "londonlink-language": "pt"
}
```

### Browser Detection

The system uses `navigator.language` to detect browser language:

```typescript
// Browser language detection
navigator.language = "pt-BR" → Language: "pt"
navigator.language = "en-US" → Language: "en"
navigator.language = "es-ES" → Language: "pt" (fallback)
```

### Code Example

```tsx
import { useLanguage } from "@/contexts";

function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button onClick={toggleLanguage}>
      {language === "en" ? "🇧🇷 PT" : "🇬🇧 EN"}
    </button>
  );
}
```

---

## 🔧 Technical Implementation

### Provider Setup

```tsx
// src/app/layout.tsx
import { ThemeProvider, LanguageProvider } from "@/contexts";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### Using in Components

```tsx
// Any component in the app
import { useTheme, useLanguage } from "@/contexts";

function MyComponent() {
  const { mode, setMode } = useTheme();
  const { language, setLanguage } = useLanguage();

  return (
    <div>
      <p>Theme: {mode}</p>
      <p>Language: {language}</p>
    </div>
  );
}
```

---

## 🎨 User Experience Benefits

### 1. **Consistency**
- User sees same theme/language on every visit
- No need to reconfigure preferences
- Seamless experience across sessions

### 2. **Personalization**
- Site adapts to user preferences
- Respects browser settings
- Allows manual customization

### 3. **Performance**
- No flash of wrong theme (FOUC prevention)
- Instant preference application
- Minimal loading delay

---

## 🔒 Privacy & Data

### What We Store

**Only user preferences:**
- Theme mode (light/dark/auto)
- Commemorative theme selection
- Language preference (pt/en)

**We DO NOT store:**
- Personal information
- Browsing history
- Analytics data
- Cookies (beyond localStorage)

### Where It's Stored

- **Location**: Browser's `localStorage`
- **Scope**: Only this website
- **Persistence**: Until user clears browser data
- **Privacy**: Stored locally, never sent to server

### Clearing Preferences

Users can clear preferences by:

1. **Browser Settings**:
   - Clear browsing data
   - Clear localStorage
   - Clear site data

2. **Developer Tools**:
   - Open DevTools (F12)
   - Go to Application → Storage → Local Storage
   - Delete `londonlink-*` keys

3. **Incognito/Private Mode**:
   - Preferences not saved in private browsing
   - Fresh start on each session

---

## 🐛 Troubleshooting

### Theme Not Persisting

**Possible causes:**
1. Browser blocking localStorage
2. Private/Incognito mode
3. Browser data cleared

**Solutions:**
1. Check browser settings
2. Allow localStorage for site
3. Disable private browsing

### Language Reverting to Default

**Possible causes:**
1. localStorage cleared
2. Browser cache issues

**Solutions:**
1. Change language again
2. Clear browser cache
3. Hard refresh (Ctrl+Shift+R)

### Wrong Theme on Load

**Possible causes:**
1. Cached CSS
2. Browser extension interference

**Solutions:**
1. Hard refresh page
2. Disable browser extensions
3. Clear cache

---

## 📊 Storage Limits

### localStorage Limits

- **Capacity**: ~5-10 MB per domain
- **LondonLink Usage**: < 1 KB
- **Impact**: Negligible

### What This Means

- ✅ Plenty of space for preferences
- ✅ No performance impact
- ✅ Room for future features

---

## 🚀 Future Enhancements

Planned features:
- **Font Size Preference**: Accessibility option
- **Animation Preference**: Reduce motion option
- **Color Scheme Customization**: Custom brand colors
- **Layout Preferences**: Compact/comfortable view

---

## 📚 Related Documentation

- **Contexts**: `/src/contexts/README.md`
- **Theme System**: `/src/lib/themes/README.md`
- **Translations**: `/src/translations/README.md`
