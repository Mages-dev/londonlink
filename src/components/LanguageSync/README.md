# LanguageSync Component

## 📋 Overview

The `LanguageSync` component is a utility component that synchronizes the HTML `lang` attribute with the current language state from the `LanguageContext`. This ensures proper accessibility and SEO when users change the language.

## 🎯 Purpose

### Problem
In Next.js App Router, the root `layout.tsx` is a Server Component, which means the `<html lang="">` attribute is static at build time. However, LondonLink supports bilingual content (Portuguese/English) that can be changed dynamically by the user.

### Solution
`LanguageSync` is a Client Component that:
1. Listens to language changes from `LanguageContext`
2. Updates the HTML `lang` attribute dynamically
3. Ensures accessibility tools and search engines see the correct language

## 🔧 Implementation

### Component Code

```tsx
"use client";

import { useEffect } from "react";
import { useLanguage } from "@/contexts";

export function LanguageSync() {
  const { language } = useLanguage();

  useEffect(() => {
    // Update the HTML lang attribute when language changes
    document.documentElement.setAttribute("lang", language);
  }, [language]);

  return null; // Doesn't render anything
}
```

### Usage in Layout

```tsx
// src/app/layout.tsx
import { LanguageSync } from "@/components";

export default function RootLayout({ children }) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <head>
        {/* Language initialization script */}
        <script dangerouslySetInnerHTML={{...}} />
      </head>
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <LanguageSync />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

## 🌐 How It Works

### 1. **Initial Load (SSR)**
- HTML is rendered with `lang="pt"` (default)
- Inline script in `<head>` immediately updates `lang` based on localStorage/browser preference
- Prevents flash of wrong language attribute

### 2. **Client-Side Hydration**
- `LanguageSync` mounts inside `LanguageProvider`
- Reads current language from context
- Ensures `lang` attribute matches the context state

### 3. **Language Change**
- User clicks language toggle
- `LanguageContext` updates state
- `LanguageSync` detects change via `useEffect`
- Updates `document.documentElement.setAttribute("lang", language)`

## ✅ Benefits

### Accessibility
- ✅ Screen readers announce content in the correct language
- ✅ Browser translation tools detect the correct language
- ✅ Text-to-speech uses proper pronunciation

### SEO
- ✅ Search engines index content with correct language metadata
- ✅ `hreflang` tags work correctly
- ✅ Better international search rankings

### User Experience
- ✅ No flash of incorrect language attribute
- ✅ Seamless language switching
- ✅ Consistent with user preferences

## 🔍 Technical Details

### Why Not Use State in Layout?

```tsx
// ❌ This doesn't work - layout.tsx is a Server Component
export default function RootLayout({ children }) {
  const { language } = useLanguage(); // Error: Can't use hooks in Server Component
  
  return <html lang={language}>...</html>;
}
```

### Why Inline Script + Client Component?

```tsx
// ✅ This works - Two-phase approach
// Phase 1: Inline script (immediate, no hydration mismatch)
<script>
  var lang = localStorage.getItem('londonlink-language') || 'pt';
  document.documentElement.setAttribute('lang', lang);
</script>

// Phase 2: Client component (reactive, syncs with context)
<LanguageSync />
```

## 🧪 Testing

### Manual Testing
1. Open the site in a browser
2. Open DevTools → Elements
3. Inspect `<html>` tag
4. Click language toggle (PT ↔ EN)
5. Verify `lang` attribute changes

### Automated Testing
```tsx
import { render } from '@testing-library/react';
import { LanguageProvider } from '@/contexts';
import { LanguageSync } from './LanguageSync';

test('updates html lang attribute when language changes', () => {
  const { rerender } = render(
    <LanguageProvider>
      <LanguageSync />
    </LanguageProvider>
  );
  
  // Initial state
  expect(document.documentElement.lang).toBe('pt');
  
  // Change language
  // ... trigger language change
  
  // Verify update
  expect(document.documentElement.lang).toBe('en');
});
```

## 📚 Related Files

- `src/contexts/LanguageContext.tsx` - Language state management
- `src/app/layout.tsx` - Root layout with language initialization
- `src/translations/config.ts` - Language configuration

## 🔗 References

- [MDN: lang attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
- [W3C: Language on the Web](https://www.w3.org/International/questions/qa-html-language-declarations)
- [Next.js: Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)

