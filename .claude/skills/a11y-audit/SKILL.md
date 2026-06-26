---
name: a11y-audit
description: >
  Accessibility audit and remediation for the LondonLink Next.js marketing SPA,
  targeting WCAG 2.2 AA. Walks a deterministic checklist over landmarks,
  headings, images, icon-only controls, keyboard operability (gallery modal +
  feedback carousel), visible focus, target size, reduced-motion, contrast, and
  the contact form, then applies minimal fixes. Use when auditing accessibility,
  fixing ARIA, adding keyboard support, or reviewing a11y before commit.
version: 1.0.0
metadata:
  author: johnson
  scope: project
---

# LondonLink Accessibility Audit (WCAG 2.2 AA)

Project-scoped a11y checklist + remediation flow. Authoritative sources, not
blogs: [WCAG 2.2](https://www.w3.org/TR/WCAG22/),
[what's new in 2.2](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/),
[WAI-ARIA APG patterns](https://www.w3.org/WAI/ARIA/apg/patterns/),
[MDN ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA).
First rule of ARIA: prefer native HTML; use ARIA only to fill gaps and keep its
state in sync with React state.

## When to use

- Auditing the site (or a touched section) for accessibility.
- Adding/changing interactive UI (toggle, modal, carousel, form).
- Pre-commit a11y pass on a domain section.

## How it runs

1. **Scope.** Whole site, or a single `src/domain/<section>/`. Default: whole site.
2. **Audit.** For deep audits delegate to the `a11y-architect` agent; for a quick
   touched-code pass, walk the checklist below directly.
3. **Report.** Group findings by severity (CRITICAL / HIGH / MEDIUM / LOW), each
   with `file:line` + WCAG criterion + concrete fix.
4. **Fix.** Apply minimal, reviewable diffs. Prefer native HTML over ARIA. Add
   copy to **both** `en.ts` and `pt.ts` for any user-facing string (labels too).
5. **Verify.** `pnpm lint` (jsx-a11y via eslint-config-next), `pnpm build`, and
   manual keyboard pass. A change is done only when lint + format:check + build pass.

## Checklist

### Structure

- [ ] Exactly one `<h1>` (hero); no skipped heading levels.
- [ ] Each section: `<section aria-labelledby="…">` tied to a real heading.
- [ ] `<header>` / `<main>` / `<nav aria-label>` / `<footer>` landmarks present.
- [ ] Skip-to-content link is the first focusable element (visible on focus).

### Images (per CLAUDE.md asset contract)

- [ ] Every `OptimizedImage` has meaningful `alt`; decorative → `alt=""`.
- [ ] Alt text comes from the `*_IMAGE_ALTS` constants, not inline literals.

### Interactive controls

- [ ] Icon-only controls (language/theme toggle, theme selector, WhatsApp float,
      modal close, carousel arrows) have `aria-label`.
- [ ] Stateful toggles expose `aria-pressed` / `aria-expanded` synced to state.
- [ ] **Target size ≥ 24×24 CSS px** (WCAG 2.2 SC 2.5.8) — audit icon buttons.

### Keyboard (WCAG 2.1.1 / 2.4.3 / 2.4.11)

- [ ] All interactive elements reachable + operable via keyboard.
- [ ] **Gallery modal:** `role="dialog"` `aria-modal="true"`, focus trap, `Esc`
      closes, focus restores to the trigger element on close.
- [ ] **Feedback carousel:** arrow-key navigation, single-pointer alternative to
      any swipe (SC 2.5.7), `aria-live="polite"` region announcing active slide.
- [ ] Focused element stays at least partially visible under sticky header /
      floating button / modal (SC 2.4.11 Focus Not Obscured).

### Visible focus (WCAG 2.4.7)

- [ ] `:focus-visible` styles exist; no `outline:none` without a replacement.

### Motion (WCAG 2.3.3)

- [ ] Every seasonal `*Effects.tsx` and theme CSS honors
      `@media (prefers-reduced-motion: reduce)`. Make it uniform across all themes.

### Contrast (WCAG 1.4.3 — AA: 4.5:1 text, 3:1 large/UI)

- [ ] Verify text/bg contrast in light AND dark AND each commemorative theme.
      Flag hardcoded colors that look risky; confirm with a contrast tool.

### Forms — contact section (WCAG 1.3.1 / 3.3.1 / 3.3.2)

- [ ] Every input has an associated `<label>` (or `aria-label`).
- [ ] Required fields marked; errors announced (`aria-describedby` / `role="alert"`).

### Language (WCAG 3.1.1 / 3.1.2)

- [ ] `<html lang>` reflects active language (handled by `LanguageSync`); no
      hardcoded `lang`.

## WCAG 2.2 deltas to watch (new since 2.1)

- **2.4.11 Focus Not Obscured (AA)** — sticky `Header` / `WhatsAppFloat` / modal
  must not fully hide the focused element.
- **2.5.7 Dragging Movements (AA)** — swipe-only needs a button alternative.
- **2.5.8 Target Size Minimum (AA)** — interactive targets ≥ 24×24 px.
- **3.2.6 Consistent Help (A)** — keep contact/WhatsApp entry in a consistent spot.
- **4.1.1 Parsing was removed** — duplicate-id is no longer a WCAG failure (still
  fix for correctness).

## Project conventions (don't fight them)

- Mount guard `useEffect(() => setMounted(true), [])` is idiomatic here.
- Never call impure fns (`Math.random`, `Date.now`) during render
  (`react-hooks/purity`) — precompute or move to `useEffect`.
- Path alias `@/*`; import through domain barrels.
- Bilingual: any new string (incl. aria-labels) goes in both `en.ts` and `pt.ts`.
