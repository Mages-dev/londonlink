---
name: deps-update
description: Runs the dependency pipeline on this repo — list what can move within the release-age cooldown, read every release note in range, map each package to the skills and code that depend on it, report and stop for approval, then bump, fix the affected skills, verify and close. Invoke as /deps-update [check | patch | minor | <pkg> ...].
disable-model-invocation: true
---

# Dependency pipeline

Keeps dependencies current **and** keeps the skills that teach them true in
the same pass. The policy (should a package exist, catalog, supply chain,
holds) is in `tooling-guide`; load it first. This file is the order and the
stops.

`$ARGUMENTS`:
- `check` or empty: steps 1–3 for everything outdated, then stop.
- `patch` / `minor`: steps 1–8 limited to that update level.
- `<pkg> ...`: steps 1–8 for the named packages. A major is always named, one
  package (or one family, e.g. `eslint` + `@eslint/*` + `typescript-eslint`)
  per run.

Report file: `../londonlink.local-context/deps/<yyyy-mm-dd>.md` (sibling of the
repo; create it if missing; never reference it from committed code).

## Ground rules

- **Cooldown = `minimumReleaseAge`** in `pnpm-workspace.yaml`, in days rounded
  up (1440 minutes → 1). A release younger than that is skipped, never forced.
- **Holds** (`tooling-guide` → Deliberate holds) are rejected from the listing
  unless the run is releasing that hold. `pnpm` itself moves only when asked.
- **Never write a version into a skill or `CLAUDE.md`.** Write the rule as the
  current API. Exception: a hold's own lines.
- **Stops are hard** at steps 3 and 8. No commit, no push, no release: the user
  commits.
- `ncu` must be installed globally (`ncu --version`); if not, stop — do not run
  it through `pnpm dlx`/`npx`.

## 1. List

```bash
ncu -p pnpm --format group,repo,time --cooldown 1 --reject '<holds>,pnpm'
pnpm audit
```

Record candidates (installed → target, group, publish date, repo) **and** what
was left out by cooldown or reject. For a package with no upgrade path:
`pnpm view <pkg> deprecated`. For each audit advisory, record the dependency
path (`pnpm audit --json`) and whether a direct bump fixes it.

## 2. Read

For each candidate:
- installed version (`pnpm list <pkg>`);
- release notes of **every** version in range (`gh release view <tag> -R
  <owner/repo>`, or the changelog), not only the target;
- who depends on it: catalog "Taught in" **plus**
  `grep -rl '<pkg>' .claude CLAUDE.md`, and the importers in `src/`;
- classify: **no impact** · **skill** (a taught rule changed) · **behavior**
  (changes under unchanged code — the dangerous ones) · **code** (deprecated or
  removed API still in use) · **security** (fixes an advisory in our tree).

## 3. Report — stop

Table `package | installed → target | group | notes read | class | skills
affected | proposed edit | code impact`, security and behavior first, then the
audit leftovers with their fix path (parent bump vs. `overrides:` entry).
Nothing is bumped without an ok.

Exception: a **critical** advisory reachable in production is fixed first
(security response protocol) — bump it, verify, and report it as done.

## 4. Bump

Only the approved ones (`pnpm add <pkg>@<range>`, `-D` for dev). Confirm the
resolved version with `pnpm list <pkg>`. Update or prune `overrides:` entries
the bump made unnecessary (`pnpm audit` must stay clean).

## 5. Skills

Apply the approved edits as rules ("use X, not Y"), with the source and the
date it was read. A code change is its own commit, and only if approved.

## 6. Verify

Baseline **before** step 4 (`pnpm build && pnpm text:save`, `pnpm start` +
`pnpm visual:save`), then after:
`pnpm lint`, `pnpm exec tsc --noEmit`, `pnpm copy:check`, `pnpm build`,
`pnpm text:diff`, `pnpm visual:diff`, `pnpm csp:check`, `pnpm audit`.
For every "behavior" row, say how it was checked, or that it was not. A failure
stops the pipeline: report it, do not work around it.

## 7. Holds

Run each hold's retest signal and update its "Re-checked" date. A fired signal
is reported; releasing a hold is its own run (`/deps-update <family>`).

## 8. Close — stop

From → to (from `pnpm list`), skills changed, verification results, holds, what
was left out and why. Propose the commit split: `chore(deps)` (manifest +
lockfile), `docs(claude)` (skills), `fix`/`refactor` for approved code. The
user commits.
