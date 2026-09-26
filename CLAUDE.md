# CLAUDE.md

Single source of truth for working in this repository: the facts every session
needs and the constraints that are **not** obvious from the code. Procedures for
a specific kind of change live in project skills (`.claude/skills/`) — see the
routing table below. Versions live in `package.json` and the lockfile only;
read the installed one (`pnpm list <pkg>`) before trusting any note about an
API.

## Project

**LondonLink** — a single-page marketing/landing site for an English-learning
platform aimed at Brazilian Portuguese speakers. Next.js App Router + React +
Tailwind CSS 4, TypeScript, pnpm. One route (`src/app/page.tsx`) composed of
client-component sections, prerendered to static HTML and hydrated. Bilingual
(pt default / en), with a seasonal theme system. Deployed by
`.github/workflows/main.yml` (SSH to a droplet on push to `main`).
Private/proprietary.

## Commands

**pnpm only** — `npm`/`yarn` create a conflicting lockfile. `corepack enable`
once activates the pnpm pinned in `packageManager`.

| Task | Command |
|---|---|
| Dev server (:3000) | `pnpm dev` |
| Production build (also type-checks) | `pnpm build` |
| Production server (:3302) | `pnpm start` |
| Lint, zero warnings (JS/TS/JSX + CSS) | `pnpm lint` |
| Format / check only | `pnpm format` / `pnpm format:check` |
| Type check alone (fast) | `pnpm exec tsc --noEmit` |
| Locale parity en/pt + unused dictionary keys | `pnpm copy:check` |
| Save / diff rendered text (after a build) | `pnpm text:save` / `pnpm text:diff` |
| Save / diff screenshots + text, pt/en × light/dark × desktop/mobile (needs `pnpm start`) | `pnpm visual:save` / `pnpm visual:diff` |
| CSP violations on the running build | `pnpm csp:check` |

## Skills — which to load for which change

Skills live in `.claude/skills/<name>/SKILL.md`; every skill this repo needs is
in it. Each skill's `description` says when it applies; this table is the other
direction. **Before editing, find the row for the change and load every skill
in it.** A change that fits several rows loads the union. Don't write the code
first and check the skill after.

| Change | Load |
|---|---|
| Add, remove or reshape a section or component (`src/domain/`, `src/layout/`, `src/components/`) | `section-guide` + the rows below for what it contains; the full cycle runs through `/section-pipeline` |
| Any user-visible string, alt / aria-label, image path, dictionary | `section-guide` |
| Any React component or hook, effects, state, anything that runs during render | `react-guide` |
| UI: markup, interactive controls, forms, CSS, theme CSS, seasonal effects | `a11y-audit` |
| `next.config.js` (headers/CSP), inline scripts in `layout.tsx`, third-party scripts/embeds | `security-audit` |
| Forms or any input handling | `security-audit`, `a11y-audit` |
| New, removed or bumped dependency | `tooling-guide`, `security-audit`; bumps run through `/deps-update` |
| `eslint.config.mjs`, eslint-disable, Prettier, `lint-staged.config.mjs`, `.husky/`, `pnpm-workspace.yaml`, `scripts/`, Node version, GitHub Actions | `tooling-guide` |
| Restructure, move, rename, split, dead code | `refactor-guide`, `section-guide` + the rows for what is being moved |

## Pipelines

- `/section-pipeline [inventory | next | refactor <path> | add <name> <intent> | remove <path>]`
  — one unit at a time: audit (`section-auditor` agent) → plan with the
  expected text/visual drift → **stop for approval** → baseline → structure
  commits → behavior commits → verification → review (`section-reviewer`
  agent) → **stop**.
- `/deps-update [check | patch | minor | <pkg> ...]` — list within the release
  cooldown → read every release note → report → **stop** → bump → fix the
  skills that teach it → verify → **stop**.
- Working files live outside the repo, in the sibling
  `../londonlink.local-context/` (`pipeline/`, `deps/`; create if missing).
  Never reference them from committed code.

## Architecture

Layered + domain-driven:

- `src/app/` — App Router entry (`layout.tsx`, `page.tsx`, `globals.css`).
- `src/layout/` — structural chrome: `Header`, `HeaderWithTheme`, `Footer`.
- `src/components/` — cross-cutting: `WhatsAppFloat/`, `LanguageSync/`, `ui/`
  (reusable UI + seasonal `*Effects.tsx`), `debug/` (dev-only).
- `src/domain/<section>/` — one self-contained folder per section (hero, about,
  goals, books, feedback, gallery, contact) plus `shared/`. Contract and
  touch-points: `section-guide`.
- `src/contexts/` — `ThemeContext`, `LanguageContext` (+ barrel).
- `src/translations/` — language config (`SUPPORTED_LANGUAGES`,
  `DEFAULT_LANGUAGE`) and utilities.
- `src/lib/themes/` — theme CSS, `configs.ts`, calculators.
- `src/styles/`, `src/hooks/`, `src/types/` — shared globals.
- `scripts/` — Node utilities and the check scripts; ignored by ESLint.
- Path alias `@/*` → `src/*`; import through barrels (`@/layout`,
  `@/components`, `@/contexts`, `@/domain/sections`, `@/domain/<section>`).
- `dist/` and `.next/` are build output (git-ignored).

## State, contexts & persistence

- `useTheme()` (`@/contexts`): `mode` (`'light'|'dark'|'auto'`), `setMode`,
  `commemorativeTheme`, `setCommemorativeTheme`; helpers `useThemeColors()`,
  `useThemeSeason()`.
