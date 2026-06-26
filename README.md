# LondonLink 🇬🇧🇧🇷

**English Learning Platform with Brazilian Portuguese Focus**

A single-page marketing/landing site for an English-learning platform aimed at
Brazilian Portuguese speakers. Bilingual (pt default / en), with a seasonal
theme system. Private and proprietary.

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript 5 · Tailwind CSS 4 ·
pnpm 11 · Node 24.

## Quick start

This project uses **pnpm exclusively** — npm/yarn would create a conflicting
lockfile. Node version is in `.nvmrc`; the pnpm version is pinned via
`packageManager`.

```bash
nvm use            # Node >= 24
corepack enable    # one-time: activates the pinned pnpm
pnpm install
pnpm dev           # dev server on http://localhost:3000
```

### Scripts

| Script              | Purpose                          |
| ------------------- | -------------------------------- |
| `pnpm dev`          | Dev server (port 3000)           |
| `pnpm build`        | Production build (Turbopack)     |
| `pnpm start`        | Production server (port 3302)    |
| `pnpm lint`         | ESLint (flat config)             |
| `pnpm format`       | Prettier `--write`               |
| `pnpm format:check` | Prettier `--check` (CI / commit) |

A change is "done" only when `pnpm lint`, `pnpm format:check`, and `pnpm build`
all pass.

## Documentation

**[CLAUDE.md](CLAUDE.md)** is the single source of truth for contributors and AI
agents — architecture and domain boundaries, the theme/i18n systems, persistence
keys, coding standards, accessibility (WCAG 2.2 AA), security, and versioning.
Release history lives in **[CHANGELOG.md](CHANGELOG.md)**.

## License

Private and proprietary to LondonLink. For internal development guidelines and
conventions, see [CLAUDE.md](CLAUDE.md).
