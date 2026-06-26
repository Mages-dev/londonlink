# CLAUDE.md

Single source of truth for working in this repository. Read this before making
changes — it consolidates conventions previously scattered across many module
`README.md` files and the `docs/` guides, and records the constraints that are
**not** obvious from the code.

## Project

**LondonLink** — a single-page marketing/landing site for an English-learning
platform aimed at Brazilian Portuguese speakers. Next.js App Router; the page is
fully client-rendered sections composed in `src/app/page.tsx`. Bilingual
(pt default / en). Has a seasonal theme system. Private/proprietary.

## Commands

This project uses **pnpm exclusively**. Never run `npm` or `yarn` — they create a
conflicting lockfile. The pnpm version is pinned via `packageManager`.

```bash
corepack enable        # one-time: activates the pinned pnpm
pnpm install
pnpm dev               # dev server on :3000
pnpm build             # production build (Turbopack)
pnpm start             # production server on :3302
pnpm lint              # ESLint (flat config)
pnpm format            # Prettier --write .
pnpm format:check      # Prettier --check . (use in CI / before commit)
```

A change is "done" only when `pnpm lint`, `pnpm format:check`, and `pnpm build`
all pass.

## Skills & agents to use

Prefer the available skills/agents over re-deriving generic checklists. Match the
task to the tool:

| Task                                | Use                                            |
| ----------------------------------- | ---------------------------------------------- |
| Review your own diff before commit  | `/code-review` skill                           |
| Security review of changes          | `/security-review` skill / `security-reviewer` |
| Accessibility / ARIA work           | `a11y-architect` agent                         |
| TS/JS-specific review               | `typescript-reviewer` agent                    |
| Fix a broken build / type errors    | `/build-fix` skill                             |
| Add or raise test coverage          | `/test-coverage` skill, `tdd-guide` agent      |
| Plan a non-trivial feature/refactor | `planner` / `architect` agent                  |
| Open a PR                           | `/pr` skill                                    |
| Verify a change actually works      | `/verify` or `/run` skill                      |

When a skill exists for what you are doing, invoke it instead of hand-writing the
equivalent steps.

## Stack & version constraints

- Next.js `~16.2.9`, React `~19.2.7`, TypeScript `^5`, Tailwind CSS v4,
  Node `>=24` (see `.nvmrc`).
- **Do not bump these without checking the toolchain:**
  - `eslint` stays at **^9**. ESLint 10 breaks the `@typescript-eslint` v8
    bundled by `eslint-config-next` (`FlatESLint` class is undefined).
  - `typescript` stays at **^5**. `@typescript-eslint` v8 caps at
    `typescript < 6.0.0`; TS 6 runs but leaves type-aware linting unsupported.
  - Both unblock only when `eslint-config-next` ships `typescript-eslint` v9.
  - `@types/node` tracks the **runtime** (Node 24), so keep it at `^24`.
- Image optimization uses `sharp`; its native build is approved in
  `pnpm-workspace.yaml` (`allowBuilds`). After adding a dependency with an install
  script, approve intentionally with `pnpm approve-builds <pkg>` — never blanket.
- This project has a history of Next.js CVEs (the reason for the v2.3.0 bump).
  Keep Next.js patched within its minor range.

## Architecture

Layered + domain-driven. Keep these boundaries:

- `src/app/` — App Router entry (`layout.tsx`, `page.tsx`, `globals.css`).
- `src/layout/` — structural chrome: `Header`, `HeaderWithTheme`, `Footer`.
- `src/components/` — global, cross-cutting: `WhatsAppFloat/`, `LanguageSync/`,
  `ui/` (reusable UI + seasonal `*Effects.tsx`), `debug/` (dev-only).
- `src/domain/<section>/` — one self-contained folder per business section
  (hero, about, goals, books, feedback, gallery, contact, shared).
- `src/contexts/` — `ThemeContext`, `LanguageContext` (+ barrel).
- `src/translations/` — i18n config + utilities.
- `src/lib/themes/` — theme CSS, `configs.ts`, calculators.
- `src/styles/`, `src/hooks/`, `src/types/` — shared globals.

### Domain folder contract

```
src/domain/<section>/
├── components/      # React components for this section
├── hooks/           # section-specific hooks
├── constants/       # constants, including images.ts
├── translations/    # en.ts, pt.ts, index.ts
├── styles/          # section CSS (no cross-domain CSS)
├── types/           # section types
└── index.ts         # barrel export
```

- Every section component receives a `currentLanguage: Language` prop.
- Add a section: create the folder above, export it from
  `src/domain/sections.ts`, render it in `src/app/page.tsx`.

### Imports

- Path alias `@/*` -> `src/*` (`tsconfig.json`).
- Import through barrels: `@/layout`, `@/components`, `@/contexts`,
  `@/domain/sections`, `@/domain/<section>`, `@/translations`.

