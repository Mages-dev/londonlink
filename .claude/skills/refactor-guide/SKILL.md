---
name: refactor-guide
description: Use when restructuring code without meaning to change what the site shows or does — moving files between domain folders, splitting a component, renaming across files, extracting shared code, deleting dead code or unused dictionary keys, or backing out of a component that grew mode flags. Covers what counts as observable here, structure-vs-behavior commits, the three safety nets (rendered text, visual, CSP), choosing the scale, where code lives, and anti-patterns.
---

# Refactor guide — change the structure, keep the output

Sources (read 2026-09): [refactoring.com catalog](https://refactoring.com/catalog/) ·
[DefinitionOfRefactoring](https://martinfowler.com/bliki/DefinitionOfRefactoring.html) ·
[Preparatory refactoring](https://martinfowler.com/articles/preparatory-refactoring-example.html) ·
[ParallelChange](https://martinfowler.com/bliki/ParallelChange.html) ·
Kent Beck, *Tidy First?* · Michael Feathers, *Working Effectively with Legacy Code* ·
[The Wrong Abstraction](https://sandimetz.com/blog/2016/1/20/the-wrong-abstraction) ·
[Colocation](https://kentcdodds.com/blog/colocation).

This guide is the *how*. The target shape comes from `section-guide`,
`react-guide`, `a11y-audit` and the architecture section of `CLAUDE.md`. A
planned refactor of a unit runs through `/section-pipeline refactor <path>`.

## 1. What counts as a refactor

*"A change made to the internal structure of software … without changing its
observable behavior"* (Fowler).

Observable here: rendered text in **both** languages, meta/SEO copy, `alt` and
`aria-label`, anchors (`#about`…), layout in both color modes and at mobile
width, keyboard and focus behavior, what the toggles/carousel/modal do after
hydration, the response headers (CSP). Changing any of these is a behavior
change, even when it feels like cleanup. It can be the right change; it goes in
its own commit.

## 2. Structure and behavior in separate commits

- One hat at a time. Structure (S) → `refactor(<scope>): …`. Behavior (B) →
  `feat`/`fix`/`perf`/`style`. Name the catalog move when it fits: *Extract
  Function*, *Move Function*, *Inline Function*, *Remove Dead Code*.
- Already tangled? Split with `git add -p`, or redo it in order.

## 3. Safety nets

No unit tests. The observable output is the built page, so that is the net:

```bash
pnpm build && pnpm text:save          # before the first step
pnpm start &                          # production server on :3302
pnpm visual:save
# … one move …
pnpm build && pnpm text:diff          # expected: unchanged
# restart pnpm start
pnpm visual:diff                      # expected: unchanged
pnpm csp:check                        # when next.config.js, layout.tsx or a third party changed
```

- `text:diff` covers the prerendered Portuguese page: text, meta, `alt`,
  `aria-label`. `visual:diff` covers what it cannot: English, both modes,
  desktop and mobile, CSS. Neither sees keyboard/focus behavior or what an
  interactive component does when used — drive those in the browser and say so.
- A structure commit with any drift is not a structure commit. Find out why
  before moving on.
- Prove a net once per session if in doubt: plant a one-character copy change
  (text) or a one-step color change in a class that renders (visual), watch it
  fail, restore. A token the theme overrides (`:root` values redefined by
  `.light`/`.dark`) does not render — plant where it shows.

## 4. Pick the scale

| Situation | Approach |
|---|---|
| Small mess where you're working | **Tidying**: guard clause, explaining variable, delete dead code. Own commit. |
| A feature is hard because of the current shape | **Preparatory**: make the change easy, then make the easy change. S first, B after. |
| Changing a prop or export used in many places | **Parallel change**: add the new form, migrate callers, delete the old. The delete is mandatory. |
| Goal too big to see the steps | **Mikado**: try it in a timebox; if it breaks, revert, note the prerequisite, do that first. |

## 5. Where code lives

- **Closest common ancestor.** One consumer → inside that section. Several
  sections → `src/domain/shared/` (content, data, UI used by sections) or
  `src/components/` (cross-cutting chrome and global widgets). Structural
  chrome (header, footer) → `src/layout/`.
- Sections do not import from other sections' internals; go through
  `src/domain/shared/` or the section's barrel.
- **Measure consumers before moving**: grep the import path, not the name.
- **One move per commit**, updating every importer in the same commit.

## 6. Wrong abstraction: go back

A shared component accumulating `variant`/`mode` flags that branch behavior is
the sign (Sandi Metz). Inline it back into each caller, delete what each caller
does not use, then re-extract only what is truly common.

## 7. Per-step checklist

1. `pnpm lint` on a clean tree (zero warnings).
2. `pnpm exec tsc --noEmit` and `pnpm build`.
3. `pnpm text:diff` → unchanged; `pnpm visual:diff` → unchanged when markup,
   CSS or client behavior moved.
4. `pnpm copy:check` when dictionary keys moved or were deleted.
5. Commit: one move per commit.

## 8. Anti-patterns

- Big-bang rewrite in one commit.
- A "refactor" that fixes a bug on the way: split into S, then B.
- Refactoring on red (lint or build already failing).
- Expand without contract.
- Silencing a lint rule to get a move through.
- Moving copy into a component while restructuring it (`section-guide`).
