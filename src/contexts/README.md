# Contexts - Global State Management

## 📋 Overview

This directory contains React Context providers for managing global application state with **automatic persistence** using `localStorage`.

## 🎯 Available Contexts

### 1. **ThemeContext** - Theme Management

Manages dark/light mode and commemorative themes with automatic persistence.

#### Features:
- ✅ **Dark/Light Mode**: Manual or automatic (system preference)
- ✅ **Commemorative Themes**: Seasonal themes (Halloween, Christmas, etc.)
- ✅ **Automatic Detection**: Detects system theme preference
- ✅ **Persistence**: Saves preferences to localStorage
- ✅ **Seasonal Logic**: Auto-applies themes based on dates
- ✅ **Manual Override**: User can override automatic themes

#### Usage:

```tsx
import { useTheme } from "@/contexts";

function MyComponent() {
  const { mode, setMode, commemorativeTheme, setCommemorativeTheme } = useTheme();

  return (
    <div>
      <button onClick={() => setMode(mode === "dark" ? "light" : "dark")}>
        Toggle Theme
      </button>
      <p>Current mode: {mode}</p>
      <p>Current theme: {commemorativeTheme}</p>
    </div>
  );
}
```

#### Storage Keys:
- `londonlink-theme-mode`: Stores theme mode (light/dark/auto)
- `londonlink-commemorative-theme`: Stores commemorative theme
- `londonlink-manual-override`: Tracks manual theme override

---

### 2. **LanguageContext** - Language Management

Manages application language with automatic persistence and browser detection.

#### Features:
- ✅ **Bilingual Support**: Portuguese (pt) and English (en)
- ✅ **Browser Detection**: Auto-detects user's browser language
- ✅ **Persistence**: Saves language preference to localStorage
- ✅ **Easy Toggle**: Simple toggle between languages
- ✅ **Type-Safe**: Full TypeScript support

#### Usage:

```tsx
import { useLanguage } from "@/contexts";

function MyComponent() {
  const { language, setLanguage, toggleLanguage } = useLanguage();

  return (
    <div>
      <button onClick={toggleLanguage}>
        Switch to {language === "en" ? "PT" : "EN"}
      </button>
      <p>Current language: {language}</p>
    </div>
  );
}
```

#### Storage Key:
- `londonlink-language`: Stores selected language (pt/en)

---

## 🏗️ Architecture

### Provider Hierarchy

```tsx
// src/app/layout.tsx
<ThemeProvider>
  <LanguageProvider>
    {children}
  </LanguageProvider>
</ThemeProvider>
```

### Hydration Safety

Both contexts implement **hydration-safe patterns**:

1. **Mounted State**: Prevents hydration mismatches
2. **SSR Fallback**: Provides default values during SSR
3. **Client-Only Storage**: Only accesses localStorage on client

```tsx
// Don't render until mounted to avoid hydration mismatch
if (!mounted) {
  return (
    <Context.Provider value={defaultValue}>
      {children}
    </Context.Provider>
  );
}
```

---

## 💾 Persistence Strategy

### How It Works

1. **Initial Load**:
   - Check `localStorage` for saved preference
   - If found: Use saved value
   - If not found: Use browser detection or default

2. **On Change**:
   - Update React state
   - Save to `localStorage` automatically
   - Apply changes to DOM/UI

3. **On Reload**:
   - Restore from `localStorage`
   - User sees their previous preferences

### Storage Keys Convention

All keys follow the pattern: `londonlink-[feature]-[property]`

Examples:
- `londonlink-theme-mode`
- `londonlink-language`
- `londonlink-commemorative-theme`

---

## 🎨 Theme Context Details

### Theme Modes

- **`light`**: Force light mode
- **`dark`**: Force dark mode
- **`auto`**: Follow system preference

### Commemorative Themes

- **`default`**: Standard LondonLink theme
- **`halloween`**: October theme
- **`christmas`**: December theme
- **`carnival`**: February/March theme
- **`valentine`**: February 14 theme
- **`easter`**: Easter period theme
- **`new-year`**: January 1 theme

### Automatic Theme Logic

```typescript
// Themes are automatically applied based on dates
const suggested = getSuggestedTheme(); // Returns theme for current date

// User can override automatic themes
setCommemorativeTheme("halloween"); // Manual override
resetToAutomatic(); // Return to automatic management
```

---

## 🌐 Language Context Details

### Supported Languages

- **`pt`**: Portuguese (Brazilian) - Default
- **`en`**: English (US)

### Browser Detection

```typescript
// Automatically detects browser language on first visit
const browserLanguage = detectBrowserLanguage();
// Returns: "pt" or "en" based on navigator.language
```

### Language Toggle

```typescript
// Simple toggle between languages
toggleLanguage(); // pt → en or en → pt
```

---

## 🔧 Advanced Usage

### Multiple Hooks

```tsx
import { 
  useTheme, 
  useThemeColors, 
  useThemeSeason,
  useLanguage 
} from "@/contexts";

function AdvancedComponent() {
  const { mode, setMode } = useTheme();
  const colors = useThemeColors();
  const isHalloweenSeason = useThemeSeason("halloween");
  const { language, toggleLanguage } = useLanguage();

  return (
    <div style={{ backgroundColor: colors.background }}>
      <p>Mode: {mode}</p>
      <p>Language: {language}</p>
      <p>Halloween season: {isHalloweenSeason ? "Yes" : "No"}</p>
    </div>
  );
}
```

### Theme Suggestions

```tsx
import { useThemeSuggestions } from "@/contexts";

function ThemeSuggestionBanner() {
  const { 
    suggestedTheme, 
    shouldShowSuggestion, 
    acceptSuggestion, 
    dismissSuggestion 
  } = useThemeSuggestions();

  if (!shouldShowSuggestion) return null;

  return (
    <div className="suggestion-banner">
      <p>Try our {suggestedTheme} theme!</p>
      <button onClick={acceptSuggestion}>Accept</button>
      <button onClick={dismissSuggestion}>Dismiss</button>
    </div>
  );
}
```

---

## 🚀 Benefits

### 1. **User Experience**
- ✅ Preferences persist across sessions
- ✅ No need to reconfigure on each visit
- ✅ Smooth, consistent experience

### 2. **Developer Experience**
- ✅ Simple, intuitive API
- ✅ Type-safe with TypeScript
- ✅ Automatic persistence (no manual localStorage calls)

### 3. **Performance**
- ✅ Minimal bundle impact
- ✅ Efficient re-renders
- ✅ SSR-safe implementation

---

## 📚 Related Documentation

- **Theme System**: `/src/lib/themes/README.md`
- **Translations**: `/src/translations/README.md`
- **Layout Components**: `/src/layout/README.md`

---

## 🔮 Future Enhancements

Potential additions:
- **User Preferences Context**: Font size, animations, etc.
- **Analytics Context**: Track user interactions
- **Notification Context**: Toast notifications
- **Auth Context**: User authentication state
