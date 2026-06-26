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

### WCAG 2.2 new AA criteria (apply to this site)

WCAG 2.2 (Oct 2023) added these AA criteria over 2.1 — the ones that bite a
marketing SPA with floating buttons, a modal, and a carousel:

- **2.4.11 Focus Not Obscured (AA):** a focused element must stay at least
  partially visible — the sticky `Header`, `WhatsAppFloat`, and any modal must
  not cover the element that currently has focus.
- **2.5.7 Dragging Movements (AA):** any drag interaction (e.g. swipe-only
  carousel) needs a single-pointer alternative (the arrow buttons satisfy this —
  keep them).
- **2.5.8 Target Size Minimum (AA):** interactive targets ≥ **24×24 CSS px**
  (or 24px spacing). Audit icon-only controls — language/theme toggles, carousel
  arrows, modal close, WhatsApp (already 48/56px, fine).
- **3.2.6 Consistent Help (A):** keep the contact/WhatsApp entry point in the
  same relative position across states.
- Note: **4.1.1 Parsing was removed** in 2.2 — duplicate-id lint failures are no
  longer a WCAG issue (still fix them for correctness).

### References (authoritative — consult these, not blogs)

- WCAG 2.2 spec: https://www.w3.org/TR/WCAG22/ — what's new:
  https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/
- WAI-ARIA Authoring Practices Guide (APG) — the reference implementations for
  dialog, carousel, tabs, disclosure, menu, keyboard models:
  https://www.w3.org/WAI/ARIA/apg/patterns/ (modal:
  https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- MDN ARIA reference (roles/states/properties):
  https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA
- First rule of ARIA: prefer native HTML; use ARIA only to fill gaps, and keep
  ARIA state (`aria-expanded`, `aria-pressed`, `aria-modal`) in sync with React
  state.
- Lint: `eslint-plugin-jsx-a11y` ships via `eslint-config-next` — keep its rules
  on; it catches missing `alt`, bad `aria-*`/`role`, and non-interactive handlers.

## Security

A production CSP and the OWASP hardening headers already exist in
`next.config.js`. Use the `/security-audit` skill (project) or the
`/security-review` skill / `security-reviewer` agent on auth, forms, or
input-handling changes.

