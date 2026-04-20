# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack

- **Vite 8** (SPA, no SSR) — dev server on port **3000**
- **React 19.2** — function components with compiler-enforced purity rules
- **TypeScript 5** with project references (`tsconfig.app.json` for runtime, `tsconfig.node.json` for tooling)
- **Tailwind CSS 4** via `@tailwindcss/vite`
- **ESLint 10** (flat config) + `typescript-eslint` 8 + `eslint-plugin-react-hooks` 7
- **Prettier 3** (config in `.prettierrc.mjs`), integrated with ESLint via `eslint-config-prettier`
- **pnpm** for dependency management
- Path alias: **`@/` → `src/`** (configured in `vite.config.ts` and `tsconfig.app.json`)

## Commands

- `pnpm dev` — start Vite dev server
- `pnpm build` — type-check (`tsc -b`) then `vite build` into `dist/`
- `pnpm preview` — serve the built `dist/` for smoke-testing
- `pnpm lint` — ESLint
- `pnpm format` / `pnpm format:check` — Prettier

No test runner is configured.

## Architecture

### Entry flow

`index.html` → [src/main.tsx](src/main.tsx) → `ThemeProvider` → `LanguageProvider` → `LanguageSync` → [src/App.tsx](src/App.tsx) → composes domain sections from [src/domain/sections.ts](src/domain/sections.ts).

All seasonal theme CSS files are imported eagerly in `main.tsx` — themes activate via CSS variables/classes, not conditional bundles.

### Layered structure

- `src/layout/` — structural chrome (Header, Footer)
- `src/components/` — global cross-cutting components (e.g. `WhatsAppFloat`, `ui/*Effects`, `ThemeSelector`)
- `src/domain/<section>/` — self-contained business sections (hero, about, goals, books, feedback, gallery, contact). Each follows: `components/`, `hooks/`, `constants/`, `translations/`, `styles/`, `types/`, `index.ts`.
- `src/domain/shared/` — cross-domain utilities, notably `OptimizedImage`
- `src/contexts/` — `ThemeContext`, `LanguageContext` (+ `LanguageSync`)
- `src/translations/` — top-level language config + utilities; actual strings live **per domain** under `src/domain/*/translations/`
- `src/lib/themes/` — seasonal theme CSS + date-based activation calculators

### Domain pattern

When adding a new section: create `src/domain/<name>/` mirroring an existing domain (hero is canonical), export the section component from `src/domain/sections.ts`, and compose it in `src/App.tsx`. Translations are **colocated** — do not put section-specific strings in `src/translations/`.

### Themes

Seasonal themes (`carnival`, `valentine`, `easter`, `halloween`, `christmas`, `new-year`) toggle at runtime through `ThemeContext`. Activation can be forced via query string (e.g. `?theme=carnival`) for QA. Calculators in `src/lib/themes/*-calculator.ts` derive the active window for movable holidays.

### i18n

Two languages: `en` (default) and `pt`. Each domain exports its own translation object keyed by language. `LanguageContext` holds the current language; `LanguageSync` keeps `<html lang>` in sync.

## React 19 practices (enforced by `eslint-plugin-react-hooks` v7)

### Render must be pure

Components and hooks cannot call impure APIs (`Math.random`, `Date.now`, `new Date`, DOM reads/writes) during render — including inside `useMemo` bodies. Violations trigger `react-hooks/purity`.

- **Stable random data** → lift to a module-level `const`:
  ```tsx
  // ✅ computed once per module load
  const LOVE_LETTER_POSITIONS = Array.from({ length: 15 }, (_, i) => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
  }));
  ```
- **Initial state that depends on impure reads** → lazy initializer:
  ```tsx
  // ✅ function runs once, on first render only
  const [language] = useState(() => {
    const saved = localStorage.getItem(KEY);
    return saved ?? detectBrowserLanguage();
  });
  ```

### Do not `setState` synchronously inside an effect body

`react-hooks/set-state-in-effect` flags cascading renders. If you're tempted to write `useEffect(() => { setX(compute()) }, [])`, the fix is usually **not** a cleaner effect — it's one of:

1. **Initialize lazily** with `useState(() => compute())`.
2. **Derive during render** if the value is cheap.
3. **Use the "derive state from props" pattern** for resetting state on prop change:
   ```tsx
   const [prev, setPrev] = useState(prop);
   if (prev !== prop) {
     setPrev(prop);
     setState(computeFromProp(prop));
   }
   ```
   React detects this and skips the intermediate render; it is officially supported.
4. **Remove the effect entirely** if the value is derivable (`const loading = false` beats a one-shot effect that sets `loading` to false).

`setState` **inside** an interval/timeout/event handler is async — that is fine and not flagged.

### No SSR guards

This is a Vite SPA. The `const [mounted, setMounted] = useState(false); useEffect(() => setMounted(true), [])` pattern is a Next.js SSR hydration guard and must not be reintroduced. Read `localStorage` / `window` directly in `useState` lazy initializers.

### Effects are for external-system sync, nothing else

Reach for `useEffect` only when syncing with: DOM APIs (event listeners, `IntersectionObserver`, `matchMedia`), subscriptions, timers, or external stores. Anything expressible during render (derived values, transformations) should stay in render — usually via `useMemo` or plain expressions, not state + effect.

### React 19 conveniences to prefer

- **`ref` as a prop** — pass `ref` directly to function components; do not wrap in `forwardRef`.
- **`<Context>` as provider** — write `<MyContext value={...}>`, not `<MyContext.Provider value={...}>`.
- **Native document metadata** — `<title>`, `<meta>`, `<link>` rendered in components hoist into `<head>` automatically. No `react-helmet` needed.
- **`use(promise)` / `use(context)`** — reads can be conditional, unlike hooks. Useful for Suspense boundaries around async data.
- **Ref cleanup callbacks** — ref callbacks may return a cleanup function, removing the need for separate effects to tear down ref subscriptions.

## Conventions

- No `"use client"` directives — this is a pure client-side SPA.
- Prettier: single quotes, trailing commas, 80-col width, LF line endings.
- Treat the app as a static SPA: no SSR, no API routes, no middleware.
- `pnpm build` runs `tsc -b` before Vite — fix type errors before expecting a successful build.