## State, contexts & persistence

- `useTheme()` (from `@/contexts`) exposes: `mode` (`'light'|'dark'|'auto'`),
  `setMode`, `commemorativeTheme`, `setCommemorativeTheme`. Helper hooks:
  `useThemeColors()`, `useThemeSeason()`.
- `useLanguage()` exposes: `language` (`'pt'|'en'`), `setLanguage`,
  `toggleLanguage`.
- Provider order (in `layout.tsx`): `<ThemeProvider><LanguageProvider>…`.
- Persistence is `localStorage`, client-only. Keys (defined in `STORAGE_KEYS`,
  `ThemeContext.tsx`, plus inline reads):
  - `londonlink-theme-mode`
  - `londonlink-commemorative-theme`
  - `londonlink-manual-override`
  - `londonlink-language`
- Contexts are hydration-safe: they gate on a `mounted` flag before reading
  storage (see Coding standards on the mount pattern).

## Internationalization

- Languages: `pt` (default) and `en`. Source of truth:
  `src/translations/config.ts` (`SUPPORTED_LANGUAGES`, `DEFAULT_LANGUAGE`,
  `LANGUAGE_CONFIG`). Missing keys fall back to English.
- Each domain owns `translations/{en,pt}.ts` and re-exports via `index.ts` as
  `const xTranslations = { en, pt } as const`. **Add new copy to both `en` and
  `pt`** — keep keys in sync; `as const` enforces type safety.
- Consume per-domain: `const t = xTranslations[currentLanguage]` (preferred over
  the centralized `getTranslations()` for bundle size).
- `<html lang>` is set by an inline bootstrap script in `layout.tsx` (reads
  `localStorage`/browser) and kept in sync at runtime by `<LanguageSync />` (a
  render-less client component inside `LanguageProvider`).

## Theme system

- Two independent axes: **mode** (`light`/`dark`/`auto`) and **commemorative
  theme**. Themes: `default`, `carnival`, `valentine`, `easter`, `halloween`,
  `christmas`, `new-year` (`src/lib/themes/configs.ts`).
- Auto-activation by date (`dateRange: {start,end}: {month,day}`), e.g. Halloween
  Oct 24–31, Christmas Dec 15–25, New Year Dec 31–Jan 2, Valentine Feb 14.
  Priority order resolves overlaps (`valentine` > `carnival` > `easter` >
  `halloween` > `christmas` > `new-year`). A `manual-override` disables auto.
- No-flash: inline `<head>` scripts in `layout.tsx` apply the mode class and
  `lang` before hydration; `suppressHydrationWarning` is set deliberately on
  `<html>`/`<body>`.
- Each theme has a CSS file in `src/lib/themes/<theme>.css` with `light`/`dark`
  variants and reduced-motion handling. Seasonal effect components live in
  `src/components/ui/*Effects.tsx`, are all mounted in `page.tsx`, and render
  `null` until their theme is active.
- Dev-only test helpers exist (e.g. `forceHalloweenTheme()`,
  `testDateBasedThemes()` via `src/lib/themes/test-theme`, loaded only in
  development). `ThemeSelector`/`ThemeDebug` are dev-only.

## Assets & images

- Static assets under `public/assets/images/<domain>/<category>/` and
  `public/assets/images/shared/{logos,icons,backgrounds}`; SVG UI icons under
  `public/icons/`.
- Reference images through per-domain `constants/images.ts` (e.g. `HERO_IMAGES`)
  with a parallel alt-text object (e.g. `HERO_IMAGE_ALTS`) — never hardcode paths
  in components.
- Render via `OptimizedImage` (`@/domain/shared`), a Next `Image` wrapper:
  `src`, `alt`, `width`, `height`, `priority` (above-the-fold), `sizes`.
- Naming: kebab-case, descriptive (`beginner-book-cover.jpg`). Prefer WebP/AVIF
  for photos, SVG for icons/logos.

## Components of note

- `WhatsAppFloat` (`currentLanguage` required): floats bottom-right (56px desktop
  / 48px mobile), delayed reveal. Number from `CONTACT_INFO`
  (`src/domain/shared/constants/contacts.ts`,
  `whatsappUrl: https://wa.me/5581996444501`). BEM CSS classes.
- `LanguageSync` — see Internationalization.

## Coding standards

- **Prettier owns formatting** (`.prettierrc.mjs`): single quotes, semicolons,
  trailing commas `all`, `printWidth` 80, 2-space indent, LF. Run `pnpm format`;
  never hand-format. `eslint-config-prettier` is kept **last** in the flat config
  to disable conflicting stylistic rules.
- TypeScript: explicit types on exported/public APIs; avoid `any` (prefer
  `unknown`, then narrow); component props as named `interface`/`type`.