- **CSP `script-src` — `unsafe-*` is a documented accepted risk.** It still
  allows `'unsafe-inline'` + `'unsafe-eval'`, needed by the two inline bootstrap
  scripts in `layout.tsx` (lang/theme no-flash), the GA inline config, and the
  framework's own App Router inline flight scripts (`__NEXT_F`). **Decision
  (2026-06): keep them.** Rationale — this is a static, fully prerendered
  marketing page with no auth and no user-controlled data rendered into the DOM,
  so the reflected/stored-XSS vector `unsafe-inline` guards against is not
  present; the practical exposure is low. The supported way to drop them on App
  Router is a per-request **nonce** in `middleware.ts`, which **forces dynamic
  rendering** and sacrifices the static prerender + CDN cacheability the page
  relies on for performance — not worth that tradeoff for a brochure site.
  Revisit if user input, a backend form, or auth is ever added (then do the nonce
  migration in its own PR, verified on a deployed preview).
  - **Cheap future tightening (no rendering tradeoff):** `'unsafe-eval'` is the
    droppable half — nothing in _our_ origin uses `eval` (Maps is an iframe
    running in Google's origin; GA4 `gtag.js` does not eval). It can be removed
    independently of the nonce work after a quick browser smoke-test. Left in for
    now per the keep-it-simple decision above.
- Update CSP origins in `next.config.js` when adding third-party services.
- **Hardening headers are set** alongside the CSP — keep them:
  `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`,
  `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`,
  `Permissions-Policy: camera=(), microphone=(), geolocation=()`, plus
  `frame-ancestors 'none'`, `object-src 'none'`, `base-uri 'self'`.
- **One Next config.** `next.config.js` is the only config (the empty
  `next.config.ts` stub was removed). Do not reintroduce a second config file.
- **No secrets in client code.** The GA measurement ID is public and fine;
  anything sensitive must be a server-side env var, validated at startup.
- `dangerouslySetInnerHTML` is allowed **only** for the trusted bootstrap scripts
  in `layout.tsx`. Never inject user-derived HTML; sanitize if ever unavoidable.
- **Forms (e.g. contact registration):** the contact section is currently
  links + a Maps embed only. When wired to a backend, validate on client **and**
  server (schema-based, e.g. Zod), rate-limit the endpoint, add a honeypot/light
  anti-abuse control, never log PII, and add CSRF protection for any
  state-changing request.
- **Dependencies.** This project has a history of Next.js CVEs (the reason for
  the v2.3.0 bump — see `CHANGELOG.md`). Keep Next.js patched within its minor
  range. Transitive dev/build-tooling CVEs (ReDoS / prototype-pollution / XSS in
  `minimatch`/`picomatch`/`flatted`/`brace-expansion`/`postcss`/`@babel/core`)
  are pinned to patched versions via `overrides:` in `pnpm-workspace.yaml`
  (pnpm 11 no longer reads `pnpm.overrides` from `package.json`). Keep
  `pnpm audit` clean; re-run it after every dependency change and prune override
  entries once parents pull the fixes on their own.

### OWASP-aligned checklist (measure every change against this)

- [ ] **A05 Misconfiguration / headers:** CSP present; HSTS, `nosniff`,
      `Referrer-Policy`, `Permissions-Policy`, `frame-ancestors`, `object-src`,
      `base-uri` all set in `next.config.js`.
- [ ] **A05 / A03 — CSP `script-src`:** `'unsafe-inline'`/`'unsafe-eval'` are a
      documented accepted risk for this static brochure site (see above);
      third-party origins scoped to what's used.
- [ ] **A03 Injection / XSS:** no user-derived `dangerouslySetInnerHTML`;
      dynamic HTML sanitized; React escaping not bypassed.
- [ ] **A07 — secrets:** nothing sensitive in client code; server secrets via
      env vars, validated at startup.
- [ ] **A01 / A04 — forms (when backend lands):** client+server validation,
      rate limiting, CSRF protection, honeypot, no PII in logs.
- [ ] **A06 — vulnerable deps:** `pnpm audit` clean; Next.js patched within minor.
- [ ] **A08 — third-party integrity:** GA/Maps loaded intentionally; SRI where
      served from a CDN.

### Security references (authoritative — consult these, not blogs)

- **OWASP** — [Top 10](https://owasp.org/www-project-top-ten/),
  [Secure Headers Project](https://owasp.org/www-project-secure-headers/),
  [CSP Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html)
- **MDN** — [CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP),
  [HTTP security headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)
- **Next.js** — [CSP with nonces (App Router)](https://nextjs.org/docs/app/guides/content-security-policy),
  [headers in `next.config`](https://nextjs.org/docs/app/api-reference/config/next-config-js/headers)
- **Scanners** — [securityheaders.com](https://securityheaders.com),
  [Google CSP Evaluator](https://csp-evaluator.withgoogle.com),
  [Mozilla Observatory](https://developer.mozilla.org/en-US/observatory)
- **Advisories** — `pnpm audit`, GitHub Dependabot,
  [Next.js security advisories](https://github.com/vercel/next.js/security/advisories)

## Versioning & release

- Version lives in **two places that must stay in sync**: `package.json`
  `version` and `APP_VERSION` in `src/lib/version.ts` (the footer renders
  `getVersionString()`). Update both, plus `CHANGELOG.md`.
- SemVer `MAJOR.MINOR.PATCH`; tags are `vX.Y.Z`. `CHANGELOG.md` follows
  Keep a Changelog (Added/Changed/Deprecated/Removed/Fixed/Security).
- **Do not bump the version unless explicitly asked.**

## Known issues / gotchas

- **Single Next config:** `next.config.js` (contains the CSP + hardening
  headers). The old empty `next.config.ts` stub was removed — do not reintroduce
  a second config file; `.js` is the real one.
- `package.json` version and `src/lib/version.ts` drift easily — see Versioning.
- `dist/` is build output and git-ignored; source lives in `src/`.

## Git workflow

- Branches: `develop` (active integration), `main` (default/stable),
  `migration/vite` (experimental Vite migration). Branch off `develop`.
- Conventional commits: `feat|fix|chore|refactor|docs|test|perf|ci: ...`.
- Commit attribution (Co-Authored-By) is disabled — do not add it.
- Keep large mechanical changes (e.g. a Prettier reformat) in a separate commit
  from logic changes so diffs stay reviewable.
