---
name: react-guide
description: Use before writing or reviewing any React component or hook in src/ (every section is a client component) — deciding on useEffect, useMemo/useCallback, refs, state placement, localStorage reads, or anything that runs during render. Covers render purity and hydration (react-hooks/purity), the mount-guard pattern, what not to use useEffect for, dependency identity (inline arrays/callbacks re-running effects), and state colocation, for React 19 without the React Compiler.
---

# React guide

React 19, **without the React Compiler** (not installed, not enabled in
`next.config.js`). Check `pnpm list babel-plugin-react-compiler` and
`reactCompiler` in `next.config.js` before trusting the memo rules below — if
the Compiler is turned on, manual memoization becomes the exception.

The page is prerendered to static HTML and hydrated on the client, so anything
that differs between the server render and the first client render is a
hydration mismatch.

## Purity and hydration

- **Never call impure functions during render** (`react-hooks/purity`):
  `Math.random()`, `Date.now()`, `new Date()`, `localStorage`, `window` — not
  inline in JSX, not in a `style` prop, not in `useMemo`. Generate such data in
  a `useEffect` into state, or precompute it into the objects you map over.
- **Mount guard** for anything browser-only:
  `const [mounted, setMounted] = useState(false); useEffect(() => setMounted(true), [])`,
  render the server-safe version until `mounted`. `react-hooks/set-state-in-effect`
  is disabled in `eslint.config.mjs` for exactly this.
- The contexts (`useTheme`, `useLanguage`) already gate their `localStorage`
  reads on mount; read state from them, not from `localStorage` in a component.
- Seasonal effects and anything random: precompute positions in the effect
  that activates the theme, keep render deterministic.

## useEffect: what it is not for

- **Deriving state from props or other state** → compute it during render.
- **Reacting to an event** → do it in the event handler.
- **Syncing with an external store** → `useSyncExternalStore`.
- Legitimate uses here: subscribing to the browser (`IntersectionObserver`,
  scroll, `matchMedia`, timers) and the mount guard. Always return the cleanup
  (`disconnect()`, `removeEventListener`, `clearTimeout`).

## Dependency identity

An array, object or function created during render is a new value every
render. Passed to an effect's dependency list (directly or through a custom
hook's parameters), it re-runs the effect on every render — an observer or
listener is torn down and rebuilt each time, and an event in between is lost.

- Hoist constant arrays/objects to module scope (`const SECTION_IDS = [...]`).
- For a callback the effect needs, pass a stable one (`useCallback` with real
  deps, or a state setter, which is already stable) or read the latest value
  through a ref inside the effect.
- Prove a fix: capture what the effect subscribes, re-render, and check it was
  not re-created (or count observer constructions in the browser).

## Memoization (no Compiler)

- Default: no `useMemo` / `useCallback` / `React.memo`.
- Use them when the value is an effect/subscription dependency that must keep
  its identity (above), or when the profiler showed a real cost — not on
  suspicion.

## Components

- `ref` is a regular prop in React 19: no `forwardRef` in new code.
- Hooks never conditional; custom hooks start with `use`.
- **State colocation:** state lives as close to its consumer as possible;
  lift it only when shared.
- Every section component takes `currentLanguage: Language` and reads copy from
  its domain dictionary (`section-guide`); no string literals in JSX.
- Dev-only UI (`ThemeDebug`, `ThemeSelector`) renders behind
  `process.env.NODE_ENV === 'development'`. The build replaces that with a
  constant and drops the dead branch together with the component (verified
  2026-09-26: `ThemeDebug`'s strings are absent from `.next/static/chunks`).
  Keep the check inline and static so it stays eliminable; verify the same way
  after adding dev-only UI.