- `useLanguage()`: `language` (`'pt'|'en'`), `setLanguage`, `toggleLanguage`.
- Provider order (`layout.tsx`): `<ThemeProvider><LanguageProvider>…`.
- Persistence is client-only `localStorage`: `londonlink-theme-mode`,
  `londonlink-commemorative-theme`, `londonlink-manual-override`,
  `londonlink-language` (`STORAGE_KEYS` in `ThemeContext.tsx`, plus inline
  reads). Contexts gate on a `mounted` flag before reading storage.
- An unsupported language code falls back to English
  (`getLanguageWithFallback`); there is **no per-key fallback** — a key missing
  in one locale renders nothing, which is why `copy:check` exists.

## Theme system

- Two independent axes: **mode** (`light`/`dark`/`auto`) and **commemorative
  theme** (`default`, `carnival`, `valentine`, `easter`, `halloween`,
  `christmas`, `new-year` — `src/lib/themes/configs.ts`).
- Auto-activation by date range; overlaps resolve by priority (`valentine` >
  `carnival` > `easter` > `halloween` > `christmas` > `new-year`). A
  `manual-override` disables auto.
- No-flash: inline `<head>` scripts in `layout.tsx` apply the mode class and
  `lang` before hydration; `suppressHydrationWarning` on `<html>`/`<body>` is
  deliberate.
- Each theme has `src/lib/themes/<theme>.css` with light/dark variants; the
  `.light`/`.dark` classes redefine the `:root` tokens. Seasonal effects
  (`src/components/ui/*Effects.tsx`) are all mounted in `page.tsx` and render
  `null` until their theme is active.
- Dev-only: `ThemeSelector`, `ThemeDebug`, `src/lib/themes/test-theme`
  helpers.
- Fonts: the `next/font` variable classes (`--font-geist-*`) sit on `<html>`,
  because the Tailwind theme tokens that read them resolve at `:root`
  (`tooling-guide` → Tailwind).

## Components of note

- `WhatsAppFloat` (`currentLanguage` required): bottom-right, delayed reveal;
  number from `CONTACT_INFO` (`src/domain/shared/constants/contacts.ts`).
- `LanguageSync`: render-less, keeps `<html lang>` in sync at runtime.

## Coding standards

- Prettier owns formatting (`pnpm format`); ESLint owns correctness.
- TypeScript: explicit types on exported APIs; no `any` (use `unknown`, then
  narrow); props as named `interface`/`type`.
- Immutability: never mutate state objects/arrays in place.
- Render is pure; browser-only reads go behind the mount guard (`react-guide`).
- Keep functions small and files focused; organize by feature/domain.

## Accessibility

Target **WCAG 2.2 AA**; a site-wide pass shipped in v2.4.0. Checklist and
references: `a11y-audit`. Non-negotiables:

- One `<h1>` (hero); each section is `<section aria-labelledby>` with a real
  heading; landmarks + skip link stay in place.
- Every image has `alt` from its `*_IMAGE_ALTS` constant (decorative → `""`).
- Icon-only controls have an accessible name; stateful toggles keep
  `aria-pressed`/`aria-expanded` in sync with React state.
- Everything works by keyboard, with visible `:focus-visible` styles.
- Seasonal effects and theme CSS honor `prefers-reduced-motion`.
- Accessible names go in both `en` and `pt`.

## Security

Production CSP + OWASP hardening headers live in `next.config.js` (baked in at
build time). Checklist and rationale: `security-audit`. Non-negotiables:

- **CSP `'unsafe-inline'`/`'unsafe-eval'` are a documented accepted risk**
  (decision 2026-06: static brochure page, no user data in the DOM; a nonce would
  force dynamic rendering). Revisit — nonce migration in its own PR — if user
  input, a backend form, or auth is ever added.
- **One Next config:** `next.config.js`. Do not reintroduce `next.config.ts`.
- A third-party service gets exactly the CSP origins it needs; verify with
  `pnpm csp:check`.
- `dangerouslySetInnerHTML` only for the trusted bootstrap scripts in
  `layout.tsx`; never user-derived HTML.
- No secrets in client code (the GA measurement ID is public).
- This project has a history of Next.js CVEs: keep `pnpm audit` clean and Next
  patched (`tooling-guide`, `/deps-update`).

## Verification

The pre-commit hook runs Prettier, ESLint, `tsc` and `copy:check` on staged
files (`tooling-guide`); CI runs format, lint, `copy:check`, build and
`pnpm audit --prod` on pull requests. Before declaring a change done:

1. `pnpm lint` and `pnpm format:check`.
2. `pnpm build` (includes the type check).
3. `pnpm copy:check` when copy or components changed.
4. `pnpm text:diff` against a baseline saved before the change — "unchanged"
   for refactor/markup work; otherwise exactly the intended drift.
5. `pnpm visual:diff` (with `pnpm start`) when markup, CSS or client behavior
   changed — it covers English, dark mode and mobile, which `text:diff` does
   not.
6. `pnpm csp:check` when headers, `layout.tsx` or a third party changed.

Say which of these ran and what was checked by hand.

## Versioning & release

- Version lives in **two places that must stay in sync**: `package.json`
  `version` and `APP_VERSION` in `src/lib/version.ts` (rendered in the footer).
  Update both, plus `CHANGELOG.md` (Keep a Changelog). SemVer; tags `vX.Y.Z`.
- **Do not bump the version unless explicitly asked.**

## Git workflow

- Branches: `develop` (active integration), `main` (default/stable),
  `migration/vite` (experimental). Branch off `develop`.
- Conventional commits (`feat|fix|refactor|docs|chore|build|ci|perf|test|style`),
  scoped when it helps. Structure separate from behavior; dependency bumps in
  their own `chore(deps)`; large mechanical changes in their own commit.
- No `Co-Authored-By` trailer.
