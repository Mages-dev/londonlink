---
name: section-pipeline
description: Runs the unit pipeline on this site, one unit at a time — refactor an existing section or module, add a new section, or remove one — through audit, plan, approval, baseline, structure commits, behavior commits, verification against the expected drift, review and close. Invoke as /section-pipeline [inventory | next | refactor <path> | add <name> <intent> | remove <path>].
disable-model-invocation: true
---

# Section pipeline

One skeleton for the three kinds of unit work. What changes between them is the
audit question and the drift the plan expects.

| Mode | Audit question | Expected drift (text + visual) |
|---|---|---|
| `refactor <path>` | Does it follow the skills, and does it live in the right place? | **None.** Any drift is a bug. |
| `add <name> <intent>` | Where does it go, what does it reuse, what must be registered, does it earn its place? | Exactly the new content, in both languages. |
| `remove <path>` | Who depends on it, and what would be left orphaned? | Exactly the removed content, nothing else. |

`$ARGUMENTS`:
- `inventory`: build or refresh the unit list (step 1), then stop.
- `next` or empty: take the top `todo` unit from the inventory and run
  `refactor` on it.
- `refactor <path>` / `add <name> <intent>` / `remove <path>`: run steps 2–11.

Working files go outside the repo, in the sibling folder
`../londonlink.local-context/pipeline/` (create it if missing; nothing to
gitignore): `inventory.md` plus one `<unit-slug>.md` per unit (audit, plan,
status). Never reference that folder from committed code.

## Ground rules

- **Load skills before editing**, from the CLAUDE.md table. `section-guide` is
  always on; `refactor-guide` for `refactor` and `remove`.
- **Stops are hard.** Steps 4 and 11 end the turn and wait for the user.
- **Commits** only for an approved plan: one move per commit, structure
  (`refactor(...)`) separate from behavior (`feat`/`fix`/`perf`/`style`). No
  `Co-Authored-By`. **Never push.**
- **One unit at a time.** Anything outside the unit goes under "Noticed, out of
  scope" in the unit file.
- **Copy is the user's.** New or changed text is drafted in pt and en in the
  plan and approved with it. Never invent numbers or claims.

## 1. Inventory (`inventory`)

Units: each folder in `src/domain/`, `src/layout/`, each folder in
`src/components/` (the seasonal `*Effects.tsx` as one unit), `src/contexts/`,
`src/lib/themes/`, `src/translations/`.

One row per unit in `inventory.md`:
`unit | lines | churn (3 months) | importers | lint | status`.
- lines: `wc -l` over its files
- churn: `git log --since='3 months ago' --oneline -- <unit> | wc -l`
- importers: files outside the unit that import it (`grep -rln` on its path
  and barrel)
- lint: `pnpm exec eslint <unit> --max-warnings=0` clean or not
- status: `todo` | `audited` | `planned` | `in progress` | `done` |
  `skipped (<why>)`

Also run `pnpm copy:check` and list what it reports under "Dictionary", and
list known findings not yet tied to a unit under "Backlog". Sort `todo` by
churn, then size; lint failures first. Show the list and **stop**. Keep
existing statuses on a refresh.

## 2. Audit

Spawn `section-auditor` with the mode and the target. Save its report verbatim
in `<unit-slug>.md`. Status `audited`. List its "Skill drift" and "Skill gap"
separately: they are fixes to the skills, not to the unit.

## 3. Plan

In `<unit-slug>.md`:

| # | finding / step | move | S/B | commit message |
|---|---|---|---|---|

Also:
- **Touch-points** (`add` / `remove`): every row of the `section-guide`
  touch-point table that applies, and which commit covers it.
- **Copy** (`add`, or a change to text): pt and en strings, side by side.
- **Expected drift**: `text:diff` lines per page, and which `visual:diff` shots
  should change (language × mode × width). `refactor`: "none".
- **Order**: preparatory S first, then B.
- **Out of plan**: what was deliberately left, and why.

Status `planned`.

## 4. Approval — stop

Show the plan table, the copy and the expected drift. **End the turn.**
Continue only on the user's ok; apply their cuts and reorders first.

## 5. Baseline

On a clean tree: `pnpm build && pnpm text:save`, then `pnpm start` and
`pnpm visual:save`. Status `in progress`.

## 6. Structure commits

One S row per commit. After each: `pnpm lint`, `pnpm exec tsc --noEmit`,
`pnpm build`, `pnpm text:diff` → unchanged, and `pnpm visual:diff` → unchanged
when markup, CSS or client behavior moved (restart `pnpm start` after the
build). Drift on an S commit means it was not structure: fix or revert that
step. Never stack changes on red.

## 7. Behavior commits

One B row per commit. After each: the checks of step 6 plus `pnpm copy:check`,
and compare the drift with the plan's expected drift. Unexpected lines or shots
are a bug; missing ones are an unfinished step.

## 8. Final verification

- `pnpm lint`, `pnpm exec tsc --noEmit`, `pnpm copy:check`, `pnpm build`,
  `pnpm text:diff`, `pnpm visual:diff` (both match the plan), `pnpm csp:check`
  if headers, `layout.tsx` or a third party changed.
- In the browser (`pnpm start`): both languages, both modes, desktop and mobile
  menu; keyboard tab through anything interactive; nav and scroll-spy if the
  section is navigable; `a11y-audit` checklist for touched UI.
- Say what was checked by hand and what was not.

## 9. Review

Spawn `section-reviewer` with the unit, the mode and the commit range (first
commit of step 6 to HEAD). Fix every **blocking** item, then run it again. Put
the final report in the unit file.

## 10. Inventory

Set the unit to `done` (`add`: add its row; `remove`: mark it `removed`).
Re-run `pnpm copy:check`.

## 11. Close — stop

Summarize: commits, S vs B, touch-points covered, drift observed vs expected,
manual checks done and not done, out of plan, skill drift. **End the turn.**
The next unit starts only when the user asks.

## Feedback (after any unit)

- A finding no skill covered → propose the skill edit, and raise the generic
  part to `~/develop/global-context` in the same session.
- The same finding in 3+ units → propose a lint rule or a script check instead
  of repeating it by hand.
