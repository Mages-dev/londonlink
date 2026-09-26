---
name: section-guide
description: Use before adding, removing, moving or reshaping a page section or any component under src/domain/, src/layout/ or src/components/, and before any user-visible string, alt text, aria-label or image path. Covers the domain folder contract, every touch-point a section must be registered in (and cleaned from on removal), where copy lives (per-domain en/pt dictionaries, both locales, no strings in JSX), the copy:check gate, and image constants with alt text.
---

# Section guide

The page is one route (`src/app/page.tsx`) composed of domain sections. This
guide is the shape a section must have and every place it is wired into. The
full add/remove/refactor cycle runs through `/section-pipeline`.

## Domain folder contract

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

- Create only the folders the section needs; `translations/` is required as soon
  as the section shows text.
- Import through barrels: `@/domain/<section>`, `@/domain/sections`,
  `@/layout`, `@/components`, `@/contexts`, `@/translations`.
- Something only one section uses stays in that section. `src/domain/shared/`
  is for what several sections use (`OptimizedImage`, `CONTACT_INFO`, shared
  images) — not a parking lot.

## Touch-points: adding a section

| # | Where | What |
|---|---|---|
| 1 | `src/domain/<section>/` | folder per the contract, component takes `currentLanguage: Language` |
| 2 | `src/domain/<section>/translations/{en,pt,index}.ts` | copy in both locales, `index.ts` exports `xTranslations = { en, pt } as const` |
| 3 | `src/domain/<section>/index.ts` | barrel export of the component |
| 4 | `src/domain/sections.ts` | re-export the section |
| 5 | `src/app/page.tsx` | render it inside `<main>` in page order |
| 6 | the section's root element | `<section id="<anchor>" aria-labelledby="<heading-id>">` with a real heading (`a11y-audit`) |
| 7 | `src/layout/Header.tsx` → `navigationItems` | nav entry (`href: '#<anchor>'`) if navigable |
| 8 | `src/layout/Header.tsx` → `useActiveSection([...])` | the anchor id, so the scroll-spy highlights it |
| 9 | `src/domain/<section>/constants/images.ts` + `public/assets/images/<section>/` | image paths + parallel `*_IMAGE_ALTS` |

Removing a section walks the same table backwards: nothing it registered may be
left behind (nav entry, scroll-spy id, re-export, barrel, dictionary, images,
assets in `public/`). `pnpm copy:check` catches orphan keys; grep each image
path and anchor.

Rows 7 and 8 are two hand-kept copies of the same list with inline pt/en labels
— a known gap (see the pipeline inventory); keep them in sync until they are
unified.

## Copy (i18n)

- Languages: `pt` (default) and `en`; source of truth
  `src/translations/config.ts`.
- **Every user-visible string lives in the section's dictionary**, including
  `alt`, `aria-label`, `title` and placeholder text. No string literals in JSX
  and no `currentLanguage === 'en' ? … : …` ternaries for copy.
- Read with `const t = xTranslations[currentLanguage]` (preferred over the
  central `getTranslations()` for bundle size).
- **Add new copy to both `en.ts` and `pt.ts` in the same change.** TypeScript
  only flags a key that code reads and one locale lacks; a missing key nobody
  reads yet, and a key nobody reads at all, pass. `pnpm copy:check` catches
  both (parity of key paths and array lengths, and unread keys) and runs in the
  pre-commit hook.
- A key read only by index (`t[item.key]`) must appear quoted somewhere outside
  the translations folder, or `copy:check` reports it as unused.
- Copy is the user's: draft new text in both locales and get it approved; never
  invent numbers or claims.
- Locale files stay `export const xTranslationsEn = { … } as const` with no value
  imports: `copy:check` imports them through Node's type stripping.
- `<html lang>` is set before hydration by the inline script in `layout.tsx` and
  kept in sync by `<LanguageSync />`.

## Images

- Static assets under `public/assets/images/<section>/<category>/` and
  `public/assets/images/shared/{logos,icons,backgrounds}`; SVG UI icons under
  `public/icons/`.
- Reference paths through the section's `constants/images.ts` (e.g.
  `HERO_IMAGES`), never inline in components.
- Alt text: the parallel `*_IMAGE_ALTS` object, one entry per image, with
  `{ en, pt }` per entry as in `about` and `goals`; decorative → `alt=""`. The
  `books`, `feedback`, `hero` and `shared` alt objects are still English-only,
  so the Portuguese page announces English alt text — a known gap; new images
  use the `{ en, pt }` shape.
- Render with `OptimizedImage` (`@/domain/shared`): `src`, `alt`, `width`,
  `height`, `priority` only above the fold, `sizes`.
- Naming: kebab-case, descriptive. WebP/AVIF for photos, SVG for icons/logos.
- **Replacing an image: give it a new file name**, never overwrite in place.
  The `next/image` optimizer cache (`.next/cache/images`) survives
  `pnpm build`, is keyed per output format, and the response carries
  `max-age=14400` (Next 16.3 default `minimumCacheTTL`): an overwritten file
  keeps serving the old picture for up to 4h, server and browser — and
  `visual:diff` can report "unchanged". Verified 2026-09-26 on the books
  author photo.
