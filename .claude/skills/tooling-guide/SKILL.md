---
name: tooling-guide
description: Use before touching eslint.config.mjs (including CSS lint), writing an eslint-disable comment, .prettierrc.mjs / .prettierignore, the pre-commit hook (.husky/, lint-staged.config.mjs), package.json scripts, pnpm-workspace.yaml, the Node version (.nvmrc, engines), a GitHub Actions workflow, or the scripts in scripts/ — and before considering, adding, removing or bumping a dependency. Covers the lint layout (Next presets + Tailwind-aware CSS lint), what the hook runs, pnpm supply-chain settings, the dependency catalog and policy, the deliberate holds with their retest signals, and which files move together on a Node or CI change.
---

# Tooling guide

Versions live in `package.json` and the lockfile only. Read the installed one
(`pnpm list <pkg>`; some packages do not export `package.json`) before trusting
a note here, and never write a version number into a skill or `CLAUDE.md` — a
deliberate hold's own lines are the only exception.

## ESLint

- Flat config in `eslint.config.mjs`, wrapped in `defineConfig()` from
  `eslint/config` (needed for `extends` inside a config object).
- JS/TS/JSX: `eslint-config-next` core-web-vitals + typescript presets. They
  ship their own `files` globs, so adding another language does not crash them.
