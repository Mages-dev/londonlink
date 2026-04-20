# LondonLink 🇬🇧🇧🇷

**English Learning Platform with Brazilian Portuguese Focus**

LondonLink is a static SPA landing page for a bilingual English-for-Brazilians learning platform. It ships as a single-page site composed of domain-owned sections with full EN/PT translations and optional seasonal themes.

## 🚀 Technologies

- **Vite 6** — build tool and dev server (migrated from Next.js; see [MIGRATION_ROADMAP.md](MIGRATION_ROADMAP.md))
- **React 19.2** — UI runtime
- **TypeScript 5** — type safety with project references
- **Tailwind CSS 4** — via `@tailwindcss/vite`
- **Lucide React** — icon library
- **ESLint 9** (flat config) + **Prettier 3** — lint & formatting
- **pnpm** — package manager

## 📁 Project Structure

```
src/
├── main.tsx               # App bootstrap (providers, theme CSS imports)
├── App.tsx                # Page composition (domain sections)
├── index.css              # Global styles
├── layout/                # Structural chrome (Header, Footer)
├── components/            # Global components (WhatsAppFloat, UI, theme effects)
│   └── ui/                # Seasonal theme effects + ThemeSelector
├── domain/                # Business sections (hero, about, goals, books,
│   │                      # feedback, gallery, contact, shared)
│   └── <section>/         # components/, hooks/, constants/,
│                          # translations/, styles/, types/
├── contexts/              # ThemeContext, LanguageContext, LanguageSync
├── translations/          # Top-level i18n config & utils (strings live per domain)
├── lib/
│   ├── themes/            # Seasonal theme CSS + date calculators
│   └── version.ts
├── hooks/                 # Shared custom hooks
└── types/                 # Shared TypeScript definitions

public/                    # Static assets (images, icons, fonts, OG image)
index.html                 # SPA entry (meta, GA, root mount)
vite.config.ts             # Vite config (port 3000, alias @/ → src/)
```

### Architecture Overview

The project follows a **layered architecture** with clear separation of concerns:

- **Layout (`/layout`)** — structural skeleton (Header, Footer)
- **Global components (`/components`)** — cross-cutting reusable UI
- **Domain (`/domain`)** — self-contained business sections, each bundling its own components, hooks, translations, and styles
- **Infrastructure (`/lib`, `/contexts`, `/hooks`, `/translations`)** — themes, providers, utilities

Entry flow: `index.html` → `src/main.tsx` → `ThemeProvider` → `LanguageProvider` → `LanguageSync` → `src/App.tsx`.

## 🎯 Features

- **Domain-driven sections**: Hero, About, Goals, Books, Feedback, Gallery, Contact
- **Bilingual (EN/PT)** with per-domain translations and typed keys
- **Seasonal themes**: Carnival, Valentine, Easter, Halloween, Christmas, New Year — with date-based auto-activation for movable holidays (Carnival, Easter)
- **Responsive**, mobile-first design
- **Accessible**: ARIA and semantic HTML
- **Static build** — deployable to any static host

## 🛠️ Development

### Prerequisites

- Node.js 20+ (24 LTS recommended)
- pnpm 10+

### Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Script | Description |
| --- | --- |
| `pnpm dev` | Vite dev server on port 3000 |
| `pnpm build` | Type-check (`tsc -b`) then build into `dist/` |
| `pnpm preview` | Serve the built `dist/` for smoke-testing |
| `pnpm lint` | ESLint flat config |
| `pnpm format` | Prettier write |
| `pnpm format:check` | Prettier check (no writes) |

### Adding a New Domain Section

1. Create `src/domain/<name>/` mirroring an existing domain (hero is the canonical example): `components/`, `hooks/`, `constants/`, `translations/`, `styles/`, `types/`, `index.ts`.
2. Export the section from [src/domain/sections.ts](src/domain/sections.ts).
3. Compose it into [src/App.tsx](src/App.tsx).
4. Keep translations **colocated** inside the domain — do not put section-specific strings in `src/translations/`.

### Adding a Global Component

1. Create `src/components/<ComponentName>/`.
2. Export from `src/components/index.ts`.
3. Import via `@/components`.

### Import Aliases

```typescript
import { HeaderWithTheme, Footer } from '@/layout';
import { WhatsAppFloat } from '@/components';
import { HeroSection } from '@/domain/hero';
import { useTheme, useLanguage } from '@/contexts';
```

`@/` maps to `src/` (configured in `vite.config.ts` and `tsconfig.app.json`).

## 🌐 Internationalization

- Default: English (`en`); secondary: Brazilian Portuguese (`pt`).
- Each domain owns its translations under `src/domain/<section>/translations/`.
- `LanguageContext` holds the active language; `LanguageSync` keeps `<html lang>` in sync.

```typescript
import { heroTranslations } from '@/domain/hero/translations';

const t = heroTranslations[currentLanguage];
```

## 🎨 Themes

Seasonal themes are toggled at runtime through `ThemeContext`. Their CSS is eagerly imported in [src/main.tsx](src/main.tsx) and gated by classes/variables. Override detection via query string during QA (e.g. `?theme=carnival`). Movable-holiday windows (Carnival, Easter) are computed by calculators in [src/lib/themes/](src/lib/themes/).

## 🖼️ Assets

Assets live in `public/` and are referenced by absolute path (`/assets/images/...`). Vite serves `public/` verbatim. Use the `OptimizedImage` wrapper from `@/domain/shared` for image rendering — it keeps the API stable across renderers.

## 🚀 Deployment

The `pnpm build` output in `dist/` is a static bundle. Recommended host: **Cloudflare Pages** (see [MIGRATION_ROADMAP.md](MIGRATION_ROADMAP.md) § Phase 6). Any static host works: Netlify, Vercel (static), S3 + CloudFront, etc.

## 📚 Documentation

- [MIGRATION_ROADMAP.md](MIGRATION_ROADMAP.md) — Next.js → Vite migration plan and phase tracking
- [docs/VERSIONING_GUIDE.md](docs/VERSIONING_GUIDE.md) — version management and release process
- [docs/USER_PREFERENCES_GUIDE.md](docs/USER_PREFERENCES_GUIDE.md) — theme & language persistence
- `src/domain/<section>/README.md` (where present) — domain-specific notes

## 📄 License

Private and proprietary to LondonLink.

---

**LondonLink Team** — Building the future of English learning for Brazilian students.