- Immutability: never mutate state objects/arrays in place; build new copies.
- **React purity (`react-hooks/purity`):** never call impure functions
  (`Math.random()`, `Date.now()`) **during render** — including inline in JSX
  style props or in `useMemo`. Generate such data in a `useEffect` into state, or
  precompute it into the objects you map over. Prevents SSR hydration mismatches.
- The mount guard `useEffect(() => setMounted(true), [])` (often with a
  `localStorage` read) is idiomatic here; `react-hooks/set-state-in-effect` is
  intentionally disabled for it in `eslint.config.mjs`.
- `scripts/` is excluded from ESLint (standalone Node CJS utilities).
- Keep functions small and files focused; organize by feature/domain.

## Accessibility (ARIA)

The app is not yet audited for accessibility. Apply these standards to new and
touched code, and use the `a11y-architect` agent for audits. Target **WCAG 2.2 AA**.

- **Semantic landmarks:** wrap each section in `<section aria-labelledby="…">`
  with a real heading; use `<header>/<main>/<nav aria-label>/<footer>`. Add a
  skip-to-content link as the first focusable element.
- **Headings:** one `<h1>` per page (hero), no skipped levels.
- **Images:** every `OptimizedImage` needs meaningful `alt` (decorative → `alt=""`);
  enforce via the `*_IMAGE_ALTS` constants.
- **Icon-only controls** (language toggle, theme toggle, WhatsApp, gallery modal
  close, carousel arrows) need `aria-label`. Toggles need `aria-pressed`/
  `aria-expanded` where stateful.
- **Keyboard:** all interactive elements reachable and operable by keyboard.
  The gallery modal must trap focus, close on `Esc`, and restore focus to the
  trigger. The feedback carousel needs arrow-key support and an `aria-live`
  region for the active slide.
- **Visible focus:** provide `:focus-visible` styles; never remove outlines
  without a replacement.
- **Motion:** the seasonal `*Effects` and theme CSS must honor
  `@media (prefers-reduced-motion: reduce)` (some already do — make it uniform).
- **Contrast:** verify text/background contrast in **both** light and dark and in
  every commemorative theme.
- **Language:** `<html lang>` must reflect the active language (handled by
  `LanguageSync`); keep it correct when adding flows.

## Security

A production CSP already exists; tighten the rest. Use the `/security-review`
skill / `security-reviewer` agent on auth, forms, or input-handling changes.

- **CSP** lives in `next.config.js` (`headers()`). It currently allows
  `'unsafe-inline'`/`'unsafe-eval'` in `script-src` (needed by the inline
  bootstrap + analytics) — prefer migrating to per-request **nonces** and drop
  `unsafe-*`. Update CSP origins there when adding third-party services.
- **Add the missing hardening headers** alongside the CSP:
  `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`,
  `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`,
  `Permissions-Policy: camera=(), microphone=(), geolocation=()`.
  (`frame-ancestors 'none'`, `object-src 'none'`, `base-uri 'self'` are already set.)
- **No secrets in client code.** The GA measurement ID is public and fine;
  anything sensitive must be a server-side env var, validated at startup.
- `dangerouslySetInnerHTML` is allowed **only** for the trusted bootstrap scripts
  in `layout.tsx`. Never inject user-derived HTML; sanitize if ever unavoidable.
- **Forms (e.g. contact registration):** when wired to a backend, validate on
  client and server, rate-limit the endpoint, and add a honeypot/light anti-abuse
  control. Add CSRF protection for any state-changing request.
- Keep dependencies patched; re-run a security review after dependency bumps.

## Versioning & release

- Version lives in **two places that must stay in sync**: `package.json`
  `version` and `APP_VERSION` in `src/lib/version.ts` (the footer renders
  `getVersionString()`). Update both, plus `CHANGELOG.md`.
- SemVer `MAJOR.MINOR.PATCH`; tags are `vX.Y.Z`. `CHANGELOG.md` follows
  Keep a Changelog (Added/Changed/Deprecated/Removed/Fixed/Security).
- **Do not bump the version unless explicitly asked.**

## Known issues / gotchas

- **Two Next config files exist:** `next.config.js` (active — contains the CSP)
  and `next.config.ts` (an empty stub). Having both is fragile; the `.js` is the
  real one. Consolidate to a single config and keep the CSP. Do not put config in
  the `.ts` stub expecting it to win.
- `package.json` version and `src/lib/version.ts` drift easily — see Versioning.
- `dist/` is build output and git-ignored; source lives in `src/`.

## Git workflow

- Branches: `develop` (active integration), `main` (default/stable),
  `migration/vite` (experimental Vite migration). Branch off `develop`.
- Conventional commits: `feat|fix|chore|refactor|docs|test|perf|ci: ...`.
- Commit attribution (Co-Authored-By) is disabled — do not add it.
- Keep large mechanical changes (e.g. a Prettier reformat) in a separate commit
  from logic changes so diffs stay reviewable.
