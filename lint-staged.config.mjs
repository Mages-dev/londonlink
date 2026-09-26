/**
 * Pre-commit gates (run by .husky/pre-commit). The hook passes --hide-all, so
 * unstaged edits and untracked files are stashed while these run and every
 * check sees exactly what is being committed (by default lint-staged hides
 * only the unstaged part of partially staged files). --concurrent false runs
 * the tasks one after another, so no check reads a file Prettier is rewriting.
 *
 * Prettier formats the staged files first (lint-staged re-stages what it
 * writes), then ESLint checks them. Project-wide checks are functions so they
 * run once, without the file list, when a matching file is staged. Build and
 * the text/visual diffs stay out of the hook (slow); CI runs the build.
 */
const config = {
  // --no-warn-ignored: a staged file under an ESLint ignore (scripts/) would
  // otherwise raise a warning and trip --max-warnings=0.
  '*.{js,mjs,cjs,jsx,ts,tsx,css}': [
    'prettier --write',
    'eslint --max-warnings=0 --no-warn-ignored',
  ],
  '*.{json,yml,yaml}': 'prettier --write',
  // The build type-checks too, but it is not in the hook; tsc is the fast
  // type gate. A component can orphan a dictionary key as easily as a
  // locale edit, so the dictionary gate runs on any source change.
  'src/**/*.{ts,tsx}': () => ['tsc --noEmit', 'pnpm copy:check'],
};

export default config;