- **ESLint 10 with plugins that predate it.** `eslint-plugin-react`,
  `eslint-plugin-jsx-a11y` and `eslint-plugin-import` (bundled by
  `eslint-config-next`) have not declared ESLint 10; `pnpm-workspace.yaml` →
  `peerDependencyRules.allowedVersions` accepts it explicitly. The Next preset's
  `settings.react.version: 'detect'` makes `eslint-plugin-react` call
  `context.getFilename()`, which ESLint 10 removed (crash: "getFilename is not a
  function"), so the config passes the installed React version instead
  (`createRequire(import.meta.url)('react/package.json').version`) — no number
  written. The `typescript-eslint` family must be current too: an old locked
  `@typescript-eslint/utils` crashes with "Class extends value undefined"
  (`FlatESLint`); `pnpm update typescript-eslint "@typescript-eslint/*"`.
- **CSS lint:** `@eslint/css` recommended for `**/*.css`, with
  `languageOptions.customSyntax: tailwind4` (`tailwind-csstree`) so `@theme`,
  `@apply` and `@custom-variant` parse. Only `.css` files; inline `style` props
  are not covered.
  - `css/use-baseline` allows `backdrop-filter` (only the blur is lost) and
    `background-clip: text` (shipped with its `-webkit-` fallback). Allow a new
    feature only when it degrades safely, and say why in the config.
  - `css/no-important` is disabled only around the reduced-motion block in
    `globals.css`, which must beat inline/utility animation values.
  - `css/no-invalid-properties` cannot see variables defined in `@theme inline`
    (`--font-sans`): disable on that line with the reason, do not turn on
    `allowUnknownVariables` globally.
- `eslint-config-prettier` stays **last**: it turns off stylistic rules that
  fight Prettier.
- `pnpm lint` runs with `--max-warnings=0`: a warning fails like an error
  (`jsx-a11y/alt-text` is a warning in the Next preset).
- `scripts/` is ignored by ESLint (plain Node ESM `.mjs`).
- **Prove coverage with probe files** after changing the config: a throwaway
  `src/__probe/` with one deliberate error per type (`.css` with `colr: red`,
  `.tsx` with `any` and `<img>` without `alt`), `pnpm exec eslint src/__probe`,
  delete it. Anything not reported is not covered.
- The Tailwind CSS IntelliSense class suggestions (`suggestCanonicalClasses`)
  are silenced in `.vscode/settings.json`. Its px → scale rewrites
  (`h-[600px]` → `h-150`) change px to rem: equal only at a 16px root.

## Tailwind class detection

Tailwind 4 scans project files for class-like strings. `eslint.config.mjs`
names CSS properties in rule options (`backdrop-filter`), which generated
unused utilities, so `globals.css` has `@source not '../../eslint.config.mjs'`.
Another config file that names CSS properties or class names needs the same.
Check by diffing the rule set of the built CSS (`.next/static/**/*.css`)
before and after.

**Theme tokens resolve at `:root`.** `@theme inline { --font-sans:
var(--font-geist-sans) }` emits `:root { --font-sans: var(--font-geist-sans) }`,
so the `next/font` variable classes must sit on `<html>` (they do, in
`layout.tsx`). On `<body>` the variable does not exist at `:root`, `--font-sans`
is invalid, the unlayered `body { font-family: var(--font-sans), … }` rule wins
over the `.font-sans` utility, and the page silently falls back to the
preflight font stack — which Tailwind changed between minors (4.1:
`ui-sans-serif, system-ui…`; 4.3: `-apple-system, … Roboto, Arial…`) without a
release note. That is how the site ran without Geist until 2026-09-26; check
`getComputedStyle(document.body).fontFamily` after touching fonts or tokens.

## Prettier

- `.prettierrc.mjs` owns layout; `pnpm format` / `pnpm format:check`.
- `*.md` is in `.prettierignore`: Prettier pads Markdown table columns, which
  inflates `CLAUDE.md` and skills that agents read every session. Keep tables
  unpadded when editing them by hand.

## Pre-commit hook

`husky` installs the hooks through the `prepare` script (`pnpm install` sets
`core.hooksPath` to `.husky/_`; an install that is already up to date does not
run `prepare` — run `pnpm run prepare` once on a new clone if needed).
`.husky/pre-commit` runs `lint-staged --hide-all --concurrent false` with
`lint-staged.config.mjs`:

| Staged | Runs |
|---|---|
| `*.{js,mjs,cjs,jsx,ts,tsx,css}` | `prettier --write`, then `eslint --max-warnings=0 --no-warn-ignored` |
| `*.{json,yml,yaml}` | `prettier --write` |
| `src/**/*.{ts,tsx}` | `tsc --noEmit`, `pnpm copy:check` (project-wide, once) |

- `--hide-all` stashes unstaged edits **and untracked files**, so the checks see
  exactly what is committed (without it a commit missing a new untracked module
  passes).
- `--no-warn-ignored`: a staged file under an ESLint ignore (`scripts/`) would
  otherwise warn "File ignored" and trip `--max-warnings=0`.
- Build and the text/visual/CSP checks are not in the hook (slow). CI runs
  format, lint, `copy:check`, build and `pnpm audit --prod`.
- Test the hook without committing: with an empty index, `git add -A &&
  pnpm exec lint-staged --hide-all --concurrent false; git reset -q`; then a
  staged probe with an error must exit 1.
- `--no-verify` only for a message-only amend, never to get failing code in.

## Scripts (`scripts/`)

| Script | What it proves |
|---|---|
| `copy:check` | en/pt key parity (paths + array lengths) and no dictionary key left unread. Imports the locale `.ts` files through Node's type stripping, so they must stay `export const … as const` with no value imports |
| `text:save` / `text:diff` | Visible text + meta + `alt` + `aria-label` of every prerendered page (`.next/server/app/*.html`). Portuguese only: the English copy is swapped in on the client |
| `visual:save` / `visual:diff` | Screenshot + `innerText` per language × mode × width from the running server (`pnpm start`). Byte comparison; run twice unchanged first if in doubt |
| `csp:check` | No CSP violation on the running server, plus the third-party responses (GA, Maps) seen |

`visual:*` and `csp:check` need Chrome (`CHROME=<binary>` to override) and a
running `pnpm build && pnpm start`. The CSP is baked in at build time: rebuild
after editing `next.config.js`.

## Dependencies

### Should it exist?

An agent writes 30–50 lines in minutes, but they still cost review and
maintenance. For every package: **does it solve a problem that is hard to get
right, or does it only save typing?** Keep edge-case-heavy, security-sensitive
or accessibility-heavy problems and the framework itself; replace thin wrappers
and one-function kits with the platform (`IntersectionObserver`, `Intl.*`,
`<dialog>`) or own code. Everything a client component imports ships to every
visitor. Check health before adding (`pnpm view <pkg> time deprecated --json`,
install scripts). Say in the PR why this package and not the platform.

### Catalog (runtime)

| Package | Problem | Verdict | Taught in |
|---|---|---|---|
| `next` | framework, routing, image optimization, headers/CSP | keep | CLAUDE.md, `security-audit`, `react-guide` |
| `react`, `react-dom` | UI runtime | keep | `react-guide` |
| `lucide-react` | icon set | keep while icons are many; measure usage before a major | — |

Dev tooling is covered by the sections above. Re-measure before acting on a
verdict; removal is its own task.

### Bumping

Run `/deps-update` (the dependency pipeline). The rules it applies:

1. Cooldown = `minimumReleaseAge` (1 day). Too-new releases are skipped, never
   forced; if a range fails on age, relax the range, not the policy.
2. Read the release notes of **every** version between installed and target.
3. Find what teaches the package: the catalog's "Taught in" plus
   `grep -rl '<pkg>' .claude CLAUDE.md`, and its importers.
4. Report and stop before bumping.
5. Bump, fix the affected skills (the rule, not a version), then the full
   verification (`CLAUDE.md` → Verification).
6. Commits: `chore(deps)` for `package.json` + lockfile, `docs(claude)` for
   skills, `fix`/`refactor` for code the bump required.

## pnpm and supply chain

- `packageManager` pins pnpm (with its sha512, written by `corepack use
  pnpm@<v>`). Bump it only when asked. Never run `npm`/`yarn`. A pnpm older
  than the pin switches itself to the pinned version (verified with pnpm 11
  reading a pnpm 12 pin), and `pnpm/action-setup` in CI reads the same field.
- pnpm 12 rejects `pnpm -s <script>` (`unexpected argument '-s'`): use
  `pnpm <script>` or `--reporter silent`. It also fails on any
  `pnpm-workspace.yaml` key it does not recognize — check the key name when
  adding a setting.
- `pnpm-workspace.yaml`:
  - `minimumReleaseAge: 1440` — pnpm's default, written out. Exceptions go in
    `minimumReleaseAgeExclude` as exact `pkg@version`, only for a release the
    user asked for, removed once it ages past the cooldown.
  - `peerDependencyRules.allowedVersions` — the ESLint 10 peers above; each
    entry names what removes it.
  - `allowBuilds` lists the only packages allowed to run install scripts
    (`sharp`, `unrs-resolver`). A new native dependency needs an entry and a
    reason; approve with `pnpm approve-builds <pkg>`, never blanket.
  - `overrides:` — none today. A vulnerable transitive package is fixed first by
    refreshing within the parent's range (`pnpm update`, or
    `pnpm update <transitive>`); override only what the parent's range cannot
    reach, range-scoped per major line, and prune once the parent pulls the fix.
    (2026-09-26: removing all nine old overrides left `pnpm audit` clean.)
- Keep `pnpm audit` clean; re-run after every dependency change.

## Deliberate holds

### TypeScript 6 line

`typescript` stays on the 6 line although a newer major exists. The 7 line is
the native compiler: its package ships only the `tsc` binary, without the
JavaScript API (`require('typescript').createProgram` is `undefined`).
`tsc --noEmit` and `next build` pass on it, but `typescript-eslint` imports that
API and ESLint crashes (proven in a throwaway copy, 2026-09-26).

- Retest signal: `pnpm view typescript-eslint peerDependencies.typescript`
  includes the 7 line, and `pnpm lint` runs on it in a throwaway copy.
- When it fires: `/deps-update typescript`, then the lint probes.
- Re-checked 2026-09-26: `typescript-eslint` 8.70.1 peers `>=4.8.4 <6.1.0`;
  typescript latest 7.0.2.

(History: ESLint was held on 9 until 2026-09-26. The signal that matters is
every bundled plugin's `peerDependencies.eslint`, not only `typescript-eslint`;
it was released with the peer rules and the React-version setting above after
the per-plugin lint probes came out identical on both majors.)

### Keyframes outside `@theme`

`tailwind-csstree` cannot parse an `@theme` block that mixes declarations with
nested `@keyframes` ([issue #79](https://github.com/humanwhocodes/tailwind-csstree/issues/79)),
so the keyframes for the `--animate-*` tokens live at the top level of
`globals.css`. The built CSS was verified to keep the same keyframes.

- Retest signal: issue #79 closed and a `tailwind-csstree` release after it.
- When it fires: move the keyframes back inside `@theme`, `pnpm lint`, compare
  the `@keyframes` in `.next/static/**/*.css` before and after.
- Opened 2026-09-26 with `tailwind-csstree` 0.4.0.

## Node: always the latest LTS

| Place | What |
|---|---|
| `.nvmrc` → `lts/*` | The single source. `nvm use` resolves it locally |
| `.github/workflows/ci.yml` → `setup-node` `node-version-file: .nvmrc` | resolved against the official manifest on every run |
| `package.json` → `engines.node` | Only the floor; raise it when the code needs something newer |
| `package.json` → `@types/node` | Tracks the runtime LTS line (the major `.nvmrc` resolves to), not the newest Node: moves with the LTS switch |

The deploy (`.github/workflows/main.yml`) runs a script on the droplet over
SSH: the Node version there is set on the server, not in this repo — keep it on
the same LTS line. A new LTS line reaches CI without a commit; when one is
announced (new even major goes LTS in late October), run install, lint, build
and the nets locally on it first. `sharp` needs a prebuilt binary for the new
ABI. If it breaks, pin `.nvmrc` to the previous major until fixed.

`copy:check` imports `.ts` through Node's built-in type stripping; the Node
floor must keep it on by default.
